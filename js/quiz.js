// js/quiz.js
// Lógica del Quiz — Parte 1. Selección determinista + contexto diversificado.

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

function shuffleArray(array, rng) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let currentQuestions = [];
let currentIdx = 0;
let scores = { clasico: 0, operante: 0, social: 0 };
let quizStartTime, timerInterval, timerRemaining;
let answered = false;

const timerDisplay = document.getElementById('timerDisplay');
const progressDisplay = document.getElementById('progressDisplay');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const feedbackContainer = document.getElementById('feedbackContainer');
const nextBtn = document.getElementById('nextBtn');
const quizContainer = document.getElementById('quizContainer');
const summaryContainer = document.getElementById('summaryContainer');
const studentDisplay = document.getElementById('studentDisplay');

function initQuiz() {
    if (!State.isLoggedIn()) { window.location.href = '../index.html'; return; }
    const student = State.getStudent();
    studentDisplay.textContent = `Estudiante: ${student.name} (${student.id})`;

    const prevResults = State.getQuizResults();
    if (prevResults && prevResults.puntaje_total !== undefined) { showSummary(prevResults); return; }

    const seed = hashString(student.id);
    const rng = mulberry32(seed);

    // Selección con distribución de contextos: 5 por teoría, ≥2 por contexto
    currentQuestions = selectBalancedQuestions(rng);

    if (CONFIG.QUIZ.RANDOMIZE_QUESTIONS) shuffleArray(currentQuestions, rng);

    const savedProgress = sessionStorage.getItem('quizProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        currentIdx = progress.currentIdx || 0;
        scores = progress.scores || { clasico: 0, operante: 0, social: 0 };
        timerRemaining = progress.timerRemaining;
    }

    quizStartTime = Date.now();
    startTimer(timerRemaining || CONFIG.QUIZ.TIME_LIMIT_MINUTES * 60);
    renderQuestion();
}

/**
 * Selecciona 15 preguntas: 5 por teoría, garantizando ≥2 por contexto.
 */
function selectBalancedQuestions(rng) {
    const topics = ['clasico', 'operante', 'social'];
    const contexts = ['educativo', 'organizacional', 'juridico', 'social'];
    const perTopic = CONFIG.QUIZ.QUESTIONS_PER_TOPIC; // 5

    // Paso 1: Garantizar 2 preguntas de cada contexto (8 preguntas)
    // Distribuir 2 por contexto de forma rotativa entre las 3 teorías
    let selected = [];
    let contextCounts = { educativo: 0, organizacional: 0, juridico: 0, social: 0 };
    let topicCounts = { clasico: 0, operante: 0, social: 0 };
    let usedIds = new Set();

    // Para cada contexto, seleccionar 2 preguntas de teorías diferentes
    contexts.forEach((ctx, ci) => {
        const t1 = topics[ci % 3];
        const t2 = topics[(ci + 1) % 3];
        const theoryPicks = [t1, t2];

        theoryPicks.forEach(topic => {
            const pool = QUESTIONS_BANK.filter(q => q.topic === topic && q.context === ctx && !usedIds.has(q.id));
            shuffleArray(pool, rng);
            if (pool.length > 0 && topicCounts[topic] < perTopic) {
                selected.push(pool[0]);
                usedIds.add(pool[0].id);
                contextCounts[ctx]++;
                topicCounts[topic]++;
            }
        });
    });

    // Paso 2: Completar hasta 5 por teoría con preguntas restantes
    topics.forEach(topic => {
        const remaining = perTopic - topicCounts[topic];
        if (remaining > 0) {
            const pool = QUESTIONS_BANK.filter(q => q.topic === topic && !usedIds.has(q.id));
            shuffleArray(pool, rng);
            for (let i = 0; i < remaining && i < pool.length; i++) {
                selected.push(pool[i]);
                usedIds.add(pool[i].id);
                contextCounts[pool[i].context]++;
                topicCounts[topic]++;
            }
        }
    });

    return selected;
}

function startTimer(durationSeconds) {
    timerRemaining = durationSeconds;
    updateTimerDisplay(timerRemaining);
    timerInterval = setInterval(() => {
        timerRemaining--;
        updateTimerDisplay(timerRemaining);
        if (timerRemaining % 10 === 0) saveQuizProgress();
        if (timerRemaining <= 0) { clearInterval(timerInterval); handleTimeOut(); }
    }, 1000);
}

function updateTimerDisplay(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `Tiempo restante: ${m}:${s}`;
    if (seconds < 60) timerDisplay.style.color = 'var(--danger)';
}

function handleTimeOut() {
    alert("El tiempo se ha agotado. Enviaremos tus respuestas automáticamente.");
    finishQuiz();
}

function saveQuizProgress() {
    sessionStorage.setItem('quizProgress', JSON.stringify({
        currentIdx, scores, timerRemaining
    }));
}

function renderQuestion() {
    if (currentIdx >= currentQuestions.length) { finishQuiz(); return; }
    answered = false;
    const q = currentQuestions[currentIdx];
    progressDisplay.textContent = `Pregunta ${currentIdx + 1} de ${CONFIG.QUIZ.TOTAL_QUESTIONS}`;
    questionText.textContent = q.question;
    feedbackContainer.classList.add('hidden');
    nextBtn.classList.add('hidden');
    optionsContainer.innerHTML = '';

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

    // Ajuste 4: Botón de ayuda visual si la pregunta involucra programas de reforzamiento
    if (typeof ReinforcementHelper !== 'undefined' && ReinforcementHelper.shouldShow(q.concept)) {
        ReinforcementHelper.createButton(document.getElementById('quizContainer'));
    } else {
        const existing = document.querySelector('.rh-btn');
        if (existing) existing.remove();
    }
}

function handleAnswer(selectedOpt, btnElement, q) {
    if (answered) return;
    answered = true;
    Array.from(optionsContainer.children).forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === q.correct) btn.classList.add('correct');
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
    saveQuizProgress();

    if (currentIdx < currentQuestions.length - 1) {
        nextBtn.textContent = "Siguiente Pregunta";
        nextBtn.onclick = () => { currentIdx++; saveQuizProgress(); renderQuestion(); };
    } else {
        nextBtn.textContent = "Finalizar Parte 1";
        nextBtn.onclick = finishQuiz;
    }
    nextBtn.classList.remove('hidden');
}

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
    sessionStorage.removeItem('quizProgress');
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
    <div class="score-item">Bandura/Social: <strong>${results.puntaje_social}/${CONFIG.QUIZ.QUESTIONS_PER_TOPIC}</strong></div>`;
    document.getElementById('totalScore').textContent = `${results.puntaje_total} / ${CONFIG.QUIZ.TOTAL_QUESTIONS}`;
    document.getElementById('goToGameBtn').addEventListener('click', () => {
        window.location.href = '../parte2/index.html';
    });
}

window.addEventListener('DOMContentLoaded', initQuiz);
