import { Link } from "@tanstack/react-router";
import { Check, Clock, Video } from "lucide-react";

import { Reveal } from "@/components/site/motion";
import { BotonEnlace } from "@/components/site/ui";
import { MOSTRAR_PRECIOS, SESIONES, TARIFAS_NOTAS } from "@/content/copy";

/**
 * La tarjeta de tarifas con sus condiciones. Se usa igual en Servicios y en
 * la página de Tarifas, para que el diseño y el precio no puedan quedar
 * distintos en una y otra. Hoy es un servicio único: la tarjeta va a la
 * izquierda y las condiciones generales, con el botón, a su lado.
 */
export function TarifasTarjetas() {
  return (
    <div className="mt-10 grid gap-10 md:mt-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
      {SESIONES.map((s) => (
        <Reveal
          as="article"
          key={s.slug}
          className="relative flex flex-col rounded-2xl border border-rule bg-linen px-6 py-10 text-center md:px-12 md:py-14 md:text-left"
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-6 top-0 h-0.5 rounded-full bg-cypress md:inset-x-12"
          />

          <p className="eyebrow text-olive">{s.etiqueta}</p>
          <h3 className="display-sm mt-5">{s.titulo}</h3>

          {MOSTRAR_PRECIOS && s.precio ? (
            <p className="mt-5 font-display text-[2.8rem] leading-none text-cypress md:text-[3.3rem]">
              {s.precio}
            </p>
          ) : null}

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[0.96rem] font-light text-ink-faint md:justify-start">
            <span className="flex items-center gap-2">
              <Clock className="size-3.5" strokeWidth={1.6} aria-hidden="true" />
              {s.duracion}
            </span>
            <span className="flex items-center gap-2">
              <Video className="size-3.5" strokeWidth={1.6} aria-hidden="true" />
              {s.canal}
            </span>
          </div>
          <p className="prose-body mt-5 text-[1.07rem]">{s.resumen}</p>

          <p className="eyebrow mt-8 text-ink-faint">Incluye</p>
          <ul className="mx-auto mt-4 w-fit space-y-3 text-left md:mx-0 md:w-auto">
            {s.incluye.map((item) => (
              <li key={item} className="flex gap-3 text-[1.03rem] font-light text-ink">
                <Check
                  className="mt-1 size-3.5 shrink-0 text-olive"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>

          <ul className="mt-8 space-y-2.5 border-t border-rule pt-6 text-left">
            {s.notas.map((n) => (
              <li
                key={n}
                className="flex gap-3 text-[0.99rem] leading-relaxed font-light text-ink-muted"
              >
                <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-cedar" />
                {n}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Link to="/contacto" className="link-draw text-[0.99rem] text-cypress">
              {s.enlace}
            </Link>
          </div>
        </Reveal>
      ))}

      <Reveal delay={140} className="lg:pt-4">
        <ul className="space-y-4">
          {TARIFAS_NOTAS.map((n) => (
            <li
              key={n}
              className="flex gap-3 text-[0.99rem] leading-relaxed font-light text-ink-faint"
            >
              <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-cedar" />
              {n}
            </li>
          ))}
        </ul>
        {/* Junto a las condiciones de pago y cancelación, el paso natural es
            escribir; el rótulo no repite el del botón de la cabecera. */}
        <div className="mt-9">
          <BotonEnlace to="/contacto">Escríbeme para reservar</BotonEnlace>
        </div>
      </Reveal>
    </div>
  );
}
