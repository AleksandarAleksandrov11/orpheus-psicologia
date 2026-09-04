/**
 * CONFIGURACIÓN GLOBAL DEL SITIO
 * ------------------------------------------------------------------
 * Este es el único fichero que hay que tocar para actualizar datos de
 * contacto, identidad fiscal o enlaces externos. Todo lo demás (SEO,
 * datos estructurados, pie de página, avisos legales) lee de aquí.
 *
 * Los valores marcados con «PENDIENTE» deben completarse antes de
 * publicar: son obligatorios por la LSSI-CE y el RGPD.
 */

/** Marcador de dato pendiente de confirmar por la clienta. */
export const PENDIENTE = (etiqueta: string) => `[falta ${etiqueta}]`;

export const SITE = {
  /** Dominio canónico, sin barra final. Configurable en Vercel con VITE_SITE_URL. */
  url:
    (import.meta.env?.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") ??
    "https://www.orpheuspsicologia.com",

  name: "Orpheus Psicología",
  shortName: "Orpheus",
  locale: "es_ES",
  lang: "es",
  country: "ES",

  /** Profesional */
  psicologa: {
    nombre: "Melissa González",
    titulo: "Psicóloga General Sanitaria",
    // Nº de colegiada: obligatorio mostrarlo públicamente (Ley 44/2003).
    colegiada: "M-39711",
    colegio: "Colegio Oficial de la Psicología de Madrid",
  },

  /** Identidad del titular de la web (obligatorio en el aviso legal) */
  titular: {
    /** Nombre completo tal y como consta en el DNI. */
    nombre: "Melissa Milagros González Rodríguez",
    nif: "50554289J",
    domicilio: "Calle Camarena 193, 6D, Madrid",
    actividad: "Servicios de psicología clínica y sanitaria",
  },

  /** Contacto */
  contacto: {
    email: "orpheuspsicologia@gmail.com",
    telefono: PENDIENTE("teléfono"),
    telefonoHref: "",
    whatsapp: "",
    ciudad: "Madrid",
    region: "Comunidad de Madrid",
    direccion: PENDIENTE("dirección de consulta"),
    horario: "Lunes a viernes, de 9:00 a 20:00",
    respuesta: "Respondo personalmente en un máximo de 48 h laborables.",
  },

  /** Redes y perfiles externos */
  social: {
    instagram: "https://www.instagram.com/orpheus.psicologia/",
    instagramHandle: "@orpheus.psicologia",
    linkedin: "",
    /** Ficha de Google Business Profile — de aquí salen las reseñas verificadas. */
    google: PENDIENTE("enlace a la ficha de Google"),
    googleReviews: PENDIENTE("enlace a las reseñas de Google"),
  },

  /** Modalidades de atención */
  modalidades: ["Terapia online", "Sesiones presenciales en Madrid"],

  /** Correo para ejercer derechos RGPD */
  privacidad: {
    email: "orpheuspsicologia@gmail.com",
    autoridad: "Agencia Española de Protección de Datos (www.aepd.es)",
  },
} as const;

/** ¿Está un valor todavía sin completar? Útil para ocultar bloques vacíos. */
export const esPendiente = (v: string) => v.startsWith("[") && v.endsWith("pendiente]");

export type NavLink = { to: string; label: string; descripcion?: string };

/**
 * `as const satisfies` conserva los literales de ruta, que es lo que exige el
 * tipado estricto de `<Link to>` del enrutador.
 */
export const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/sobre-mi", label: "Sobre mí", descripcion: "Mi historia y mi forma de trabajar" },
  { to: "/servicios", label: "Terapia", descripcion: "Cómo puedo acompañarte" },
  { to: "/testimonios", label: "Reseñas", descripcion: "Lo que cuentan quienes ya han venido" },
  { to: "/diario", label: "Diario", descripcion: "Artículos para comprenderte mejor" },
  { to: "/contacto", label: "Contacto", descripcion: "Da el primer paso" },
] as const satisfies readonly NavLink[];

export const LEGAL_NAV = [
  { to: "/aviso-legal", label: "Aviso legal" },
  { to: "/politica-de-privacidad", label: "Política de privacidad" },
  { to: "/politica-de-cookies", label: "Política de cookies" },
] as const satisfies readonly NavLink[];

/** Fecha de última revisión de los textos legales (formato ISO). */
export const LEGAL_ACTUALIZADO = "2026-09-04";
