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
    "https://orpheuspsicologia.com",

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

  /** Contacto (datos de la tarjeta de la consulta) */
  contacto: {
    email: "orpheuspsicologia@gmail.com",
    telefono: "+34 624 37 30 87",
    telefonoHref: "+34624373087",
    whatsapp: "https://wa.me/34624373087",
    ciudad: "Madrid",
    region: "Comunidad de Madrid",
    direccion: PENDIENTE("dirección de consulta"),
    horario: "Lunes a viernes, de 9:00 a 20:00",
    respuesta: "Respondo personalmente en un máximo de 48 h laborables.",
  },

  /** Redes y perfiles externos */
  social: {
    instagram: "https://www.instagram.com/orpheus_psicologia/",
    instagramHandle: "@orpheus_psicologia",
    linkedin: "",
    /**
     * Reseñas públicas en Google. Enlace facilitado por Melissa.
     * Si algún día dejara de funcionar, el sustituto estable es el enlace
     * corto «Pedir reseñas» de su perfil de Google Business.
     */
    google:
      "https://www.google.com/search?sca_esv=3c55bf5454ea7bc9&rlz=1C1CHBF_esES1078ES1078&sxsrf=APpeQntwI8PTLc-YNOTitstxxBsvV_Lgfg:1788551795224&q=orpheus+psicologia&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_wQUKsrugIk-GK2TKAx1AuFfRbwP7Eb4sZ1g9hOn_lGKP7oA9yXkpye9QUZj72bprJRldX8%3D&uds=AJ5uw1-YMpuyF7uCL7tivJR8dYckATjsfvSeKr5f9rA8L5FmJhTtUvDWjz1pQfCMZPTsxc8SlFa0eULMeew8RuqpVtuS9KybXs4mF1TTXYhR4Uc8wRcawno&sa=X&ved=2ahUKEwifparT2tWWAxXk9LsIHe_ILwkQ3PALegQIKhAF&biw=1745&bih=835&dpr=1.1#sv=CAESzQEKuQEStgEKd0FKaVQ0dElWdjlKQjhTYkY2RkZDbG5BMlFNVk81YnNwR0RQbFZRYmo0SGJ4VWZ0VHpDWmJSbEZhTWt2NndYc0YxcWdJbk9OMXlmUlJHY2V0Z29FellYdFVLa2R6ZmltREowVzJJNkwwUGZ3LUlTeGRpNUlsc3RVEhdkaUtiYXRDQklweTc5dThQak5xVzBBNBoiQURzcjlmUTZlTjJVdUh3RVpfUHBIXzhDbkFxdGYwVTYwdxIEODA1MRoBMyoAMAA4AUAAGAAgu8KE9Q1KAhAB",
    googleReviews:
      "https://www.google.com/search?sca_esv=3c55bf5454ea7bc9&rlz=1C1CHBF_esES1078ES1078&sxsrf=APpeQntwI8PTLc-YNOTitstxxBsvV_Lgfg:1788551795224&q=orpheus+psicologia&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_wQUKsrugIk-GK2TKAx1AuFfRbwP7Eb4sZ1g9hOn_lGKP7oA9yXkpye9QUZj72bprJRldX8%3D&uds=AJ5uw1-YMpuyF7uCL7tivJR8dYckATjsfvSeKr5f9rA8L5FmJhTtUvDWjz1pQfCMZPTsxc8SlFa0eULMeew8RuqpVtuS9KybXs4mF1TTXYhR4Uc8wRcawno&sa=X&ved=2ahUKEwifparT2tWWAxXk9LsIHe_ILwkQ3PALegQIKhAF&biw=1745&bih=835&dpr=1.1#sv=CAESzQEKuQEStgEKd0FKaVQ0dElWdjlKQjhTYkY2RkZDbG5BMlFNVk81YnNwR0RQbFZRYmo0SGJ4VWZ0VHpDWmJSbEZhTWt2NndYc0YxcWdJbk9OMXlmUlJHY2V0Z29FellYdFVLa2R6ZmltREowVzJJNkwwUGZ3LUlTeGRpNUlsc3RVEhdkaUtiYXRDQklweTc5dThQak5xVzBBNBoiQURzcjlmUTZlTjJVdUh3RVpfUHBIXzhDbkFxdGYwVTYwdxIEODA1MRoBMyoAMAA4AUAAGAAgu8KE9Q1KAhAB",
  },

  /**
   * Modalidades de atención. La web está dirigida principalmente a la
   * terapia online, sin cerrar la puerta a la presencial en Madrid.
   */
  modalidades: ["Terapia online en toda España", "Presencial en Madrid según disponibilidad"],

  /** Correo para ejercer derechos RGPD */
  privacidad: {
    email: "orpheuspsicologia@gmail.com",
    autoridad: "Agencia Española de Protección de Datos (www.aepd.es)",
  },
} as const;

/** ¿Está un valor todavía sin completar? Útil para ocultar bloques vacíos. */
export const esPendiente = (v: string) => v.startsWith("[") && v.endsWith("pendiente]");

export type NavLink = {
  to: string;
  label: string;
  descripcion?: string;
  /** Enlaces que cuelgan de esta entrada en el menú desplegable. */
  hijos?: readonly NavLink[];
};

/**
 * `as const satisfies` conserva los literales de ruta, que es lo que exige el
 * tipado estricto de `<Link to>` del enrutador.
 */
export const NAV = [
  { to: "/", label: "Inicio", descripcion: "Volver a la página principal" },
  {
    to: "/sobre-mi",
    label: "Sobre mí",
    descripcion: "Mi historia y mi forma de trabajar",
    hijos: [
      { to: "/sobre-mi", label: "Sobre mí", descripcion: "Mi historia y mi forma de trabajar" },
      {
        to: "/por-que-orpheus",
        label: "Por qué Orpheus",
        descripcion: "El mito que da nombre al proyecto",
      },
    ],
  },
  {
    to: "/servicios",
    label: "Servicios",
    descripcion: "Terapia individual y acompañamiento a equipos",
    hijos: [
      {
        to: "/servicios",
        label: "Terapia individual",
        descripcion: "Online en toda España, presencial en Madrid",
      },
      {
        to: "/empresas",
        label: "Para empresas",
        descripcion: "Bienestar emocional en entornos de trabajo",
      },
      {
        to: "/preguntas-frecuentes",
        label: "Preguntas frecuentes",
        descripcion: "Las dudas de siempre, respondidas",
      },
    ],
  },
  { to: "/diario", label: "Diario", descripcion: "Artículos para comprenderte mejor" },
  { to: "/testimonios", label: "Reseñas", descripcion: "Quienes han caminado este proceso" },
  { to: "/contacto", label: "Contacto", descripcion: "Da el primer paso" },
] as const satisfies readonly NavLink[];

/**
 * Mapa del sitio para el pie de página: la navegación completa, ya sin
 * anidar. Se escribe aparte porque aplanar la tupla de `NAV` haría perder
 * los literales de ruta que necesita `<Link to>`.
 */
export const NAV_PLANO = [
  { to: "/", label: "Inicio" },
  { to: "/sobre-mi", label: "Sobre mí" },
  { to: "/por-que-orpheus", label: "Por qué Orpheus" },
  { to: "/servicios", label: "Terapia individual" },
  { to: "/empresas", label: "Para empresas" },
  { to: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
  { to: "/diario", label: "Diario" },
  { to: "/testimonios", label: "Reseñas" },
  { to: "/contacto", label: "Contacto" },
] as const satisfies readonly NavLink[];

export const LEGAL_NAV = [
  { to: "/aviso-legal", label: "Aviso legal" },
  { to: "/politica-de-privacidad", label: "Política de privacidad" },
  { to: "/politica-de-cookies", label: "Política de cookies" },
] as const satisfies readonly NavLink[];

/** Fecha de última revisión de los textos legales (formato ISO). */
export const LEGAL_ACTUALIZADO = "2026-09-06";
