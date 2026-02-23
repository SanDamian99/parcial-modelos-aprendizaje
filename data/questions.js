// data/questions.js
// Banco de 45 preguntas: 15 Conductismo Clásico, 15 Operante, 15 Aprendizaje Social
const QUESTIONS_BANK = [
  // ═══════════════════════════════════════════
  // CONDUCTISMO CLÁSICO (15 preguntas)
  // ═══════════════════════════════════════════
  {
    id: "CC_001",
    topic: "clasico",
    question: "Para un paciente de 80 años, el hospital es aversivo. Si el sonido del monitor cardíaco (Bip-Bip) precede siempre a una inyección dolorosa, el Bip-Bip se convierte en predictor de dolor mediante:",
    correct: "Contigüidad Temporal",
    distractors: ["Reforzamiento Negativo", "Aprendizaje Observacional", "Castigo Positivo"],
    explanation: "La contigüidad temporal es el principio por el cual dos estímulos que ocurren juntos en el tiempo se asocian. El Bip-Bip (EN) precede consistentemente a la inyección (EI), estableciendo una asociación clásica.",
    concept: "Contigüidad temporal en condicionamiento clásico"
  },
  {
    id: "CC_002",
    topic: "clasico",
    question: "Si el sonido de la sirena de ambulancia (Neutro) se asocia repetidamente con llegada de pacientes críticos (EI) y ahora provoca alerta fisiológica en el personal, la sirena es un:",
    correct: "Estímulo Condicionado",
    distractors: ["Estímulo Incondicionado", "Respuesta Incondicionada", "Reforzador Secundario"],
    explanation: "La sirena era un estímulo neutro que, tras asociarse repetidamente con un EI (llegada de pacientes críticos), adquirió la capacidad de provocar una respuesta por sí sola, convirtiéndose en un Estímulo Condicionado (EC).",
    concept: "Adquisición del EC"
  },
  {
    id: "CC_003",
    topic: "clasico",
    question: "Si el 'Promedio de eventos/paciente' es 1.56 y cada nuevo evento fortalece la asociación entre 'Dolor de pecho' y 'Miedo a morir', la fuerza de la RC aumenta por:",
    correct: "Número de apareamientos (Adquisición)",
    distractors: ["Precondicionamiento sensorial", "Inhibición externa", "Sombreado del estímulo"],
    explanation: "En la fase de adquisición del condicionamiento clásico, la fuerza de la Respuesta Condicionada (RC) aumenta con cada nuevo apareamiento entre el EC y el EI. A más eventos (apareamientos), mayor fuerza de la asociación.",
    concept: "Adquisición"
  },
  {
    id: "CC_004",
    topic: "clasico",
    question: "Si un paciente asocia la 'Bata Blanca' con malas noticias, y el médico cambia su bata por uniforme azul para reducir la ansiedad, está intentando romper la asociación mediante:",
    correct: "Alteración del Estímulo Condicionado",
    distractors: ["Castigo de la respuesta", "Reforzamiento diferencial", "Moldeamiento"],
    explanation: "Al cambiar la bata blanca (EC) por un uniforme azul, se elimina el estímulo que dispara la respuesta condicionada de ansiedad. Es una estrategia de extinción por modificación del EC.",
    concept: "Extinción por modificación del EC"
  },
  {
    id: "CC_005",
    topic: "clasico",
    question: "Si un paciente de 35 años asocia el olor a alcohol antiséptico con dolor del infarto, pero luego de muchas visitas sin dolor el olor deja de producir miedo, ¿qué fenómeno ocurrió?",
    correct: "Extinción",
    distractors: ["Habituación", "Sensibilización", "Contracondicionamiento"],
    explanation: "La extinción clásica ocurre cuando el EC (olor a alcohol) se presenta repetidamente sin el EI (dolor), debilitando progresivamente la RC (miedo) hasta que desaparece.",
    concept: "Extinción clásica"
  },
  {
    id: "CC_006",
    topic: "clasico",
    question: "Si un paciente con múltiples eventos asocia el dolor en el brazo izquierdo con un infarto, y ahora siente dolor por un golpe y se angustia, ¿qué fenómeno se presenta?",
    correct: "Generalización del estímulo",
    distractors: ["Discriminación", "Recuperación espontánea", "Inhibición latente"],
    explanation: "La generalización ocurre cuando estímulos similares al EC original (dolor en el brazo, aunque sea por otra causa) provocan la misma RC (angustia). El paciente no discrimina entre el dolor por infarto y el dolor por golpe.",
    concept: "Generalización"
  },
  {
    id: "CC_007",
    topic: "clasico",
    question: "Un paciente sufrió un IAM en la 'Clínica de la Presentación'. Ahora pasar por esa calle le genera taquicardia, pero pasar por otras clínicas no. Esto demuestra:",
    correct: "Discriminación",
    distractors: ["Generalización", "Adquisición", "Recuperación espontánea"],
    explanation: "La discriminación es la capacidad de responder de forma diferente a estímulos similares. El paciente reacciona solo ante la clínica específica donde ocurrió el trauma, no ante otras clínicas.",
    concept: "Discriminación de estímulos"
  },
  {
    id: "CC_008",
    topic: "clasico",
    question: "Un paciente del grupo 60-69 años sufre un IAM. El dolor (EI) genera miedo (RI). Semanas después, al ver el logotipo de la clínica (EN), siente ansiedad. ¿Qué función cumple el logotipo?",
    correct: "Estímulo Condicionado (EC)",
    distractors: ["Estímulo Incondicionado", "Respuesta Condicionada", "Estímulo Discriminativo"],
    explanation: "El logotipo era un EN que se asoció al trauma (EI). Ahora, por sí solo, provoca ansiedad (RC), lo que lo convierte en un EC. Su función es disparar la respuesta aprendida.",
    concept: "Función del EC"
  },
  {
    id: "CC_009",
    topic: "clasico",
    question: "Si se introduce un ruido fuerte (EI) cada vez que el médico entra en una zona incorrecta y esto provoca una respuesta de sobresalto (RI), hablamos de:",
    correct: "Condicionamiento Aversivo",
    distractors: ["Condicionamiento Apetitivo", "Aprendizaje por evitación", "Castigo Negativo"],
    explanation: "El condicionamiento aversivo usa un EI desagradable (ruido fuerte) para crear una asociación de evitación. El sobresalto es la RI natural al EI aversivo.",
    concept: "Condicionamiento aversivo"
  },
  {
    id: "CC_010",
    topic: "clasico",
    question: "Para un niño, el sonido de la campana escolar es neutral. Si precede siempre a un examen difícil, la campana se convierte en predictor de ansiedad mediante:",
    correct: "Contigüidad Temporal",
    distractors: ["Reforzamiento Negativo", "Aprendizaje Observacional", "Castigo Positivo"],
    explanation: "La contigüidad temporal establece que dos estímulos presentados juntos repetidamente se asocian. La campana (EN) precede al examen (EI), adquiriendo propiedades de EC que predice ansiedad.",
    concept: "Contigüidad temporal"
  },
  {
    id: "CC_011",
    topic: "clasico",
    question: "Si la notificación del celular se asocia repetidamente con mensajes de alguien querido y ahora provoca una sonrisa, la notificación es un:",
    correct: "Estímulo Condicionado",
    distractors: ["Estímulo Incondicionado", "Respuesta Incondicionada", "Reforzador Secundario"],
    explanation: "La notificación era un EN que, tras la asociación repetida con un EI apetitivo (mensajes de la persona querida), se convierte en EC capaz de provocar una RC emocional positiva (sonrisa).",
    concept: "Adquisición del EC"
  },
  {
    id: "CC_012",
    topic: "clasico",
    question: "Un estudiante asociaba el olor de libros viejos con estrés de exámenes. Tras un verano leyendo por placer, el olor deja de producir estrés. ¿Qué fenómeno ocurrió?",
    correct: "Extinción",
    distractors: ["Habituación", "Sensibilización", "Contracondicionamiento"],
    explanation: "La extinción ocurre porque el EC (olor) se presenta reiteradamente sin el EI (examen estresante), debilitando la RC (estrés) hasta que se extingue.",
    concept: "Extinción clásica"
  },
  {
    id: "CC_013",
    topic: "clasico",
    question: "Un niño asocia el trueno fuerte con miedo. Si ahora el sonido de una puerta cerrándose fuerte le genera angustia, ¿qué fenómeno se presenta?",
    correct: "Generalización del estímulo",
    distractors: ["Discriminación", "Recuperación espontánea", "Inhibición latente"],
    explanation: "La generalización del estímulo ocurre cuando estímulos perceptualmente similares al EC (sonidos fuertes como el portazo) evocan la misma RC (angustia) que el EC original (trueno).",
    concept: "Generalización"
  },
  {
    id: "CC_014",
    topic: "clasico",
    question: "Un estudiante tuvo bullying en el patio. El patio se asoció con miedo. Ahora al ver una foto del patio siente ansiedad. ¿Qué función cumple la foto?",
    correct: "Estímulo Condicionado (EC)",
    distractors: ["Estímulo Incondicionado", "Respuesta Condicionada", "Estímulo Discriminativo"],
    explanation: "La foto funciona como EC de segundo orden o como EC directo (representación del lugar). La mera imagen activa la RC (ansiedad) aprendida por asociación con el evento traumático.",
    concept: "Función del EC"
  },
  {
    id: "CC_015",
    topic: "clasico",
    question: "Un estudiante tuvo mala experiencia en álgebra. Ahora entrar al salón de matemáticas le da nervios, pero entrar al de literatura no. Esto demuestra:",
    correct: "Discriminación",
    distractors: ["Generalización", "Adquisición", "Recuperación espontánea"],
    explanation: "La discriminación consiste en responder diferencialmente a estímulos similares. El estudiante distingue entre el salón de matemáticas (EC) y el de literatura (estímulo diferente), mostrando una RC solo ante el primero.",
    concept: "Discriminación de estímulos"
  },

  // ═══════════════════════════════════════════
  // CONDUCTISMO OPERANTE (15 preguntas)
  // ═══════════════════════════════════════════
  {
    id: "OP_001",
    topic: "operante",
    question: "Cuando un paciente llega a urgencias y se le quita el dolor torácico con morfina, la conducta de 'ir al hospital' se fortalece. ¿Qué contingencia explica esto?",
    correct: "Reforzamiento Negativo (retiro de estímulo aversivo)",
    distractors: ["Reforzamiento Positivo", "Castigo Negativo", "Extinción"],
    explanation: "El reforzamiento negativo fortalece una conducta porque conlleva la eliminación o reducción de un estímulo aversivo (el dolor). Al ir al hospital y quitarse el dolor, la conducta de acudir se refuerza.",
    concept: "Reforzamiento negativo"
  },
  {
    id: "OP_002",
    topic: "operante",
    question: "Si un auditor empieza a poner multas por cada registro sin código y los registros completos aumentan, ¿qué contingencia se aplicó?",
    correct: "Castigo Positivo para reducir la omisión",
    distractors: ["Reforzamiento Negativo", "Extinción", "Reforzamiento Positivo"],
    explanation: "El castigo positivo consiste en añadir un estímulo aversivo (multa) tras una conducta indeseada (omitir códigos), lo que reduce esa conducta y, como consecuencia, aumentan los registros completos.",
    concept: "Castigo positivo"
  },
  {
    id: "OP_003",
    topic: "operante",
    question: "Los administradores premian cada 5 procedimientos realizados con un descanso extra. Están usando un programa de reforzamiento de:",
    correct: "Razón Fija",
    distractors: ["Intervalo Fijo", "Razón Variable", "Intervalo Variable"],
    explanation: "En un programa de razón fija, el reforzador se entrega después de un número fijo de respuestas (cada 5 procedimientos). Es predecible y genera pausas post-refuerzo típicas.",
    concept: "Programa de razón fija"
  },
  {
    id: "OP_004",
    topic: "operante",
    question: "Los médicos dejan de registrar el código CIE-10 porque el sistema no les da ninguna confirmación o beneficio por hacerlo. ¿Qué proceso operante explica la disminución?",
    correct: "Extinción por falta de reforzamiento",
    distractors: ["Castigo positivo", "Reforzamiento negativo", "Generalización"],
    explanation: "La extinción operante ocurre cuando una conducta aprendida deja de recibir reforzamiento. Si registrar el código no produce ningún beneficio (ni confirmación, ni reconocimiento), la conducta se debilita hasta extinguirse.",
    concept: "Extinción operante"
  },
  {
    id: "OP_005",
    topic: "operante",
    question: "Los cirujanos reciben un bono económico (ficha) por cada cirugía exitosa y esto aumenta la tasa de cirugías. El bono actúa como:",
    correct: "Reforzador Secundario",
    distractors: ["Reforzador Primario", "Estímulo Aversivo", "Estímulo Discriminativo"],
    explanation: "Un reforzador secundario (o condicionado) es aquel que adquiere valor reforzante por asociación con reforzadores primarios. El dinero no satisface necesidades biológicas directamente, pero puede intercambiarse por bienes que sí lo hacen.",
    concept: "Reforzador secundario"
  },
  {
    id: "OP_006",
    topic: "operante",
    question: "Las IPS empiezan a reportar correctamente para evitar la retención de pagos. ¿Qué tipo de aprendizaje operante es?",
    correct: "Reforzamiento Negativo (Evitación)",
    distractors: ["Reforzamiento Positivo", "Castigo Negativo", "Castigo Positivo"],
    explanation: "El reforzamiento negativo de evitación fortalece conductas que previenen la aparición de un estímulo aversivo. Las IPS reportan correctamente para evitar (prevenir) la retención de pagos.",
    concept: "Reforzamiento negativo de evitación"
  },
  {
    id: "OP_007",
    topic: "operante",
    question: "Un paciente toma la ruta de 'Urgencias' y es atendido rápido. Es más probable que vuelva a usar urgencias para dolencias menores. Esto ilustra la:",
    correct: "Ley del Efecto (Thorndike/Skinner)",
    distractors: ["Ley de la Contigüidad", "Teoría del Aprendizaje Social", "Indefensión Aprendida"],
    explanation: "La Ley del Efecto de Thorndike establece que las conductas seguidas de consecuencias satisfactorias tienden a repetirse. La atención rápida refuerza la conducta de acudir a urgencias.",
    concept: "Ley del efecto"
  },
  {
    id: "OP_008",
    topic: "operante",
    question: "Se observa que los cirujanos operan más porque las cirugías previas resultaron en altas tasas de supervivencia inmediata. ¿Qué actúa como reforzador?",
    correct: "Reforzamiento Positivo",
    distractors: ["Reforzamiento Negativo", "Castigo Positivo", "Castigo Negativo"],
    explanation: "El reforzamiento positivo ocurre cuando se añade un estímulo agradable (el éxito, la alta supervivencia) tras la conducta (operar), lo que incrementa la probabilidad de repetir dicha conducta.",
    concept: "Reforzamiento positivo"
  },
  {
    id: "OP_009",
    topic: "operante",
    question: "Los auditores ignoran sistemáticamente los reportes incompletos y con el tiempo los médicos dejan de esforzarse por completarlos. Se ha producido:",
    correct: "Extinción de la conducta de registro",
    distractors: ["Habituación al error", "Castigo negativo", "Reforzamiento intermitente"],
    explanation: "La extinción operante se produce cuando la conducta deja de producir consecuencias. Si completar reportes no genera ninguna respuesta (ni positiva ni negativa), la conducta se extingue.",
    concept: "Extinción operante"
  },
  {
    id: "OP_010",
    topic: "operante",
    question: "Un paciente experimenta alivio inmediato cada vez que toma su medicación al sentir una punzada en el pecho, y la conducta de tomar la pastilla aumenta. Esto es:",
    correct: "Reforzamiento Negativo",
    distractors: ["Reforzamiento Positivo", "Castigo Positivo", "Condicionamiento de Escape"],
    explanation: "El reforzamiento negativo de escape fortalece una conducta que termina con un estímulo aversivo ya presente. La punzada (aversivo) desaparece al tomar la pastilla, reforzando la conducta de medicarse.",
    concept: "Reforzamiento negativo de escape"
  },
  {
    id: "OP_011",
    topic: "operante",
    question: "Un estudiante con ansiedad social va a la biblioteca y el ruido cesa inmediatamente. La conducta de 'ir a la biblioteca' se fortalece. ¿Qué contingencia explica esto?",
    correct: "Reforzamiento Negativo",
    distractors: ["Reforzamiento Positivo", "Castigo Negativo", "Extinción"],
    explanation: "El reforzamiento negativo explica el fortalecimiento de la conducta porque esta produce la retirada de un estímulo aversivo (el ruido). Al ir a la biblioteca y cesar el ruido, la conducta se refuerza.",
    concept: "Reforzamiento negativo"
  },
  {
    id: "OP_012",
    topic: "operante",
    question: "Un profesor resta puntos por cada día de retraso en entregas y las entregas puntuales aumentan. ¿Qué contingencia se aplicó?",
    correct: "Reforzamiento Negativo para aumentar la conducta",
    distractors: ["Castigo Positivo", "Extinción", "Reforzamiento Positivo"],
    explanation: "La conducta objetivo es entregar a tiempo. Los estudiantes entregan puntual para evitar la pérdida de puntos (estímulo aversivo). Esto es reforzamiento negativo de evitación: la conducta aumenta para prevenir una consecuencia aversiva.",
    concept: "Reforzamiento negativo"
  },
  {
    id: "OP_013",
    topic: "operante",
    question: "Coordinadores premian a tutores con un bono de café cada vez que completan 5 sesiones. Programa de reforzamiento de:",
    correct: "Razón Fija",
    distractors: ["Intervalo Fijo", "Razón Variable", "Intervalo Variable"],
    explanation: "Es un programa de Razón Fija porque el reforzador (bono de café) se entrega tras un número fijo y predecible de respuestas (cada 5 sesiones completadas).",
    concept: "Razón fija"
  },
  {
    id: "OP_014",
    topic: "operante",
    question: "En un sistema de economía de fichas, los alumnos reciben un sticker por cada conducta prosocial. El sticker actúa como:",
    correct: "Reforzador Secundario",
    distractors: ["Reforzador Primario", "Estímulo Aversivo", "Estímulo Discriminativo"],
    explanation: "El sticker es un reforzador secundario (condicionado) porque no satisface necesidades biológicas, pero puede intercambiarse por privilegios o premios. Su valor es aprendido, no innato.",
    concept: "Reforzador secundario"
  },
  {
    id: "OP_015",
    topic: "operante",
    question: "Un orientador ignora las quejas de un alumno revoltoso y con el tiempo el alumno deja de quejarse. Se ha producido:",
    correct: "Extinción de la conducta",
    distractors: ["Habituación", "Castigo negativo", "Reforzamiento intermitente"],
    explanation: "Si las quejas eran mantenidas por la atención del orientador (reforzamiento positivo), al retirar la atención (ignorar), el reforzador desaparece y la conducta se extingue progresivamente.",
    concept: "Extinción operante"
  },

  // ═══════════════════════════════════════════
  // APRENDIZAJE SOCIAL - BANDURA (15 preguntas)
  // ═══════════════════════════════════════════
  {
    id: "AS_001",
    topic: "social",
    question: "La caída drástica de eventos hace que los especialistas pierdan habilidad en procedimientos complejos por falta de repetición. Bandura explicaría esto como un fallo en:",
    correct: "Retención motora y práctica",
    distractors: ["Procesos de atención", "Motivación intrínseca", "Autoeficacia percibida"],
    explanation: "Según Bandura, la reproducción motora requiere práctica repetida para mantener y perfeccionar la habilidad. Sin práctica, la retención motora se deteriora y la habilidad aprendida se pierde.",
    concept: "Proceso de reproducción motora"
  },
  {
    id: "AS_002",
    topic: "social",
    question: "La 'Autoeficacia' de Bandura se aplicaría si los pacientes con primer evento creen que:",
    correct: "Son capaces de modificar su dieta para evitar un segundo IAM",
    distractors: ["El sistema los curará sin esfuerzo", "El infarto fue inevitable", "Su destino depende de la suerte"],
    explanation: "La autoeficacia es la creencia en la propia capacidad de ejecutar las conductas necesarias para lograr un resultado deseado. Creer que uno puede modificar su dieta refleja alta autoeficacia.",
    concept: "Autoeficacia"
  },
  {
    id: "AS_003",
    topic: "social",
    question: "Un paciente elige la Clínica Los Nogales porque escuchó a su vecino (modelo de confianza) decir que 'es la mejor para el corazón'. Su conducta se basa en:",
    correct: "Influencia del Modelo",
    distractors: ["Ensayo y Error", "Condicionamiento Directo", "Refuerzo Intermitente"],
    explanation: "Según Bandura, la influencia del modelo determina las decisiones del observador. Un modelo creíble y de confianza (el vecino) influye en la conducta (elegir la clínica) sin experiencia directa.",
    concept: "Influencia del modelo"
  },
  {
    id: "AS_004",
    topic: "social",
    question: "La Clínica Nuestra Ibagué decide adoptar los protocolos de triaje de Los Nogales tras observar su éxito. ¿Qué tipo de aprendizaje está ocurriendo?",
    correct: "Aprendizaje Vicario",
    distractors: ["Moldeamiento", "Condicionamiento de segundo orden", "Aprendizaje por Insight"],
    explanation: "El aprendizaje vicario (observacional) ocurre cuando se aprende observando las conductas de otros y sus consecuencias, sin experiencia directa. La clínica observó el éxito de otra e imitó su protocolo.",
    concept: "Aprendizaje vicario"
  },
  {
    id: "AS_005",
    topic: "social",
    question: "Las demás clínicas ven que la Fundación Cardiovascular recibe incentivos financieros y se motivan a competir. Se ejemplifica el concepto de:",
    correct: "Refuerzo Vicario",
    distractors: ["Facilitación de respuesta", "Inhibición desinhibitoria", "Atención selectiva"],
    explanation: "El refuerzo vicario ocurre cuando el observador se motiva al ver que otro (el modelo) recibe refuerzo por su conducta. Las clínicas ven los incentivos ajenos y se motivan a competir.",
    concept: "Refuerzo vicario"
  },
  {
    id: "AS_006",
    topic: "social",
    question: "Sin ver las consecuencias reales de los procedimientos, Bandura diría que es difícil establecer aprendizaje porque falta:",
    correct: "El componente motivacional del refuerzo",
    distractors: ["La atención selectiva", "La reproducción motora", "La codificación simbólica"],
    explanation: "Sin observar las consecuencias (refuerzo o castigo vicario), falta el componente motivacional que impulsa al observador a reproducir la conducta. La motivación depende de anticipar resultados.",
    concept: "Motivación y refuerzo vicario"
  },
  {
    id: "AS_007",
    topic: "social",
    question: "Un médico residente observa a su jefe diagnosticar correctamente y empieza a usar esos mismos criterios. Bandura llamaría a este proceso:",
    correct: "Modelamiento (Modeling)",
    distractors: ["Condicionamiento Instrumental", "Aprendizaje Latente", "Desensibilización Sistemática"],
    explanation: "El modelamiento es el proceso central del aprendizaje social: un observador adquiere nuevas conductas o modifica las existentes al observar a un modelo. El residente observa e imita al jefe.",
    concept: "Modelamiento"
  },
  {
    id: "AS_008",
    topic: "social",
    question: "Si la EPS publica un ranking donde felicita a la mejor clínica esperando que las otras mejoren por competencia, apela a:",
    correct: "Motivación por incentivo vicario",
    distractors: ["Condicionamiento de evitación", "Ley del ejercicio", "Programas de razón fija"],
    explanation: "El incentivo vicario motiva al observador mostrándole las recompensas que reciben otros. Al publicar el ranking y felicitar al mejor, se espera que el resto se motive a imitar la conducta exitosa.",
    concept: "Incentivo vicario"
  },
  {
    id: "AS_009",
    topic: "social",
    question: "Un médico junior ve que su jefe omite el diagnóstico CIE-10 sin recibir sanción, y el junior imita la omisión debido a:",
    correct: "Desinhibición por falta de consecuencias negativas",
    distractors: ["Reforzamiento Vicario Positivo", "Generalización de respuesta", "Aprendizaje por descubrimiento"],
    explanation: "La desinhibición ocurre cuando el observador ve que una conducta prohibida no recibe castigo, lo que reduce su inhibición para realizar esa misma conducta. No ver sanción 'autoriza' la imitación.",
    concept: "Desinhibición"
  },
  {
    id: "AS_010",
    topic: "social",
    question: "Un paciente nuevo observa en la sala de espera que otros pacientes están tranquilos y esto reduce su propia ansiedad. Ha ocurrido un efecto de:",
    correct: "Inhibición de la respuesta de miedo",
    distractors: ["Desinhibición de conductas", "Facilitación social", "Condicionamiento directo"],
    explanation: "La inhibición vicaria ocurre cuando observar la calma de otros (modelos) inhibe la respuesta de miedo del observador. Ver que otros no muestran ansiedad reduce la propia.",
    concept: "Inhibición vicaria"
  },
  {
    id: "AS_011",
    topic: "social",
    question: "La Autoeficacia de Bandura se aplicaría si un estudiante que reprobó su primer examen cree que:",
    correct: "Es capaz de mejorar su método de estudio para aprobar el siguiente",
    distractors: ["El profesor lo aprobará sin esfuerzo", "Reprobar fue mala suerte", "Su inteligencia es fija"],
    explanation: "La autoeficacia es la creencia en la propia capacidad para ejecutar acciones necesarias. Creer que uno puede cambiar su método de estudio refleja alta autoeficacia, a diferencia del fatalismo o el locus de control externo.",
    concept: "Autoeficacia"
  },
  {
    id: "AS_012",
    topic: "social",
    question: "Un aspirante elige una universidad porque su hermano mayor (modelo de éxito) dice que 'es la mejor para conseguir empleo'. Su conducta se basa en:",
    correct: "Influencia del Modelo",
    distractors: ["Ensayo y Error", "Condicionamiento Directo", "Refuerzo Intermitente"],
    explanation: "La influencia del modelo es clave en la teoría de Bandura. Un modelo prestigioso o de confianza (hermano exitoso) ejerce una influencia directa sobre las decisiones del observador.",
    concept: "Influencia del modelo"
  },
  {
    id: "AS_013",
    topic: "social",
    question: "Una escuela pequeña adopta el método de enseñanza de una institución de élite tras observar cómo sus estudiantes ganan premios. ¿Qué aprendizaje ocurre?",
    correct: "Aprendizaje Vicario",
    distractors: ["Moldeamiento", "Condicionamiento de segundo orden", "Aprendizaje por Insight"],
    explanation: "El aprendizaje vicario permite adquirir nuevas conductas o estrategias al observar los resultados que obtienen otros. La escuela pequeña imita sin experiencia directa, basándose en la observación del éxito ajeno.",
    concept: "Aprendizaje vicario"
  },
  {
    id: "AS_014",
    topic: "social",
    question: "Los estudiantes de primer año ven que los de último año reciben becas por publicar artículos, y esto los motiva a iniciar proyectos propios. Se ejemplifica:",
    correct: "Refuerzo Vicario",
    distractors: ["Facilitación de respuesta", "Inhibición desinhibitoria", "Atención selectiva"],
    explanation: "El refuerzo vicario es observar que la conducta de otro (publicar) es seguida de una consecuencia positiva (beca), lo que motiva al observador a realizar la misma conducta.",
    concept: "Refuerzo vicario"
  },
  {
    id: "AS_015",
    topic: "social",
    question: "Un practicante ve que su tutor llega tarde sin recibir sanción, y empieza a llegar tarde también. Esto ocurre por:",
    correct: "Desinhibición por falta de consecuencias negativas",
    distractors: ["Reforzamiento Vicario Positivo", "Generalización", "Aprendizaje por descubrimiento"],
    explanation: "La desinhibición se produce cuando el observador constata la ausencia de castigo para una conducta prohibida, lo que reduce sus inhibiciones para realizar esa misma conducta.",
    concept: "Desinhibición"
  }
];