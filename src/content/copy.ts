/**
 * TEXTOS DEL SITIO
 * ------------------------------------------------------------------
 * Todo el contenido editorial vive aquí, separado de la maquetación,
 * para que pueda revisarse y ampliarse sin tocar los componentes.
 * Las frases marcadas como «literal» proceden del briefing de Melissa.
 */

/* ══════════════════════════════════════════════════════════════════
   INICIO — mensaje principal
   ══════════════════════════════════════════════════════════════════ */

export const HERO = {
  eyebrow: "Melissa González · Psicóloga General Sanitaria",
  titulo: ["No necesitas", "exigirte más", "para sentirte", "suficiente."],
  /** Primera línea del titular que va en cursiva. */
  cursiva: 2,
  entradilla:
    "Psicóloga online para la autoestima y la autoexigencia. Comprender lo que te pasa, transformar aquello que te limita y construir una relación más amable contigo.",
  ctaPrincipal: { label: "Reservar una primera sesión", to: "/contacto" },
  ctaSecundario: { label: "Ver servicios", to: "/servicios" },
  sellos: ["Terapia integradora", "Online en toda España", "Espacio sin juicio"],
} as const;

/** Frase alternativa propuesta por la clienta, usada como cierre del hero. */
export const HERO_ALT = {
  titulo: "Dejar de luchar contigo también es una forma de avanzar.",
  entradilla:
    "Una terapia para comprender tu mundo interno, fortalecer la relación contigo y aprender a vivir desde un lugar más seguro, libre y coherente.",
} as const;

/* ══════════════════════════════════════════════════════════════════
   ORPHEUS — el mito y la filosofía
   ══════════════════════════════════════════════════════════════════ */

export const MITO = {
  eyebrow: "Por qué Orpheus",
  titulo: "Descender para poder elevarse.",
  cuerpo: [
    "El nombre viene del mito de Orfeo, quien desciende al inframundo movido por el amor y la necesidad de recuperar a Eurídice.",
    "Para mí simboliza ese viaje hacia dentro que muchas veces supone un proceso terapéutico: atreverse a mirar lo que duele, atravesar la oscuridad y regresar transformado. No para volver a ser quien eras, sino para encontrarte de una manera más consciente y auténtica.",
  ],
  cita: "Para poder transformarnos, primero necesitamos atrevernos a mirarnos.",
} as const;

export const FILOSOFIA = {
  eyebrow: "Una psicología que no quiere corregirte",
  parrafos: [
    "Orpheus entiende el proceso terapéutico como un descenso hacia aquello que no siempre queremos o sabemos mirar: nuestras heridas, emociones, patrones, miedos, contradicciones y partes desconocidas.",
    "Porque solo cuando somos capaces de descender hacia ellas podemos después elevarnos: vivir con más libertad, coherencia, serenidad y sentido.",
    "Aquí no creemos que haya nada roto en ti que tengas que arreglar. Creemos que muchas veces necesitamos comprender antes de cambiar.",
    "Por eso mi trabajo no consiste en darte una lista de consejos para que seas una versión «mejor» de ti, sino en ayudarte a entender qué hay detrás de lo que sientes, identificar los patrones que hoy te están limitando y construir nuevas formas de relacionarte contigo y con los demás.",
  ],
  sinLista: [
    "Sin etiquetas que te definan.",
    "Sin recetas universales.",
    "Sin exigirte convertirte en otra persona.",
  ],
} as const;

export const PROCESO_VIVO = {
  eyebrow: "Una persona en construcción",
  parrafos: [
    "Trabajamos para que puedas comprenderte, conocerte y elegirte. Porque no eres un conjunto fijo de características, etiquetas o diagnósticos.",
    "Eres una persona que puede cambiar, aprender, descubrir nuevas partes de sí misma y construir nuevas formas de relacionarse con su mundo.",
  ],
  cita: ["No eres un producto terminado.", "Eres un proceso."],
} as const;

/* ══════════════════════════════════════════════════════════════════
   ¿TE RECONOCES?
   ══════════════════════════════════════════════════════════════════ */

export const RECONOCES = {
  eyebrow: "¿Te reconoces?",
  titulo: "Quizá llevas tiempo sintiendo que…",
  items: [
    "Te exiges muchísimo y, aun así, nunca es suficiente.",
    "Dudas de ti incluso cuando las cosas van bien.",
    "Te comparas y siempre encuentras algo que mejorar.",
    "Te cuesta poner límites o elegirte sin sentir culpa.",
    "Te hablas con una dureza que no usarías con nadie más.",
    "Sabes que deberías confiar más en ti, pero no lo sientes.",
    "Te cuesta parar y descansar sin sentir que deberías hacer más.",
  ],
  /**
   * El octavo punto no encaja en la frase que encabeza la lista, así que
   * se presenta aparte, con su propia entrada.
   */
  ademas: {
    entrada: "Y quizá también esto: ",
    texto: "estás atravesando una ruptura, un duelo o un momento de cambio.",
  },
  cierre:
    "Y quizá lleves tiempo sabiendo lo que «deberías» hacer, sin saber cómo dejar de sentirte así.",
} as const;

/* ══════════════════════════════════════════════════════════════════
   LO QUE ENCONTRARÁS EN MÍ
   ══════════════════════════════════════════════════════════════════ */

export const VALORES = {
  eyebrow: "En este lugar",
  titulo: "Lo que encontrarás en este lugar.",
  items: [
    {
      clave: "Compromiso",
      lema: "Estar de verdad.",
      texto: "Me implico en tu proceso con responsabilidad, constancia y cuidado.",
    },
    {
      clave: "Autenticidad",
      lema: "Poder ser tú.",
      texto:
        "La terapia no debería ser otro lugar donde tengas que demostrar, agradar o hacerlo todo bien.",
    },
    {
      clave: "Curiosidad genuina",
      lema: "Querer comprenderte.",
      texto:
        "No doy nada por supuesto. Tu historia importa y quiero conocerla antes de intentar cambiarla.",
    },
    {
      clave: "Seguridad",
      lema: "Un lugar donde poder mirar.",
      texto:
        "Para explorar aquello que duele necesitamos sentir que podemos hacerlo sin juicio y a nuestro propio ritmo.",
    },
    {
      clave: "Claridad",
      lema: "Poner palabras al caos.",
      texto:
        "Te ayudo a ordenar lo que sientes, comprender de dónde viene y encontrar nuevas formas de afrontarlo.",
    },
  ],
  remate: "Entender lo que ocurre es muchas veces el primer paso para poder transformarlo.",
} as const;

/* ══════════════════════════════════════════════════════════════════
   ¿CÓMO TRABAJAREMOS? — recorrido no lineal
   ══════════════════════════════════════════════════════════════════ */

export const RECORRIDO = {
  eyebrow: "¿Cómo trabajaremos?",
  titulo: "La terapia no es una línea recta.",
  intro:
    "Hay avances, retrocesos y descubrimientos que llegan cuando menos los esperas. Esos vaivenes no son un fallo del proceso: son el proceso.",
  pasos: [
    {
      n: "01",
      t: "Comprender",
      d: "Entender qué te está pasando y por qué, antes de intentar cambiar nada.",
    },
    {
      n: "02",
      t: "Dar sentido",
      d: "Explorar tu historia y los patrones que te han traído hasta aquí.",
    },
    {
      n: "03",
      t: "Transformar",
      d: "Incorporar nuevas herramientas y formas de relacionarte contigo y con los demás.",
    },
    {
      n: "04",
      t: "Integrar",
      d: "Llevarte contigo lo aprendido y seguir avanzando por tu cuenta.",
    },
  ],
  cita: "No hay dos procesos iguales. Tu terapia tampoco debería serlo.",
  /** Etiquetas del diagrama «expectativa vs. realidad». */
  expectativa: ["Definir un objetivo", "Conseguirlo"],
  realidad: [
    "Definir un objetivo",
    "Empezar",
    "Dudar",
    "Aprender",
    "Practicar",
    "Fallar",
    "Perderse",
    "Entender",
    "Tener problemas",
    "Lograrlo",
  ],
} as const;

/* ══════════════════════════════════════════════════════════════════
   ESPACIOS DE TRABAJO
   ══════════════════════════════════════════════════════════════════ */

export const ENGRANAJE = {
  eyebrow: "Te acompaño en esto",
  titulo: "Entiendo al ser humano como un engranaje.",
  intro:
    "Lo que ocurre en tu autoestima toca tus relaciones, y lo que ocurre en tus relaciones toca tu forma de descansar, de trabajar y de hablarte. Por eso no aplico un protocolo cerrado: adapto el trabajo a lo que necesitas en cada momento.",
  /** Versión breve, para no repetir la entradilla larga en dos páginas. */
  introBreve:
    "Lo que ocurre en tu autoestima toca tus relaciones, tu descanso y tu forma de hablarte. Por eso el trabajo se adapta a ti y no al revés.",
  /** Encabeza la lista secundaria de áreas de trabajo. */
  otras: "Otras áreas en las que acompaño",
  cierre:
    "¿No ves aquí lo que te ocurre? Los motivos de consulta rara vez vienen con etiqueta. Escríbeme y lo miramos.",
} as const;

export type Espacio = {
  slug: string;
  titulo: string;
  breve: string;
  detalle: string;
  /** Áreas principales del nicho: encabezan la sección. */
  destacado?: boolean;
  /**
   * Texto del enlace a la ficha del área en /servicios. Cada destacada
   * lleva el suyo: tres enlaces con el mismo rótulo apuntando a tres
   * destinos distintos no se distinguen ni leídos en voz alta ni en el
   * informe de enlaces internos.
   */
  enlace?: string;
};

export const ESPACIOS: Espacio[] = [
  {
    slug: "autoestima",
    titulo: "Autoestima",
    breve: "Construir una relación sólida y coherente contigo.",
    detalle:
      "Trabajaremos en tu autoconcepto y autoconocimiento para construir una imagen sólida y realista de ti. El objetivo es que aprendas a valorarte sin depender de la valoración externa o del rendimiento, pudiendo sostenerte incluso cuando dudes.",
    enlace: "Trabajar la autoestima en terapia",
    destacado: true,
  },
  {
    slug: "autoexigencia",
    titulo: "Autoexigencia y perfeccionismo",
    breve: "Bajar la presión sin perder tus valores.",
    detalle:
      "Identificar de dónde viene la autoexigencia, trabajar la culpa social al descanso y redefinir el éxito desde tu propio criterio y no desde expectativas externas.",
    enlace: "Trabajar la autoexigencia en terapia",
    destacado: true,
  },
  {
    slug: "gestion-emocional",
    titulo: "Gestión emocional",
    breve: "Sentir, comprender y elegir.",
    detalle:
      "Aprender a reconocer lo que sientes, entender qué lo provoca y decidir cómo quieres responder, en lugar de que la emoción decida por ti.",
  },
  {
    slug: "ansiedad",
    titulo: "Ansiedad",
    breve: "Regular la alarma del cuerpo.",
    detalle:
      "Comprender qué mantiene tu ansiedad, aprender a acompañar la activación fisiológica y recuperar la sensación de tener margen de maniobra.",
  },
  {
    slug: "duelo",
    titulo: "Duelo",
    breve: "Acompañar la pérdida sin prisa.",
    detalle:
      "Un espacio para atravesar la ausencia a tu ritmo, sin plazos ni fases obligatorias, dando lugar a todo lo que aparece: pena, rabia, alivio o culpa.",
  },
  {
    slug: "ruptura-de-pareja",
    titulo: "Ruptura de pareja",
    breve: "Reconstruirte después del vínculo.",
    detalle:
      "Comprender qué ocurrió, sostener el vacío sin llenarlo a la fuerza y recuperar una relación contigo que no dependa de la otra persona.",
  },
  {
    slug: "crisis-vitales",
    titulo: "Crisis vitales y momentos de cambio",
    breve: "Cuando lo que servía deja de servir.",
    detalle:
      "Cambios de etapa, decisiones difíciles, mudanzas, maternidad, cambios profesionales: momentos en los que la identidad se mueve y necesita reordenarse.",
  },
  {
    slug: "depresion",
    titulo: "Depresión y estados de ánimo bajos",
    breve: "Volver a conectar con lo que te sostiene.",
    detalle:
      "Trabajo sobre la desconexión, la anhedonia y el diálogo interno, recuperando poco a poco la actividad, el vínculo y el sentido.",
  },
  {
    slug: "inseguridad",
    titulo: "Inseguridad",
    breve: "Confiar en tu propio criterio.",
    detalle:
      "Reconocer qué alimenta la duda constante, reducir el peso de la comparación y aprender a confiar en tu propio criterio incluso cuando no tengas la certeza o la validación que buscas.",
    enlace: "Trabajar la inseguridad en terapia",
    destacado: true,
  },
  {
    slug: "fobias",
    titulo: "Fobias y miedos específicos",
    breve: "Recuperar el terreno que el miedo te quitó.",
    detalle:
      "Exposición gradual y comprensión del mecanismo del miedo para que dejes de organizar tu vida alrededor de evitarlo.",
  },
  {
    slug: "habilidades-sociales",
    titulo: "Habilidades sociales y límites",
    breve: "Decir que no sin sentir que fallas.",
    detalle:
      "Asertividad, gestión del conflicto y límites: aprender a estar en los vínculos sin desaparecer dentro de ellos.",
  },
  {
    slug: "relaciones",
    titulo: "Relaciones y vínculos",
    breve: "Estar con otros sin perderte.",
    detalle:
      "Patrones de apego, dependencia emocional y dinámicas que se repiten: comprender cómo te vinculas para poder elegir cómo quieres hacerlo.",
  },
];

/* ══════════════════════════════════════════════════════════════════
   ENFOQUE / TERAPIA INTEGRADORA
   ══════════════════════════════════════════════════════════════════ */

export const ENFOQUE = {
  eyebrow: "Mi enfoque",
  titulo: "Trabajo desde un enfoque integrador.",
  intro:
    "Combino herramientas de distintos modelos con respaldo científico y elijo en cada momento las que mejor encajan contigo y con lo que estás atravesando.",
  modelos: [
    {
      t: "Terapia cognitivo-conductual",
      d: "Para trabajar pensamientos, conductas y patrones que se sostienen a sí mismos.",
    },
    {
      t: "Terapia de aceptación y compromiso (ACT)",
      d: "Para dejar de pelear con lo que sientes y avanzar hacia lo que de verdad te importa.",
    },
    {
      t: "Inteligencia emocional",
      d: "Para reconocer, nombrar y regular las emociones en lugar de silenciarlas.",
    },
    {
      t: "Terapia psicodramática",
      d: "Para poner en escena lo que cuesta explicar con palabras y verlo desde fuera.",
    },
  ],
} as const;

/* ══════════════════════════════════════════════════════════════════
   SOBRE MÍ — historia y formación
   ══════════════════════════════════════════════════════════════════ */

export const HISTORIA = {
  eyebrow: "Mi historia",
  titulo: "Descubrí la psicología buscando entenderme.",
  parrafos: [
    "Durante años viví bajo una autoexigencia silenciosa que confundía con responsabilidad. Me exigía ser perfecta, me hablaba con dureza y, aunque desde fuera mi vida podía parecer estable, por dentro muchas veces me sentía perdida.",
    "Había una parte de mí que dudaba constantemente de su propio valor y que repetía, casi en silencio: «no puedo».",
    "Fue precisamente ese camino personal el que me llevó a la psicología y terminó dando forma a la profesional que soy hoy.",
    "En ese proceso enterré una parte de mí: la que decía que no podía. No porque dejara de tener miedo o dudas, sino porque aprendí a escucharme de otra manera y a confiar progresivamente en mis propios recursos.",
    "Descubrí que no siempre necesitamos exigirnos más, adaptarnos más o intentar convertirnos en una versión mejor de nosotros mismos. A veces necesitamos parar, comprender qué nos está pasando y aprender a relacionarnos con nosotros mismos desde otro lugar.",
    "Por eso entiendo la psicoterapia como un espacio para conocernos, poner palabras a lo que sentimos y comprender los patrones que nos han acompañado hasta aquí. Un espacio desde el que poder construir una relación más segura con nosotros mismos y una vida más coherente con quienes somos.",
    "Hoy me apasiona acompañar a personas que se sienten desconectadas de sí mismas, atrapadas en la autoexigencia, la inseguridad, la ansiedad o la dificultad para reconocer su propio valor.",
    "Creo que una de mis mayores fortalezas como psicóloga es transformar el caos en claridad: ayudarte a poner palabras a aquello que quizá todavía no sabes cómo explicar, comprender de dónde viene y encontrar nuevas formas de afrontarlo.",
  ],
  cita: "La psicología, para mí, es un lugar donde volver a mirarse con respeto.",
  frase: "«No puedo.»",
} as const;

export const FORMACION = {
  eyebrow: "Formación y especialización",
  titulo: "Rigor que se actualiza.",
  items: [
    { t: "Graduada en Psicología", d: "Universidad Complutense de Madrid" },
    { t: "Máster en Psicología General Sanitaria", d: "Universidad Complutense de Madrid" },
    {
      t: "Programa avanzado en Inteligencia Emocional y Terapia Infantojuvenil",
      d: "UNIR · Universidad Internacional de La Rioja",
    },
    { t: "Formación especializada en autoestima", d: "Universidad Complutense de Madrid" },
    {
      t: "Formación en Psicoterapia Psicodramática",
      d: "Escuela de Psicoterapia y Psicodrama, Madrid",
    },
  ],
  nota: "La formación es un proceso continuo y sigo actualizándome para acompañar mejor a cada persona.",
} as const;

/* ══════════════════════════════════════════════════════════════════
   ESPACIO SEGURO / COMPROMISO
   ══════════════════════════════════════════════════════════════════ */

export const ESPACIO_SEGURO = {
  eyebrow: "Un espacio seguro. Siempre.",
  titulo: "Lo que sostiene el trabajo.",
  items: [
    {
      t: "Enfoque integrador",
      d: "Respaldamos la evidencia y la combinamos con un trato humano para adaptarnos a ti, en lugar de encajarte en una sola corriente.",
    },
    {
      t: "Confidencialidad total",
      d: "Todo lo que compartes queda protegido por el secreto profesional y por el código deontológico de la psicología.",
    },
    {
      t: "Ausencia de juicio",
      d: "Aquí no hay nada malo en ti que haya que corregir. Solo hay una historia por comprender.",
    },
    {
      t: "Tu ritmo",
      d: "No hay prisa por llegar a ningún sitio. Miramos lo que duele cuando te sientes preparado o preparada para mirarlo.",
    },
    {
      t: "Rigor y ética",
      d: "Formación continua, supervisión clínica y honestidad sobre lo que la terapia puede y no puede hacer.",
    },
  ],
} as const;

/* ══════════════════════════════════════════════════════════════════
   MODALIDADES Y SESIONES
   ══════════════════════════════════════════════════════════════════ */

/**
 * Tarifas.
 * ------------------------------------------------------------------
 * Son las mismas que Melissa publica hoy en su web: primera sesión a
 * precio reducido, sesión suelta y bono de cuatro sesiones. La web se
 * dirige a la terapia online; la presencial se valora caso por caso.
 */
export const MOSTRAR_PRECIOS = true;

export const SESIONES = [
  {
    slug: "primera-sesion",
    titulo: "Primera sesión",
    etiqueta: "Punto de partida",
    duracion: "60 minutos",
    canal: "Online",
    precio: "50 €",
    nota: "Precio reducido",
    resumen:
      "Un espacio para conocernos, contarme qué te trae y decidir si quieres empezar. Sin compromiso de continuidad.",
    incluye: [
      "Exploración de tu motivo de consulta",
      "Contexto de tu historia y tu momento vital",
      "Propuesta de trabajo y frecuencia orientativa",
      "Espacio para tus dudas sobre el proceso",
    ],
  },
  {
    slug: "sesion-individual",
    titulo: "Sesión individual",
    etiqueta: "Acompañamiento",
    duracion: "50 a 60 minutos",
    canal: "Online, por videollamada cifrada",
    precio: "65 €",
    nota: "Se abona en consulta",
    resumen:
      "Trabajamos aquello que te trajo a terapia y aquello que pueda aparecer por el camino, con la misma profundidad, estés donde estés en tu proceso.",
    incluye: [
      "Plan terapéutico adaptado a ti",
      "Revisión de objetivos a lo largo del proceso",
      "Un trabajo personal guiado, no una lista de técnicas",
      "Sesión a sesión, sin permanencia",
    ],
    destacado: true,
  },
  {
    slug: "bono-4-sesiones",
    titulo: "Bono de 4 sesiones",
    etiqueta: "Continuidad",
    duracion: "4 × 50 a 60 minutos",
    canal: "Online, en un solo pago",
    precio: "240 €",
    nota: "60 € por sesión",
    resumen:
      "El mismo proceso y el mismo trabajo, con la continuidad ya decidida. Para cuando sabes que quieres seguir y prefieres reservarte el camino.",
    incluye: [
      "El mismo plan terapéutico y la misma revisión de objetivos",
      "Cuatro sesiones a 60 € cada una, en un solo pago",
      "Se usan a tu ritmo, sin caducidad marcada",
      "Se renueva tantas veces como quieras",
    ],
  },
] as const;

/**
 * Aclaración sobre las dos formas de la misma terapia. Melissa no quería que
 * la sesión suelta y el bono se leyeran como dos procesos distintos: es el
 * mismo trabajo y cambia solo la forma de reservarlo y pagarlo.
 */
export const TARIFAS_ACLARACION =
  "La sesión individual y el bono no son dos terapias distintas: son la misma, con el mismo plan y la misma revisión de objetivos. Lo único que cambia es si reservas sesión a sesión o dejas ya reservado el camino.";

/** Política de cancelación, literal. Se usa en tarifas y en las FAQ. */
export const CANCELACION =
  "Las sesiones se pueden cambiar o anular avisando con 24 horas de antelación. De no ser así, la sesión se considerará realizada y deberá abonarse por respeto al tiempo del profesional, la gestión de agenda y a otras personas que necesitan ser acompañadas.";

/** Notas al pie del bloque de tarifas. */
export const TARIFAS_NOTAS = [
  "Si prefieres terapia presencial en Madrid, escríbeme y vemos las opciones disponibles.",
  CANCELACION,
] as const;

export const FRECUENCIA = {
  eyebrow: "Ritmo del proceso",
  titulo: "¿Cada cuánto nos veremos?",
  texto:
    "La frecuencia se adapta a tus necesidades y a la disponibilidad de agenda. Lo recomendable es empezar con sesiones semanales, para que el proceso se sostenga con continuidad, e ir espaciándolas según avance. Como mínimo conviene mantener una sesión cada quince días para que el trabajo conserve su sentido.",
  fases: [
    { t: "Semanal", d: "Fase inicial. Construimos la relación y ordenamos el mapa." },
    { t: "Quincenal", d: "Fase de trabajo. Hay margen para practicar entre sesiones." },
    { t: "Mensual", d: "Solo en la fase final, cuando ya afianzas los cambios por tu cuenta." },
    { t: "Alta", d: "Te llevas contigo lo aprendido. La puerta queda abierta." },
  ],
} as const;

/* ══════════════════════════════════════════════════════════════════
   EMPRESAS
   ══════════════════════════════════════════════════════════════════ */

export const EMPRESAS = {
  eyebrow: "Orpheus para equipos",
  titulo: "Bienestar emocional en entornos de trabajo.",
  intro:
    "La autoexigencia y el agotamiento no aparecen solo en consulta. También viven en las reuniones, en los correos de las once de la noche y en la sensación de que nunca se ha hecho suficiente. Diseño intervenciones para equipos que quieren cuidar eso de verdad, no solo nombrarlo.",
  entradilla:
    "Psicoterapia como beneficio social: sesiones de concienciación para todo el equipo y terapia individual subvencionada para quien la necesite.",
  cadaEquipo:
    "Cada equipo tiene su propio desgaste. La intervención se diseña después de escucharlo.",

  servicios: [
    {
      t: "Sesiones de concienciación",
      d: "Cuatro horas de trabajo en grupo sobre salud mental, donde se refuerzan la estabilidad emocional y el bienestar del equipo.",
      detalle: "500 € por sesión · hasta 30 personas por sesión",
    },
    {
      t: "Psicoterapia para empleados",
      d: "Sesiones de terapia individual subvencionadas por la empresa en el porcentaje que decida, completamente flexibles y adaptadas a cada persona.",
      detalle: "Desde 54 € por sesión, según el volumen contratado",
    },
  ],
  contratacion: "Los dos servicios se pueden contratar juntos o por separado.",

  beneficios: [
    {
      titulo: "Para la persona",
      items: [
        "Acceso a psicoterapia a precio reducido",
        "Servicio flexible, adaptado y sin listas de espera",
        "Confidencialidad total",
        "Mejora de su salud mental",
        "Mayor rendimiento",
      ],
    },
    {
      titulo: "Para la empresa",
      items: [
        "Reducción potencial del absentismo",
        "Bienestar del equipo",
        "Retención del talento",
        "Employer branding",
        "Ventajas fiscales",
        "Más rendimiento",
      ],
    },
  ],

  dosier: {
    etiqueta: "Descargar el dosier",
    archivo: "/dosier-orpheus-empresas.pdf",
    nota: "PDF con la propuesta completa para empresas.",
  },

  simulador: {
    eyebrow: "Simulador",
    titulo: "Calcula lo que costaría para tu equipo.",
    intro:
      "Dime cuántas personas sois, cuántas sesiones queréis contratar y qué porcentaje subvenciona la empresa. El cálculo se actualiza solo.",
    nota: "Es una estimación orientativa con las tarifas vigentes. La propuesta final se cierra después de hablarlo.",
  },

  cta: "Cuéntame qué necesita tu equipo",
} as const;

/* ══════════════════════════════════════════════════════════════════
   PREGUNTAS FRECUENTES
   ══════════════════════════════════════════════════════════════════ */

export const FAQ = [
  {
    q: "¿Cómo sé si necesito ir a terapia?",
    a: "No hace falta estar en crisis para pedir ayuda. Si llevas tiempo sintiendo que algo no encaja, si repites patrones que no te hacen bien o si estás agotado o agotada de exigirte, eso ya es motivo suficiente. La terapia no es solo para reparar: también sirve para comprenderte y para vivir con más margen.",
  },
  {
    q: "¿Cuánto cuesta una sesión?",
    a: "Los precios están publicados en la página de servicios.",
  },
  {
    q: "¿Cuánto dura un proceso terapéutico?",
    a: "La duración del proceso depende de tus necesidades, de tu forma de afrontar lo que te ocurre y del momento vital en el que te encuentres. Algunos procesos son breves y focalizados, centrados en una dificultad concreta. Otros requieren un trabajo más profundo, en el que exploramos diferentes aspectos de tu historia y de tu forma de relacionarte contigo y con los demás. No hay una duración predeterminada: el proceso se adapta a ti.",
  },
  {
    q: "¿Con qué frecuencia son las sesiones?",
    a: "La frecuencia se adapta a tus necesidades y a la disponibilidad de agenda. Para que el proceso pueda sostenerse con continuidad y coherencia, lo recomendable es comenzar con sesiones semanales. En función de cómo avance, podremos espaciarlas. Como mínimo, sería conveniente mantener una sesión cada quince días para que el trabajo terapéutico conserve su sentido y su continuidad.",
  },
  {
    q: "¿La terapia online funciona igual que la presencial?",
    a: "La evidencia disponible indica que la terapia online es eficaz para muchos de los motivos de consulta habituales. Si considero que necesitas otro tipo de atención, te lo diré con honestidad y te orientaré sobre las opciones más convenientes.",
  },
  {
    q: "¿Qué pasa con la confidencialidad?",
    a: "Todo lo que compartes está protegido por el secreto profesional y por el código deontológico del Colegio Oficial de la Psicología. Solo existen las excepciones legales estrictas: riesgo grave para tu vida o la de terceros y requerimiento judicial.",
  },
  {
    q: "¿Puedo sentirme peor al empezar?",
    a: "Es habitual que, al mirar de frente lo que llevabas tiempo evitando, aparezca malestar en las primeras semanas. No es un mal signo: es lo que ocurre cuando algo empieza a moverse. Trabajamos ese momento con cuidado y a tu ritmo, y lo hablamos abiertamente cuando aparece.",
  },
  {
    q: "¿Qué pasa si tengo que cancelar una sesión?",
    a: CANCELACION,
  },
  {
    q: "¿Trabajas con adolescentes?",
    a: "Sí. Tengo formación específica en terapia infantojuvenil e inteligencia emocional, y trabajo con adolescentes acompañando también, cuando es necesario, a las figuras de referencia.",
  },
  {
    q: "¿Dónde son las sesiones presenciales?",
    a: "Atiendo presencialmente en Madrid y online desde cualquier lugar. Escríbeme y te confirmo la disponibilidad y la dirección exacta de la consulta.",
  },
] as const;

/* ══════════════════════════════════════════════════════════════════
   LLAMADAS A LA ACCIÓN
   ══════════════════════════════════════════════════════════════════ */

export const CTA_FINAL = {
  eyebrow: "Empezar",
  titulo: "No tienes que tenerlo todo claro para empezar.",
  boton: "Escríbeme por WhatsApp",
} as const;

export const CTA_INTERMEDIO = {
  titulo: "¿Quieres saber si encajamos?",
  texto:
    "La primera sesión es exactamente eso: un espacio para conocernos, contarme qué te trae y decidir sin presión si quieres seguir.",
  boton: "Reservar primera sesión",
} as const;

/* ══════════════════════════════════════════════════════════════════
   MARQUESINA
   ══════════════════════════════════════════════════════════════════ */

export const MARQUESINA = [
  "Comprender antes de cambiar",
  "Implicación",
  "Respeto",
  "Escucha",
  "Calidez",
  "Empatía",
  "Tu historia importa",
];
