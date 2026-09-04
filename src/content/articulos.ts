/**
 * DIARIO — artículos
 * ------------------------------------------------------------------
 * Contenido editorial desarrollado a partir del texto que Melissa
 * escribió en su briefing. Cada artículo es una página propia
 * (/diario/[slug]) con sus metadatos, datos estructurados de tipo
 * Article y tiempo de lectura calculado.
 *
 * Para añadir uno nuevo basta con sumar un objeto a ARTICULOS.
 */

export type Bloque =
  | { tipo: "p"; texto: string }
  | { tipo: "h2"; texto: string }
  | { tipo: "h3"; texto: string }
  | { tipo: "cita"; texto: string }
  | { tipo: "lista"; items: string[] };

export type Articulo = {
  slug: string;
  titulo: string;
  /** Título alternativo, más corto, para tarjetas y navegación. */
  tituloCorto?: string;
  descripcion: string;
  entradilla: string;
  categoria: string;
  fecha: string;
  actualizado?: string;
  imagen: "niebla" | "bosque" | "sendero" | "montanas" | "raices";
  alt: string;
  bloques: Bloque[];
};

export const ARTICULOS: Articulo[] = [
  {
    slug: "cuando-la-autoexigencia-se-disfraza-de-responsabilidad",
    titulo: "Cuando la autoexigencia se disfraza de responsabilidad",
    tituloCorto: "La autoexigencia disfrazada",
    descripcion:
      "Cómo distinguir la responsabilidad sana de la autoexigencia que agota, por qué cuesta tanto pararla y qué se trabaja en terapia para bajar el listón.",
    entradilla:
      "Casi nadie llega a consulta diciendo «me exijo demasiado». Llegan diciendo que están cansadas, que nada les llena, que deberían estar mejor. La exigencia rara vez se presenta con su nombre.",
    categoria: "Autoexigencia",
    fecha: "2026-08-18",
    imagen: "sendero",
    alt: "Sendero entre árboles altos con luz filtrándose entre las ramas",
    bloques: [
      {
        tipo: "p",
        texto:
          "La autoexigencia tiene una habilidad notable: parecerse mucho a algo bueno. Se presenta como responsabilidad, como compromiso, como ambición, a veces incluso como amor. Y precisamente por eso resulta tan difícil de cuestionar. Nadie quiere dejar de ser responsable.",
      },
      {
        tipo: "p",
        texto:
          "Pero hay una diferencia importante entre exigirte y cuidarte, y suele notarse en el cuerpo antes que en la cabeza. La responsabilidad sana te orienta: sabes qué quieres hacer y lo haces. La autoexigencia te persigue: hagas lo que hagas, no basta.",
      },
      { tipo: "h2", texto: "Las señales que casi nunca se nombran" },
      {
        tipo: "p",
        texto:
          "Cuando la exigencia toma el control, no siempre aparece un síntoma llamativo. Aparecen detalles pequeños que se normalizan durante años:",
      },
      {
        tipo: "lista",
        items: [
          "Descansar produce culpa, así que el descanso nunca descansa del todo.",
          "Los logros se evaporan antes de poder sentirlos: apenas llegan, ya son «lo mínimo».",
          "El error se vive como una prueba sobre tu valor y no como información.",
          "Te hablas con una dureza que jamás usarías con alguien a quien quieres.",
          "Hay una sensación de fondo, difícil de explicar, de estar siempre en deuda.",
        ],
      },
      {
        tipo: "p",
        texto:
          "Vivir bajo esa presión constante erosiona la autoestima, tensa las relaciones y convierte la vida en una sucesión de metas que nunca alcanzan para calmar la voz interior. El coste es invisible durante mucho tiempo, hasta que deja de serlo.",
      },
      { tipo: "h2", texto: "De dónde viene" },
      {
        tipo: "p",
        texto:
          "La exigencia no aparece de la nada ni es un defecto de carácter. Casi siempre fue una solución. Un modo de sentirte a salvo en un contexto donde el cariño, la atención o la tranquilidad parecían depender de hacerlo bien. Si rendir era la manera de estar en paz, tiene todo el sentido que tu sistema aprendiera a rendir.",
      },
      {
        tipo: "p",
        texto:
          "Comprender eso cambia la conversación. Ya no se trata de pelear contra una parte de ti que «funciona mal», sino de reconocer una estrategia que fue útil y que hoy te está costando cara.",
      },
      {
        tipo: "cita",
        texto:
          "No se trata de dejar de esforzarse. Se trata de dejar de exigirse desde un lugar que hace daño.",
      },
      { tipo: "h2", texto: "Qué trabajamos en terapia" },
      {
        tipo: "p",
        texto:
          "El trabajo no consiste en bajar tus estándares ni en volverte indiferente hacia lo que te importa. Consiste en separar dos cosas que llevan años pegadas: lo que haces y lo que vales.",
      },
      {
        tipo: "lista",
        items: [
          "Identificar el momento exacto en el que la exigencia se activa y qué la dispara.",
          "Reconocer el diálogo interno y aprender a responderle en lugar de obedecerlo.",
          "Trabajar la culpa asociada al descanso, que suele ser el punto más difícil.",
          "Redefinir el éxito desde tu propio criterio y no desde un listón heredado.",
          "Practicar la tolerancia al error en dosis pequeñas y sostenibles.",
        ],
      },
      {
        tipo: "p",
        texto:
          "Es un trabajo lento porque toca algo estructural, y por eso suele dar resultados que se sostienen. Lo que suele cambiar primero no es el rendimiento: es el ruido de fondo. La sensación de que puedes parar sin que se caiga nada.",
      },
      { tipo: "h3", texto: "Si te has reconocido en esto" },
      {
        tipo: "p",
        texto:
          "No hace falta estar en crisis para pedir ayuda. Si llevas tiempo funcionando con el motor a máximas revoluciones y la sensación de que aun así no llegas, eso ya es motivo suficiente para sentarse a mirarlo con alguien.",
      },
    ],
  },
  {
    slug: "sentir-comprender-elegir",
    titulo: "Sentir, comprender, elegir: otra forma de entender las emociones",
    tituloCorto: "Sentir, comprender, elegir",
    descripcion:
      "Las emociones no son un problema que resolver, sino información. Los tres pasos que devuelven la capacidad de elegir cómo responder a lo que sientes.",
    entradilla:
      "Nos han enseñado a gestionar las emociones como si fueran un incendio: apagarlas rápido, que no se note. Pero una emoción no es un incendio. Es un mensaje.",
    categoria: "Gestión emocional",
    fecha: "2026-07-24",
    imagen: "niebla",
    alt: "Bosque de coníferas envuelto en niebla densa",
    bloques: [
      {
        tipo: "p",
        texto:
          "Buena parte del malestar con el que trabajo en consulta no viene de lo que la gente siente, sino de la relación que ha aprendido a tener con lo que siente. La tristeza que hay que disimular. La rabia que no está bien tener. La ansiedad que hay que eliminar cuanto antes.",
      },
      {
        tipo: "p",
        texto:
          "Las emociones no son algo que tengamos que eliminar o controlar a la fuerza. Son información: señalan qué nos importa, qué se ha movido, qué necesitamos. Cuando las silenciamos, no desaparecen. Solo dejan de avisarnos.",
      },
      { tipo: "h2", texto: "1. Sentir" },
      {
        tipo: "p",
        texto:
          "El primer paso es el que más se salta: permitir que la emoción esté. Sin taparla, sin justificarla, sin corregirla mientras aparece. Esto no significa quedarse a vivir dentro de ella, sino dejar de gastar energía en negar lo evidente.",
      },
      {
        tipo: "p",
        texto:
          "Muchas personas descubren aquí que ni siquiera saben nombrar lo que sienten. No es un fallo: es una consecuencia lógica de años entrenando la desconexión. La buena noticia es que nombrar se aprende, y que el simple hecho de poner una palabra ya baja la intensidad.",
      },
      { tipo: "h2", texto: "2. Comprender" },
      {
        tipo: "p",
        texto:
          "Una vez que la emoción tiene nombre, podemos preguntarnos qué la ha activado. No para justificarla ni para discutirla, sino para entender qué necesidad está señalando. La rabia suele hablar de un límite. La tristeza, de algo valioso que se ha perdido. La ansiedad, de una amenaza que el sistema anticipa.",
      },
      {
        tipo: "p",
        texto:
          "Este paso es donde el trabajo terapéutico se vuelve más interesante, porque casi siempre aparecen patrones: emociones que se repiten en el mismo tipo de situación, reacciones que se heredaron, historias antiguas que se activan en escenas nuevas.",
      },
      { tipo: "h2", texto: "3. Elegir" },
      {
        tipo: "p",
        texto:
          "Aquí está lo que de verdad se recupera: la capacidad de decidir cómo quieres responder, en lugar de reaccionar en automático. No siempre podemos controlar lo que ocurre, ni lo que sentimos cuando ocurre. Pero sí podemos trabajar cómo nos relacionamos con aquello que ocurre.",
      },
      {
        tipo: "cita",
        texto:
          "No se trata de controlar lo que sientes. Se trata de aprender a relacionarte con ello.",
      },
      { tipo: "h2", texto: "Por qué este orden importa" },
      {
        tipo: "p",
        texto:
          "Casi todos los consejos habituales sobre emociones se saltan los dos primeros pasos y aterrizan directamente en el tercero: «no le des tantas vueltas», «piensa en positivo», «relativiza». Son intentos de elegir sin haber sentido ni comprendido, y por eso rara vez funcionan más de un rato.",
      },
      {
        tipo: "lista",
        items: [
          "Sentir sin comprender deja la emoción en bucle.",
          "Comprender sin sentir se queda en una explicación intelectual que no alivia.",
          "Elegir sin lo anterior es voluntarismo, y el voluntarismo se agota.",
        ],
      },
      {
        tipo: "p",
        texto:
          "Cuando los tres pasos están, ocurre algo que cuesta explicar hasta que se experimenta: la emoción sigue apareciendo, pero deja de mandar. Y esa distancia mínima es, en la práctica, lo que llamamos libertad.",
      },
    ],
  },
  {
    slug: "el-mito-de-orfeo-y-el-proceso-terapeutico",
    titulo: "El mito de Orfeo y lo que dice sobre el proceso terapéutico",
    tituloCorto: "El mito de Orfeo",
    descripcion:
      "Por qué una consulta de psicología se llama Orpheus: el descenso, la oscuridad y el regreso transformado como metáfora precisa de lo que ocurre en terapia.",
    entradilla:
      "Orfeo desciende al inframundo movido por el amor. No va a buscar sabiduría ni a probarse a sí mismo: va porque hay algo que le importa demasiado como para no ir.",
    categoria: "Filosofía Orpheus",
    fecha: "2026-06-30",
    imagen: "raices",
    alt: "Árbol centenario visto desde abajo, con sus raíces y la luz atravesando las ramas",
    bloques: [
      {
        tipo: "p",
        texto:
          "Cuando pensé el nombre de este proyecto, quería algo que dijera la verdad sobre lo que ocurre en un proceso terapéutico. Y la verdad, casi siempre, tiene forma de descenso.",
      },
      {
        tipo: "p",
        texto:
          "Orfeo baja al inframundo para recuperar a Eurídice. Para mí simboliza ese viaje hacia dentro que muchas veces supone la terapia: atreverse a mirar lo que duele, atravesar la oscuridad y regresar transformado. No para volver a ser quien eras, sino para encontrarte de una manera más consciente y auténtica.",
      },
      { tipo: "h2", texto: "Bajar antes de subir" },
      {
        tipo: "p",
        texto:
          "Existe una idea muy extendida de que el crecimiento personal es una escalera: subir, mejorar, optimizar. En consulta rara vez funciona así. Lo primero que suele pasar cuando alguien empieza a mirarse de verdad es que aparece incomodidad, no alivio.",
      },
      {
        tipo: "p",
        texto:
          "Eso no es un mal signo. Es lo que ocurre cuando algo que llevaba años quieto empieza a moverse. Solo cuando somos capaces de descender hacia nuestras heridas, patrones, miedos y contradicciones podemos después elevarnos: vivir con más libertad, coherencia, serenidad y sentido.",
      },
      {
        tipo: "cita",
        texto: "Para poder transformarnos, primero necesitamos atrevernos a mirarnos.",
      },
      { tipo: "h2", texto: "La condición: no mirar atrás" },
      {
        tipo: "p",
        texto:
          "En el mito, Hades pone una condición: Orfeo puede sacar a Eurídice del inframundo siempre que no se gire a mirarla hasta salir. Se gira. Y la pierde.",
      },
      {
        tipo: "p",
        texto:
          "Esa parte del relato me interesa especialmente, porque habla de algo muy humano: la dificultad de confiar en un proceso cuyos resultados todavía no puedes ver. Buena parte del trabajo terapéutico consiste precisamente en sostener la incertidumbre el tiempo suficiente para que el cambio tenga sitio donde ocurrir.",
      },
      { tipo: "h2", texto: "Regresar transformado, no reparado" },
      {
        tipo: "p",
        texto:
          "Orfeo no vuelve del inframundo siendo el mismo. Y ahí está la diferencia entre la idea de arreglarse y la idea de transformarse. Aquí no partimos de que haya algo roto en ti que haya que reparar. Partimos de que muchas veces necesitamos comprender antes de cambiar.",
      },
      {
        tipo: "p",
        texto:
          "El objetivo de la terapia no es convertirte en una versión más productiva, más perfecta o más adaptada de ti. No se trata de ser más. Se trata de ser más tú.",
      },
      {
        tipo: "p",
        texto:
          "Por eso no encontrarás aquí etiquetas que te definan, recetas universales ni la exigencia de convertirte en otra persona. Encontrarás rigor psicológico y, al mismo tiempo, humanidad. Que son, en el fondo, las dos cosas que hacen falta para bajar acompañado o acompañada.",
      },
    ],
  },
  {
    slug: "no-eres-un-producto-terminado",
    titulo: "No eres un producto terminado: eres un proceso",
    tituloCorto: "No eres un producto terminado",
    descripcion:
      "Sobre las etiquetas, los diagnósticos y la trampa de creerse una versión definitiva de uno mismo. Una invitación a comprenderte, conocerte y elegirte.",
    entradilla:
      "«Es que yo soy así.» Es una de las frases que más escucho en consulta, y casi siempre esconde menos una descripción que una condena.",
    categoria: "Autoestima",
    fecha: "2026-05-15",
    imagen: "montanas",
    alt: "Cordillera con capas de montañas difuminadas por la bruma",
    bloques: [
      {
        tipo: "p",
        texto:
          "Nos definimos con una facilidad asombrosa. Soy insegura, soy desastre, soy demasiado intensa, soy la fuerte. Frases cortas que parecen inocentes y que funcionan como una sentencia: si eso es lo que soy, no hay nada que hacer.",
      },
      {
        tipo: "p",
        texto:
          "Pero no eres un conjunto fijo de características, etiquetas o diagnósticos. Eres una persona que puede cambiar, aprender, descubrir nuevas partes de sí misma y construir nuevas formas de relacionarse con su mundo.",
      },
      { tipo: "cita", texto: "No eres un producto terminado. Eres un proceso." },
      { tipo: "h2", texto: "Para qué sirve una etiqueta (y para qué no)" },
      {
        tipo: "p",
        texto:
          "Un diagnóstico puede ser útil. Ordena, orienta el tratamiento, permite entender que lo que te pasa tiene nombre y le pasa a más gente. El problema empieza cuando deja de describir algo que te ocurre y pasa a describir quién eres.",
      },
      {
        tipo: "lista",
        items: [
          "Una etiqueta útil explica un patrón y abre opciones.",
          "Una etiqueta que se vuelve identidad cierra el futuro.",
          "«Tengo ansiedad» y «soy ansiosa» no llevan al mismo sitio.",
        ],
      },
      { tipo: "h2", texto: "Comprenderte, conocerte, elegirte" },
      {
        tipo: "p",
        texto:
          "El trabajo que hago no consiste en darte una lista de consejos para que seas una versión mejor de ti. Consiste en ayudarte a entender qué hay detrás de lo que sientes, identificar los patrones que hoy te están limitando y construir nuevas formas de relacionarte contigo y con los demás.",
      },
      {
        tipo: "p",
        texto:
          "Comprenderte es entender de dónde vienen tus reacciones. Conocerte es saber qué necesitas y qué te importa de verdad. Elegirte es actuar en consecuencia, incluso cuando cuesta y sobre todo cuando cuesta.",
      },
      { tipo: "h2", texto: "El cambio no es un antes y un después" },
      {
        tipo: "p",
        texto:
          "En terapia hay avances, retrocesos, mesetas y descubrimientos que llegan cuando menos los esperas. Esos vaivenes no son un fallo del proceso: son el proceso. No hay dos recorridos iguales, y el tuyo tampoco debería serlo.",
      },
      {
        tipo: "p",
        texto:
          "Que no seas un producto terminado no significa que estés incompleta. Significa que sigues teniendo margen. Y ese margen, cuando se mira de frente, es exactamente donde empieza el trabajo.",
      },
    ],
  },
];

/** Palabras por minuto para estimar el tiempo de lectura. */
const PPM = 200;

export function tiempoLectura(a: Articulo): number {
  const palabras = a.bloques.reduce((n, b) => {
    const t = b.tipo === "lista" ? b.items.join(" ") : b.texto;
    return n + t.trim().split(/\s+/).length;
  }, a.entradilla.split(/\s+/).length);
  return Math.max(2, Math.round(palabras / PPM));
}

export function articuloPorSlug(slug: string): Articulo | undefined {
  return ARTICULOS.find((a) => a.slug === slug);
}

/** Artículos ordenados del más reciente al más antiguo. */
export const ARTICULOS_RECIENTES = [...ARTICULOS].sort((a, b) => b.fecha.localeCompare(a.fecha));
