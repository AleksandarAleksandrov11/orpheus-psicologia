/**
 * CARRUSEL DE RESEÑAS
 * ------------------------------------------------------------------
 * Una sola reseña a la vez, rotando sola. Vive al final del inicio y
 * es independiente de la página de reseñas, que se mantiene entera.
 *
 * Detalles de comportamiento: se detiene al pasar el ratón o al dar el
 * foco, respeta `prefers-reduced-motion` (sin rotación automática) y
 * anuncia el cambio a los lectores de pantalla.
 */

import { useEffect, useRef, useState } from "react";
import { BadgeCheck, ChevronLeft, ChevronRight, Quote } from "lucide-react";

import { RESENAS_PUBLICADAS, mesDeResena } from "@/content/resenas";
import { SITE, esPendiente } from "@/content/site";
import { useReducedMotion } from "@/lib/motion";
import { Antetitulo, BotonExterno } from "./ui";
import { Reveal } from "./motion";

/** Milisegundos que se muestra cada reseña. */
const INTERVALO = 7000;

export function CarruselResenas() {
  const resenas = RESENAS_PUBLICADAS;
  const [activa, setActiva] = useState(0);
  const [pausa, setPausa] = useState(false);
  const reducido = useReducedMotion();
  const total = resenas.length;
  const temporizador = useRef<number | null>(null);

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
  const r = resenas[activa];
  const fecha = mesDeResena(r.fecha);

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
            <div className="relative overflow-hidden rounded-3xl border border-rule bg-linen px-8 py-12 md:px-16 md:py-16">
              {/* Las comillas son solo textura: van al ángulo opuesto al que
                  arranca la cita, para no cruzarse nunca con el texto. */}
              <Quote
                aria-hidden="true"
                strokeWidth={1}
                className="pointer-events-none absolute -top-5 -right-4 size-24 text-olive/[0.07] md:size-32"
              />

              {/* Se reserva alto para que el bloque no dé saltos al rotar, y la
                  cita se centra: las cortas no dejan un hueco vacío debajo. */}
              <div
                className="relative flex min-h-[9.5rem] items-center md:min-h-[8.5rem]"
                aria-live="polite"
              >
                <blockquote
                  key={activa}
                  className="anim-fade max-w-[46rem] font-display text-[1.35rem] leading-snug text-ink md:pr-10 md:text-[1.75rem]"
                >
                  «{r.texto}»
                </blockquote>
              </div>

              <footer className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-rule pt-6">
                <div>
                  <p className="text-[0.95rem] text-ink">{r.nombre}</p>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.83rem] font-light text-ink-faint">
                    {fecha ? <span>{fecha}</span> : null}
                    {r.verificada ? (
                      <span className="inline-flex items-center gap-1.5 text-cypress">
                        <BadgeCheck className="size-3.5" strokeWidth={1.7} aria-hidden="true" />
                        Verificada en Google
                      </span>
                    ) : null}
                  </p>
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
                  <span className="tabular-nums px-1 text-[0.83rem] font-light text-ink-faint">
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
