import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";

import { Layout } from "@/components/site/Layout";
import { LineasReveladas, Marquesina, Parallax, Reveal } from "@/components/site/motion";
import {
  Antetitulo,
  BotonEnlace,
  BotonExterno,
  Cita,
  Lira,
  TituloSeccion,
} from "@/components/site/ui";
import { DiagramaExpectativaRealidad, RecorridoNoLineal } from "@/components/site/Recorrido";
import { MarquesinaResenas } from "@/components/site/MarquesinaResenas";
import {
  CTA_FINAL,
  ENGRANAJE,
  ESPACIOS,
  HERO,
  MARQUESINA,
  MITO,
  RECONOCES,
  RECORRIDO,
  PRIMERA_SESION,
  VALORES,
} from "@/content/copy";
import { SITE } from "@/content/site";
import { seo } from "@/lib/seo";

import retrato from "@/assets/melissa-retrato.webp";
import retratoSm from "@/assets/melissa-retrato@sm.webp";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Psicóloga online para la autoestima",
      description:
        "No necesitas exigirte más para sentirte suficiente. Psicóloga online en toda España: terapia para la autoestima, la autoexigencia, la inseguridad y la ansiedad.",
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
      <section className="aurora grain relative overflow-hidden pt-28 pb-14 md:pt-40 md:pb-28">
        <Parallax
          amount={-40}
          className="pointer-events-none absolute -top-32 -right-40 -z-10 h-[38rem] w-[38rem] rounded-full bg-olive/15 blur-3xl"
        >
          <span className="anim-breathe block h-full w-full" />
        </Parallax>

        {/* En móvil manda el retrato: primero la foto y el titular justo
            debajo. En escritorio vuelve el orden de siempre. */}
        <div className="relative z-10 shell grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
          {/* En móvil la columna va centrada bajo el retrato, que también
              está centrado; alineada a la izquierda quedaba descolgada de
              la foto. A partir de lg vuelve el hero a dos columnas. */}
          <div className="order-2 flex flex-col text-center lg:order-1 lg:block lg:text-left">
            <p className="eyebrow anim-fade order-2 mt-6 flex items-center justify-center gap-3 text-olive lg:order-none lg:mt-0 lg:justify-start">
              {/* El filete solo acompaña cuando el antetítulo va alineado a la
                  izquierda: centrado se queda descolgado en un extremo. */}
              <span aria-hidden="true" className="hidden h-px w-8 bg-olive/50 lg:inline-block" />
              {HERO.eyebrow}
            </p>

            <LineasReveladas
              lineas={HERO.titulo}
              cursiva={HERO.cursiva}
              delay={120}
              className="display-xl order-1 text-ink lg:order-none lg:mt-7"
            />

            <p
              className="lede anim-fade-up d-5 order-3 mx-auto mt-8 max-w-xl lg:order-none lg:mx-0"
              style={{ animationDelay: "0.55s" }}
            >
              {HERO.entradilla}
            </p>

            <div
              className="anim-fade-up order-4 mt-10 flex flex-wrap justify-center gap-3 lg:order-none lg:justify-start"
              style={{ animationDelay: "0.68s" }}
            >
              <BotonEnlace to={HERO.ctaPrincipal.to}>{HERO.ctaPrincipal.label}</BotonEnlace>
              <BotonEnlace to={HERO.ctaSecundario.to} variante="outline" flecha={false}>
                {HERO.ctaSecundario.label}
              </BotonEnlace>
            </div>

            <ul
              className="anim-fade order-5 mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 lg:order-none lg:justify-start"
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
          <div className="order-1 relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:order-2 lg:max-w-none">
            <div className="anim-fade relative aspect-square" style={{ animationDelay: "0.35s" }}>
              <span
                aria-hidden="true"
                className="anim-breathe absolute inset-[-8%] rounded-full bg-aloe/45 blur-2xl"
              />
              <span
                aria-hidden="true"
                className="absolute inset-[-3%] rounded-full border border-cedar/35"
              />
              {/* Dos tamaños: en un móvil sin pantalla de alta densidad el
                  retrato se ve a 352 px y servirle los 788 px del original
                  era mandar el doble de píxeles de los que se pintan. */}
              <img
                src={retrato}
                srcSet={`${retratoSm} 420w, ${retrato} 788w`}
                sizes="(min-width: 1024px) 30rem, (min-width: 640px) 26rem, 22rem"
                alt="Melissa González, psicóloga general sanitaria y fundadora de Orpheus Psicología"
                width={788}
                height={788}
                loading="eager"
                fetchPriority="high"
                decoding="sync"
                className="relative h-full w-full rounded-full object-cover"
              />
            </div>

            {/* La frase del mito, que es la puerta a Por qué Orpheus. En
                escritorio se apoya en la esquina del retrato; en móvil baja
                debajo, porque encima tapaba la fotografía y empujaba el
                titular fuera de la primera pantalla. */}
            <Reveal
              delay={400}
              className="relative mx-auto mt-6 max-w-[20rem] rounded-2xl border border-rule bg-linen/95 p-4 backdrop-blur-sm sm:max-w-[22rem] lg:absolute lg:-bottom-4 lg:-left-8 lg:mt-0 lg:max-w-[15.5rem] lg:p-5"
            >
              <span className="flex items-center gap-2.5">
                <Lira className="h-5 w-5 shrink-0 text-olive" trazo={3} />
                <Link to="/por-que-orpheus" className="link-draw text-[0.85rem] text-olive">
                  Por qué Orpheus
                </Link>
              </span>
              <p className="cita-menor mt-2.5 text-[1.15rem] leading-snug text-cypress lg:mt-3 lg:text-[1.2rem]">
                {MITO.titulo}
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
                delay={(i % 4) * 60}
                className="group border-b border-rule py-5"
              >
                <span className="flex gap-4">
                  <span className="eyebrow mt-1.5 shrink-0 text-olive/70 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1.12rem] leading-relaxed font-light text-ink transition-colors duration-500 group-hover:text-cypress">
                    {item}
                  </span>
                </span>
              </Reveal>
            ))}

            {/* El octavo punto no sigue la frase del encabezado: lleva la suya. */}
            <Reveal as="li" delay={180} className="group border-b border-rule py-5">
              <span className="flex gap-4">
                <span className="eyebrow mt-1.5 shrink-0 text-olive/70 tabular-nums">08</span>
                <span className="text-[1.12rem] leading-relaxed font-light text-ink transition-colors duration-500 group-hover:text-cypress">
                  <span className="text-cypress">{RECONOCES.ademas.entrada}</span>
                  {RECONOCES.ademas.texto}
                </span>
              </span>
            </Reveal>
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
          {/* Una sola columna: a dos, el párrafo corto dejaba un hueco
              grande arriba a la derecha. */}
          <div className="max-w-3xl">
            <Reveal>
              <Antetitulo>{ENGRANAJE.eyebrow}</Antetitulo>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="espacios-titulo" className="display-md mt-6">
                Entiendo al ser humano como un <em className="italic">engranaje</em>.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="prose-body mt-7">{ENGRANAJE.intro}</p>
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
                {/* Solo el gancho. El desarrollo entero vive en /servicios y
                    antes se repetía palabra por palabra en las dos páginas, así
                    que pinchar el enlace no llevaba a ninguna parte nueva. */}
                <p className="cita-menor relative mt-4 flex-1 text-[1.3rem] leading-snug text-aloe">
                  {e.breve}
                </p>
                <Link
                  to="/servicios"
                  hash={e.slug}
                  className="link-draw relative mt-8 self-start text-[0.96rem] text-aloe"
                >
                  {e.enlace ?? `Trabajar ${e.titulo.toLowerCase()} en terapia`}
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
                    className="inline-flex rounded-full border border-rule-strong bg-linen px-5 py-2.5 text-[1.02rem] font-light text-ink transition-colors duration-500 hover:border-cypress hover:bg-bone hover:text-cypress"
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

          <Reveal delay={100} className="mt-11 md:mt-20">
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

          <ul className="mt-11 md:mt-16 border-t border-rule">
            {VALORES.items.map((v, i) => (
              <Reveal
                as="li"
                key={v.clave}
                delay={i * 70}
                className="group grid gap-4 border-b border-rule py-7 transition-colors duration-600 hover:bg-linen md:grid-cols-[1fr_1.15fr] md:items-baseline md:gap-10 md:px-4 md:py-8"
              >
                <div>
                  {/* Sin numerar: no son pasos ordenados sino cinco cosas que
                      conviven. El punto hace de viñeta, pegado a la clave, que
                      es lo que ordena la fila. */}
                  <h3 className="eyebrow flex items-center gap-2.5 text-[1rem] tracking-[0.2em] text-olive">
                    <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-olive" />
                    {v.clave}
                  </h3>
                  <p className="cita-menor mt-3 text-[1.5rem] leading-tight text-ink md:text-[1.9rem]">
                    {v.lema}
                  </p>
                </div>
                <p className="prose-body md:pt-2">{v.texto}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════════════ RESEÑAS ═══════════════════ */}
      <MarquesinaResenas />

      {/* ═══════════════════ LA PRIMERA SESIÓN ═══════════════════ */}
      <PrimeraSesion />

      {/* ═══════════════════ CTA FINAL ═══════════════════ */}
      <CtaFinal />
    </Layout>
  );
}

/**
 * Qué pasa exactamente al reservar. Va pegado al cierre porque es la última
 * duda que queda por resolver antes de pulsar el botón: no saber qué va a
 * ocurrir al entrar es lo que más frena a quien está pensándoselo.
 */
function PrimeraSesion() {
  return (
    <section className="section-y border-t border-rule bg-linen" aria-labelledby="primera-titulo">
      <div className="shell">
        <div className="max-w-3xl">
          <Reveal>
            <Antetitulo>{PRIMERA_SESION.eyebrow}</Antetitulo>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="primera-titulo" className="display-md mt-6">
              ¿Cómo es la <em className="italic">primera sesión</em>?
            </h2>
          </Reveal>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-rule bg-rule md:mt-16 lg:grid-cols-3">
          {PRIMERA_SESION.pasos.map((paso, i) => (
            <Reveal
              as="li"
              key={paso.n}
              delay={i * 110}
              className="flex flex-col bg-bone p-8 md:p-10"
            >
              <span className="eyebrow text-olive tabular-nums">{paso.n}</span>
              <h3 className="display-sm mt-6">{paso.t}</h3>
              <p className="prose-body mt-3.5 text-[1.03rem]">{paso.d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function CtaFinal() {
  return (
    <section
      data-cierre
      className="shell pt-16 pb-14 md:pt-32 md:pb-28"
      aria-labelledby="cta-final-titulo"
    >
      <Reveal
        variant="scale"
        className="aurora-deep grain-dark on-dark relative isolate overflow-hidden rounded-3xl px-7 py-14 text-center md:px-16 md:py-24"
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
          {/* El botón sale de la web y abre un canal directo: va a WhatsApp,
              no a otra sección. */}
          <div className="mt-11 flex flex-wrap justify-center gap-3">
            <BotonExterno
              href={SITE.contacto.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              variante="light"
            >
              {CTA_FINAL.boton}
            </BotonExterno>
            <BotonEnlace to="/contacto" variante="ghost-dark" flecha={false}>
              Otras formas de contacto
            </BotonEnlace>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
