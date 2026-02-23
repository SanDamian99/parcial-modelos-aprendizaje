# Parcial de Modelos de Aprendizaje
 
Aplicación web para evaluar de manera interactiva a estudiantes en el módulo de **Modelos de Aprendizaje** (Primer Corte). Evalúa tres teorías: Conductismo Clásico (Pavlov), Conductismo Operante (Skinner/Thorndike) y Aprendizaje Social (Bandura).
 
## 📋 Estructura del Parcial
 
| Parte | Descripción | Peso |
|-------|-------------|------|
| **Parte 1** | Quiz de 15 preguntas (5 por teoría) con temporizador de 20 min | 40% |
| **Parte 2** | Aplicación Práctica con Casos Reales — 6 niveles educativos y clínicos | 60% |
 
---
 
## 📤 Recepción de Resultados en Supabase
 
Los resultados se envían automáticamente a **Supabase** en **dos momentos**:
1. Al finalizar la Parte 1 (Quiz).
2. Al terminar todo el parcial (después del Nivel 6).

El archivo JSON enviado contiene: `nombre`, `codigo`, `timestamp`, `parte1` (puntajes por teoría), `parte2` (niveles completados, vidas usadas, respuestas abiertas), y `nota_calculada`.

### Ver los resultados
Abre la hoja de Google Sheets asociada al Apps Script. Cada fila corresponde a un envío. Si un estudiante recarga o reintenta, se crea una nueva fila (el profesor ve todos los intentos).

---

## ⚙️ Configuración Editable (`js/config.js`)

Todos los parámetros modificables están centralizados en un solo archivo:

| Parámetro | Descripción | Valor por defecto |
|-----------|-------------|-------------------|
| `QUIZ.TIME_LIMIT_MINUTES` | Duración máxima de la Parte 1 | 25 min |
| `QUIZ.QUESTIONS_PER_TOPIC` | Preguntas por teoría | 5 |
| `QUIZ.TOTAL_QUESTIONS` | Total de preguntas | 15 |
| `GAME.TIME_LIMIT_MINUTES` | Duración máxima de la Parte 2 | 30 min |
| `GAME.LIVES_PER_LEVEL` | Intentos por nivel | 3 |
| `SCORING.QUIZ_WEIGHT` | Peso del quiz en la nota | 0.4 |
| `SCORING.GAME_WEIGHT` | Peso del juego en la nota | 0.6 |

---

## 📝 Modificar Banco de Preguntas (`data/questions.js`)

El banco contiene **45 preguntas** (15 por teoría). El formato de cada pregunta es:

```javascript
{
  id: "CC_001",
  topic: "clasico",    // "clasico" | "operante" | "social"
  question: "Texto de la pregunta...",
  correct: "Respuesta correcta",
  distractors: ["Distractor A", "Distractor B", "Distractor C"],
  explanation: "Retroalimentación pedagógica mostrada al estudiante",
  concept: "Concepto teórico evaluado"
}
```

**Importante:** el campo `topic` debe ser exactamente `"clasico"`, `"operante"` o `"social"` (sin tildes, minúsculas).

---

## 🏥 Modificar Casos del Juego (`data/cases.js`)
 
Los niveles están en `data/cases.js`. Para editar la narrativa, modifica el campo `description`. Si cambias las opciones de respuesta, verifica que coincidan exactamente con los valores `correct` correspondientes. El Nivel 6 está diseñado específicamente para Condicionamiento Clásico.

---

## 🚀 Activar GitHub Pages

1. Ve a **Settings → Pages** en el repositorio.
2. Selecciona la rama `main` y carpeta `/ (root)`.
3. Guarda. La URL será: `https://TU-USUARIO.github.io/parcial-modelos-aprendizaje/`

---

## 🔒 Características de Seguridad

- **Determinismo:** La selección de 15 preguntas usa una semilla basada en el código estudiantil. Mismo código = mismas preguntas. Códigos diferentes = preguntas diferentes.
- **Idempotencia:** Recargar la página no pierde el progreso (se guarda en `sessionStorage`).
- **Anti-trampas:** Las respuestas correctas no están expuestas en atributos `data-` del DOM antes de responder.
- **Tolerancia a fallos:** El sistema maneja fallos de red de forma silenciosa para no interrumpir el flujo del estudiante.
