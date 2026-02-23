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
    },

    saveGameOpenAnswers(answers) {
        let gameData = this.getGameData();
        gameData.respuestas_abiertas = answers;
        sessionStorage.setItem('gameData', JSON.stringify(gameData));
    },

    getGameData() {
        const res = sessionStorage.getItem('gameData');
        return res ? JSON.parse(res) : { niveles: {}, nivel_alcanzado: 0, respuestas_abiertas: {} };
    },

    // Genera el payload final que combina Parte 1 y Parte 2
    buildFinalPayload() {
        const student = this.getStudent();
        const quiz = this.getQuizResults();
        const game = this.getGameData();

        // Cálculo básico de nota basada en pesos
        let nota = 0;
        if (quiz) {
            const p1Score = (quiz.puntaje_total / CONFIG.QUIZ.TOTAL_QUESTIONS) * 5.0;
            nota += p1Score * CONFIG.SCORING.QUIZ_WEIGHT;
        }

        // El juego tiene 4 niveles calificados (1-4). El nivel 0 (tutorial) no se califica
        let gameScore = 0;
        if (game && game.niveles) {
            let levelsCompleted = 0;
            for (let i = 1; i <= 4; i++) {
                if (game.niveles[`nivel${i}`] && game.niveles[`nivel${i}`].completado) {
                    levelsCompleted++;
                }
            }
            gameScore = (levelsCompleted / 4) * 5.0;
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
