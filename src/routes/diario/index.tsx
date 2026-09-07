import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock3 } from "lucide-react";

import { Layout } from "@/components/site/Layout";
import { Contador, Parallax, Reveal } from "@/components/site/motion";
import { Antetitulo, BotonEnlace, Lira, Migas } from "@/components/site/ui";
import { ARTICULOS_RECIENTES, tiempoLectura, type Articulo } from "@/content/articulos";
import { SITE } from "@/content/site";
import { PORTADAS, fechaLarga, srcSetPortada } from "@/lib/portadas";
import { absolute, migasSchema, seo } from "@/lib/seo";

import { CtaFinal } from "../index";

import retrato from "@/assets/melissa-retrato.webp";

const CATEGORIAS = Array.from(new Set(ARTICULOS_RECIENTES.map((a) => a.categoria)));

const DESCRIPCION =
  "Artículos sobre autoexigencia, autoestima, gestión emocional y proceso terapéutico, escritos por Melissa González para poner palabras a lo que cuesta explicar.";

function blogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Blog", "CollectionPage"],
    "@id": `${SITE.url}/diario#blog`,
    name: `Diario · ${SITE.name}`,
    description: DESCRIPCION,
    url: absolute("/diario"),
    inLanguage: "es-ES",
    hasPart: ARTICULOS_RECIENTES.map((a) => ({
      "@type": "BlogPosting",
      headline: a.titulo,
      description: a.descripcion,
      articleSection: a.categoria,
      datePublished: a.fecha,
      dateModified: a.actualizado ?? a.fecha,
      url: absolute(`/diario/${a.slug}`),
      mainEntityOfPage: { "@type": "WebPage", "@id": absolute(`/diario/${a.slug}`) },
    })),
  };
}

export const Route = createFileRoute("/diario/")({
  head: () =>
    seo({
      title: "Diario",
      description: DESCRIPCION,
      path: "/diario",
      image: "/og/og-diario.jpg",
      imageAlt: "Diario de Orpheus Psicología: artículos de Melissa González",
      keywords: [
        "blog de psicología",
        "artículos de psicología",
        "autoexigencia",
        "perfeccionismo",
        "autoestima",
        "gestión emocional",
        "psicóloga Madrid",
      ],
      jsonLd: [
        migasSchema([
          { nombre: "Inicio", path: "/" },
          { nombre: "Diario", path: "/diario" },
        ]),
        blogSchema(),
      ],
    }),
  component: Diario,
});

function Diario() {
  const [destacado, ...resto] = ARTICULOS_RECIENTES;
  const minutosDestacado = tiempoLectura(destacado);
  const portada = PORTADAS[destacado.imagen];

  return (
    <Layout>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="aurora grain relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <Parallax
          amount={-34}
          className="pointer-events-none absolute -top-40 -right-36 -z-10 h-[34rem] w-[34rem] rounded-full bg-olive/15 blur-3xl"
        >
          <span className="anim-breathe block h-full w-full" />
        </Parallax>
        <Lira
          className="pointer-events-none absolute -right-16 top-28 -z-10 hidden h-[28rem] w-[28rem] text-cypress/[0.07] lg:block"
          trazo={1.2}
        />

        <div className="relative z-10 shell">
          <Migas items={[{ nombre: "Inicio", path: "/" }, { nombre: "Diario" }]} />

          <p className="eyebrow anim-fade flex items-center gap-3 text-olive">
            <span aria-hidden="true" className="inline-block h-px w-8 bg-olive/50" />
            Diario
          </p>

          <h1
            className="display-xl anim-fade-up mt-7 max-w-4xl text-ink"
            style={{ animationDelay: "0.14s" }}
          >
            Leer para empezar a <em className="italic">comprenderte</em>.
          </h1>

          <p className="lede anim-fade-up mt-8 max-w-2xl" style={{ animationDelay: "0.34s" }}>
            Escribo aquí lo que más se repite en consulta: la autoexigencia que se disfraza de
            responsabilidad, las emociones que aprendimos a callar, las etiquetas que acaban
            decidiendo por nosotros. Son artículos para poner palabras a lo que cuesta explicar, sin
            recetas ni atajos.
          </p>

          <div
            className="anim-fade mt-14 grid gap-7 border-t border-rule pt-7 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-12"
            style={{ animationDelay: "0.55s" }}
          >
            <p className="flex items-baseline gap-3">
              <span className="font-display text-[2.75rem] leading-none text-cypress tabular-nums">
                <Contador hasta={ARTICULOS_RECIENTES.length} />
              </span>
              <span className="eyebrow text-ink-faint">
                {ARTICULOS_RECIENTES.length === 1 ? "artículo" : "artículos"}
              </span>
            </p>
            <ul className="flex flex-wrap gap-2">
              {CATEGORIAS.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-rule bg-linen/70 px-4 py-2 text-[0.89rem] font-light text-ink-muted"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════════ ARTÍCULO DESTACADO ═══════════════════ */}
      <section className="section-y-sm" aria-labelledby="destacado-titulo">
        <div className="shell">
          <Reveal className="flex flex-wrap items-baseline justify-between gap-4 border-b border-rule pb-5">
            <Antetitulo>Lo último</Antetitulo>
            <span className="eyebrow text-ink-faint">{destacado.categoria}</span>
          </Reveal>

          <Reveal delay={90} className="mt-10 md:mt-14">
            <Link
              to="/diario/$slug"
              params={{ slug: destacado.slug }}
              className="group grid lg:grid-cols-[1.22fr_0.78fr] lg:items-center"
            >
              <div
                className="photo-frame overflow-hidden rounded-2xl"
                style={{ aspectRatio: "16 / 10" }}
              >
                <Parallax amount={26} className="h-full w-full">
                  <img
                    src={portada.src}
                    srcSet={`${portada.sm} ${portada.wSm}w, ${portada.src} ${portada.w}w`}
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    alt={destacado.alt}
                    width={portada.w}
                    height={portada.h}
                    loading="lazy"
                    className="img-cover scale-[1.14] transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.2]"
                  />
                </Parallax>
              </div>

              {/* La ficha monta sobre la imagen: el gesto editorial de la página */}
              <div className="relative z-10 mx-4 -mt-12 rounded-2xl border border-rule bg-linen p-7 transition-colors duration-600 group-hover:border-olive md:p-9 lg:mx-0 lg:-ml-24 lg:mt-0">
                <span className="eyebrow text-olive">Artículo más reciente</span>
                <h2
                  id="destacado-titulo"
                  className="display-sm mt-5 text-ink transition-colors duration-500 group-hover:text-cypress"
                >
                  {destacado.titulo}
                </h2>
                <p className="prose-body mt-5">{destacado.entradilla}</p>

                <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.86rem] font-light text-ink-faint">
                  <time dateTime={destacado.fecha}>{fechaLarga(destacado.fecha)}</time>
                  <span aria-hidden="true" className="h-px w-6 bg-rule-strong" />
                  <span className="flex items-center gap-2">
                    <Clock3 className="size-3.5" strokeWidth={1.6} aria-hidden="true" />
                    {minutosDestacado} min de lectura
                  </span>
                </div>

                <span className="mt-8 inline-flex items-center gap-2 text-[0.93rem] tracking-[0.09em] text-cypress uppercase">
                  Leer el artículo
                  <ArrowUpRight
                    className="size-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ EL RESTO DEL ARCHIVO ═══════════════════ */}
      {resto.length > 0 ? (
        <section className="relative overflow-hidden bg-paper" aria-labelledby="archivo-titulo">
          <div className="grain absolute inset-0" aria-hidden="true" />
          <div className="relative z-10 shell section-y">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
              <div>
                <Reveal>
                  <Antetitulo>El archivo</Antetitulo>
                </Reveal>
                <Reveal delay={80}>
                  <h2 id="archivo-titulo" className="display-md mt-6">
                    Lo demás que hay <em className="italic">escrito</em>.
                  </h2>
                </Reveal>
              </div>
              <Reveal delay={160}>
                <p className="prose-body">
                  Ninguno pretende sustituir a un proceso terapéutico. Están para que reconozcas
                  algo tuyo en lo que lees y, si te sirve, sepas por dónde empezar a tirar del hilo.
                </p>
              </Reveal>
            </div>

            <ul className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {resto.map((a, i) => (
                <Reveal as="li" key={a.slug} delay={i * 90} className="flex">
                  <TarjetaArticulo articulo={a} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* ═══════════════════ QUIÉN ESCRIBE ═══════════════════ */}
      <section
        className="relative isolate overflow-hidden bg-cypress text-on-dark"
        aria-labelledby="autora-titulo"
      >
        <Parallax amount={55} className="absolute inset-0 -z-10">
          <img
            src={PORTADAS.bosque.src}
            srcSet={srcSetPortada(PORTADAS.bosque)}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1600}
            height={1000}
            className="h-full w-full scale-110 object-cover opacity-20"
          />
        </Parallax>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-br from-cypress via-cypress/90 to-moss"
        />
        <div className="grain-dark absolute inset-0 -z-10" aria-hidden="true" />

        <div className="on-dark shell section-y-sm relative">
          <div className="grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-14">
            <Reveal variant="scale" className="mx-auto md:mx-0">
              <img
                src={retrato}
                alt={`${SITE.psicologa.nombre}, ${SITE.psicologa.titulo}`}
                width={788}
                height={788}
                loading="lazy"
                className="h-32 w-32 rounded-full border border-on-dark/25 object-cover md:h-44 md:w-44"
              />
            </Reveal>

            <div>
              <Reveal>
                <Antetitulo oscuro>Quién escribe</Antetitulo>
              </Reveal>
              <Reveal delay={80}>
                <h2 id="autora-titulo" className="display-sm mt-5 text-on-dark">
                  Todo lo que se publica aquí lo escribo <em className="italic">yo</em>.
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 max-w-xl text-[1rem] leading-[1.8] font-light text-on-dark-muted">
                  Soy {SITE.psicologa.nombre}, {SITE.psicologa.titulo.toLowerCase()}. No hay
                  contenido escrito en serie ni consejos que valgan para todo el mundo: solo aquello
                  que veo repetirse en consulta y que merece explicarse con calma.
                </p>
              </Reveal>
              <Reveal delay={230} className="mt-9 flex flex-wrap gap-3">
                <BotonEnlace to="/sobre-mi" variante="light">
                  Conocer mi historia
                </BotonEnlace>
                <BotonEnlace to="/contacto" variante="ghost-dark" flecha={false}>
                  Escribirme
                </BotonEnlace>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA FINAL ═══════════════════ */}
      <CtaFinal />
    </Layout>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TARJETA DE ARTÍCULO
   ══════════════════════════════════════════════════════════════════ */

function TarjetaArticulo({ articulo }: { articulo: Articulo }) {
  const portada = PORTADAS[articulo.imagen];
  return (
    <Link
      to="/diario/$slug"
      params={{ slug: articulo.slug }}
      className="card-paper card-hover-lift group flex h-full w-full flex-col overflow-hidden"
    >
      <div className="photo-frame shrink-0" style={{ aspectRatio: "4 / 3" }}>
        <img
          src={portada.sm}
          srcSet={`${portada.sm} ${portada.wSm}w, ${portada.src} ${portada.w}w`}
          sizes="(min-width: 1024px) 22rem, (min-width: 768px) 45vw, 100vw"
          alt={articulo.alt}
          width={portada.wSm}
          height={Math.round((portada.h * portada.wSm) / portada.w)}
          loading="lazy"
          className="img-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <span className="eyebrow absolute bottom-4 left-4 z-10 rounded-full bg-linen/92 px-3.5 py-2 text-cypress backdrop-blur-sm">
          {articulo.categoria}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7 md:p-8">
        <h3 className="font-display text-[1.4rem] leading-tight text-ink transition-colors duration-500 group-hover:text-cypress">
          {articulo.tituloCorto ?? articulo.titulo}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-[1.01rem] leading-relaxed font-light text-ink-muted">
          {articulo.entradilla}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-rule pt-4 text-[0.75rem] font-light text-ink-faint">
          <time dateTime={articulo.fecha}>{fechaLarga(articulo.fecha)}</time>
          <span>{tiempoLectura(articulo)} min</span>
        </div>
      </div>
    </Link>
  );
}
