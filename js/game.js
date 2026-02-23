// js/game.js
// Motor del juego "Clínica del Comportamiento" — 7 niveles (Tutorial + 6 calificados)

let gameStartTime, gameTimerInterval;
let currentLevelIdx = 0;
let currentLives = CONFIG.GAME.LIVES_PER_LEVEL;
let currentLevelData = null;
let levelStartTime = 0;

const studentDisplayGame = document.getElementById('studentDisplayGame');
const levelTitle = document.getElementById('levelTitle');
const gameTimer = document.getElementById('gameTimer');

// Funciones Auxiliares
function hashCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
    }
    return hash;
}

function mezclarOpciones(opciones, seed) {
    const arr = [...opciones];
    let s = seed;
    for (let i = arr.length - 1; i > 0; i--) {
        s = (s * 1664525 + 1013904223) & 0xffffffff;
        const j = Math.abs(s) % (i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

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
// Inicialización
// ═══════════════════════════════════════
function initGame() {
    if (!State.isLoggedIn()) { window.location.href = '../index.html'; return; }
    const student = State.getStudent();
    studentDisplayGame.textContent = `Estudiante: ${student.name} (${student.id})`;

    const gameData = State.getGameData();
    let nextLvl = 0;
    if (gameData && Object.keys(gameData.niveles).length > 0) {
        let allCompleted = true;
        for (let i = 1; i <= (CONFIG.GAME.TOTAL_LEVELS || 6); i++) {
            if (!gameData.niveles[`nivel${i}`] || !gameData.niveles[`nivel${i}`].completado) {
                allCompleted = false;
                nextLvl = i;
                break;
            }
        }
        if (allCompleted) { finishGame(); return; }
    }
    if (nextLvl === 1 && (!gameData.niveles || !gameData.niveles['nivel1'])) nextLvl = 0;

    currentLevelIdx = nextLvl;
    gameStartTime = Date.now();
    startGameTimer(CONFIG.GAME.TIME_LIMIT_MINUTES * 60);
    loadLevel(currentLevelIdx);
}

function startGameTimer(secs) {
    let t = secs;
    showTime(t);
    gameTimerInterval = setInterval(() => {
        t--;
        showTime(t);
        if (t <= 0) { clearInterval(gameTimerInterval); alert("Tiempo agotado."); finishGame(); }
    }, 1000);
}
function showTime(s) {
    gameTimer.textContent = `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
    if (s < 300) { gameTimer.style.color = 'var(--danger)'; gameTimer.style.fontWeight = 'bold'; }
}

function renderLives() {
    const f = '♥'.repeat(currentLives), e = '♥'.repeat(Math.max(0, CONFIG.GAME.LIVES_PER_LEVEL - currentLives));
    livesContainer.innerHTML = f + '<span style="color:#ddd">' + e + '</span>';
}

function loadLevel(idx) {
    currentLevelData = GAME_CASES.find(c => c.level === idx);
    if (!currentLevelData) { finishGame(); return; }
    currentLives = (idx === 0) ? 99 : CONFIG.GAME.LIVES_PER_LEVEL;
    levelStartTime = Date.now();
    renderLives();
    if (idx === 0) livesContainer.innerHTML = '<span style="color:#888;font-size:0.9rem">Sin penalización</span>';
    levelTitle.textContent = currentLevelData.title;
    caseDescription.textContent = `"${currentLevelData.description}"`;
    patientAvatar.className = 'avatar sad';
    const avatars = ['👴', '👧', '👨‍💼', '👩', '🏫', '🧒', '🐕'];
    patientAvatar.textContent = avatars[idx % avatars.length];
    levelWorkspace.innerHTML = '';
    gameFeedback.classList.add('hidden');
    validateBtn.classList.remove('hidden');
    validateBtn.disabled = false;
    nextLevelBtn.classList.add('hidden');
    buildWorkspace(currentLevelData);
}

function buildWorkspace(data) {
    if (data.type === 'clasico_basico') buildTutorial(data);
    else if (data.type === 'drag_and_drop_clasico') buildLevel1(data);
    else if (data.type === 'timeline_operante') buildLevel2(data);
    else if (data.type === 'bandura_sequence') buildLevel3(data);
    else if (data.type === 'integrador') buildLevel4(data);
    else if (data.type === 'laberinto') buildLevel5(data);
    else if (data.type === 'perro_entrenamiento') buildLevel6(data);
}

// ─── TUTORIAL ───
function buildTutorial(data) {
    let h = '<div class="assistant-bubble">';
    (data.assistant_steps || [data.message]).forEach(s => h += `<p style="margin-bottom:0.5rem">${s}</p>`);
    h += '</div>';
    const opts = `<option value="">Clasificar...</option><option value="EN">Estímulo Neutro (EN)</option><option value="EI">Estímulo Incondicionado (EI)</option><option value="RI">Respuesta Incondicionada (RI)</option><option value="EC">Estímulo Condicionado (EC)</option><option value="RC">Respuesta Condicionada (RC)</option>`;
    h += '<div class="dnd-targets" id="tutTargets">';
    Object.entries(data.elements).forEach(([k, v]) => {
        h += `<div class="target-zone"><div class="target-label" style="min-width:200px">${v}</div><select class="form-control" id="tut_${k}">${opts}</select></div>`;
    });
    h += '</div>';
    levelWorkspace.innerHTML = h;
}

// ─── NIVEL 1 ───
function buildLevel1(data) {
    let h = `<div class="form-group"><label>1. Diagnóstico Principal:</label><select id="lvl1_diag" class="form-control"><option value="">Seleccionar Teoría...</option>`;
    data.diagnosis_options.forEach(o => h += `<option value="${o}">${o}</option>`);
    h += `</select></div>`;
    let t = `<div class="form-group"><label>2. Identificación de Componentes (Arrastra etiquetas):</label></div><div class="dnd-source" id="sourcePool">`;
    ["EC", "EI", "RI", "RC"].forEach(x => t += `<div class="draggable" draggable="true" id="tag_${x}">${x}</div>`);
    t += '</div><div class="dnd-targets mt-2">';
    Object.entries(data.elements_to_match).forEach(([k, v]) => {
        t += `<div class="target-zone"><div class="target-label">${k}</div><div class="target-box" data-expected="${v}"></div></div>`;
    });
    t += '</div>';
    let i = `<div class="form-group mt-2"><label>3. Intervención:</label><select id="lvl1_interv" class="form-control"><option value="">Seleccionar...</option>`;
    data.intervention_options.forEach(o => i += `<option value="${o}">${o}</option>`);
    i += `</select></div>`;
    levelWorkspace.innerHTML = h + t + i;
    initDragAndDrop();
}

// ─── NIVEL 2 ───
function buildLevel2(data) {
    let h = `<div class="form-group"><label>1. Identifica la contingencia en cada fase:</label></div><div class="timeline">`;
    data.phases.forEach(p => {
        let o = p.options.map(x => `<option value="${x}">${x}</option>`).join('');
        h += `<div class="timeline-item"><strong>${p.text}</strong><select id="${p.id}" class="form-control"><option value="">Seleccionar...</option>${o}</select></div>`;
    });
    h += '</div>';
    h += `<div class="form-group"><label>2. ${data.question}</label><select id="lvl2_q" class="form-control"><option value="">Seleccionar...</option>`;
    data.question_options.forEach(o => h += `<option value="${o}">${o}</option>`);
    h += '</select></div>';
    h += `<div class="form-group"><label>3. Programa de mantenimiento:</label><select id="lvl2_m" class="form-control"><option value="">Seleccionar...</option>`;
    data.maintenance_options.forEach(o => h += `<option value="${o}">${o}</option>`);
    h += '</select></div>';
    levelWorkspace.innerHTML = h;
}

// ─── NIVEL 3 con animación post-validación ───
function buildLevel3(data) {
    let h = `<div class="form-group"><label>1. Ordena los 8 componentes del modelamiento de Bandura:</label></div>`;
    let shuffled = [...data.terms].sort(() => Math.random() - 0.5);
    h += '<div class="dnd-source" id="sourcePoolBandura">';
    shuffled.forEach(t => { const id = t.replace(/\s/g, '_'); h += `<div class="draggable" draggable="true" id="btag_${id}">${t}</div>`; });
    h += '</div><div class="dnd-targets mt-2" style="display:grid;grid-template-columns:repeat(2,1fr);gap:0.8rem">';
    for (let i = 0; i < data.correct_sequence.length; i++) {
        h += `<div class="target-zone" style="flex-direction:row"><div class="target-label" style="width:70px">Paso ${i + 1}</div><div class="target-box"></div></div>`;
    }
    h += '</div>';
    // Panel de animación (oculto hasta después de validar)
    h += `<div id="animPanel" class="hidden" style="margin-top:2rem;"></div>`;
    h += `<div class="form-group mt-2" style="margin-top:2rem"><label>2. ${data.question}</label><select id="lvl3_q" class="form-control"><option value="">Seleccionar...</option>`;
    data.question_options.forEach(o => h += `<option value="${o}">${o}</option>`);
    h += '</select></div>';
    levelWorkspace.innerHTML = h;
    initDragAndDrop();
}

function runBanduraAnimation(studentSequence, correctSequence, animationSteps) {
    const panel = document.getElementById('animPanel');
    if (!panel) return;
    panel.classList.remove('hidden');
    panel.innerHTML = `
    <div class="anim-stage" style="background:#f0f4ff;border-radius:12px;padding:1.5rem;min-height:200px;text-align:center;">
      <div class="anim-characters" style="margin-bottom:1rem;font-size:2.5rem;display:flex;justify-content:center;gap:1.5rem">
        <div>👧<br><small>Amiga</small></div>
        <div>👩<br><small>Andrea</small></div>
        <div>💀<br><small>Familiar</small></div>
      </div>
      <div id="animStep" style="font-size:1.2rem;min-height:120px;"></div>
      <div style="margin-top:1rem">
        <button id="animPause" class="btn" style="width:auto;padding:0.5rem 1rem;margin:0 0.5rem">⏸ Pausar</button>
        <button id="animPlay" class="btn btn-success" style="width:auto;padding:0.5rem 1rem;margin:0 0.5rem" disabled>▶ Continuar</button>
      </div>
    </div>`;

    let stepIdx = 0, paused = false, timer = null;
    const stepEl = document.getElementById('animStep');
    const pauseBtn = document.getElementById('animPause');
    const playBtn = document.getElementById('animPlay');

    pauseBtn.onclick = () => { paused = true; clearTimeout(timer); pauseBtn.disabled = true; playBtn.disabled = false; };
    playBtn.onclick = () => { paused = false; pauseBtn.disabled = false; playBtn.disabled = true; advance(); };

    function advance() {
        if (stepIdx >= studentSequence.length) { showVerdict(); return; }
        const term = studentSequence[stepIdx];
        const correctTerm = correctSequence[stepIdx];
        const isRight = term === correctTerm;
        const stepData = animationSteps.find(s => s.label === term) || { emoji: '❓', label: term, desc: '' };
        const correctData = animationSteps.find(s => s.label === correctTerm) || { emoji: '❓', label: correctTerm, desc: '' };

        let color = isRight ? '#2ecc71' : '#e74c3c';
        stepEl.innerHTML = `
      <div style="font-size:3rem;animation:bounce 0.6s">${stepData.emoji}</div>
      <div style="font-size:1.4rem;font-weight:700;color:${color};margin:0.5rem 0">Paso ${stepIdx + 1}: ${term}</div>
      <div style="font-size:0.95rem;color:#555">${isRight ? stepData.desc : `<span style="color:#e74c3c">❌ Incorrecto. Aquí debería ir: <strong>${correctTerm}</strong></span><br>${correctData.desc}`}</div>`;

        stepIdx++;
        if (!paused) timer = setTimeout(advance, 2500);
    }

    function showVerdict() {
        const allCorrect = studentSequence.every((t, i) => t === correctSequence[i]);
        stepEl.innerHTML = allCorrect
            ? `<div style="background:#d4edda;padding:1.5rem;border-radius:8px"><h3 style="color:#155724">✅ Correcto — Este es exactamente el proceso que Bandura describe</h3><p>La secuencia Modelo → Observador → Atención → Retención → Reproducción → Motivación → Refuerzo Vicario → Autoeficacia es el flujo completo del aprendizaje observacional.</p></div>`
            : `<div style="background:#f8d7da;padding:1.5rem;border-radius:8px"><h3 style="color:#721c24">❌ Secuencia Incorrecta</h3><p>La secuencia correcta es: ${correctSequence.join(' → ')}. Revisa los pasos marcados en rojo arriba.</p></div>`;
    }

    advance();
}

// ─── NIVEL 4 ───
function buildLevel4(data) {
    let h = `<div class="form-group"><label>1. Clasificación Sistémica:</label></div><div class="panel-grid"><div class="header-row">Táctica</div><div class="header-row">Teoría</div><div class="header-row">Mecanismo</div>`;
    data.interventions.forEach(inv => {
        h += `<div class="panel-item text-left">${inv.text}</div>`;
        let to = inv.theory_options.map(o => `<option value="${o}">${o}</option>`).join('');
        h += `<div class="panel-item"><select id="${inv.id}_t" class="form-control" style="max-width:200px"><option value="">Teoría...</option>${to}</select></div>`;
        let mo = inv.mech_options.map(o => `<option value="${o}">${o}</option>`).join('');
        h += `<div class="panel-item"><select id="${inv.id}_m" class="form-control" style="max-width:200px"><option value="">Mecanismo...</option>${mo}</select></div>`;
    });
    h += '</div>';
    h += `<div class="form-group"><label>2. ${data.predict_question}</label><select id="lvl4_pq" class="form-control"><option value="">Seleccionar...</option>`;
    data.predict_options.forEach(o => h += `<option value="${o}">${o}</option>`);
    h += '</select></div>';
    h += `<div class="form-group mt-2"><label>3. ¿Cuál intervención podría ser contraproducente? Explica.</label><textarea id="lvl4_open1" class="form-control" placeholder="Mínimo 30 caracteres..."></textarea></div>`;
    h += `<div class="form-group"><label>4. Propón una 5ta intervención con teoría y mecanismo.</label><textarea id="lvl4_open2" class="form-control" placeholder="Mínimo 30 caracteres..."></textarea></div>`;
    levelWorkspace.innerHTML = h;
}

// ═══════════════════════════════════════
// NIVEL 5 — LABERINTO
// ═══════════════════════════════════════
let mazePlayerPos = null;
let mazeDoorsAnswered = {};
let mazeScore = 0;

function buildLevel5(data) {
    validateBtn.classList.add('hidden'); // No validate button for maze
    mazePlayerPos = [...data.start];
    mazeDoorsAnswered = {};
    mazeScore = 0;

    let h = `<div class="form-group"><label>Guía a 🧒 Tomás a través del laberinto. Haz clic en una celda adyacente (arriba, abajo, izquierda, derecha) para moverte. Las puertas bloqueadas 🚪 te harán una pregunta.</label></div>`;
    h += '<div id="mazeGrid" class="maze-grid">';

    for (let r = 0; r < data.grid.length; r++) {
        for (let c = 0; c < data.grid[r].length; c++) {
            const val = data.grid[r][c];
            let cls = 'maze-cell';
            let content = '';
            if (val === 0) { cls += ' maze-wall'; }
            else if (val === 2) { cls += ' maze-door'; content = '🚪'; }
            else { cls += ' maze-path'; }
            if (r === data.start[0] && c === data.start[1]) content = '🧒';
            if (r === data.end[0] && c === data.end[1]) { cls += ' maze-exit'; content = content || '🏥'; }
            h += `<div class="${cls}" data-r="${r}" data-c="${c}" id="maze_${r}_${c}">${content}</div>`;
        }
    }
    h += '</div>';
    h += '<div id="mazeQuestion" class="hidden card mt-2" style="border:2px solid var(--primary)"></div>';
    levelWorkspace.innerHTML = h;

    // Click handlers for maze cells
    document.querySelectorAll('.maze-cell:not(.maze-wall)').forEach(cell => {
        cell.addEventListener('click', () => handleMazeClick(cell, data));
    });
}

function handleMazeClick(cell, data) {
    const r = parseInt(cell.dataset.r);
    const c = parseInt(cell.dataset.c);
    const [pr, pc] = mazePlayerPos;

    // Must be adjacent
    const dr = Math.abs(r - pr);
    const dc = Math.abs(c - pc);
    if ((dr + dc) !== 1) return; // Not adjacent

    // Check if it's a door
    const doorKey = `${r}_${c}`;
    if (data.grid[r][c] === 2 && !mazeDoorsAnswered[doorKey]) {
        // Show question
        const door = data.doors.find(d => d.row === r && d.col === c);
        if (door) {
            showMazeQuestion(door, doorKey, r, c, data);
            return;
        }
    }

    // Move player
    movePlayerTo(r, c, data);
}

function showMazeQuestion(door, doorKey, r, c, data) {
    const mqDiv = document.getElementById('mazeQuestion');
    mqDiv.classList.remove('hidden');

    // Mezcla determinista de opciones
    const seed = hashCode(State.codigo + "nivel5" + doorKey);
    const opcionesMezcladas = mezclarOpciones(door.opciones, seed);

    let h = `<h4 style="color:var(--primary)">🚪 Puerta Bloqueada</h4><p style="font-style:italic;margin-bottom:1rem">${door.mini_caso}</p><div class="options-grid">`;
    opcionesMezcladas.forEach(opt => {
        h += `<button class="option-btn maze-opt" data-optval="${opt.replace(/"/g, '&quot;')}">${opt}</button>`;
    });
    h += '</div>';
    mqDiv.innerHTML = h;

    mqDiv.querySelectorAll('.maze-opt').forEach(btn => {
        btn.addEventListener('click', () => {
            const optVal = btn.dataset.optval;
            const correctText = door.opciones[door.correcta];
            const correct = optVal === correctText;

            mqDiv.querySelectorAll('.maze-opt').forEach(b => {
                b.disabled = true;
                if (b.dataset.optval === correctText) b.classList.add('correct');
            });

            if (correct) {
                btn.classList.add('correct');
                mazeDoorsAnswered[doorKey] = true;
                mazeScore++;
                // Open door visually
                const doorCell = document.getElementById(`maze_${r}_${c}`);
                doorCell.classList.remove('maze-door');
                doorCell.classList.add('maze-path', 'maze-opened');
                doorCell.textContent = '✅';
                mqDiv.innerHTML += `<div class="feedback correct mt-1"><strong>¡Puerta abierta!</strong> ${door.explicacion}</div>`;
                setTimeout(() => {
                    mqDiv.classList.add('hidden');
                    movePlayerTo(r, c, data);
                }, 2000);
            } else {
                btn.classList.add('incorrect');
                currentLives--;
                renderLives();
                mqDiv.innerHTML += `<div class="feedback incorrect mt-1"><strong>Puerta cerrada.</strong> ${door.explicacion}</div>`;
                if (currentLives <= 0) {
                    mqDiv.innerHTML += `<p style="color:var(--danger);font-weight:bold;margin-top:1rem">⚠️ Sin vidas. Reiniciando laberinto en 3 segundos...</p>`;
                    State.saveGameLevel(5, { completado: false, vidas_usadas: CONFIG.GAME.LIVES_PER_LEVEL, tiempo_segundos: Math.floor((Date.now() - levelStartTime) / 1000) });
                    setTimeout(() => loadLevel(5), 3000);
                } else {
                    setTimeout(() => mqDiv.classList.add('hidden'), 2500);
                }
            }
        });
    });
}

function movePlayerTo(r, c, data) {
    const oldCell = document.getElementById(`maze_${mazePlayerPos[0]}_${mazePlayerPos[1]}`);
    if (oldCell) {
        oldCell.textContent = oldCell.classList.contains('maze-exit') ? '🏥' : '';
    }
    mazePlayerPos = [r, c];
    const newCell = document.getElementById(`maze_${r}_${c}`);
    newCell.textContent = '🧒';

    // Check if reached exit
    if (r === data.end[0] && c === data.end[1]) {
        gameFeedback.classList.remove('hidden');
        gameFeedback.className = 'feedback correct';
        gameFeedback.innerHTML = `<strong>🎉 ¡Has llegado a Tomás!</strong> Has cruzado el laberinto de su mente abriendo ${mazeScore} puertas correctamente. Tomás ahora puede recibir tratamiento.`;
        patientAvatar.className = 'avatar happy';
        patientAvatar.textContent = '😊';
        State.saveGameLevel(5, { completado: true, vidas_usadas: CONFIG.GAME.LIVES_PER_LEVEL - currentLives, tiempo_segundos: Math.floor((Date.now() - levelStartTime) / 1000), puertas_abiertas: mazeScore });
        DB.sendData(State.buildFinalPayload());
        nextLevelBtn.classList.remove('hidden');
    }
}

// ═══════════════════════════════════════
// NIVEL 6 — PERRO ANTIEXPLOSIVOS
// ═══════════════════════════════════════
let brunoLearn = 0, brunoWell = 100, brunoTurno = 0;
let minefieldPos = null, minefieldLives = 3, minesDetected = 0, minesExploded = 0;
let minefieldQIdx = 0;
let brunoPhase = 'training'; // 'training' or 'minefield'

function buildLevel6(data) {
    validateBtn.classList.add('hidden');
    brunoLearn = 0; brunoWell = 100; brunoTurno = 0;
    brunoPhase = 'training';
    renderTrainingTurn(data);
}

function renderTrainingTurn(data) {
    if (brunoTurno >= data.turnos.length) {
        brunoPhase = 'minefield';
        renderMinefield(data);
        return;
    }
    const turn = data.turnos[brunoTurno];
    let h = `
    <div class="bruno-dashboard" style="display:flex;gap:1.5rem;margin-bottom:1.5rem;flex-wrap:wrap">
      <div style="flex:1;min-width:200px;text-align:center">
        <div style="font-size:4rem" id="brunoEmoji">🐕</div>
        <div style="font-weight:700;margin:0.5rem 0">Bruno</div>
        <div class="bruno-bar"><label>Aprendizaje: <span id="learnVal">${brunoLearn}%</span></label>
          <div class="bar-bg"><div class="bar-fill bar-learn" style="width:${brunoLearn}%"></div></div></div>
        <div class="bruno-bar"><label>Bienestar: <span id="wellVal">${brunoWell}%</span></label>
          <div class="bar-bg"><div class="bar-fill bar-well" style="width:${brunoWell}%"></div></div></div>
      </div>
      <div style="flex:2;min-width:300px">
        <h4>Turno ${turn.turno} de 5 — ${turn.concepto}</h4>
        <p style="font-style:italic;margin-bottom:1rem">${turn.situacion}</p>
        <div class="options-grid">`;

    // Mezclar índices de forma determinista para Nivel 6 Turnos
    const seed = hashCode(State.codigo + "nivel6" + turn.turno);
    let indices = [0, 1, 2, 3];
    indices = mezclarOpciones(indices, seed);

    indices.forEach(i => {
        h += `<button class="option-btn bruno-opt" data-idx="${i}">${turn.opciones[i]}</button>`;
    });
    h += `</div></div></div><div id="brunoFeedback"></div>`;
    levelWorkspace.innerHTML = h;

    document.querySelectorAll('.bruno-opt').forEach(btn => {
        btn.addEventListener('click', () => handleBrunoChoice(btn, turn, data));
    });
}

function handleBrunoChoice(btn, turn, data) {
    const idx = parseInt(btn.dataset.idx);
    document.querySelectorAll('.bruno-opt').forEach(b => b.disabled = true);

    let result, explanation, emoji;
    if (idx === turn.correcta) {
        result = turn.consecuencias.correcta;
        explanation = turn.explicacion_correcta;
        emoji = '🐕😊';
        btn.classList.add('correct');
    } else if (idx === turn.suboptima) {
        result = turn.consecuencias.suboptima;
        explanation = turn.explicacion_suboptima;
        emoji = '🐕😟';
        btn.style.background = '#f0ad4e'; btn.style.color = 'white';
    } else {
        result = turn.consecuencias.incorrecta;
        explanation = turn.explicacion_incorrecta;
        emoji = '🐕😰';
        btn.classList.add('incorrect');
    }

    brunoLearn = Math.min(100, Math.max(0, brunoLearn + result.aprendizaje));
    brunoWell = Math.min(100, Math.max(0, brunoWell + result.bienestar));

    document.getElementById('brunoEmoji').textContent = emoji;
    document.getElementById('learnVal').textContent = brunoLearn + '%';
    document.getElementById('wellVal').textContent = brunoWell + '%';
    document.querySelector('.bar-learn').style.width = brunoLearn + '%';
    document.querySelector('.bar-well').style.width = brunoWell + '%';

    const fb = document.getElementById('brunoFeedback');
    fb.innerHTML = `<div class="feedback ${idx === turn.correcta ? 'correct' : 'incorrect'} mt-1"><strong>${idx === turn.correcta ? '¡Excelente decisión!' : 'Decisión subóptima.'}</strong><br>${explanation}</div>`;

    if (brunoWell <= 0) {
        fb.innerHTML += `<p style="color:var(--danger);font-weight:bold;margin-top:1rem">⚠️ Bruno se niega a continuar. Su bienestar llegó a 0%. Reiniciando entrenamiento en 4 segundos...</p>`;
        setTimeout(() => { brunoLearn = 0; brunoWell = 100; brunoTurno = 0; renderTrainingTurn(data); }, 4000);
        return;
    }

    setTimeout(() => {
        brunoTurno++;
        renderTrainingTurn(data);
    }, 2500);
}

function renderMinefield(data) {
    minefieldPos = [0, 0]; minefieldLives = CONFIG.GAME.LIVES_PER_LEVEL; minesDetected = 0; minesExploded = 0; minefieldQIdx = 0;
    currentLives = minefieldLives;
    renderLives();

    let h = `
    <div class="form-group"><label>🐕 Bruno está entrenado (Aprendizaje: ${brunoLearn}%, Bienestar: ${brunoWell}%). Ahora guíalo por el campo minado 5×5. Haz clic en una casilla adyacente para moverse. Si respondes correctamente, Bruno detecta las minas.</label></div>
    <div id="minefieldGrid" class="minefield-grid">`;
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            let content = '❓';
            let cls = 'mine-cell';
            if (r === 0 && c === 0) { content = '🐕'; cls += ' mine-revealed'; }
            if (r === 4 && c === 4) { content = '🏁'; }
            h += `<div class="${cls}" data-r="${r}" data-c="${c}" id="mf_${r}_${c}">${content}</div>`;
        }
    }
    h += '</div><div id="mfQuestion" class="hidden card mt-2" style="border:2px solid var(--primary)"></div>';
    levelWorkspace.innerHTML = h;

    document.querySelectorAll('.mine-cell').forEach(cell => {
        cell.addEventListener('click', () => handleMinefieldClick(cell, data));
    });
}

function handleMinefieldClick(cell, data) {
    const r = parseInt(cell.dataset.r), c = parseInt(cell.dataset.c);
    const [pr, pc] = minefieldPos;
    if ((Math.abs(r - pr) + Math.abs(c - pc)) !== 1) return;

    // Show question first
    const cm = data.campo_minado;
    const q = cm.preguntas[minefieldQIdx % cm.preguntas.length];
    minefieldQIdx++;

    const mqDiv = document.getElementById('mfQuestion');
    mqDiv.classList.remove('hidden');

    // Mezcla determinista de opciones
    const seed = hashCode(State.codigo + "nivel6_mina_" + minefieldQIdx);
    const opcionesMezcladas = mezclarOpciones(q.opciones, seed);

    let h = `<h4>🐕 Bruno olfatea... ¿Puedes ayudarlo?</h4><p style="font-style:italic;margin-bottom:1rem">${q.pregunta}</p><div class="options-grid">`;
    opcionesMezcladas.forEach(opt => h += `<button class="option-btn mf-opt" data-optval="${opt.replace(/"/g, '&quot;')}">${opt}</button>`);
    h += '</div>';
    mqDiv.innerHTML = h;

    mqDiv.querySelectorAll('.mf-opt').forEach(btn => {
        btn.addEventListener('click', () => {
            const optVal = btn.dataset.optval;
            const correctText = q.opciones[q.correcta];
            const correct = optVal === correctText;

            mqDiv.querySelectorAll('.mf-opt').forEach(b => {
                b.disabled = true;
                if (b.dataset.optval === correctText) b.classList.add('correct');
            });
            if (!correct) btn.classList.add('incorrect');

            const hasMine = cm.minas.some(m => m[0] === r && m[1] === c);

            setTimeout(() => {
                mqDiv.classList.add('hidden');
                // Move Bruno
                const oldCell = document.getElementById(`mf_${pr}_${pc}`);
                oldCell.textContent = '✅'; oldCell.classList.add('mine-revealed');
                minefieldPos = [r, c];
                const newCell = document.getElementById(`mf_${r}_${c}`);
                newCell.classList.add('mine-revealed');

                if (hasMine) {
                    if (correct) {
                        // Detected!
                        newCell.textContent = '🚩'; minesDetected++;
                        gameFeedback.className = 'feedback correct'; gameFeedback.classList.remove('hidden');
                        gameFeedback.innerHTML = `<strong>🚩 ¡Bruno detectó una mina!</strong> Tu respuesta correcta le permitió olfatear el peligro.`;
                    } else {
                        // Exploded!
                        newCell.textContent = '💥'; minesExploded++;
                        currentLives--; minefieldLives = currentLives;
                        renderLives();
                        gameFeedback.className = 'feedback incorrect'; gameFeedback.classList.remove('hidden');
                        gameFeedback.innerHTML = `<strong>💥 ¡Mina explotada!</strong> Tu respuesta incorrecta impidió que Bruno detectara el peligro. ${q.explicacion}`;
                        if (currentLives <= 0) {
                            gameFeedback.innerHTML += `<br><strong style="color:var(--danger)">⚠️ Sin vidas. Reiniciando campo minado...</strong>`;
                            State.saveGameLevel(6, { completado: false, vidas_usadas: CONFIG.GAME.LIVES_PER_LEVEL, barra_aprendizaje_final: brunoLearn, barra_bienestar_final: brunoWell, minas_detectadas: minesDetected, minas_explotadas: minesExploded, tiempo_segundos: Math.floor((Date.now() - levelStartTime) / 1000) });
                            setTimeout(() => renderMinefield(data), 3000);
                            return;
                        }
                    }
                } else {
                    newCell.textContent = '🐕';
                    gameFeedback.className = 'feedback correct'; gameFeedback.classList.remove('hidden');
                    gameFeedback.innerHTML = correct ? `<strong>✅ Terreno seguro.</strong> Respuesta correcta. Bruno avanza con confianza.` : `<strong>✅ Terreno seguro, pero respuesta incorrecta.</strong> ${q.explicacion}`;
                }

                // Check if reached exit
                if (r === 4 && c === 4) {
                    gameFeedback.className = 'feedback correct';
                    gameFeedback.innerHTML = `<strong>🐕🎉 ¡Misión cumplida!</strong> Bruno cruzó el campo minado. Minas detectadas: ${minesDetected}, Minas explotadas: ${minesExploded}. ¡Una sesión clínica heroica!`;
                    patientAvatar.textContent = '🐕'; patientAvatar.className = 'avatar happy';
                    State.saveGameLevel(6, { completado: true, vidas_usadas: CONFIG.GAME.LIVES_PER_LEVEL - currentLives, barra_aprendizaje_final: brunoLearn, barra_bienestar_final: brunoWell, minas_detectadas: minesDetected, minas_explotadas: minesExploded, tiempo_segundos: Math.floor((Date.now() - levelStartTime) / 1000) });
                    DB.sendData(State.buildFinalPayload());
                    nextLevelBtn.classList.remove('hidden');
                    nextLevelBtn.textContent = 'Finalizar Parcial';
                }
            }, 1500);
        });
    });
}

// ═══════════════════════════════════════
// Drag & Drop con soporte mouse + touch
// ═══════════════════════════════════════
let draggedElement = null;
function initDragAndDrop() {
    const draggables = document.querySelectorAll('.draggable');
    const targets = document.querySelectorAll('.target-box');
    const sources = document.querySelectorAll('.dnd-source');
    const allZones = [...targets, ...sources];

    draggables.forEach(d => {
        d.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', e.target.id); draggedElement = e.target; setTimeout(() => e.target.style.opacity = '0.4', 0); });
        d.addEventListener('dragend', e => { e.target.style.opacity = '1'; draggedElement = null; });
        d.addEventListener('touchstart', touchStart, { passive: false });
        d.addEventListener('touchmove', touchMove, { passive: false });
        d.addEventListener('touchend', touchEnd, { passive: false });
    });
    allZones.forEach(box => {
        box.addEventListener('dragover', e => { e.preventDefault(); if (box.classList.contains('target-box')) box.style.borderColor = 'var(--primary)'; });
        box.addEventListener('dragleave', () => box.style.borderColor = '');
        box.addEventListener('drop', e => { e.preventDefault(); box.style.borderColor = ''; const el = document.getElementById(e.dataTransfer.getData('text/plain')); if (el) dropInto(el, box); });
    });
}
function dropInto(el, box) { if (box.classList.contains('target-box') && box.children.length > 0) { const src = document.querySelector('.dnd-source'); if (src) src.appendChild(box.firstChild); } box.appendChild(el); }

let touchClone = null, touchOrigin = null;
function touchStart(e) { e.preventDefault(); draggedElement = e.target.closest('.draggable'); if (!draggedElement) return; touchOrigin = draggedElement.parentNode; touchClone = draggedElement.cloneNode(true); touchClone.style.cssText = 'position:fixed;pointer-events:none;opacity:0.7;z-index:9999'; document.body.appendChild(touchClone); const t = e.touches[0]; touchClone.style.left = t.clientX - 30 + 'px'; touchClone.style.top = t.clientY - 20 + 'px'; draggedElement.style.opacity = '0.3'; }
function touchMove(e) { e.preventDefault(); if (!touchClone) return; const t = e.touches[0]; touchClone.style.left = t.clientX - 30 + 'px'; touchClone.style.top = t.clientY - 20 + 'px'; }
function touchEnd(e) { e.preventDefault(); if (!draggedElement || !touchClone) return; if (touchClone.parentNode) touchClone.parentNode.removeChild(touchClone); touchClone = null; draggedElement.style.opacity = '1'; const t = e.changedTouches[0]; const drop = document.elementFromPoint(t.clientX, t.clientY); if (drop) { const box = drop.closest('.target-box') || drop.closest('.dnd-source'); if (box) dropInto(draggedElement, box); } draggedElement = null; }

// ═══════════════════════════════════════
// Validación
// ═══════════════════════════════════════
validateBtn.addEventListener('click', validateCurrentLevel);
nextLevelBtn.addEventListener('click', () => goToNextLevel());

function validateCurrentLevel() {
    const data = currentLevelData;
    let isCorrect = true, errorMsg = "Completa todos los campos.";

    if (data.type === 'clasico_basico') {
        let ok = true;
        Object.keys(data.elements).forEach(k => { const s = document.getElementById(`tut_${k}`); if (!s || !s.value) ok = false; else if (s.value !== k) isCorrect = false; });
        if (!ok) { isCorrect = false; errorMsg = "Selecciona una clasificación para cada componente."; }
        else if (!isCorrect) errorMsg = "Revisa: EN (antes del trauma), EI (causa natural), RI (respuesta natural), EC (después del aprendizaje), RC (respuesta aprendida).";
    }
    else if (data.type === 'drag_and_drop_clasico') {
        const d = document.getElementById('lvl1_diag').value, inter = document.getElementById('lvl1_interv').value;
        if (!d || !inter) { isCorrect = false; errorMsg = "Selecciona diagnóstico e intervención."; }
        else {
            if (d !== data.diagnosis_correct) isCorrect = false; if (inter !== data.intervention_correct) isCorrect = false; document.querySelectorAll('.target-box[data-expected]').forEach(b => { if (!b.firstChild || b.firstChild.textContent !== b.getAttribute('data-expected')) isCorrect = false; });
            if (!isCorrect) errorMsg = data.socratic_feedback;
        }
    }
    else if (data.type === 'timeline_operante') {
        const f1 = document.getElementById('fase1').value, f2 = document.getElementById('fase2').value, q = document.getElementById('lvl2_q').value, m = document.getElementById('lvl2_m').value;
        if (!f1 || !f2 || !q || !m) { isCorrect = false; errorMsg = "Completa todos los campos."; }
        else if (f1 !== data.phases[0].correct || f2 !== data.phases[1].correct || q !== data.question_options[data.question_correct] || m !== data.maintenance_options[data.maintenance_correct]) { isCorrect = false; errorMsg = data.socratic_feedback; }
    }
    else if (data.type === 'bandura_sequence') {
        const q = document.getElementById('lvl3_q').value;
        if (!q) { isCorrect = false; errorMsg = "Selecciona la predicción."; }
        else if (q !== data.question_options[data.question_correct]) isCorrect = false;
        const drops = document.querySelectorAll('.dnd-targets .target-box');
        let seq = []; drops.forEach(d => { if (d.firstChild) seq.push(d.firstChild.textContent); });
        if (seq.length !== data.correct_sequence.length) { isCorrect = false; errorMsg = "Arrastra las 8 tarjetas."; }
        else if (seq.join(',') !== data.correct_sequence.join(',')) isCorrect = false;
        if (!isCorrect && seq.length === data.correct_sequence.length) errorMsg = data.socratic_feedback;

        // Run animation regardless (shows correct vs incorrect)
        if (seq.length === data.correct_sequence.length && data.animation_steps) {
            runBanduraAnimation(seq, data.correct_sequence, data.animation_steps);
        }
    }
    else if (data.type === 'integrador') {
        let ok = true;
        data.interventions.forEach(inv => { const t = document.getElementById(`${inv.id}_t`).value, m = document.getElementById(`${inv.id}_m`).value; if (!t || !m) ok = false; else if (t !== inv.theory_correct || m !== inv.mech_correct) isCorrect = false; });
        const pq = document.getElementById('lvl4_pq').value; if (!pq) ok = false; else if (pq !== data.predict_options[data.predict_correct]) isCorrect = false;
        const t1 = document.getElementById('lvl4_open1').value.trim(), t2 = document.getElementById('lvl4_open2').value.trim();
        if (!t1 || t1.length < 30 || !t2 || t2.length < 30) ok = false;
        if (!ok) { isCorrect = false; errorMsg = "Completa todas las listas y textos (mín 30 caracteres)."; }
        else if (!isCorrect) errorMsg = data.socratic_feedback;
        else State.saveGameOpenAnswers({ nivel4_contraproducente: t1, nivel4_intervencion: t2 });
    }

    showFeedback(isCorrect, errorMsg);
}

function showFeedback(isCorrect, errorMsg) {
    gameFeedback.classList.remove('hidden');
    if (isCorrect) {
        gameFeedback.className = 'feedback correct';
        gameFeedback.innerHTML = "<strong>¡Intervención Exitosa!</strong> El paciente muestra mejoría conductual.";
        patientAvatar.className = 'avatar happy'; patientAvatar.textContent = '😊';
        validateBtn.classList.add('hidden');
        nextLevelBtn.classList.remove('hidden');
        if (currentLevelIdx > 0) {
            State.saveGameLevel(currentLevelIdx, { completado: true, vidas_usadas: CONFIG.GAME.LIVES_PER_LEVEL - currentLives, tiempo_segundos: Math.floor((Date.now() - levelStartTime) / 1000) });
            DB.sendData(State.buildFinalPayload());
        }
    } else {
        if (currentLevelIdx > 0) { currentLives--; renderLives(); }
        gameFeedback.className = 'feedback incorrect';
        gameFeedback.innerHTML = errorMsg;
        patientAvatar.className = 'avatar sad'; patientAvatar.textContent = '😟';
        if (currentLevelIdx > 0 && currentLives <= 0) {
            validateBtn.disabled = true;
            gameFeedback.innerHTML += "<br><strong style='color:#a8201a'>⚠️ Sin vidas. Reiniciando nivel en 5 segundos.</strong>";
            State.saveGameLevel(currentLevelIdx, { completado: false, vidas_usadas: CONFIG.GAME.LIVES_PER_LEVEL, tiempo_segundos: Math.floor((Date.now() - levelStartTime) / 1000) });
            setTimeout(() => loadLevel(currentLevelIdx), 5000);
        }
    }
}

async function goToNextLevel() {
    currentLevelIdx++;
    if (currentLevelIdx <= 6) loadLevel(currentLevelIdx);
    else await finishGame();
}

async function finishGame() {
    clearInterval(gameTimerInterval);
    gameStage.classList.add('hidden');
    levelTitle.textContent = "Parcial Finalizado";
    gameSummary.classList.remove('hidden');
    const gd = State.getGameData();
    let payload = State.buildFinalPayload();

    // Primero enviamos los datos (asíncrono)
    await DB.sendData(payload);

    if (typeof calcularNota === 'function') {
        const nota = calcularNota(payload);
        payload.desglose_nota = nota;

        gameSummary.innerHTML = `
            <h2 style="color:var(--primary); margin-bottom:1rem;">¡Has completado el Parcial de Modelos de Aprendizaje!</h2>
            <p style="margin-bottom:1.5rem; color:#555">Tus respuestas y decisiones terapéuticas han sido procesadas por el sistema.</p>
            <div class="score-details" style="text-align:left; max-width:600px; margin: 0 auto; background:#f8fafc; padding:2rem; border-radius:12px; box-shadow:0 4px 15px rgba(0,0,0,0.05); border:1px solid #e2e8f0;">
                <div style="display:flex; justify-content:space-between; margin-bottom:0.8rem; font-size:1.1rem;">
                    <span>Parte 1 (Quiz Teórico):</span>
                    <strong>${nota.nota_p1.toFixed(1)} / ${(SCORING.quiz.peso_total * 5).toFixed(1)}</strong>
                </div>
                <div style="display:flex; justify-content:space-between; margin-bottom:1.5rem; font-size:1.1rem;">
                    <span>Parte 2 (Juego Práctico):</span>
                    <strong>${nota.nota_p2.toFixed(1)} / ${(SCORING.juego.peso_total * 5).toFixed(1)}</strong>
                </div>
                
                <div style="text-align:center; padding:1.5rem 0; border-top:2px solid #e2e8f0; border-bottom:2px solid #e2e8f0; margin-bottom:1.5rem;">
                    <span style="font-size:1.2rem; display:block; margin-bottom:0.5rem; color:#64748b;">Calificación Final</span>
                    <strong style="font-size:3rem; color: ${nota.nota_final >= 3.0 ? 'var(--success)' : 'var(--danger)'};">${nota.nota_final.toFixed(1)}</strong>
                    <span style="font-size:1.5rem; color:#94a3b8;">/ 5.0</span>
                </div>

                <div style="margin-top:1rem">
                    <p style="color:var(--success); margin-bottom:0.5rem;"><strong style="display:inline-block; width:130px;">🌟 Fortalezas:</strong> ${nota.fortalezas.join(', ')}</p>
                    <p style="color:var(--danger); margin-bottom:0.5rem;"><strong style="display:inline-block; width:130px;">📈 Para Reforzar:</strong> ${nota.para_reforzar.join(', ')}</p>
                </div>
            </div>
            <button class="btn mt-2" style="margin-top:2rem;" onclick="window.location.href='../index.html'">Volver a la Pantalla de Inicio</button>
        `;
    } else {
        document.getElementById('maxLevelDisplay').textContent = gd.nivel_alcanzado || 0;
    }
}

window.addEventListener('DOMContentLoaded', initGame);
