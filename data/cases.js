// data/cases.js
// Casos clínicos del juego "Clínica del Comportamiento" — Parte 2 del parcial
// Cada caso corresponde a un nivel del juego con mecánica propia.

const GAME_CASES = [
    // ═══════════════════════════════════════
    // NIVEL 0 — TUTORIAL (No calificado)
    // ═══════════════════════════════════════
    {
        level: 0,
        id: "tutorial",
        title: "NIVEL 0: Tutorial",
        description: "Don Simón, 70 años, tiembla cada vez que escucha una ambulancia desde que tuvo un infarto.",
        type: "clasico_basico",
        elements: {
            "EN": "Sonido de ambulancia (antes del infarto)",
            "EI": "Infarto (dolor intenso)",
            "RI": "Miedo intenso / Dolor",
            "EC": "Sonido de ambulancia (después del infarto)",
            "RC": "Temblor / Ansiedad"
        },
        assistant_steps: [
            "👋 ¡Bienvenido a la Clínica del Comportamiento! Soy tu asistente virtual. Te guiaré por este primer caso para que entiendas la mecánica del juego.",
            "📋 Don Simón asoció el sonido de la ambulancia con su infarto. Antes del trauma, la sirena era un sonido cualquiera — un Estímulo Neutro (EN).",
            "💡 El infarto causó dolor intenso de forma natural — ese es el Estímulo Incondicionado (EI), que produce miedo automáticamente: la Respuesta Incondicionada (RI).",
            "🔗 Tras la asociación, la sirena sola ahora dispara ansiedad. El sonido se convirtió en Estímulo Condicionado (EC) y el temblor es la Respuesta Condicionada (RC).",
            "✅ Ahora clasifica cada componente del caso usando los menús desplegables. ¡No te preocupes por equivocarte, este nivel es de práctica!"
        ],
        message: "Bienvenido a la Clínica del Comportamiento. En este paciente, el sonido de la ambulancia era un Estímulo Neutro (EN). Como se asoció al infarto (Estímulo Incondicionado - EI) que causaba dolor (Respuesta Incondicionada - RI), ahora el sonido es un Estímulo Condicionado (EC) que causa ansiedad (Respuesta Condicionada - RC)."
    },

    // ═══════════════════════════════════════
    // NIVEL 1 — FÁCIL
    // ═══════════════════════════════════════
    {
        level: 1,
        id: "facil",
        title: "NIVEL 1: Fácil",
        description: "María, 8 años, llora desconsoladamente cada vez que ve al dentista, aunque aún no le han hecho nada doloroso hoy. Su madre reporta que la primera vez que fue, el sonido del taladro acompañó el pinchazo de anestesia.",
        type: "drag_and_drop_clasico",
        diagnosis_options: ["Condicionamiento Clásico", "Condicionamiento Operante", "Aprendizaje Social", "Indefensión Aprendida"],
        diagnosis_correct: "Condicionamiento Clásico",
        elements_to_match: {
            "Sonido del taladro + dentista": "EC",
            "Pinchazo de anestesia": "EI",
            "Dolor por el pinchazo": "RI",
            "Llorar al ver al dentista": "RC"
        },
        intervention_options: ["Desensibilización sistemática", "Extinción", "Castigo positivo"],
        intervention_correct: "Desensibilización sistemática"
    },

    // ═══════════════════════════════════════
    // NIVEL 2 — MEDIO
    // ═══════════════════════════════════════
    {
        level: 2,
        id: "medio",
        title: "NIVEL 2: Medio",
        description: "Julián, empleado de oficina, llegaba tarde todos los días. Su jefe primero lo ignoró completamente. Con el tiempo Julián llegó aún más tarde. Luego el jefe cambió de estrategia: cada vez que Julián llegaba a tiempo, le daba reconocimiento público en la reunión. En dos semanas, Julián llegaba 10 minutos antes.",
        type: "timeline_operante",
        phases: [
            {
                id: "fase1",
                text: "Fase 1: El jefe ignora a Julián y la conducta de llegar tarde empeora.",
                options: ["Castigo Positivo", "Castigo Negativo", "Reforzamiento Positivo", "Reforzamiento Negativo", "Extinción"],
                correct: "Extinción"
            },
            {
                id: "fase2",
                text: "Fase 2: Julián llega a tiempo y recibe reconocimiento público.",
                options: ["Castigo Positivo", "Castigo Negativo", "Reforzamiento Positivo", "Reforzamiento Negativo", "Extinción"],
                correct: "Reforzamiento Positivo"
            }
        ],
        question: "¿Qué habría pasado si el jefe hubiera aplicado castigo positivo en lugar de reforzamiento positivo?",
        question_options: [
            "Habría generado evitación o resentimiento en Julián, posiblemente ocultando la conducta en vez de modificarla genuinamente.",
            "Julián habría llegado temprano con mucha motivación intrínseca.",
            "El castigo positivo garantiza que nunca más llegue tarde.",
            "Habría provocado recuperación espontánea inmediata."
        ],
        question_correct: 0,
        maintenance_options: [
            "Programa de Razón Variable (Reconocimiento ocasional e impredecible)",
            "Programa de Razón Fija (Reconocimiento cada 5 días exactos)",
            "Programa de Intervalo Fijo (Reconocimiento cada viernes)",
            "Refuerzo Continuo permanente"
        ],
        maintenance_correct: 0
    },

    // ═══════════════════════════════════════
    // NIVEL 3 — DIFÍCIL
    // ═══════════════════════════════════════
    {
        level: 3,
        id: "dificil",
        title: "NIVEL 3: Difícil",
        description: "Andrea, 16 años, empezó a fumar porque su grupo de amigos fumaba y ella quería pertenecer. Su mejor amiga dejó de fumar después de que un familiar cercano murió de cáncer de pulmón. Andrea observó el dolor de su amiga, vio su duelo y proceso, y también dejó de fumar — sin que nadie le dijera nada directamente.",
        type: "bandura_sequence",
        terms: ["Modelo", "Observador", "Atención", "Retención", "Reproducción", "Motivación", "Refuerzo Vicario", "Autoeficacia"],
        correct_sequence: ["Modelo", "Observador", "Atención", "Retención", "Reproducción", "Motivación", "Refuerzo Vicario", "Autoeficacia"],
        question: "¿Qué habría pasado si Andrea tuviera baja autoeficacia?",
        question_options: [
            "No habría intentado dejar de fumar creyendo que es imposible para ella lograrlo.",
            "No habría prestado atención al modelo en absoluto.",
            "Habría tenido más facilidad para imitar a su amiga.",
            "Habría suprimido el refuerzo vicario completamente."
        ],
        question_correct: 0
    },

    // ═══════════════════════════════════════
    // NIVEL 4 — MUY DIFÍCIL
    // ═══════════════════════════════════════
    {
        level: 4,
        id: "muy_dificil",
        title: "NIVEL 4: Muy Difícil",
        description: "El colegio Simón Bolívar tiene un problema: los estudiantes no estudian. El rector implementó simultáneamente: (1) exámenes sorpresa cada semana sin previo aviso, (2) publicación del ranking de mejores notas en la cartelera, (3) retiró los recreos extra a quienes reprobaran, y (4) contrató a un ex-estudiante exitoso para que diera charlas mensuales.",
        type: "integrador",
        interventions: [
            {
                id: "i1",
                text: "1. Exámenes sorpresa aleatorios",
                theory_options: ["Clásico", "Operante", "Social"],
                theory_correct: "Operante",
                mech_options: ["Castigo Positivo", "Castigo Negativo", "Programa de Intervalo Variable"],
                mech_correct: "Programa de Intervalo Variable"
            },
            {
                id: "i2",
                text: "2. Ranking de mejores notas en cartelera",
                theory_options: ["Clásico", "Operante", "Social"],
                theory_correct: "Social",
                mech_options: ["Incentivo Vicario / Modelo", "Castigo Positivo", "Extinción"],
                mech_correct: "Incentivo Vicario / Modelo"
            },
            {
                id: "i3",
                text: "3. Retiro de recreos a reprobados",
                theory_options: ["Clásico", "Operante", "Social"],
                theory_correct: "Operante",
                mech_options: ["Castigo Positivo", "Castigo Negativo", "Refuerzo Negativo"],
                mech_correct: "Castigo Negativo"
            },
            {
                id: "i4",
                text: "4. Charlas de ex-estudiante exitoso",
                theory_options: ["Clásico", "Operante", "Social"],
                theory_correct: "Social",
                mech_options: ["Modelamiento", "Autoeficacia", "Desensibilización"],
                mech_correct: "Modelamiento"
            }
        ],
        predict_question: "¿Qué tipo de conducta estudiantil generará el Programa de Intervalo Variable (exámenes sorpresa aleatorios) a largo plazo?",
        predict_options: [
            "Una tasa de respuesta (estudio) constante y moderada, muy resistente a la extinción.",
            "Estudio intenso solo la noche anterior al examen.",
            "Extinción inmediata del estudio.",
            "Resignación aprendida en todos los estudiantes."
        ],
        predict_correct: 0
    }
];
