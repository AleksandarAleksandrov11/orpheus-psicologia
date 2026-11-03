import { SITE } from "@/content/site";

/**
 * Envío de correo desde el servidor (hoy, solo el test de autoexigencia).
 * ------------------------------------------------------------------
 * Nada se guarda: lo que llega se redacta, se manda y se olvida.
 *
 * Hay dos formas de enviar y se elige por las variables de entorno que existan
 * (Vercel → Settings → Environment Variables):
 *
 *   A) Gmail por SMTP, sin servicios de terceros. No hace falta cuenta nueva,
 *      solo una «contraseña de aplicación» de la cuenta que envía (Google →
 *      Seguridad → Verificación en dos pasos → Contraseñas de aplicaciones):
 *        SMTP_USER   la cuenta que envía, p. ej. aaswebmarketing@gmail.com
 *        SMTP_PASS   la contraseña de aplicación (16 letras), nunca la normal
 *        SMTP_HOST / SMTP_PORT / SMTP_SECURE   opcionales; por defecto Gmail,
 *                    465 y conexión cifrada
 *   B) Resend:
 *        RESEND_API_KEY   (si existe, tiene preferencia sobre el SMTP)
 *
 * Comunes:
 *   MAIL_TO     destinatario (también vale TEST_MAIL_TO); por defecto,
 *               DESTINO_PROVISIONAL
 *   MAIL_FROM   remitente (también vale TEST_MAIL_FROM). Con Gmail el remitente
 *               real es siempre SMTP_USER; con Resend, por defecto el de
 *               pruebas, que solo entrega al correo con el que se abrió la cuenta
 *   RESEND_API_URL   solo para pruebas en local
 *
 * Sin ninguna de las dos, los endpoints responden 503.
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

export const correoConfigurado = () =>
  Boolean(process.env.RESEND_API_KEY || (process.env.SMTP_USER && process.env.SMTP_PASS));

export const fechaActual = () =>
  new Intl.DateTimeFormat("es-ES", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Madrid",
  }).format(new Date());

type Correo = { asunto: string; texto: string; responderA: string; etiqueta: string };

const destinatario = () => process.env.MAIL_TO || process.env.TEST_MAIL_TO || DESTINO_PROVISIONAL;

async function porResend(c: Correo, clave: string): Promise<boolean> {
  const respuesta = await fetch(process.env.RESEND_API_URL || "https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${clave}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from:
        process.env.MAIL_FROM ||
        process.env.TEST_MAIL_FROM ||
        "Orpheus Psicología <onboarding@resend.dev>",
      to: [destinatario()],
      reply_to: c.responderA,
      subject: c.asunto,
      text: c.texto,
    }),
  });
  if (!respuesta.ok) {
    // Solo el estado: ni el cuerpo de la petición ni datos de la persona.
    console.error(`${c.etiqueta}: el proveedor de correo respondió`, respuesta.status);
  }
  return respuesta.ok;
}

async function porSmtp(c: Correo, usuario: string, clave: string): Promise<boolean> {
  // Import dinámico: solo se carga en el servidor y solo si se usa el SMTP.
  const { default: nodemailer } = await import("nodemailer");
  const transporte = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE !== "false",
    auth: { user: usuario, pass: clave },
    connectionTimeout: 10_000,
    socketTimeout: 15_000,
  });
  await transporte.sendMail({
    // Gmail sustituye el remitente por la cuenta autenticada, así que el nombre
    // visible es lo único que se controla.
    from: process.env.MAIL_FROM || process.env.TEST_MAIL_FROM || `Orpheus Psicología <${usuario}>`,
    to: destinatario(),
    replyTo: c.responderA,
    subject: c.asunto,
    text: c.texto,
  });
  return true;
}

/** «ok» si el proveedor lo aceptó. Nunca registra el contenido del correo. */
export async function enviarCorreo(c: Correo): Promise<"ok" | "no-configurado" | "fallo"> {
  const resend = process.env.RESEND_API_KEY;
  const usuario = process.env.SMTP_USER;
  const clave = process.env.SMTP_PASS;
  if (!resend && !(usuario && clave)) return "no-configurado";

  try {
    const enviado = resend ? await porResend(c, resend) : await porSmtp(c, usuario!, clave!);
    return enviado ? "ok" : "fallo";
  } catch (error) {
    // Código y texto técnico del error, sin el correo ni las respuestas.
    const motivo = error instanceof Error ? error.message.slice(0, 160) : "desconocido";
    console.error(`${c.etiqueta}: fallo al enviar el correo (${motivo})`);
    return "fallo";
  }
}
