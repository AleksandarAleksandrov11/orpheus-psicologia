import { createFileRoute } from "@tanstack/react-router";
import { Compass, Feather, Hourglass, Lock } from "lucide-react";

import { Layout } from "@/components/site/Layout";
import { Parallax, Reveal } from "@/components/site/motion";
import { useScrollProgress } from "@/lib/motion";
import { Antetitulo, BotonEnlace, Cita, Figura, Lira, Migas } from "@/components/site/ui";
import {
  ENFOQUE,
  ESPACIO_SEGURO,
  FORMACION,
  HISTORIA,
  PROCESO_VIVO,
  VALORES,
} from "@/content/copy";
import { SITE, esPendiente } from "@/content/site";
import { migasSchema, personaSchema, seo } from "@/lib/seo";
import { CtaFinal } from "./index";

import melissa1 from "@/assets/melissa-1.webp";
import melissa2 from "@/assets/melissa-2.webp";
import texRaices from "@/assets/tex-raices.webp";
import texRaicesSm from "@/assets/tex-raices@sm.webp";

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
const PARRAFO = "text-[1.05rem] leading-[1.85] font-light text-ink-muted md:text-[1.11rem]";

/** Escalones del enfoque: cada modelo entra un poco más adentro. */
const ESCALON = ["md:ml-0", "md:ml-[7%]", "md:ml-[14%]", "md:ml-[21%]"];
const ROMANOS = ["I", "II", "III", "IV"];

/** Reparto del mosaico de valores (3 columnas en escritorio). */
const MOSAICO = ["lg:row-span-2", "lg:col-span-2", "", "", "lg:col-span-3"];

const ICONOS_SEGURO = [Lock, Feather, Hourglass, Compass];

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
      {/* ═══════════════════ APERTURA ═══════════════════ */}
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
              <p className="eyebrow anim-fade flex items-center gap-3 text-olive">
                <span aria-hidden="true" className="inline-block h-px w-8 bg-olive/50" />
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

              <div
                className="anim-fade-up mt-10 flex flex-wrap gap-3"
                style={{ animationDelay: "0.44s" }}
              >
                <BotonEnlace to="/contacto">Reservar una primera sesión</BotonEnlace>
                <BotonEnlace to="/servicios" variante="outline" flecha={false}>
                  Cómo trabajo
                </BotonEnlace>
              </div>
            </div>

            {/* Retrato con arco y contorno desplazado: profundidad sin sombras */}
            <div className="relative mx-auto w-full max-w-[23rem] lg:max-w-none">
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
          </div>

          <dl
            className="anim-fade mt-16 flex flex-wrap gap-x-14 gap-y-7 border-t border-rule pt-9"
            style={{ animationDelay: "0.7s" }}
          >
            {ficha.map((f) => (
              <div key={f.t}>
                <dt className="eyebrow text-ink-faint">{f.t}</dt>
                <dd className="mt-2.5 max-w-xs text-[0.95rem] leading-snug font-light text-ink">
                  {f.d}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ═══════════════════ EL ENSAYO ═══════════════════ */}
      <section className="section-y relative" aria-labelledby="historia-titulo">
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
            <p className="mt-7 hidden text-[0.78rem] leading-relaxed font-light text-ink-faint lg:block">
              {SITE.psicologa.nombre}
              <br />
              {SITE.psicologa.titulo}
            </p>
          </div>

          <div ref={ensayoRef} className="max-w-2xl">
            <Reveal>
              <p className="text-[1.12rem] leading-[1.8] font-light text-ink md:text-[1.2rem]">
                <span className="float-left mt-2 mr-3.5 font-display text-[3.6rem] leading-[0.7] text-cypress">
                  {HISTORIA.parrafos[1].charAt(0)}
                </span>
                {HISTORIA.parrafos[1].slice(1)}
              </p>
            </Reveal>

            <Reveal delay={90} className="mt-7">
              <p className={PARRAFO}>{HISTORIA.parrafos[2]}</p>
            </Reveal>

            {/* La frase que enterró: tachada y desvanecida */}
            <Reveal variant="up" delay={60} className="my-16 md:my-24 lg:-ml-20">
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

      {/* ═══════════════════ UN PROCESO, NO UN PRODUCTO ═══════════════════ */}
      <section
        className="relative isolate overflow-hidden bg-moss text-on-dark"
        aria-labelledby="proceso-titulo"
      >
        <Parallax amount={80} className="absolute inset-0 -z-10 scale-110">
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
          className="absolute inset-0 -z-10 bg-gradient-to-b from-moss via-moss/80 to-moss"
        />
        <div className="grain-dark absolute inset-0 -z-10" aria-hidden="true" />

        <Lira
          className="pointer-events-none absolute -right-16 -bottom-24 h-[26rem] w-[26rem] text-on-dark/[0.05]"
          strokeWidth={5}
        />

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
                <p className="text-[1.02rem] leading-[1.8] font-light text-on-dark-muted md:text-[1.08rem]">
                  {p}
                </p>
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
                    <h3 className="font-display text-[1.25rem] leading-snug text-ink md:text-[1.5rem]">
                      {f.t}
                    </h3>
                    {f.d ? (
                      <p className="col-start-2 mt-2 text-[0.8rem] font-light text-ink-faint md:col-start-3 md:mt-0 md:text-right">
                        {f.d}
                      </p>
                    ) : null}
                  </Reveal>
                ))}
              </ol>

              <Reveal delay={100} className="mt-10 flex items-baseline gap-6">
                <span aria-hidden="true" className="h-px w-12 shrink-0 bg-olive/50" />
                <p className="display-sm text-cypress italic">{FORMACION.continuo}</p>
              </Reveal>

              <Reveal delay={170}>
                <p className="prose-body mt-8 max-w-xl">{FORMACION.nota}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ ENFOQUE ═══════════════════ */}
      <section className="section-y" aria-labelledby="enfoque-titulo">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
            <div>
              <Reveal>
                <Antetitulo>{ENFOQUE.eyebrow}</Antetitulo>
              </Reveal>
              <Reveal delay={80}>
                <h2 id="enfoque-titulo" className="display-md mt-6">
                  Terapia <em className="italic">integradora</em>.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={160}>
              <p className="prose-body">{ENFOQUE.intro}</p>
            </Reveal>
          </div>

          {/* Cuatro modelos que entran, uno a uno, hacia dentro */}
          <ol className="mt-16 md:mt-20">
            {ENFOQUE.modelos.map((m, i) => (
              <Reveal
                as="li"
                key={m.t}
                delay={i * 90}
                variant="left"
                className={`relative max-w-3xl border-l border-rule-strong py-7 pl-7 md:py-9 md:pl-12 ${ESCALON[i] ?? ""}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute top-[2.1rem] -left-[3px] size-1.5 rounded-full bg-olive md:top-[2.6rem]"
                />
                <span className="eyebrow text-olive/70">{ROMANOS[i] ?? ""}</span>
                <h3 className="mt-4 font-display text-[1.45rem] leading-tight text-ink md:text-[1.85rem]">
                  {m.t}
                </h3>
                <p className="prose-body mt-3 max-w-xl">{m.d}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={120} className="mt-12 md:ml-[21%]">
            <div className="flex max-w-2xl items-start gap-6 border-t border-rule pt-9">
              <Lira className="mt-1.5 size-8 shrink-0 text-olive/60" strokeWidth={7} />
              <p className="font-display text-[1.3rem] leading-snug text-cypress italic md:text-[1.55rem]">
                {ENFOQUE.nota}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ LO QUE ENCONTRARÁS EN MÍ ═══════════════════ */}
      {/* Encadenada con el enfoque: sin respiro superior, misma hoja de papel */}
      <section className="pb-24 md:pb-36" aria-labelledby="valores-titulo">
        <div className="shell">
          <div className="max-w-3xl">
            <Reveal>
              <Antetitulo>{VALORES.eyebrow}</Antetitulo>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="valores-titulo" className="display-md mt-6">
                Cinco cosas que puedes dar por <em className="italic">hechas</em>.
              </h2>
            </Reveal>
          </div>

          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALORES.items.map((v, i) => {
              const oscuro = i === 0;
              const ancho = i === 4;
              return (
                <Reveal
                  as="li"
                  key={v.clave}
                  variant="scale"
                  delay={i * 70}
                  className={`flex flex-col p-7 md:p-9 ${MOSAICO[i] ?? ""} ${
                    oscuro
                      ? "on-dark rounded-xl border border-cypress bg-cypress transition-transform duration-600 hover:-translate-y-1"
                      : "card-paper card-hover-lift"
                  } ${ancho ? "lg:grid lg:grid-cols-[1fr_1.15fr] lg:items-end lg:gap-14" : ""}`}
                >
                  <div>
                    <p
                      className={`font-display text-[1.05rem] italic ${
                        oscuro ? "text-on-dark-muted" : "text-cypress"
                      }`}
                    >
                      {v.lema}
                    </p>
                    <h3
                      className={`mt-4 font-display text-[1.75rem] leading-tight md:text-[2.15rem] ${
                        oscuro ? "text-on-dark" : "text-ink"
                      }`}
                    >
                      {v.clave}
                    </h3>
                  </div>
                  <p
                    className={`text-[0.93rem] leading-relaxed font-light ${
                      oscuro ? "text-on-dark-muted" : "text-ink-muted"
                    } ${ancho ? "mt-6 lg:mt-0" : "mt-6"}`}
                  >
                    {v.texto}
                  </p>
                  {oscuro ? (
                    <span className="mt-auto pt-10">
                      <Lira className="size-9 text-on-dark/25" strokeWidth={7} />
                    </span>
                  ) : null}
                </Reveal>
              );
            })}
          </ul>

          <Reveal delay={120} className="mt-12 flex items-baseline gap-6">
            <span aria-hidden="true" className="h-px w-12 shrink-0 bg-olive/50" />
            <p className="display-sm max-w-3xl text-cypress italic">{VALORES.remate}</p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ UN ESPACIO SEGURO ═══════════════════ */}
      <section className="relative overflow-hidden bg-paper" aria-labelledby="seguro-titulo">
        <div className="grain absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 shell section-y grid items-center gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
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
                    <h3 className="mt-5 font-display text-[1.25rem] text-ink md:text-[1.4rem]">
                      {item.t}
                    </h3>
                    <p className="mt-2.5 text-[0.9rem] leading-relaxed font-light text-ink-muted">
                      {item.d}
                    </p>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA FINAL ═══════════════════ */}
      <CtaFinal />
    </Layout>
  );
}
