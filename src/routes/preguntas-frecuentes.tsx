import { createFileRoute, Link } from "@tanstack/react-router";

import { Layout } from "@/components/site/Layout";
import { LineasReveladas, Parallax, Reveal } from "@/components/site/motion";
import { Acordeon, Antetitulo, BotonEnlace, Migas } from "@/components/site/ui";
import { FAQ } from "@/content/copy";
import { SITE } from "@/content/site";
import { faqSchema, migasSchema, seo } from "@/lib/seo";

import { CtaFinal } from "./index";

export const Route = createFileRoute("/preguntas-frecuentes")({
  head: () =>
    seo({
      title: "Preguntas frecuentes sobre la terapia",
      description:
        "Cuánto dura un proceso, cada cuánto son las sesiones, si la terapia online funciona igual y qué pasa con la confidencialidad. Las dudas de siempre, resueltas.",
      path: "/preguntas-frecuentes",
      image: "/og/og-faq.jpg",
      imageAlt: "Orpheus Psicología: preguntas frecuentes antes de dar el primer paso",
      keywords: [
        "dudas terapia psicológica",
        "cuánto dura la terapia",
        "terapia online funciona",
        "confidencialidad psicólogo",
        "primera sesión psicología",
        "diferencia psicólogo psiquiatra",
      ],
      jsonLd: [
        migasSchema([
          { nombre: "Inicio", path: "/" },
          { nombre: "Preguntas frecuentes", path: "/preguntas-frecuentes" },
        ]),
        faqSchema(FAQ),
      ],
    }),
  component: Preguntas,
});

/** Atajos temáticos: la lista es larga y conviene poder orientarse. */
const BLOQUES = [
  { titulo: "Antes de empezar", desde: 0, hasta: 2 },
  { titulo: "Cómo funciona el proceso", desde: 2, hasta: 7 },
  { titulo: "Lo práctico", desde: 7, hasta: FAQ.length },
];

function Preguntas() {
  return (
    <Layout>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="aurora grain relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <Parallax
          amount={-30}
          className="pointer-events-none absolute -top-40 -left-36 -z-10 h-[32rem] w-[32rem] rounded-full bg-aloe/50 blur-3xl"
        >
          <span className="anim-breathe block h-full w-full" />
        </Parallax>

        <div className="relative z-10 shell">
          <Migas items={[{ nombre: "Inicio", path: "/" }, { nombre: "Preguntas frecuentes" }]} />

          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20">
            <div>
              <p className="eyebrow anim-fade flex items-center gap-3 text-olive">
                <span aria-hidden="true" className="inline-block h-px w-8 bg-olive/50" />
                Dudas frecuentes
              </p>

              <LineasReveladas
                lineas={["Antes de dar el", "primer paso."]}
                cursiva={1}
                delay={120}
                className="display-xl mt-7 text-ink"
              />

              <p className="lede anim-fade-up mt-8 max-w-xl" style={{ animationDelay: "0.55s" }}>
                Las preguntas que más me llegan antes de reservar una sesión, respondidas sin
                rodeos.
              </p>
            </div>

            <Reveal delay={260} variant="blur">
              <div className="rounded-2xl border border-rule bg-linen/80 p-7 backdrop-blur-sm md:p-9">
                <p className="eyebrow text-ink-faint">Tu duda no está aquí</p>
                <p className="mt-5 text-[1.01rem] leading-relaxed font-light text-ink-muted">
                  Escríbeme y te respondo yo misma. {SITE.contacto.respuesta}
                </p>
                <div className="mt-7">
                  <BotonEnlace to="/contacto" variante="outline">
                    Preguntar directamente
                  </BotonEnlace>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════ LISTA ═══════════════════ */}
      <section className="section-y border-t border-rule" aria-labelledby="faq-titulo">
        <div className="shell">
          <h2 id="faq-titulo" className="sr-only">
            Preguntas frecuentes
          </h2>

          <div className="grid gap-14 lg:grid-cols-[14rem_1fr] lg:gap-20">
            <nav aria-label="Bloques de preguntas" className="lg:sticky lg:top-32 lg:self-start">
              <p className="eyebrow text-ink-faint">En esta página</p>
              <ul className="mt-6 space-y-3.5">
                {BLOQUES.map((b, i) => (
                  <li key={b.titulo}>
                    <a
                      href={`#bloque-${i}`}
                      className="link-draw text-[0.99rem] font-light text-ink-muted transition-colors duration-400 hover:text-cypress"
                    >
                      {b.titulo}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="max-w-3xl space-y-16">
              {BLOQUES.map((b, i) => (
                <div key={b.titulo} id={`bloque-${i}`} className="scroll-mt-28">
                  <Reveal>
                    <Antetitulo>{b.titulo}</Antetitulo>
                  </Reveal>
                  <Reveal delay={100} className="mt-8">
                    <Acordeon items={FAQ.slice(b.desde, b.hasta)} />
                  </Reveal>
                </div>
              ))}

              <Reveal delay={120}>
                <p className="prose-body">
                  ¿Quieres ver cómo es el proceso completo?{" "}
                  <Link to="/servicios" className="link-undraw text-cypress">
                    Aquí lo cuento con detalle
                  </Link>
                  .
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CtaFinal />
    </Layout>
  );
}
