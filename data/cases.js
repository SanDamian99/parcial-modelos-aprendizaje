// data/cases.js
// Casos clínicos del juego "Clínica del Comportamiento" — Parte 2 del parcial
// 7 niveles: Tutorial (0) + 6 calificados

const GAME_CASES = [
    // ═══════════════════════════════════════
    // NIVEL 0 — TUTORIAL
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
        message: "Bienvenido a la Clínica del Comportamiento."
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
        animation_steps: [
            { emoji: "👧", label: "Modelo", desc: "La amiga de Andrea es el modelo: deja de fumar tras la muerte de su familiar." },
            { emoji: "👩", label: "Observador", desc: "Andrea es la observadora: presencia todo el proceso de su amiga." },
            { emoji: "👁️", label: "Atención", desc: "Andrea presta atención al dolor, el duelo y la decisión de su amiga." },
            { emoji: "🧠", label: "Retención", desc: "Andrea codifica simbólicamente lo que observó: 'fumar puede matar a alguien cercano'." },
            { emoji: "🏃", label: "Reproducción", desc: "Andrea tiene la capacidad motora para dejar de fumar — sabe cómo hacerlo." },
            { emoji: "⭐", label: "Motivación", desc: "El dolor observado de su amiga la motiva a actuar: quiere evitar ese sufrimiento." },
            { emoji: "🪞", label: "Refuerzo Vicario", desc: "Andrea ve que dejar de fumar trajo alivio a su amiga — refuerzo observado." },
            { emoji: "💪", label: "Autoeficacia", desc: "Andrea cree que ella también puede dejarlo: 'Si mi amiga pudo, yo también'." }
        ],
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
    },

    // ═══════════════════════════════════════
    // NIVEL 5 — LABERINTO DE ESTÍMULO-RESPUESTA
    // ═══════════════════════════════════════
    {
        level: 5,
        id: "laberinto",
        title: "NIVEL 5: Laberinto de la Mente",
        description: "Tu paciente final es Tomás, un niño de 10 años con fobia escolar severa. Para llegar a él y tratarlo debes cruzar el laberinto de su mente, donde cada puerta está bloqueada por una conducta condicionada. Solo podrás abrir cada puerta si identificas correctamente el estímulo o la respuesta que la mantiene cerrada.",
        type: "laberinto",
        // Cuadrícula 8×8. 1=camino, 0=muro, 2=puerta
        grid: [
            [1, 2, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 1, 1, 2, 1, 0],
            [0, 2, 0, 1, 0, 1, 1, 0],
            [0, 1, 1, 1, 0, 0, 2, 0],
            [0, 0, 0, 2, 0, 0, 1, 0],
            [0, 1, 1, 1, 2, 0, 1, 0],
            [0, 1, 0, 0, 1, 0, 2, 0],
            [0, 1, 1, 2, 1, 1, 1, 1]
        ],
        start: [0, 0],
        end: [7, 7],
        doors: [
            {
                row: 0, col: 1,
                mini_caso: "Tomás escucha el timbre de la escuela (EC) y siente náuseas (RC). ¿Cuál fue el Estímulo Incondicionado que originó esta respuesta?",
                opciones: ["El regaño del profesor", "Las náuseas espontáneas", "El timbre escolar", "El recreo"],
                correcta: 0,
                explicacion: "El regaño del profesor (EI) causaba malestar natural (RI). Al asociarse con el timbre (EN→EC), el timbre solo ahora produce náuseas (RC).",
                concepto: "EI en condicionamiento clásico"
            },
            {
                row: 2, col: 1,
                mini_caso: "Tomás sudaba cada vez que un profesor gritaba. Ahora también suda cuando cualquier adulto levanta la voz. ¿Qué fenómeno describe esto?",
                opciones: ["Generalización", "Discriminación", "Extinción", "Adquisición"],
                correcta: 0,
                explicacion: "La generalización ocurre cuando estímulos similares al EC (adultos levantando la voz) evocan la misma RC (sudoración). Tomás no discrimina entre profesores y otros adultos.",
                concepto: "Generalización del estímulo"
            },
            {
                row: 1, col: 5,
                mini_caso: "El profesor de arte de Tomás era amable y nunca gritaba. Tomás no sentía miedo en clase de arte, aunque sí en las demás. ¿Qué fenómeno se evidencia?",
                opciones: ["Discriminación", "Generalización", "Recuperación espontánea", "Adquisición"],
                correcta: 0,
                explicacion: "La discriminación permite responder de forma diferente según el estímulo. Tomás distingue entre el contexto amenazante (otras clases) y el seguro (arte).",
                concepto: "Discriminación de estímulos"
            },
            {
                row: 3, col: 6,
                mini_caso: "Tomás dejó de ir a la escuela por un mes. Cuando regresó, al escuchar el timbre, sintió náuseas otra vez. ¿Qué fenómeno es este?",
                opciones: ["Recuperación espontánea", "Generalización", "Adquisición nueva", "Sensibilización"],
                correcta: 0,
                explicacion: "La recuperación espontánea es la reaparición de la RC tras un período de descanso posterior a la extinción parcial. La asociación EC-EI no se eliminó completamente.",
                concepto: "Recuperación espontánea"
            },
            {
                row: 4, col: 3,
                mini_caso: "El terapeuta expone gradualmente a Tomás: primero fotos del colegio, luego videos, luego visitas cortas sin clases. ¿Qué técnica usa?",
                opciones: ["Desensibilización Sistemática", "Contracondicionamiento", "Extinción abrupta", "Castigo"],
                correcta: 0,
                explicacion: "La desensibilización sistemática presenta el EC (colegio) en aproximaciones graduales mientras se mantiene relajación, debilitando la RC (miedo) progresivamente.",
                concepto: "Desensibilización sistemática"
            },
            {
                row: 5, col: 4,
                mini_caso: "El terapeuta enseña a Tomás técnicas de relajación y las aplica mientras imagina estar en el colegio. El miedo disminuye. ¿Qué principio aplica?",
                opciones: ["Inhibición recíproca", "Reforzamiento Positivo", "Extinción operante", "Castigo Negativo"],
                correcta: 0,
                explicacion: "La inhibición recíproca (Wolpe) sostiene que no se puede sentir ansiedad y relajación al mismo tiempo. Asociar relajación con el EC debilita la RC de miedo.",
                concepto: "Inhibición recíproca"
            },
            {
                row: 6, col: 6,
                mini_caso: "Tras varias sesiones, Tomás escucha el timbre del colegio y ya no siente náuseas. ¿Qué proceso se completó?",
                opciones: ["Extinción", "Habituación", "Sensibilización", "Contracondicionamiento"],
                correcta: 0,
                explicacion: "La extinción clásica se produjo al presentar repetidamente el EC (timbre) sin el EI (regaños), hasta que la RC (náuseas) desapareció.",
                concepto: "Extinción clásica"
            },
            {
                row: 7, col: 3,
                mini_caso: "Tomás ahora juega feliz en el recreo. Los otros niños que antes lo evitaban empiezan a acercarse. Su sonrisa al escuchar el timbre refleja:",
                opciones: ["Contracondicionamiento exitoso", "Generalización inversa", "Castigo Positivo", "Reforzamiento Diferencial"],
                correcta: 0,
                explicacion: "El contracondicionamiento reemplazó la respuesta condicionada negativa (miedo) por una positiva (alegría) ante el mismo EC (timbre). Tomás ahora asocia el timbre con experiencias positivas.",
                concepto: "Contracondicionamiento"
            },
            // Puertas más fáciles (rutas alternativas)
            {
                row: 5, col: 1,
                mini_caso: "Un sonido fuerte hace que Tomás salte de su silla. ¿Este salto es una respuesta...?",
                opciones: ["Incondicionada", "Condicionada", "Operante", "Voluntaria"],
                correcta: 0,
                explicacion: "El sobresalto ante un ruido fuerte es una Respuesta Incondicionada (RI): ocurre naturalmente sin aprendizaje previo.",
                concepto: "Respuesta Incondicionada"
            },
            {
                row: 7, col: 1,
                mini_caso: "Un estímulo que originalmente no causaba ninguna respuesta emocional se llama:",
                opciones: ["Estímulo Neutro", "Estímulo Condicionado", "Estímulo Incondicionado", "Respuesta Condicionada"],
                correcta: 0,
                explicacion: "Un Estímulo Neutro (EN) es aquel que no produce la respuesta de interés antes del condicionamiento. Al asociarse con un EI, se convierte en EC.",
                concepto: "Estímulo Neutro"
            }
        ]
    },

    // ═══════════════════════════════════════
    // NIVEL 6 — ENTRENAMIENTO DEL PERRO ANTIEXPLOSIVOS
    // ═══════════════════════════════════════
    {
        level: 6,
        id: "perro_antiexplosivos",
        title: "NIVEL 6: Misión Bruno — Perro Antiexplosivos",
        description: "Misión final. Hay un campo minado y solo Bruno, un perro labrador en entrenamiento, puede detectar las bombas y abrir el camino seguro. Tú eres su psicólogo conductual. Tienes 5 rondas de entrenamiento para enseñarle a identificar el olor de los explosivos usando los principios del condicionamiento. Si Bruno falla en el campo, la misión fracasa.",
        type: "perro_entrenamiento",
        turnos: [
            {
                turno: 1,
                situacion: "Bruno está en la sala de entrenamiento. Quieres que asocie el olor a pólvora con la acción de sentarse y esperar.",
                concepto: "Reforzamiento Positivo",
                opciones: [
                    "A) Presentar el olor a pólvora y darle comida inmediatamente si se sienta.",
                    "B) Aplicar un sonido molesto que cesa cuando Bruno se sienta ante el olor.",
                    "C) Ignorar completamente a Bruno durante la sesión.",
                    "D) Gritar \"NO\" fuerte cada vez que Bruno no reacciona al olor."
                ],
                correcta: 0,
                suboptima: 1,
                consecuencias: {
                    correcta: { aprendizaje: 20, bienestar: -5 },
                    suboptima: { aprendizaje: 10, bienestar: -15 },
                    incorrecta: { aprendizaje: 0, bienestar: -25 }
                },
                explicacion_correcta: "Reforzamiento Positivo (Skinner): añadir un estímulo agradable (comida) inmediatamente después de la conducta deseada (sentarse ante el olor) fortalece esa conducta. Es la técnica más efectiva y ética para el entrenamiento animal.",
                explicacion_suboptima: "Reforzamiento Negativo (retirar el sonido molesto) funciona, pero genera estrés en el animal, reduciendo su bienestar y eficacia a largo plazo.",
                explicacion_incorrecta: "Ignorar al perro (Extinción) no enseña conductas nuevas, y gritar (Castigo Positivo) genera miedo y aversión al entrenamiento."
            },
            {
                turno: 2,
                situacion: "Bruno ha aprendido a sentarse ante el olor a pólvora. Ahora también se sienta ante perfume, gasolina y otros olores fuertes. Necesitas que distinga solo la pólvora.",
                concepto: "Discriminación del estímulo",
                opciones: [
                    "A) Reforzar SOLO cuando se sienta ante pólvora. No reforzar ante otros olores.",
                    "B) Castigar a Bruno cada vez que se sienta ante un olor incorrecto.",
                    "C) Presentar únicamente pólvora y eliminar los demás olores del entrenamiento.",
                    "D) Aumentar la cantidad de comida por cada respuesta, sin importar el olor."
                ],
                correcta: 0,
                suboptima: 2,
                consecuencias: {
                    correcta: { aprendizaje: 20, bienestar: -5 },
                    suboptima: { aprendizaje: 10, bienestar: -15 },
                    incorrecta: { aprendizaje: 0, bienestar: -25 }
                },
                explicacion_correcta: "El entrenamiento en discriminación refuerza la respuesta ante el estímulo correcto (pólvora) y la extingue ante los incorrectos. Bruno aprende: 'solo la pólvora produce recompensa'.",
                explicacion_suboptima: "Eliminar otros olores no enseña a discriminar — en el campo real habrá múltiples olores. Bruno necesita aprender a diferenciar activamente.",
                explicacion_incorrecta: "Castigar ante olores incorrectos genera inhibición generalizada: Bruno puede dejar de reaccionar ante TODOS los olores, incluyendo la pólvora."
            },
            {
                turno: 3,
                situacion: "Bruno ya discrimina la pólvora. Ahora necesitas que también detecte C4 y TNT, que tienen olores ligeramente diferentes.",
                concepto: "Generalización controlada",
                opciones: [
                    "A) Presentar pólvora, C4 y TNT en sesiones alternas, reforzando la misma respuesta ante los tres.",
                    "B) Mezclar los tres olores en uno solo para que Bruno solo aprenda una respuesta.",
                    "C) Entrenar cada olor en un lugar diferente para que los asocie con el contexto.",
                    "D) Presentar solo pólvora y esperar que Bruno generalice naturalmente."
                ],
                correcta: 0,
                suboptima: 3,
                consecuencias: {
                    correcta: { aprendizaje: 20, bienestar: -5 },
                    suboptima: { aprendizaje: 10, bienestar: -15 },
                    incorrecta: { aprendizaje: 0, bienestar: -25 }
                },
                explicacion_correcta: "La generalización controlada presenta estímulos similares y refuerza la misma respuesta ante todos ellos. Bruno aprende que pólvora, C4 y TNT comparten una categoría: 'explosivo = sentarse'.",
                explicacion_suboptima: "La generalización natural es impredecible y poco fiable. En un entorno de alto riesgo, no puedes confiar en que Bruno detecte TNT sin haberlo entrenado específicamente.",
                explicacion_incorrecta: "Mezclar olores impide la discriminación y asociar con contexto genera respuestas ligadas al lugar, no al olor."
            },
            {
                turno: 4,
                situacion: "Bruno detecta explosivos al 90%. Pero durante el entrenamiento siempre recibe comida. ¿Cómo garantizas que su conducta se mantenga en el campo sin refuerzo constante?",
                concepto: "Programa de reforzamiento para mantenimiento",
                opciones: [
                    "A) Cambiar a un programa de razón variable: darle comida de forma impredecible, a veces sí y a veces no.",
                    "B) Seguir con refuerzo continuo: darle comida SIEMPRE que detecte.",
                    "C) Eliminar la comida completamente y confiar en su entrenamiento.",
                    "D) Darle comida solo cada 5 detecciones exactas."
                ],
                correcta: 0,
                suboptima: 3,
                consecuencias: {
                    correcta: { aprendizaje: 20, bienestar: -5 },
                    suboptima: { aprendizaje: 10, bienestar: -15 },
                    incorrecta: { aprendizaje: 0, bienestar: -25 }
                },
                explicacion_correcta: "El programa de razón variable produce la conducta más resistente a la extinción (Skinner). Bruno seguirá detectando porque 'quizás esta vez sí reciba comida'. Las máquinas tragamonedas usan el mismo principio.",
                explicacion_suboptima: "Razón fija (cada 5) genera pausas post-refuerzo: Bruno podría relajarse entre detecciones, cosa inaceptable en un campo minado.",
                explicacion_incorrecta: "Refuerzo continuo genera extinción rápida al retirarlo. Eliminar la comida directamente provoca extinción inmediata."
            },
            {
                turno: 5,
                situacion: "Antes de ir al campo, Bruno observa a Rex, un perro experto, detectar explosivos en una simulación. Bruno ve cómo Rex se sienta, recibe felicitaciones y un premio.",
                concepto: "Modelamiento / Aprendizaje observacional",
                opciones: [
                    "A) Dejar que Bruno observe a Rex trabajar y luego intentar la misma tarea — Modelamiento.",
                    "B) Forzar a Bruno a competir con Rex para motivarlo.",
                    "C) Aislar a Bruno para que no se distraiga con otros perros.",
                    "D) Castigar a Bruno cada vez que no imite a Rex inmediatamente."
                ],
                correcta: 0,
                suboptima: 1,
                consecuencias: {
                    correcta: { aprendizaje: 20, bienestar: -5 },
                    suboptima: { aprendizaje: 10, bienestar: -15 },
                    incorrecta: { aprendizaje: 0, bienestar: -25 }
                },
                explicacion_correcta: "El modelamiento (Bandura) permite aprender observando a un modelo competente. Bruno ve la conducta de Rex, la retiene y se motiva por el refuerzo vicario (premio a Rex). Es una forma de aprendizaje social que se aplica también en animales sociales.",
                explicacion_suboptima: "La competencia puede generar estrés, pero Bruno sí observa al modelo. La motivación generada es inferior al aprendizaje tranquilo por observación.",
                explicacion_incorrecta: "Aislar impide el aprendizaje observacional. Castigar por no imitar inmediatamente ignora que el modelamiento requiere tiempo (atención → retención → reproducción → motivación)."
            }
        ],
        campo_minado: {
            minas: [[0, 2], [1, 4], [2, 1], [2, 3], [3, 0], [3, 2], [4, 1], [4, 3]],
            camino_seguro: [[0, 0], [0, 1], [1, 1], [1, 2], [1, 3], [2, 3], [2, 4], [3, 4], [4, 4]],
            preguntas: [
                {
                    pregunta: "Un perro saliva al ver comida. La salivación ante la comida es:",
                    opciones: ["Respuesta Incondicionada", "Respuesta Condicionada", "Estímulo Condicionado", "Respuesta Operante"],
                    correcta: 0,
                    explicacion: "La salivación ante la comida es una RI — respuesta natural que no requiere aprendizaje."
                },
                {
                    pregunta: "Un loro dice 'hola' y recibe una galleta. La conducta de decir 'hola' aumenta. Esto es:",
                    opciones: ["Reforzamiento Positivo", "Condicionamiento Clásico", "Modelamiento", "Castigo Negativo"],
                    correcta: 0,
                    explicacion: "Añadir algo agradable (galleta) tras la conducta (decir 'hola') = Reforzamiento Positivo."
                },
                {
                    pregunta: "Un niño ve que su hermano recibe un helado por ordenar su cuarto y empieza a ordenar el suyo. Esto es:",
                    opciones: ["Refuerzo Vicario", "Reforzamiento Directo", "Castigo Vicario", "Extinción"],
                    correcta: 0,
                    explicacion: "El niño observa las consecuencias positivas del modelo (hermano) y se motiva a imitar — refuerzo vicario (Bandura)."
                },
                {
                    pregunta: "Un gato deja de maullar ante la puerta porque nadie le abre. Se produjo:",
                    opciones: ["Extinción operante", "Castigo Positivo", "Habituación", "Generalización"],
                    correcta: 0,
                    explicacion: "Si la conducta operante deja de recibir reforzamiento (abrir la puerta), se extingue."
                },
                {
                    pregunta: "Un mono observa a otro mono usar una herramienta para sacar termitas. Luego intenta hacerlo él. Esto es:",
                    opciones: ["Modelamiento", "Condicionamiento Clásico", "Ensayo y Error", "Instinto"],
                    correcta: 0,
                    explicacion: "El mono adquirió la conducta por observación — modelamiento (Bandura), un proceso presente también en primates no humanos."
                },
                {
                    pregunta: "Un sonido de campana se presenta repetidamente sin comida y el perro deja de salivar. Esto es:",
                    opciones: ["Extinción clásica", "Discriminación", "Habituación", "Generalización"],
                    correcta: 0,
                    explicacion: "Presentar el EC (campana) sin el EI (comida) debilita la RC (salivación) hasta que desaparece — extinción."
                },
                {
                    pregunta: "Un empleado usa casco porque la última vez que no lo hizo, recibió una multa. Su conducta se mantiene por:",
                    opciones: ["Reforzamiento Negativo de evitación", "Reforzamiento Positivo", "Castigo Positivo", "Modelamiento"],
                    correcta: 0,
                    explicacion: "El empleado usa casco para EVITAR la multa (estímulo aversivo). Es reforzamiento negativo de evitación — la conducta preventiva se fortalece."
                },
                {
                    pregunta: "Si un niño tiene miedo solo de los perros grandes pero no de los pequeños, demuestra:",
                    opciones: ["Discriminación", "Generalización", "Extinción", "Adquisición"],
                    correcta: 0,
                    explicacion: "El niño discrimina entre estímulos similares, respondiendo con miedo solo ante los perros grandes pero no ante los pequeños."
                },
                {
                    pregunta: "Un terapeuta reemplaza gradualmente el miedo a volar con relajación. Esto es:",
                    opciones: ["Contracondicionamiento", "Extinción", "Castigo Negativo", "Reforzamiento Diferencial"],
                    correcta: 0,
                    explicacion: "El contracondicionamiento reemplaza una RC (miedo) por una nueva respuesta (relajación) ante el mismo EC (volar)."
                },
                {
                    pregunta: "Dos niños estudian juntos. Juan se esfuerza más al ver que Pedro recibe elogios del profesor. Esto es:",
                    opciones: ["Incentivo Vicario", "Facilitación social", "Condicionamiento Directo", "Extinción"],
                    correcta: 0,
                    explicacion: "Juan se motiva al observar las consecuencias positivas (elogios) que recibe el modelo (Pedro). Es un incentivo vicario (Bandura)."
                },
                {
                    pregunta: "Un programa que premia aleatoriamente entre 3 y 10 respuestas es un programa de:",
                    opciones: ["Razón Variable", "Razón Fija", "Intervalo Variable", "Intervalo Fijo"],
                    correcta: 0,
                    explicacion: "La razón variable refuerza después de un número impredecible de respuestas, generando tasas altas y constantes, muy resistentes a la extinción."
                },
                {
                    pregunta: "Una madre le quita el celular a su hijo por portarse mal. La conducta negativa disminuye. Esto es:",
                    opciones: ["Castigo Negativo", "Castigo Positivo", "Reforzamiento Negativo", "Extinción"],
                    correcta: 0,
                    explicacion: "Retirar algo agradable (celular) tras la conducta indeseada = Castigo Negativo. Reduce la frecuencia de la conducta."
                },
                {
                    pregunta: "Si la barra de aprendizaje de Bruno baja a 0%, se produciría:",
                    opciones: ["Extinción", "Generalización", "Discriminación", "Sensibilización"],
                    correcta: 0,
                    explicacion: "Si Bruno pierde todo lo aprendido, su conducta de detección se ha extinguido por falta de reforzamiento."
                },
                {
                    pregunta: "Bruno detecta una mina pero no recibe premio. Si sigue detectando, demuestra:",
                    opciones: ["Alta resistencia a la extinción", "Generalización", "Condicionamiento de segundo orden", "Inhibición"],
                    correcta: 0,
                    explicacion: "La resistencia a la extinción depende del programa de reforzamiento previo. Si Bruno fue entrenado con razón variable, persistirá pese a no recibir premio."
                },
                {
                    pregunta: "La barra de bienestar de Bruno refleja el estado emocional del animal. Si llega a 0%, Bruno se niega a seguir. Esto ilustra:",
                    opciones: ["Indefensión aprendida", "Extinción", "Generalización", "Discriminación"],
                    correcta: 0,
                    explicacion: "Cuando un organismo experimenta consecuencias aversivas incontrolables, puede desarrollar indefensión aprendida (Seligman): deja de intentarlo."
                }
            ]
        }
    }
];
