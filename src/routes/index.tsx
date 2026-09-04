import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";

import { Layout } from "@/components/site/Layout";
import { LineasReveladas, Marquesina, Parallax, Reveal } from "@/components/site/motion";
import { Antetitulo, BotonEnlace, Cita, Lira, Numero, TituloSeccion } from "@/components/site/ui";
import { DiagramaExpectativaRealidad, RecorridoNoLineal } from "@/components/site/Recorrido";
import {
  CTA_FINAL,
  EMOCIONES,
  ENGRANAJE,
  ESPACIOS,
  FILOSOFIA,
  HERO,
  MARQUESINA,
  MITO,
  RECONOCES,
  RECORRIDO,
  VALORES,
} from "@/content/copy";
import { seo } from "@/lib/seo";

import retrato from "@/assets/melissa-retrato.webp";
import texNiebla from "@/assets/tex-niebla.webp";
import texNieblaSm from "@/assets/tex-niebla@sm.webp";
import texBosque from "@/assets/tex-bosque.webp";
import texBosqueSm from "@/assets/tex-bosque@sm.webp";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Psicóloga especializada en autoestima y autoexigencia | Orpheus Psicología",
      description:
        "No necesitas exigirte más para sentirte suficiente. Terapia integradora para la autoestima, la autoexigencia y la ansiedad. Online y presencial en Madrid.",
      path: "/",
      image: "/og/og-default.jpg",
      imageAlt: "Orpheus Psicología: no necesitas exigirte más para sentirte suficiente",
      keywords: [
        "psicóloga online",
        "terapia autoestima",
        "autoexigencia",
        "perfeccionismo",
        "psicóloga Madrid",
        "terapia integradora",
        "gestión emocional",
        "psicóloga general sanitaria",
      ],
    }),
  component: Inicio,
});

function Inicio() {
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
              <Lira className="h-5 w-5 text-olive" />
              <p className="mt-3 font-display text-[1.05rem] leading-snug text-cypress italic">
                «{MITO.cita}»
              </p>
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
                delay={(i % 7) * 55}
                className="group border-b border-rule py-5"
              >
                <span className="flex gap-4">
                  <span className="eyebrow mt-1.5 shrink-0 text-olive/70 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.98rem] leading-relaxed font-light text-ink transition-colors duration-500 group-hover:text-cypress">
                    {item}
                  </span>
                </span>
              </Reveal>
            ))}
          </ul>
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
          <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <div>
              <Reveal>
                <Antetitulo oscuro>{MITO.eyebrow}</Antetitulo>
              </Reveal>
              <Reveal delay={80}>
                <h2 id="descenso-titulo" className="display-lg mt-6 text-on-dark">
                  Descender para poder <em className="italic">elevarse</em>.
                </h2>
              </Reveal>
              <Reveal delay={200} className="mt-10">
                <Lira className="h-14 w-14 text-on-dark/25" strokeWidth={7} />
              </Reveal>
            </div>

            <div className="space-y-7">
              {MITO.cuerpo.map((p, i) => (
                <Reveal key={p.slice(0, 24)} delay={i * 90}>
                  <p className="text-[1.02rem] leading-[1.8] font-light text-on-dark-muted md:text-[1.08rem]">
                    {p}
                  </p>
                </Reveal>
              ))}
              <Reveal delay={220}>
                <hr className="rule-fade-dark my-9" />
              </Reveal>
              {FILOSOFIA.parrafos.slice(0, 2).map((p, i) => (
                <Reveal key={p.slice(0, 24)} delay={i * 90}>
                  <p className="text-[1.02rem] leading-[1.8] font-light text-on-dark-muted md:text-[1.08rem]">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal variant="curtain" delay={120} className="mt-20 md:mt-28">
            <Cita oscuro tamano="lg" className="max-w-4xl">
              {FILOSOFIA.titulo[0]}
              <br />
              {FILOSOFIA.titulo[1]}
            </Cita>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {FILOSOFIA.sinLista.map((s, i) => (
              <Reveal
                key={s}
                delay={i * 100}
                className="border-t border-on-dark/15 pt-5 text-[0.95rem] font-light text-on-dark-muted"
              >
                {s}
              </Reveal>
            ))}
          </div>
          <Reveal delay={320}>
            <p className="mt-10 font-display text-[1.35rem] text-on-dark italic md:text-[1.6rem]">
              {FILOSOFIA.remate}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ ESPACIOS DE TRABAJO ═══════════════════ */}
      <section className="section-y relative" aria-labelledby="espacios-titulo">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
            <div>
              <Reveal>
                <Antetitulo>{ENGRANAJE.eyebrow}</Antetitulo>
              </Reveal>
              <Reveal delay={80}>
                <h2 id="espacios-titulo" className="display-md mt-6">
                  No trabajo los problemas de forma <em className="italic">aislada</em>.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={160}>
              <p className="prose-body">{ENGRANAJE.intro}</p>
            </Reveal>
          </div>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {ESPACIOS.map((e, i) => (
              <Reveal
                as="li"
                key={e.slug}
                delay={(i % 6) * 60}
                className="group relative bg-linen p-7 transition-colors duration-600 hover:bg-paper md:p-8"
              >
                <Link
                  to="/servicios"
                  hash={e.slug}
                  className="flex h-full flex-col focus-visible:outline-none"
                >
                  <span className="eyebrow text-olive/70 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-7 font-display text-[1.4rem] leading-tight text-ink md:text-[1.6rem]">
                    {e.titulo}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[0.88rem] leading-relaxed font-light text-ink-muted">
                    {e.breve}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-6 block h-px w-8 bg-olive/40 transition-all duration-600 group-hover:w-16 group-hover:bg-cypress"
                  />
                  <span className="sr-only">Ver más sobre {e.titulo}</span>
                </Link>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={120} className="mt-12">
            <BotonEnlace to="/servicios" variante="outline">
              Ver todos los espacios de trabajo
            </BotonEnlace>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ ¿CÓMO TRABAJAREMOS? ═══════════════════ */}
      <section className="relative overflow-hidden bg-paper" aria-labelledby="recorrido-titulo">
        <div className="grain absolute inset-0" aria-hidden="true" />
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

          <Reveal delay={100} className="mt-20 md:mt-24">
            <hr className="rule-fade" />
            <Cita className="mt-12 max-w-3xl" tamano="sm">
              {RECORRIDO.cita}
            </Cita>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ LO QUE ENCONTRARÁS EN MÍ ═══════════════════ */}
      <section className="section-y" aria-labelledby="valores-titulo">
        <div className="shell">
          <TituloSeccion
            antetitulo={VALORES.eyebrow}
            descripcion={VALORES.remate}
            className="max-w-3xl"
          >
            <span id="valores-titulo">
              Cinco cosas que puedes dar por <em className="italic">hechas</em>.
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

      {/* ═══════════════════ GESTIÓN EMOCIONAL ═══════════════════ */}
      <section
        className="relative isolate overflow-hidden bg-cypress text-on-dark"
        aria-labelledby="emociones-titulo"
      >
        <Parallax amount={60} className="absolute inset-0 -z-10 scale-110">
          <img
            src={texBosque}
            srcSet={`${texBosqueSm} 800w, ${texBosque} 1600w`}
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
          className="absolute inset-0 -z-10 bg-gradient-to-br from-cypress via-cypress/90 to-moss"
        />
        <div className="grain-dark absolute inset-0 -z-10" aria-hidden="true" />

        <div className="on-dark shell section-y relative">
          <Reveal>
            <Antetitulo oscuro>{EMOCIONES.eyebrow}</Antetitulo>
          </Reveal>
          <h2 id="emociones-titulo" className="display-lg mt-7 text-on-dark">
            {EMOCIONES.titulo.map((t, i) => (
              <Reveal key={t} delay={i * 130} variant="up" as="span" className="block">
                <span className={i === 2 ? "italic" : undefined}>{t}</span>
              </Reveal>
            ))}
          </h2>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <div className="space-y-6">
              {EMOCIONES.parrafos.map((p, i) => (
                <Reveal key={p.slice(0, 20)} delay={i * 90}>
                  <p className="text-[1.02rem] leading-[1.8] font-light text-on-dark-muted md:text-[1.08rem]">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            <ol className="space-y-px overflow-hidden rounded-2xl border border-on-dark/15">
              {EMOCIONES.pasos.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.n}
                  delay={i * 110}
                  className="border-b border-on-dark/12 bg-on-dark/[0.04] p-6 last:border-b-0 md:p-7"
                >
                  <span className="eyebrow text-on-dark-faint tabular-nums">0{i + 1}</span>
                  <h3 className="mt-4 font-display text-[1.6rem] text-on-dark">{p.n}</h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed font-light text-on-dark-muted">
                    {p.d}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal variant="curtain" delay={140} className="mt-20">
            <Cita oscuro tamano="md" className="max-w-3xl">
              {EMOCIONES.cita[0]}
              <br />
              {EMOCIONES.cita[1]}
            </Cita>
          </Reveal>
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
        className="aurora-deep grain-dark on-dark relative isolate overflow-hidden rounded-3xl px-7 py-20 text-center md:px-16 md:py-28"
      >
        <Lira
          className="pointer-events-none absolute -top-10 -left-10 h-56 w-56 text-on-dark/[0.06]"
          strokeWidth={6}
        />
        <Lira
          className="pointer-events-none absolute -right-12 -bottom-14 h-64 w-64 text-on-dark/[0.06]"
          strokeWidth={6}
        />
        <div className="relative z-10">
          <Antetitulo oscuro className="justify-center">
            {CTA_FINAL.eyebrow}
          </Antetitulo>
          <h2 id="cta-final-titulo" className="display-lg mx-auto mt-7 max-w-3xl text-on-dark">
            No tienes que tenerlo todo <em className="italic">claro</em> para empezar.
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-[1.02rem] leading-relaxed font-light text-on-dark-muted">
            {CTA_FINAL.texto}
          </p>
          <div className="mt-11 flex flex-wrap justify-center gap-3">
            <BotonEnlace to="/contacto" variante="light">
              {CTA_FINAL.boton}
            </BotonEnlace>
            <BotonEnlace to="/servicios" variante="ghost-dark" flecha={false}>
              Ver cómo trabajo
            </BotonEnlace>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
