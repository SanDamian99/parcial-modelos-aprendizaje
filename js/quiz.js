// js/quiz.js
// Lógica del Quiz de Opción Múltiple — Parte 1 del parcial
// Selección determinista de preguntas basada en el código estudiantil.

// ═══════════════════════════════════════
// Generador pseudo-aleatorio determinista
// ═══════════════════════════════════════

/** Genera un hash numérico a partir de un string */
function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = Math.imul(31, hash) + str.charCodeAt(i) | 0;
    }
    return hash;
}

/** Generador Mulberry32 — PRNG determinista con semilla */
function mulberry32(a) {
    return function () {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

/** Shuffle Fisher-Yates determinista */
function shuffleArray(array, rng) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// ═══════════════════════════════════════
// Variables de estado del quiz
// ═══════════════════════════════════════
let currentQuestions = [];
let currentIdx = 0;
let scores = { clasico: 0, operante: 0, social: 0 };
let quizStartTime;
let timerInterval;
let timerRemaining;
let answered = false; // Flag para prevenir doble-respuesta

// ═══════════════════════════════════════
// Referencias al DOM
// ═══════════════════════════════════════
const timerDisplay = document.getElementById('timerDisplay');
const progressDisplay = document.getElementById('progressDisplay');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const feedbackContainer = document.getElementById('feedbackContainer');
const nextBtn = document.getElementById('nextBtn');
const quizContainer = document.getElementById('quizContainer');
const summaryContainer = document.getElementById('summaryContainer');
const studentDisplay = document.getElementById('studentDisplay');

// ═══════════════════════════════════════
// Inicialización y restauración de estado
// ═══════════════════════════════════════
function initQuiz() {
    if (!State.isLoggedIn()) {
        window.location.href = '../index.html';
        return;
    }

    const student = State.getStudent();
    studentDisplay.textContent = `Estudiante: ${student.name} (${student.id})`;

    // Si ya tiene resultados finales, mostrar resumen directamente (idempotencia)
    const prevResults = State.getQuizResults();
    if (prevResults && prevResults.puntaje_total !== undefined) {
        showSummary(prevResults);
        return;
    }

    // Generar pool de preguntas (determinista — misma semilla = mismas preguntas)
    const seed = hashString(student.id);
    const rng = mulberry32(seed);

    const bank = QUESTIONS_BANK;

    // Filtrar por tema y seleccionar exactamente 5 por tema
    let clasico = bank.filter(q => q.topic === 'clasico');
    let operante = bank.filter(q => q.topic === 'operante');
    let social = bank.filter(q => q.topic === 'social');

    shuffleArray(clasico, rng);
    shuffleArray(operante, rng);
    shuffleArray(social, rng);

    clasico = clasico.slice(0, CONFIG.QUIZ.QUESTIONS_PER_TOPIC);
    operante = operante.slice(0, CONFIG.QUIZ.QUESTIONS_PER_TOPIC);
    social = social.slice(0, CONFIG.QUIZ.QUESTIONS_PER_TOPIC);

    // Mezclar las 15 preguntas seleccionadas
    currentQuestions = [...clasico, ...operante, ...social];
    if (CONFIG.QUIZ.RANDOMIZE_QUESTIONS) {
        shuffleArray(currentQuestions, rng);
    }

    // Restaurar progreso parcial si existe (recarga de página)
    const savedProgress = sessionStorage.getItem('quizProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        currentIdx = progress.currentIdx || 0;
        scores = progress.scores || { clasico: 0, operante: 0, social: 0 };
        timerRemaining = progress.timerRemaining;
    }

    // Iniciar temporizador
    quizStartTime = Date.now();
    const duration = timerRemaining || CONFIG.QUIZ.TIME_LIMIT_MINUTES * 60;
    startTimer(duration);

    // Mostrar pregunta actual
    renderQuestion();
}

// ═══════════════════════════════════════
// Temporizador con persistencia
// ═══════════════════════════════════════
function startTimer(durationSeconds) {
    timerRemaining = durationSeconds;
    updateTimerDisplay(timerRemaining);

    timerInterval = setInterval(() => {
        timerRemaining--;
        updateTimerDisplay(timerRemaining);

        // Guardar progreso cada 10 segundos
        if (timerRemaining % 10 === 0) {
            saveQuizProgress();
        }

        if (timerRemaining <= 0) {
            clearInterval(timerInterval);
            handleTimeOut();
        }
    }, 1000);
}

function updateTimerDisplay(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `Tiempo restante: ${m}:${s}`;
    if (seconds < 60) {
        timerDisplay.style.color = 'var(--danger)';
    }
}

function handleTimeOut() {
    alert("El tiempo se ha agotado. Enviaremos tus respuestas automáticamente.");
    finishQuiz();
}

/** Persiste el progreso parcial en sessionStorage */
function saveQuizProgress() {
    sessionStorage.setItem('quizProgress', JSON.stringify({
        currentIdx: currentIdx,
        scores: scores,
        timerRemaining: timerRemaining
    }));
}

// ═══════════════════════════════════════
// Renderizado de pregunta y opciones
// ═══════════════════════════════════════
function renderQuestion() {
    if (currentIdx >= currentQuestions.length) {
        finishQuiz();
        return;
    }

    answered = false;
    const q = currentQuestions[currentIdx];
    progressDisplay.textContent = `Pregunta ${currentIdx + 1} de ${CONFIG.QUIZ.TOTAL_QUESTIONS}`;
    questionText.textContent = q.question;

    feedbackContainer.classList.add('hidden');
    nextBtn.classList.add('hidden');
    optionsContainer.innerHTML = '';

    // Construir opciones mezcladas determinísticamente
    let options = [q.correct, ...q.distractors];
    if (CONFIG.QUIZ.RANDOMIZE_OPTIONS) {
        const qRng = mulberry32(hashString(q.id + State.getStudent().id));
        shuffleArray(options, qRng);
    }

    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.addEventListener('click', () => handleAnswer(opt, btn, q));
        optionsContainer.appendChild(btn);
    });
}

// ═══════════════════════════════════════
// Manejo de respuesta con feedback inmediato
// ═══════════════════════════════════════
function handleAnswer(selectedOpt, btnElement, q) {
    // Prevenir doble-clic
    if (answered) return;
    answered = true;

    // Desactivar todas las opciones
    Array.from(optionsContainer.children).forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === q.correct) {
            btn.classList.add('correct');
        }
    });

    const isCorrect = selectedOpt === q.correct;
    if (!isCorrect) {
        btnElement.classList.add('incorrect');
        feedbackContainer.className = 'feedback incorrect';
        feedbackContainer.innerHTML = `<strong>Incorrecto.</strong><br/>${q.explanation}`;
    } else {
        feedbackContainer.className = 'feedback correct';
        feedbackContainer.innerHTML = `<strong>¡Correcto!</strong><br/>${q.explanation}`;
        scores[q.topic]++;
    }

    feedbackContainer.classList.remove('hidden');

    // Guardar progreso tras cada respuesta
    saveQuizProgress();

    if (currentIdx < currentQuestions.length - 1) {
        nextBtn.textContent = "Siguiente Pregunta";
        nextBtn.onclick = () => {
            currentIdx++;
            saveQuizProgress();
            renderQuestion();
        };
    } else {
        nextBtn.textContent = "Finalizar Parte 1";
        nextBtn.onclick = finishQuiz;
    }
    nextBtn.classList.remove('hidden');
}

// ═══════════════════════════════════════
// Finalización del quiz
// ═══════════════════════════════════════
async function finishQuiz() {
    clearInterval(timerInterval);

    const timeElapsed = CONFIG.QUIZ.TIME_LIMIT_MINUTES * 60 - (timerRemaining || 0);
    const total = scores.clasico + scores.operante + scores.social;

    const results = {
        puntaje_clasico: scores.clasico,
        puntaje_operante: scores.operante,
        puntaje_social: scores.social,
        puntaje_total: total,
        tiempo_segundos: timeElapsed,
        preguntas_respondidas: Math.min(currentIdx + 1, CONFIG.QUIZ.TOTAL_QUESTIONS)
    };

    State.saveQuizResults(results);
    // Limpiar progreso parcial
    sessionStorage.removeItem('quizProgress');

    // Enviar a Google Sheets
    const payload = State.buildFinalPayload();
    await DB.sendData(payload);

    showSummary(results);
}

// ═══════════════════════════════════════
// Resumen final
// ═══════════════════════════════════════
function showSummary(results) {
    quizContainer.classList.add('hidden');
    summaryContainer.classList.remove('hidden');

    document.getElementById('scoreDetails').innerHTML = `
    <div class="score-item">Clásico: <strong>${results.puntaje_clasico}/${CONFIG.QUIZ.QUESTIONS_PER_TOPIC}</strong></div>
    <div class="score-item">Operante: <strong>${results.puntaje_operante}/${CONFIG.QUIZ.QUESTIONS_PER_TOPIC}</strong></div>
    <div class="score-item">Bandura/Social: <strong>${results.puntaje_social}/${CONFIG.QUIZ.QUESTIONS_PER_TOPIC}</strong></div>
  `;
    document.getElementById('totalScore').textContent = `${results.puntaje_total} / ${CONFIG.QUIZ.TOTAL_QUESTIONS}`;

    document.getElementById('goToGameBtn').addEventListener('click', () => {
        window.location.href = '../parte2/index.html';
    });
}

// Inicializar al cargar la página
window.addEventListener('DOMContentLoaded', initQuiz);
