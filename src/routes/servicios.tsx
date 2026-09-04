import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clock } from "lucide-react";

import { Layout } from "@/components/site/Layout";
import { LineasReveladas, Parallax, Reveal } from "@/components/site/motion";
import { RecorridoNoLineal } from "@/components/site/Recorrido";
import {
  Acordeon,
  Antetitulo,
  BotonEnlace,
  Cita,
  Lira,
  Migas,
  Numero,
  TituloSeccion,
} from "@/components/site/ui";
import {
  CTA_INTERMEDIO,
  EMPRESAS,
  ENFOQUE,
  ENGRANAJE,
  ESPACIOS,
  FAQ,
  FRECUENCIA,
  MOSTRAR_PRECIOS,
  RECORRIDO,
  SESIONES,
} from "@/content/copy";
import { faqSchema, migasSchema, seo, servicioSchema } from "@/lib/seo";

import { CtaFinal } from "./index";

import texBosque from "@/assets/tex-bosque.webp";
import texBosqueSm from "@/assets/tex-bosque@sm.webp";
import texSendero from "@/assets/tex-sendero.webp";
import texSenderoSm from "@/assets/tex-sendero@sm.webp";

export const Route = createFileRoute("/servicios")({
  head: () =>
    seo({
      title: "Terapia online y presencial en Madrid",
      description:
        "Terapia integradora para la autoestima, la autoexigencia, la ansiedad, el duelo y las relaciones. Online en toda España y presencial en Madrid.",
      path: "/servicios",
      image: "/og/og-servicios.jpg",
      imageAlt: "Orpheus Psicología — Terapia para comprenderte y elegirte",
      keywords: [
        "terapia autoestima",
        "psicóloga autoexigencia",
        "terapia perfeccionismo",
        "terapia online España",
        "psicóloga Madrid",
        "terapia de duelo",
        "terapia ansiedad",
        "psicóloga general sanitaria",
        "terapia integradora",
        "bienestar emocional en empresas",
      ],
      jsonLd: [
        migasSchema([
          { nombre: "Inicio", path: "/" },
          { nombre: "Terapia", path: "/servicios" },
        ]),
        faqSchema(FAQ),
        ...ESPACIOS.slice(0, 6).map((e) =>
          servicioSchema({ nombre: e.titulo, descripcion: e.detalle, slug: e.slug }),
        ),
      ],
    }),
  component: Servicios,
});

/** Índice del hero: la página es larga y conviene poder saltar. */
const SUMARIO = [
  { hash: "enfoque", label: "Mi enfoque" },
  { hash: "espacios", label: "Espacios de trabajo" },
  { hash: "sesiones", label: "Las sesiones" },
  { hash: "frecuencia", label: "Ritmo del proceso" },
  { hash: "empresas", label: "Orpheus para equipos" },
  { hash: "preguntas", label: "Preguntas frecuentes" },
];

/** Etiqueta breve que sitúa cada modalidad dentro del recorrido. */
const ETIQUETAS_SESION = ["Punto de partida", "Proceso completo", "A distancia"];

function Servicios() {
  const numerados = ESPACIOS.map((e, i) => ({ ...e, n: String(i + 1).padStart(2, "0") }));
  const destacados = numerados.filter((e) => e.destacado);
  const resto = numerados.filter((e) => !e.destacado);

  return (
    <Layout>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="aurora grain relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <Parallax
          amount={-34}
          className="pointer-events-none absolute -top-36 -left-40 -z-10 h-[34rem] w-[34rem] rounded-full bg-cedar/25 blur-3xl"
        >
          <span className="anim-breathe block h-full w-full" />
        </Parallax>

        <div className="relative z-10 shell">
          <Migas items={[{ nombre: "Inicio", path: "/" }, { nombre: "Terapia" }]} />

          <div className="grid gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-20">
            <div>
              <p className="eyebrow anim-fade flex items-center gap-3 text-olive">
                <span aria-hidden="true" className="inline-block h-px w-8 bg-olive/50" />
                Terapia
              </p>

              <LineasReveladas
                lineas={["Terapia para", "comprenderte", "y elegirte."]}
                cursiva={2}
                delay={120}
                className="display-xl mt-7 text-ink"
              />

              <p className="lede anim-fade-up mt-8 max-w-xl" style={{ animationDelay: "0.55s" }}>
                Doce espacios de trabajo, tres formas de vernos y un ritmo que decidimos juntas.
                Aquí no hay protocolos cerrados: el proceso se adapta a ti y no al revés.
              </p>

              <div
                className="anim-fade-up mt-10 flex flex-wrap gap-3"
                style={{ animationDelay: "0.68s" }}
              >
                <BotonEnlace to="/contacto">Reservar una primera sesión</BotonEnlace>
                <BotonEnlace to="/servicios" hash="espacios" variante="outline" flecha={false}>
                  Ver espacios de trabajo
                </BotonEnlace>
              </div>
            </div>

            {/* Índice navegable de la página */}
            <Reveal delay={280} variant="blur" className="lg:pt-3">
              <nav
                aria-label="Índice de esta página"
                className="rounded-2xl border border-rule bg-linen/75 p-6 backdrop-blur-sm md:p-7"
              >
                <p className="eyebrow text-ink-faint">En esta página</p>
                <ol className="mt-6">
                  {SUMARIO.map((s, i) => (
                    <li key={s.hash} className="border-b border-rule/70 last:border-b-0">
                      <Link
                        to="/servicios"
                        hash={s.hash}
                        className="group flex items-center gap-4 py-3.5"
                      >
                        <span className="eyebrow text-olive/70 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 text-[0.95rem] font-light text-ink transition-colors duration-500 group-hover:text-cypress">
                          {s.label}
                        </span>
                        <span
                          aria-hidden="true"
                          className="h-px w-5 bg-olive/40 transition-all duration-500 group-hover:w-9 group-hover:bg-cypress"
                        />
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════ ENFOQUE ═══════════════════ */}
      <section id="enfoque" className="section-y scroll-mt-28" aria-labelledby="enfoque-titulo">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-20">
            <div>
              <Reveal>
                <Antetitulo>{ENFOQUE.eyebrow}</Antetitulo>
              </Reveal>
              <Reveal delay={80}>
                <h2 id="enfoque-titulo" className="display-md mt-6">
                  No me caso con una sola <em className="italic">escuela</em>.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={160}>
              <p className="prose-body">{ENFOQUE.intro}</p>
            </Reveal>
          </div>

          {/* Cuatro modelos que convergen en un mismo centro */}
          <div className="relative mt-16 border-b border-rule md:mt-20">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 z-10 hidden size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-rule bg-bone sm:grid"
            >
              <Lira className="h-8 w-8 text-olive" />
            </span>

            <div className="grid sm:grid-cols-2">
              {ENFOQUE.modelos.map((m, i) => (
                <Reveal
                  key={m.t}
                  delay={i * 80}
                  className={`border-t border-rule p-7 md:p-11 ${i % 2 === 0 ? "sm:border-r" : ""}`}
                >
                  <span className="eyebrow text-olive/70 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 font-display text-[1.45rem] leading-tight text-ink md:text-[1.7rem]">
                    {m.t}
                  </h3>
                  <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed font-light text-ink-muted">
                    {m.d}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal variant="mask" delay={120} className="mt-14">
            <Cita tamano="sm" className="max-w-3xl">
              {ENFOQUE.nota}
            </Cita>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ ESPACIOS DE TRABAJO ═══════════════════ */}
      <section id="espacios" className="scroll-mt-28" aria-labelledby="espacios-titulo">
        {/* Cabecera a sangre: el engranaje */}
        <div className="relative isolate overflow-hidden bg-moss text-on-dark">
          <Parallax amount={70} className="absolute inset-0 -z-10 scale-110">
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
            className="absolute inset-0 -z-10 bg-gradient-to-b from-moss via-moss/85 to-cypress"
          />
          <div className="grain-dark absolute inset-0 -z-10" aria-hidden="true" />

          <div className="on-dark shell section-y-sm relative">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <div>
                <Reveal>
                  <Antetitulo oscuro>{ENGRANAJE.eyebrow}</Antetitulo>
                </Reveal>
                <Reveal delay={80}>
                  <h2 id="espacios-titulo" className="display-md mt-6 text-on-dark">
                    Un <em className="italic">engranaje</em>, no una lista de síntomas.
                  </h2>
                </Reveal>
              </div>
              <Reveal delay={160}>
                <p className="text-[1.02rem] leading-[1.8] font-light text-on-dark-muted md:text-[1.08rem]">
                  {ENGRANAJE.intro}
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="shell section-y">
          {/* Las dos especialidades principales, en negativo */}
          <div className="grid gap-5 lg:grid-cols-2">
            {destacados.map((e, i) => (
              <Reveal
                as="article"
                key={e.slug}
                id={e.slug}
                delay={i * 110}
                variant="scale"
                className="grain-dark on-dark relative isolate scroll-mt-28 overflow-hidden rounded-3xl bg-moss p-8 md:p-11"
              >
                <span
                  aria-hidden="true"
                  className="anim-breathe absolute -top-16 -right-12 h-56 w-56 rounded-full bg-olive/25 blur-3xl"
                />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <span className="eyebrow text-on-dark-faint tabular-nums">{e.n}</span>
                    <span className="eyebrow rounded-full border border-on-dark/25 px-3.5 py-1.5 text-on-dark-faint">
                      Especialidad
                    </span>
                  </div>
                  <h3 className="display-sm mt-9 text-on-dark">{e.titulo}</h3>
                  <p className="mt-4 font-display text-[1.3rem] leading-snug text-aloe italic md:text-[1.5rem]">
                    {e.breve}
                  </p>
                  <p className="mt-6 flex-1 text-[0.98rem] leading-[1.75] font-light text-on-dark-muted">
                    {e.detalle}
                  </p>
                  <hr className="rule-fade-dark mt-9" />
                  <Link
                    to="/contacto"
                    className="link-draw mt-6 self-start text-[0.85rem] text-aloe"
                  >
                    Trabajar esto en terapia
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          {/* El resto, como índice editorial */}
          <ul className="mt-14 border-t border-rule md:mt-20">
            {resto.map((e, i) => (
              <Reveal
                as="li"
                key={e.slug}
                id={e.slug}
                delay={(i % 4) * 60}
                className="scroll-mt-28 border-b border-rule transition-colors duration-600 hover:bg-linen"
              >
                <div className="grid gap-3 py-8 md:grid-cols-[4.5rem_1fr_1.2fr] md:items-baseline md:gap-10 md:px-4">
                  <Numero>{e.n}</Numero>
                  <div>
                    <h3 className="font-display text-[1.5rem] leading-tight text-ink md:text-[1.75rem]">
                      {e.titulo}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-snug font-light text-cypress italic">
                      {e.breve}
                    </p>
                  </div>
                  <p className="prose-body text-[0.98rem] md:pt-1">{e.detalle}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={120} className="mt-12">
            <p className="prose-body max-w-2xl">
              ¿No ves aquí lo que te ocurre? No pasa nada: los motivos de consulta rara vez vienen
              con etiqueta. Escríbeme y lo miramos juntas.
            </p>
            <div className="mt-8">
              <BotonEnlace to="/contacto" variante="outline">
                Contarme qué te trae
              </BotonEnlace>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ LAS SESIONES ═══════════════════ */}
      <section
        id="sesiones"
        className="relative scroll-mt-28 overflow-hidden bg-paper"
        aria-labelledby="sesiones-titulo"
      >
        <div className="grain absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 shell section-y">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
            <div>
              <Reveal>
                <Antetitulo>Modalidades</Antetitulo>
              </Reveal>
              <Reveal delay={80}>
                <h2 id="sesiones-titulo" className="display-md mt-6">
                  Tres formas de <em className="italic">vernos</em>.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={160}>
              <p className="prose-body">
                La primera sesión no compromete a nada más que a conocernos. A partir de ahí
                decidimos juntas el formato, la frecuencia y hacia dónde vamos.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid border-y border-rule md:grid-cols-3 md:divide-x md:divide-rule">
            {SESIONES.map((s, i) => {
              const destacada = "destacado" in s && s.destacado;
              return (
                <Reveal
                  as="article"
                  key={s.slug}
                  delay={i * 90}
                  className={`relative flex flex-col py-9 md:px-8 md:py-11 ${
                    destacada ? "bg-linen" : ""
                  } ${i > 0 ? "border-t border-rule md:border-t-0" : ""}`}
                >
                  {destacada ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-0.5 bg-cypress md:inset-x-8"
                    />
                  ) : null}

                  <p className="eyebrow text-olive">{ETIQUETAS_SESION[i]}</p>
                  <h3 className="display-sm mt-5">{s.titulo}</h3>
                  <p className="mt-3 flex items-center gap-2 text-[0.82rem] font-light text-ink-faint">
                    <Clock className="size-3.5" strokeWidth={1.6} aria-hidden="true" />
                    {s.duracion}
                  </p>
                  <p className="prose-body mt-5 text-[0.95rem]">{s.resumen}</p>

                  <p className="eyebrow mt-8 text-ink-faint">Incluye</p>
                  <ul className="mt-4 flex-1 space-y-3">
                    {s.incluye.map((item) => (
                      <li key={item} className="flex gap-3 text-[0.9rem] font-light text-ink">
                        <Check
                          className="mt-1 size-3.5 shrink-0 text-olive"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-9 border-t border-rule pt-6">
                    {MOSTRAR_PRECIOS && s.precio ? (
                      <p className="font-display text-[2rem] leading-none text-cypress">
                        {s.precio}
                      </p>
                    ) : (
                      <Link to="/contacto" className="link-draw text-[0.85rem] text-cypress">
                        Consultar tarifas
                      </Link>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={140} className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <BotonEnlace to="/contacto">Reservar una primera sesión</BotonEnlace>
            <p className="text-[0.85rem] font-light text-ink-faint">
              Las sesiones se pueden cambiar o anular avisando con 24 horas de antelación.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ INTERLUDIO — ¿ENCAJAMOS? ═══════════════════ */}
      <section
        className="relative isolate overflow-hidden bg-cypress text-on-dark"
        aria-labelledby="interludio-titulo"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-moss via-cypress to-cypress"
        />
        <div className="grain-dark absolute inset-0 -z-10" aria-hidden="true" />

        <div className="on-dark shell section-y-sm relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <Lira className="h-11 w-11 text-on-dark/25" strokeWidth={7} />
            <h2 id="interludio-titulo" className="display-md mt-8 text-on-dark">
              ¿Quieres saber si <em className="italic">encajamos</em>?
            </h2>
            <p className="mt-7 max-w-lg text-[1.02rem] leading-[1.8] font-light text-on-dark-muted">
              {CTA_INTERMEDIO.texto}
            </p>
            <div className="mt-10">
              <BotonEnlace to="/contacto" variante="light">
                {CTA_INTERMEDIO.boton}
              </BotonEnlace>
            </div>
          </div>

          <Reveal variant="scale" delay={120}>
            <Parallax amount={-28}>
              <img
                src={texSendero}
                srcSet={`${texSenderoSm} 640w, ${texSendero} 1100w`}
                sizes="(min-width: 1024px) 38vw, 100vw"
                alt="Sendero entre árboles en duotono verde, tratado como una imagen de marca"
                width={1100}
                height={1375}
                loading="lazy"
                className="mx-auto w-full max-w-md rounded-2xl object-cover"
              />
            </Parallax>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ FRECUENCIA ═══════════════════ */}
      <section
        id="frecuencia"
        className="section-y scroll-mt-28"
        aria-labelledby="frecuencia-titulo"
      >
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20">
            <div>
              <Reveal>
                <Antetitulo>{FRECUENCIA.eyebrow}</Antetitulo>
              </Reveal>
              <Reveal delay={80}>
                <h2 id="frecuencia-titulo" className="display-md mt-6">
                  ¿Cada cuánto nos <em className="italic">veremos</em>?
                </h2>
              </Reveal>
            </div>
            <Reveal delay={160}>
              <p className="prose-body">{FRECUENCIA.texto}</p>
            </Reveal>
          </div>

          {/* Progresión horizontal: el filete se apaga a medida que avanza */}
          <div className="relative mt-16 md:mt-24">
            <span
              aria-hidden="true"
              className="absolute top-2 bottom-6 left-[0.4375rem] w-px bg-gradient-to-b from-cypress via-olive/50 to-transparent md:hidden"
            />
            <span
              aria-hidden="true"
              className="absolute top-[0.4375rem] right-0 left-0 hidden h-px bg-gradient-to-r from-cypress via-olive/50 to-transparent md:block"
            />

            <ol className="grid gap-10 md:grid-cols-4 md:gap-8">
              {FRECUENCIA.fases.map((f, i) => {
                const ultima = i === FRECUENCIA.fases.length - 1;
                return (
                  <Reveal
                    as="li"
                    key={f.t}
                    delay={i * 90}
                    className="relative pl-8 md:pt-12 md:pl-0"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-1 left-0 grid size-3.5 place-items-center rounded-full border border-cypress bg-bone md:top-0"
                    >
                      <span
                        className={`size-1.5 rounded-full ${ultima ? "bg-transparent" : "bg-cypress"}`}
                      />
                    </span>
                    <p className="eyebrow text-olive/70 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="display-sm mt-4">{f.t}</h3>
                    <p className="prose-body mt-3 text-[0.95rem]">{f.d}</p>
                  </Reveal>
                );
              })}
            </ol>

            <Reveal delay={200} className="mt-14">
              <p className="text-[0.85rem] font-light text-ink-faint">
                El acompañamiento se va espaciando a propósito: el objetivo es que deje de hacer
                falta.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════ RECORRIDO ═══════════════════ */}
      <section className="relative overflow-hidden bg-paper" aria-labelledby="recorrido-titulo">
        <div className="grain absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 shell section-y">
          <TituloSeccion
            antetitulo={RECORRIDO.eyebrow}
            descripcion={RECORRIDO.intro}
            centrado
            className="mx-auto"
          >
            <span id="recorrido-titulo">
              La terapia no es una <em className="italic">línea recta</em>.
            </span>
          </TituloSeccion>

          <RecorridoNoLineal />

          <Reveal delay={100} className="mt-20 md:mt-24">
            <hr className="rule-fade" />
            <Cita className="mx-auto mt-12 max-w-3xl text-center" tamano="sm">
              {RECORRIDO.cita}
            </Cita>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ EMPRESAS ═══════════════════ */}
      <section
        id="empresas"
        className="relative scroll-mt-28 overflow-hidden border-y border-rule bg-paper-deep"
        aria-labelledby="empresas-titulo"
      >
        <div className="grain absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 shell section-y">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Reveal>
                <Antetitulo>{EMPRESAS.eyebrow}</Antetitulo>
              </Reveal>
              <Reveal delay={80}>
                <h2 id="empresas-titulo" className="display-md mt-6">
                  Bienestar emocional en entornos de <em className="italic">trabajo</em>.
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="prose-body mt-7 max-w-md">{EMPRESAS.intro}</p>
              </Reveal>
            </div>

            <ol className="border-t border-rule-strong">
              {EMPRESAS.servicios.map((s, i) => (
                <Reveal
                  as="li"
                  key={s.t}
                  delay={i * 90}
                  className="grid gap-3 border-b border-rule-strong py-8 md:grid-cols-[4rem_1fr] md:gap-8"
                >
                  <Numero>{String(i + 1).padStart(2, "0")}</Numero>
                  <div>
                    <h3 className="font-display text-[1.5rem] leading-tight text-ink md:text-[1.8rem]">
                      {s.t}
                    </h3>
                    <p className="prose-body mt-3 text-[0.98rem]">{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal
            variant="curtain"
            delay={120}
            className="on-dark mt-16 flex flex-col items-start gap-8 rounded-3xl bg-moss px-8 py-10 md:mt-20 md:flex-row md:items-center md:justify-between md:px-12 md:py-12"
          >
            <p className="max-w-xl font-display text-[1.5rem] leading-snug text-on-dark italic md:text-[1.9rem]">
              Cada equipo tiene su propio desgaste. La intervención se diseña después de escucharlo.
            </p>
            <BotonEnlace to="/contacto" variante="light">
              {EMPRESAS.cta}
            </BotonEnlace>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ PREGUNTAS FRECUENTES ═══════════════════ */}
      <section id="preguntas" className="section-y scroll-mt-28" aria-labelledby="faq-titulo">
        <div className="shell">
          <TituloSeccion antetitulo="Dudas frecuentes" centrado>
            <span id="faq-titulo">
              Antes de dar el <em className="italic">primer paso</em>.
            </span>
          </TituloSeccion>

          <Reveal delay={120} className="mx-auto mt-14 max-w-3xl">
            <Acordeon items={FAQ} />
          </Reveal>

          <Reveal delay={180} className="mx-auto mt-12 max-w-3xl text-center">
            <p className="text-[0.9rem] font-light text-ink-muted">
              ¿Tu duda no está aquí?{" "}
              <Link to="/contacto" className="link-undraw text-cypress">
                Pregúntame directamente
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ CTA FINAL ═══════════════════ */}
      <CtaFinal />
    </Layout>
  );
}
