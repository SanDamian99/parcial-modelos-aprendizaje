// js/db.js
// Módulo para enviar datos a Google Sheets mediante Apps Script Web App

const DB = {
    async sendData(payload) {
        try {
            console.log("Enviando payload a la DB:", payload);
            // fetch POST con JSON como text/plain para evitar errores preflight de CORS
            // Esta API está configurada explícitamente sin dependencias en Node
            const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8' // Importante: usar text/plain para que GAS lo reciba sin preflight
                },
                body: JSON.stringify(payload)
            });
            console.log('Datos enviados correctamente a DB.');
            return true;
        } catch (error) {
            console.error('Error silencioso al enviar resultados a la DB:', error);
            // Falla silenciosamente para no detener el progreso del usuario en caso de error de red
            return false;
        }
    }
};
