import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock3 } from "lucide-react";
import { useEffect, useState } from "react";

import { Layout } from "@/components/site/Layout";
import { Parallax, Reveal } from "@/components/site/motion";
import { useReducedMotion } from "@/lib/motion";
import { Antetitulo, BotonEnlace, Lira, Migas } from "@/components/site/ui";
import {
  ARTICULOS_RECIENTES,
  articuloPorSlug,
  tiempoLectura,
  type Articulo,
  type Bloque,
} from "@/content/articulos";
import { SITE } from "@/content/site";
import { PORTADAS, fechaLarga, srcSetPortada } from "@/lib/portadas";
import { articuloSchema, migasSchema, seo } from "@/lib/seo";

import { CtaFinal } from "../index";
import retrato from "@/assets/melissa-retrato.webp";

const contarPalabras = (a: Articulo) =>
  a.bloques.reduce(
    (n, b) => n + (b.tipo === "lista" ? b.items.join(" ") : b.texto).trim().split(/\s+/).length,
    0,
  );

export const Route = createFileRoute("/diario/$slug")({
  loader: ({ params }) => {
    const articulo = articuloPorSlug(params.slug);
    if (!articulo) throw notFound();
    return { articulo };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.articulo;
    if (!a) {
      return seo({
        title: "Artículo no encontrado",
        description: "El artículo que buscas no existe o ha cambiado de dirección.",
        path: "/diario",
        noindex: true,
      });
    }
    return seo({
      title: a.titulo,
      description: a.descripcion,
      path: `/diario/${a.slug}`,
      image: "/og/og-diario.jpg",
      imageAlt: a.titulo,
      type: "article",
      publishedTime: a.fecha,
      modifiedTime: a.actualizado ?? a.fecha,
      keywords: [a.categoria, "psicología", "terapia", "Melissa González"],
      jsonLd: [
        migasSchema([
          { nombre: "Inicio", path: "/" },
          { nombre: "Diario", path: "/diario" },
          { nombre: a.tituloCorto ?? a.titulo, path: `/diario/${a.slug}` },
        ]),
        articuloSchema({
          slug: a.slug,
          titulo: a.titulo,
          descripcion: a.descripcion,
          fecha: a.fecha,
          actualizado: a.actualizado,
          imagen: "/og/og-diario.jpg",
          categoria: a.categoria,
          palabras: contarPalabras(a),
        }),
      ],
    });
  },
  component: ArticuloPagina,
  notFoundComponent: NoEncontrado,
});

/* ══════════════════════════════════════════════════════════════════
   BARRA DE PROGRESO DE LECTURA
   ══════════════════════════════════════════════════════════════════ */

function ProgresoLectura() {
  const [progreso, setProgreso] = useState(0);
  const reducido = useReducedMotion();

  useEffect(() => {
    let pendiente = false;
    const actualizar = () => {
      pendiente = false;
      const alto = document.documentElement.scrollHeight - window.innerHeight;
      setProgreso(alto > 0 ? Math.min(1, window.scrollY / alto) : 0);
    };
    const alDesplazar = () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(actualizar);
    };
    actualizar();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    window.addEventListener("resize", alDesplazar, { passive: true });
    return () => {
      window.removeEventListener("scroll", alDesplazar);
      window.removeEventListener("resize", alDesplazar);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-[80] h-px bg-transparent"
      role="progressbar"
      aria-label="Progreso de lectura"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progreso * 100)}
    >
      <div
        className="h-full origin-left bg-cypress"
        style={{
          transform: `scaleX(${progreso})`,
          transition: reducido ? "none" : "transform 0.1s linear",
        }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   BLOQUES DEL ARTÍCULO
   ══════════════════════════════════════════════════════════════════ */

function BloqueRenderizado({ bloque, indice }: { bloque: Bloque; indice: number }) {
  const retardo = Math.min(indice, 4) * 45;

  switch (bloque.tipo) {
    case "h2":
      return (
        <Reveal
          as="h2"
          delay={retardo}
          className="display-sm mt-10 md:mt-14 mb-5 text-ink first:mt-0"
        >
          {bloque.texto}
        </Reveal>
      );
    case "h3":
      return (
        <Reveal
          as="h3"
          delay={retardo}
          className="mt-10 mb-4 font-sans text-[0.89rem] font-medium tracking-[0.16em] text-ink uppercase"
        >
          {bloque.texto}
        </Reveal>
      );
    case "cita":
      return (
        <Reveal delay={retardo} variant="mask" className="my-12">
          <blockquote className="border-l border-olive/60 py-1 pl-7">
            <p className="font-display text-[1.5rem] leading-[1.25] text-cypress italic md:text-[1.85rem]">
              {bloque.texto}
            </p>
          </blockquote>
        </Reveal>
      );
    case "lista":
      return (
        <Reveal as="ul" delay={retardo} className="my-7 grid gap-3.5">
          {bloque.items.map((item) => (
            <li key={item} className="relative pl-6 text-[1.12rem] leading-[1.8] font-light">
              <span aria-hidden="true" className="absolute top-[0.85em] left-0 h-px w-3 bg-olive" />
              {item}
            </li>
          ))}
        </Reveal>
      );
    default:
      return (
        <Reveal as="p" delay={retardo} className="mt-5 text-[1.05rem] leading-[1.85] font-light">
          {bloque.texto}
        </Reveal>
      );
  }
}

/* ══════════════════════════════════════════════════════════════════
   PÁGINA
   ══════════════════════════════════════════════════════════════════ */

function ArticuloPagina() {
  const { articulo } = Route.useLoaderData();
  const portada = PORTADAS[articulo.imagen];
  const minutos = tiempoLectura(articulo);
  const siguientes = ARTICULOS_RECIENTES.filter((a) => a.slug !== articulo.slug).slice(0, 2);

  return (
    <Layout>
      <ProgresoLectura />

      {/* ── Portada ── */}
      <article>
        <header className="relative isolate overflow-hidden bg-moss pt-28 pb-12 text-on-dark md:pt-40 md:pb-24">
          <Parallax amount={60} className="absolute inset-0 -z-10 scale-110">
            <img
              src={portada.src}
              srcSet={srcSetPortada(portada)}
              sizes="100vw"
              alt=""
              aria-hidden="true"
              width={portada.w}
              height={portada.h}
              loading="eager"
              fetchPriority="high"
              className="h-full w-full object-cover opacity-35"
            />
          </Parallax>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-b from-moss/85 via-moss/75 to-moss"
          />
          <div className="grain-dark absolute inset-0 -z-10" aria-hidden="true" />

          <div className="on-dark relative z-10 shell max-w-[52rem]">
            <Migas
              oscuro
              items={[
                { nombre: "Inicio", path: "/" },
                { nombre: "Diario", path: "/diario" },
                { nombre: articulo.tituloCorto ?? articulo.titulo },
              ]}
            />
            <Antetitulo oscuro>{articulo.categoria}</Antetitulo>
            <h1 className="display-lg mt-6 text-on-dark">{articulo.titulo}</h1>
            <p className="mt-7 max-w-2xl text-[1.05rem] leading-relaxed font-light text-on-dark-muted md:text-[1.15rem]">
              {articulo.entradilla}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.75rem] font-light text-on-dark-faint">
              <time dateTime={articulo.fecha}>{fechaLarga(articulo.fecha)}</time>
              <span aria-hidden="true" className="size-1 rounded-full bg-on-dark-faint/60" />
              <span className="inline-flex items-center gap-2">
                <Clock3 className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                {minutos} min de lectura
              </span>
              <span aria-hidden="true" className="size-1 rounded-full bg-on-dark-faint/60" />
              <span>{SITE.psicologa.nombre}</span>
            </div>
          </div>
        </header>

        {/* ── Cuerpo ── */}
        <div className="shell">
          <div className="mx-auto max-w-[46rem] py-12 text-ink-muted md:py-24">
            {articulo.bloques.map((bloque, i) => (
              <BloqueRenderizado key={i} bloque={bloque} indice={i} />
            ))}

            {/* Firma */}
            <Reveal className="mt-11 md:mt-16 flex flex-col gap-6 border-t border-rule pt-10 sm:flex-row sm:items-center">
              <img
                src={retrato}
                alt={`Retrato de ${SITE.psicologa.nombre}`}
                width={788}
                height={788}
                loading="lazy"
                className="size-20 shrink-0 rounded-full bg-paper object-cover"
              />
              <div>
                <p className="eyebrow text-olive">Escrito por</p>
                <p className="mt-2.5 font-display text-[1.35rem] text-ink">
                  {SITE.psicologa.nombre}
                </p>
                <p className="mt-1 text-[0.96rem] font-light text-ink-muted">
                  {SITE.psicologa.titulo} · Fundadora de {SITE.name}
                </p>
                <Link
                  to="/sobre-mi"
                  className="link-draw mt-3 inline-block text-[0.93rem] text-cypress"
                >
                  Conocer su historia
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </article>

      {/* ── Seguir leyendo ── */}
      {siguientes.length > 0 ? (
        <section
          className="relative overflow-hidden bg-paper"
          aria-labelledby="seguir-leyendo-titulo"
        >
          <div className="grain absolute inset-0" aria-hidden="true" />
          <div className="relative z-10 shell section-y-sm py-12 md:py-24">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <h2 id="seguir-leyendo-titulo" className="display-sm">
                Seguir <em className="italic">leyendo</em>
              </h2>
              <Link to="/diario" className="link-draw text-[0.93rem] text-cypress">
                <span className="inline-flex items-center gap-2">
                  <ArrowLeft className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                  Volver al Diario
                </span>
              </Link>
            </div>

            <ul className="mt-10 grid gap-5 md:grid-cols-2">
              {siguientes.map((a, i) => {
                const p = PORTADAS[a.imagen];
                return (
                  <Reveal
                    as="li"
                    key={a.slug}
                    delay={i * 90}
                    className="card-paper card-hover-lift overflow-hidden"
                  >
                    <Link
                      to="/diario/$slug"
                      params={{ slug: a.slug }}
                      className="group flex h-full flex-col"
                    >
                      <div className="photo-frame aspect-[16/9]">
                        <img
                          src={p.sm}
                          srcSet={srcSetPortada(p)}
                          sizes="(min-width: 768px) 40vw, 90vw"
                          alt={a.alt}
                          width={p.wSm}
                          height={Math.round((p.h * p.wSm) / p.w)}
                          loading="lazy"
                          className="img-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-7">
                        <p className="eyebrow text-olive">{a.categoria}</p>
                        <h3 className="mt-4 font-display text-[1.35rem] leading-tight text-ink md:text-[1.55rem]">
                          {a.titulo}
                        </h3>
                        <p className="mt-3 flex-1 text-[0.99rem] leading-relaxed font-light text-ink-muted">
                          {a.descripcion}
                        </p>
                        <p className="mt-5 text-[0.72rem] tracking-[0.14em] text-ink-faint uppercase">
                          {tiempoLectura(a)} min
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaFinal />
    </Layout>
  );
}

function NoEncontrado() {
  return (
    <Layout>
      <section className="aurora grain relative overflow-hidden">
        <div className="relative z-10 shell section-y flex min-h-[60vh] flex-col items-center justify-center pt-20 md:pt-32 text-center">
          <Lira className="h-12 w-12 text-cypress/50" />
          <p className="eyebrow mt-8 text-olive">Diario</p>
          <h1 className="display-lg mt-5 max-w-2xl">
            Este artículo no <em className="italic">existe</em>.
          </h1>
          <p className="lede mt-6 max-w-lg">
            Puede que haya cambiado de dirección o que todavía no esté publicado. En el Diario
            encontrarás todos los artículos disponibles.
          </p>
          <div className="mt-10">
            <BotonEnlace to="/diario">Ver todos los artículos</BotonEnlace>
          </div>
        </div>
      </section>
    </Layout>
  );
}
