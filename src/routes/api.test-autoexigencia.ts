import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { SITE } from "@/content/site";
import {
  OPCIONES,
  PREGUNTAS,
  TOTAL_PREGUNTAS,
  calcular,
  respuestasValidas,
} from "@/content/test-autoexigencia";

/**
 * Recibe el test de autoexigencia y se lo manda por correo a Melissa.
 * ------------------------------------------------------------------
 * No guarda nada: ni base de datos ni registro. Las respuestas existen en
 * esta petición, en el correo y en el buzón de destino. Si el envío falla se
 * le dice a la persona que lo reintente (sus respuestas siguen en pantalla),
 * así que tampoco queda una copia «por si acaso» en el servidor.
 *
 * Variables de entorno (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY   obligatoria; sin ella el endpoint responde 503
 *   TEST_MAIL_TO     destinatario; por defecto, DESTINO_PROVISIONAL (ver abajo)
 *   TEST_MAIL_FROM   remitente; por defecto el de pruebas de Resend, que solo
 *                    entrega al correo con el que se abrió la cuenta de Resend
 *   RESEND_API_URL   solo para pruebas en local
 *
 * El texto del correo no viaja desde el navegador: se redacta aquí con las
 * preguntas de `test-autoexigencia.ts` y las cifras recibidas, que además se
 * revalidan y se vuelven a sumar.
 */

/**
 * DESTINATARIO PROVISIONAL, solo mientras se prueba el test.
 * Cambiarlo por `SITE.contacto.email` (el correo de Melissa) antes de dar
 * difusión al test: hasta entonces las respuestas de cualquier persona que lo
 * rellene llegan aquí. También se puede cambiar sin tocar el código con la
 * variable de entorno TEST_MAIL_TO.
 */
const DESTINO_PROVISIONAL = "aaswebmarketing@gmail.com";

const MAX_BYTES = 8_000;
const EMAIL = /^[^\s@<>",;]+@[^\s@<>",;]+\.[^\s@<>",;]+$/;

/** Orígenes desde los que se acepta el formulario. */
function origenPermitido(origen: string | null): boolean {
  if (!origen) return false;
  const web = new URL(SITE.url).host.replace(/^www\./, "");
  try {
    const host = new URL(origen).host;
    return host.replace(/^www\./, "") === web || host.startsWith("localhost:");
  } catch {
    return false;
  }
}

/**
 * Límite de envíos por IP. Vive en la memoria de la instancia, así que en un
 * entorno sin servidor es un freno a la ráfaga, no un muro: basta para que un
 * script no llene el buzón de Melissa de un tirón.
 */
const VENTANA_MS = 60 * 60 * 1000;
const MAX_ENVIOS = 5;
const envios = new Map<string, number[]>();

function demasiadosEnvios(ip: string): boolean {
  const ahora = Date.now();
  const recientes = (envios.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  if (recientes.length >= MAX_ENVIOS) {
    envios.set(ip, recientes);
    return true;
  }
  recientes.push(ahora);
  envios.set(ip, recientes);
  if (envios.size > 5_000) {
    for (const [clave, marcas] of envios) {
      if (marcas.every((t) => ahora - t >= VENTANA_MS)) envios.delete(clave);
    }
  }
  return false;
}

const json = (cuerpo: unknown, status = 200) =>
  new Response(JSON.stringify(cuerpo), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });

/** Sin saltos de línea ni caracteres de control: el texto va a un correo. */
const limpiar = (s: string, max: number) =>
  s
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

function redactar(datos: {
  nombre: string;
  email: string;
  respuestas: number[];
  novedades: boolean;
}) {
  const { total, nivel, ambitos } = calcular(datos.respuestas);
  const fecha = new Intl.DateTimeFormat("es-ES", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Madrid",
  }).format(new Date());

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

        const clave = process.env.RESEND_API_KEY;
        if (!clave) return json({ error: "no-configurado" }, 503);

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

        const ip =
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          request.headers.get("x-real-ip") ||
          "desconocida";
        if (demasiadosEnvios(ip)) return json({ error: "limite" }, 429);

        const { total, texto } = redactar({
          nombre,
          email,
          respuestas: cuerpo.respuestas,
          novedades: cuerpo.novedades,
        });

        try {
          const respuesta = await fetch(
            process.env.RESEND_API_URL || "https://api.resend.com/emails",
            {
              method: "POST",
              headers: { Authorization: `Bearer ${clave}`, "Content-Type": "application/json" },
              body: JSON.stringify({
                from: process.env.TEST_MAIL_FROM || "Orpheus Psicología <onboarding@resend.dev>",
                to: [process.env.TEST_MAIL_TO || DESTINO_PROVISIONAL],
                reply_to: email,
                subject: `Test de autoexigencia: ${total}/${TOTAL_PREGUNTAS * 4}`,
                text: texto,
              }),
            },
          );
          if (!respuesta.ok) {
            // Solo el estado: ni el cuerpo de la petición ni datos de la persona.
            console.error("test-autoexigencia: el proveedor de correo respondió", respuesta.status);
            return json({ error: "envio" }, 502);
          }
        } catch {
          console.error("test-autoexigencia: no se pudo contactar con el proveedor de correo");
          return json({ error: "envio" }, 502);
        }

        return json({ ok: true });
      },
    },
  },
});
