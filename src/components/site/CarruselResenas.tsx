/**
 * CARRUSEL DE RESEÑAS
 * ------------------------------------------------------------------
 * Una sola reseña a la vez, rotando sola. Vive al final del inicio y
 * es independiente de la página de reseñas, que se mantiene entera.
 *
 * Melissa lo veía quieto: antes cambiaba con un fundido de siete
 * segundos, demasiado suave y demasiado espaciado para notarlo al pasar.
 * Ahora las tarjetas se desplazan de verdad, hay una barra que enseña
 * cuánto queda para la siguiente y el turno dura cinco segundos.
 *
 * Detalles de comportamiento: se detiene al pasar el ratón o al dar el
 * foco, se puede arrastrar con el dedo, respeta `prefers-reduced-motion`
 * (sin rotación automática ni desplazamiento) y anuncia el cambio a los
 * lectores de pantalla.
 */

import { useEffect, useRef, useState } from "react";
import { BadgeCheck, ChevronLeft, ChevronRight, Quote } from "lucide-react";

import { RESENAS_CARRUSEL, mesDeResena } from "@/content/resenas";
import { SITE, esPendiente } from "@/content/site";
import { useReducedMotion } from "@/lib/motion";
import { Antetitulo, BotonExterno } from "./ui";
import { Reveal } from "./motion";

/** Milisegundos que se muestra cada reseña. */
const INTERVALO = 5000;
/** Píxeles de arrastre a partir de los cuales se cambia de reseña. */
const ARRASTRE_MINIMO = 45;

export function CarruselResenas() {
  const resenas = RESENAS_CARRUSEL;
  const [activa, setActiva] = useState(0);
  const [pausa, setPausa] = useState(false);
  const reducido = useReducedMotion();
  const total = resenas.length;
  const temporizador = useRef<number | null>(null);
  const inicioTactil = useRef<number | null>(null);

  useEffect(() => {
    if (reducido || pausa || total < 2) return;
    temporizador.current = window.setTimeout(() => setActiva((i) => (i + 1) % total), INTERVALO);
    return () => {
      if (temporizador.current) window.clearTimeout(temporizador.current);
    };
  }, [activa, pausa, reducido, total]);

  if (!total) return null;

  const ir = (delta: number) => setActiva((i) => (i + delta + total) % total);
  const hayGoogle = !esPendiente(SITE.social.googleReviews);
  const enMarcha = !reducido && !pausa && total > 1;

  return (
    <section
      className="relative overflow-hidden border-y border-rule bg-paper"
      aria-labelledby="carrusel-resenas-titulo"
    >
      <div className="grain absolute inset-0" aria-hidden="true" />
      <div className="relative z-10 shell section-y-sm">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Antetitulo>Reseñas</Antetitulo>
            <h2 id="carrusel-resenas-titulo" className="display-sm mt-5">
              Quienes han <em className="italic">caminado</em> en este proceso.
            </h2>
          </div>
          {hayGoogle ? (
            <BotonExterno
              href={SITE.social.googleReviews}
              target="_blank"
              rel="noopener noreferrer"
              variante="outline"
            >
              Verlas en Google
            </BotonExterno>
          ) : null}
        </Reveal>

        <div
          className="mt-12"
          onMouseEnter={() => setPausa(true)}
          onMouseLeave={() => setPausa(false)}
          onFocusCapture={() => setPausa(true)}
          onBlurCapture={() => setPausa(false)}
        >
          <Reveal variant="mask" delay={100}>
            <div
              className="relative overflow-hidden rounded-3xl border border-rule bg-linen px-8 py-12 md:px-16 md:py-16"
              onPointerDown={(e) => {
                inicioTactil.current = e.clientX;
              }}
              onPointerUp={(e) => {
                const desde = inicioTactil.current;
                inicioTactil.current = null;
                if (desde === null) return;
                const recorrido = e.clientX - desde;
                if (Math.abs(recorrido) > ARRASTRE_MINIMO) ir(recorrido < 0 ? 1 : -1);
              }}
            >
              {/* Las comillas son solo textura: van al ángulo opuesto al que
                  arranca la cita, para no cruzarse nunca con el texto. */}
              <Quote
                aria-hidden="true"
                strokeWidth={1}
                className="pointer-events-none absolute -top-5 -right-4 size-24 text-olive/[0.07] md:size-32"
              />

              {/* Todas las reseñas ocupan la misma celda de la retícula, así
                  que el bloque mide siempre lo que la más larga y la página no
                  da saltos cada cinco segundos. La que entra se desplaza sobre
                  las demás: ese es el movimiento que faltaba.
                  Solo se anuncia cuando manda el usuario (al pausar o con las
                  flechas): un aviso cada cinco segundos sería ruido. */}
              <div
                className="relative grid items-center"
                aria-live={pausa || reducido ? "polite" : "off"}
              >
                {resenas.map((r, i) => {
                  const fecha = mesDeResena(r.fecha);
                  const actual = i === activa;
                  return (
                    <figure
                      key={`${r.nombre}-${i}`}
                      aria-hidden={!actual}
                      inert={!actual}
                      className={`col-start-1 row-start-1 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        actual
                          ? "translate-x-0 opacity-100"
                          : `opacity-0 ${reducido ? "" : i < activa ? "-translate-x-12" : "translate-x-12"}`
                      }`}
                    >
                      <blockquote className="max-w-[46rem] font-display text-[1.35rem] leading-snug text-ink md:pr-10 md:text-[1.75rem]">
                        «{r.texto}»
                      </blockquote>
                      <figcaption className="mt-8">
                        <p className="text-[1.01rem] text-ink">{r.nombre}</p>
                        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.89rem] font-light text-ink-faint">
                          {fecha ? <span>{fecha}</span> : null}
                          {r.verificada ? (
                            <span className="inline-flex items-center gap-1.5 text-cypress">
                              <BadgeCheck
                                className="size-3.5"
                                strokeWidth={1.7}
                                aria-hidden="true"
                              />
                              Verificada en Google
                            </span>
                          ) : null}
                        </p>
                      </figcaption>
                    </figure>
                  );
                })}
              </div>

              <footer className="mt-9 flex flex-wrap items-center justify-between gap-6 border-t border-rule pt-6">
                {/* La barra se reinicia con cada reseña: es la señal de que
                    esto avanza solo, aunque no estés mirando el texto. */}
                <div className="order-2 h-px w-full bg-rule sm:order-none sm:max-w-[16rem]">
                  <div
                    key={activa}
                    aria-hidden="true"
                    className="h-px origin-left bg-cypress/70"
                    style={{
                      transform: enMarcha ? undefined : "scaleX(0)",
                      animation: enMarcha
                        ? `orpheus-progreso ${INTERVALO}ms linear forwards`
                        : undefined,
                    }}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => ir(-1)}
                    aria-label="Reseña anterior"
                    className="grid size-10 place-items-center rounded-full border border-rule-strong text-ink transition-colors duration-400 hover:border-cypress hover:text-cypress"
                  >
                    <ChevronLeft className="size-4" strokeWidth={1.6} aria-hidden="true" />
                  </button>
                  <span className="tabular-nums px-1 text-[0.89rem] font-light text-ink-faint">
                    {activa + 1} / {total}
                  </span>
                  <button
                    type="button"
                    onClick={() => ir(1)}
                    aria-label="Reseña siguiente"
                    className="grid size-10 place-items-center rounded-full border border-rule-strong text-ink transition-colors duration-400 hover:border-cypress hover:text-cypress"
                  >
                    <ChevronRight className="size-4" strokeWidth={1.6} aria-hidden="true" />
                  </button>
                </div>
              </footer>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
