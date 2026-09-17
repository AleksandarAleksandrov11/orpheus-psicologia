/**
 * MARQUESINA DE RESEÑAS
 * ------------------------------------------------------------------
 * Muro de reseñas que se desplaza solo hacia la izquierda, igual que la
 * marquesina de palabras que hay bajo el hero: movimiento continuo y todas
 * las reseñas a la vista, en lugar de una cada vez.
 *
 * Cómo se mueve: la lista se pinta dos veces seguidas y la cinta viaja
 * de 0 a -50 %, así que al terminar la primera copia la segunda está
 * exactamente donde estaba la primera y el salto no se ve. La duración
 * se calcula a partir del número de tarjetas para que el paso sea el
 * mismo haya nueve reseñas o treinta.
 *
 * La segunda copia solo se monta en el navegador. El HTML que se sirve
 * lleva las reseñas una única vez: cuando iban las dos desde el servidor,
 * los rastreadores encontraban cada reseña repetida dentro de la misma
 * página y la contaban como texto duplicado. La cinta arranca justo
 * cuando la copia ya está puesta, así que el bucle nunca se ve a medias.
 *
 * Detalles de comportamiento: se detiene al pasar el ratón o al dar el
 * foco a un enlace de dentro, la copia duplicada queda fuera del árbol
 * de accesibilidad y, con `prefers-reduced-motion`, la cinta se para y
 * la fila pasa a moverse a mano.
 */

import { useEffect, useState } from "react";
import { BadgeCheck } from "lucide-react";

import { RESENAS_PUBLICADAS, mesDeResena, type Resena } from "@/content/resenas";
import { SITE, esPendiente } from "@/content/site";
import { Antetitulo, BotonEnlace, BotonExterno } from "./ui";
import { Reveal } from "./motion";

/** Segundos que tarda una tarjeta en recorrer su propio ancho. */
const SEGUNDOS_POR_TARJETA = 8;

export function MarquesinaResenas() {
  const resenas = RESENAS_PUBLICADAS;
  // Falso en el primer pintado (servidor y cliente coinciden) y verdadero
  // en cuanto hidrata: es lo que mantiene una sola copia en el HTML.
  const [duplicada, setDuplicada] = useState(false);
  useEffect(() => setDuplicada(true), []);

  const hayGoogle = !esPendiente(SITE.social.googleReviews);
  const duracion = resenas.length * SEGUNDOS_POR_TARJETA;

  if (!resenas.length) return null;

  return (
    <section
      className="relative overflow-hidden border-y border-rule bg-sage"
      aria-labelledby="resenas-titulo"
    >
      <div className="grain absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 section-y-sm">
        <Reveal className="shell flex flex-wrap items-end justify-between gap-6">
          <div>
            <Antetitulo>Reseñas</Antetitulo>
            <h2 id="resenas-titulo" className="display-sm mt-5">
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

        {/* La máscara difumina los dos extremos: las tarjetas entran y salen
            en vez de cortarse contra el borde de la pantalla. */}
        <Reveal
          delay={120}
          className="marquee-pausable mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)] motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]"
        >
          <div
            className="marquee-track py-1"
            style={{
              animationDuration: `${duracion}s`,
              animationPlayState: duplicada ? "running" : "paused",
            }}
          >
            {resenas.map((r, i) => (
              <TarjetaResena key={`a-${r.nombre}-${i}`} resena={r} />
            ))}
            {duplicada
              ? resenas.map((r, i) => <TarjetaResena key={`b-${r.nombre}-${i}`} resena={r} copia />)
              : null}
          </div>
        </Reveal>

        <Reveal delay={200} className="shell mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <BotonEnlace to="/testimonios" variante="outline">
            Leer todas las reseñas
          </BotonEnlace>
          {/* Cypress y no ink-faint: sobre la banda sage el gris claro se
              quedaba en 4,35:1. */}
          <p className="text-[0.96rem] font-light text-cypress">
            Publicadas con su texto literal y verificadas en Google.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Tarjeta de la cinta. Todas miden lo mismo para que la fila no dé dientes
 * de sierra: el texto se recorta a siete líneas y la reseña entera se lee
 * en /testimonios, que está enlazada justo debajo.
 */
function TarjetaResena({ resena, copia = false }: { resena: Resena; copia?: boolean }) {
  const fecha = mesDeResena(resena.fecha);
  const pie = [resena.contexto, fecha].filter(Boolean).join(" · ");

  return (
    <article
      aria-hidden={copia || undefined}
      className="relative mr-5 flex h-[22.5rem] w-[18rem] shrink-0 flex-col overflow-hidden rounded-2xl border border-rule bg-linen p-7 md:mr-6 md:h-[24rem] md:w-[25rem] md:p-8"
    >
      {/* Filete superior: la seña de la tarjeta. Va aquí y no como comilla de
          fondo para que nada se cruce con el texto de la reseña. */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-olive/40" />

      <blockquote className="line-clamp-[8] font-display text-[1.09rem] leading-[1.5] text-ink">
        {resena.texto}
      </blockquote>

      <footer className="mt-auto border-t border-rule pt-5">
        <p className="text-[1rem] text-ink">{resena.nombre}</p>
        {pie ? <p className="mt-1 text-[0.87rem] font-light text-ink-faint">{pie}</p> : null}
        {resena.verificada ? (
          <p className="mt-2 inline-flex items-center gap-1.5 text-[0.84rem] font-light text-cypress">
            <BadgeCheck className="size-3.5" strokeWidth={1.7} aria-hidden="true" />
            Verificada en Google
          </p>
        ) : null}
      </footer>
    </article>
  );
}
