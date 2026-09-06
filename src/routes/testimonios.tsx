import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Quote, Star } from "lucide-react";

import { Layout } from "@/components/site/Layout";
import { LineasReveladas, Parallax, Reveal } from "@/components/site/motion";
import { BotonEnlace, BotonExterno, Cita, Lira, Migas } from "@/components/site/ui";
import { CTA_INTERMEDIO, RECONOCES } from "@/content/copy";
import { RESENAS_PUBLICADAS, TOTAL_RESENAS, mesDeResena, type Resena } from "@/content/resenas";
import { SITE, esPendiente } from "@/content/site";
import { migasSchema, seo } from "@/lib/seo";

import { CtaFinal } from "./index";

export const Route = createFileRoute("/testimonios")({
  head: () =>
    seo({
      title: "Reseñas",
      description:
        "Lo que cuentan quienes ya han hecho un proceso con Melissa González. Reseñas publicadas y verificadas en Google, reproducidas con su texto literal.",
      path: "/testimonios",
      image: "/og/og-resenas.jpg",
      imageAlt: "Orpheus Psicología: reseñas de quienes ya han venido a consulta",
      keywords: [
        "reseñas psicóloga",
        "opiniones psicóloga Madrid",
        "testimonios terapia",
        "Melissa González psicóloga",
        "Orpheus Psicología opiniones",
      ],
      jsonLd: [
        migasSchema([
          { nombre: "Inicio", path: "/" },
          { nombre: "Reseñas", path: "/testimonios" },
        ]),
      ],
    }),
  component: Resenas,
});

function Resenas() {
  const resenas = RESENAS_PUBLICADAS;
  const hayGoogle = !esPendiente(SITE.social.googleReviews);

  return (
    <Layout>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="aurora grain relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <Parallax
          amount={-32}
          className="pointer-events-none absolute -top-40 -right-32 -z-10 h-[32rem] w-[32rem] rounded-full bg-aloe/50 blur-3xl"
        >
          <span className="anim-breathe block h-full w-full" />
        </Parallax>

        <div className="relative z-10 shell">
          <Migas items={[{ nombre: "Inicio", path: "/" }, { nombre: "Reseñas" }]} />

          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20">
            <div>
              <p className="eyebrow anim-fade flex items-center gap-3 text-olive">
                <span aria-hidden="true" className="inline-block h-px w-8 bg-olive/50" />
                Reseñas
              </p>

              <LineasReveladas
                lineas={["Quienes han", "caminado en", "este proceso."]}
                cursiva={1}
                delay={120}
                className="display-xl mt-7 text-ink"
              />
            </div>

            {hayGoogle ? (
              <Reveal delay={280} className="lg:justify-self-end lg:pb-2">
                <BotonExterno
                  href={SITE.social.googleReviews}
                  target="_blank"
                  rel="noopener noreferrer"
                  variante="outline"
                >
                  Ver las reseñas en Google
                </BotonExterno>
                <p className="mt-4 flex items-center gap-2 text-[0.9rem] font-light text-ink-faint">
                  <BadgeCheck
                    className="size-4 text-cypress"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  {TOTAL_RESENAS} reseñas verificadas en Google
                </p>
              </Reveal>
            ) : (
              <Reveal delay={280} className="lg:justify-self-end lg:pb-2">
                <BotonEnlace to="/contacto" variante="outline">
                  Compartir mi experiencia
                </BotonEnlace>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════ REJILLA DE RESEÑAS ═══════════════════ */}
      {resenas.length > 0 ? (
        <section className="pt-14 pb-20 md:pt-20 md:pb-28" aria-labelledby="palabras-titulo">
          <div className="shell">
            <h2 id="palabras-titulo" className="sr-only">
              Reseñas de personas que han hecho un proceso
            </h2>
            <ul className="columns-1 gap-5 md:columns-2 lg:columns-3">
              {resenas.map((r, i) => (
                <TarjetaResena key={`${r.nombre}-${i}`} resena={r} indice={i} />
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* ═══════════════════ CIERRE ═══════════════════ */}
      <section
        className="section-y relative overflow-hidden border-t border-rule bg-paper"
        aria-labelledby="cierre-resenas-titulo"
      >
        <div className="grain absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 shell max-w-4xl text-center">
          <Reveal>
            <Lira className="mx-auto h-8 w-8 text-cedar" trazo={2.4} />
          </Reveal>
          <Reveal variant="curtain" delay={90}>
            <Cita tamano="sm" className="mt-9">
              <span id="cierre-resenas-titulo">{RECONOCES.cierre}</span>
            </Cita>
          </Reveal>
          <Reveal delay={170}>
            <p className="mx-auto mt-8 max-w-xl text-[1.06rem] leading-relaxed font-light text-ink-muted">
              {CTA_INTERMEDIO.texto}
            </p>
          </Reveal>
          <Reveal delay={240} className="mt-9">
            <BotonEnlace to="/contacto" variante="outline">
              {CTA_INTERMEDIO.boton}
            </BotonEnlace>
          </Reveal>
        </div>
      </section>

      <CtaFinal />
    </Layout>
  );
}

/**
 * Tarjeta de reseña. Cada cuarta se compone en tipografía display para
 * romper el ritmo de la retícula de mampostería.
 */
function TarjetaResena({ resena, indice }: { resena: Resena; indice: number }) {
  const destacada = indice % 4 === 0;
  const fecha = mesDeResena(resena.fecha);

  return (
    <li className="mb-5 break-inside-avoid">
      <Reveal
        delay={(indice % 3) * 80}
        className={`card-hover-lift relative overflow-hidden rounded-2xl border p-7 md:p-8 ${
          destacada ? "border-rule-strong bg-paper" : "border-rule bg-linen"
        }`}
      >
        {destacada ? (
          <Quote
            aria-hidden="true"
            strokeWidth={1}
            className="pointer-events-none absolute -top-4 -right-3 size-28 text-olive/[0.08]"
          />
        ) : null}

        <div className="relative">
          {resena.estrellas ? (
            <div
              className="mb-5 flex gap-1"
              aria-label={`${resena.estrellas} de 5 estrellas`}
              role="img"
            >
              {Array.from({ length: resena.estrellas }).map((_, s) => (
                <Star key={s} className="size-3.5 fill-olive text-olive" aria-hidden="true" />
              ))}
            </div>
          ) : null}

          <blockquote
            className={
              destacada
                ? "font-display text-[1.4rem] leading-snug text-ink md:text-[1.7rem]"
                : "text-[1.01rem] leading-[1.75] font-light text-ink-muted"
            }
          >
            «{resena.texto}»
          </blockquote>

          <footer className="mt-7 border-t border-rule pt-5">
            <p className="text-[0.93rem] text-ink">{resena.nombre}</p>
            {resena.contexto ? (
              <p className="mt-0.5 text-[0.83rem] font-light text-ink-faint">{resena.contexto}</p>
            ) : null}
            {fecha ? (
              <p className="mt-0.5 text-[0.83rem] font-light text-ink-faint">{fecha}</p>
            ) : null}
          </footer>
        </div>
      </Reveal>
    </li>
  );
}
