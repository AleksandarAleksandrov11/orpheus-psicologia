/**
 * SEO — construcción centralizada de metadatos y datos estructurados.
 * ------------------------------------------------------------------
 * Todas las rutas llaman a `seo()` para generar su `head`. Así las
 * canónicas son siempre absolutas, las imágenes sociales existen y el
 * grafo de schema.org se mantiene coherente en todo el sitio.
 */

import { SITE, esPendiente } from "@/content/site";

export const absolute = (path: string) =>
  `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`.replace(/\/$/, "") || SITE.url;

type SeoInput = {
  /** Título propio de la página, sin el nombre de marca. */
  title: string;
  description: string;
  /** Ruta relativa, p. ej. "/servicios". */
  path: string;
  /** Ruta pública de la imagen social (1200×630). */
  image?: string;
  imageAlt?: string;
  type?: "website" | "article" | "profile";
  /** Datos estructurados adicionales de la página. */
  jsonLd?: Record<string, unknown>[];
  /** Fechas ISO para artículos. */
  publishedTime?: string;
  modifiedTime?: string;
  /** Excluir de los índices (páginas legales, gracias, etc.). */
  noindex?: boolean;
  keywords?: string[];
};

export function seo({
  title,
  description,
  path,
  image = "/og/og-default.jpg",
  imageAlt,
  type = "website",
  jsonLd = [],
  publishedTime,
  modifiedTime,
  noindex = false,
  keywords,
}: SeoInput) {
  const url = absolute(path);
  const fullTitle = path === "/" ? title : `${title} | ${SITE.name} · ${SITE.psicologa.nombre}`;
  const img = image.startsWith("http") ? image : absolute(image);

  const meta: Record<string, string>[] = [
    { title: fullTitle },
    { name: "description", content: description },
    {
      name: "robots",
      content: noindex
        ? "noindex, follow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
    { name: "author", content: SITE.psicologa.nombre },

    // Open Graph
    { property: "og:type", content: type },
    { property: "og:site_name", content: SITE.name },
    { property: "og:locale", content: SITE.locale },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: img },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: imageAlt ?? fullTitle },

    // Twitter / X
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: img },
    { name: "twitter:image:alt", content: imageAlt ?? fullTitle },
  ];

  if (keywords?.length) meta.push({ name: "keywords", content: keywords.join(", ") });
  if (publishedTime) meta.push({ property: "article:published_time", content: publishedTime });
  if (modifiedTime) meta.push({ property: "article:modified_time", content: modifiedTime });
  if (type === "article") meta.push({ property: "article:author", content: SITE.psicologa.nombre });

  const links: Record<string, string>[] = [
    { rel: "canonical", href: url },
    { rel: "alternate", hrefLang: "es-ES", href: url },
    { rel: "alternate", hrefLang: "x-default", href: url },
  ];

  const scripts = jsonLd.length
    ? [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLd.length === 1 ? jsonLd[0] : jsonLd),
        },
      ]
    : [];

  return { meta, links, scripts };
}

/* ══════════════════════════════════════════════════════════════════
   DATOS ESTRUCTURADOS
   ══════════════════════════════════════════════════════════════════ */

/** Descarta los perfiles vacíos o aún sin completar antes de publicarlos en `sameAs`. */
const perfilesPublicos = (urls: readonly string[]): string[] =>
  urls.filter((u) => Boolean(u) && !esPendiente(u));

const ID = {
  organizacion: `${SITE.url}/#organizacion`,
  web: `${SITE.url}/#website`,
  persona: `${SITE.url}/#melissa`,
} as const;

/** Perfil profesional de Melissa. */
export function personaSchema() {
  const sameAs = perfilesPublicos([
    SITE.social.instagram,
    SITE.social.linkedin,
    SITE.social.google,
  ]);
  return {
    "@type": "Person",
    "@id": ID.persona,
    name: SITE.psicologa.nombre,
    jobTitle: SITE.psicologa.titulo,
    description:
      "Psicóloga General Sanitaria especializada en autoestima, autoexigencia, inseguridad y gestión emocional. Terapia integradora online y presencial.",
    url: absolute("/sobre-mi"),
    image: absolute("/og/og-sobre-mi.jpg"),
    worksFor: { "@id": ID.organizacion },
    knowsLanguage: "es-ES",
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Universidad Complutense de Madrid",
      },
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: "Grado en Psicología",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: "Máster en Psicología General Sanitaria",
      },
    ],
    knowsAbout: [
      "Autoestima",
      "Autoexigencia",
      "Perfeccionismo",
      "Inseguridad",
      "Ansiedad",
      "Gestión emocional",
      "Duelo",
      "Ruptura de pareja",
      "Terapia cognitivo-conductual",
      "Terapia de aceptación y compromiso",
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/** Ficha del servicio profesional: lo que Google usa para el knowledge panel local. */
export function negocioSchema() {
  const sameAs = perfilesPublicos([SITE.social.instagram, SITE.social.google]);
  return {
    "@type": ["ProfessionalService", "MedicalBusiness", "Psychologist"],
    "@id": ID.organizacion,
    name: SITE.name,
    alternateName: `${SITE.psicologa.nombre} · Psicóloga`,
    description:
      "Consulta de psicología especializada en autoestima, autoexigencia e inseguridad. Terapia integradora, online y presencial en Madrid.",
    url: SITE.url,
    logo: absolute("/icon-512.png"),
    image: absolute("/og/og-default.jpg"),
    email: SITE.contacto.email,
    priceRange: "€€",
    currenciesAccepted: "EUR",
    founder: { "@id": ID.persona },
    employee: { "@id": ID.persona },
    areaServed: [
      { "@type": "Country", name: "España" },
      { "@type": "City", name: "Madrid" },
    ],
    availableLanguage: "es",
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.contacto.ciudad,
      addressRegion: SITE.contacto.region,
      addressCountry: "ES",
    },
    medicalSpecialty: "Psychiatric",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de psicología",
      itemListElement: [
        "Terapia individual",
        "Terapia online",
        "Terapia para la autoestima",
        "Terapia para la autoexigencia y el perfeccionismo",
        "Terapia para la ansiedad",
        "Acompañamiento en duelo y ruptura",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name, provider: { "@id": ID.organizacion } },
      })),
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function webSchema() {
  return {
    "@type": "WebSite",
    "@id": ID.web,
    url: SITE.url,
    name: SITE.name,
    inLanguage: "es-ES",
    publisher: { "@id": ID.organizacion },
    copyrightHolder: { "@id": ID.organizacion },
  };
}

/** Grafo base que se inyecta en la raíz del sitio. */
export function grafoBase() {
  return {
    "@context": "https://schema.org",
    "@graph": [webSchema(), negocioSchema(), personaSchema()],
  };
}

export function migasSchema(items: { nombre: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.nombre,
      item: absolute(it.path),
    })),
  };
}

export function faqSchema(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articuloSchema(a: {
  slug: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  actualizado?: string;
  imagen: string;
  categoria: string;
  palabras: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.titulo,
    description: a.descripcion,
    inLanguage: "es-ES",
    datePublished: a.fecha,
    dateModified: a.actualizado ?? a.fecha,
    articleSection: a.categoria,
    wordCount: a.palabras,
    image: [absolute(a.imagen)],
    author: { "@id": ID.persona },
    publisher: { "@id": ID.organizacion },
    isPartOf: { "@id": ID.web },
    mainEntityOfPage: { "@type": "WebPage", "@id": absolute(`/diario/${a.slug}`) },
  };
}

export function servicioSchema(s: { nombre: string; descripcion: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.nombre,
    description: s.descripcion,
    serviceType: "Psicoterapia",
    provider: { "@id": ID.organizacion },
    areaServed: { "@type": "Country", name: "España" },
    url: absolute(`/servicios#${s.slug}`),
    availableChannel: [
      {
        "@type": "ServiceChannel",
        name: "Terapia online",
        serviceUrl: absolute("/contacto"),
      },
    ],
  };
}
