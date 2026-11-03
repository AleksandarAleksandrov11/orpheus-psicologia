/**
 * TEST DE AUTOEXIGENCIA
 * ------------------------------------------------------------------
 * Veinte afirmaciones puntuadas de 0 a 4, agrupadas por ámbitos. Es una
 * herramienta divulgativa, no una prueba validada ni diagnóstica.
 *
 * Este fichero lo leen a la vez el navegador (para mostrar el resultado) y
 * el servidor (para recalcular la puntuación y redactar el correo): el
 * servidor solo se fía de las cifras que llegan, nunca del texto, así que
 * una petición manipulada no puede inventarse preguntas ni puntuaciones.
 */

export const OPCIONES = [
  "Nunca",
  "Casi nunca",
  "A veces",
  "Frecuentemente",
  "Casi siempre",
] as const;

export const PREGUNTAS = [
  [
    "Perfeccionismo y miedo al error",
    "Me cuesta dar por terminado algo porque siempre encuentro detalles que podría mejorar.",
  ],
  [
    "Perfeccionismo y miedo al error",
    "Cuando cometo un error, tiendo a darle muchas vueltas y me cuesta dejar de pensar en él.",
  ],
  [
    "Perfeccionismo y miedo al error",
    "Siento que las cosas tienen que salir muy bien para poder sentirme satisfecho/a conmigo mismo/a.",
  ],
  [
    "Rendimiento laboral y académico",
    "Siento que nunca hago suficiente, incluso cuando he trabajado mucho o he conseguido mis objetivos.",
  ],
  [
    "Rendimiento laboral y académico",
    "Me cuesta desconectar del trabajo o de mis responsabilidades porque pienso que siempre podría estar haciendo algo más.",
  ],
  [
    "Rendimiento laboral y académico",
    "Cuando no alcanzo los resultados que esperaba, siento que he fracasado o que no he estado a la altura.",
  ],
  [
    "Descanso y autocuidado",
    "Me siento culpable cuando descanso o dedico tiempo a actividades que no considero productivas.",
  ],
  [
    "Descanso y autocuidado",
    "Suelo anteponer mis obligaciones a mis necesidades de descanso, ocio o bienestar.",
  ],
  ["Descanso y autocuidado", "Me cuesta disfrutar del tiempo libre si tengo tareas pendientes."],
  [
    "Relaciones y expectativas externas",
    "Me preocupa decepcionar a los demás y me cuesta aceptar que alguien pueda estar descontento conmigo.",
  ],
  [
    "Relaciones y expectativas externas",
    "Me cuesta decir que no, incluso cuando hacerlo supone sobrecargarme.",
  ],
  [
    "Relaciones y expectativas externas",
    "Siento que debo demostrar que soy una buena persona, una buena pareja, un buen amigo/a o un buen profesional.",
  ],
  [
    "Autoestima y diálogo interno",
    "Soy mucho más crítico/a conmigo mismo/a que con otras personas cuando cometo un error.",
  ],
  [
    "Autoestima y diálogo interno",
    "Me cuesta reconocer mis logros y suelo centrarme más en lo que todavía me falta por conseguir.",
  ],
  [
    "Autoestima y diálogo interno",
    "Siento que mi valor personal depende en gran medida de lo que hago, consigo o aporto a los demás.",
  ],
  [
    "Control y necesidad de seguridad",
    "Me cuesta delegar tareas porque pienso que los demás no las harán tan bien como yo.",
  ],
  [
    "Control y necesidad de seguridad",
    "Necesito tener las cosas planificadas y bajo control para sentirme tranquilo/a.",
  ],
  [
    "Gestión emocional",
    "Me cuesta permitirme sentir emociones como tristeza, miedo, frustración o inseguridad porque considero que debería poder gestionarlas mejor.",
  ],
  [
    "Imagen personal y expectativas propias",
    "Me comparo con otras personas y siento que debería estar más avanzado/a en mi vida o haber conseguido más cosas.",
  ],
  [
    "Imagen personal y expectativas propias",
    "Me cuesta aceptar mis limitaciones y siento que debería poder con todo sin necesitar ayuda.",
  ],
] as const;

export const TOTAL_PREGUNTAS = PREGUNTAS.length;
export const MAX_PUNTOS = TOTAL_PREGUNTAS * 4;

export type Respuestas = readonly number[];

/** Rangos de interpretación, de menor a mayor puntuación. */
const NIVELES = [
  {
    hasta: 20,
    titulo: "Autoexigencia baja o flexible",
    texto:
      "Tus respuestas sugieren cierta flexibilidad para establecer expectativas, aceptar errores y atender tus necesidades.",
  },
  {
    hasta: 40,
    titulo: "Autoexigencia presente",
    texto:
      "La autoexigencia puede aparecer en algunos momentos o ámbitos. Puede ser útil observar cuándo te cuesta parar, reconocer tus logros o aceptar errores.",
  },
  {
    hasta: 60,
    titulo: "Autoexigencia significativa",
    texto:
      "Tus respuestas muestran una tendencia notable a exigirte. Conviene explorar cómo influye en tu descanso, tus relaciones y la forma en que te valoras.",
  },
  {
    hasta: MAX_PUNTOS,
    titulo: "Autoexigencia muy presente",
    texto:
      "La autoexigencia parece ocupar un lugar importante en distintas áreas. Puede ser valioso comprender qué mantiene este patrón y cómo afecta a tu bienestar.",
  },
] as const;

/** ¿Es un vector de respuestas completo y con valores válidos (0 a 4)? */
export function respuestasValidas(r: unknown): r is number[] {
  return (
    Array.isArray(r) &&
    r.length === TOTAL_PREGUNTAS &&
    r.every((v) => Number.isInteger(v) && v >= 0 && v <= OPCIONES.length - 1)
  );
}

export function calcular(respuestas: Respuestas) {
  const total = respuestas.reduce((suma, v) => suma + v, 0);
  const nivel = NIVELES.find((n) => total <= n.hasta) ?? NIVELES[NIVELES.length - 1];

  const ambitos = [...new Set(PREGUNTAS.map((p) => p[0]))].map((nombre) => {
    const indices = PREGUNTAS.flatMap((p, i) => (p[0] === nombre ? [i] : []));
    const puntos = indices.reduce((suma, i) => suma + respuestas[i], 0);
    const max = indices.length * 4;
    return { nombre, puntos, max, porcentaje: Math.round((puntos / max) * 100) };
  });

  return { total, nivel, ambitos };
}
