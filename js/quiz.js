// js/quiz.js

// Funciones de utilidad para pseudo-random determinista
function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = Math.imul(31, hash) + str.charCodeAt(i) | 0;
    }
    return hash;
}

function mulberry32(a) {
    return function () {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

// Fisher-Yates shuffle determinista usando RNG
function shuffleArray(array, rng) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Variables globales del quiz
let currentQuestions = [];
let currentIdx = 0;
let scores = { clasico: 0, operante: 0, social: 0 };
let startTime, timerInterval;

// DOM Elements
const timerDisplay = document.getElementById('timerDisplay');
const progressDisplay = document.getElementById('progressDisplay');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const feedbackContainer = document.getElementById('feedbackContainer');
const nextBtn = document.getElementById('nextBtn');
const quizContainer = document.getElementById('quizContainer');
const summaryContainer = document.getElementById('summaryContainer');
const studentDisplay = document.getElementById('studentDisplay');

// Inicialización
function initQuiz() {
    if (!State.isLoggedIn()) {
        window.location.href = '../index.html';
        return;
    }

    const student = State.getStudent();
    studentDisplay.textContent = `Estudiante: ${student.name} (${student.id})`;

    // Si ya tiene resultados, saltar al resumen para mantener idempotencia
    const prevResults = State.getQuizResults();
    if (prevResults) {
        showSummary(prevResults);
        return;
    }

    // Generar pool de preguntas basado en el código estudiantil (Determinista)
    const seed = hashString(student.id);
    const rng = mulberry32(seed);

    const bank = QUESTIONS_BANK;

    // Filtrar por pilar teórico
    let clasico = bank.filter(q => q.topic === 'clasico');
    let operante = bank.filter(q => q.topic === 'operante');
    let social = bank.filter(q => q.topic === 'social');

    // Seleccionar Qstns p/ tema pseudo-aleatoriamente
    shuffleArray(clasico, rng);
    shuffleArray(operante, rng);
    shuffleArray(social, rng);

    clasico = clasico.slice(0, CONFIG.QUIZ.QUESTIONS_PER_TOPIC);
    operante = operante.slice(0, CONFIG.QUIZ.QUESTIONS_PER_TOPIC);
    social = social.slice(0, CONFIG.QUIZ.QUESTIONS_PER_TOPIC);

    // Mezclar todo el subset final
    currentQuestions = [...clasico, ...operante, ...social];
    if (CONFIG.QUIZ.RANDOMIZE_QUESTIONS) {
        shuffleArray(currentQuestions, rng);
    }

    // Iniciar timer
    startTime = Date.now();
    startTimer(CONFIG.QUIZ.TIME_LIMIT_MINUTES * 60);

    // Mostrar primera pregunta
    renderQuestion();
}

// Temporizador visual
function startTimer(durationSeconds) {
    let timeRemaining = durationSeconds;
    updateTimerDisplay(timeRemaining);

    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay(timeRemaining);

        if (timeRemaining <= 0) {
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
    alert("El tiempo se ha agotado. Enviaremos tus respuestas recopiladas automáticamente.");
    // Finalizar con el score actual de preguntas respondidas
    finishQuiz();
}

function renderQuestion() {
    const q = currentQuestions[currentIdx];
    progressDisplay.textContent = `Pregunta ${currentIdx + 1} de ${CONFIG.QUIZ.TOTAL_QUESTIONS}`;
    questionText.textContent = q.question;

    feedbackContainer.classList.add('hidden');
    nextBtn.classList.add('hidden');
    optionsContainer.innerHTML = '';

    let options = [q.correct, ...q.distractors];
    if (CONFIG.QUIZ.RANDOMIZE_OPTIONS) {
        // Permutación de las opciones basada en un seed derivado de la pregunta y el estudiante
        const qRng = mulberry32(hashString(q.id + State.getStudent().id));
        shuffleArray(options, qRng);
    }

    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => handleAnswer(opt, btn, q);
        optionsContainer.appendChild(btn);
    });
}

function handleAnswer(selectedOpt, btnElement, q) {
    // Desactivar botones previene múltiples envíos
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

    if (currentIdx < currentQuestions.length - 1) {
        nextBtn.textContent = "Siguiente Pregunta";
        nextBtn.onclick = () => {
            currentIdx++;
            renderQuestion();
        };
    } else {
        nextBtn.textContent = "Finalizar Parte 1";
        nextBtn.onclick = finishQuiz;
    }
    nextBtn.classList.remove('hidden');
}

async function finishQuiz() {
    clearInterval(timerInterval);

    const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
    const total = scores.clasico + scores.operante + scores.social;

    const results = {
        puntaje_clasico: scores.clasico,
        puntaje_operante: scores.operante,
        puntaje_social: scores.social,
        puntaje_total: total,
        tiempo_segundos: timeElapsed,
        preguntas_respondidas: currentIdx + 1
    };

    State.saveQuizResults(results);

    // Enviar a Google Sheets
    const payload = State.buildFinalPayload();
    await DB.sendData(payload);

    showSummary(results);
}

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

// Escuchar el evento de carga para inicializar
window.addEventListener('DOMContentLoaded', initQuiz);
