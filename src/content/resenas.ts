/**
 * RESEÑAS
 * ------------------------------------------------------------------
 * Todas las reseñas de este fichero son REALES y proceden de la ficha
 * de Google Business Profile de Orpheus Psicología. Se reproducen con
 * el texto y el nombre público tal y como aparecen en Google.
 *
 * Notas para futuras actualizaciones:
 *
 *  · `fecha` es una aproximación calculada a partir de la marca
 *    relativa que muestra Google («hace 2 meses», «hace 10 meses»…).
 *    Sirve para ordenar y para mostrar mes y año, nunca un día exacto.
 *  · `estrellas` se deja sin definir a propósito: la puntuación
 *    concreta de cada reseña no se ha volcado desde Google, y la web
 *    no inventa valoraciones. En cuanto se conozcan basta con añadir
 *    `estrellas: 5` a cada entrada y las estrellas aparecerán solas.
 *  · No se publica ninguna puntuación media ni recuento agregado por
 *    el mismo motivo.
 *  · Para añadir una reseña nueva: copia el texto literal, el nombre
 *    público y la fecha aproximada, y marca `verificada: true`.
 */

export type Resena = {
  texto: string;
  nombre: string;
  /** Contexto del proceso, solo si la propia reseña lo menciona. */
  contexto?: string;
  /** true si procede de Google Business Profile o hay consentimiento escrito. */
  verificada: boolean;
  /** Fecha aproximada en ISO, derivada de la marca relativa de Google. */
  fecha?: string;
  estrellas?: 1 | 2 | 3 | 4 | 5;
  /** Si es false, no se renderiza en la web. */
  publicar: boolean;
  /** Destacar en la portada y en las posiciones principales. */
  destacada?: boolean;
  /** Reseña relativa al servicio para empresas. */
  empresa?: boolean;
};

/** Reseñas verificadas importadas de Google Business Profile. */
export const RESENAS_GOOGLE: Resena[] = [
  {
    texto:
      "Conocer a Melissa en un momento de mi vida, donde había tocado fondo en todos los sentidos de mi vida, me hizo poder ver algo de luz entre tantas sombras. Esto ha siendo un camino largo, he pasado momentos muy duros, pero gracias a Melissa he sabido sobrellevar muchos de ellos con una actitud y con una visión mucho más positiva y sana. Me ha hecho entender cosas, me he sentido escuchada y comprendida, me ha hecho sentirme tan cómoda y tan a gusto, que no me costaba abrirme a ella y contarle todos mis miedos, mis dudas, todas las penas que llevaba arrastrando tanto tiempo. Además, radia un cariño tan natural, que hoy en día cuesta encontrar en muchos profesionales. Melissa, gracias por todo y no dudaré en visitarte tantas veces lo necesite.",
    nombre: "Gema",
    fecha: "2026-05-01",
    verificada: true,
    publicar: true,
    destacada: true,
  },
  {
    texto:
      "Melisa es una psicóloga excepcional, a parte de la profesionalidad que posee y demuestra en cada sesión, ir a terapia con ella es como estar con una amiga, desde el día uno te hace sentir súper cómoda y acogida. Además se nota la pasión por su trabajo, se supera cada día para dar todo de ella con cada paciente. Es una experiencia y una profesional que le recomendaría (y lo he hecho) a cualquier familiar o amigo, porque de verdad merece la pena probar sus sesiones. Simplemente es la mejor.",
    nombre: "Lola Díaz",
    fecha: "2026-07-01",
    verificada: true,
    publicar: true,
    destacada: true,
  },
  {
    texto:
      "Melissa es una increíble profesional. Solo puedo darle las gracias. Desde el primer minuto trasmite una confianza que, junto a su profesionalidad y capacidad de escucha, hace que no te sientas incomoda al abrir tus pensamientos. Hace que sientas el espacio cómodo y seguro. Me ha ayudado a entender más mis emociones y a dar otra visión a las cosas, ayudándome así a gestionar la ansiedad. La recomiendo al 100%.",
    nombre: "Elena Arma",
    contexto: "Gestión emocional y ansiedad",
    fecha: "2026-08-21",
    verificada: true,
    publicar: true,
    destacada: true,
  },
  {
    texto:
      "Solo puedo dar las gracias. A parte de la profesionalidad quiero destacar el interés y el cuidado genuino que ofrece Melissa. Es un gusto trabajar con ella, que te guíe y que te regale un espacio para expresarte sin reparos. Acudir a ella es de las mejores decisiones que he tomado.",
    nombre: "R. B. G.",
    fecha: "2026-03-01",
    verificada: true,
    publicar: true,
  },
  {
    texto:
      "Buenísima profesional. Muy atenta. Me ha dado todo lo que necesitaba, que era mucho, y me ha ayudado a ser mucho más feliz, que al fin y al cabo es lo que todos buscamos.",
    nombre: "Esme Nombela",
    fecha: "2026-07-01",
    verificada: true,
    publicar: true,
  },
  {
    texto:
      "Melissa es una profesional de 10! Sabe escuchar y sostener muy bien. Me ha ayudado mucho y lo sigue haciendo. Muchas gracias Melissa!",
    nombre: "Nerea Aparicio",
    fecha: "2026-07-01",
    verificada: true,
    publicar: true,
  },
  {
    texto:
      "Mi experiencia en terapia con Melissa ha sido muy buena. Me he sentido escuchada, comprendida y acompañada en todo momento. Ha sido un proceso muy valioso a nivel personal y siempre estaré agradecida.",
    nombre: "María García",
    fecha: "2025-10-01",
    verificada: true,
    publicar: true,
  },
  {
    texto:
      "Mi experiencia con Melisa ha sido muy satisfactoria. Te sientes acompañada desde el primer momento que empiezas el proceso terapéutico. Recomiendo 100%",
    nombre: "Ainhoa Barranco",
    fecha: "2025-11-01",
    verificada: true,
    publicar: true,
  },
  {
    texto:
      "Ha sido un auténtico placer conocer a Melissa. Ya solo con su energía transmite paz y confianza. Muy buena profesional.",
    nombre: "Sofia Esteban",
    fecha: "2025-10-01",
    verificada: true,
    publicar: true,
  },
  {
    texto:
      "Melissa es una persona encantadora, dispuesta a escuchar y ayudarte. La recomiendo un montón, además es súper atenta.",
    nombre: "nekosadd",
    fecha: "2026-07-01",
    verificada: true,
    publicar: true,
  },
  {
    texto:
      "Ha sido un placer contactar con Melissa, un trato amigable desde el principio, pero también profesional y serio. He aprendido muchísimo a través de ejercicios y reflexiones. No puedo hacer más que recomendarla y mandarle un saludo.",
    nombre: "Patry C",
    fecha: "2026-09-08",
    verificada: true,
    publicar: true,
  },
  {
    texto: "Simplemente perfecto.",
    nombre: "Carolina García Alonso",
    fecha: "2026-09-04",
    verificada: true,
    publicar: true,
  },
  {
    texto:
      "Estás guiando y acompañando mi proceso de autoconocimiento. Yo era una persona que se había valorado negativamente en muchos aspectos de mi vida, y hacerlo contigo ha sido fácil: hablar de ello, dándome pautas y alejando ideas y creencias negativas sobre mí. Valoro muy positivamente cómo llevas cada sesión: avanzamos y estoy reforzando mi autoestima. He mejorado la relación conmigo misma y el manejo de mis emociones, voy reconociendo qué me lleva a estresarme y dejo de culpabilizarme de todo. Ahora busco momentos en el día para parar y relajarme, me hablo con amabilidad y me animo a seguir.",
    nombre: "Mercedes Igual Vázquez",
    contexto: "Autoestima y gestión emocional",
    fecha: "2026-02-01",
    verificada: true,
    publicar: true,
    destacada: true,
  },
  {
    texto:
      "Nuestra experiencia con el equipo de Orpheus ha sido muy enriquecedora para nuestra empresa. Creemos que toda pequeña (y gran) empresa debería realizar este tipo de consultoría para poder mejorar y crecer. Nos han ayudado a visibilizar aquello que había que mejorar y nos han dado pautas y estrategias para abarcar nuestro sector con eficacia y profesionalidad. Todo ello de una manera dinámica, fluida y adaptada a nuestras posibilidades.",
    nombre: "Sara Saiz Llata",
    contexto: "Intervención para empresas",
    fecha: "2025-11-01",
    verificada: true,
    publicar: true,
    empresa: true,
  },
];

/**
 * Testimonios recogidos fuera de Google. Vacío: los tres que había en la
 * web anterior se retiraron al no estar verificados.
 */
export const RESENAS: Resena[] = [];

/** Ordenadas de la más reciente a la más antigua. */
const porFecha = (a: Resena, b: Resena) => (b.fecha ?? "").localeCompare(a.fecha ?? "");

/** Todas las reseñas publicables. */
export const RESENAS_PUBLICADAS: Resena[] = [...RESENAS_GOOGLE, ...RESENAS]
  .filter((r) => r.publicar)
  .sort(porFecha);

/** Las tres que abren la portada. */
export const RESENAS_DESTACADAS: Resena[] = RESENAS_PUBLICADAS.filter(
  (r) => r.destacada && !r.empresa,
);

/** Reseñas del servicio para equipos. */
export const RESENAS_EMPRESA: Resena[] = RESENAS_PUBLICADAS.filter((r) => r.empresa);

export const HAY_RESENAS_VERIFICADAS = RESENAS_PUBLICADAS.some((r) => r.verificada);

/** Número de reseñas publicadas. Es un recuento real, no una media inventada. */
export const TOTAL_RESENAS = RESENAS_PUBLICADAS.length;

const MESES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

/**
 * «julio de 2026» — granularidad honesta para una fecha aproximada.
 * Sin `Intl` a propósito: así el servidor y el navegador producen siempre
 * la misma cadena y no hay desajustes de hidratación.
 */
export function mesDeResena(iso?: string): string | null {
  if (!iso) return null;
  const partes = /^(\d{4})-(\d{2})/.exec(iso);
  if (!partes) return null;
  const mes = MESES[Number(partes[2]) - 1];
  return mes ? `${mes} de ${partes[1]}` : partes[1];
}
