// js/game.js

let gameStartTime, gameTimerInterval;
let currentLevelIdx = 0; // Starts at 0: Tutorial
let currentLives = CONFIG.GAME.LIVES_PER_LEVEL;
let currentLevelData = null;

// DOM
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

function initGame() {
    if (!State.isLoggedIn()) {
        window.location.href = '../index.html';
        return;
    }
    const student = State.getStudent();
    studentDisplayGame.textContent = `Estudiante: ${student.name} (${student.id})`;

    // Resume state if exists (Idempotency)
    const gameData = State.getGameData();
    let nextLvl = 0;
    if (gameData && Object.keys(gameData.niveles).length > 0) {
        let allCompleted = true;
        // Find the highest uncompleted level
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
    // Allow taking Tutorial anyway if no level 1 progress
    if (nextLvl === 1 && (!gameData.niveles || !gameData.niveles['nivel1'])) {
        nextLvl = 0;
    }

    currentLevelIdx = nextLvl;

    gameStartTime = Date.now();
    startGameTimer(CONFIG.GAME.TIME_LIMIT_MINUTES * 60);

    loadLevel(currentLevelIdx);
}

function startGameTimer(durationSeconds) {
    let timeRemaining = durationSeconds;
    updateTimerDisplay(timeRemaining);

    gameTimerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay(timeRemaining);
        if (timeRemaining <= 0) {
            clearInterval(gameTimerInterval);
            handleTimeOutGame();
        }
    }, 1000);
}

function updateTimerDisplay(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    gameTimer.textContent = `${m}:${s}`;
    if (seconds < 300) {
        gameTimer.style.color = 'var(--danger)';
        gameTimer.style.fontWeight = 'bold';
    }
}

function handleTimeOutGame() {
    alert("El tiempo de la sesión clínica se ha agotado. Guardando tu progreso actual y cerrando evaluación.");
    finishGame();
}

function renderLives() {
    livesContainer.innerHTML = '♥'.repeat(currentLives) + '<span style="color:#ddd">' + '♥'.repeat(CONFIG.GAME.LIVES_PER_LEVEL - currentLives) + '</span>';
}

function loadLevel(idx) {
    currentLevelData = GAME_CASES.find(c => c.level === idx);
    if (!currentLevelData) { finishGame(); return; }

    // Tutorial has explicit infinite tries conceptually, but we track lives from 1-4
    currentLives = (idx === 0) ? 1 : CONFIG.GAME.LIVES_PER_LEVEL;

    renderLives();
    if (idx === 0) livesContainer.innerHTML = '<span style="color:#888; font-size:1rem; letter-spacing:0">Sin penalización</span>';

    levelTitle.textContent = currentLevelData.title;
    caseDescription.textContent = `"${currentLevelData.description}"`;
    patientAvatar.className = 'avatar sad';

    // Set emoji based on level for identity
    const avatars = ['👴', '👧', '👨‍💼', '👩', '🏫'];
    patientAvatar.textContent = avatars[idx % avatars.length];

    levelWorkspace.innerHTML = '';
    gameFeedback.classList.add('hidden');
    validateBtn.classList.remove('hidden');
    validateBtn.disabled = false;
    nextLevelBtn.classList.add('hidden');

    buildWorkspace(currentLevelData);
}

function buildWorkspace(data) {
    if (data.type === 'clasico_basico') {
        levelWorkspace.innerHTML = `<p style="margin-bottom:1rem;color:var(--primary-light);font-weight:600;">${data.message}</p>
      <div class="dnd-targets" id="tutTargets"></div>`;
        const tgts = document.getElementById('tutTargets');

        // For tutorial, simple selects to familiarize before complex DND
        const optionsHtml = `
      <option value="">Clasificar componente...</option>
      <option value="EN">Estímulo Neutro (EN)</option>
      <option value="EI">Estímulo Incondicionado (EI)</option>
      <option value="RI">Respuesta Incondicionada (RI)</option>
      <option value="EC">Estímulo Condicionado (EC)</option>
      <option value="RC">Respuesta Condicionada (RC)</option>
    `;

        Object.entries(data.elements).forEach(([k, v]) => {
            tgts.innerHTML += `<div class="target-zone"><div class="target-label" style="width: auto; min-width: 200px;">${v}</div><select class="form-control" id="tut_${k}">${optionsHtml}</select></div>`;
        });
    }
    else if (data.type === 'drag_and_drop_clasico') {
        let html = `<div class="form-group"><label>1. Diagnóstico Principal:</label><select id="lvl1_diag" class="form-control"><option value="">Seleccionar Teoría...</option>`;
        data.diagnosis_options.forEach(o => html += `<option value="${o}">${o}</option>`);
        html += `</select></div>`;

        // Identificación (Nativo drag and drop)
        let tagsHtml = `<div class="dnd-source" id="sourcePool">`;
        const tags = ["EC", "EI", "RI", "RC"];
        tags.forEach(t => tagsHtml += `<div class="draggable" draggable="true" id="tag_${t}">${t}</div>`);
        tagsHtml += `</div>`;

        let targetsHtml = `<div class="dnd-targets mt-2">`;
        Object.entries(data.elements_to_match).forEach(([k, v], i) => {
            targetsHtml += `<div class="target-zone"><div class="target-label">${k}</div><div class="target-box" data-expected="${v}"></div></div>`;
        });
        targetsHtml += `</div>`;

        let intHtml = `<div class="form-group mt-2"><label>3. Intervención Recomendada:</label><select id="lvl1_interv" class="form-control"><option value="">Seleccionar Tratamiento...</option>`;
        data.intervention_options.forEach(o => intHtml += `<option value="${o}">${o}</option>`);
        intHtml += `</select></div>`;

        levelWorkspace.innerHTML = html + `<div class="form-group"><label>2. Identificación de Componentes (Arrastra las etiquetas a los contenedores punteados):</label></div>` + tagsHtml + targetsHtml + intHtml;
        initNativeDragAndDrop();
    }
    else if (data.type === 'timeline_operante') {
        let html = `<div class="form-group"><label>1. Identifica la contingencia aplicable en cada fase comportamental:</label></div><div class="timeline">`;
        data.phases.forEach(p => {
            let opts = p.options.map(o => `<option value="${o}">${o}</option>`).join('');
            html += `<div class="timeline-item"><strong>${p.text}</strong><select id="${p.id}" class="form-control"><option value="">Seleccionar contingencia...</option>${opts}</select></div>`;
        });
        html += `</div>`;

        let qHtml = `<div class="form-group"><label>2. Predicción: ${data.question}</label><select id="lvl2_q" class="form-control"><option value="">Seleccionar...</option>`;
        data.question_options.forEach(o => qHtml += `<option value="${o}">${o}</option>`);
        qHtml += `</select></div>`;

        let mHtml = `<div class="form-group"><label>3. Programa de mantenimiento recomendado a largo plazo:</label><select id="lvl2_m" class="form-control"><option value="">Seleccionar programa...</option>`;
        data.maintenance_options.forEach(o => mHtml += `<option value="${o}">${o}</option>`);
        mHtml += `</select></div>`;

        levelWorkspace.innerHTML = html + qHtml + mHtml;
    }
    else if (data.type === 'bandura_sequence') {
        let html = `<div class="form-group"><label>1. Secuencia de Aprendizaje Social: Ordena el flujo causal según la teoría del Modelamiento de Bandura (Arrastra a los cuadros).</label></div>`;

        let sourceHtml = `<div class="dnd-source" id="sourcePoolBandura">`;
        let shuffled = [...data.terms].sort(() => Math.random() - 0.5);
        shuffled.forEach(t => sourceHtml += `<div class="draggable" draggable="true" id="btag_${t.replace(/\\s/g, '')}">${t}</div>`);
        sourceHtml += `</div>`;

        let tgtsHtml = `<div class="dnd-targets mt-2" style="grid-template-columns: repeat(2, 1fr);">`;
        for (let i = 0; i < data.correct_sequence.length; i++) {
            tgtsHtml += `<div class="target-zone" style="flex-direction:row;"><div class="target-label" style="width:70px">Paso ${i + 1}</div><div class="target-box"></div></div>`;
        }
        tgtsHtml += `</div>`;

        let qHtml = `<div class="form-group mt-2" style="margin-top:2rem;"><label>2. ${data.question}</label><select id="lvl3_q" class="form-control"><option value="">Seleccionar consecuencia predictiva...</option>`;
        data.question_options.forEach(o => qHtml += `<option value="${o}">${o}</option>`);
        qHtml += `</select></div>`;

        levelWorkspace.innerHTML = html + sourceHtml + tgtsHtml + qHtml;
        initNativeDragAndDrop();
    }
    else if (data.type === 'integrador') {
        let html = `<div class="form-group"><label>1. Clasificación Sistémica: Evalúa el plan actual del colegio.</label></div>
       <div class="panel-grid">
       <div class="header-row">Táctica Aplicada</div>
       <div class="header-row">Teoría Base</div>
       <div class="header-row">Mecanismo Específico</div>`;

        data.interventions.forEach(inv => {
            html += `<div class="panel-item text-left">${inv.text}</div>`;

            let tOpts = inv.theory_options.map(o => `<option value="${o}">${o}</option>`).join('');
            html += `<div class="panel-item"><select id="${inv.id}_t" class="form-control" style="max-width:200px;"><option value="">Teoría...</option>${tOpts}</select></div>`;

            let mOpts = inv.mech_options.map(o => `<option value="${o}">${o}</option>`).join('');
            html += `<div class="panel-item"><select id="${inv.id}_m" class="form-control" style="max-width:200px;"><option value="">Mecanismo...</option>${mOpts}</select></div>`;
        });
        html += `</div>`;

        let predictQ = `<div class="form-group"><label>2. ${data.predict_question}</label><select id="lvl4_pq" class="form-control"><option value="">Seleccionar resultado a largo plazo...</option>`;
        data.predict_options.forEach(o => predictQ += `<option value="${o}">${o}</option>`);
        predictQ += `</select></div>`;

        let openQ1 = `<div class="form-group mt-2"><label>3. Análisis Crítico: Selecciona cuál de las 4 intervenciones del rector podría ser perjudicial o contraproducente y explica brevemente por qué (Texto libre).</label>
       <textarea id="lvl4_open1" class="form-control" placeholder="Ej. La intervención X es perjudicial porque... (Max 300 palabras)."></textarea></div>`;

        let openQ2 = `<div class="form-group"><label>4. Intervención Propuesta: Como psicólogo encargado, propón una 5ta táctica especificando con claridad el marco teórico, el mecanismo a utilizar y cómo la implementarías.</label>
       <textarea id="lvl4_open2" class="form-control" placeholder="Acá describe tu propuesta desde la psicología cognitiva/conductual..."></textarea></div>`;

        levelWorkspace.innerHTML = html + predictQ + openQ1 + openQ2;
    }
}

// Inicialización de lógica de Drag and Drop
function initNativeDragAndDrop() {
    const draggables = document.querySelectorAll('.draggable');
    const targetBoxes = document.querySelectorAll('.target-box, .dnd-source');

    draggables.forEach(drg => {
        drg.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
            // Retrasar ocultamiento visual
            setTimeout(() => e.target.style.opacity = '0.4', 0);
        });
        drg.addEventListener('dragend', (e) => {
            e.target.style.opacity = '1';
        });
    });

    targetBoxes.forEach(box => {
        box.addEventListener('dragover', e => {
            e.preventDefault();
            if (box.classList.contains('target-box') && !box.hasChildNodes()) {
                box.style.borderColor = 'var(--primary)';
            }
        });
        box.addEventListener('dragleave', e => {
            box.style.borderColor = '';
        });
        box.addEventListener('drop', e => {
            e.preventDefault();
            box.style.borderColor = '';
            const id = e.dataTransfer.getData('text/plain');
            const draggableElement = document.getElementById(id);
            if (!draggableElement) return;

            if (box.classList.contains('target-box') && box.children.length > 0) {
                // Intercambiar al container original
                document.querySelector('.dnd-source').appendChild(box.firstChild);
            }
            box.appendChild(draggableElement);
        });
    });
}

validateBtn.addEventListener('click', validateCurrentLevel);
nextLevelBtn.addEventListener('click', () => {
    goToNextLevel();
});

function validateCurrentLevel() {
    const data = currentLevelData;
    let isCorrect = true;
    let errorMsg = "Por favor selecciona una respuesta para todos los campos.";

    // Validation Logic per level
    if (data.type === 'clasico_basico') {
        Object.keys(data.elements).forEach(k => {
            const val = document.getElementById(`tut_${k}`).value;
            if (val !== k) isCorrect = false;
        });
        if (!isCorrect) errorMsg = "<strong>¡Ups! Revisa de nuevo.</strong><br/>Recuerda: la sirena antes del trauma era un <strong>EN</strong>. Luego se asocia al infarto (<strong>EI</strong>), que causaba pánico natural (<strong>RI</strong>). Tras la asociación, la sirena sola se vuelve un <strong>EC</strong> que produce ansiedad aprendida (<strong>RC</strong>).";
    }
    else if (data.type === 'drag_and_drop_clasico') {
        const diag = document.getElementById('lvl1_diag').value;
        const inter = document.getElementById('lvl1_interv').value;
        if (diag !== data.diagnosis_correct || inter !== data.intervention_correct) {
            isCorrect = false;
        }

        // Check DND Elements
        const drops = document.querySelectorAll('.target-box');
        drops.forEach(d => {
            const expected = d.getAttribute('data-expected');
            if (!d.firstChild || d.firstChild.textContent !== expected) {
                isCorrect = false;
            }
        });

        if (!isCorrect) errorMsg = `<strong>Diagnóstico Fallido.</strong><br/>Este es un caso de libro de <em>Condicionamiento Clásico</em>. El pinchazo es el EI, el dolor la RI. El taladro es el EC que causa llanto RC. El tratamiento empírico de elección es la <em>Desensibilización Sistemática</em>.`;
    }
    else if (data.type === 'timeline_operante') {
        const f1 = document.getElementById('fase1').value;
        const f2 = document.getElementById('fase2').value;
        const q = document.getElementById('lvl2_q').value;
        const m = document.getElementById('lvl2_m').value;

        if (f1 !== data.phases[0].correct || f2 !== data.phases[1].correct || q !== data.question_options[data.question_correct] || m !== data.maintenance_options[data.maintenance_correct]) {
            isCorrect = false;
            errorMsg = "<strong>Intervención Incorrecta.</strong><br/>Ignorar solo extingue conductas si eran mantenidas por atención. Si la conducta evita trabajo (refuerzo negativo), ignorarla la mantiene. El reconocimiento aportó Refuerzo Positivo. Un castigo suele causar <em>evitación encubierta</em>. Y el <em>Programa de Razón Variable</em> es el más robusto contra la extinción a largo plazo.";
        }
    }
    else if (data.type === 'bandura_sequence') {
        const q = document.getElementById('lvl3_q').value;
        if (q !== data.question_options[0]) isCorrect = false;

        const drops = document.querySelectorAll('.target-box');
        let seq = [];
        drops.forEach(d => { if (d.firstChild) seq.push(d.firstChild.textContent); });

        if (seq.join() !== data.correct_sequence.join()) isCorrect = false;

        if (!isCorrect) errorMsg = "<strong>Estructura Incompleta.</strong><br/>Bandura dicta: se requiere un Modelo y un Observador; este debe prestar Atención, asegurar Retener la información, ser capaz de Reproducir la conducta, exponerse al Refuerzo Vicario al observar las consecuencias, lo cual despierta la Motivación; pero solo se ejecutará si hay <em>Autoeficacia</em> percibida.";
    }
    else if (data.type === 'integrador') {
        let allFilled = true;
        data.interventions.forEach(inv => {
            const t = document.getElementById(`${inv.id}_t`).value;
            const m = document.getElementById(`${inv.id}_m`).value;
            if (!t || !m) allFilled = false;
            else if (t !== inv.theory_correct || m !== inv.mech_correct) isCorrect = false;
        });

        const pq = document.getElementById('lvl4_pq').value;
        if (!pq || pq !== data.predict_options[0]) isCorrect = false;

        const t1 = document.getElementById('lvl4_open1').value.trim();
        const t2 = document.getElementById('lvl4_open2').value.trim();
        if (!t1 || !t2) { allFilled = false; isCorrect = false; }

        if (!allFilled) {
            isCorrect = false;
            errorMsg = "Completa todas las listas desplegables y redacta tu respuesta en los dos campos de texto.";
        } else if (!isCorrect) {
            errorMsg = "<strong>Clasificación Incorrecta.</strong><br/>El examen sorpresa es Operante (Intervalo Variable), produce tasas de estudio muy consistentes. El ranking es Aprendizaje Social (Incentivo Vicario). Retirar el recreo es Operante (Castigo Negativo) porque quita algo apetitivo.";
        } else {
            State.saveGameOpenAnswers({
                nivel4_contraproducente: t1,
                nivel4_intervencion: t2
            });
        }
    }

    showFeedback(isCorrect, errorMsg);
}

function showFeedback(isCorrect, errorMsg) {
    gameFeedback.classList.remove('hidden');

    if (isCorrect) {
        gameFeedback.className = 'feedback correct';
        gameFeedback.innerHTML = "<strong>¡Intervención Exitosa!</strong><br/>Has aplicado correctamente el mecanismo psicoterapéutico.";
        patientAvatar.className = 'avatar happy';
        patientAvatar.textContent = '💚'; // Change to happy face icon representation
        validateBtn.classList.add('hidden');
        nextLevelBtn.classList.remove('hidden');

        // Save progress mapping 
        if (currentLevelIdx > 0) {
            State.saveGameLevel(currentLevelIdx, {
                completado: true,
                vidas_usadas: CONFIG.GAME.LIVES_PER_LEVEL - currentLives,
                tiempo_segundos: Math.floor((Date.now() - gameStartTime) / 1000)
            });
        }

    } else {
        // Es nivel tutorial?
        if (currentLevelIdx > 0) {
            currentLives--;
            renderLives();
        }

        gameFeedback.className = 'feedback incorrect';
        gameFeedback.innerHTML = errorMsg;
        patientAvatar.className = 'avatar sad';
        patientAvatar.textContent = '😨'; // Scared face

        if (currentLevelIdx > 0 && currentLives <= 0) {
            validateBtn.disabled = true;
            gameFeedback.innerHTML += "<br/><br/><strong style='color:#a8201a'>El caso se ha agravado. Te has quedado sin vidas. Debes repasar la teoría y reintentar este nivel.</strong>";
            setTimeout(() => {
                loadLevel(currentLevelIdx); // Hard restart level
            }, 5000);
        }
    }
}

async function goToNextLevel() {
    currentLevelIdx++;
    if (currentLevelIdx <= 4) {
        loadLevel(currentLevelIdx);
    } else {
        // Si completó el nivel 4, actualizar db y terminar
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

    // Enviar data final (combinada con parte 1 de sessionStorage)
    const payload = State.buildFinalPayload();
    await DB.sendData(payload);
}

window.addEventListener('DOMContentLoaded', initGame);
