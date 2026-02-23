// js/db.js
// Módulo para el envío de resultados a Google Sheets y Supabase en paralelo.
// Implementa persistencia redundante para asegurar el registro estudiantil.

const DB = (function () {

    /**
     * Envía los datos a Google Sheets usando Google Apps Script.
     * REQUIERE mode: "no-cors" y Content-Type: "text/plain".
     * La respuesta será opaca (normal en no-cors).
     */
    async function enviarASheets(payload) {
        try {
            await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain"
                },
                body: JSON.stringify(payload)
            });
            return true;
        } catch (error) {
            console.error("❌ Error en envío a Google Sheets:", error);
            throw error;
        }
    }

    /**
     * Envía los datos a Supabase mediante la API REST (PostgREST).
     * Realiza un mapeo plano de los datos para coincidir con el esquema de la tabla.
     */
    async function enviarASupabase(payload) {
        // Mapeo del payload anidado a columnas planas de la tabla 'resultados_parcial'
        const fila = {
            timestamp: payload.timestamp,
            nombre: payload.nombre,
            codigo: payload.codigo,
            puntaje_clasico: payload.parte1?.scores?.clasico ?? null,
            puntaje_operante: payload.parte1?.scores?.operante ?? null,
            puntaje_social: payload.parte1?.scores?.social ?? null,
            puntaje_total_p1: payload.parte1?.puntaje_total ?? null,
            tiempo_segundos_p1: payload.parte1?.tiempo_segundos ?? null,
            preguntas_respondidas: payload.parte1?.preguntas_respondidas ?? null,
            nivel_alcanzado: payload.parte2?.nivel_alcanzado ?? null,
            nivel1_completado: payload.parte2?.niveles?.nivel1?.completado ?? null,
            nivel1_vidas: payload.parte2?.niveles?.nivel1?.vidas_usadas ?? null,
            nivel1_tiempo: payload.parte2?.niveles?.nivel1?.tiempo_segundos ?? null,
            nivel2_completado: payload.parte2?.niveles?.nivel2?.completado ?? null,
            nivel2_vidas: payload.parte2?.niveles?.nivel2?.vidas_usadas ?? null,
            nivel2_tiempo: payload.parte2?.niveles?.nivel2?.tiempo_segundos ?? null,
            nivel3_completado: payload.parte2?.niveles?.nivel3?.completado ?? null,
            nivel3_vidas: payload.parte2?.niveles?.nivel3?.vidas_usadas ?? null,
            nivel3_tiempo: payload.parte2?.niveles?.nivel3?.tiempo_segundos ?? null,
            nivel4_completado: payload.parte2?.niveles?.nivel4?.completado ?? null,
            nivel4_vidas: payload.parte2?.niveles?.nivel4?.vidas_usadas ?? null,
            nivel4_tiempo: payload.parte2?.niveles?.nivel4?.tiempo_segundos ?? null,
            nivel5_completado: payload.parte2?.niveles?.nivel5?.completado ?? null,
            nivel5_vidas: payload.parte2?.niveles?.nivel5?.vidas_usadas ?? null,
            nivel5_tiempo: payload.parte2?.niveles?.nivel5?.tiempo_segundos ?? null,
            nivel6_completado: payload.parte2?.niveles?.nivel6?.completado ?? null,
            nivel6_vidas: payload.parte2?.niveles?.nivel6?.vidas_usadas ?? null,
            nivel6_tiempo: payload.parte2?.niveles?.nivel6?.tiempo_segundos ?? null,
            nivel6_aprendizaje: payload.parte2?.niveles?.nivel6?.barra_aprendizaje_final ?? null,
            nivel6_bienestar: payload.parte2?.niveles?.nivel6?.barra_bienestar_final ?? null,
            nivel6_minas_detectadas: payload.parte2?.niveles?.nivel6?.minas_detectadas ?? null,
            nivel6_minas_explotadas: payload.parte2?.niveles?.nivel6?.minas_explotadas ?? null,
            nivel2_prediccion: payload.parte2?.respuestas_abiertas?.nivel2_prediccion ?? null,
            nivel4_intervencion: payload.parte2?.respuestas_abiertas?.nivel4_intervencion ?? null,
            nivel4_contraproducente: payload.parte2?.respuestas_abiertas?.nivel4_contraproducente ?? null,
            nota_calculada: payload.nota_calculada ?? null,
            user_agent: navigator.userAgent,
            duracion_total_segundos: payload.duracion_total_segundos ?? null
        };

        const response = await fetch(
            `${CONFIG.SUPABASE_URL}/rest/v1/resultados_parcial`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": CONFIG.SUPABASE_ANON_KEY,
                    "Authorization": `Bearer ${CONFIG.SUPABASE_ANON_KEY}`,
                    "Prefer": "return=minimal"
                },
                body: JSON.stringify(fila)
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Supabase respondió ${response.status}: ${errorText}`);
        }
        return true;
    }

    return {
        /**
         * Envía los datos a ambos sistemas en paralelo.
         * Falla silenciosamente para el usuario, reportando en consola.
         */
        async sendData(payload) {
            // Verificación precia de serialización
            let payloadSeguro;
            try {
                JSON.parse(JSON.stringify(payload));
                payloadSeguro = payload;
            } catch (e) {
                console.error("❌ El payload no es serializable:", e);
                return;
            }

            console.log("🚀 Iniciando envío redundante de resultados...");

            const resultados = await Promise.allSettled([
                enviarASheets(payloadSeguro),
                enviarASupabase(payloadSeguro)
            ]);

            if (resultados[0].status === "fulfilled") {
                console.log("✅ Datos enviados a Google Sheets");
            } else {
                console.warn("⚠️ Google Sheets falló, pero Supabase podría compensar.");
            }

            if (resultados[1].status === "fulfilled") {
                console.log("✅ Datos enviados a Supabase");
            } else {
                console.error("❌ Error fatal en Supabase:", resultados[1].reason);
            }
        }
    };
})();
