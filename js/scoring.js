// js/scoring.js

const SCORING = {
    // PARTE 1 — Quiz (40% de la nota final)
    quiz: {
        peso_total: 0.40,
        puntos_por_pregunta: {
            primer_intento: 100,
            con_ayuda_visual: 80,
            incorrecta: 0 // no resta
        }
    },

    // PARTE 2 — Juego (60% de la nota final)
    juego: {
        peso_total: 0.60,
        niveles: {
            // Peso creciente — niveles difíciles valen más
            tutorial: { peso: 0.00 },
            nivel1: { peso: 0.08 },
            nivel2: { peso: 0.12 },
            nivel3: { peso: 0.15 },
            nivel4: { peso: 0.20 },
            nivel5: { peso: 0.20 },
            nivel6: { peso: 0.25 }
        },
        puntos_por_decision: {
            correcta_primera_vez: 100,
            correcta_segunda_vez: 65,
            correcta_tercera_vez: 35,
            no_lograda: 0
        },
        bonus: {
            nivel_sin_perder_vida: 15,
            tres_niveles_sin_perder_vida: 25,
            nivel_dificil_sin_hacer_facil: 20
        }
    }
};

/**
 * Calcula el desglose de la nota basado en el estado guardado del estudiante.
 * 
 * @param {Object} estadoEstudiante - Objeto completo reconstruido desde State
 * @returns {Object} Desglose con nota_p1, nota_p2, nota_final, fortalezas y para_reforzar
 */
function calcularNota(estadoEstudiante) {
    let notaP1 = 0;
    let puntajeQuiz = 0;
    let fortalezas = [];
    let para_reforzar = [];

    // 1. Evaluar Parte 1 (Quiz)
    if (estadoEstudiante.parte1 && estadoEstudiante.parte1.puntaje_total !== undefined) {
        // puntaje_total cuenta respuestas correctas. Max 15.
        puntajeQuiz = estadoEstudiante.parte1.puntaje_total / CONFIG.QUIZ.TOTAL_QUESTIONS;
        notaP1 = puntajeQuiz * SCORING.quiz.peso_total;

        // Calcular fortalezas y debilidades a partir de las teorías del quiz
        const ptcTeorias = {
            'Conductismo Clásico': estadoEstudiante.parte1.puntaje_clasico !== undefined ? estadoEstudiante.parte1.puntaje_clasico / 5 : 0,
            'Cond. Operante': estadoEstudiante.parte1.puntaje_operante !== undefined ? estadoEstudiante.parte1.puntaje_operante / 5 : 0,
            'Aprendizaje Social': estadoEstudiante.parte1.puntaje_social !== undefined ? estadoEstudiante.parte1.puntaje_social / 5 : 0
        };

        for (const [teoria, prop] of Object.entries(ptcTeorias)) {
            if (prop >= 0.8) fortalezas.push(teoria);
            if (prop <= 0.4) para_reforzar.push(teoria);
        }
    }

    // 2. Evaluar Parte 2 (Juego)
    let notaP2 = 0;
    let bonusObtenidos = [];
    let rachaSinPerderVidas = 0;

    if (estadoEstudiante.parte2 && estadoEstudiante.parte2.niveles) {
        for (const [keyNivel, config] of Object.entries(SCORING.juego.niveles)) {
            if (keyNivel === 'tutorial') continue;

            const datosNivel = estadoEstudiante.parte2.niveles[keyNivel];
            if (!datosNivel || !datosNivel.completado) {
                rachaSinPerderVidas = 0;
                continue; // No sumamos puntaje si no está completado
            }

            // En el diseño actual, el juego guarda 'vidas_usadas'. Convertimos esto a una "eficiencia".
            // vidas iniciales pueden asumirse como LIVES_PER_LEVEL (3).
            const vidasUsadas = datosNivel.vidas_usadas || 0;

            let puntajeNivel = 1.0; // Correcta a la primera (0 vidas perdidas)
            if (vidasUsadas === 1) puntajeNivel = SCORING.juego.puntos_por_decision.correcta_segunda_vez / 100;
            if (vidasUsadas >= 2) puntajeNivel = SCORING.juego.puntos_por_decision.correcta_tercera_vez / 100;

            let bonusActual = 0;
            if (vidasUsadas === 0) {
                bonusActual += SCORING.juego.bonus.nivel_sin_perder_vida / 100;
                rachaSinPerderVidas++;
                if (rachaSinPerderVidas >= 3) {
                    bonusObtenidos.push('Racha de 3 niveles perfectos');
                    bonusActual += SCORING.juego.bonus.tres_niveles_sin_perder_vida / 100;
                    rachaSinPerderVidas = 0; // Reset
                }
            } else {
                rachaSinPerderVidas = 0;
            }

            // Bonus: Nivel difícil sin hacer fácil
            // Se otorga si el nivel es 4, 5 o 6 y los niveles 1 o 2 no están completados aún
            if (['nivel4', 'nivel5', 'nivel6'].includes(keyNivel)) {
                const n1 = estadoEstudiante.parte2.niveles['nivel1'];
                const n2 = estadoEstudiante.parte2.niveles['nivel2'];
                const n1Ok = n1 && n1.completado;
                const n2Ok = n2 && n2.completado;

                if (!n1Ok || !n2Ok) {
                    bonusObtenidos.push(`Bonus Dificultad: ${keyNivel}`);
                    bonusActual += SCORING.juego.bonus.nivel_dificil_sin_hacer_facil / 100;
                }
            }

            notaP2 += (puntajeNivel + bonusActual) * config.peso * SCORING.juego.peso_total;
        }
    }

    // Convertir a escala 0-5
    const notaFinalCalculada = Math.min((notaP1 + notaP2) * 5, 5.0);
    const notaFinalRound = Math.round(notaFinalCalculada * 10) / 10;

    const notaP1Escala5 = Math.round((notaP1 * 5 / SCORING.quiz.peso_total) * 10) / 10;
    const notaP2Escala5 = Math.round((notaP2 * 5 / SCORING.juego.peso_total) * 10) / 10;

    return {
        nota_p1: isNaN(notaP1Escala5) ? 0 : notaP1Escala5,
        nota_p2: isNaN(notaP2Escala5) ? 0 : notaP2Escala5,
        nota_final: isNaN(notaFinalRound) ? 0 : notaFinalRound,
        bonus_obtenidos: bonusObtenidos,
        fortalezas: fortalezas.length > 0 ? fortalezas : ['Ninguna destacada'],
        para_reforzar: para_reforzar.length > 0 ? para_reforzar : ['Ninguna crítica']
    };
}

// Inyección al runtime si window está definido
if (typeof window !== 'undefined') {
    window.SCORING = SCORING;
    window.calcularNota = calcularNota;
}
