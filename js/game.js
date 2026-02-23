// js/game.js
// Motor del juego "Clínica del Comportamiento" — Parte 2 del parcial
// Gestiona 5 niveles (Tutorial + 4 calificados) con mecánicas interactivas distintas.

let gameStartTime, gameTimerInterval;
let currentLevelIdx = 0;
let currentLives = CONFIG.GAME.LIVES_PER_LEVEL;
let currentLevelData = null;
let levelStartTime = 0;

// ═══════════════════════════════════════
// Referencias al DOM
// ═══════════════════════════════════════
const studentDisplayGame = document.getElementById('studentDisplayGame');
const levelTitle = document.getElementById('levelTitle');
const gameTimer = document.getElementById('gameTimer');
const livesContainer = document.getElementById('livesContainer');
const patientAvatar = document.getElementById('patientAvatar');
const caseDescription = document.getElementById('caseDescription');
const levelWorkspace = document.getElementById('levelWorkspace');
const validateBtn = document.getElementById('validateBtn');
const nextLevelBtn = document.getElementById('nextLevelBtn');
const gameFeedback = document.getElementById('gameFeedback');
const gameStage = document.querySelector('.game-stage');
const gameSummary = document.getElementById('gameSummary');

// ═══════════════════════════════════════
// Inicialización del juego
// ═══════════════════════════════════════
function initGame() {
    if (!State.isLoggedIn()) {
        window.location.href = '../index.html';
        return;
    }
    const student = State.getStudent();
    studentDisplayGame.textContent = `Estudiante: ${student.name} (${student.id})`;

    // Reanudar estado si existe (idempotencia)
    const gameData = State.getGameData();
    let nextLvl = 0;
    if (gameData && Object.keys(gameData.niveles).length > 0) {
        let allCompleted = true;
        for (let i = 1; i <= 4; i++) {
            if (!gameData.niveles[`nivel${i}`] || !gameData.niveles[`nivel${i}`].completado) {
                allCompleted = false;
                nextLvl = i;
                break;
            }
        }
        if (allCompleted) {
            finishGame();
            return;
        }
    }
    // Si aún no ha completado nivel 1, mostrar tutorial
    if (nextLvl === 1 && (!gameData.niveles || !gameData.niveles['nivel1'])) {
        nextLvl = 0;
    }

    currentLevelIdx = nextLvl;
    gameStartTime = Date.now();
    startGameTimer(CONFIG.GAME.TIME_LIMIT_MINUTES * 60);
    loadLevel(currentLevelIdx);
}

// ═══════════════════════════════════════
// Temporizador global del juego
// ═══════════════════════════════════════
function startGameTimer(durationSeconds) {
    let timeRemaining = durationSeconds;
    updateGameTimerDisplay(timeRemaining);
    gameTimerInterval = setInterval(() => {
        timeRemaining--;
        updateGameTimerDisplay(timeRemaining);
        if (timeRemaining <= 0) {
            clearInterval(gameTimerInterval);
            handleTimeOutGame();
        }
    }, 1000);
}

function updateGameTimerDisplay(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    gameTimer.textContent = `${m}:${s}`;
    if (seconds < 300) {
        gameTimer.style.color = 'var(--danger)';
        gameTimer.style.fontWeight = 'bold';
    }
}

function handleTimeOutGame() {
    alert("El tiempo de la sesión clínica se ha agotado. Guardando tu progreso actual.");
    finishGame();
}

// ═══════════════════════════════════════
// Renderizado de vidas (corazones)
// ═══════════════════════════════════════
function renderLives() {
    const filled = '♥'.repeat(currentLives);
    const empty = '♥'.repeat(Math.max(0, CONFIG.GAME.LIVES_PER_LEVEL - currentLives));
    livesContainer.innerHTML = filled + '<span style="color:#ddd">' + empty + '</span>';
}

// ═══════════════════════════════════════
// Carga y configuración de cada nivel
// ═══════════════════════════════════════
function loadLevel(idx) {
    currentLevelData = GAME_CASES.find(c => c.level === idx);
    if (!currentLevelData) { finishGame(); return; }

    currentLives = (idx === 0) ? 99 : CONFIG.GAME.LIVES_PER_LEVEL;
    levelStartTime = Date.now();

    renderLives();
    if (idx === 0) {
        livesContainer.innerHTML = '<span style="color:#888; font-size:0.9rem; letter-spacing:0">Sin penalización</span>';
    }

    levelTitle.textContent = currentLevelData.title;
    caseDescription.textContent = `"${currentLevelData.description}"`;
    patientAvatar.className = 'avatar sad';

    // Emoji de avatar según nivel
    const avatars = ['👴', '👧', '👨‍💼', '👩', '🏫'];
    patientAvatar.textContent = avatars[idx % avatars.length];

    levelWorkspace.innerHTML = '';
    gameFeedback.classList.add('hidden');
    validateBtn.classList.remove('hidden');
    validateBtn.disabled = false;
    nextLevelBtn.classList.add('hidden');

    buildWorkspace(currentLevelData);
}

// ═══════════════════════════════════════
// Construcción del espacio de trabajo según tipo de nivel
// ═══════════════════════════════════════
function buildWorkspace(data) {
    if (data.type === 'clasico_basico') {
        buildTutorial(data);
    } else if (data.type === 'drag_and_drop_clasico') {
        buildLevel1(data);
    } else if (data.type === 'timeline_operante') {
        buildLevel2(data);
    } else if (data.type === 'bandura_sequence') {
        buildLevel3(data);
    } else if (data.type === 'integrador') {
        buildLevel4(data);
    }
}

// ─── NIVEL 0: Tutorial con asistente virtual ───
function buildTutorial(data) {
    // Burbuja de asistente virtual
    let assistantHtml = '<div class="assistant-bubble">';
    if (data.assistant_steps) {
        data.assistant_steps.forEach(step => {
            assistantHtml += `<p style="margin-bottom:0.5rem;">${step}</p>`;
        });
    } else {
        assistantHtml += `<p>${data.message}</p>`;
    }
    assistantHtml += '</div>';

    const optionsHtml = `
    <option value="">Clasificar componente...</option>
    <option value="EN">Estímulo Neutro (EN)</option>
    <option value="EI">Estímulo Incondicionado (EI)</option>
    <option value="RI">Respuesta Incondicionada (RI)</option>
    <option value="EC">Estímulo Condicionado (EC)</option>
    <option value="RC">Respuesta Condicionada (RC)</option>
  `;

    let targetsHtml = '<div class="dnd-targets" id="tutTargets">';
    Object.entries(data.elements).forEach(([k, v]) => {
        targetsHtml += `<div class="target-zone">
      <div class="target-label" style="width:auto; min-width:200px;">${v}</div>
      <select class="form-control" id="tut_${k}">${optionsHtml}</select>
    </div>`;
    });
    targetsHtml += '</div>';

    levelWorkspace.innerHTML = assistantHtml + targetsHtml;
}

// ─── NIVEL 1: Diagnóstico + Drag & Drop + Intervención ───
function buildLevel1(data) {
    // 1. Diagnóstico
    let html = `<div class="form-group"><label>1. Diagnóstico Principal:</label>
    <select id="lvl1_diag" class="form-control"><option value="">Seleccionar Teoría...</option>`;
    data.diagnosis_options.forEach(o => html += `<option value="${o}">${o}</option>`);
    html += `</select></div>`;

    // 2. Drag & Drop de etiquetas
    let tagsHtml = `<div class="form-group"><label>2. Identificación de Componentes (Arrastra las etiquetas a los contenedores punteados):</label></div>
    <div class="dnd-source" id="sourcePool">`;
    const tags = ["EC", "EI", "RI", "RC"];
    tags.forEach(t => tagsHtml += `<div class="draggable" draggable="true" id="tag_${t}">${t}</div>`);
    tagsHtml += `</div>`;

    let targetsHtml = '<div class="dnd-targets mt-2">';
    Object.entries(data.elements_to_match).forEach(([k, v]) => {
        targetsHtml += `<div class="target-zone">
      <div class="target-label">${k}</div>
      <div class="target-box" data-expected="${v}"></div>
    </div>`;
    });
    targetsHtml += '</div>';

    // 3. Intervención
    let intHtml = `<div class="form-group mt-2"><label>3. Intervención Recomendada:</label>
    <select id="lvl1_interv" class="form-control"><option value="">Seleccionar Tratamiento...</option>`;
    data.intervention_options.forEach(o => intHtml += `<option value="${o}">${o}</option>`);
    intHtml += `</select></div>`;

    levelWorkspace.innerHTML = html + tagsHtml + targetsHtml + intHtml;
    initDragAndDrop();
}

// ─── NIVEL 2: Línea de tiempo operante ───
function buildLevel2(data) {
    let html = `<div class="form-group"><label>1. Identifica la contingencia aplicable en cada fase comportamental:</label></div>
    <div class="timeline">`;
    data.phases.forEach(p => {
        let opts = p.options.map(o => `<option value="${o}">${o}</option>`).join('');
        html += `<div class="timeline-item"><strong>${p.text}</strong>
      <select id="${p.id}" class="form-control"><option value="">Seleccionar contingencia...</option>${opts}</select>
    </div>`;
    });
    html += '</div>';

    let qHtml = `<div class="form-group"><label>2. Predicción: ${data.question}</label>
    <select id="lvl2_q" class="form-control"><option value="">Seleccionar...</option>`;
    data.question_options.forEach(o => qHtml += `<option value="${o}">${o}</option>`);
    qHtml += '</select></div>';

    let mHtml = `<div class="form-group"><label>3. Programa de mantenimiento recomendado a largo plazo:</label>
    <select id="lvl2_m" class="form-control"><option value="">Seleccionar programa...</option>`;
    data.maintenance_options.forEach(o => mHtml += `<option value="${o}">${o}</option>`);
    mHtml += '</select></div>';

    levelWorkspace.innerHTML = html + qHtml + mHtml;
}

// ─── NIVEL 3: Secuencia de Bandura con 8 tarjetas ───
function buildLevel3(data) {
    let html = `<div class="form-group"><label>1. Secuencia de Aprendizaje Social: Ordena los 8 componentes del flujo causal según la teoría del Modelamiento de Bandura.</label></div>`;

    // Mezclar las tarjetas aleatoriamente para presentación
    let shuffled = [...data.terms].sort(() => Math.random() - 0.5);

    let sourceHtml = '<div class="dnd-source" id="sourcePoolBandura">';
    shuffled.forEach(t => {
        const safeId = t.replace(/\s/g, '_');
        sourceHtml += `<div class="draggable" draggable="true" id="btag_${safeId}">${t}</div>`;
    });
    sourceHtml += '</div>';

    let tgtsHtml = '<div class="dnd-targets mt-2" style="display:grid; grid-template-columns: repeat(2, 1fr); gap:0.8rem;">';
    for (let i = 0; i < data.correct_sequence.length; i++) {
        tgtsHtml += `<div class="target-zone" style="flex-direction:row;">
      <div class="target-label" style="width:70px">Paso ${i + 1}</div>
      <div class="target-box"></div>
    </div>`;
    }
    tgtsHtml += '</div>';

    let qHtml = `<div class="form-group mt-2" style="margin-top:2rem;"><label>2. ${data.question}</label>
    <select id="lvl3_q" class="form-control"><option value="">Seleccionar consecuencia predictiva...</option>`;
    data.question_options.forEach(o => qHtml += `<option value="${o}">${o}</option>`);
    qHtml += '</select></div>';

    levelWorkspace.innerHTML = html + sourceHtml + tgtsHtml + qHtml;
    initDragAndDrop();
}

// ─── NIVEL 4: Panel integrador ───
function buildLevel4(data) {
    let html = `<div class="form-group"><label>1. Clasificación Sistémica: Evalúa el plan actual del colegio.</label></div>
    <div class="panel-grid">
      <div class="header-row">Táctica Aplicada</div>
      <div class="header-row">Teoría Base</div>
      <div class="header-row">Mecanismo Específico</div>`;

    data.interventions.forEach(inv => {
        html += `<div class="panel-item text-left">${inv.text}</div>`;

        let tOpts = inv.theory_options.map(o => `<option value="${o}">${o}</option>`).join('');
        html += `<div class="panel-item"><select id="${inv.id}_t" class="form-control" style="max-width:200px;">
      <option value="">Teoría...</option>${tOpts}</select></div>`;

        let mOpts = inv.mech_options.map(o => `<option value="${o}">${o}</option>`).join('');
        html += `<div class="panel-item"><select id="${inv.id}_m" class="form-control" style="max-width:200px;">
      <option value="">Mecanismo...</option>${mOpts}</select></div>`;
    });
    html += '</div>';

    let predictQ = `<div class="form-group"><label>2. ${data.predict_question}</label>
    <select id="lvl4_pq" class="form-control"><option value="">Seleccionar resultado a largo plazo...</option>`;
    data.predict_options.forEach(o => predictQ += `<option value="${o}">${o}</option>`);
    predictQ += '</select></div>';

    let openQ1 = `<div class="form-group mt-2"><label>3. Análisis Crítico: Selecciona cuál de las 4 intervenciones del rector podría ser contraproducente y explica brevemente por qué.</label>
    <textarea id="lvl4_open1" class="form-control" placeholder="Ej. La intervención X es contraproducente porque... (mínimo 30 caracteres)."></textarea></div>`;

    let openQ2 = `<div class="form-group"><label>4. Diseño de Intervención: Propón una 5ta intervención especificando la teoría base, el mecanismo y cómo la implementarías.</label>
    <textarea id="lvl4_open2" class="form-control" placeholder="Describe tu propuesta desde la psicología conductual/social..."></textarea></div>`;

    levelWorkspace.innerHTML = html + predictQ + openQ1 + openQ2;
}

// ═══════════════════════════════════════
// Drag & Drop con soporte mouse + touch
// ═══════════════════════════════════════
let draggedElement = null;

function initDragAndDrop() {
    const draggables = document.querySelectorAll('.draggable');
    const targetBoxes = document.querySelectorAll('.target-box');
    const sources = document.querySelectorAll('.dnd-source');
    const allDropZones = [...targetBoxes, ...sources];

    draggables.forEach(drg => {
        // Mouse events
        drg.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
            draggedElement = e.target;
            setTimeout(() => e.target.style.opacity = '0.4', 0);
        });
        drg.addEventListener('dragend', (e) => {
            e.target.style.opacity = '1';
            draggedElement = null;
        });

        // Touch events (para tablets)
        drg.addEventListener('touchstart', handleTouchStart, { passive: false });
        drg.addEventListener('touchmove', handleTouchMove, { passive: false });
        drg.addEventListener('touchend', handleTouchEnd, { passive: false });
    });

    allDropZones.forEach(box => {
        box.addEventListener('dragover', e => {
            e.preventDefault();
            if (box.classList.contains('target-box')) {
                box.style.borderColor = 'var(--primary)';
            }
        });
        box.addEventListener('dragleave', () => {
            box.style.borderColor = '';
        });
        box.addEventListener('drop', e => {
            e.preventDefault();
            box.style.borderColor = '';
            const id = e.dataTransfer.getData('text/plain');
            const el = document.getElementById(id);
            if (!el) return;
            dropIntoBox(el, box);
        });
    });
}

function dropIntoBox(element, box) {
    if (box.classList.contains('target-box') && box.children.length > 0) {
        // Devolver el ocupante actual al pool source
        const source = document.querySelector('.dnd-source');
        if (source) source.appendChild(box.firstChild);
    }
    box.appendChild(element);
}

// ─── Touch handlers para tablets ───
let touchClone = null;
let touchOriginParent = null;

function handleTouchStart(e) {
    e.preventDefault();
    draggedElement = e.target.closest('.draggable');
    if (!draggedElement) return;
    touchOriginParent = draggedElement.parentNode;

    touchClone = draggedElement.cloneNode(true);
    touchClone.style.position = 'fixed';
    touchClone.style.pointerEvents = 'none';
    touchClone.style.opacity = '0.7';
    touchClone.style.zIndex = '9999';
    document.body.appendChild(touchClone);

    const touch = e.touches[0];
    touchClone.style.left = touch.clientX - 30 + 'px';
    touchClone.style.top = touch.clientY - 20 + 'px';
    draggedElement.style.opacity = '0.3';
}

function handleTouchMove(e) {
    e.preventDefault();
    if (!touchClone) return;
    const touch = e.touches[0];
    touchClone.style.left = touch.clientX - 30 + 'px';
    touchClone.style.top = touch.clientY - 20 + 'px';
}

function handleTouchEnd(e) {
    e.preventDefault();
    if (!draggedElement || !touchClone) return;

    if (touchClone.parentNode) touchClone.parentNode.removeChild(touchClone);
    touchClone = null;
    draggedElement.style.opacity = '1';

    const touch = e.changedTouches[0];
    const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!dropTarget) { draggedElement = null; return; }

    const box = dropTarget.closest('.target-box') || dropTarget.closest('.dnd-source');
    if (box) {
        dropIntoBox(draggedElement, box);
    }
    draggedElement = null;
}

// ═══════════════════════════════════════
// Validación del nivel actual
// ═══════════════════════════════════════
validateBtn.addEventListener('click', validateCurrentLevel);
nextLevelBtn.addEventListener('click', () => goToNextLevel());

function validateCurrentLevel() {
    const data = currentLevelData;
    let isCorrect = true;
    let errorMsg = "Por favor selecciona una respuesta para todos los campos.";

    // ─── Tutorial ───
    if (data.type === 'clasico_basico') {
        let allFilled = true;
        Object.keys(data.elements).forEach(k => {
            const select = document.getElementById(`tut_${k}`);
            if (!select || !select.value) allFilled = false;
            else if (select.value !== k) isCorrect = false;
        });
        if (!allFilled) { isCorrect = false; errorMsg = "Selecciona una clasificación para cada componente del caso."; }
        else if (!isCorrect) {
            errorMsg = "<strong>¡Ups! Revisa de nuevo.</strong><br/>Recuerda: la sirena antes del trauma era un <strong>EN</strong> (Estímulo Neutro). El infarto es el <strong>EI</strong> (Estímulo Incondicionado), que causaba dolor natural (<strong>RI</strong>). Tras la asociación, la sirena se vuelve un <strong>EC</strong> (Estímulo Condicionado) que produce ansiedad aprendida (<strong>RC</strong>).";
        }
    }
    // ─── Nivel 1 ───
    else if (data.type === 'drag_and_drop_clasico') {
        const diag = document.getElementById('lvl1_diag').value;
        const inter = document.getElementById('lvl1_interv').value;

        if (!diag || !inter) { isCorrect = false; errorMsg = "Selecciona el diagnóstico y la intervención antes de validar."; }
        else {
            if (diag !== data.diagnosis_correct) isCorrect = false;
            if (inter !== data.intervention_correct) isCorrect = false;

            // Verificar Drag & Drop
            const drops = document.querySelectorAll('.target-box[data-expected]');
            drops.forEach(d => {
                const expected = d.getAttribute('data-expected');
                if (!d.firstChild || d.firstChild.textContent !== expected) {
                    isCorrect = false;
                }
            });

            if (!isCorrect) {
                errorMsg = `<strong>Diagnóstico Fallido.</strong><br/>Según Pavlov, este es un caso de <em>Condicionamiento Clásico</em>. El pinchazo de anestesia es el <strong>EI</strong> (produce dolor — la <strong>RI</strong>). El sonido del taladro + dentista, al asociarse, se convierte en <strong>EC</strong> que ahora provoca llanto (<strong>RC</strong>). La intervención de elección es la <em>Desensibilización Sistemática</em> (Wolpe, 1958).`;
            }
        }
    }
    // ─── Nivel 2 ───
    else if (data.type === 'timeline_operante') {
        const f1 = document.getElementById('fase1').value;
        const f2 = document.getElementById('fase2').value;
        const q = document.getElementById('lvl2_q').value;
        const m = document.getElementById('lvl2_m').value;

        if (!f1 || !f2 || !q || !m) {
            isCorrect = false;
            errorMsg = "Completa todas las selecciones antes de validar.";
        } else if (f1 !== data.phases[0].correct || f2 !== data.phases[1].correct ||
            q !== data.question_options[data.question_correct] ||
            m !== data.maintenance_options[data.maintenance_correct]) {
            isCorrect = false;
            errorMsg = "<strong>Intervención Incorrecta.</strong><br/>Según Skinner, ignorar una conducta operante que no estaba siendo mantenida por atención no produce extinción. En este caso, ignorar simplemente no proporcionó reforzamiento, lo que constituye <em>Extinción</em>. El reconocimiento posterior aportó <em>Reforzamiento Positivo</em> (añadir algo agradable). Un castigo positivo suele causar <em>evitación encubierta</em> y resentimiento. El <em>Programa de Razón Variable</em> produce las tasas de respuesta más resistentes a la extinción.";
        }
    }
    // ─── Nivel 3 ───
    else if (data.type === 'bandura_sequence') {
        const q = document.getElementById('lvl3_q').value;
        if (!q) { isCorrect = false; errorMsg = "Selecciona la predicción sobre autoeficacia."; }
        else if (q !== data.question_options[data.question_correct]) isCorrect = false;

        // Verificar secuencia
        const drops = document.querySelectorAll('.dnd-targets .target-box');
        let seq = [];
        drops.forEach(d => {
            if (d.firstChild) seq.push(d.firstChild.textContent);
        });

        if (seq.length !== data.correct_sequence.length) {
            isCorrect = false;
            errorMsg = "Arrastra las 8 tarjetas a las zonas numeradas antes de validar.";
        } else if (seq.join(',') !== data.correct_sequence.join(',')) {
            isCorrect = false;
        }

        if (!isCorrect && seq.length === data.correct_sequence.length) {
            errorMsg = "<strong>Secuencia Incorrecta.</strong><br/>Según Bandura, el orden correcto de los procesos del aprendizaje observacional es: (1) <strong>Modelo</strong> — la persona observada, (2) <strong>Observador</strong> — quien aprende, (3) <strong>Atención</strong> — debe percibir la conducta, (4) <strong>Retención</strong> — codificar simbólicamente, (5) <strong>Reproducción</strong> — capacidad motora, (6) <strong>Motivación</strong> — incentivo para ejecutar, (7) <strong>Refuerzo Vicario</strong> — observar consecuencias en el modelo, (8) <strong>Autoeficacia</strong> — creencia en la propia capacidad.";
        }
    }
    // ─── Nivel 4 ───
    else if (data.type === 'integrador') {
        let allFilled = true;
        data.interventions.forEach(inv => {
            const t = document.getElementById(`${inv.id}_t`).value;
            const m_val = document.getElementById(`${inv.id}_m`).value;
            if (!t || !m_val) allFilled = false;
            else if (t !== inv.theory_correct || m_val !== inv.mech_correct) isCorrect = false;
        });

        const pq = document.getElementById('lvl4_pq').value;
        if (!pq) allFilled = false;
        else if (pq !== data.predict_options[data.predict_correct]) isCorrect = false;

        const t1 = document.getElementById('lvl4_open1').value.trim();
        const t2 = document.getElementById('lvl4_open2').value.trim();
        if (!t1 || t1.length < 30 || !t2 || t2.length < 30) {
            allFilled = false;
        }

        if (!allFilled) {
            isCorrect = false;
            errorMsg = "Completa todas las listas desplegables y redacta tus respuestas en los campos de texto (mínimo 30 caracteres cada uno).";
        } else if (!isCorrect) {
            errorMsg = "<strong>Clasificación Incorrecta.</strong><br/>Según la integración teórica: los exámenes sorpresa son <em>Operante</em> (Programa de Intervalo Variable — Skinner). El ranking es <em>Aprendizaje Social</em> (Incentivo Vicario — Bandura). Retirar recreos es <em>Operante</em> (Castigo Negativo: retirar algo agradable). Las charlas del ex-alumno son <em>Aprendizaje Social</em> (Modelamiento — Bandura).";
        } else {
            // Guardar respuestas abiertas
            State.saveGameOpenAnswers({
                nivel4_contraproducente: t1,
                nivel4_intervencion: t2
            });
        }
    }

    showFeedback(isCorrect, errorMsg);
}

// ═══════════════════════════════════════
// Mostrar feedback al estudiante
// ═══════════════════════════════════════
function showFeedback(isCorrect, errorMsg) {
    gameFeedback.classList.remove('hidden');

    if (isCorrect) {
        gameFeedback.className = 'feedback correct';
        gameFeedback.innerHTML = "<strong>¡Intervención Exitosa!</strong><br/>Has aplicado correctamente el mecanismo. El paciente muestra mejoría conductual.";
        patientAvatar.className = 'avatar happy';
        patientAvatar.textContent = '😊';
        validateBtn.classList.add('hidden');
        nextLevelBtn.classList.remove('hidden');

        // Guardar progreso del nivel completado (no tutorial)
        if (currentLevelIdx > 0) {
            State.saveGameLevel(currentLevelIdx, {
                completado: true,
                vidas_usadas: CONFIG.GAME.LIVES_PER_LEVEL - currentLives,
                tiempo_segundos: Math.floor((Date.now() - levelStartTime) / 1000)
            });
            // Enviar progreso parcial al Sheet después de cada nivel
            DB.sendData(State.buildFinalPayload());
        }

    } else {
        // Descontar vida (excepto en tutorial)
        if (currentLevelIdx > 0) {
            currentLives--;
            renderLives();
        }

        gameFeedback.className = 'feedback incorrect';
        gameFeedback.innerHTML = errorMsg;
        patientAvatar.className = 'avatar sad';
        patientAvatar.textContent = '😟';

        if (currentLevelIdx > 0 && currentLives <= 0) {
            validateBtn.disabled = true;
            gameFeedback.innerHTML += "<br/><br/><strong style='color:#a8201a'>⚠️ Te has quedado sin vidas en este nivel. Revisarás la teoría y lo intentarás de nuevo en 5 segundos.</strong>";
            // Guardar intento fallido
            State.saveGameLevel(currentLevelIdx, {
                completado: false,
                vidas_usadas: CONFIG.GAME.LIVES_PER_LEVEL,
                tiempo_segundos: Math.floor((Date.now() - levelStartTime) / 1000)
            });
            setTimeout(() => {
                loadLevel(currentLevelIdx);
            }, 5000);
        }
    }
}

// ═══════════════════════════════════════
// Avance y finalización
// ═══════════════════════════════════════
async function goToNextLevel() {
    currentLevelIdx++;
    if (currentLevelIdx <= 4) {
        loadLevel(currentLevelIdx);
    } else {
        await finishGame();
    }
}

async function finishGame() {
    clearInterval(gameTimerInterval);
    gameStage.classList.add('hidden');
    levelTitle.textContent = "Parcial Finalizado";
    gameSummary.classList.remove('hidden');

    const gd = State.getGameData();
    document.getElementById('maxLevelDisplay').textContent = gd.nivel_alcanzado || 0;

    // Enviar payload final consolidado
    const payload = State.buildFinalPayload();
    await DB.sendData(payload);
}

window.addEventListener('DOMContentLoaded', initGame);
