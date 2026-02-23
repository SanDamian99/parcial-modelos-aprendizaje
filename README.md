# Parcial Interactivo de Psicología

Este repositorio contiene una aplicación web de página única (Frontend-only), de muy bajo peso y sin dependencias externas complejas, diseñada para evaluar de manera moderna, interactiva y lúdica a estudiantes de Psicología en el módulo de Modelos de Aprendizaje (Conductismo Clásico, Operante y Aprendizaje Social de Bandura).

## 📥 Recepción de Resultados (Google Sheets)
El sistema está diseñado para enviar automáticamente los resultados a un endpoint de Google Apps Script cuando el estudiante:
1. Finaliza el Quiz (Parte 1).
2. Finaliza el parcial completo con el Juego Clínica del Comportamiento (Parte 2).

### Formato de datos guardados
El profesor verá en el backend de Google Scripts que recibe un objeto JSON estructurado con los siguientes campos: `nombre`, `codigo`, `timestamp`, `parte1` (puntajes y tiempos del quiz), `parte2` (vidas usadas, niveles superados y respuestas de análisis de texto libre en formato escalonado), y una `nota_calculada` predictiva según pesos programados.
> **Importante Técnico:** La API enviará el payload vía `POST` formato texto para ser parseada por GAS de la manera más segura posible sin conflictos de CORS habituales de Github Pages.

---

## ⚙️ Modificación de la Configuración y Tiempos (`js/config.js`)
Para ajustar la dificultad, el límite de tiempo o la cantidad de preguntas a evaluar, el profesor **solo debe editar los valores en `js/config.js`**. No se requiere tocar lógica profunda de código.
* `QUIZ.TIME_LIMIT_MINUTES`: Minutos de duración máxima del Quiz (Parte 1). Por defecto: 25.
* `QUIZ.QUESTIONS_PER_TOPIC`: Número de ítems aleatorios seleccionados por pilar teórico. Por defecto: 5 (15 en total).
* `GAME.TIME_LIMIT_MINUTES`: Minutos para el juego interactivo. Por defecto: 30.
* `GAME.LIVES_PER_LEVEL`: Corazones/intentos por caso clínico en la parte 2.
* `SCORING`: Pesos porcentuales que determinan la nota integral calculada. Por defecto Quiz vale el 40% y el juego 60%.

---

## 📝 Modificar Banco de Preguntas (`data/questions.js`)
El banco de la Parte 1 contiene **45 preguntas validadas** (15 por teoría clásica, operante, social). Para modificar o sustituir preguntas, abre `data/questions.js` y edita/añade objetos siguiendo este JSON:
```javascript
  {
    id: "CC_001",
    topic: "clasico", // Debe ser exactamente "clasico", "operante" o "social"
    question: "Pregunta visible para el estudiante...",
    correct: "Opción Correcta Real",
    distractors: ["Distractor A", "Distractor B", "Distractor C"],
    explanation: "Feedback profundo mostrado al estudiante tras responder",
    concept: "Tema curricular que se evalúa (metadato)"
  }
```
* **Aleatoriedad Idempotente:** El logaritmo de validación asegura que si un estudiante con código `2021134` sufre una desconexión y vuelve a entrar, el motor le seleccionará **las mismas 15 preguntas exactas** extraídas del banco, evitando ventajas o trampas, pero otro estudiante con código `2021135` tendrá otro set distinto extraído de las 45 base.

---

## 🏥 Modificar Casos del Juego (`data/cases.js`)
Cada relato narrativo de caso clínico se localiza y administra de forma independiente de la lógica interactiva. Para modificar antecedentes ("Don Simón" o "Andrea"), edita el campo de texto `description` del nivel correspondiente en `data/cases.js`. Si alteras el sistema de opciones debes revisar cuidadosamente coincidencia exacta con el controlador del motor de juego `js/game.js`, pero para cambios textuales puramente literarios de enriquecimiento clínico es completamente seguro.

> Todo estudiante tiene asegurado el guardado de progreso mediante `sessionStorage`. Una recarga accidental del navegador en la Parte 2 retoma el Nivel Clínico máximo alcanzado en el intento actual.
