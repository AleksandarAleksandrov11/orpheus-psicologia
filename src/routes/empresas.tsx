import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Check, Quote, Users } from "lucide-react";

import { Layout } from "@/components/site/Layout";
import { LineasReveladas, Parallax, Reveal } from "@/components/site/motion";
import { BloqueSimulador } from "@/components/site/SimuladorEmpresas";
import { Antetitulo, BotonEnlace, BotonExterno, Cita, Migas, Numero } from "@/components/site/ui";
import { EMPRESAS } from "@/content/copy";
import { RESENAS_EMPRESA } from "@/content/resenas";
import { SITE } from "@/content/site";
import { absolute, migasSchema, seo } from "@/lib/seo";

import { CtaFinal } from "./index";

import texMontanas from "@/assets/tex-montanas.webp";
import texMontanasSm from "@/assets/tex-montanas@sm.webp";

/** Servicio B2B descrito para los buscadores, con su horquilla de precios. */
function servicioEmpresasSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Bienestar emocional para empresas y equipos",
    serviceType: "Psicología organizacional y bienestar emocional",
    description:
      "Sesiones de concienciación en salud mental y psicoterapia individual subvencionada por la empresa, con facturación a empresa.",
    provider: { "@id": `${SITE.url}/#organizacion` },
    areaServed: { "@type": "Country", name: "España" },
    url: absolute("/empresas"),
    audience: { "@type": "BusinessAudience", name: "Empresas y equipos de trabajo" },
    offers: [
      {
        "@type": "Offer",
        name: "Sesión de concienciación en salud mental",
        price: "500",
        priceCurrency: "EUR",
        description: "Cuatro horas en grupo, hasta 30 personas por sesión.",
      },
      {
        "@type": "Offer",
        name: "Psicoterapia para empleados",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: "54",
          maxPrice: "60",
          priceCurrency: "EUR",
          description: "Precio por sesión según el volumen contratado.",
        },
      },
    ],
  };
}

export const Route = createFileRoute("/empresas")({
  head: () =>
    seo({
      title: "Bienestar emocional para empresas y equipos",
      description:
        "Psicoterapia como beneficio social: sesiones de concienciación y terapia individual subvencionada. Calcula el coste para tu equipo con el simulador.",
      path: "/empresas",
      image: "/og/og-empresas.jpg",
      imageAlt: "Orpheus Psicología: bienestar emocional en entornos de trabajo",
      keywords: [
        "bienestar emocional empresas",
        "psicóloga para empresas",
        "psicoterapia beneficio social",
        "prevención burnout equipos",
        "salud mental en el trabajo",
        "psicología organizacional Madrid",
      ],
      jsonLd: [
        migasSchema([
          { nombre: "Inicio", path: "/" },
          { nombre: "Para empresas", path: "/empresas" },
        ]),
        servicioEmpresasSchema(),
      ],
    }),
  component: Empresas,
});

function Empresas() {
  return (
    <Layout>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="aurora grain relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <Parallax
          amount={-32}
          className="pointer-events-none absolute -top-40 -right-36 -z-10 h-[34rem] w-[34rem] rounded-full bg-cedar/25 blur-3xl"
        >
          <span className="anim-breathe block h-full w-full" />
        </Parallax>

        <div className="relative z-10 shell">
          <Migas items={[{ nombre: "Inicio", path: "/" }, { nombre: "Para empresas" }]} />

          <div className="grid gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:items-end lg:gap-20">
            <div>
              <p className="eyebrow anim-fade flex items-center gap-3 text-olive">
                <span aria-hidden="true" className="inline-block h-px w-8 bg-olive/50" />
                {EMPRESAS.eyebrow}
              </p>

              <LineasReveladas
                lineas={["Bienestar", "emocional en", "entornos de", "trabajo."]}
                cursiva={3}
                delay={120}
                className="display-xl mt-7 text-ink"
              />

              <p className="lede anim-fade-up mt-8 max-w-xl" style={{ animationDelay: "0.55s" }}>
                {EMPRESAS.entradilla}
              </p>

              <div
                className="anim-fade-up mt-10 flex flex-wrap gap-3"
                style={{ animationDelay: "0.68s" }}
              >
                <BotonEnlace to="/empresas" hash="simulador">
                  Calcular el coste
                </BotonEnlace>
                <BotonExterno
                  href={EMPRESAS.dosier.archivo}
                  download
                  variante="outline"
                  flecha={false}
                >
                  {EMPRESAS.dosier.etiqueta}
                </BotonExterno>
              </div>
            </div>

            {/* Reseña real de una empresa que ya ha hecho la intervención */}
            {RESENAS_EMPRESA.slice(0, 1).map((r) => (
              <Reveal key={r.nombre} delay={280} variant="blur">
                <div className="rounded-2xl border border-rule bg-linen/85 p-7 backdrop-blur-sm md:p-9">
                  <Quote aria-hidden="true" strokeWidth={1} className="size-7 text-olive/45" />
                  <blockquote className="mt-4 font-display text-[1.18rem] leading-snug text-ink md:text-[1.32rem]">
                    «{r.texto}»
                  </blockquote>
                  <footer className="mt-6 border-t border-rule pt-4">
                    <p className="text-[0.93rem] text-ink">{r.nombre}</p>
                    {r.verificada ? (
                      <p className="eyebrow mt-3 flex items-center gap-1.5 text-cypress">
                        <BadgeCheck className="size-3.5" strokeWidth={1.7} aria-hidden="true" />
                        Verificada en Google
                      </p>
                    ) : null}
                  </footer>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ EL PROBLEMA ═══════════════════ */}
      <section
        className="relative isolate overflow-hidden bg-moss text-on-dark"
        aria-labelledby="desgaste-titulo"
      >
        <Parallax amount={70} className="absolute inset-0 -z-10 scale-110">
          <img
            src={texMontanas}
            srcSet={`${texMontanasSm} 800w, ${texMontanas} 1600w`}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1600}
            height={1000}
            className="h-full w-full object-cover opacity-25"
          />
        </Parallax>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-moss via-moss/85 to-cypress"
        />
        <div className="grain-dark absolute inset-0 -z-10" aria-hidden="true" />

        <div className="on-dark shell section-y-sm relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <Reveal>
              <Users className="size-10 text-on-dark/30" strokeWidth={1.1} aria-hidden="true" />
            </Reveal>
            <Reveal delay={80}>
              <h2 id="desgaste-titulo" className="display-md mt-8 text-on-dark">
                El desgaste también <em className="italic">se cuida</em>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <p className="text-[1.06rem] leading-[1.8] font-light text-on-dark-muted md:text-[1.12rem]">
              {EMPRESAS.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ QUÉ INCLUYE ═══════════════════ */}
      <section className="section-y" aria-labelledby="servicios-b2b-titulo">
        <div className="shell">
          <div className="max-w-3xl">
            <Reveal>
              <Antetitulo>Qué incluye</Antetitulo>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="servicios-b2b-titulo" className="display-md mt-6">
                Dos servicios que <em className="italic">encajan</em>.
              </h2>
            </Reveal>
          </div>

          <ol className="mt-14 border-t border-rule-strong md:mt-20">
            {EMPRESAS.servicios.map((s, i) => (
              <Reveal
                as="li"
                key={s.t}
                delay={i * 90}
                className="grid gap-3 border-b border-rule-strong py-9 md:grid-cols-[4rem_1fr_1.2fr] md:items-baseline md:gap-10"
              >
                <Numero>{String(i + 1).padStart(2, "0")}</Numero>
                <div>
                  <h3 className="font-display text-[1.55rem] leading-tight text-ink md:text-[1.95rem]">
                    {s.t}
                  </h3>
                  <p className="mt-2.5 text-[0.95rem] leading-snug font-light text-cypress italic">
                    {s.detalle}
                  </p>
                </div>
                <p className="prose-body md:pt-1">{s.d}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={140}>
            <p className="mt-8 text-[0.95rem] font-light text-ink-faint">{EMPRESAS.contratacion}</p>
          </Reveal>

          {/* Beneficios, en dos columnas enfrentadas */}
          <div className="mt-16 grid gap-5 md:mt-20 md:grid-cols-2">
            {EMPRESAS.beneficios.map((b, i) => (
              <Reveal
                key={b.titulo}
                variant="scale"
                delay={i * 110}
                className={`flex flex-col rounded-3xl p-8 md:p-10 ${
                  i === 0
                    ? "card-paper"
                    : "on-dark grain-dark relative isolate overflow-hidden bg-cypress"
                }`}
              >
                <p className={`eyebrow ${i === 0 ? "text-olive" : "text-on-dark-faint"}`}>
                  {b.titulo}
                </p>
                <ul className="mt-8 space-y-4">
                  {b.items.map((item) => (
                    <li
                      key={item}
                      className={`flex gap-3.5 text-[1.01rem] font-light ${
                        i === 0 ? "text-ink" : "text-on-dark-muted"
                      }`}
                    >
                      <Check
                        className={`mt-1.5 size-3.5 shrink-0 ${i === 0 ? "text-olive" : "text-aloe"}`}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal variant="mask" delay={120} className="mt-16">
            <Cita tamano="sm" className="max-w-3xl">
              {EMPRESAS.cadaEquipo}
            </Cita>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ SIMULADOR ═══════════════════ */}
      <section
        id="simulador"
        className="relative scroll-mt-28 overflow-hidden border-y border-rule bg-paper"
        aria-labelledby="simulador-titulo"
      >
        <div className="grain absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 shell section-y">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
            <div>
              <Reveal>
                <Antetitulo>{EMPRESAS.simulador.eyebrow}</Antetitulo>
              </Reveal>
              <Reveal delay={80}>
                <h2 id="simulador-titulo" className="display-md mt-6">
                  Calcula lo que costaría para tu <em className="italic">equipo</em>.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={160}>
              <p className="prose-body">{EMPRESAS.simulador.intro}</p>
            </Reveal>
          </div>

          <div className="mt-14">
            <BloqueSimulador />
          </div>
        </div>
      </section>

      <CtaFinal />
    </Layout>
  );
}
