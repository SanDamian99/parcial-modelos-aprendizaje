// data/questions.js
// Banco de 58 preguntas: 48 originales + 10 nuevas organizacionales
// Cada explicación usa retroalimentación socrática.

const QUESTIONS_BANK = [
  // ════════════════════════════════════════════════════════
  // CONTEXTO EDUCATIVO 🏫 
  // ════════════════════════════════════════════════════════
  {
    id: "ED_CC_01", topic: "clasico", context: "educativo",
    question: "Un estudiante tuvo una mala experiencia en un examen de álgebra. Ahora, solo entrar al salón de matemáticas le causa ansiedad, aunque hoy no hay examen. El salón funciona como:",
    correct: "Estímulo Condicionado (EC)",
    distractors: ["Estímulo Incondicionado", "Respuesta Incondicionada", "Estímulo Discriminativo"],
    explanation: "❌ Si fuera incondicionado, provocaría ansiedad en todos los estudiantes de forma natural desde el primer día.\\n💡 Recuerda: Pavlov demostró que un estímulo previamente neutro adquiere la capacidad de evocar una respuesta tras asociarse repetidamente con un estímulo biológicamente significativo.\\n📖 Concepto clave: Adquisición del EC",
    concept: "Adquisición del EC"
  },
  {
    id: "ED_CC_02", topic: "clasico", context: "educativo",
    question: "Un niño asocia el timbre de la escuela con regaños del profesor. Si ahora el timbre de su casa también le genera angustia, ¿qué fenómeno se presenta?",
    correct: "Generalización del estímulo",
    distractors: ["Discriminación", "Recuperación espontánea", "Extinción"],
    explanation: "❌ Si el niño supiera diferenciar perfectamente ambos timbres, no sentiría angustia en casa. Esta opción implica distinguir, no confundir.\\n💡 Recuerda: Cuando una respuesta condicionada se extiende a estímulos similares al EC original, hablamos de una falta de diferenciación perceptual.\\n📖 Concepto clave: Generalización",
    concept: "Generalización"
  },
  {
    id: "ED_CC_03", topic: "clasico", context: "educativo",
    question: "Un estudiante temía las exposiciones orales. Su profesor lo expuso gradualmente: primero hablar en parejas, luego en grupo pequeño, luego ante toda la clase. Después de un semestre, ya no siente ansiedad. ¿qué técnica se utilizó?",
    correct: "Desensibilización Sistemática",
    distractors: ["Extinción abrupta", "Contracondicionamiento", "Castigo Positivo"],
    explanation: "❌ La palabra 'abrupta' o 'castigo' contradice la paciencia y paso a paso del caso. La técnica usada implica jerarquías y relajación paso a paso.\\n💡 Recuerda: Wolpe introdujo esta técnica clínica basada en la exposición gradual a la fuente fisiológica de ansiedad mientras se mantiene un estado antagónico (calma).\\n📖 Concepto clave: Desensibilización sistemática",
    concept: "Desensibilización sistemática"
  },
  {
    id: "ED_CC_04", topic: "clasico", context: "educativo",
    question: "Un estudiante asociaba el olor de libros viejos con estrés de exámenes. Tras un verano leyendo por placer sin exámenes, el olor deja de producir estrés. ¿Qué ocurrió?",
    correct: "Extinción",
    distractors: ["Habituación", "Sensibilización", "Inhibición latente"],
    explanation: "❌ La habituación ocurre con reflejos innatos ante estímulos constantes, no con respuestas previamente aprendidas.\\n💡 Recuerda: En el condicionamiento clásico, el debilitamiento de la respuesta condicionada ocurre al presentar repetidamente el EC sin su correspondencia con el EI.\\n📖 Concepto clave: Extinción clásica",
    concept: "Extinción clásica"
  },
  {
    id: "ED_OP_01", topic: "operante", context: "educativo",
    question: "Un estudiante deja de participar en clase porque el profesor nunca reacciona a sus respuestas, ni positiva ni negativamente. ¿Qué proceso operante explica la disminución?",
    correct: "Extinción por falta de reforzamiento",
    distractors: ["Castigo Negativo", "Habituación", "Generalización"],
    explanation: "❌ El castigo negativo implica quitar intencionalmente algo valioso contingente a la conducta. Aquí nadie quita nada, simplemente no pasa nada.\\n💡 Recuerda: Skinner postuló que cuando una conducta operante deja sistemáticamente de producir sus consecuencias reforzadoras, su frecuencia decae a niveles base.\\n📖 Concepto clave: Extinción operante",
    concept: "Extinción operante"
  },
  {
    id: "ED_OP_02", topic: "operante", context: "educativo",
    question: "Una profesora otorga un sticker por cada 5 tareas completas. Los estudiantes empezaron a entregar más tareas. ¿Qué programa de reforzamiento usa?",
    correct: "Razón Fija",
    distractors: ["Intervalo Fijo", "Razón Variable", "Intervalo Variable"],
    explanation: "❌ La palabra 'Intervalo' se refiere a tiempo (ej: semanas o días). Aquí no hablamos de tiempo, sino de un número de entregas.\\n💡 Recuerda: Los programas operantes se dividen según si dependen de la cantidad de respuestas (Razón) o del paso del tiempo (Intervalo), y si son predecibles (Fijo) o no (Variable).\\n📖 Concepto clave: Razón fija",
    concept: "Razón fija"
  },
  {
    id: "ED_OP_03", topic: "operante", context: "educativo",
    question: "Un profesor resta puntos por cada día de retraso en entregas y las entregas puntuales aumentan (es decir, el retraso disminuye). ¿Qué contingencia se aplicó?",
    correct: "Castigo Negativo",
    distractors: ["Castigo Positivo", "Reforzamiento Positivo", "Extinción"],
    explanation: "❌ Si fuera 'Positivo', significaría que el profesor está añadiendo un estímulo (como un grito o una multa física). Aquí 'resta' o quita puntos, retirando algo valioso.\\n💡 Recuerda: En la matriz operante, 'Negativo' significa retirar un estímulo, y 'Castigo' significa que la conducta objetivo (entregar tarde) decrece.\\n📖 Concepto clave: Castigo negativo",
    concept: "Castigo negativo"
  },
  {
    id: "ED_OP_04", topic: "operante", context: "educativo",
    question: "Un maestro hace quizzes sorpresa sin previo aviso durante el semestre. Los estudiantes estudian de manera constante. ¿Qué programa de reforzamiento describe esto?",
    correct: "Intervalo Variable",
    distractors: ["Intervalo Fijo", "Razón Fija", "Razón Variable"],
    explanation: "❌ Si fuera de 'Razón', dependería de cuántas hojas lean los alumnos. Aquí depende de cuándo el profesor decide hacer el quiz, lo cual es tiempo impredecible.\\n💡 Recuerda: Los programas impredecibles y basados en el paso del tiempo generan tasas de respuesta muy constantes porque el sujeto no sabe cuándo se evaluará.\\n📖 Concepto clave: Intervalo variable",
    concept: "Intervalo variable"
  },
  {
    id: "ED_AS_01", topic: "social", context: "educativo",
    question: "Una profesora observa que al regañar a un alumno frente al grupo, los demás se vuelven más callados. ¿Qué concepto de Bandura explica el silencio de los demás?",
    correct: "Inhibición vicaria",
    distractors: ["Desinhibición", "Refuerzo Vicario Positivo", "Modelamiento"],
    explanation: "❌ El refuerzo vicario aumentaría la conducta observada. Aquí, la conducta (hablar) está disminuyendo en los observadores.\\n💡 Recuerda: Bandura planteó que observar a un modelo recibir consecuencias punitivas reduce la probabilidad de que el observador realice esa misma conducta.\\n📖 Concepto clave: Inhibición vicaria",
    concept: "Inhibición vicaria"
  },
  {
    id: "ED_AS_02", topic: "social", context: "educativo",
    question: "Un estudiante de primer semestre imita la forma de tomar apuntes del mejor alumno del curso sin que nadie se lo indique. ¿Qué proceso de Bandura explica esto?",
    correct: "Modelamiento",
    distractors: ["Condicionamiento Instrumental", "Aprendizaje Latente", "Ensayo y Error"],
    explanation: "❌ En el ensayo y error o el condicionamiento instrumental se requiere que el propio estudiante sufra las consecuencias directamente para aprender.\\n💡 Recuerda: La teoría social cognitiva sostiene que podemos adquirir nuevas habilidades conductuales simplemente observando a un individuo competente realizarlas.\\n📖 Concepto clave: Modelamiento",
    concept: "Modelamiento"
  },
  {
    id: "ED_AS_03", topic: "social", context: "educativo",
    question: "Los estudiantes de primer año ven que los de último año reciben becas por publicar artículos, y esto los motiva a iniciar proyectos propios. Se ejemplifica:",
    correct: "Refuerzo Vicario",
    distractors: ["Facilitación social", "Atención selectiva", "Condicionamiento de segundo orden"],
    explanation: "❌ La facilitación social es cuando rindes mejor simplemente porque otros te están mirando. Aquí la clave es observar los premios de otros.\\n💡 Recuerda: Ver a un modelo recibir resultados positivos aumenta la expectativa del observador de obtener las mismas recompensas si imita la acción.\\n📖 Concepto clave: Refuerzo vicario",
    concept: "Refuerzo vicario"
  },
  {
    id: "ED_AS_04", topic: "social", context: "educativo",
    question: "Un estudiante que reprobó cree que puede mejorar su método de estudio y aprobar la próxima vez. Bandura llamaría a esta creencia:",
    correct: "Autoeficacia",
    distractors: ["Locus de control interno", "Motivación extrínseca", "Refuerzo intermitente"],
    explanation: "❌ Locus de control y motivación son conceptos relacionados, pero no capturan la creencia específica de Bandura sobre la capacidad de dominar una tarea.\\n💡 Recuerda: Bandura define esto como los juicios de cada individuo sobre sus capacidades, con base en sus propios dominios en la ejecución de acciones requiridas.\\n📖 Concepto clave: Autoeficacia",
    concept: "Autoeficacia"
  },

  // ════════════════════════════════════════════════════════
  // CONTEXTO ORGANIZACIONAL 🏢 (Las 12 originales)
  // ════════════════════════════════════════════════════════
  {
    id: "OR_CC_01", topic: "clasico", context: "organizacional",
    question: "Un empleado sufrió un accidente en la planta de producción. Ahora el sonido de la maquinaria (antes neutral) le genera taquicardia. El sonido es un:",
    correct: "Estímulo Condicionado (EC)",
    distractors: ["Estímulo Incondicionado", "Respuesta Incondicionada", "Reforzador Secundario"],
    explanation: "❌ Un reforzador secundario es operante (premia una conducta). Aquí hablamos del surgimiento de un reflejo emocional automático.\\n💡 Recuerda: Pavlov demostraba cómo un sonido neutral llega a disparar respuestas fisiológicas autónomas si precede a eventos biológicos graves.\\n📖 Concepto clave: Adquisición del EC",
    concept: "Adquisición del EC"
  },
  {
    id: "OR_CC_02", topic: "clasico", context: "organizacional",
    question: "Una empleada asociaba las juntas con regaños de su jefe. Cuando cambió de empresa y las juntas eran positivas, dejó de sentir ansiedad. Se produjo:",
    correct: "Extinción",
    distractors: ["Generalización", "Discriminación", "Inhibición latente"],
    explanation: "❌ La inhibición latente significa que te cuesta aprender a tener miedo si antes ya estabas acostumbrado al EC sin peligro. Ella ya tenía el miedo y luego lo perdió.\\n💡 Recuerda: Quebrantar repetidamente la contigüidad entre el Estímulo Condicionado y el Incondicionado degrada la intensidad de la respuesta aprendida.\\n📖 Concepto clave: Extinción clásica",
    concept: "Extinción clásica"
  },
  {
    id: "OR_CC_03", topic: "clasico", context: "organizacional",
    question: "Un trabajador que fue despedido telefónicamente, siente ansiedad cada vez que suena su celular en horario laboral, pero no en el fin de semana. Esto demuestra:",
    correct: "Discriminación",
    distractors: ["Generalización", "Adquisición", "Recuperación espontánea"],
    explanation: "❌ Si fuera generalización, sentiría miedo cada vez que el celular suena sin importar si es lunes a mediodía o un domingo por la tarde.\\n💡 Recuerda: Este es el proceso complementario a la generalización. El sujeto restringe su respuesta refleja a un contexto específico que predice el EI.\\n📖 Concepto clave: Discriminación de estímulos",
    concept: "Discriminación de estímulos"
  },
  {
    id: "OR_CC_04", topic: "clasico", context: "organizacional",
    question: "Un empleado fue humillado en una presentación. Ahora ver el logo de PowerPoint le genera nervios. Si el de Keynote también le da ansiedad, ¿qué ocurre?",
    correct: "Generalización del estímulo",
    distractors: ["Discriminación", "Sensibilización", "Contracondicionamiento"],
    explanation: "❌ Sensibilización es un aumento general inespecífico en reactividad, no la transferencia del condicionamiento a una familia de estímulos parecidos.\\n💡 Recuerda: Ante estímulos que comparten características formales o perceptuales, la curva de gradiente pavloviana proyecta respuestas automáticas similares.\\n📖 Concepto clave: Generalización",
    concept: "Generalización"
  },
  {
    id: "OR_OP_01", topic: "operante", context: "organizacional",
    question: "Un vendedor recibe comisión por cada venta cerrada, sin importar cuánto tiempo tardó. ¿Qué programa de reforzamiento describe este esquema?",
    correct: "Razón Fija",
    distractors: ["Intervalo Fijo", "Razón Variable", "Intervalo Variable"],
    explanation: "❌ Como no importa cuánto tiempo tarda, los programas de intervalo (tiempo) quedan totalmente descartados.\\n💡 Recuerda: Skinner define como 'Razón' las contingencias donde el único requisito conductual es realizar el acto (venta) un número exacto y estático de veces.\\n📖 Concepto clave: Razón fija",
    concept: "Razón fija"
  },
  {
    id: "OR_OP_02", topic: "operante", context: "organizacional",
    question: "El gerente dejó de dar bonos a su equipo de ventas y la productividad cayó drásticamente. Se produjo:",
    correct: "Extinción operante",
    distractors: ["Castigo Negativo", "Habituación", "Reforzamiento intermitente"],
    explanation: "❌ El castigo involucra aplicar una contingencia aversiva. Cuando una consecuencia previamente existente simplemente deja de aparecer y no pasa nada más, estamos rompiendo la contingencia operante.\\n💡 Recuerda: Suspender el reforzamiento que mantenía una conducta produce inexorablemente una caída en la tasa de esa conducta.\\n📖 Concepto clave: Extinción operante",
    concept: "Extinción operante"
  },
  {
    id: "OR_OP_03", topic: "operante", context: "organizacional",
    question: "Un jefe aplica multas por cada retraso en el reporte semanal y los reportes empiezan a llegar a tiempo (caen los retrasos). ¿Qué contingencia se aplicó?",
    correct: "Castigo Positivo",
    distractors: ["Reforzamiento Negativo", "Extinción", "Reforzamiento Positivo"],
    explanation: "❌ No es refuerzo de ningún tipo, porque la conducta de 'llegar tarde' está bajando. Y no es negativo porque la multa se AÑADE al sujeto, no se le quita.\\n💡 Recuerda: Agregar (+ positivo) un estímulo aversivo para reducir (castigo) una respuesta es la definición pura de esta operante.\\n📖 Concepto clave: Castigo positivo",
    concept: "Castigo positivo"
  },
  {
    id: "OR_OP_04", topic: "operante", context: "organizacional",
    question: "Los empleados cumplen normas de seguridad para evitar que les descuenten del salario. La conducta de seguir normas se fortalece por:",
    correct: "Reforzamiento Negativo de evitación",
    distractors: ["Reforzamiento Positivo", "Castigo Positivo", "Condicionamiento Clásico"],
    explanation: "❌ No es castigo porque la conducta (cumplir normas) está aumentando su probabilidad de suceder. No es positivo porque no hay regalo, se evita un mal.\\n💡 Recuerda: La evitación ocurre cuando una respuesta operante impide que se materialice un evento perjudicial inminente (escapar en el tiempo).\\n📖 Concepto clave: Reforzamiento negativo",
    concept: "Reforzamiento negativo"
  },
  {
    id: "OR_AS_01", topic: "social", context: "organizacional",
    question: "Una empleada nueva imita la forma de vestir de la ejecutiva más exitosa de la empresa sin que nadie se lo haya indicado. ¿Qué proceso de Bandura explica esto?",
    correct: "Modelamiento",
    distractors: ["Condicionamiento Instrumental", "Aprendizaje Latente", "Desensibilización"],
    explanation: "❌ Condicionamiento Instrumental y Aprendizaje Latente (Tolman) requieren explorar actívamente el entorno empíricamente. Aquí es un aprendizaje por visualización de otra persona.\\n💡 Recuerda: Identificar las características de estatus o poder de un modelo es uno de los predictores clave en la teoría cognitiva social para la atención y retención.\\n📖 Concepto clave: Modelamiento",
    concept: "Modelamiento"
  },
  {
    id: "OR_AS_02", topic: "social", context: "organizacional",
    question: "Un empleado junior ve que su jefe llega tarde sin recibir sanción y empieza a hacer lo mismo. Esto ocurre por:",
    correct: "Desinhibición por falta de consecuencias negativas",
    distractors: ["Refuerzo Vicario Positivo", "Generalización", "Aprendizaje por descubrimiento"],
    explanation: "❌ Refuerzo Vicario implicaría que el jefe recibe un PREMIO activo por llegar tarde. Aquí simplemente no recibe sanción, rompiendo una regla implícita.\\n💡 Recuerda: Bandura observó que ver a modelos transgredir normas con impunidad afloja las barreras inhibitorias internas de los observadores.\\n📖 Concepto clave: Desinhibición",
    concept: "Desinhibición"
  },
  {
    id: "OR_AS_03", topic: "social", context: "organizacional",
    question: "Una empresa publica el ranking del 'Empleado del Mes' esperando que los demás se esfuercen más. Apela a:",
    correct: "Incentivo Vicario",
    distractors: ["Condicionamiento de evitación", "Ley del ejercicio", "Razón Fija"],
    explanation: "❌ Razón Fija es un programa operante de Skinner. Si el empleado del mes se da por horas trabajadas, aún así la acción de mirar los premios ajenos es puramente social.\\n💡 Recuerda: Transmitir socialmente quién obtiene las recompensas produce una anticipación mental en los observadores para motivar sus propias metas.\\n📖 Concepto clave: Incentivo vicario",
    concept: "Incentivo vicario"
  },
  {
    id: "OR_AS_04", topic: "social", context: "organizacional",
    question: "Un gerente cree que puede liderar un proyecto complejo porque exitosamente lideró uno similar antes. Bandura llamaría a esta creencia:",
    correct: "Autoeficacia basada en experiencia directa",
    distractors: ["Motivación extrínseca", "Locus de control", "Reforzamiento diferencial"],
    explanation: "❌ El Locus de Control se enfoca en si el éxito depende de ti o de la suerte, pero no es la confianza metodológica en tus propias competencias exactas.\\n💡 Recuerda: La base más fuerte del sentido de autoeficacia para Bandura son los logros pasados (experiencias de dominio) innegables obtenidos en primera persona.\\n📖 Concepto clave: Autoeficacia",
    concept: "Autoeficacia"
  },

  // ════════════════════════════════════════════════════════
  // 10 NUEVAS PREGUNTAS ORGANIZACIONALES EXTRA 💼
  // ════════════════════════════════════════════════════════
  {
    id: "ORN_CC_01", topic: "clasico", context: "organizacional",
    question: "Un ejecutivo solía recibir noticias de despidos urgentes por correo electrónico corporativo. Tras años en ese clima tenso, ahora experimenta un pico de cortisol y estrés solo con oír la notificación en su computadora. El sonido de la notificación funciona como:",
    correct: "Adquisición del EC",
    distractors: ["Inhibición externa", "Formación de generalización operante", "Contracondicionamiento encubierto"],
    explanation: "❌ El contracondicionamiento es usar una terapia para curarlo. En este caso el ejecutivo acaba de contraer la ansiedad al vincular el sonido a una mala noticia repetitiva.\\n💡 Recuerda: Pavlov demostraba que un estímulo inicialmente neutro captura por transferencia las emociones biológicas si anuncia estímulos críticos.\\n📖 Concepto clave: Adquisición Pavloviana",
    concept: "Adquisición del EC"
  },
  {
    id: "ORN_CC_02", topic: "clasico", context: "organizacional",
    question: "A fin de mejorar el pánico escénico (EC) arraigado en una analista, RRHH le enseña rutinas de respiración profunda cada vez que piensa en reuniones directivas, emparejando ahora la relajación plena con el factor ansiógeno. La empresa utiliza la técnica de:",
    correct: "Contracondicionamiento",
    distractors: ["Sensibilización de la respuesta", "Desinhibición modelada", "Condicionamiento Operante"],
    explanation: "❌ Si fuera condicionamiento operante, RRHH le pagaría bonos si asiste, pero aquí el objetivo es transformar una emoción fisiológica de pánico con otra de relajación antagónica.\\n💡 Recuerda: Desvincular un EC de su vieja respuesta para reconectarlo con una nueva respuesta incompatible es el núcleo del contracondicionamiento clásico.\\n📖 Concepto clave: Contracondicionamiento",
    concept: "Contracondicionamiento"
  },
  {
    id: "ORN_CC_03", topic: "clasico", context: "organizacional",
    question: "Un ex-militar incorporado a una empresa constructora reacciona defensivamente con descargas de adrenalina a los estruendos metálicos repentinos pesados, ya que se le asemejan acústicamente a sonidos de combate. Está sufriendo un efecto provocado por el mecanismo de:",
    correct: "Generalización",
    distractors: ["Discriminación absoluta", "Aprendizaje vicario agudo", "Modificación conductual"],
    explanation: "❌ No está discriminando, porque si lo hiciera sabría separar perfectamente 'este sonido es metal en la construcción (seguro)' versus 'este sonido es combate (amenaza)'.\\n💡 Recuerda: Pavlov evidenció que estímulos acústicamente paralelos al EC original tienen el poder de desencadenar la misma curva de RC sintomática.\\n📖 Concepto clave: Generalización",
    concept: "Generalización"
  },
  {
    id: "ORN_OP_01", topic: "operante", context: "organizacional",
    question: "Un gerente implementa 'viernes flex' (salir más temprano) para todo el equipo, pero solo se activa sistemáticamente al término de cada semana exacta si cumplieron su meta. Independiente del número de transacciones hechas, el premio se otorga semanalmente. ¿Qué programa de contingencia es este?",
    correct: "Intervalo Fijo",
    distractors: ["Intervalo Variable", "Razón Fija", "Refuerzo Continuo"],
    explanation: "❌ Refuerzo continuo significa darles flex después de absolutamente cada movimiento o venta. Aquí hay un pase de tiempo predecible de 7 días exactos.\\n💡 Recuerda: Skinner estableció que cuando el reforzamiento ocurre en unidades de ciclo temporal regulares y constantes es un programa dependiente del reloj.\\n📖 Concepto clave: Intervalo Fijo",
    concept: "Intervalo Fijo"
  },
  {
    id: "ORN_OP_02", topic: "operante", context: "organizacional",
    question: "Históricamente una startup corporativa celebraba ruidosamente con pizzas los prototipos innovadores, reforzando esa área. Al crecer, los líderes cesaron las celebraciones por falta de tiempo. Eventualmente, las iniciativas de innovación decrecieron hasta eliminarse. El proceso ilustrado es:",
    correct: "Extinción operante",
    distractors: ["Intervalo Variable", "Habituación reactiva", "Castigo Positivo"],
    explanation: "❌ Castigo Positivo sería darles trabajo extra o gritarles por crear prototipos. Simplemente dejaron de reforzar las aportaciones positivas.\\n💡 Recuerda: Consistir en la caída de probabilidad de las tasas de respuesta previamente condicionadas, secundaria a la cese de los reforzadores que las mantenían.\\n📖 Concepto clave: Extinción operante",
    concept: "Extinción operante"
  },
  {
    id: "ORN_OP_03", topic: "operante", context: "organizacional",
    question: "El área de seguridad industrial deduce 2 días de salario cada vez que sorprende a un técnico sin arnés en alturas. Con este esquema, un equipo completo redujo sus faltas drásticamente a cero. Deducir fondos actúa en este contexto como mecanismo de:",
    correct: "Castigo Negativo",
    distractors: ["Castigo Positivo", "Refuerzo Negativo empírico", "Omisión Latente"],
    explanation: "❌ No es refuerzo negativo porque la conducta indeseada (no usar arnés) está bajando, no subiendo. Y como el dinero se 'quita', es una omisión aversiva.\\n💡 Recuerda: Restar beneficios placenteros (- negativo) a los individuos con el fin pragmático de eliminar comportamientos indeseables es castigo negativo.\\n📖 Concepto clave: Castigo Negativo",
    concept: "Castigo Negativo"
  },
  {
    id: "ORN_AS_01", topic: "social", context: "organizacional",
    question: "Los empleados practicantes nuevos observan detenidamente que sus pares de mayor jerarquía ignoran olímpicamente el canal formal de peticiones a RRHH sin tener ninguna represalia por ello. Como resultado normativo, los nuevos tampoco utilizan los canales debidos. Se patentiza un mecanismo de:",
    correct: "Desinhibición vicaria",
    distractors: ["Modificación incondicionada", "Castigo encubierto", "Adquisición Clásica"],
    explanation: "❌ No reciben castigo encubierto, de hecho ven una falta de sanción en los mayores. Al ver la ausencia de límites, las barreras psicológicas de los infractores incipientes decaen.\\n💡 Recuerda: Bandura identificaba la desinhibición social como el proceso contigüo donde la visualización de inmunidad en figuras referenciales legitima comportamientos desviados o normativamente laxos.\\n📖 Concepto clave: Desinhibición vicaria",
    concept: "Desinhibición vicaria"
  },
  {
    id: "ORN_AS_02", topic: "social", context: "organizacional",
    question: "Como política motivacional un Banco invierte una plaza pública del edificio para listar fotografías del Top Vendedor por Sucursal premiándolo con viajes semestrales. Las estadísticas exhiben aumentos globales colaterales de eficacia en los demás cajeros. Opera primariamente:",
    correct: "Refuerzo vicario",
    distractors: ["Modelamiento inactivo", "Autoeficacia disociada", "Condicionamiento programático de Razón Fija"],
    explanation: "❌ Razón Fija es de Skinner, pero aquí la motivación surge antes de la propia experiencia individual (Skinner); surge de la observación social estricta de las utilidades de un compañero.\\n💡 Recuerda: En la Teoría Sociocognitiva la promesa simbólica adquirida a través de percibir las jugosas recompensas de terceros cataliza poderosamente la acción voluntaria individual.\\n📖 Concepto clave: Refuerzo vicario",
    concept: "Refuerzo vicario"
  },
  {
    id: "ORN_AS_03", topic: "social", context: "organizacional",
    question: "En una sala de capacitación vacía, un individuo no utiliza espontáneamente las cafeteras elegantes por no entender la interfaz. Sin embargo, en un breack general, un colega veterano se levanta, muestra el orden de botonado táctil de forma casual. Instantáneamente tres miembros configuran sus propios cafés imitando los gestos. Existe:",
    correct: "Facilitación de respuesta",
    distractors: ["Inhibición social punitiva", "Extinción indirecta", "Razón Variable"],
    explanation: "❌ Razón Variable no tiene nada que ver; no hay una recompensa azarosa. Hay una conducta de imitación instantánea al tener clarificada una técnica incierta gracias a un par.​\\n💡 Recuerda: Bandura denotaba como 'facilitación de la respuesta' aquellas influencias modeladoras en las que ver una estrategia exitosa simple reduce trabas cognitivas en observadores paralizados previamente por incertidumbre.\\n📖 Concepto clave: Facilitación de respuesta",
    concept: "Facilitación de respuesta"
  },
  {
    id: "ORN_AS_04", topic: "social", context: "organizacional",
    question: "Una especialista contable rechaza tomar un cargo gerencial de un ERP nuevo hasta que es obligada a cursar un bootcamp con un grupo donde los demás colegas contables demuestran total maestría ante su vista y la animan diciéndole verbalmente 'si nosotros pudimos sin ser programadores, usted también'. Inmediatamente, la funcionaria asume el cargo con vigorosa fe. Esta creencia infundada en el bootcamp se denomina:",
    correct: "Autoeficacia",
    distractors: ["Extinción pasiva del Yo", "Premack Principle", "Reforzamiento estocástico autónomo"],
    explanation: "❌ Principio de Premack es que una conducta de alta probabilidad refuerza una de baja. Es condicionamiento puro. En contraste, las palabras persuasivas de los iguales de este caso actúan en las puras creencias de dominio cognitivo.\\n💡 Recuerda: La persuasión verbal por parte de redes de pares constituye y modela directamente lo que Bandura acuñó como convicciones en el logro competente de tareas específicas.\\n📖 Concepto clave: Autoeficacia",
    concept: "Autoeficacia"
  },

  // ════════════════════════════════════════════════════════
  // CONTEXTO JURÍDICO ⚖️ 
  // ════════════════════════════════════════════════════════
  {
    id: "JU_CC_01", topic: "clasico", context: "juridico",
    question: "Un juez que siempre dicta sentencias severas genera en los acusados ansiedad intensa solo al verlo entrar al tribunal. El juez funciona como:",
    correct: "Estímulo Condicionado (EC)",
    distractors: ["Estímulo Incondicionado", "Respuesta Incondicionada", "Estímulo Discriminativo"],
    explanation: "❌ El estímulo incondicionado tendría que ser la sentencia severa en sí misma. El juez es simplemente una parte inofensiva del ambiente antes del aprendizaje.\\n💡 Recuerda: En los experimentos pavlovianos, los ruidos u objetos neutrales pueden tomar temporalmente el control conductual autonómico gracias al pareamiento causal con factores críticos.\\n📖 Concepto clave: Adquisición del EC",
    concept: "Adquisición del EC"
  },
  {
    id: "JU_CC_02", topic: "clasico", context: "juridico",
    question: "Un ex-recluso que fue agredido en el patio de la cárcel ahora siente ansiedad en cualquier patio abierto. ¿Qué fenómeno opera?",
    correct: "Generalización del estímulo",
    distractors: ["Discriminación", "Extinción", "Inhibición latente"],
    explanation: "❌ Si hubiera discriminación estricta, la persona sería lógica y entendería que 'este patio no es el peligroso'. Sentir miedo en _todos_ es lo opuesto.\\n💡 Recuerda: La irradiación pavloviana implica perder fronteras formales del Estímulo Condicionado para incluir entornos similares, aunque objetivamente inofensivos.\\n📖 Concepto clave: Generalización",
    concept: "Generalización"
  },
  {
    id: "JU_CC_03", topic: "clasico", context: "juridico",
    question: "Una víctima de robo asoció los callejones oscuros con peligro. Después de caminar por callejones iluminados y seguros durante meses, su miedo desapareció. Se produjo:",
    correct: "Extinción",
    distractors: ["Habituación", "Contracondicionamiento", "Sensibilización"],
    explanation: "❌ Contrariamente a la habituación, el miedo original se gestó con un robo. Eliminarlo requiere una ruptura en la historia del emparejamiento con ataques.\\n💡 Recuerda: Romper sistemáticamente el puente predictivo entre el EC (callejón) sin entregar jamás el EI (robo) degrada progresiva de fuerza hasta disipar la RC emotiva.\\n📖 Concepto clave: Extinción clásica",
    concept: "Extinción clásica"
  },
  {
    id: "JU_CC_04", topic: "clasico", context: "juridico",
    question: "Un testigo siente pánico al entrar a la sala 3 del juzgado donde fue intimidado, pero no al entrar a la sala 5. Esto demuestra:",
    correct: "Discriminación",
    distractors: ["Generalización", "Adquisición", "Recuperación espontánea"],
    explanation: "❌ Es en sentido contrario a la generalización. Aquí, la persona circunscribe estrictamente su afectación al origen topográfico nuclear de la amenaza.\\n💡 Recuerda: En paradigmas pavlovianos puros, las respuestas autonómicas logran estrechar la franja de reacción hacia una diferencia focal o matiz entre elementos parecidos.\\n📖 Concepto clave: Discriminación de estímulos",
    concept: "Discriminación de estímulos"
  },
  {
    id: "JU_OP_01", topic: "operante", context: "juridico",
    question: "Un recluso que completa programas de rehabilitación recibe reducción de condena. La conducta de participar en programas aumenta. ¿Qué contingencia opera?",
    correct: "Reforzamiento Positivo",
    distractors: ["Reforzamiento Negativo", "Castigo Positivo", "Extinción"],
    explanation: "❌ La reducción legal opera como una ganancia legal para él. No está huyendo del peligro inminente de un cuarto oscuro, sino actuando para obtener un bien aditivo al expediente favorable.\\n💡 Recuerda: Todo tipo de concesiones que añaden un estatus o entregable beneficioso posterior a una conducta meta y resultan en su mantenimiento estable forman refuerzo positivo en la visión Skinneriana.\\n📖 Concepto clave: Reforzamiento positivo",
    concept: "Reforzamiento positivo"
  },
  {
    id: "JU_OP_02", topic: "operante", context: "juridico",
    question: "Un conductor deja de exceder el límite de velocidad porque le han puesto multas frecuentes. La reducción de la conducta se explica por:",
    correct: "Castigo Positivo",
    distractors: ["Reforzamiento Negativo", "Extinción", "Castigo Negativo"],
    explanation: "❌ El conductor no carece de dinero, el Estado activamente transfiere una multa, que es la adición formal de un elemento coercitivo perjudicial.\\n💡 Recuerda: Según el prisma operante la suma formal de estímulos perturbadores para hundir o socavar la tendencia a reaccionar es intrínsecamente un castigo, siendo 'positivo' la inserción del agravio.\\n📖 Concepto clave: Castigo positivo",
    concept: "Castigo positivo"
  },
  {
    id: "JU_OP_03", topic: "operante", context: "juridico",
    question: "Un abogado prepara minuciosamente sus casos porque los jueces asignan audiencias en fechas impredecibles. ¿Qué programa de reforzamiento describe esto?",
    correct: "Intervalo Variable",
    distractors: ["Intervalo Fijo", "Razón Fija", "Razón Variable"],
    explanation: "❌ Razón Fija demanda cantidad de respuestas. El abogado puede preparar en un día o diez meses, su premio se dictará según las notificaciones caprichosas del calendario del órgano legal.\\n💡 Recuerda: Administrar consecuencias mediante pasos de tiempo cambiantes e inescrutables fomenta los patrones de actividad más lineales dentro los descubrimientos de Skinner.\\n📖 Concepto clave: Intervalo variable",
    concept: "Intervalo variable"
  },
  {
    id: "JU_OP_04", topic: "operante", context: "juridico",
    question: "A un recluso con buen comportamiento le retiran las restricciones de visita. Si su buen comportamiento aumenta, se aplica:",
    correct: "Reforzamiento Negativo",
    distractors: ["Reforzamiento Positivo", "Castigo Negativo", "Extinción"],
    explanation: "❌ Las visitas no son regaladas. El ambiente estricto tenía prisiones y cancelaciones. Succionar el dolor legal del paciente conforma su ganancia instrumental.\\n💡 Recuerda: Para las corrientes analíticas, cuando la remoción formal de barreras, opresiones o dolores exacerba las tasas de producción del individuo lo tipificamos contingencia negativa con efecto reforzante.\\n📖 Concepto clave: Reforzamiento negativo",
    concept: "Reforzamiento negativo"
  },
  {
    id: "JU_AS_01", topic: "social", context: "juridico",
    question: "Un adolescente observa que su hermano mayor roba en tiendas sin ser atrapado y empieza a hacer lo mismo. ¿Qué concepto de Bandura explica esto?",
    correct: "Desinhibición por ausencia de castigo vicario",
    distractors: ["Refuerzo Vicario Positivo", "Modelamiento abstracto", "Facilitación social"],
    explanation: "❌ Refuerzo vicario no puede ser central, ya que aquí la esencia conceptual primaria es presenciar la fractura ilesa del contrato social ante autoridades laxas.\\n💡 Recuerda: Relajar las fronteras prohibitivas del aprendizaje moral al certificar las ineficiencias coactivas punitivas ajenas instiga emulación.\\n📖 Concepto clave: Desinhibición",
    concept: "Desinhibición"
  },
  {
    id: "JU_AS_02", topic: "social", context: "juridico",
    question: "Un programa de reinserción social invita a ex-reclusos exitosos a dar charlas motivacionales a los internos actuales. La técnica se basa en:",
    correct: "Modelamiento",
    distractors: ["Condicionamiento Operante", "Desensibilización", "Indefensión Aprendida"],
    explanation: "❌ La indefensión sería dejarlos creer que la vida está perdida para siempre sin su mediación. En realidad les proveen espejos de alto calado biográfico.\\n💡 Recuerda: Exponer un núcleo con el relato vivo de un vector modelador empático y congruente promueve retención identitaria dentro cognitivosocial.\\n📖 Concepto clave: Modelamiento",
    concept: "Modelamiento"
  },
  {
    id: "JU_AS_03", topic: "social", context: "juridico",
    question: "Los reclusos ven que quienes participan en talleres reciben beneficios (visitas extra), y más reclusos se inscriben. Se ejemplifica:",
    correct: "Refuerzo Vicario",
    distractors: ["Facilitación de respuesta", "Atención selectiva", "Condicionamiento de escape"],
    explanation: "❌ El proceso escapista demanda huir para sortear tormentos directos (ej. apagar alarmas), pero aquí hay una motivación vicaria guiada vía terceros privilegiados.\\n💡 Recuerda: La observación remota pero cristalina del beneficio distribuido a acólitos promotores inocula incentivos motivacionales paralelos.\\n📖 Concepto clave: Refuerzo vicario",
    concept: "Refuerzo vicario"
  },
  {
    id: "JU_AS_04", topic: "social", context: "juridico",
    question: "Un ex-recluso cree que puede reintegrarse a la sociedad porque completó su programa de rehabilitación exitosamente. Bandura llamaría a esto:",
    correct: "Autoeficacia",
    distractors: ["Locus de control externo", "Motivación intrínseca", "Reforzamiento diferencial"],
    explanation: "❌ El locus control externo dice que Dios obró en él; esto es, por contra, apalancar la robustez actitudinal en su propia mano de obra ejecutiva.\\n💡 Recuerda: Extraer conclusiones empoderantes relativas al manejo soberano de los engranajes de supervivencia desde logros previos se llama dominio de meta.\\n📖 Concepto clave: Autoeficacia",
    concept: "Autoeficacia"
  },

  // ════════════════════════════════════════════════════════
  // CONTEXTO SOCIAL/COMUNITARIO 🏘️ 
  // ════════════════════════════════════════════════════════
  {
    id: "SO_CC_01", topic: "clasico", context: "social",
    question: "Los vecinos de un barrio escuchan disparos cada noche. Ahora, cualquier ruido fuerte les genera sobresalto. El ruido fuerte genérico funciona como:",
    correct: "Estímulo Condicionado (EC)",
    distractors: ["Estímulo Incondicionado", "Respuesta Condicionada", "Reforzador Primario"],
    explanation: "❌ Un ruido aleatorio inespecífico era tolerado históricamente (EN); un disparo era la ruda biología de guerra (EI). Transfigurar aquel perfil inofensivo en temido ratifica su naturaleza adquirida condicional.\\n💡 Recuerda: Transfijar virtudes fisiológicas reaccionarias en fenómenos del ambiente inanimado es la primera gran herencia reflexológica pavloviana.\\n📖 Concepto clave: Generalización desde el EC",
    concept: "Adquisición del EC"
  },
  {
    id: "SO_CC_02", topic: "clasico", context: "social",
    question: "Una familia desplazada por violencia asociaba las sirenas con ataques armados. Después de vivir en una ciudad segura durante un año repetidamente con sirenas inofensivas, el pánico de las sirenas cesó. ¿Qué ocurrió?",
    correct: "Extinción",
    distractors: ["Habituación", "Contracondicionamiento", "Inhibición recíproca"],
    explanation: "❌ Recibiríamos contracondicionamiento puro sólo si una municipalidad contratara sicólogos que tocaran arpas antes de que cada sirena suene de modo inducido.\\n💡 Recuerda: Desaparear por prolongados tractos pasivos los heraldos ambientales (EC) respecto al suceso lesivo del terror inyectado neutraliza su impacto.\\n📖 Concepto clave: Extinción clásica",
    concept: "Extinción clásica"
  },
  {
    id: "SO_CC_03", topic: "clasico", context: "social",
    question: "Un niño de zona rural asocia los helicópteros con fumigaciones dañinas. Si ahora tiembla al escuchar un avión pequeño pero no un avión comercial alto, ¿qué fenómeno se presenta?",
    correct: "Discriminación",
    distractors: ["Generalización", "Extinción", "Recuperación espontánea"],
    explanation: "❌ Generalización significaría saltar inclusive ante palomas volando ruidosamente en parvadas anchas. Su radar evalúa una división de fronteras categóricas.\\n💡 Recuerda: El desarrollo analítico condicionado pavloviano ampara la capacidad adaptativa del sujeto en diferenciar amenazas creíbles de falsos negativos colindantes.\\n📖 Concepto clave: Discriminación",
    concept: "Discriminación"
  },
  {
    id: "SO_CC_04", topic: "clasico", context: "social",
    question: "En un programa comunitario de salud, la llegada del profesional de bata blanca se asoció repetidamente con vacunas dolorosas. Ahora los niños lloran al ver cualquier bata blanca. La bata es un:",
    correct: "Estímulo Condicionado (EC)",
    distractors: ["Estímulo Incondicionado", "Respuesta Incondicionada", "Estímulo Discriminativo"],
    explanation: "❌ Un EI tiene un anclaje anatómico (aguja lesionando el tejido vivo), mientras que un retazo textil (bata blanca) requiere asociaciones empíricas cronológicas.\\n💡 Recuerda: Al entrelazar contigüidad espacial o temporal entre la aguja (EI) y prendas triviales ajenas, el organismo humano recicla la alarma sináptica por pura correlación.\\n📖 Concepto clave: Adquisición del EC",
    concept: "Adquisición del EC"
  },
  {
    id: "SO_OP_01", topic: "operante", context: "social",
    question: "Una ONG premia a las familias que reciclan con canastas de mercado semanales. La conducta de reciclar incrementa. ¿Qué contingencia opera?",
    correct: "Reforzamiento Positivo",
    distractors: ["Reforzamiento Negativo", "Castigo Negativo", "Extinción"],
    explanation: "❌ Ciertamente no es penalizador si las familias se regocijan elevando sus tasas conductuales de entrega ecológica percapita y se adhiere alimento.\\n💡 Recuerda: Cuando las contingencias premian material o inmaterialmente a posteriori los enclaves productivos, afianzan los cimientos operantes en las mallas de la ciudad.\\n📖 Concepto clave: Reforzamiento positivo",
    concept: "Reforzamiento positivo"
  },
  {
    id: "SO_OP_02", topic: "operante", context: "social",
    question: "En un barrio, las familias que participan en limpieza comunitaria son exoneradas del pago de la cuota vecinal monetaria. La participación prolifera por:",
    correct: "Reforzamiento Negativo",
    distractors: ["Reforzamiento Positivo", "Castigo Positivo", "Condicionamiento Clásico"],
    explanation: "❌ Otorgar cuota vecinal era el castigo social general. Rescatarlas eliminando un impuesto engorroso retira males para auspiciar alambiques virtuosos de convivencia.\\n💡 Recuerda: Supeditando la anulación de requerimientos coactivos desagradables colindantes al despliegue masivo de operantes sociales se sella el bucle de evitación skinneriano.\\n📖 Concepto clave: Reforzamiento negativo",
    concept: "Reforzamiento negativo"
  },
  {
    id: "SO_OP_03", topic: "operante", context: "social",
    question: "Un programa social daba ayudas alimentarias a familias que asistían a talleres obligatorios. Cuando colapsó financieramente el suministro social y se suspendieron las despensas, la concurrencia demográfica declinó a ceros. Se produjo:",
    correct: "Extinción operante",
    distractors: ["Castigo Negativo", "Habituación", "Generalización"],
    explanation: "❌ Habituación requeriría de que aunque les den comidas gratis su organismo neuroquímico se aburriera. Acá se rompió la caja conductual operante monetaria.\\n💡 Recuerda: Cesar diametralmente el riego retroactivo de consecuencias promotoras a lo largo del tiempo apaga irrevocablemente las arquitecturas colectivas cívicas.\\n📖 Concepto clave: Extinción operante",
    concept: "Extinción operante"
  },
  {
    id: "SO_OP_04", topic: "operante", context: "social",
    question: "Un municipio manda inspectores y aplica fotomultas por arrojar basura en los andenes peatonales y el vandalismo cae. ¿Qué contingencia se aplicó?",
    correct: "Castigo Positivo",
    distractors: ["Castigo Negativo", "Reforzamiento Negativo", "Extinción"],
    explanation: "❌ No retiraron concesiones (como cancelar bonos navideños), añadieron persecutoriamente papeles administrativos formales por correo al bolsillo del ciudadano infractor.\\n💡 Recuerda: Consolidada con un vector que imprime un plus (+) material correctivo sobre un target conductual nocivo se encumbra como el arquetipo punitivo.\\n📖 Concepto clave: Castigo positivo",
    concept: "Castigo positivo"
  },
  {
    id: "SO_AS_01", topic: "social", context: "social",
    question: "Grupos juveniles barriales empiezan a consumir psicotrópicos marginales en plazas por identificar que ciertos jefes zonales lo consumen sin rastros de detención policial. ¿Qué concepto de Bandura explica esto mejor?",
    correct: "Desinhibición por ausencia de consecuencias negativas",
    distractors: ["Refuerzo Vicario", "Facilitación de respuesta", "Condicionamiento directo"],
    explanation: "❌ Si los persiguiera el Estado directamente y los apresara a ellos, sería directo. Ver la patente de corso policíaca en figuras totémicas es cognitivo e intersubjetivo.\\n💡 Recuerda: El desmoronarse ineludible de los diques morales civiles al ver el incumplimiento incólume de normas transfiere patentes encubiertas de agresión barrial.\\n📖 Concepto clave: Desinhibición",
    concept: "Desinhibición"
  },
  {
    id: "SO_AS_02", topic: "social", context: "social",
    question: "Bajo un plan agrario, se seleccionan granjeros prototipo que despliegan técnicas modernas hidropónicas y los campesinos de fincas vecinas, al ver el procedimiento próspero con sus propios ojos, mutan al nuevo sistema de labranza. Se basa en:",
    correct: "Modelamiento",
    distractors: ["Ensayo y Error", "Condicionamiento Operante", "Aprendizaje Latente"],
    explanation: "❌ Si fuera ensayo y error puro tomaría cuarenta años de ruinas descubrir la hidroponía empíricamente por pura perseverancia física desgastante.\\n💡 Recuerda: La extracción de paquetes de destrezas a través del escaneo meticuloso de ejecutores sociales viables conforma el pilar nuclear de succión de conocimiento de Bandura.\\n📖 Concepto clave: Modelamiento",
    concept: "Modelamiento"
  },
  {
    id: "SO_AS_03", topic: "social", context: "social",
    question: "Programas comunicacionales transmiten monólogos visuales de sobrevivientes estragados de las metanfetaminas en las escuelas para ahondar terror higiénico en los niños y repulsar sus atisbos consumistas. Esto estipula apelar directamente a:",
    correct: "Castigo Vicario",
    distractors: ["Refuerzo Vicario", "Inhibición latente", "Extinción"],
    explanation: "❌ En este abordaje los agentes ministeriales no refuerzan indirectamente las virtudes. Cincelan un mapa aversivo trágico al atestiguar condenas ajenas.\\n💡 Recuerda: Recapitular vicariamente el espectro desintegrador biológico originado en los descalabros modélicos amartilla los cerrojos atencionales del menor contra la réplica.\\n📖 Concepto clave: Castigo vicario",
    concept: "Castigo vicario"
  },
  {
    id: "SO_AS_04", topic: "social", context: "social",
    question: "Una madre rural cabeza de hogar que prosperó al liquidar microfinanciamientos estatales se enuncia con alta fe de sacar sola delante y educar universitariamente a sus tres críos desde esa matriz de victorias encadenadas previas. Bandura llamaría a esto:",
    correct: "Autoeficacia",
    distractors: ["Motivación extrínseca", "Locus de control", "Facilitación social"],
    explanation: "❌ Podría calzar parcialmente en el locus de control, pero Bandura enmarca ese autoplanteamiento de maestría empírica invulnerable forjada retrospectivamente en otro rubro formal.\\n💡 Recuerda: Los cristales psíquicos de dominio frente al entorno y la creencia subjetiva de ser apto y eficiente encarnan la meta constructivista más honda en el desarrollo madurativo de la agencia individual.\\n📖 Concepto clave: Autoeficacia",
    concept: "Autoeficacia"
  }
];

// Opcional: exportar si es un ecosistema de módulos (dependiendo del entorno de front-end actual).
// En Vanilla, simplemente el array se une globalmente (window.QUESTIONS_BANK).