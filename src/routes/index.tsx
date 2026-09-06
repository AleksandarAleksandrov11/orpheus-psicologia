import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";

import { Layout } from "@/components/site/Layout";
import { LineasReveladas, Marquesina, Parallax, Reveal } from "@/components/site/motion";
import { Antetitulo, BotonEnlace, Cita, Lira, Numero, TituloSeccion } from "@/components/site/ui";
import { DiagramaExpectativaRealidad, RecorridoNoLineal } from "@/components/site/Recorrido";
import {
  CTA_FINAL,
  ENGRANAJE,
  ESPACIOS,
  HERO,
  MARQUESINA,
  MITO,
  RECONOCES,
  RECORRIDO,
  VALORES,
} from "@/content/copy";
import { seo } from "@/lib/seo";

import retrato from "@/assets/melissa-retrato.webp";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Psicóloga online especializada en autoestima y autoexigencia | Orpheus Psicología",
      description:
        "No necesitas exigirte más para sentirte suficiente. Terapia integradora online en toda España para la autoestima, la autoexigencia, la inseguridad y la ansiedad.",
      path: "/",
      image: "/og/og-default.jpg",
      imageAlt: "Orpheus Psicología: no necesitas exigirte más para sentirte suficiente",
      keywords: [
        "psicóloga online",
        "terapia autoestima",
        "autoexigencia",
        "perfeccionismo",
        "inseguridad",
        "psicóloga Madrid",
        "terapia integradora",
        "psicóloga general sanitaria",
      ],
    }),
  component: Inicio,
});

function Inicio() {
  const principales = ESPACIOS.filter((e) => e.destacado);
  const otras = ESPACIOS.filter((e) => !e.destacado);

  return (
    <Layout>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="aurora grain relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <Parallax
          amount={-40}
          className="pointer-events-none absolute -top-32 -right-40 -z-10 h-[38rem] w-[38rem] rounded-full bg-olive/15 blur-3xl"
        >
          <span className="anim-breathe block h-full w-full" />
        </Parallax>

        <div className="relative z-10 shell grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
          <div>
            <p className="eyebrow anim-fade flex items-center gap-3 text-olive">
              <span aria-hidden="true" className="inline-block h-px w-8 bg-olive/50" />
              {HERO.eyebrow}
            </p>

            <LineasReveladas
              lineas={HERO.titulo}
              cursiva={HERO.cursiva}
              delay={120}
              className="display-xl mt-7 text-ink"
            />

            <p className="lede anim-fade-up d-5 mt-8 max-w-xl" style={{ animationDelay: "0.55s" }}>
              {HERO.entradilla}
            </p>

            <div
              className="anim-fade-up mt-10 flex flex-wrap gap-3"
              style={{ animationDelay: "0.68s" }}
            >
              <BotonEnlace to={HERO.ctaPrincipal.to}>{HERO.ctaPrincipal.label}</BotonEnlace>
              <BotonEnlace to={HERO.ctaSecundario.to} variante="outline" flecha={false}>
                {HERO.ctaSecundario.label}
              </BotonEnlace>
            </div>

            <ul
              className="anim-fade mt-12 flex flex-wrap items-center gap-x-5 gap-y-3"
              style={{ animationDelay: "0.85s" }}
            >
              {HERO.sellos.map((s) => (
                <li key={s} className="eyebrow flex items-center gap-2.5 text-ink-faint">
                  <span aria-hidden="true" className="size-1 rounded-full bg-olive" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Retrato circular recortado sobre el fondo */}
          <div className="relative mx-auto w-full max-w-[26rem] lg:max-w-none">
            <div className="anim-fade relative aspect-square" style={{ animationDelay: "0.35s" }}>
              <span
                aria-hidden="true"
                className="anim-breathe absolute inset-[-8%] rounded-full bg-aloe/45 blur-2xl"
              />
              <span
                aria-hidden="true"
                className="absolute inset-[-3%] rounded-full border border-cedar/35"
              />
              <img
                src={retrato}
                alt="Melissa González, psicóloga general sanitaria y fundadora de Orpheus Psicología"
                width={788}
                height={788}
                loading="eager"
                fetchPriority="high"
                decoding="sync"
                className="relative h-full w-full rounded-full object-cover"
              />
            </div>

            <Reveal
              delay={400}
              className="absolute -bottom-4 -left-2 max-w-[15rem] rounded-2xl border border-rule bg-linen/95 p-5 backdrop-blur-sm md:-left-8"
            >
              <Lira className="h-5 w-5 text-olive" trazo={3} />
              <p className="mt-3 font-display text-[1.08rem] leading-snug text-cypress italic">
                «{MITO.cita}»
              </p>
              <Link
                to="/por-que-orpheus"
                className="link-draw mt-3 inline-block text-[0.83rem] text-olive"
              >
                Por qué Orpheus
              </Link>
            </Reveal>
          </div>
        </div>

        <div className="relative z-10 shell mt-16 hidden md:mt-24 md:block">
          <span className="eyebrow flex items-center gap-3 text-ink-faint">
            <ArrowDown className="anim-scroll-hint size-3.5" strokeWidth={1.6} aria-hidden="true" />
            Sigue bajando
          </span>
        </div>
      </section>

      {/* ═══════════════════ MARQUESINA ═══════════════════ */}
      <div className="border-y border-rule bg-paper py-4 md:py-5">
        <Marquesina
          items={MARQUESINA}
          className="font-display text-[1.15rem] text-cypress/80 md:text-[1.5rem]"
        />
      </div>

      {/* ═══════════════════ ¿TE RECONOCES? ═══════════════════ */}
      <section className="section-y relative" aria-labelledby="reconoces-titulo">
        <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <Antetitulo>{RECONOCES.eyebrow}</Antetitulo>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="reconoces-titulo" className="display-md mt-6">
                {RECONOCES.titulo}
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="prose-body mt-7 max-w-sm">{RECONOCES.cierre}</p>
            </Reveal>
            <Reveal delay={240} className="mt-9">
              <BotonEnlace to="/contacto" variante="outline">
                Hablemos de ello
              </BotonEnlace>
            </Reveal>
          </div>

          <ul className="grid gap-x-10 sm:grid-cols-2 lg:gap-x-14">
            {RECONOCES.items.map((item, i) => (
              <Reveal
                as="li"
                key={item}
                delay={(i % 5) * 55}
                className="group border-b border-rule py-5"
              >
                <span className="flex gap-4">
                  <span className="eyebrow mt-1.5 shrink-0 text-olive/70 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1.06rem] leading-relaxed font-light text-ink transition-colors duration-500 group-hover:text-cypress">
                    {item}
                  </span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════════════ ESPACIOS DE TRABAJO ═══════════════════ */}
      <section
        className="relative overflow-hidden border-y border-rule bg-paper"
        aria-labelledby="espacios-titulo"
      >
        <div className="grain absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 shell section-y">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
            <div>
              <Reveal>
                <Antetitulo>{ENGRANAJE.eyebrow}</Antetitulo>
              </Reveal>
              <Reveal delay={80}>
                <h2 id="espacios-titulo" className="display-md mt-6">
                  Entiendo al ser humano como un <em className="italic">engranaje</em>.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={160}>
              <p className="prose-body">{ENGRANAJE.intro}</p>
            </Reveal>
          </div>

          {/* Las tres áreas del nicho, con aire y a tamaño grande */}
          <ul className="mt-14 grid gap-5 md:mt-20 lg:grid-cols-3">
            {principales.map((e, i) => (
              <Reveal
                as="li"
                key={e.slug}
                delay={i * 110}
                variant="scale"
                className="on-dark grain-dark relative isolate flex flex-col overflow-hidden rounded-3xl bg-moss p-9 md:p-10"
              >
                <span
                  aria-hidden="true"
                  className="anim-breathe absolute -top-16 -right-12 h-48 w-48 rounded-full bg-olive/25 blur-3xl"
                />
                <span className="eyebrow relative text-on-dark-faint tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display-sm relative mt-8 text-on-dark">{e.titulo}</h3>
                <p className="relative mt-4 font-display text-[1.25rem] leading-snug text-aloe italic">
                  {e.breve}
                </p>
                <p className="relative mt-6 flex-1 text-[1.01rem] leading-[1.75] font-light text-on-dark-muted">
                  {e.detalle}
                </p>
                <Link
                  to="/servicios"
                  hash={e.slug}
                  className="link-draw relative mt-8 self-start text-[0.9rem] text-aloe"
                >
                  Trabajar esto en terapia
                </Link>
              </Reveal>
            ))}
          </ul>

          {/* El resto, como una lista de etiquetas: presente pero sin ruido */}
          <div className="mt-14 border-t border-rule pt-10 md:mt-20">
            <Reveal>
              <p className="eyebrow text-ink-faint">{ENGRANAJE.otras}</p>
            </Reveal>
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {otras.map((e, i) => (
                <Reveal as="li" key={e.slug} delay={(i % 6) * 45}>
                  <Link
                    to="/servicios"
                    hash={e.slug}
                    className="inline-flex rounded-full border border-rule-strong bg-linen px-5 py-2.5 text-[0.96rem] font-light text-ink transition-colors duration-500 hover:border-cypress hover:bg-bone hover:text-cypress"
                  >
                    {e.titulo}
                  </Link>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={140} className="mt-12">
              <p className="prose-body max-w-2xl">{ENGRANAJE.cierre}</p>
              <div className="mt-8">
                <BotonEnlace to="/contacto" variante="outline">
                  Contarme qué te ocurre
                </BotonEnlace>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════ ¿CÓMO TRABAJAREMOS? ═══════════════════ */}
      <section className="relative overflow-hidden" aria-labelledby="recorrido-titulo">
        <div className="relative z-10 shell section-y">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
            <div>
              <Reveal>
                <Antetitulo>{RECORRIDO.eyebrow}</Antetitulo>
              </Reveal>
              <Reveal delay={80}>
                <h2 id="recorrido-titulo" className="display-md mt-6">
                  La terapia no es una <em className="italic">línea recta</em>.
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="prose-body mt-7 max-w-lg">{RECORRIDO.intro}</p>
              </Reveal>
            </div>

            <Reveal delay={220} variant="mask">
              <div className="rounded-2xl border border-rule bg-linen/70 p-6 md:p-8">
                <DiagramaExpectativaRealidad />
              </div>
            </Reveal>
          </div>

          <RecorridoNoLineal />

          <Reveal delay={100} className="mt-16 md:mt-20">
            <hr className="rule-fade" />
            <Cita className="mt-12 max-w-3xl" tamano="sm">
              {RECORRIDO.cita}
            </Cita>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ LO QUE ENCONTRARÁS EN ESTE LUGAR ═══════════════════ */}
      <section className="section-y border-t border-rule" aria-labelledby="valores-titulo">
        <div className="shell">
          <TituloSeccion
            antetitulo={VALORES.eyebrow}
            descripcion={VALORES.remate}
            className="max-w-3xl"
          >
            <span id="valores-titulo">
              Lo que encontrarás en este <em className="italic">lugar</em>.
            </span>
          </TituloSeccion>

          <ul className="mt-16 border-t border-rule">
            {VALORES.items.map((v, i) => (
              <Reveal
                as="li"
                key={v.clave}
                delay={i * 70}
                className="group grid gap-4 border-b border-rule py-8 transition-colors duration-600 hover:bg-linen md:grid-cols-[5rem_1fr_1.15fr] md:items-baseline md:gap-10 md:px-4"
              >
                <Numero>{String(i + 1).padStart(2, "0")}</Numero>
                <div>
                  <h3 className="eyebrow text-olive">{v.clave}</h3>
                  <p className="mt-3 font-display text-[1.5rem] leading-tight text-ink italic md:text-[1.9rem]">
                    {v.lema}
                  </p>
                </div>
                <p className="prose-body md:pt-2">{v.texto}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════════════ CTA FINAL ═══════════════════ */}
      <CtaFinal />
    </Layout>
  );
}

export function CtaFinal() {
  return (
    <section className="shell pt-24 pb-20 md:pt-32 md:pb-28" aria-labelledby="cta-final-titulo">
      <Reveal
        variant="scale"
        className="aurora-deep grain-dark on-dark relative isolate overflow-hidden rounded-3xl px-7 py-20 text-center md:px-16 md:py-24"
      >
        <Lira
          className="pointer-events-none absolute -top-10 -left-10 h-56 w-56 text-on-dark/[0.06]"
          trazo={1.3}
        />
        <Lira
          className="pointer-events-none absolute -right-12 -bottom-14 h-64 w-64 text-on-dark/[0.06]"
          trazo={1.3}
        />
        <div className="relative z-10">
          <Antetitulo oscuro className="justify-center">
            {CTA_FINAL.eyebrow}
          </Antetitulo>
          <h2 id="cta-final-titulo" className="display-lg mx-auto mt-7 max-w-3xl text-on-dark">
            No tienes que tenerlo todo <em className="italic">claro</em> para empezar.
          </h2>
          <div className="mt-11 flex flex-wrap justify-center gap-3">
            <BotonEnlace to="/contacto" variante="light">
              {CTA_FINAL.boton}
            </BotonEnlace>
            <BotonEnlace to="/servicios" variante="ghost-dark" flecha={false}>
              Ver servicios
            </BotonEnlace>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
