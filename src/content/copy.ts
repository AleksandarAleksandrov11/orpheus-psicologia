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
  titulo: ["No necesitas exigirte", "más para", "sentirte suficiente."],
  /** La palabra que va en cursiva dentro del titular (índice de línea). */
  cursiva: 2,
  entradilla:
    "Una psicología para comprender lo que te pasa, transformar aquello que te limita y construir una relación más amable contigo.",
  ctaPrincipal: { label: "Reservar una primera sesión", to: "/contacto" },
  ctaSecundario: { label: "Cómo trabajo", to: "/servicios" },
  sellos: ["Terapia integradora", "Online y presencial", "Espacio sin juicio"],
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
  titulo: ["No se trata de ser más.", "Se trata de ser más tú."],
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
  remate: "Con rigor psicológico, pero también con humanidad.",
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
   GESTIÓN EMOCIONAL
   ══════════════════════════════════════════════════════════════════ */

export const EMOCIONES = {
  eyebrow: "Gestión emocional",
  titulo: ["Sentir.", "Comprender.", "Elegir."],
  parrafos: [
    "Nuestras emociones no son algo que tengamos que eliminar o controlar a la fuerza. Son información.",
    "Aprender a reconocerlas, comprender qué las provoca y decidir cómo queremos responder a ellas nos permite recuperar algo fundamental: la capacidad de elegir.",
    "No siempre podemos controlar lo que ocurre. Pero sí podemos trabajar en cómo nos relacionamos con aquello que ocurre.",
  ],
  cita: [
    "No se trata de controlar lo que sientes.",
    "Se trata de aprender a relacionarte con ello.",
  ],
  pasos: [
    { n: "Sentir", d: "Permitir que la emoción esté sin taparla ni justificarla." },
    { n: "Comprender", d: "Entender qué la ha activado y qué necesidad señala." },
    { n: "Elegir", d: "Decidir cómo quieres responder, en lugar de reaccionar." },
  ],
} as const;

/* ══════════════════════════════════════════════════════════════════
   ¿TE RECONOCES?
   ══════════════════════════════════════════════════════════════════ */

export const RECONOCES = {
  eyebrow: "¿Te reconoces?",
  titulo: "Quizá llevas tiempo sintiendo que…",
  items: [
    "Te exiges muchísimo y, aun así, sientes que nunca es suficiente.",
    "Dudas de ti incluso cuando objetivamente las cosas van bien.",
    "Necesitas la aprobación de los demás para sentir que tienes valor.",
    "Te comparas constantemente y siempre encuentras algo que mejorar.",
    "Te cuesta poner límites o elegirte sin sentir culpa.",
    "Tu diálogo interno es mucho más duro contigo que con cualquier otra persona.",
    "Sabes racionalmente que deberías confiar más en ti, pero no consigues sentirlo.",
    "Te cuesta parar, descansar o disfrutar sin sentir que deberías estar haciendo algo más.",
    "Te encuentras repitiendo patrones que sabes que no te hacen bien.",
    "Te cuesta entender qué sientes o poner palabras a lo que te ocurre.",
    "En tus relaciones, a veces te pierdes intentando no perder al otro.",
    "Estás atravesando una ruptura, un duelo, una crisis o un momento de cambio.",
    "Sientes que desde fuera todo parece estar bien, pero por dentro algo no termina de encajar.",
  ],
  cierre:
    "Y quizá lleves tiempo sabiendo lo que «deberías» hacer, sin saber cómo dejar de sentirte así.",
} as const;

/* ══════════════════════════════════════════════════════════════════
   LO QUE ENCONTRARÁS EN MÍ
   ══════════════════════════════════════════════════════════════════ */

export const VALORES = {
  eyebrow: "Lo que encontrarás en mí",
  titulo: "Cinco cosas que puedes dar por hechas.",
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
    "Hay avances, retrocesos, mesetas y descubrimientos que llegan cuando menos los esperas. Esos vaivenes no son un fallo del proceso: son el proceso.",
  pasos: [
    {
      n: "01",
      t: "Comprender",
      d: "Antes de intentar cambiar nada, necesitamos entender qué te está pasando y por qué.",
    },
    {
      n: "02",
      t: "Dar sentido",
      d: "Exploraremos tu historia, tus experiencias y los patrones que has ido construyendo para comprender cómo has llegado hasta aquí.",
    },
    {
      n: "03",
      t: "Transformar",
      d: "Iremos incorporando nuevas herramientas y formas de relacionarte contigo, con tus emociones y con los demás.",
    },
    {
      n: "04",
      t: "Integrar",
      d: "El objetivo no es que dependas eternamente de la terapia, sino que puedas llevarte contigo lo aprendido y seguir avanzando por tu cuenta.",
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
  eyebrow: "Espacios de trabajo",
  titulo: "No trabajo los problemas de forma aislada.",
  intro:
    "Entiendo al ser humano como un engranaje: lo que ocurre en tu autoestima toca tus relaciones, y lo que ocurre en tus relaciones toca tu forma de descansar, de trabajar y de hablarte. Por eso no aplico un protocolo cerrado, sino que adapto el trabajo a lo que tú necesitas en cada momento.",
} as const;

export type Espacio = {
  slug: string;
  titulo: string;
  breve: string;
  detalle: string;
  destacado?: boolean;
};

export const ESPACIOS: Espacio[] = [
  {
    slug: "autoestima",
    titulo: "Autoestima",
    breve: "Construir una base que no dependa de la validación externa.",
    detalle:
      "Comprender el origen de tu autoconcepto, rebajar el volumen del crítico interior y sostener una imagen de ti realista y amable, también los días en que nada sale bien.",
    destacado: true,
  },
  {
    slug: "autoexigencia",
    titulo: "Autoexigencia y perfeccionismo",
    breve: "Bajar la presión sin perder tus valores.",
    detalle:
      "Identificar de dónde viene la exigencia, trabajar la culpa asociada al descanso y redefinir el éxito desde tu propio criterio y no desde el listón heredado.",
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
      "Reconocer los detonantes de la duda constante, regular la comparación y aprender a sostener tus decisiones sin necesitar que alguien las apruebe.",
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
  titulo: "Terapia integradora.",
  intro:
    "No me caso con una sola escuela. Trabajo desde un enfoque integrador que combina herramientas de distintos modelos con respaldo científico, y elijo en cada momento las que mejor encajan contigo y con lo que estás atravesando.",
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
  nota: "La evidencia científica no está aquí para impresionarte, sino para que el trabajo que hagamos tenga sentido y funcione.",
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
  cita: "Creo en la psicología como un lugar donde volver a mirarse con respeto.",
  frase: "«No puedo.»",
} as const;

export const FORMACION = {
  eyebrow: "Formación y especialización",
  titulo: "Rigor que se actualiza.",
  items: [
    { t: "Graduada en Psicología", d: "Universidad Complutense de Madrid" },
    { t: "Máster en Psicología General Sanitaria", d: "Universidad Complutense de Madrid" },
    { t: "Programa avanzado en Inteligencia Emocional y Terapia Infantojuvenil", d: "" },
    { t: "Formación en Terapia Cognitivo-Conductual", d: "" },
    { t: "Formación en Terapia de Aceptación y Compromiso (ACT)", d: "" },
    { t: "Formación en Terapia Psicodramática", d: "" },
    { t: "Formación especializada en autoestima", d: "" },
  ],
  continuo: "Y continúo…",
  nota: "La formación es un proceso continuo. Por eso sigo ampliando y actualizando mis conocimientos para ofrecer una psicología rigurosa, actualizada y adaptada a cada persona.",
} as const;

/* ══════════════════════════════════════════════════════════════════
   ESPACIO SEGURO / COMPROMISO
   ══════════════════════════════════════════════════════════════════ */

export const ESPACIO_SEGURO = {
  eyebrow: "Un espacio seguro. Siempre.",
  titulo: "Lo que sostiene el trabajo.",
  items: [
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
 * Precios: la clienta dejó abierta la decisión de publicarlos.
 * Cambia MOSTRAR_PRECIOS a true y rellena `precio` para mostrarlos.
 */
export const MOSTRAR_PRECIOS = false;

export const SESIONES = [
  {
    slug: "primera-sesion",
    titulo: "Primera sesión",
    duracion: "60 minutos",
    precio: "",
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
    slug: "terapia-individual",
    titulo: "Terapia individual",
    duracion: "50 a 60 minutos",
    precio: "",
    resumen:
      "El proceso completo. Un acompañamiento continuado y personalizado donde trabajamos aquello que te trajo y aquello que aparece por el camino.",
    incluye: [
      "Plan terapéutico adaptado a ti",
      "Herramientas concretas entre sesión y sesión",
      "Revisión periódica de objetivos",
      "Seguimiento cercano de tu evolución",
    ],
    destacado: true,
  },
  {
    slug: "online",
    titulo: "Terapia online",
    duracion: "50 a 60 minutos",
    precio: "",
    resumen:
      "La misma profundidad, desde donde estés. Videollamada segura y cifrada, con la misma continuidad que la consulta presencial.",
    incluye: [
      "Horarios flexibles",
      "Sin desplazamientos",
      "Plataforma segura y confidencial",
      "Disponible desde cualquier país",
    ],
  },
] as const;

export const FRECUENCIA = {
  eyebrow: "Ritmo del proceso",
  titulo: "¿Cada cuánto nos veremos?",
  texto:
    "Al principio solemos vernos cada semana, porque el proceso necesita continuidad para coger tracción. A medida que avanzas, espaciamos las sesiones cada quince días y después una vez al mes, hasta que el acompañamiento deja de ser necesario. La frecuencia la decidimos contigo y se revisa las veces que haga falta.",
  fases: [
    { t: "Semanal", d: "Fase inicial. Construimos la relación y ordenamos el mapa." },
    { t: "Quincenal", d: "Fase de trabajo. Hay margen para practicar entre sesiones." },
    { t: "Mensual", d: "Fase de consolidación. Afianzas los cambios por tu cuenta." },
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
  servicios: [
    {
      t: "Talleres y formaciones",
      d: "Sesiones prácticas sobre gestión emocional, autoexigencia, límites y prevención del desgaste profesional.",
    },
    {
      t: "Acompañamiento individual",
      d: "Sesiones confidenciales para personas de la organización, con facturación a empresa.",
    },
    {
      t: "Charlas y jornadas",
      d: "Intervenciones divulgativas para semanas de bienestar y jornadas internas.",
    },
  ],
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
    q: "¿Cuánto dura un proceso terapéutico?",
    a: "Depende de lo que traigas y de tu momento vital. Hay procesos breves y focalizados de dos o tres meses, y procesos más profundos que se sostienen durante más tiempo. Lo revisamos contigo de forma periódica y el objetivo siempre es que puedas seguir por tu cuenta, no que dependas de la terapia.",
  },
  {
    q: "¿Con qué frecuencia son las sesiones?",
    a: "Al principio solemos vernos cada semana para dar continuidad al trabajo. Después espaciamos a quincenal y mensual conforme avanzas. La frecuencia se decide contigo y se ajusta las veces que haga falta.",
  },
  {
    q: "¿La terapia online funciona igual que la presencial?",
    a: "La investigación disponible muestra resultados equivalentes en la mayoría de los motivos de consulta. Lo importante es la calidad del vínculo y la continuidad, no el canal. La sesión online se hace por videollamada cifrada y en un espacio donde puedas hablar con intimidad.",
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
    q: "¿Qué diferencia hay entre psicóloga, psiquiatra y coach?",
    a: "La psicóloga general sanitaria trabaja con psicoterapia y evaluación psicológica; la psiquiatra es médica y puede prescribir medicación; el coaching no es una profesión sanitaria ni trata malestar clínico. En ocasiones el trabajo conjunto con psiquiatría es lo más recomendable, y si es tu caso te lo diré.",
  },
  {
    q: "¿Qué pasa si tengo que cancelar una sesión?",
    a: "Se puede cambiar o anular avisando con al menos 24 horas de antelación. Las cancelaciones con menos margen se consideran sesión realizada, porque ese hueco quedó reservado para ti.",
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
  texto:
    "A veces, el primer paso no es saber qué necesitas cambiar. Es simplemente encontrar un lugar donde poder empezar a comprenderlo.",
  boton: "Escríbeme",
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
  "Sin etiquetas que te definan",
  "Sin recetas universales",
  "Descender para poder elevarse",
  "No se trata de ser más, sino de ser más tú",
  "Tu historia importa",
];
