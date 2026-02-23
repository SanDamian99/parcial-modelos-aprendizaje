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
        intervention_correct: "Desensibilización sistemática",
        socratic_feedback: "❌ Diagnóstico Fallido.\\n💡 Piensa: ¿El miedo de María fue natural o aprendido tras escuchar el taladro junto con el dolor (el cual es incondicionado)? ¿Qué técnica de Wolpe reduce la ansiedad asociando calma con el estímulo temido?"
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
        maintenance_correct: 0,
        socratic_feedback: "❌ Análisis Operante Incorrecto.\n💡 Piensa: En la Fase 1, observa qué ocurre cuando se suprimen todas las consecuencias de una conducta. En la Fase 2, evalúa si se añadió o se retiró un estímulo para fomentar la puntualidad. Por último, para mantener esa conducta a largo plazo y hacerla resistente a la extinción, ¿es más efectivo entregar el premio de forma rutinaria y exacta o de manera impredecible?"
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
        question_correct: 0,
        socratic_feedback: "❌ Secuencia o respuesta incorrecta.\n💡 Piensa: Según la teoría del Aprendizaje Social de Bandura, el proceso inicia identificando los roles (quién actúa y quién observa), seguido por procesos cognitivos (enfocar los sentidos, codificar el recuerdo y verificar la capacidad física para actuar), y termina con factores motivacionales (observar las consecuencias en el otro y creer en la propia capacidad). Analiza si tu secuencia respeta esta lógica y revisa tu respuesta a la pregunta final."
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
        predict_correct: 0,
        socratic_feedback: "❌ Clasificación o predicción fallida.\n💡 Analiza caso por caso: Para los exámenes sorpresa, pregúntate si el tiempo que transcurre entre ellos es fijo o azaroso. Para el ranking público, evalúa qué teoría se centra en el aprendizaje al observar el éxito ajeno. En cuanto a retirar el recreo, determina si se está añadiendo o quitando un estímulo, y si eso busca que una conducta aumente o disminuya."
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
                explicacion: "❌ Incorrecto.\\n💡 Piensa: El timbre solo es el estímulo condicionado (EC) que causa ansiedad (RC) AHORA. Pero, ¿qué evento natural generaba el displacer antes del aprendizaje? El regaño causaba malestar por sí mismo.",
                concepto: "EI en condicionamiento clásico"
            },
            {
                row: 2, col: 1,
                mini_caso: "Tomás sudaba cada vez que un profesor gritaba. Ahora también suda cuando cualquier adulto levanta la voz. ¿Qué fenómeno describe esto?",
                opciones: ["Generalización", "Discriminación", "Extinción", "Adquisición"],
                correcta: 0,
                explicacion: "❌ Incorrecto.\\n💡 Piensa: Si Tomás está respondiendo igual a estímulos que se parecen (cualquier adulto vs el profesor), significa que no logra separar ambos conceptos.",
                concepto: "Generalización del estímulo"
            },
            {
                row: 1, col: 5,
                mini_caso: "El profesor de arte de Tomás era amable y nunca gritaba. Tomás no sentía miedo en clase de arte, aunque sí en las demás. ¿Qué fenómeno se evidencia?",
                opciones: ["Discriminación", "Generalización", "Recuperación espontánea", "Adquisición"],
                correcta: 0,
                explicacion: "❌ Incorrecto.\\n💡 Piensa: A diferencia de la puerta anterior, Tomás sí distingue entre un estímulo seguro (arte) y uno amenazante (otras clases).",
                concepto: "Discriminación de estímulos"
            },
            {
                row: 3, col: 6,
                mini_caso: "Tomás dejó de ir a la escuela por un mes. Cuando regresó, al escuchar el timbre, sintió náuseas otra vez. ¿Qué fenómeno es este?",
                opciones: ["Recuperación espontánea", "Generalización", "Adquisición nueva", "Sensibilización"],
                correcta: 0,
                explicacion: "❌ Incorrecto.\\n💡 Piensa: El miedo había bajado, pero tras un largo descanso y volver al contexto, la respuesta 'brotó' nuevamente de repente por sí sola sin un nuevo trauma.",
                concepto: "Recuperación espontánea"
            },
            {
                row: 4, col: 3,
                mini_caso: "El terapeuta expone gradualmente a Tomás: primero fotos del colegio, luego videos, luego visitas cortas sin clases. ¿Qué técnica usa?",
                opciones: ["Desensibilización Sistemática", "Contracondicionamiento", "Extinción abrupta", "Castigo"],
                correcta: 0,
                explicacion: "❌ Incorrecto.\\n💡 Piensa: El terapeuta no usa un susto repentino (abrupto) ni le enseña una emoción opuesta con helados. Va paso a pasito reduciendo la sensibilidad al estímulo.",
                concepto: "Desensibilización sistemática"
            },
            {
                row: 5, col: 4,
                mini_caso: "El terapeuta enseña a Tomás técnicas de relajación y las aplica mientras imagina estar en el colegio. El miedo disminuye. ¿Qué principio aplica?",
                opciones: ["Inhibición recíproca", "Reforzamiento Positivo", "Extinción operante", "Castigo Negativo"],
                correcta: 0,
                explicacion: "❌ Incorrecto.\\n💡 Piensa: Wolpe dijo que biológicamente no puedes estar relajado y aterrorizado al mismo tiempo. Un estado frena (inhibe) al otro.",
                concepto: "Inhibición recíproca"
            },
            {
                row: 6, col: 6,
                mini_caso: "Tras varias sesiones, Tomás escucha el timbre del colegio y ya no siente náuseas. ¿Qué proceso se completó?",
                opciones: ["Extinción", "Habituación", "Sensibilización", "Contracondicionamiento"],
                correcta: 0,
                explicacion: "❌ Incorrecto.\\n💡 Piensa: Cuando escuchas el EC (timbre) muchas veces, pero ya nunca llega el EI (regaños), la curva de ansiedad simplemente se agota y desaparece.",
                concepto: "Extinción clásica"
            },
            {
                row: 7, col: 3,
                mini_caso: "Tomás ahora juega feliz en el recreo. Los otros niños que antes lo evitaban empiezan a acercarse. Su sonrisa al escuchar el timbre refleja:",
                opciones: ["Contracondicionamiento exitoso", "Generalización inversa", "Castigo Positivo", "Reforzamiento Diferencial"],
                correcta: 0,
                explicacion: "❌ Incorrecto.\\n💡 Piensa: No solo se eliminó el miedo (extinción), sino que ahora asocia el mismo viejo estímulo con una emoción completamente nueva y opuesta (alegría contra el miedo).",
                concepto: "Contracondicionamiento"
            },
            // Puertas más fáciles (rutas alternativas)
            {
                row: 5, col: 1,
                mini_caso: "Un sonido fuerte hace que Tomás salte de su silla. ¿Este salto es una respuesta...?",
                opciones: ["Incondicionada", "Condicionada", "Operante", "Voluntaria"],
                correcta: 0,
                explicacion: "❌ Incorrecto.\\n💡 Piensa: Si nunca tuvo que aprenderlo y su biología reaccionó por puro reflejo defensivo, ¿es una reacción adquirida o innata?",
                concepto: "Respuesta Incondicionada"
            },
            {
                row: 7, col: 1,
                mini_caso: "Un estímulo que originalmente no causaba ninguna respuesta emocional se llama:",
                opciones: ["Estímulo Neutro", "Estímulo Condicionado", "Estímulo Incondicionado", "Respuesta Condicionada"],
                correcta: 0,
                explicacion: "❌ Incorrecto.\\n💡 Piensa: Antes de que el perro aprenda a salivar, escuchar una campana no significa nada para él.",
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
                situacion: "Bruno inicia su entrenamiento. El olor a explosivo (C4) no le significa nada (es ignorado). Quieres que el olor a C4 provoque en él una reacción automática de alerta (salivación/excitación). ¿Cómo procedes según Pavlov?",
                concepto: "Adquisición (Condicionamiento Clásico)",
                opciones: [
                    "A) Toco un clicker y le doy una galleta cada vez que mira el C4 accidentalmente.",
                    "B) Presento el olor a C4 e inmediatamente después presento su pelota favorita, repitiendo el proceso.",
                    "C) Le grito fuerte cuando huele el C4 para que le tenga miedo.",
                    "D) Escondo el C4 en el campo y espero a que lo encuentre naturalmente."
                ],
                correcta: 1,
                suboptima: 0,
                consecuencias: {
                    correcta: { aprendizaje: 20, bienestar: 5 },
                    suboptima: { aprendizaje: 10, bienestar: 0 },
                    incorrecta: { aprendizaje: 0, bienestar: -15 }
                },
                explicacion_correcta: "✅ ¡Excelente decisión!\n💡 Recuerda: El olor a C4 (EN) se presenta seguido de la pelota (EI que genera excitación RI). Tras repeticiones, el C4 se volverá un EC que genera excitación (RC).\n📖 Concepto clave: Adquisición en condicionamiento clásico",
                explicacion_suboptima: "❌ Decisión subóptima.\n💡 Piensa: Eso es condicionamiento operante (moldear una conducta voluntaria). En esta fase buscamos crear un reflejo condicionado involuntario al olor.\n📖 Concepto clave: Diferencia entre Clásico y Operante",
                explicacion_incorrecta: "❌ Decisión incorrecta.\n💡 Piensa: Gritarle (EI aversivo) asociará el olor con miedo/terror, y huirá del C4 en lugar de alertar excitado al humano.\n📖 Concepto clave: Condicionamiento aversivo no deseado"
            },
            {
                turno: 2,
                situacion: "Bruno aprendió a reaccionar excitado al olor del C4. Sin embargo, descubres que ahora también se excita automáticamente cuando huele pólvora blanca de fuegos artificiales (inofensiva pero de olor similar).",
                concepto: "Generalización del Estímulo",
                opciones: [
                    "A) Es generalización del estímulo. Hay que someterlo a discriminación presentando la pólvora blanca sin la pelota.",
                    "B) Es extinción. Se ha olvidado del C4 y hay que empezar de nuevo.",
                    "C) Es recuperación espontánea. El perro recordó traumas viejos.",
                    "D) Es un castigo negativo porque la pólvora no es peligrosa."
                ],
                correcta: 0,
                suboptima: 1,
                consecuencias: {
                    correcta: { aprendizaje: 20, bienestar: 5 },
                    suboptima: { aprendizaje: 0, bienestar: -5 },
                    incorrecta: { aprendizaje: -10, bienestar: -10 }
                },
                explicacion_correcta: "✅ ¡Excelente decisión!\n💡 Recuerda: Bruno generalizó a olores químicos similares. La discriminación (presentar pólvora sin pelota, y C4 con pelota) afinará su olfato.\n📖 Concepto clave: Discriminación de estímulos",
                explicacion_suboptima: "❌ Decisión subóptima.\n💡 Piensa: No es una pérdida de la respuesta. Al contrario, la respuesta (excitación) se ha expandido a demasiados estímulos similares no deseados.\n📖 Concepto clave: Generalización vs Extinción",
                explicacion_incorrecta: "❌ Decisión incorrecta.\n💡 Piensa: Los conceptos operantes (castigo) no aplican aquí, pues es una excitación biológica automática desencadenada por el olor.\n📖 Concepto clave: Error de categoría teórica"
            },
            {
                turno: 3,
                situacion: "Durante un mes, Bruno fue expuesto al olor a C4 (EC) repetidas veces en exhibiciones, pero NUNCA se le entregó su pelota favorita (EI). Ahora, Bruno huele C4 y ya no muestra excitación alguna.",
                concepto: "Extinción Clásica",
                opciones: [
                    "A) Se produjo extinción al romper la asociación entre el C4 y la recompensa biológica (pelota).",
                    "B) Bruno sufrió una habituación sensorial porque su nariz se cansó del olor.",
                    "C) Es un caso claro de reforzamiento negativo por evitación.",
                    "D) Sufrió de inhibición recíproca al estar rodeado de gente."
                ],
                correcta: 0,
                suboptima: 1,
                consecuencias: {
                    correcta: { aprendizaje: 20, bienestar: 0 },
                    suboptima: { aprendizaje: 10, bienestar: -5 },
                    incorrecta: { aprendizaje: -10, bienestar: -15 }
                },
                explicacion_correcta: "✅ ¡Excelente decisión!\n💡 Recuerda: Cuando el EC (olor a C4) se presenta crónicamente sin el EI (pelota), la curva de respuesta condicionada cae hasta cero.\n📖 Concepto clave: Extinción clásica",
                explicacion_suboptima: "❌ Decisión subóptima.\n💡 Piensa: La habituación aplica a estímulos innatos incondicionados, no a respuestas que fueron previamente aprendidas mediante emparejamiento asociativo.\n📖 Concepto clave: Extinción vs Habituación",
                explicacion_incorrecta: "❌ Decisión incorrecta.\n💡 Piensa: Evitación o refuerzo implican conducta motora para cambiar el ambiente. Aquí es la simple desaparición del reflejo interior de excitación ante un olor.\n📖 Concepto clave: Ausencia de respuesta condicionada"
            },
            {
                turno: 4,
                situacion: "Has re-condicionado el olor del C4 a la pelota, restableciendo el reflejo. Ahora, haces sonar una campanilla repetidas veces JUSTO ANTES de que Bruno huela el C4. Eventualmente, Bruno se excita solo al escuchar la campanilla.",
                concepto: "Condicionamiento de Orden Superior",
                opciones: [
                    "A) Discriminación de segundo grado, porque distingue la campana del olor.",
                    "B) Condicionamiento de segundo orden, donde un EC1 (olor) actúa como EI para un nuevo EC2 (campana).",
                    "C) Generalización inter-modal, transfiriendo del olfato al oído.",
                    "D) Sensibilización cruzada por exceso de entrenamiento."
                ],
                correcta: 1,
                suboptima: 2,
                consecuencias: {
                    correcta: { aprendizaje: 20, bienestar: 0 },
                    suboptima: { aprendizaje: 10, bienestar: 0 },
                    incorrecta: { aprendizaje: -10, bienestar: -10 }
                },
                explicacion_correcta: "✅ ¡Excelente decisión!\n💡 Recuerda: El condicionamiento de orden superior ocurre cuando un estímulo condicionado bien establecido (C4) se usa para condicionar un nuevo estímulo neutro (campanilla).\n📖 Concepto clave: Condicionamiento de segundo orden",
                explicacion_suboptima: "❌ Decisión subóptima.\n💡 Piensa: Aunque involucra dos sentidos, el mecanismo que explica la excitación acústica no es generalización pavloviana pura, sino la contigüidad entre un EN y un EC previo.\n📖 Concepto clave: Condicionamiento intermodal",
                explicacion_incorrecta: "❌ Decisión incorrecta.\n💡 Piensa: No hay 'discriminación' en excitarse por ambas cosas, ni la sensibilización explica la asociación directa y cronológica.\n📖 Concepto clave: Error en la identificación del proceso"
            },
            {
                turno: 5,
                situacion: "Llevas a Bruno a un escenario ruidoso de aeropuerto. El ruido intenso de las turbinas (EI) le da miedo incontrolable (RI). Si se asusta en el aeropuerto, su capacidad olfativa baja. Quieres que el ruido de turbinas le genere relajación.",
                concepto: "Contracondicionamiento",
                opciones: [
                    "A) Le doy descargas eléctricas suaves cada vez que se asusta para detener la conducta ansiosa.",
                    "B) Asocio gradualmente grabaciones del ruido de turbinas con comida deliciosa y caricias hasta llevarlo a las turbinas reales.",
                    "C) Lo encierro en la pista de aterrizaje hasta que su miedo se extinga por agotamiento.",
                    "D) Ignoro su miedo para que se extinga por falta de atención."
                ],
                correcta: 1,
                suboptima: 2,
                consecuencias: {
                    correcta: { aprendizaje: 20, bienestar: 10 },
                    suboptima: { aprendizaje: 0, bienestar: -20 },
                    incorrecta: { aprendizaje: -20, bienestar: -30 }
                },
                explicacion_correcta: "✅ ¡Excelente decisión!\n💡 Recuerda: El contracondicionamiento acopla el estímulo que produce pánico con un estímulo intenso que genera relajación/placer (comida).\n📖 Concepto clave: Contracondicionamiento clínico",
                explicacion_suboptima: "❌ Decisión subóptima.\n💡 Piensa: Eso se llama 'Inundación' (Flooding). Puede funcionar tras agotamiento extremo, pero conlleva un alto riesgo de colapso emotivo.\n📖 Concepto clave: Inundación vs Contracondicionamiento",
                explicacion_incorrecta: "❌ Decisión incorrecta.\n💡 Piensa: Las descargas castigan el miedo creando aún más pánico en bucle. Ignorar el miedo (operante) no frena en nada el terror reflexológico.\n📖 Concepto clave: Fracaso de la técnica aversiva"
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
