import { createFileRoute, Link } from "@tanstack/react-router";

import { Layout } from "@/components/site/Layout";
import { LineasReveladas, Parallax, Reveal } from "@/components/site/motion";
import { Antetitulo, BotonEnlace, Figura, Lira, Migas } from "@/components/site/ui";
import { FILOSOFIA, MITO, PROCESO_VIVO } from "@/content/copy";
import { migasSchema, seo } from "@/lib/seo";

import { CtaFinal } from "./index";

import texNiebla from "@/assets/tex-niebla.webp";
import texNieblaSm from "@/assets/tex-niebla@sm.webp";
import texRaices from "@/assets/tex-raices.webp";
import texRaicesSm from "@/assets/tex-raices@sm.webp";

export const Route = createFileRoute("/por-que-orpheus")({
  head: () =>
    seo({
      title: "Por qué Orpheus",
      description:
        "De dónde viene el nombre: el mito de Orfeo, el descenso y el regreso. La idea que sostiene esta forma de entender la psicoterapia.",
      path: "/por-que-orpheus",
      image: "/og/og-orpheus.jpg",
      imageAlt: "Orpheus Psicología: descender para poder elevarse",
      keywords: [
        "mito de Orfeo psicología",
        "Orpheus Psicología",
        "descender para elevarse",
        "psicoterapia significado",
        "terapia autoconocimiento",
      ],
      jsonLd: [
        migasSchema([
          { nombre: "Inicio", path: "/" },
          { nombre: "Por qué Orpheus", path: "/por-que-orpheus" },
        ]),
      ],
    }),
  component: PorQueOrpheus,
});

function PorQueOrpheus() {
  return (
    <Layout>
      {/* ═══════════════════ APERTURA ═══════════════════ */}
      <section className="aurora grain relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <Parallax
          amount={-34}
          className="pointer-events-none absolute -top-40 -right-36 -z-10 h-[34rem] w-[34rem] rounded-full bg-olive/15 blur-3xl"
        >
          <span className="anim-breathe block h-full w-full" />
        </Parallax>

        <div className="relative z-10 shell">
          <Migas items={[{ nombre: "Inicio", path: "/" }, { nombre: "Por qué Orpheus" }]} />

          <div className="grid items-end gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <p className="eyebrow anim-fade flex items-center gap-3 text-olive">
                <span aria-hidden="true" className="inline-block h-px w-8 bg-olive/50" />
                {MITO.eyebrow}
              </p>

              <LineasReveladas
                lineas={["Descender", "para poder", "elevarse."]}
                cursiva={2}
                delay={120}
                className="display-xl mt-7 text-ink"
              />

              <p className="lede anim-fade-up mt-8 max-w-xl" style={{ animationDelay: "0.55s" }}>
                {MITO.cuerpo[0]}
              </p>
            </div>

            {/* La lira sola dejaba medio hero vacío en escritorio. Va dentro
                de un arco con la niebla del descenso, el mismo recurso que el
                retrato de Sobre mí, y la marca encima. */}
            <Reveal delay={240} variant="scale" className="lg:justify-self-end lg:pb-2">
              <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-[22rem] lg:max-w-[24rem]">
                <span
                  aria-hidden="true"
                  className="arch absolute inset-0 translate-x-4 translate-y-5 border border-cedar/45"
                />
                <Figura
                  src={texNiebla}
                  srcSet={`${texNieblaSm} 900w, ${texNiebla} 1800w`}
                  sizes="(min-width: 1024px) 24rem, 22rem"
                  alt="Niebla entre los árboles, la imagen del descenso que da nombre a Orpheus"
                  ratio="4 / 5"
                  width={1800}
                  height={1012}
                  eager
                  className="arch relative"
                  imgClassName="brightness-[0.92]"
                />
                <Lira
                  className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 text-bone/90 md:h-28 md:w-28"
                  trazo={1.5}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════ EL DESCENSO ═══════════════════ */}
      <section
        className="relative isolate overflow-hidden bg-moss text-on-dark"
        aria-labelledby="descenso-titulo"
      >
        <Parallax amount={70} className="absolute inset-0 -z-10 scale-110">
          <img
            src={texNiebla}
            srcSet={`${texNieblaSm} 900w, ${texNiebla} 1800w`}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1800}
            height={1012}
            className="h-full w-full object-cover opacity-30"
          />
        </Parallax>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-moss via-moss/85 to-moss"
        />
        <div className="grain-dark absolute inset-0 -z-10" aria-hidden="true" />

        <div className="on-dark shell section-y relative">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <Reveal>
                <Antetitulo oscuro>El viaje hacia dentro</Antetitulo>
              </Reveal>
              <Reveal delay={80}>
                {/* Los cortes van a mano: al aire, la tercera línea quedaba
                    en «y regresar.» detrás de una «y» suelta. */}
                <h2 id="descenso-titulo" className="display-lg mt-6 text-balance text-on-dark">
                  <span className="block">Atravesar</span>
                  <span className="block">la oscuridad</span>
                  <span className="block">
                    y <em className="italic">regresar</em>.
                  </span>
                </h2>
              </Reveal>
              {/* Melissa la veía demasiado grande y suelta al final de la
                  sección: aquí funciona como remate del propio titular. */}
              <Reveal delay={160}>
                <p className="cita-menor mt-8 max-w-sm text-[1.18rem] leading-snug text-on-dark-muted md:text-[1.3rem]">
                  {MITO.cita}
                </p>
              </Reveal>
            </div>

            <div className="space-y-7">
              <Reveal>
                <p className="text-[1.12rem] leading-[1.8] font-light text-on-dark-muted md:text-[1.18rem]">
                  {MITO.cuerpo[1]}
                </p>
              </Reveal>
              <Reveal delay={120}>
                <hr className="rule-fade-dark my-9" />
              </Reveal>
              {FILOSOFIA.parrafos.slice(0, 2).map((p, i) => (
                <Reveal key={p.slice(0, 24)} delay={i * 90}>
                  <p className="text-[1.12rem] leading-[1.8] font-light text-on-dark-muted md:text-[1.18rem]">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {FILOSOFIA.sinLista.map((s, i) => (
              <Reveal
                key={s}
                delay={i * 100}
                className="border-t border-on-dark/15 pt-5 text-[1.07rem] font-light text-on-dark-muted"
              >
                {s}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ NADA QUE ARREGLAR ═══════════════════ */}
      <section className="section-y" aria-labelledby="comprender-titulo">
        <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <Antetitulo>{FILOSOFIA.eyebrow}</Antetitulo>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="comprender-titulo" className="display-md mt-6">
                Comprender antes de <em className="italic">cambiar</em>.
              </h2>
            </Reveal>
            <Reveal delay={200} className="mt-10 flex flex-wrap gap-3">
              <BotonEnlace to="/servicios" variante="outline">
                Ver cómo trabajo
              </BotonEnlace>
            </Reveal>
            <Reveal delay={260}>
              <p className="mt-8 max-w-sm text-[1.01rem] leading-relaxed font-light text-ink-faint">
                El mito da para más de lo que cabe aquí.{" "}
                <Link
                  to="/diario/$slug"
                  params={{ slug: "el-mito-de-orfeo-y-el-proceso-terapeutico" }}
                  className="link-undraw text-cypress"
                >
                  Lo cuento con calma en el Diario
                </Link>
                .
              </p>
            </Reveal>
          </div>

          <div className="space-y-7">
            {FILOSOFIA.parrafos.slice(2).map((p, i) => (
              <Reveal key={p.slice(0, 24)} delay={i * 90}>
                <p className="text-[1.12rem] leading-[1.85] font-light text-ink-muted md:text-[1.18rem]">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ UN PROCESO, NO UN PRODUCTO ═══════════════════ */}
      <section
        className="relative isolate overflow-hidden bg-cypress text-on-dark"
        aria-labelledby="proceso-titulo"
      >
        <Parallax amount={70} className="absolute inset-0 -z-10 scale-110">
          <img
            src={texRaices}
            srcSet={`${texRaicesSm} 640w, ${texRaices} 1100w`}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1100}
            height={1375}
            className="h-full w-full object-cover opacity-25"
          />
        </Parallax>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-br from-cypress via-cypress/90 to-moss"
        />
        <div className="grain-dark absolute inset-0 -z-10" aria-hidden="true" />

        <div className="on-dark shell section-y relative">
          <Reveal>
            <Antetitulo oscuro>{PROCESO_VIVO.eyebrow}</Antetitulo>
          </Reveal>

          <h2 id="proceso-titulo" className="display-lg mt-9 max-w-5xl text-on-dark">
            <Reveal as="span" className="block">
              {PROCESO_VIVO.cita[0]}
            </Reveal>
            <Reveal as="span" delay={150} className="block italic">
              {PROCESO_VIVO.cita[1]}
            </Reveal>
          </h2>

          <div className="mt-16 grid gap-9 border-t border-on-dark/15 pt-10 md:mt-20 md:grid-cols-2 md:gap-16">
            {PROCESO_VIVO.parrafos.map((p, i) => (
              <Reveal key={p.slice(0, 24)} delay={i * 110}>
                <p className="text-[1.12rem] leading-[1.8] font-light text-on-dark-muted md:text-[1.18rem]">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaFinal />
    </Layout>
  );
}
