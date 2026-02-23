// js/db.js
// Módulo para enviar datos a Google Sheets mediante Google Apps Script Web App
// Maneja errores de red silenciosamente para no interrumpir la experiencia del estudiante.

const DB = {
    /**
     * Envía un payload JSON al endpoint de Google Apps Script.
     * Usa mode:'no-cors' como fallback si la petición falla con CORS.
     * @param {Object} payload - Objeto con los datos a enviar
     * @returns {boolean} true si se envió correctamente, false en caso de error
     */
    async sendData(payload) {
        try {
            console.log("Enviando datos al registro académico:", JSON.stringify(payload).substring(0, 200) + "...");

            // Intento principal: text/plain evita preflight CORS en GAS
            const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                },
                body: JSON.stringify(payload),
                redirect: 'follow'
            });
            console.log('Datos enviados correctamente al registro.');
            return true;
        } catch (error) {
            // Intento fallback: no-cors (no da respuesta legible pero el servidor sí recibe)
            try {
                await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'text/plain;charset=utf-8'
                    },
                    body: JSON.stringify(payload)
                });
                console.log('Datos enviados (modo no-cors fallback).');
                return true;
            } catch (fallbackError) {
                console.error('Error al enviar resultados (ambos intentos fallaron):', fallbackError);
                // Falla silenciosamente — el parcial debe seguir funcionando
                return false;
            }
        }
    }
};
