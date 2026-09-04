/**
 * RESEÑAS Y TESTIMONIOS
 * ------------------------------------------------------------------
 * ⚠️  IMPORTANTE ANTES DE PUBLICAR
 *
 * Los testimonios de `RESENAS` son los que ya figuraban en la web
 * anterior. Melissa pidió sustituirlos por las reseñas REALES de su
 * ficha de Google Business Profile.
 *
 *   1. Copia aquí las reseñas reales (texto, nombre y fecha) en
 *      `RESENAS_GOOGLE`, marcándolas con `verificada: true`.
 *   2. Rellena `GOOGLE.perfilUrl` y `GOOGLE.resenasUrl` en site.ts.
 *   3. Elimina de `RESENAS` cualquier testimonio que no esté
 *      autorizado por escrito por la persona que lo escribió.
 *
 * Publicar testimonios no verificados puede constituir publicidad
 * engañosa (Ley 34/1988 General de Publicidad) y vulnera el código
 * deontológico. Este bloque es el único del sitio que requiere una
 * revisión manual antes de salir a producción.
 */

export type Resena = {
  texto: string;
  nombre: string;
  contexto?: string;
  /** true solo si procede de Google Business Profile o hay consentimiento firmado. */
  verificada: boolean;
  fecha?: string;
  estrellas?: 1 | 2 | 3 | 4 | 5;
  /** Si es false, no se renderiza en la web. */
  publicar: boolean;
};

/** Reseñas verificadas importadas de Google Business Profile. */
export const RESENAS_GOOGLE: Resena[] = [
  // Ejemplo de formato — sustituir por las reseñas reales:
  // {
  //   texto: "…",
  //   nombre: "Nombre A.",
  //   fecha: "2026-05-12",
  //   estrellas: 5,
  //   verificada: true,
  //   publicar: true,
  // },
];

/** Testimonios heredados de la web anterior. Pendientes de verificación. */
export const RESENAS: Resena[] = [
  {
    texto:
      "Melissa tiene una forma muy particular de acompañar. Nunca me sentí juzgada, y por primera vez pude mirar mi historia con comprensión en lugar de dureza.",
    nombre: "Laura M.",
    contexto: "Proceso de autoestima",
    verificada: false,
    publicar: true,
  },
  {
    texto:
      "Aprendí que descansar no es debilidad. Su trabajo con la autoexigencia ha cambiado mi manera de relacionarme conmigo y con los demás.",
    nombre: "Andrea R.",
    contexto: "Autoexigencia y perfeccionismo",
    verificada: false,
    publicar: true,
  },
  {
    texto:
      "Un espacio realmente seguro. Cada sesión es cuidada, profunda y muy humana. Salgo con herramientas concretas y con más claridad.",
    nombre: "Clara S.",
    contexto: "Ansiedad e inseguridad",
    verificada: false,
    publicar: true,
  },
];

/** Todas las reseñas publicables, con las verificadas primero. */
export const RESENAS_PUBLICADAS: Resena[] = [...RESENAS_GOOGLE, ...RESENAS].filter(
  (r) => r.publicar,
);

export const HAY_RESENAS_VERIFICADAS = RESENAS_GOOGLE.some((r) => r.publicar);
