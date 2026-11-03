import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { ESPACIOS } from "@/content/copy";
import {
  correoConfigurado,
  crearLimitador,
  EMAIL,
  enviarCorreo,
  fechaActual,
  ipDe,
  json,
  limpiar,
  limpiarMultilinea,
  origenPermitido,
} from "@/lib/correo";

/**
 * Recibe el formulario de contacto y lo manda por correo (ver `lib/correo.ts`
 * para el destinatario y las variables de entorno). No guarda nada. El correo
 * sale con «responder a» apuntando a la persona, para contestarle directamente.
 *
 * Los campos de lista cerrada (motivo y modalidad) se comprueban contra sus
 * valores permitidos y se traducen aquí a su etiqueta: una petición manipulada
 * no puede colar texto libre en ellos.
 */

const MAX_BYTES = 10_000;
const demasiadosEnvios = crearLimitador(5, 60 * 60 * 1000);

const MODALIDADES: Record<string, string> = {
  online: "Online",
  presencial: "Presencial en Madrid, si hay hueco",
  indiferente: "Sin preferencia",
};

const MOTIVOS: Record<string, string> = {
  "": "Sin especificar",
  otro: "Otro",
  ...Object.fromEntries(ESPACIOS.map((e) => [e.slug, e.titulo])),
};

export const Route = createFileRoute("/api/contacto")({
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
        const telefono = typeof cuerpo.telefono === "string" ? limpiar(cuerpo.telefono, 30) : "";
        const mensaje =
          typeof cuerpo.mensaje === "string" ? limpiarMultilinea(cuerpo.mensaje, 3_000) : "";
        const motivo = typeof cuerpo.motivo === "string" ? cuerpo.motivo : "";
        const modalidad = typeof cuerpo.modalidad === "string" ? cuerpo.modalidad : "";

        if (
          !nombre ||
          email.length > 254 ||
          !EMAIL.test(email) ||
          !/^[\d\s+()\-.]*$/.test(telefono) ||
          !(motivo in MOTIVOS) ||
          !(modalidad in MODALIDADES) ||
          cuerpo.consentimiento !== true
        ) {
          return json({ error: "datos" }, 400);
        }

        if (demasiadosEnvios(ipDe(request))) return json({ error: "limite" }, 429);

        const texto = [
          "Nuevo mensaje desde el formulario de contacto",
          fechaActual(),
          "",
          `Nombre: ${nombre}`,
          `Correo: ${email}`,
          ...(telefono ? [`Teléfono: ${telefono}`] : []),
          `Motivo de consulta: ${MOTIVOS[motivo]}`,
          `Modalidad preferida: ${MODALIDADES[modalidad]}`,
          "",
          "Mensaje:",
          mensaje || "(sin mensaje)",
          "",
          "La persona ha marcado: «He leído la política de privacidad y consiento el tratamiento",
          "de mis datos con la única finalidad de responder a esta consulta».",
          "",
          "Puedes responder a este correo y llegará a la persona que ha escrito.",
        ].join("\n");

        const estado = await enviarCorreo({
          asunto: `Primer contacto de ${nombre}`,
          texto,
          responderA: email,
          etiqueta: "contacto",
        });
        if (estado !== "ok") return json({ error: "envio" }, 502);

        return json({ ok: true });
      },
    },
  },
});
