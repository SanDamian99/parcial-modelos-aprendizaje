// data/questions.js
// Banco de 48 preguntas: 16 por teoría × 4 contextos (educativo, organizacional, jurídico, social)
// Cada contexto tiene exactamente 12 preguntas (4 por teoría)
const QUESTIONS_BANK = [
  // ════════════════════════════════════════════════════════
  // CONTEXTO EDUCATIVO 🏫 (12 preguntas: 4 clásico, 4 operante, 4 social)
  // ════════════════════════════════════════════════════════
  {
    id: "ED_CC_01", topic: "clasico", context: "educativo",
    question: "Un estudiante tuvo una mala experiencia en un examen de álgebra. Ahora, solo entrar al salón de matemáticas le causa ansiedad, aunque hoy no hay examen. El salón funciona como:",
    correct: "Estímulo Condicionado (EC)",
    distractors: ["Estímulo Incondicionado", "Respuesta Incondicionada", "Estímulo Discriminativo"],
    explanation: "El salón de matemáticas era un estímulo neutro que, tras asociarse con el trauma del examen (EI), provocó ansiedad aprendida (RC). Ahora es un EC.",
    concept: "Adquisición del EC"
  },
  {
    id: "ED_CC_02", topic: "clasico", context: "educativo",
    question: "Un niño asocia el timbre de la escuela con regaños del profesor. Si ahora el timbre de su casa también le genera angustia, ¿qué fenómeno se presenta?",
    correct: "Generalización del estímulo",
    distractors: ["Discriminación", "Recuperación espontánea", "Extinción"],
    explanation: "La generalización ocurre cuando estímulos similares al EC (sonidos de timbre) evocan la misma RC (angustia). El niño no discrimina entre ambos timbres.",
    concept: "Generalización"
  },
  {
    id: "ED_CC_03", topic: "clasico", context: "educativo",
    question: "Un estudiante temía las exposiciones orales. Su profesor lo expuso gradualmente: primero hablar en parejas, luego en grupo pequeño, luego ante toda la clase. Después de un semestre, ya no siente ansiedad. ¿Qué técnica se utilizó?",
    correct: "Desensibilización Sistemática",
    distractors: ["Extinción abrupta", "Contracondicionamiento", "Castigo Positivo"],
    explanation: "La desensibilización sistemática de Wolpe presenta el EC (exposición oral) en aproximaciones graduales mientras se genera relajación, debilitando la RC de ansiedad.",
    concept: "Desensibilización sistemática"
  },
  {
    id: "ED_CC_04", topic: "clasico", context: "educativo",
    question: "Un estudiante asociaba el olor de libros viejos con estrés de exámenes. Tras un verano leyendo por placer sin exámenes, el olor deja de producir estrés. ¿Qué ocurrió?",
    correct: "Extinción",
    distractors: ["Habituación", "Sensibilización", "Inhibición latente"],
    explanation: "La extinción clásica ocurre cuando el EC (olor a libros) se presenta repetidamente sin el EI (examen estresante), debilitando la RC (estrés) hasta que desaparece.",
    concept: "Extinción clásica"
  },
  {
    id: "ED_OP_01", topic: "operante", context: "educativo",
    question: "Un estudiante deja de participar en clase porque el profesor nunca reacciona a sus respuestas, ni positiva ni negativamente. ¿Qué proceso operante explica la disminución?",
    correct: "Extinción por falta de reforzamiento",
    distractors: ["Castigo Negativo", "Habituación", "Generalización"],
    explanation: "La extinción operante ocurre cuando una conducta aprendida deja de recibir reforzamiento. Sin reacción del profesor (ni reconocimiento ni corrección), la conducta se debilita.",
    concept: "Extinción operante"
  },
  {
    id: "ED_OP_02", topic: "operante", context: "educativo",
    question: "Una profesora otorga un sticker por cada 5 tareas completas. Los estudiantes empezaron a entregar más tareas. ¿Qué programa de reforzamiento usa?",
    correct: "Razón Fija",
    distractors: ["Intervalo Fijo", "Razón Variable", "Intervalo Variable"],
    explanation: "En un programa de razón fija, el reforzador (sticker) se entrega después de un número fijo de respuestas (cada 5 tareas). Es predecible y genera pausas post-refuerzo.",
    concept: "Razón fija"
  },
  {
    id: "ED_OP_03", topic: "operante", context: "educativo",
    question: "Un profesor resta puntos por cada día de retraso en entregas y las entregas puntuales aumentan. ¿Qué contingencia se aplicó?",
    correct: "Castigo Negativo",
    distractors: ["Castigo Positivo", "Reforzamiento Positivo", "Extinción"],
    explanation: "El castigo negativo consiste en retirar algo agradable (puntos) tras la conducta indeseada (retraso). Esto reduce la conducta de entregar tarde.",
    concept: "Castigo negativo"
  },
  {
    id: "ED_OP_04", topic: "operante", context: "educativo",
    question: "Un maestro hace quizzes sorpresa sin previo aviso durante el semestre. Los estudiantes estudian de manera constante. ¿Qué programa de reforzamiento describe esto?",
    correct: "Intervalo Variable",
    distractors: ["Intervalo Fijo", "Razón Fija", "Razón Variable"],
    explanation: "El programa de intervalo variable refuerza (evalúa) después de periodos impredecibles. Esto genera tasas de estudio constantes y resistentes a la extinción.",
    concept: "Intervalo variable"
  },
  {
    id: "ED_AS_01", topic: "social", context: "educativo",
    question: "Una profesora observa que al regañar a un alumno frente al grupo, los demás se vuelven más callados. ¿Qué concepto de Bandura explica el silencio de los demás?",
    correct: "Inhibición vicaria",
    distractors: ["Desinhibición", "Refuerzo Vicario Positivo", "Modelamiento"],
    explanation: "La inhibición vicaria ocurre cuando los observadores ven que la conducta de otro (hablar) es castigada, lo que inhibe esa misma conducta en ellos mismos.",
    concept: "Inhibición vicaria"
  },
  {
    id: "ED_AS_02", topic: "social", context: "educativo",
    question: "Un estudiante de primer semestre imita la forma de tomar apuntes del mejor alumno del curso sin que nadie se lo indique. ¿Qué proceso de Bandura explica esto?",
    correct: "Modelamiento",
    distractors: ["Condicionamiento Instrumental", "Aprendizaje Latente", "Ensayo y Error"],
    explanation: "El modelamiento es el proceso central del aprendizaje social: adquirir conductas nuevas al observar a un modelo. El estudiante observa al mejor alumno e imita su técnica.",
    concept: "Modelamiento"
  },
  {
    id: "ED_AS_03", topic: "social", context: "educativo",
    question: "Los estudiantes de primer año ven que los de último año reciben becas por publicar artículos, y esto los motiva a iniciar proyectos propios. Se ejemplifica:",
    correct: "Refuerzo Vicario",
    distractors: ["Facilitación social", "Atención selectiva", "Condicionamiento de segundo orden"],
    explanation: "El refuerzo vicario motiva al observador cuando ve que otro (el modelo) recibe refuerzo por su conducta. Ver las becas ajenas motiva la misma conducta.",
    concept: "Refuerzo vicario"
  },
  {
    id: "ED_AS_04", topic: "social", context: "educativo",
    question: "Un estudiante que reprobó cree que puede mejorar su método de estudio y aprobar la próxima vez. Bandura llamaría a esta creencia:",
    correct: "Autoeficacia",
    distractors: ["Locus de control interno", "Motivación extrínseca", "Refuerzo intermitente"],
    explanation: "La autoeficacia es la creencia en la propia capacidad para ejecutar acciones necesarias. Creer que puede cambiar su método de estudio refleja alta autoeficacia.",
    concept: "Autoeficacia"
  },

  // ════════════════════════════════════════════════════════
  // CONTEXTO ORGANIZACIONAL 🏢 (12 preguntas: 4 clásico, 4 operante, 4 social)
  // ════════════════════════════════════════════════════════
  {
    id: "OR_CC_01", topic: "clasico", context: "organizacional",
    question: "Un empleado sufrió un accidente en la planta de producción. Ahora el sonido de la maquinaria (antes neutral) le genera taquicardia. El sonido es un:",
    correct: "Estímulo Condicionado (EC)",
    distractors: ["Estímulo Incondicionado", "Respuesta Incondicionada", "Reforzador Secundario"],
    explanation: "El sonido de la maquinaria era neutro hasta que se asoció con el accidente (EI). Ahora provoca taquicardia (RC) por sí solo: es un EC.",
    concept: "Adquisición del EC"
  },
  {
    id: "OR_CC_02", topic: "clasico", context: "organizacional",
    question: "Una empleada asociaba las juntas con regaños de su jefe. Cuando cambió de empresa y las juntas eran positivas, dejó de sentir ansiedad. Se produjo:",
    correct: "Extinción",
    distractors: ["Generalización", "Discriminación", "Inhibición latente"],
    explanation: "La extinción ocurre cuando el EC (juntas) se presenta sin el EI (regaños), debilitando la RC (ansiedad). El nuevo contexto positivo aceleró la extinción.",
    concept: "Extinción clásica"
  },
  {
    id: "OR_CC_03", topic: "clasico", context: "organizacional",
    question: "Un trabajador que fue despedido por llamada telefónica, ahora siente ansiedad cada vez que suena su celular en horario laboral, pero no cuando suena en fin de semana. Esto demuestra:",
    correct: "Discriminación",
    distractors: ["Generalización", "Adquisición", "Recuperación espontánea"],
    explanation: "La discriminación permite responder de forma diferente según el contexto. El trabajador discrimina entre el sonido en horario laboral (contexto amenazante) y fin de semana.",
    concept: "Discriminación de estímulos"
  },
  {
    id: "OR_CC_04", topic: "clasico", context: "organizacional",
    question: "Un empleado fue humillado en una presentación con diapositivas. Ahora, ver el logo de PowerPoint le genera nerviosismo. Si el logo de Keynote también le genera ansiedad, ¿qué ocurre?",
    correct: "Generalización del estímulo",
    distractors: ["Discriminación", "Sensibilización", "Contracondicionamiento"],
    explanation: "La generalización ocurre cuando estímulos perceptualmente similares (logos de software de presentación) evocan la misma RC. No discrimina entre programas.",
    concept: "Generalización"
  },
  {
    id: "OR_OP_01", topic: "operante", context: "organizacional",
    question: "Un vendedor recibe comisión por cada venta cerrada, sin importar cuánto tiempo tardó. ¿Qué programa de reforzamiento describe este esquema?",
    correct: "Razón Fija",
    distractors: ["Intervalo Fijo", "Razón Variable", "Intervalo Variable"],
    explanation: "Es un programa de razón fija: el reforzador (comisión) se entrega después de un número fijo de respuestas (cada venta cerrada).",
    concept: "Razón fija"
  },
  {
    id: "OR_OP_02", topic: "operante", context: "organizacional",
    question: "El gerente dejó de dar bonos a su equipo de ventas y la productividad cayó drásticamente. Se produjo:",
    correct: "Extinción operante",
    distractors: ["Castigo Negativo", "Habituación", "Reforzamiento intermitente"],
    explanation: "Si una conducta (vender) deja de recibir reforzamiento (bonos), se extingue progresivamente. La productividad caída es la consecuencia esperada de la extinción.",
    concept: "Extinción operante"
  },
  {
    id: "OR_OP_03", topic: "operante", context: "organizacional",
    question: "Un jefe aplica multas por cada retraso en el reporte semanal y los reportes empiezan a llegar a tiempo. ¿Qué contingencia se aplicó?",
    correct: "Castigo Positivo",
    distractors: ["Reforzamiento Negativo", "Extinción", "Reforzamiento Positivo"],
    explanation: "El castigo positivo añade un estímulo aversivo (multa) tras la conducta indeseada (retraso), lo que reduce esa conducta.",
    concept: "Castigo positivo"
  },
  {
    id: "OR_OP_04", topic: "operante", context: "organizacional",
    question: "Los empleados cumplen normas de seguridad para evitar que les descuenten del salario. La conducta de seguir normas se fortalece por:",
    correct: "Reforzamiento Negativo de evitación",
    distractors: ["Reforzamiento Positivo", "Castigo Positivo", "Condicionamiento Clásico"],
    explanation: "El reforzamiento negativo de evitación fortalece conductas que previenen la aparición de un estímulo aversivo (el descuento). Siguen las normas para evitar la sanción.",
    concept: "Reforzamiento negativo"
  },
  {
    id: "OR_AS_01", topic: "social", context: "organizacional",
    question: "Una empleada nueva imita la forma de vestir de la ejecutiva más exitosa de la empresa sin que nadie se lo haya indicado. ¿Qué proceso de Bandura explica esto?",
    correct: "Modelamiento",
    distractors: ["Condicionamiento Instrumental", "Aprendizaje Latente", "Desensibilización"],
    explanation: "El modelamiento es adquirir conductas al observar a un modelo prestigioso. La ejecutiva exitosa funciona como modelo y la nueva empleada imita su conducta.",
    concept: "Modelamiento"
  },
  {
    id: "OR_AS_02", topic: "social", context: "organizacional",
    question: "Un empleado junior ve que su jefe llega tarde sin recibir sanción y empieza a hacer lo mismo. Esto ocurre por:",
    correct: "Desinhibición por falta de consecuencias negativas",
    distractors: ["Refuerzo Vicario Positivo", "Generalización", "Aprendizaje por descubrimiento"],
    explanation: "La desinhibición ocurre cuando el observador ve que una conducta prohibida no recibe castigo, reduciendo su inhibición para realizarla.",
    concept: "Desinhibición"
  },
  {
    id: "OR_AS_03", topic: "social", context: "organizacional",
    question: "Una empresa publica el ranking del 'Empleado del Mes' esperando que los demás se esfuercen más. Apela a:",
    correct: "Incentivo Vicario",
    distractors: ["Condicionamiento de evitación", "Ley del ejercicio", "Razón Fija"],
    explanation: "El incentivo vicario motiva mostrando las recompensas que reciben otros. Al ver el reconocimiento ajeno, los observadores se motivan a imitar la conducta exitosa.",
    concept: "Incentivo vicario"
  },
  {
    id: "OR_AS_04", topic: "social", context: "organizacional",
    question: "Un gerente cree que puede liderar un proyecto complejo porque exitosamente lideró uno similar antes. Bandura llamaría a esta creencia:",
    correct: "Autoeficacia basada en experiencia directa",
    distractors: ["Motivación extrínseca", "Locus de control", "Reforzamiento diferencial"],
    explanation: "La autoeficacia se construye principalmente por experiencias de dominio previas. Haber liderado exitosamente antes fortalece la creencia en la propia capacidad.",
    concept: "Autoeficacia"
  },

  // ════════════════════════════════════════════════════════
  // CONTEXTO JURÍDICO ⚖️ (12 preguntas: 4 clásico, 4 operante, 4 social)
  // ════════════════════════════════════════════════════════
  {
    id: "JU_CC_01", topic: "clasico", context: "juridico",
    question: "Un juez que siempre dicta sentencias severas genera en los acusados ansiedad intensa solo al verlo entrar al tribunal. El juez funciona como:",
    correct: "Estímulo Condicionado (EC)",
    distractors: ["Estímulo Incondicionado", "Respuesta Incondicionada", "Estímulo Discriminativo"],
    explanation: "La presencia del juez (neutro inicialmente) se asoció con sentencias aversivas (EI). Ahora, su sola presencia provoca ansiedad (RC): es un EC.",
    concept: "Adquisición del EC"
  },
  {
    id: "JU_CC_02", topic: "clasico", context: "juridico",
    question: "Un ex-recluso que fue agredido en el patio de la cárcel ahora siente ansiedad en cualquier patio abierto. ¿Qué fenómeno opera?",
    correct: "Generalización del estímulo",
    distractors: ["Discriminación", "Extinción", "Inhibición latente"],
    explanation: "La generalización hace que estímulos similares al EC (cualquier patio abierto) evoquen la misma RC (ansiedad) que el patio específico donde ocurrió la agresión.",
    concept: "Generalización"
  },
  {
    id: "JU_CC_03", topic: "clasico", context: "juridico",
    question: "Una víctima de robo asoció los callejones oscuros con peligro. Después de caminar por callejones iluminados y seguros durante meses, su miedo desapareció. Se produjo:",
    correct: "Extinción",
    distractors: ["Habituación", "Contracondicionamiento", "Sensibilización"],
    explanation: "La extinción ocurre al presentar reiteradamente el EC (callejones) sin el EI (robo/agresión). La RC (miedo) se debilita hasta extinguirse.",
    concept: "Extinción clásica"
  },
  {
    id: "JU_CC_04", topic: "clasico", context: "juridico",
    question: "Un testigo siente pánico al entrar a la sala 3 del juzgado donde fue intimidado, pero no al entrar a la sala 5. Esto demuestra:",
    correct: "Discriminación",
    distractors: ["Generalización", "Adquisición", "Recuperación espontánea"],
    explanation: "La discriminación es la capacidad de responder de forma diferente a estímulos similares. El testigo distingue entre la sala específica del trauma y otras salas.",
    concept: "Discriminación de estímulos"
  },
  {
    id: "JU_OP_01", topic: "operante", context: "juridico",
    question: "Un recluso que completa programas de rehabilitación recibe reducción de condena. La conducta de participar en programas aumenta. ¿Qué contingencia opera?",
    correct: "Reforzamiento Positivo",
    distractors: ["Reforzamiento Negativo", "Castigo Positivo", "Extinción"],
    explanation: "El reforzamiento positivo añade algo agradable (reducción de condena) tras la conducta deseada (completar rehabilitación), aumentando su frecuencia.",
    concept: "Reforzamiento positivo"
  },
  {
    id: "JU_OP_02", topic: "operante", context: "juridico",
    question: "Un conductor deja de exceder el límite de velocidad porque le han puesto multas frecuentes. La reducción de la conducta se explica por:",
    correct: "Castigo Positivo",
    distractors: ["Reforzamiento Negativo", "Extinción", "Castigo Negativo"],
    explanation: "El castigo positivo añade un estímulo aversivo (multa) contingente a la conducta (exceso de velocidad), lo que reduce esa conducta.",
    concept: "Castigo positivo"
  },
  {
    id: "JU_OP_03", topic: "operante", context: "juridico",
    question: "Un abogado prepara minuciosamente sus casos porque los jueces asignan audiencias en fechas impredecibles. ¿Qué programa de reforzamiento describe esto?",
    correct: "Intervalo Variable",
    distractors: ["Intervalo Fijo", "Razón Fija", "Razón Variable"],
    explanation: "El programa de intervalo variable evalúa/refuerza después de tiempos impredecibles, generando preparación constante. Las audiencias impredecibles mantienen al abogado siempre preparado.",
    concept: "Intervalo variable"
  },
  {
    id: "JU_OP_04", topic: "operante", context: "juridico",
    question: "A un recluso con buen comportamiento le retiran las restricciones de visita. Si su buen comportamiento aumenta, se aplica:",
    correct: "Reforzamiento Negativo",
    distractors: ["Reforzamiento Positivo", "Castigo Negativo", "Extinción"],
    explanation: "El reforzamiento negativo retira un estímulo aversivo (restricciones) tras la conducta deseada (buen comportamiento), fortaleciendo esa conducta.",
    concept: "Reforzamiento negativo"
  },
  {
    id: "JU_AS_01", topic: "social", context: "juridico",
    question: "Un adolescente observa que su hermano mayor roba en tiendas sin ser atrapado y empieza a hacer lo mismo. ¿Qué concepto de Bandura explica esto?",
    correct: "Desinhibición por ausencia de castigo vicario",
    distractors: ["Refuerzo Vicario Positivo", "Modelamiento abstracto", "Facilitación social"],
    explanation: "La desinhibición se produce cuando el observador ve que una conducta prohibida no recibe castigo, reduciendo sus propias inhibiciones para realizarla.",
    concept: "Desinhibición"
  },
  {
    id: "JU_AS_02", topic: "social", context: "juridico",
    question: "Un programa de reinserción social invita a ex-reclusos exitosos a dar charlas motivacionales a los internos actuales. La técnica se basa en:",
    correct: "Modelamiento",
    distractors: ["Condicionamiento Operante", "Desensibilización", "Indefensión Aprendida"],
    explanation: "El modelamiento de Bandura usa modelos creíbles (ex-reclusos exitosos) para que los observadores (internos) adquieran conductas prosociales al ver un ejemplo real.",
    concept: "Modelamiento"
  },
  {
    id: "JU_AS_03", topic: "social", context: "juridico",
    question: "Los reclusos ven que quienes participan en talleres reciben beneficios (visitas extra), y más reclusos se inscriben. Se ejemplifica:",
    correct: "Refuerzo Vicario",
    distractors: ["Facilitación de respuesta", "Atención selectiva", "Condicionamiento de escape"],
    explanation: "El refuerzo vicario motiva cuando el observador ve que la conducta de otro es reforzada. Los reclusos observan beneficios ajenos y se motivan a participar.",
    concept: "Refuerzo vicario"
  },
  {
    id: "JU_AS_04", topic: "social", context: "juridico",
    question: "Un ex-recluso cree que puede reintegrarse a la sociedad porque completó su programa de rehabilitación exitosamente. Bandura llamaría a esto:",
    correct: "Autoeficacia",
    distractors: ["Locus de control externo", "Motivación intrínseca", "Reforzamiento diferencial"],
    explanation: "La autoeficacia es la creencia en la propia capacidad de ejecutar conductas para lograr resultados. Haber completado la rehabilitación fortalece esta creencia.",
    concept: "Autoeficacia"
  },

  // ════════════════════════════════════════════════════════
  // CONTEXTO SOCIAL/COMUNITARIO 🏘️ (12 preguntas: 4 clásico, 4 operante, 4 social)
  // ════════════════════════════════════════════════════════
  {
    id: "SO_CC_01", topic: "clasico", context: "social",
    question: "Los vecinos de un barrio escuchan disparos cada noche. Ahora, cualquier ruido fuerte les genera sobresalto. El ruido fuerte funciona como:",
    correct: "Estímulo Condicionado (EC)",
    distractors: ["Estímulo Incondicionado", "Respuesta Condicionada", "Reforzador Primario"],
    explanation: "Un ruido fuerte genérico (EN) se asoció con disparos (EI). Ahora cualquier ruido fuerte provoca sobresalto (RC) por generalización: es un EC.",
    concept: "Generalización desde el EC"
  },
  {
    id: "SO_CC_02", topic: "clasico", context: "social",
    question: "Una familia desplazada por violencia asociaba las sirenas con ataques armados. Después de vivir en una ciudad segura durante un año, las sirenas dejaron de causar pánico. ¿Qué ocurrió?",
    correct: "Extinción",
    distractors: ["Habituación", "Contracondicionamiento", "Inhibición recíproca"],
    explanation: "La extinción ocurre al presentar el EC (sirenas) sin el EI (ataques), debilitando la RC (pánico) progresivamente en el nuevo contexto seguro.",
    concept: "Extinción clásica"
  },
  {
    id: "SO_CC_03", topic: "clasico", context: "social",
    question: "Un niño de zona rural asocia los helicópteros con fumigaciones dañinas. Si ahora tiembla al escuchar un avión pequeño pero no un avión comercial, ¿qué fenómeno se presenta?",
    correct: "Discriminación",
    distractors: ["Generalización", "Extinción", "Recuperación espontánea"],
    explanation: "La discriminación permite responder de forma diferente a estímulos. El niño distingue entre aviones pequeños (similares al helicóptero) y comerciales (diferentes).",
    concept: "Discriminación"
  },
  {
    id: "SO_CC_04", topic: "clasico", context: "social",
    question: "En un programa comunitario de salud, la llegada del profesional de bata blanca se asoció con vacunas dolorosas. Ahora los niños lloran al ver cualquier bata blanca. La bata es un:",
    correct: "Estímulo Condicionado (EC)",
    distractors: ["Estímulo Incondicionado", "Respuesta Incondicionada", "Estímulo Discriminativo"],
    explanation: "La bata blanca (EN) se asoció con las vacunas dolorosas (EI). Ahora provoca llanto (RC) por sí sola: es un EC adquirido por contigüidad temporal.",
    concept: "Adquisición del EC"
  },
  {
    id: "SO_OP_01", topic: "operante", context: "social",
    question: "Una ONG premia a las familias que reciclan con canastas de mercado. La conducta de reciclar aumenta. ¿Qué contingencia opera?",
    correct: "Reforzamiento Positivo",
    distractors: ["Reforzamiento Negativo", "Castigo Negativo", "Extinción"],
    explanation: "El reforzamiento positivo añade algo agradable (canasta) tras la conducta deseada (reciclar), aumentando su frecuencia.",
    concept: "Reforzamiento positivo"
  },
  {
    id: "SO_OP_02", topic: "operante", context: "social",
    question: "En un barrio, las familias que participan en limpieza comunitaria son exoneradas del pago de la cuota vecinal. La participación aumenta por:",
    correct: "Reforzamiento Negativo",
    distractors: ["Reforzamiento Positivo", "Castigo Positivo", "Condicionamiento Clásico"],
    explanation: "El reforzamiento negativo retira un estímulo aversivo (cuota) tras la conducta deseada (participar en limpieza), fortaleciendo esa conducta.",
    concept: "Reforzamiento negativo"
  },
  {
    id: "SO_OP_03", topic: "operante", context: "social",
    question: "Un programa social daba ayudas alimentarias a familias que asistían a talleres. Cuando suspendieron las ayudas, la asistencia cayó. Se produjo:",
    correct: "Extinción operante",
    distractors: ["Castigo Negativo", "Habituación", "Generalización"],
    explanation: "La extinción operante ocurre cuando el reforzador (ayudas) deja de presentarse. La conducta (asistir a talleres) se debilita sin el reforzamiento.",
    concept: "Extinción operante"
  },
  {
    id: "SO_OP_04", topic: "operante", context: "social",
    question: "Un municipio aplica multas a quienes arrojan basura en la calle y la conducta disminuye. ¿Qué contingencia se aplicó?",
    correct: "Castigo Positivo",
    distractors: ["Castigo Negativo", "Reforzamiento Negativo", "Extinción"],
    explanation: "El castigo positivo añade un estímulo aversivo (multa) tras la conducta indeseada (arrojar basura), reduciendo su frecuencia.",
    concept: "Castigo positivo"
  },
  {
    id: "SO_AS_01", topic: "social", context: "social",
    question: "Los jóvenes de un barrio empiezan a consumir sustancias porque ven que los líderes del grupo lo hacen sin consecuencias visibles. ¿Qué concepto de Bandura explica esto?",
    correct: "Desinhibición por ausencia de consecuencias negativas",
    distractors: ["Refuerzo Vicario", "Facilitación de respuesta", "Condicionamiento directo"],
    explanation: "La desinhibición ocurre cuando el observador constata la ausencia de castigo para una conducta prohibida, reduciendo sus inhibiciones para realizarla.",
    concept: "Desinhibición"
  },
  {
    id: "SO_AS_02", topic: "social", context: "social",
    question: "Una comunidad implementa un programa donde familias exitosas en agricultura comparten sus técnicas con otras. La adopción de nuevas técnicas aumenta. Se basa en:",
    correct: "Modelamiento",
    distractors: ["Ensayo y Error", "Condicionamiento Operante", "Aprendizaje Latente"],
    explanation: "El modelamiento usa modelos creíbles (familias exitosas) para que los observadores adquieran nuevas conductas (técnicas agrícolas) por observación.",
    concept: "Modelamiento"
  },
  {
    id: "SO_AS_03", topic: "social", context: "social",
    question: "Un programa de prevención muestra videos donde jóvenes cuentan cómo las drogas arruinaron sus vidas. Los espectadores muestran menor intención de consumir. Esto es:",
    correct: "Castigo Vicario",
    distractors: ["Refuerzo Vicario", "Inhibición latente", "Extinción"],
    explanation: "El castigo vicario ocurre cuando el observador ve las consecuencias negativas que sufre otro (el modelo), lo que reduce la intención de imitar esa conducta.",
    concept: "Castigo vicario"
  },
  {
    id: "SO_AS_04", topic: "social", context: "social",
    question: "Una madre soltera, tras completar un programa de microcrédito, cree que puede emprender su propio negocio. Bandura llamaría a esto:",
    correct: "Autoeficacia",
    distractors: ["Motivación extrínseca", "Locus de control", "Facilitación social"],
    explanation: "La autoeficacia es la creencia en la propia capacidad para ejecutar acciones. La experiencia exitosa del microcrédito fortalece su sentido de eficacia personal.",
    concept: "Autoeficacia"
  }
];