import { SITE } from "@/content/site";

/**
 * Envío de correo desde el servidor, compartido por el formulario de contacto
 * y el test de autoexigencia.
 * ------------------------------------------------------------------
 * Nada se guarda: lo que llega se redacta, se manda con Resend y se olvida.
 *
 * Variables de entorno (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY   obligatoria; sin ella los endpoints responden 503
 *   MAIL_TO          destinatario (también vale TEST_MAIL_TO); por defecto,
 *                    DESTINO_PROVISIONAL
 *   MAIL_FROM        remitente (también vale TEST_MAIL_FROM); por defecto el de
 *                    pruebas de Resend, que solo entrega al correo con el que se
 *                    abrió la cuenta de Resend
 *   RESEND_API_URL   solo para pruebas en local
 */

/**
 * DESTINATARIO PROVISIONAL, solo mientras se prueba.
 * Cambiarlo por `SITE.contacto.email` (el correo de Melissa) antes de dar
 * difusión: hasta entonces, lo que escriba cualquier persona en el formulario
 * de contacto o en el test llega aquí. También se puede cambiar sin tocar el
 * código con la variable de entorno MAIL_TO.
 */
export const DESTINO_PROVISIONAL = "aaswebmarketing@gmail.com";

export const EMAIL = /^[^\s@<>",;]+@[^\s@<>",;]+\.[^\s@<>",;]+$/;

/** Orígenes desde los que se acepta un formulario. */
export function origenPermitido(origen: string | null): boolean {
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
 * script no llene el buzón de un tirón.
 */
export function crearLimitador(max: number, ventanaMs: number) {
  const envios = new Map<string, number[]>();
  return (ip: string): boolean => {
    const ahora = Date.now();
    const recientes = (envios.get(ip) ?? []).filter((t) => ahora - t < ventanaMs);
    if (recientes.length >= max) {
      envios.set(ip, recientes);
      return true;
    }
    recientes.push(ahora);
    envios.set(ip, recientes);
    if (envios.size > 5_000) {
      for (const [clave, marcas] of envios) {
        if (marcas.every((t) => ahora - t >= ventanaMs)) envios.delete(clave);
      }
    }
    return false;
  };
}

export const ipDe = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  request.headers.get("x-real-ip") ||
  "desconocida";

export const json = (cuerpo: unknown, status = 200) =>
  new Response(JSON.stringify(cuerpo), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });

/** Sin saltos de línea ni caracteres de control: el texto va a un correo. */
export const limpiar = (s: string, max: number) =>
  s
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

/** Como `limpiar`, pero conserva los saltos de línea (para un mensaje largo). */
export const limpiarMultilinea = (s: string, max: number) =>
  s
    .replace(/\r\n?/g, "\n")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);

export const correoConfigurado = () => Boolean(process.env.RESEND_API_KEY);

export const fechaActual = () =>
  new Intl.DateTimeFormat("es-ES", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Madrid",
  }).format(new Date());

/** «ok» si Resend lo aceptó. Nunca registra el contenido del correo. */
export async function enviarCorreo(datos: {
  asunto: string;
  texto: string;
  responderA: string;
  etiqueta: string;
}): Promise<"ok" | "no-configurado" | "fallo"> {
  const clave = process.env.RESEND_API_KEY;
  if (!clave) return "no-configurado";

  try {
    const respuesta = await fetch(process.env.RESEND_API_URL || "https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${clave}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from:
          process.env.MAIL_FROM ||
          process.env.TEST_MAIL_FROM ||
          "Orpheus Psicología <onboarding@resend.dev>",
        to: [process.env.MAIL_TO || process.env.TEST_MAIL_TO || DESTINO_PROVISIONAL],
        reply_to: datos.responderA,
        subject: datos.asunto,
        text: datos.texto,
      }),
    });
    if (!respuesta.ok) {
      // Solo el estado: ni el cuerpo de la petición ni datos de la persona.
      console.error(`${datos.etiqueta}: el proveedor de correo respondió`, respuesta.status);
      return "fallo";
    }
    return "ok";
  } catch {
    console.error(`${datos.etiqueta}: no se pudo contactar con el proveedor de correo`);
    return "fallo";
  }
}
