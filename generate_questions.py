import json

raw_classical = """
Para un paciente de 80 años, el hospital es aversivo. Si el sonido del monitor cardíaco (Bip-Bip) precede siempre a una inyección dolorosa, el Bip-Bip se convierte en predictor de dolor mediante: Contigüidad Temporal | Reforzamiento Negativo | Aprendizaje Observacional | Castigo Positivo. Concepto: Contigüidad temporal en condicionamiento clásico.
Si el sonido de la sirena de ambulancia (Neutro) se asocia repetidamente con llegada de pacientes críticos (EI) y ahora provoca alerta fisiológica en el personal, la sirena es un: Estímulo Condicionado | Estímulo Incondicionado | Respuesta Incondicionada | Reforzador Secundario. Concepto: Adquisición del EC.
Si el 'Promedio de eventos/paciente' es 1.56 y cada nuevo evento fortalece la asociación entre 'Dolor de pecho' y 'Miedo a morir', la fuerza de la RC aumenta por: Número de apareamientos (Adquisición) | Precondicionamiento sensorial | Inhibición externa | Sombreado del estímulo. Concepto: Adquisición.
Si un paciente asocia la 'Bata Blanca' con malas noticias, y el médico cambia su bata por uniforme azul para reducir la ansiedad, está intentando romper la asociación mediante: Alteración del Estímulo Condicionado | Castigo de la respuesta | Reforzamiento diferencial | Moldeamiento. Concepto: Extinción por modificación del EC.
Si un paciente de 35 años asocia el olor a alcohol antiséptico con dolor del infarto, pero luego de muchas visitas sin dolor el olor deja de producir miedo, ¿qué fenómeno ocurrió?: Extinción | Habituación | Sensibilización | Contracondicionamiento. Concepto: Extinción clásica.
Si un paciente con múltiples eventos asocia el dolor en el brazo izquierdo con un infarto, y ahora siente dolor por un golpe y se angustia, ¿qué fenómeno se presenta?: Generalización del estímulo | Discriminación | Recuperación espontánea | Inhibición latente. Concepto: Generalización.
Un paciente sufrió un IAM en la 'Clínica de la Presentación'. Ahora pasar por esa calle le genera taquicardia, pero pasar por otras clínicas no. Esto demuestra: Discriminación | Generalización | Adquisición | Recuperación espontánea. Concepto: Discriminación de estímulos.
Un paciente del grupo 60-69 años sufre un IAM. El dolor (EI) genera miedo (RI). Semanas después, al ver el logotipo de la clínica (EN), siente ansiedad. ¿Qué función cumple el logotipo?: Estímulo Condicionado (EC) | Estímulo Incondicionado | Respuesta Condicionada | Estímulo Discriminativo. Concepto: Función del EC.
Si se introduce un ruido fuerte (EI) cada vez que el médico entra en una zona incorrecta y esto provoca una respuesta de sobresalto (RI), hablamos de: Condicionamiento Aversivo | Condicionamiento Apetitivo | Aprendizaje por evitación | Castigo Negativo. Concepto: Condicionamiento aversivo.
Para un niño, el sonido de la campana escolar es neutral. Si precede siempre a un examen difícil, la campana se convierte en predictor de ansiedad mediante: Contigüidad Temporal | Reforzamiento Negativo | Aprendizaje Observacional | Castigo Positivo. Concepto: Contigüidad temporal.
Si la notificación del celular se asocia repetidamente con mensajes de alguien querido y ahora provoca una sonrisa, la notificación es un: Estímulo Condicionado | Estímulo Incondicionado | Respuesta Incondicionada | Reforzador Secundario. Concepto: Adquisición del EC.
Un estudiante asociaba el olor de libros viejos con estrés de exámenes. Tras un verano leyendo por placer, el olor deja de producir estrés. ¿Qué fenómeno ocurrió?: Extinción | Habituación | Sensibilización | Contracondicionamiento. Concepto: Extinción clásica.
Un niño asocia el trueno fuerte con miedo. Si ahora el sonido de una puerta cerrándose fuerte le genera angustia, ¿qué fenómeno se presenta?: Generalización del estímulo | Discriminación | Recuperación espontánea | Inhibición latente. Concepto: Generalización.
Un estudiante tuvo bullying en el patio. El patio se asoció con miedo. Ahora al ver una foto del patio siente ansiedad. ¿Qué función cumple la foto?: Estímulo Condicionado (EC) | Estímulo Incondicionado | Respuesta Condicionada | Estímulo Discriminativo. Concepto: Función del EC.
Un estudiante tuvo mala experiencia en álgebra. Ahora entrar al salón de matemáticas le da nervios, pero entrar al de literatura no. Esto demuestra: Discriminación | Generalización | Adquisición | Recuperación espontánea. Concepto: Discriminación de estímulos.
"""

raw_operant = """
Cuando un paciente llega a urgencias y se le quita el dolor torácico con morfina, la conducta de 'ir al hospital' se fortalece. ¿Qué contingencia explica esto?: Reforzamiento Negativo (retiro de estímulo aversivo) | Reforzamiento Positivo | Castigo Negativo | Extinción. Concepto: Reforzamiento negativo.
Si un auditor empieza a poner multas por cada registro sin código y los registros completos aumentan, ¿qué contingencia se aplicó?: Castigo Positivo para reducir la omisión | Reforzamiento Negativo | Extinción | Reforzamiento Positivo. Concepto: Castigo positivo.
Los administradores premian cada 5 procedimientos realizados con un descanso extra. Están usando un programa de reforzamiento de: Razón Fija | Intervalo Fijo | Razón Variable | Intervalo Variable. Concepto: Programa de razón fija.
Los médicos dejan de registrar el código CIE-10 porque el sistema no les da ninguna confirmación o beneficio por hacerlo. ¿Qué proceso operante explica la disminución?: Extinción por falta de reforzamiento | Castigo positivo | Reforzamiento negativo | Generalización. Concepto: Extinción operante.
Los cirujanos reciben un bono económico (ficha) por cada cirugía exitosa y esto aumenta la tasa de cirugías. El bono actúa como: Reforzador Secundario | Reforzador Primario | Estímulo Aversivo | Estímulo Discriminativo. Concepto: Reforzador secundario.
Las IPS empiezan a reportar correctamente para evitar la retención de pagos. ¿Qué tipo de aprendizaje operante es?: Reforzamiento Negativo (Evitación) | Reforzamiento Positivo | Castigo Negativo | Castigo Positivo. Concepto: Reforzamiento negativo de evitación.
Un paciente toma la ruta de 'Urgencias' y es atendido rápido. Es más probable que vuelva a usar urgencias para dolencias menores. Esto ilustra la: Ley del Efecto (Thorndike/Skinner) | Ley de la Contigüidad | Teoría del Aprendizaje Social | Indefensión Aprendida. Concepto: Ley del efecto.
Se observa que los cirujanos operan más porque las cirugías previas resultaron en altas tasas de supervivencia inmediata. ¿Qué actúa como reforzador?: Reforzamiento Positivo | Reforzamiento Negativo | Castigo Positivo | Castigo Negativo. Concepto: Reforzamiento positivo.
Los auditores ignoran sistemáticamente los reportes incompletos y con el tiempo los médicos dejan de esforzarse por completarlos. Se ha producido: Extinción de la conducta de registro | Habituación al error | Castigo negativo | Reforzamiento intermitente. Concepto: Extinción operante.
Un paciente experimenta alivio inmediato cada vez que toma su medicación al sentir una punzada en el pecho, y la conducta de tomar la pastilla aumenta. Esto es: Reforzamiento Negativo | Reforzamiento Positivo | Castigo Positivo | Condicionamiento de Escape. Concepto: Reforzamiento negativo de escape.
Un estudiante con ansiedad social va a la biblioteca y el ruido cesa inmediatamente. La conducta de 'ir a la biblioteca' se fortalece. ¿Qué contingencia explica esto?: Reforzamiento Negativo | Reforzamiento Positivo | Castigo Negativo | Extinción. Concepto: Reforzamiento negativo.
Un profesor resta puntos por cada día de retraso en entregas y las entregas puntuales aumentan. ¿Qué contingencia se aplicó?: Reforzamiento Negativo para aumentar la conducta | Castigo Positivo | Extinción | Reforzamiento Positivo. Concepto: Reforzamiento negativo.
Coordinadores premian a tutores con un bono de café cada vez que completan 5 sesiones. Programa de reforzamiento de: Razón Fija | Intervalo Fijo | Razón Variable | Intervalo Variable. Concepto: Razón fija.
En un sistema de economía de fichas, los alumnos reciben un sticker por cada conducta prosocial. El sticker actúa como: Reforzador Secundario | Reforzador Primario | Estímulo Aversivo | Estímulo Discriminativo. Concepto: Reforzador secundario.
Un orientador ignora las quejas de un alumno revoltoso y con el tiempo el alumno deja de quejarse. Se ha producido: Extinción de la conducta | Habituación | Castigo negativo | Reforzamiento intermitente. Concepto: Extinción operante.
"""

raw_social = """
La caída drástica de eventos hace que los especialistas pierdan habilidad en procedimientos complejos por falta de repetición. Bandura explicaría esto como un fallo en: Retención motora y práctica | Procesos de atención | Motivación intrínseca | Autoeficacia percibida. Concepto: Proceso de reproducción motora.
La 'Autoeficacia' de Bandura se aplicaría si los pacientes con primer evento creen que: Son capaces de modificar su dieta para evitar un segundo IAM | El sistema los curará sin esfuerzo | El infarto fue inevitable | Su destino depende de la suerte. Concepto: Autoeficacia.
Un paciente elige la Clínica Los Nogales porque escuchó a su vecino (modelo de confianza) decir que 'es la mejor para el corazón'. Su conducta se basa en: Influencia del Modelo | Ensayo y Error | Condicionamiento Directo | Refuerzo Intermitente. Concepto: Influencia del modelo.
La Clínica Nuestra Ibagué decide adoptar los protocolos de triaje de Los Nogales tras observar su éxito. ¿Qué tipo de aprendizaje está ocurriendo?: Aprendizaje Vicario | Moldeamiento | Condicionamiento de segundo orden | Aprendizaje por Insight. Concepto: Aprendizaje vicario.
Las demás clínicas ven que la Fundación Cardiovascular recibe incentivos financieros y se motivan a competir. Se ejemplifica el concepto de: Refuerzo Vicario | Facilitación de respuesta | Inhibición desinhibitoria | Atención selectiva. Concepto: Refuerzo vicario.
Sin ver las consecuencias reales de los procedimientos, Bandura diría que es difícil establecer aprendizaje porque falta: El componente motivacional del refuerzo | La atención selectiva | La reproducción motora | La codificación simbólica. Concepto: Motivación y refuerzo vicario.
Un médico residente observa a su jefe diagnosticar correctamente y empieza a usar esos mismos criterios. Bandura llamaría a este proceso: Modelamiento (Modeling) | Condicionamiento Instrumental | Aprendizaje Latente | Desensibilización Sistemática. Concepto: Modelamiento.
Si la EPS publica un ranking donde felicita a la mejor clínica esperando que las otras mejoren por competencia, apela a: Motivación por incentivo vicario | Condicionamiento de evitación | Ley del ejercicio | Programas de razón fija. Concepto: Incentivo vicario.
Un médico junior ve que su jefe omite el diagnóstico CIE-10 sin recibir sanción, y el junior imita la omisión debido a: Desinhibición por falta de consecuencias negativas | Reforzamiento Vicario Positivo | Generalización de respuesta | Aprendizaje por descubrimiento. Concepto: Desinhibición.
Un paciente nuevo observa en la sala de espera que otros pacientes están tranquilos y esto reduce su propia ansiedad. Ha ocurrido un efecto de: Inhibición de la respuesta de miedo | Desinhibición de conductas | Facilitación social | Condicionamiento directo. Concepto: Inhibición vicaria.
La Autoeficacia de Bandura se aplicaría si un estudiante que reprobó su primer examen cree que: Es capaz de mejorar su método de estudio para aprobar el siguiente | El profesor lo aprobará sin esfuerzo | Reprobar fue mala suerte | Su inteligencia es fija. Concepto: Autoeficacia.
Un aspirante elige una universidad porque su hermano mayor (modelo de éxito) dice que 'es la mejor para conseguir empleo'. Su conducta se basa en: Influencia del Modelo | Ensayo y Error | Condicionamiento Directo | Refuerzo Intermitente. Concepto: Influencia del modelo.
Una escuela pequeña adopta el método de enseñanza de una institución de élite tras observar cómo sus estudiantes ganan premios. ¿Qué aprendizaje ocurre?: Aprendizaje Vicario | Moldeamiento | Condicionamiento de segundo orden | Aprendizaje por Insight. Concepto: Aprendizaje vicario.
Los estudiantes de primer año ven que los de último año reciben becas por publicar artículos, y esto los motiva a iniciar proyectos propios. Se ejemplifica: Refuerzo Vicario | Facilitación de respuesta | Inhibición desinhibitoria | Atención selectiva. Concepto: Refuerzo vicario.
Un practicante ve que su tutor llega tarde sin recibir sanción, y empieza a llegar tarde también. Esto ocurre por: Desinhibición por falta de consecuencias negativas | Reforzamiento Vicario Positivo | Generalización | Aprendizaje por descubrimiento. Concepto: Desinhibición.
"""

def parse_block(text, prefix, topic):
    qs = []
    lines = text.strip().split('\\n')
    for i, line in enumerate(lines):
        line = line.strip()
        if not line: continue
        parts = line.split('Concepto:')
        q_and_opts = parts[0].strip()
        concept = parts[1].strip() if len(parts)>1 else ""
        
        q_parts = q_and_opts.split('?:')
        if len(q_parts) == 1:
             q_parts = q_and_opts.split(': ')
             
        question = q_parts[0] + ('?' if q_and_opts.count('?:') else ':')
        opts_str = q_parts[1].strip() if len(q_parts)>1 else ""
        
        opts = [o.strip() for o in opts_str.split('|')]
        # The first option is typically the correct one based on matching the concept.
        # But wait, looking at the prompts, the correct one is usually listed first or is the one matching the concept.
        # "Contigüidad Temporal | Reforzamiento Negativo..." -> correct is Contigüidad Temporal.
        # I will assume the first one is correct for all since the prompt says "Usa las siguientes como base" and usually the first one is correct in such lists. Then we scramble them in the app.
        correct = opts[0]
        distractors = opts[1:] if len(opts)>1 else ["Opción 1", "Opción 2", "Opción 3"]
        if len(distractors) < 3:
            distractors.extend([f"Alternativa {j}" for j in range(3-len(distractors))])
            
        qs.append({
            "id": f"{prefix}_{str(i+1).zfill(3)}",
            "topic": topic,
            "question": question,
            "correct": correct,
            "distractors": distractors[:3],
            "explanation": f"Concepto evaluado: {concept}.",
            "concept": concept.rstrip('.')
        })
    return qs

questions = []
questions.extend(parse_block(raw_classical, "CC", "clasico"))
questions.extend(parse_block(raw_operant, "OP", "operante"))
questions.extend(parse_block(raw_social, "AS", "social"))

with open('/Users/joseamorocho/parcial_modelos/parcial-psicologia/data/questions.js', 'w') as f:
    f.write('// data/questions.js\\n')
    f.write('const QUESTIONS_BANK = ')
    f.write(json.dumps(questions, indent=2, ensure_ascii=False))
    f.write(';\\n')
