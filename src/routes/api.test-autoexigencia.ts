import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import {
  correoConfigurado,
  crearLimitador,
  EMAIL,
  enviarCorreo,
  fechaActual,
  ipDe,
  json,
  limpiar,
  origenPermitido,
} from "@/lib/correo";
import {
  OPCIONES,
  PREGUNTAS,
  TOTAL_PREGUNTAS,
  calcular,
  respuestasValidas,
} from "@/content/test-autoexigencia";

/**
 * Recibe el test de autoexigencia y lo manda por correo (ver `lib/correo.ts`
 * para el destinatario y las variables de entorno). No guarda nada: si el envío
 * falla se le pide a la persona que reintente, y sus respuestas siguen en
 * pantalla, así que tampoco queda una copia «por si acaso» en el servidor.
 *
 * El texto del correo no viaja desde el navegador: se redacta aquí con las
 * preguntas de `test-autoexigencia.ts` y las cifras recibidas, que además se
 * revalidan y se vuelven a sumar.
 */

const MAX_BYTES = 8_000;
const demasiadosEnvios = crearLimitador(5, 60 * 60 * 1000);

function redactar(datos: {
  nombre: string;
  email: string;
  respuestas: number[];
  novedades: boolean;
}) {
  const { total, nivel, ambitos } = calcular(datos.respuestas);
  const fecha = fechaActual();

  const lineas = [
    "Nuevo test de autoexigencia",
    fecha,
    "",
    `Nombre: ${datos.nombre || "(no indicado)"}`,
    `Correo: ${datos.email}`,
    `Acepta recibir novedades por correo: ${datos.novedades ? "sí" : "no"}`,
    "Confirmaciones marcadas antes de enviar: política de privacidad y aviso legal leídos,",
    "test entendido como orientativo, y consentimiento expreso para tratar las respuestas.",
    "",
    `PUNTUACIÓN: ${total} / ${TOTAL_PREGUNTAS * 4}`,
    `Nivel: ${nivel.titulo}`,
    "",
    "POR ÁMBITOS",
    ...ambitos.map((a) => `- ${a.nombre}: ${a.puntos}/${a.max} (${a.porcentaje} %)`),
    "",
    "RESPUESTAS (0 = nunca, 4 = casi siempre)",
    ...datos.respuestas.map((v, i) => `${i + 1}. ${PREGUNTAS[i][1]}\n   → ${OPCIONES[v]} (${v})`),
    "",
    "Puedes responder a este correo y llegará a la persona que ha hecho el test.",
    "El test es orientativo y no está validado: no es un diagnóstico.",
  ];
  return { total, texto: lineas.join("\n") };
}

export const Route = createFileRoute("/api/test-autoexigencia")({
  server: {
    handlers: {
      // Sin esto, abrir la dirección en el navegador pintaba el sitio entero.
      GET: async () =>
        new Response("Method not allowed", { status: 405, headers: { Allow: "POST" } }),
      POST: async ({ request }: { request: Request }) => {
        if (!origenPermitido(request.headers.get("origin"))) {
          return json({ error: "origen" }, 403);
        }

        if (!correoConfigurado()) return json({ error: "no-configurado" }, 503);

        const crudo = await request.text();
        if (crudo.length > MAX_BYTES) return json({ error: "demasiado-grande" }, 413);

        let cuerpo: Record<string, unknown>;
        try {
          cuerpo = JSON.parse(crudo);
        } catch {
          return json({ error: "formato" }, 400);
        }

        // Campo trampa: un humano no lo ve. Se responde «bien» sin enviar nada.
        if (typeof cuerpo.web === "string" && cuerpo.web.length > 0) return json({ ok: true });

        const nombre = typeof cuerpo.nombre === "string" ? limpiar(cuerpo.nombre, 100) : "";
        const email = typeof cuerpo.email === "string" ? cuerpo.email.trim() : "";
        if (
          email.length > 254 ||
          !EMAIL.test(email) ||
          cuerpo.consentimiento !== true ||
          cuerpo.legal !== true ||
          cuerpo.orientativo !== true ||
          typeof cuerpo.novedades !== "boolean" ||
          !respuestasValidas(cuerpo.respuestas)
        ) {
          return json({ error: "datos" }, 400);
        }

        if (demasiadosEnvios(ipDe(request))) return json({ error: "limite" }, 429);

        const { total, texto } = redactar({
          nombre,
          email,
          respuestas: cuerpo.respuestas,
          novedades: cuerpo.novedades,
        });

        const estado = await enviarCorreo({
          asunto: `Test de autoexigencia: ${total}/${TOTAL_PREGUNTAS * 4}`,
          texto,
          responderA: email,
          etiqueta: "test-autoexigencia",
        });
        if (estado !== "ok") return json({ error: "envio" }, 502);

        return json({ ok: true });
      },
    },
  },
});
