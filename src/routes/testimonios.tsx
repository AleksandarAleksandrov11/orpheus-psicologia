import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Quote, ShieldCheck, Star } from "lucide-react";

import { Layout } from "@/components/site/Layout";
import { LineasReveladas, Parallax, Reveal } from "@/components/site/motion";
import {
  Antetitulo,
  BotonEnlace,
  BotonExterno,
  Cita,
  Figura,
  Lira,
  Migas,
} from "@/components/site/ui";
import { CTA_INTERMEDIO, RECONOCES } from "@/content/copy";
import {
  HAY_RESENAS_VERIFICADAS,
  RESENAS_PUBLICADAS,
  TOTAL_RESENAS,
  mesDeResena,
  type Resena,
} from "@/content/resenas";
import { SITE, esPendiente } from "@/content/site";
import { migasSchema, seo } from "@/lib/seo";

import { CtaFinal } from "./index";

import texRaices from "@/assets/tex-raices.webp";
import texRaicesSm from "@/assets/tex-raices@sm.webp";

export const Route = createFileRoute("/testimonios")({
  head: () =>
    seo({
      title: "Reseñas",
      description:
        "Lo que cuentan quienes ya han hecho un proceso con Melissa González. Reseñas verificadas, sin puntuaciones infladas: la confidencialidad va primero.",
      path: "/testimonios",
      image: "/og/og-resenas.jpg",
      imageAlt: "Orpheus Psicología: reseñas de quienes ya han venido a consulta",
      keywords: [
        "reseñas psicóloga",
        "opiniones psicóloga Madrid",
        "testimonios terapia",
        "Melissa González psicóloga",
        "Orpheus Psicología opiniones",
      ],
      jsonLd: [
        migasSchema([
          { nombre: "Inicio", path: "/" },
          { nombre: "Reseñas", path: "/testimonios" },
        ]),
      ],
    }),
  component: Resenas,
});

/** Lo que deliberadamente no aparece en esta página. */
const SIN_ESTO = [
  "Puntuaciones medias sin fuente",
  "Testimonios anónimos escritos aquí",
  "Antes y después de nadie",
];

/** Criterios reales para decidir cuando las reseñas no bastan. */
const APOYOS = [
  {
    titulo: "Su formación y su manera de mirar",
    texto: "De dónde viene, qué ha estudiado y desde qué enfoque trabaja.",
    to: "/sobre-mi" as const,
    enlace: "Conocer a Melissa",
  },
  {
    titulo: "Cómo es el proceso, sin letra pequeña",
    texto: "Qué pasa en una sesión, con qué frecuencia y hasta cuándo.",
    to: "/servicios" as const,
    enlace: "Ver cómo trabajo",
  },
  {
    titulo: "Una primera sesión para comprobarlo",
    texto: "La única prueba que de verdad sirve: hablar y ver cómo te sientes.",
    to: "/contacto" as const,
    enlace: "Escribir un mensaje",
  },
];

function Resenas() {
  const resenas = RESENAS_PUBLICADAS;
  const hayGoogle = !esPendiente(SITE.social.googleReviews);

  return (
    <Layout>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="aurora grain relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <Parallax
          amount={-32}
          className="pointer-events-none absolute -top-40 -right-32 -z-10 h-[32rem] w-[32rem] rounded-full bg-aloe/50 blur-3xl"
        >
          <span className="anim-breathe block h-full w-full" />
        </Parallax>

        <div className="relative z-10 shell">
          <Migas items={[{ nombre: "Inicio", path: "/" }, { nombre: "Reseñas" }]} />

          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20">
            <div>
              <p className="eyebrow anim-fade flex items-center gap-3 text-olive">
                <span aria-hidden="true" className="inline-block h-px w-8 bg-olive/50" />
                Reseñas
              </p>

              <LineasReveladas
                lineas={["Lo que cuentan", "quienes ya han", "venido."]}
                cursiva={2}
                delay={120}
                className="display-xl mt-7 text-ink"
              />

              <p className="lede anim-fade-up mt-8 max-w-xl" style={{ animationDelay: "0.55s" }}>
                Todas están escritas en Google, por su cuenta y con su nombre. En una consulta de
                psicología las palabras de quien ha estado dentro valen justo por eso: porque
                compartirlas cuesta algo.
              </p>
            </div>

            {/* Contrapunto honesto: lo que esta página no hace */}
            <Reveal delay={280} variant="blur">
              <div className="rounded-2xl border border-rule bg-linen/80 p-7 backdrop-blur-sm md:p-9">
                <Lira className="h-5 w-5 text-olive" />
                <p className="eyebrow mt-5 text-ink-faint">Aquí no vas a encontrar</p>
                <ul className="mt-5 space-y-3">
                  {SIN_ESTO.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-3 text-[0.92rem] leading-relaxed font-light text-ink-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2.5 inline-block h-px w-4 shrink-0 bg-cedar"
                      />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FRANJA DE VERIFICACIÓN ═══════════════════ */}
      <section
        className="relative overflow-hidden border-y border-rule bg-paper"
        aria-labelledby="verificacion-titulo"
      >
        <div className="grain absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 shell section-y-sm">
          <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-start md:gap-10 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <Reveal variant="scale" className="shrink-0">
              <span className="relative grid size-20 place-items-center rounded-full border border-cedar/50 bg-linen">
                <span
                  aria-hidden="true"
                  className="anim-breathe absolute inset-[-14%] rounded-full bg-aloe/50 blur-xl"
                />
                {HAY_RESENAS_VERIFICADAS ? (
                  <BadgeCheck
                    className="relative size-8 text-cypress"
                    strokeWidth={1.4}
                    aria-hidden="true"
                  />
                ) : (
                  <ShieldCheck
                    className="relative size-8 text-cypress"
                    strokeWidth={1.4}
                    aria-hidden="true"
                  />
                )}
              </span>
            </Reveal>

            <div className="max-w-2xl">
              <Reveal delay={70}>
                <h2 id="verificacion-titulo" className="display-sm text-ink">
                  {HAY_RESENAS_VERIFICADAS ? (
                    <>
                      Reseñas verificadas en <em className="italic">Google</em>.
                    </>
                  ) : (
                    <>
                      La confidencialidad va <em className="italic">primero</em>.
                    </>
                  )}
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="prose-body mt-4">
                  {HAY_RESENAS_VERIFICADAS
                    ? "Todas las reseñas de esta página proceden de la ficha pública de la consulta en Google y están firmadas desde la cuenta de quien las escribió. Se reproducen con su texto literal, sin editar y sin publicar ninguna nota media."
                    : "Pedir una reseña dentro de un proceso terapéutico coloca a la persona en un compromiso, así que aquí no se hace. Si has trabajado conmigo y quieres compartir tu experiencia, escríbeme y decidimos cómo hacerlo: con el nombre abreviado o de forma anónima."}
                </p>
              </Reveal>
            </div>

            <Reveal delay={210} className="lg:justify-self-end">
              {hayGoogle ? (
                <BotonExterno
                  href={SITE.social.googleReviews}
                  target="_blank"
                  rel="noopener noreferrer"
                  variante="outline"
                >
                  Ver las reseñas en Google
                </BotonExterno>
              ) : (
                <BotonEnlace to="/contacto" variante="outline">
                  Compartir mi experiencia
                </BotonEnlace>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════ REJILLA DE RESEÑAS ═══════════════════ */}
      {resenas.length > 0 ? (
        <section className="section-y" aria-labelledby="palabras-titulo">
          <div className="shell">
            <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <Reveal>
                  <Antetitulo>Palabras prestadas</Antetitulo>
                </Reveal>
                <Reveal delay={80}>
                  <h2 id="palabras-titulo" className="display-md mt-6">
                    Quienes han <em className="italic">caminado</em> este proceso.
                  </h2>
                </Reveal>
              </div>
              <Reveal delay={160}>
                <p className="max-w-xs text-[0.85rem] leading-relaxed font-light text-ink-faint">
                  {HAY_RESENAS_VERIFICADAS
                    ? `${TOTAL_RESENAS} reseñas publicadas en Google, reproducidas con el nombre público con el que cada persona decidió firmarlas.`
                    : "Los nombres aparecen abreviados para preservar la identidad de cada persona. Las reseñas verificadas se irán identificando con su sello."}
                </p>
              </Reveal>
            </div>

            <ul className="mt-14 columns-1 gap-5 md:columns-2 lg:columns-3">
              {resenas.map((r, i) => (
                <TarjetaResena key={`${r.nombre}-${i}`} resena={r} indice={i} />
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* ═══════════════════ POR QUÉ HAY POCAS RESEÑAS ═══════════════════ */}
      <section className="relative overflow-hidden bg-paper" aria-labelledby="pocas-titulo">
        <div className="grain absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 shell section-y">
          <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <Reveal variant="scale">
              <Figura
                src={texRaices}
                srcSet={`${texRaicesSm} 640w, ${texRaices} 1100w`}
                sizes="(min-width: 1024px) 30vw, 90vw"
                alt="Raíces entrelazadas bajo un bosque, en duotono verde"
                ratio="4 / 5"
                width={1100}
                height={1375}
                className="arch mx-auto max-w-sm lg:mx-0 lg:max-w-none"
              />
            </Reveal>

            <div>
              <Reveal>
                <Antetitulo>Secreto profesional</Antetitulo>
              </Reveal>
              <Reveal delay={80}>
                <h2 id="pocas-titulo" className="display-md mt-6">
                  Lo que una reseña puede y no puede <em className="italic">contar</em>.
                </h2>
              </Reveal>

              <div className="mt-8 space-y-6">
                <Reveal delay={140}>
                  <p className="prose-body">
                    Lo que se habla en sesión está protegido por el secreto profesional, y muchas
                    personas que hacen un proceso prefieren que su nombre no quede asociado a él en
                    internet. Es una decisión legítima, y cuidarla forma parte del trabajo: nadie
                    debería sentir que, para agradecer, tiene que hacer pública una parte íntima de
                    su vida. Por eso nunca se pide una reseña dentro de un proceso.
                  </p>
                </Reveal>
                <Reveal delay={210}>
                  <p className="prose-body">
                    Las que hay están aquí porque quien las escribió quiso escribirlas, por su
                    cuenta y en abierto. No verás una nota media redonda ni un contador inflado:
                    elegir psicóloga no debería depender de cuántas estrellas acumula, sino de si al
                    leerla y al hablar con ella intuyes que ahí podrías contarlo todo.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={280}>
                <hr className="rule-fade my-10" />
              </Reveal>

              <Reveal delay={80}>
                <h3 className="eyebrow text-olive">Entonces, ¿en qué te apoyas para decidir?</h3>
              </Reveal>

              <ul className="mt-6 border-t border-rule">
                {APOYOS.map((a, i) => (
                  <Reveal
                    as="li"
                    key={a.titulo}
                    delay={i * 80}
                    className="group grid gap-2 border-b border-rule py-6 md:grid-cols-[1fr_auto] md:items-center md:gap-8"
                  >
                    <div>
                      <p className="font-display text-[1.25rem] leading-tight text-ink md:text-[1.45rem]">
                        {a.titulo}
                      </p>
                      <p className="mt-1.5 text-[0.88rem] leading-relaxed font-light text-ink-muted">
                        {a.texto}
                      </p>
                    </div>
                    <BotonEnlace to={a.to} variante="outline" className="justify-self-start">
                      {a.enlace}
                    </BotonEnlace>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CIERRE ═══════════════════ */}
      <section className="section-y-sm" aria-labelledby="cierre-resenas-titulo">
        <div className="shell max-w-4xl text-center">
          <Reveal>
            <Lira className="mx-auto h-8 w-8 text-cedar" />
          </Reveal>
          <Reveal variant="curtain" delay={90}>
            <Cita tamano="sm" className="mt-9">
              <span id="cierre-resenas-titulo">{RECONOCES.cierre}</span>
            </Cita>
          </Reveal>
          <Reveal delay={170}>
            <p className="mx-auto mt-8 max-w-xl text-[0.98rem] leading-relaxed font-light text-ink-muted">
              {CTA_INTERMEDIO.texto}
            </p>
          </Reveal>
          <Reveal delay={240} className="mt-9">
            <BotonEnlace to="/contacto" variante="outline">
              {CTA_INTERMEDIO.boton}
            </BotonEnlace>
          </Reveal>
        </div>
      </section>

      <CtaFinal />
    </Layout>
  );
}

/**
 * Tarjeta de reseña. Cada cuarta se compone en tipografía display para
 * romper el ritmo de la retícula de mampostería.
 */
function TarjetaResena({ resena, indice }: { resena: Resena; indice: number }) {
  const destacada = indice % 4 === 0;
  const fecha = mesDeResena(resena.fecha);

  return (
    <li className="mb-5 break-inside-avoid">
      <Reveal
        delay={(indice % 3) * 80}
        className={`card-hover-lift relative overflow-hidden rounded-2xl border p-7 md:p-8 ${
          destacada ? "border-rule-strong bg-paper" : "border-rule bg-linen"
        }`}
      >
        {destacada ? (
          <Quote
            aria-hidden="true"
            strokeWidth={1}
            className="pointer-events-none absolute -top-4 -right-3 size-28 text-olive/[0.08]"
          />
        ) : null}

        <div className="relative">
          {resena.estrellas ? (
            <div
              className="mb-5 flex gap-1"
              aria-label={`${resena.estrellas} de 5 estrellas`}
              role="img"
            >
              {Array.from({ length: resena.estrellas }).map((_, s) => (
                <Star key={s} className="size-3.5 fill-olive text-olive" aria-hidden="true" />
              ))}
            </div>
          ) : null}

          <blockquote
            className={
              destacada
                ? "font-display text-[1.4rem] leading-snug text-ink md:text-[1.7rem]"
                : "text-[0.98rem] leading-[1.75] font-light text-ink-muted"
            }
          >
            «{resena.texto}»
          </blockquote>

          <footer className="mt-7 border-t border-rule pt-5">
            <p className="text-[0.85rem] text-ink">{resena.nombre}</p>
            {resena.contexto ? (
              <p className="mt-0.5 text-[0.75rem] font-light text-ink-faint">{resena.contexto}</p>
            ) : null}
            {fecha ? (
              <p className="mt-0.5 text-[0.75rem] font-light text-ink-faint">{fecha}</p>
            ) : null}
            {resena.verificada ? (
              <p className="eyebrow mt-4 flex items-center gap-1.5 text-cypress">
                <BadgeCheck className="size-3.5" strokeWidth={1.7} aria-hidden="true" />
                Verificada en Google
              </p>
            ) : null}
          </footer>
        </div>
      </Reveal>
    </li>
  );
}
