import { Link } from "@tanstack/react-router";
import { Check, Clock, Video } from "lucide-react";

import { Reveal } from "@/components/site/motion";
import { BotonEnlace } from "@/components/site/ui";
import { MOSTRAR_PRECIOS, SESIONES, TARIFAS_ACLARACION, TARIFAS_NOTAS } from "@/content/copy";

/**
 * Las tres tarjetas de tarifas con su aclaración y sus condiciones. Se usan
 * igual en Servicios y en la página de Tarifas, para que el diseño y los
 * precios no puedan quedar distintos en una y otra.
 */
export function TarifasTarjetas() {
  return (
    <>
      <Reveal delay={220} className="mt-10 border-l-2 border-cypress/40 pl-5 md:mt-12 md:pl-6">
        <p className="max-w-3xl text-[1.05rem] leading-relaxed font-light text-ink-muted">
          {TARIFAS_ACLARACION}
        </p>
      </Reveal>

      <div className="mt-10 grid border-y border-rule md:mt-12 md:grid-cols-3 md:divide-x md:divide-rule">
        {SESIONES.map((s, i) => {
          const destacada = "destacado" in s && s.destacado;
          return (
            <Reveal
              as="article"
              key={s.slug}
              delay={i * 90}
              className={`relative flex flex-col py-9 text-center md:px-9 md:py-12 md:text-left ${
                destacada ? "rounded-2xl bg-linen px-6 md:px-10 md:py-14" : ""
              } ${i > 0 && !destacada ? "border-t border-rule md:border-t-0" : ""}`}
            >
              {destacada ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-6 top-0 h-0.5 rounded-full bg-cypress md:inset-x-10"
                />
              ) : null}

              <p className="eyebrow text-olive">{s.etiqueta}</p>
              <h3 className="display-sm mt-5">{s.titulo}</h3>

              {MOSTRAR_PRECIOS && s.precio ? (
                <p className="mt-5 flex items-baseline justify-center gap-3 md:justify-start">
                  <span className="font-display text-[2.6rem] leading-none text-cypress md:text-[3.1rem]">
                    {s.precio}
                  </span>
                  <span className="text-[0.93rem] font-light text-ink-faint">{s.nota}</span>
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
              <ul className="mx-auto mt-4 w-fit flex-1 space-y-3 text-left md:mx-0 md:w-auto">
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

              <div className="mt-9 border-t border-rule pt-6">
                <Link to="/contacto" className="link-draw text-[0.99rem] text-cypress">
                  {/* «Reservar» a secas, repetido en dos de las tres tarjetas,
                      no decía qué se reserva: leído por un lector de
                      pantalla, fuera de contexto, no significaba nada. Cada
                      una nombra ahora lo suyo, con artículo, para no chocar
                      tampoco con el botón de reserva de la cabecera. */}
                  {s.enlace}
                </Link>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal
        delay={140}
        className="mt-12 grid gap-8 md:grid-cols-[auto_1fr] md:items-start md:gap-12"
      >
        {/* El mismo rótulo que el botón del encabezado de la página hacía
            que dos enlaces distintos sonaran igual. Aquí, junto a las
            condiciones de pago y cancelación, el paso natural es escribir. */}
        <BotonEnlace to="/contacto">Escríbeme para reservar</BotonEnlace>
        <ul className="space-y-2.5">
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
      </Reveal>
    </>
  );
}
