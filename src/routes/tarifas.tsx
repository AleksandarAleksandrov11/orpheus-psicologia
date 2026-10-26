import { createFileRoute, Link } from "@tanstack/react-router";

import { Layout } from "@/components/site/Layout";
import { LineasReveladas, Parallax, Reveal } from "@/components/site/motion";
import { TarifasTarjetas } from "@/components/site/TarifasTarjetas";
import { Antetitulo, BotonEnlace, Migas } from "@/components/site/ui";
import { FRECUENCIA, MOSTRAR_PRECIOS, SESIONES } from "@/content/copy";
import { SITE } from "@/content/site";
import { migasSchema, seo, tarifasSchema } from "@/lib/seo";

import { CtaFinal } from "./index";

/**
 * Tarifas en una pestaña propia: en Servicios quedaban a mitad de una página
 * larga y costaba encontrarlas. Las tarjetas son las mismas que allí.
 */
export const Route = createFileRoute("/tarifas")({
  head: () =>
    seo({
      title: "Tarifas de terapia online",
      description:
        "Primera sesión 50 €, sesión individual 65 € y bono de 4 sesiones 240 € para procesos semanales. Terapia online en toda España con Melissa González.",
      path: "/tarifas",
      image: "/og/og-servicios.jpg",
      imageAlt: "Orpheus Psicología: tarifas de terapia online",
      keywords: [
        "precio psicóloga online",
        "tarifas terapia online",
        "precio sesión psicología",
        "bono sesiones psicología",
        "psicóloga online España",
      ],
      jsonLd: [
        migasSchema([
          { nombre: "Inicio", path: "/" },
          { nombre: "Tarifas", path: "/tarifas" },
        ]),
        ...(MOSTRAR_PRECIOS && SESIONES.some((s) => s.precio) ? [tarifasSchema(SESIONES)] : []),
      ],
    }),
  component: Tarifas,
});

function Tarifas() {
  return (
    <Layout>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="aurora grain relative overflow-hidden pt-28 pb-14 md:pt-40 md:pb-24">
        <Parallax
          amount={-30}
          className="pointer-events-none absolute -top-40 -right-36 -z-10 h-[32rem] w-[32rem] rounded-full bg-aloe/50 blur-3xl"
        >
          <span className="anim-breathe block h-full w-full" />
        </Parallax>

        <div className="relative z-10 shell">
          <Migas items={[{ nombre: "Inicio", path: "/" }, { nombre: "Tarifas" }]} />

          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20">
            <div>
              <p className="eyebrow anim-fade flex items-center gap-3 text-olive">
                <span aria-hidden="true" className="inline-block h-px w-8 bg-olive/50" />
                Tarifas
              </p>

              <LineasReveladas
                lineas={["Tarifas de", "terapia online."]}
                cursiva={1}
                delay={120}
                className="display-xl mt-7 text-ink"
              />

              <p className="lede anim-fade-up mt-8 max-w-xl" style={{ animationDelay: "0.55s" }}>
                La primera sesión es para conocernos, sin compromiso de continuidad. A partir de ahí
                puedes seguir sesión a sesión o, si el proceso es semanal, con el bono de cuatro
                sesiones.
              </p>
            </div>

            {/* En móvil empujaba los precios fuera de la primera pantalla. */}
            <Reveal delay={260} variant="blur" className="hidden lg:block">
              <div className="rounded-2xl border border-rule bg-linen/80 p-7 backdrop-blur-sm md:p-9">
                <p className="eyebrow text-ink-faint">{FRECUENCIA.titulo}</p>
                <p className="mt-5 text-[1.07rem] leading-relaxed font-light text-ink-muted">
                  {FRECUENCIA.texto}
                </p>
                <Link
                  to="/servicios"
                  hash="frecuencia"
                  className="link-draw mt-6 inline-block text-[0.99rem] text-cypress"
                >
                  Ver cómo cambia el ritmo del proceso
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════ TARJETAS ═══════════════════ */}
      <section
        className="relative overflow-hidden border-y border-rule bg-paper"
        aria-labelledby="tarifas-titulo"
      >
        <div className="grain absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 shell section-y">
          <Reveal>
            <Antetitulo>Modalidades</Antetitulo>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="tarifas-titulo" className="display-md mt-6">
              Sesiones y <em className="italic">precios</em>.
            </h2>
          </Reveal>

          <TarifasTarjetas />
        </div>
      </section>

      {/* ═══════════════════ DUDAS ═══════════════════ */}
      <section className="section-y-sm" aria-labelledby="tarifas-dudas-titulo">
        <div className="shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="tarifas-dudas-titulo" className="display-sm">
              ¿Te queda alguna duda?
            </h2>
            <p className="prose-body mt-3 max-w-xl">
              Escríbeme y te respondo yo misma. {SITE.contacto.respuesta}
            </p>
          </div>
          <BotonEnlace to="/preguntas-frecuentes" variante="outline" flecha={false}>
            Leer las preguntas frecuentes
          </BotonEnlace>
        </div>
      </section>

      <CtaFinal />
    </Layout>
  );
}
