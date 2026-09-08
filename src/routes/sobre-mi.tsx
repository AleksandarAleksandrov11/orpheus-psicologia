import { createFileRoute } from "@tanstack/react-router";
import { Compass, Feather, Hourglass, Layers, Lock } from "lucide-react";

import { Layout } from "@/components/site/Layout";
import { Parallax, Reveal } from "@/components/site/motion";
import { useScrollProgress } from "@/lib/motion";
import { Antetitulo, BotonEnlace, Cita, Figura, Lira, Migas } from "@/components/site/ui";
import { ESPACIO_SEGURO, FORMACION, HISTORIA } from "@/content/copy";
import { SITE, esPendiente } from "@/content/site";
import { migasSchema, personaSchema, seo } from "@/lib/seo";
import { CtaFinal } from "./index";

import melissa1 from "@/assets/melissa-1.webp";
import melissa2 from "@/assets/melissa-2.webp";

export const Route = createFileRoute("/sobre-mi")({
  head: () =>
    seo({
      title: "Sobre mí · Psicóloga general sanitaria",
      description:
        "Mi historia, mi formación y mi manera de entender la terapia. Melissa González, psicóloga general sanitaria especializada en autoestima, autoexigencia e inseguridad.",
      path: "/sobre-mi",
      image: "/og/og-sobre-mi.jpg",
      imageAlt: "Melissa González, psicóloga general sanitaria y fundadora de Orpheus Psicología",
      type: "profile",
      keywords: [
        "Melissa González psicóloga",
        "psicóloga general sanitaria",
        "psicóloga Madrid",
        "terapia integradora",
        "psicóloga autoestima",
        "psicóloga autoexigencia",
        "terapia online España",
      ],
      jsonLd: [
        migasSchema([
          { nombre: "Inicio", path: "/" },
          { nombre: "Sobre mí", path: "/sobre-mi" },
        ]),
        { "@context": "https://schema.org", ...personaSchema() },
      ],
    }),
  component: SobreMi,
});

/** Ritmo de lectura del ensayo: columna estrecha, línea alta. */
const PARRAFO = "text-[1.14rem] leading-[1.85] font-light text-ink-muted md:text-[1.2rem]";

const ICONOS_SEGURO = [Layers, Lock, Feather, Hourglass, Compass];

function SobreMi() {
  const { ref: ensayoRef, progreso } = useScrollProgress<HTMLDivElement>();

  // Solo se publican los datos profesionales que ya están confirmados.
  const ficha = [
    { t: "Colegio profesional", d: SITE.psicologa.colegio },
    ...(esPendiente(SITE.psicologa.colegiada)
      ? []
      : [{ t: "Nº de colegiada", d: SITE.psicologa.colegiada }]),
    { t: "Modalidades", d: SITE.modalidades.join(" · ") },
  ];

  return (
    <Layout>
      {/* ═══════════════════ APERTURA ═══════════════════
          La reserva va justo debajo del retrato: de ahí en adelante
          la página es ya el relato personal, sin cortes. */}
      <section
        className="aurora grain relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
        aria-labelledby="sobre-titulo"
      >
        <Parallax
          amount={-34}
          className="pointer-events-none absolute -top-44 -left-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-olive/12 blur-3xl"
        >
          <span className="anim-breathe block h-full w-full" />
        </Parallax>

        <div className="relative z-10 shell">
          <Migas items={[{ nombre: "Inicio", path: "/" }, { nombre: "Sobre mí" }]} />

          <div className="grid items-center gap-14 lg:grid-cols-[1.06fr_0.94fr] lg:gap-20">
            <div>
              {/* Melissa pidió más cuerpo en la línea de arriba del todo. */}
              <p className="eyebrow anim-fade flex items-center gap-3 text-[0.88rem] tracking-[0.17em] text-cypress">
                <span aria-hidden="true" className="inline-block h-px w-8 bg-cypress/50" />
                {SITE.psicologa.nombre} · {SITE.psicologa.titulo}
              </p>

              <h1
                id="sobre-titulo"
                className="display-lg anim-fade-up mt-7 text-ink"
                style={{ animationDelay: "0.12s" }}
              >
                Descubrí la psicología buscando <em className="italic">entenderme</em>.
              </h1>

              <p className="lede anim-fade-up mt-8 max-w-xl" style={{ animationDelay: "0.3s" }}>
                {HISTORIA.parrafos[0]}
              </p>

              <dl
                className="anim-fade mt-12 flex flex-wrap gap-x-12 gap-y-7 border-t border-rule pt-9"
                style={{ animationDelay: "0.6s" }}
              >
                {ficha.map((f) => (
                  <div key={f.t}>
                    <dt className="eyebrow text-ink-faint">{f.t}</dt>
                    <dd className="mt-2.5 max-w-xs text-[1.07rem] leading-snug font-light text-ink">
                      {f.d}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Retrato con arco y contorno desplazado: profundidad sin sombras */}
            <div className="relative mx-auto w-full max-w-[23rem] lg:max-w-none">
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="arch absolute inset-0 translate-x-4 translate-y-5 border border-cedar/45"
                />
                <Parallax amount={-22}>
                  <Figura
                    src={melissa2}
                    alt="Melissa González, psicóloga general sanitaria y fundadora de Orpheus Psicología"
                    ratio="4 / 5"
                    width={900}
                    height={993}
                    eager
                    className="arch anim-fade relative"
                  />
                </Parallax>
                <span
                  aria-hidden="true"
                  className="eyebrow absolute top-1/2 -left-10 hidden -translate-y-1/2 -rotate-90 whitespace-nowrap text-ink-faint lg:block"
                >
                  Orpheus · Psicología
                </span>
              </div>

              {/* La reserva, pegada al retrato */}
              <div
                className="anim-fade-up mt-9 flex flex-wrap gap-3"
                style={{ animationDelay: "0.5s" }}
              >
                <BotonEnlace to="/contacto">Reservar una primera sesión</BotonEnlace>
                <BotonEnlace to="/servicios" variante="outline" flecha={false}>
                  Cómo trabajo
                </BotonEnlace>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ EL ENSAYO ═══════════════════ */}
      <section
        className="section-y relative border-t border-rule"
        aria-labelledby="historia-titulo"
      >
        <div className="shell grid gap-10 lg:grid-cols-[12rem_1fr] lg:gap-20">
          {/* Raíl de lectura: título, avance y firma */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h2 id="historia-titulo" className="eyebrow text-olive">
              {HISTORIA.eyebrow}
            </h2>
            <div aria-hidden="true" className="mt-7 hidden h-36 w-px bg-rule lg:block">
              <span
                className="block h-full w-px origin-top bg-cypress"
                style={{ transform: `scaleY(${progreso.toFixed(3)})` }}
              />
            </div>
            <p className="mt-7 hidden text-[0.86rem] leading-relaxed font-light text-ink-faint lg:block">
              {SITE.psicologa.nombre}
              <br />
              {SITE.psicologa.titulo}
            </p>
          </div>

          <div ref={ensayoRef} className="max-w-2xl">
            <Reveal>
              <p className="text-[1.2rem] leading-[1.8] font-light text-ink md:text-[1.22rem]">
                <span className="float-left mt-2 mr-3.5 font-display text-[3.6rem] leading-[0.7] text-cypress">
                  {HISTORIA.parrafos[1].charAt(0)}
                </span>
                {HISTORIA.parrafos[1].slice(1)}
              </p>
            </Reveal>

            <Reveal delay={90} className="mt-7">
              <p className={PARRAFO}>{HISTORIA.parrafos[2]}</p>
            </Reveal>

            {/* La frase que enterró: tachada, desvanecida y centrada */}
            <Reveal variant="up" delay={60} className="my-16 text-center md:my-24">
              <span className="relative inline-block">
                <span
                  className="display-lg block text-cypress/30 italic"
                  style={{
                    maskImage: "linear-gradient(100deg, #000 52%, rgba(0,0,0,0.12) 100%)",
                    WebkitMaskImage: "linear-gradient(100deg, #000 52%, rgba(0,0,0,0.12) 100%)",
                  }}
                >
                  {HISTORIA.frase}
                </span>
                <Reveal
                  variant="mask"
                  delay={280}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-[-4%] top-[52%]"
                >
                  <span className="block h-px bg-cypress/55" />
                </Reveal>
              </span>
            </Reveal>

            {HISTORIA.parrafos.slice(3, 6).map((p, i) => (
              <Reveal key={p.slice(0, 24)} delay={i * 80} className="mt-7">
                <p className={PARRAFO}>{p}</p>
              </Reveal>
            ))}

            <Reveal
              variant="curtain"
              delay={80}
              className="my-14 border-l border-olive/45 pl-7 md:my-20 lg:-ml-20 lg:pl-12"
            >
              <Cita tamano="sm">{HISTORIA.cita}</Cita>
            </Reveal>

            {HISTORIA.parrafos.slice(6).map((p, i) => (
              <Reveal key={p.slice(0, 24)} delay={i * 80} className="mt-7">
                <p className={PARRAFO}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FORMACIÓN ═══════════════════ */}
      <section className="relative overflow-hidden bg-paper" aria-labelledby="formacion-titulo">
        <div className="grain absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 shell section-y">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Reveal>
                <Antetitulo>{FORMACION.eyebrow}</Antetitulo>
              </Reveal>
              <Reveal delay={80}>
                <h2 id="formacion-titulo" className="display-md mt-6">
                  Rigor que se <em className="italic">actualiza</em>.
                </h2>
              </Reveal>
            </div>

            <div>
              <ol className="border-t border-rule-strong">
                {FORMACION.items.map((f, i) => (
                  <Reveal
                    as="li"
                    key={f.t}
                    delay={(i % 4) * 60}
                    className="group -mx-4 grid grid-cols-[2.25rem_1fr] items-baseline gap-x-4 rounded-lg border-b border-rule px-4 py-6 transition-colors duration-500 hover:bg-linen/70 md:-mx-6 md:grid-cols-[3.25rem_1fr_auto] md:gap-x-8 md:px-6 md:py-7"
                  >
                    <span className="eyebrow tabular-nums text-olive/60 transition-colors duration-500 group-hover:text-cypress">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-[1.28rem] leading-snug text-ink md:text-[1.5rem]">
                      {f.t}
                    </h3>
                    {f.d ? (
                      <p className="col-start-2 mt-2 text-[0.84rem] font-light text-ink-faint md:col-start-3 md:mt-0 md:text-right">
                        {f.d}
                      </p>
                    ) : null}
                  </Reveal>
                ))}
              </ol>

              <Reveal delay={140} className="mt-12">
                <p className="cita-menor mx-auto max-w-2xl text-center text-[1.32rem] leading-snug text-cypress md:text-[1.5rem]">
                  {FORMACION.nota}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ LO QUE SOSTIENE EL TRABAJO ═══════════════════ */}
      <section className="section-y" aria-labelledby="seguro-titulo">
        <div className="shell grid items-center gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
          <Reveal variant="scale">
            <figure className="mx-auto max-w-sm lg:mx-0 lg:max-w-none">
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute inset-[-4%] rounded-full border border-cedar/45"
                />
                <Figura
                  src={melissa1}
                  alt="Melissa González, psicóloga general sanitaria en Madrid"
                  ratio="1 / 1"
                  width={785}
                  height={791}
                  className="rounded-full"
                  imgClassName="scale-[1.04]"
                />
              </div>
              <figcaption className="eyebrow mt-9 flex items-center gap-3 text-ink-faint">
                <span aria-hidden="true" className="inline-block h-px w-7 bg-olive/50" />
                {SITE.modalidades.join(" · ")}
              </figcaption>
            </figure>
          </Reveal>

          <div>
            <Reveal>
              <Antetitulo>{ESPACIO_SEGURO.eyebrow}</Antetitulo>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="seguro-titulo" className="display-md mt-6">
                Lo que <em className="italic">sostiene</em> el trabajo.
              </h2>
            </Reveal>

            <ul className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {ESPACIO_SEGURO.items.map((item, i) => {
                const Icono = ICONOS_SEGURO[i] ?? Lock;
                return (
                  <Reveal
                    as="li"
                    key={item.t}
                    delay={i * 70}
                    className="border-t border-rule-strong pt-6"
                  >
                    <span className="grid size-9 place-items-center rounded-full border border-rule-strong text-cypress">
                      <Icono className="size-4" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-[1.28rem] text-ink md:text-[1.42rem]">
                      {item.t}
                    </h3>
                    <p className="mt-2.5 text-[1rem] leading-relaxed font-light text-ink-muted">
                      {item.d}
                    </p>
                  </Reveal>
                );
              })}
            </ul>

            <Reveal delay={200} className="mt-12 flex items-start gap-6 border-t border-rule pt-9">
              <Lira className="mt-1 size-8 shrink-0 text-olive/60" trazo={2.4} />
              <p className="cita-menor text-[1.32rem] leading-snug text-cypress md:text-[1.5rem]">
                No hay nada roto en ti que haya que arreglar. Solo una historia por comprender.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA FINAL ═══════════════════ */}
      <CtaFinal />
    </Layout>
  );
}
