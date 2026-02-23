// js/state.js
// Manejo del estado global usando sessionStorage para garantizar idempotencia y persistencia

const State = {
    initStudent(nombre, codigo) {
        sessionStorage.setItem('studentName', nombre);
        sessionStorage.setItem('studentId', codigo);
        sessionStorage.setItem('startTime', new Date().toISOString());
    },

    getStudent() {
        return {
            name: sessionStorage.getItem('studentName'),
            id: sessionStorage.getItem('studentId')
        };
    },

    isLoggedIn() {
        return !!sessionStorage.getItem('studentId');
    },

    saveQuizResults(results) {
        sessionStorage.setItem('quizResults', JSON.stringify(results));
    },

    getQuizResults() {
        const res = sessionStorage.getItem('quizResults');
        return res ? JSON.parse(res) : null;
    },

    saveGameLevel(levelIndex, data) {
        let gameData = this.getGameData();
        if (!gameData.niveles) gameData.niveles = {};
        gameData.niveles[`nivel${levelIndex}`] = data;
        gameData.nivel_alcanzado = Math.max(gameData.nivel_alcanzado || 0, levelIndex);
        sessionStorage.setItem('gameData', JSON.stringify(gameData));

        // Regla 4: Si se termina el nivel 6, marcar el parcial como completado
        if (levelIndex === 6 && data.completado) {
            this.setCompleted();
        }
    },

    saveGameOpenAnswers(answers) {
        let gameData = this.getGameData();
        if (!gameData.respuestas_abiertas) gameData.respuestas_abiertas = {};
        Object.assign(gameData.respuestas_abiertas, answers);
        sessionStorage.setItem('gameData', JSON.stringify(gameData));
    },

    getGameData() {
        const res = sessionStorage.getItem('gameData');
        return res ? JSON.parse(res) : { niveles: {}, nivel_alcanzado: 0, respuestas_abiertas: {} };
    },

    setCompleted() {
        sessionStorage.setItem('parcial_completado', 'true');
    },

    isCompleted() {
        return sessionStorage.getItem('parcial_completado') === 'true';
    },

    /**
     * Lógica central del aviso de sesión para index.html
     */
    checkSession() {
        // REGLA 2: Si el parcial ya fue completado, limpiar sessionStorage automáticamente
        if (this.isCompleted()) {
            sessionStorage.clear();
            return;
        }

        // REGLA 1 y 3: Si hay sesión en progreso, mostrar modal
        if (this.isLoggedIn()) {
            const modal = document.getElementById('sessionModal');
            if (!modal) return;

            modal.classList.remove('hidden');

            document.getElementById('continueBtn').onclick = () => {
                const quizResults = this.getQuizResults();
                // Si ya terminó el quiz, ir al juego. Si no, al quiz.
                if (quizResults && quizResults.puntaje_total !== undefined) {
                    window.location.href = 'parte2/index.html';
                } else {
                    window.location.href = 'parte1/index.html';
                }
            };

            document.getElementById('restartBtn').onclick = () => {
                sessionStorage.clear();
                modal.classList.add('hidden');
            };
        }
    },

    buildFinalPayload() {
        const student = this.getStudent();
        const quiz = this.getQuizResults();
        const game = this.getGameData();

        let nota = 0;
        if (quiz) {
            const p1Score = (quiz.puntaje_total / CONFIG.QUIZ.TOTAL_QUESTIONS) * 5.0;
            nota += p1Score * CONFIG.SCORING.QUIZ_WEIGHT;
        }

        // 6 niveles calificados (1-6); nivel 0 (tutorial) no se califica
        const totalCalificados = CONFIG.GAME.TOTAL_LEVELS || 6;
        let gameScore = 0;
        if (game && game.niveles) {
            let levelsCompleted = 0;
            for (let i = 1; i <= totalCalificados; i++) {
                if (game.niveles[`nivel${i}`] && game.niveles[`nivel${i}`].completado) {
                    levelsCompleted++;
                }
            }
            gameScore = (levelsCompleted / totalCalificados) * 5.0;
            nota += gameScore * CONFIG.SCORING.GAME_WEIGHT;
        }

        return {
            timestamp: new Date().toISOString(),
            nombre: student.name,
            codigo: student.id,
            parte1: quiz || {},
            parte2: game || {},
            nota_calculada: parseFloat(nota.toFixed(1))
        };
    }
};
