import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";

import { Layout } from "@/components/site/Layout";
import { LineasReveladas, Marquesina, Parallax, Reveal } from "@/components/site/motion";
import {
  Antetitulo,
  BotonEnlace,
  BotonExterno,
  Figura,
  Lira,
  TituloSeccion,
} from "@/components/site/ui";
import { MarquesinaResenas } from "@/components/site/MarquesinaResenas";
import {
  CTA_FINAL,
  ENGRANAJE,
  ESPACIOS,
  HERO,
  HISTORIA,
  MARQUESINA,
  RECONOCES,
  PRIMERA_SESION,
  VALORES,
} from "@/content/copy";
import { SITE } from "@/content/site";
import { seo } from "@/lib/seo";

import retrato from "@/assets/melissa-inicio.webp";
import retratoSm from "@/assets/melissa-inicio@sm.webp";
import melissaSofa from "@/assets/melissa-sobre-mi.webp";

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
            <LineasReveladas
              lineas={HERO.titulo}
              cursiva={HERO.cursiva}
              delay={120}
              className="display-xl order-1 text-ink lg:order-none"
            />

            <p
              className="lede anim-fade-up order-2 mx-auto mt-7 max-w-xl text-cypress lg:order-none lg:mx-0"
              style={{ animationDelay: "0.4s" }}
            >
              {HERO.subtitulo}
            </p>

            {/* El nombre, con la tipografía de los titulares: es lo primero
                que tiene que quedar claro al entrar, quién está detrás. */}
            <div
              className="anim-fade-up order-3 mt-9 lg:order-none lg:mt-10"
              style={{ animationDelay: "0.5s" }}
            >
              <p className="font-display text-[1.95rem] leading-[1.15] text-ink md:text-[2.4rem]">
                Soy <em className="italic">{HERO.presentacion.nombre}</em>,
              </p>
              <p className="mx-auto mt-2 max-w-md font-display text-[1.22rem] leading-snug text-cypress md:text-[1.4rem] lg:mx-0">
                {HERO.presentacion.perfil}
              </p>
            </div>

            <p
              className="prose-body anim-fade-up order-3 mx-auto mt-4 max-w-xl lg:order-none lg:mx-0"
              style={{ animationDelay: "0.6s" }}
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

          {/* Retrato vertical con las esquinas muy redondeadas: la foto
              sentada no cabe en un círculo sin perder los hombros. */}
          <div className="order-1 relative mx-auto w-full max-w-[18rem] sm:max-w-[22rem] lg:order-2 lg:max-w-[28rem]">
            <div className="anim-fade relative aspect-[4/5]" style={{ animationDelay: "0.35s" }}>
              <span
                aria-hidden="true"
                className="anim-breathe absolute inset-[-8%] rounded-[3rem] bg-aloe/45 blur-2xl"
              />
              <span
                aria-hidden="true"
                className="absolute inset-[-3%] rounded-[2.6rem] border border-cedar/35"
              />
              {/* Dos tamaños: en un móvil sin pantalla de alta densidad el
                  retrato se ve a 288 px y servirle los 960 px del original
                  era mandar el doble de píxeles de los que se pintan. */}
              <img
                src={retrato}
                srcSet={`${retratoSm} 480w, ${retrato} 960w`}
                sizes="(min-width: 1024px) 28rem, (min-width: 640px) 22rem, 18rem"
                alt="Melissa González, psicóloga general sanitaria y fundadora de Orpheus Psicología"
                width={960}
                height={1200}
                loading="eager"
                fetchPriority="high"
                decoding="sync"
                className="relative h-full w-full rounded-[2rem] object-cover"
              />
            </div>
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

      {/* ═══════════════════ SOBRE MÍ (RESUMEN) ═══════════════════ */}
      <SobreMiResumen />

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
                {/* Misma letra que los textos de fuera de las cajas, un punto
                    más grande para que se lea bien sobre el verde. */}
                <p className="relative mt-5 flex-1 text-[1.17rem] leading-[1.72] font-light text-on-dark md:text-[1.22rem]">
                  {e.inicio ?? e.breve}
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
 * Quién soy, a qué me dedico y cómo acompaño, en corto. Es el arranque de
 * Sobre mí con su misma foto, para que quien entra sepa enseguida quién hay
 * detrás antes de seguir con el enfoque.
 */
function SobreMiResumen() {
  return (
    <section className="section-y relative" aria-labelledby="sobre-mi-resumen-titulo">
      <div className="shell grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal variant="scale" className="relative mx-auto w-full max-w-[21rem] lg:max-w-[26rem]">
          <span
            aria-hidden="true"
            className="arch absolute inset-0 translate-x-4 translate-y-5 border border-cedar/45"
          />
          <Figura
            src={melissaSofa}
            alt="Melissa González en su consulta, sentada en un sofá verde con una taza"
            ratio="4 / 5"
            width={960}
            height={1200}
            className="arch relative"
          />
        </Reveal>

        <div>
          <Reveal>
            <Antetitulo>Sobre mí</Antetitulo>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="sobre-mi-resumen-titulo" className="display-md mt-6">
              Descubrí la psicología buscando <em className="italic">entenderme</em>.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="prose-body mt-7 max-w-xl">{HISTORIA.parrafos[0]}</p>
          </Reveal>
          <Reveal delay={200}>
            <p className="prose-body mt-5 max-w-xl">{HISTORIA.parrafos[6]}</p>
          </Reveal>
          <Reveal delay={240}>
            <p className="prose-body mt-5 max-w-xl">{HISTORIA.parrafos[7]}</p>
          </Reveal>
          <Reveal delay={300} className="mt-9">
            <BotonEnlace to="/sobre-mi" variante="outline">
              Conocer mi historia
            </BotonEnlace>
          </Reveal>
        </div>
      </div>
    </section>
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
          <p className="mx-auto mt-7 max-w-xl text-[1.1rem] leading-relaxed font-light text-on-dark-muted">
            {CTA_FINAL.texto}
          </p>
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
