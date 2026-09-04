/**
 * ARMAZÓN DE LAS PÁGINAS LEGALES
 * ------------------------------------------------------------------
 * Índice lateral pegajoso + columna de lectura estrecha. Sobrio, sin
 * fotografías, pero claramente dentro del sistema visual del sitio.
 */

import { AlertTriangle } from "lucide-react";
import type { ReactNode } from "react";

import { LEGAL_ACTUALIZADO } from "@/content/site";
import { Antetitulo, Migas } from "./ui";
import { Reveal } from "./motion";

const formatoFecha = (iso: string) =>
  new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(`${iso}T00:00:00`),
  );

export type SeccionLegal = { id: string; titulo: string; contenido: ReactNode };

/** Marca visible para un dato que aún no ha facilitado la titular. */
export function Pendiente({ children }: { children: ReactNode }) {
  return (
    <mark className="inline-flex items-center gap-1.5 rounded-md bg-paper-deep px-2 py-0.5 text-[0.85em] text-cypress">
      <AlertTriangle className="size-3 shrink-0" strokeWidth={1.8} aria-hidden="true" />
      {children}
    </mark>
  );
}

/** Aviso de cabecera cuando la página contiene datos sin completar. */
export function AvisoPendientes({ cuantos }: { cuantos: number }) {
  if (cuantos === 0) return null;
  return (
    <div
      role="note"
      className="mt-10 rounded-xl border border-cedar bg-paper/70 p-5 text-[0.85rem] leading-relaxed font-light text-ink-muted"
    >
      <p className="font-sans text-[0.7rem] font-medium tracking-[0.2em] text-cypress uppercase">
        Antes de publicar
      </p>
      <p className="mt-2.5">
        Esta página contiene {cuantos} {cuantos === 1 ? "dato pendiente" : "datos pendientes"} de
        completar, señalados en el texto. Son obligatorios por la LSSI-CE y el RGPD: se rellenan en{" "}
        <code className="rounded bg-paper-deep px-1.5 py-0.5 text-[0.9em]">
          src/content/site.ts
        </code>{" "}
        y se actualizan automáticamente en todas las páginas.
      </p>
    </div>
  );
}

export function PaginaLegal({
  antetitulo,
  titulo,
  cursiva,
  entradilla,
  secciones,
  pendientes = 0,
  actualizado = LEGAL_ACTUALIZADO,
}: {
  antetitulo: string;
  titulo: string;
  /** Palabra final que va en cursiva dentro del h1. */
  cursiva?: string;
  entradilla: string;
  secciones: SeccionLegal[];
  pendientes?: number;
  actualizado?: string;
}) {
  return (
    <>
      {/* Cabecera */}
      <section className="aurora grain relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-20">
        <div className="relative z-10 shell max-w-4xl">
          <Migas items={[{ nombre: "Inicio", path: "/" }, { nombre: antetitulo }]} />
          <Antetitulo>{antetitulo}</Antetitulo>
          <h1 className="display-lg mt-6">
            {titulo} {cursiva ? <em className="italic">{cursiva}</em> : null}
          </h1>
          <p className="lede mt-6 max-w-2xl">{entradilla}</p>
          <p className="eyebrow mt-8 text-ink-faint">
            Última actualización · {formatoFecha(actualizado)}
          </p>
          <AvisoPendientes cuantos={pendientes} />
        </div>
      </section>

      {/* Cuerpo */}
      <div className="shell grid gap-12 pb-24 md:pb-32 lg:grid-cols-[16rem_1fr] lg:gap-16">
        <nav aria-label="Índice de la página" className="min-w-0 lg:sticky lg:top-32 lg:self-start">
          <h2 className="eyebrow text-olive">Índice</h2>
          <ol className="mt-5 space-y-2.5 border-l border-rule pl-5">
            {secciones.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="link-draw text-[0.82rem] leading-snug font-light text-ink-muted transition-colors duration-400 hover:text-cypress"
                >
                  <span className="tabular-nums text-ink-faint">
                    {String(i + 1).padStart(2, "0")}.
                  </span>{" "}
                  {s.titulo}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0 max-w-[48rem]">
          {secciones.map((s, i) => (
            <Reveal
              as="section"
              key={s.id}
              id={s.id}
              delay={40}
              className={`scroll-mt-28 ${i === 0 ? "" : "mt-14 border-t border-rule pt-14"}`}
              aria-labelledby={`${s.id}-titulo`}
            >
              <h2 id={`${s.id}-titulo`} className="display-sm">
                <span className="eyebrow mr-3 align-middle text-olive tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.titulo}
              </h2>
              <div className="legal mt-6 text-[0.95rem] leading-[1.85] font-light text-ink-muted">
                {s.contenido}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
