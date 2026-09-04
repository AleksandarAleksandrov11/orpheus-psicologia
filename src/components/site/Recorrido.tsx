/**
 * ¿CÓMO TRABAJAREMOS? — recorrido terapéutico no lineal
 * ------------------------------------------------------------------
 * Melissa pidió expresamente que esta sección dejase de parecer una
 * escalera: «la terapia nunca es lineal». Las cuatro fases se colocan
 * saltando de un lado a otro sobre una línea sinuosa que se dibuja a
 * medida que se hace scroll.
 *
 * Geometría: la curva vive siempre dentro de un canal central que va
 * del 34 % al 66 % del ancho. Las tarjetas se anclan por fuera de ese
 * canal, de modo que el trazo nunca puede cruzar por encima del texto
 * por mucho que cambie el tamaño de la pantalla.
 */

import { useEffect, useRef, useState } from "react";
import { RECORRIDO } from "@/content/copy";
import { Reveal } from "./motion";
import { useReducedMotion, useScrollProgress } from "@/lib/motion";

/** Bordes del canal central, en porcentaje del ancho del contenedor. */
const IZQUIERDA = 34;
const DERECHA = 66;

/** Nodos: alternan lado y bajan por el canal. */
const NODOS = [
  { x: IZQUIERDA, y: 9 },
  { x: DERECHA, y: 34 },
  { x: IZQUIERDA, y: 61 },
  { x: DERECHA, y: 88 },
] as const;

/**
 * Trazo en coordenadas del viewBox (1000 × 1200). Serpentea entre los
 * cuatro nodos sin salirse nunca del canal 340–660.
 */
const CURVA = [
  "M 340 108",
  "C 432 138, 522 182, 562 244",
  "C 602 306, 620 360, 660 408",
  "C 638 462, 560 486, 500 516",
  "C 430 552, 380 606, 400 660",
  "C 416 700, 352 692, 340 732",
  "C 332 778, 400 802, 432 844",
  "C 472 898, 542 942, 592 984",
  "C 626 1012, 646 1036, 660 1056",
].join(" ");

export function RecorridoNoLineal() {
  const { ref, progreso } = useScrollProgress<HTMLDivElement>();
  const pathRef = useRef<SVGPathElement>(null);
  const [largo, setLargo] = useState(0);
  const maximo = useRef(0);
  const reducido = useReducedMotion();

  useEffect(() => {
    if (pathRef.current) setLargo(pathRef.current.getTotalLength());
  }, []);

  // El trazo empieza a dibujarse cuando la sección entra de verdad en pantalla.
  // Se completa con holgura antes de que la última fase llegue al centro
  // de la pantalla: así el trazo nunca se queda a medias en páginas largas.
  const bruto = reducido ? 1 : Math.min(1, Math.max(0, (progreso - 0.05) / 0.36));
  // El avance no retrocede: lo ya recorrido se queda dibujado aunque se suba.
  maximo.current = Math.max(maximo.current, bruto);
  const avance = maximo.current;

  return (
    <div ref={ref} className="relative mt-16 md:mt-24">
      {/* ── Versión de escritorio: curva + tarjetas repartidas ── */}
      <div className="relative hidden h-[78rem] lg:block">
        <svg
          viewBox="0 0 1000 1200"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
          focusable="false"
        >
          {/* Trazo fantasma: el camino completo, tenue */}
          <path
            d={CURVA}
            fill="none"
            stroke="var(--color-cedar)"
            strokeOpacity="0.32"
            strokeWidth="1.5"
            strokeDasharray="2 7"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Trazo que se dibuja con el scroll */}
          <path
            ref={pathRef}
            d={CURVA}
            fill="none"
            stroke="var(--color-cypress)"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{
              strokeDasharray: largo || 1,
              strokeDashoffset: largo ? largo * (1 - avance) : 0,
              transition: "stroke-dashoffset 0.15s linear",
            }}
          />
        </svg>

        {/* Nodos: van justo sobre el borde del canal */}
        {NODOS.map((nodo, i) => {
          const activo = avance > (i + 0.35) / NODOS.length;
          return (
            <span
              key={`nodo-${i}`}
              aria-hidden="true"
              className={`absolute grid size-4 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border transition-all duration-700 ${
                activo ? "border-cypress bg-cypress" : "border-cedar/60 bg-bone"
              }`}
              style={{ left: `${nodo.x}%`, top: `${nodo.y}%` }}
            >
              <span
                className={`size-1.5 rounded-full bg-bone transition-opacity duration-700 ${
                  activo ? "opacity-100" : "opacity-0"
                }`}
              />
            </span>
          );
        })}

        {/* Tarjetas: siempre por fuera del canal, nunca bajo la curva */}
        {RECORRIDO.pasos.map((paso, i) => {
          const nodo = NODOS[i];
          const alaIzquierda = nodo.x < 50;
          const activo = avance > (i + 0.35) / NODOS.length;
          return (
            <div
              key={paso.n}
              className={`absolute max-w-[24rem] -translate-y-1/2 transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                alaIzquierda ? "mr-10 text-right" : "ml-10 text-left"
              } ${activo ? "translate-y-[-50%] opacity-100" : "opacity-60"}`}
              style={
                alaIzquierda
                  ? { right: `${100 - nodo.x}%`, top: `${nodo.y}%` }
                  : { left: `${nodo.x}%`, top: `${nodo.y}%` }
              }
            >
              <p className="eyebrow text-olive">{paso.n}</p>
              <h3 className="display-sm mt-3">{paso.t}</h3>
              <p className="prose-body mt-3 text-[0.95rem]">{paso.d}</p>
            </div>
          );
        })}
      </div>

      {/* ── Versión móvil y tableta: columna con conector sinuoso ── */}
      <ol className="relative space-y-10 lg:hidden">
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-8 left-[0.4375rem] w-px bg-gradient-to-b from-cypress/50 via-cedar/40 to-transparent"
        />
        {RECORRIDO.pasos.map((paso, i) => (
          <Reveal as="li" key={paso.n} delay={i * 90} className="relative pl-10">
            <span
              aria-hidden="true"
              className="absolute top-2 left-0 grid size-3.5 place-items-center rounded-full border border-cypress bg-cypress"
            >
              <span className="size-1.5 rounded-full bg-bone" />
            </span>
            <p className="eyebrow text-olive">{paso.n}</p>
            <h3 className="display-sm mt-2.5">{paso.t}</h3>
            <p className="prose-body mt-2.5 text-[0.95rem]">{paso.d}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   EXPECTATIVA vs. REALIDAD
   Reproduce el esquema que Melissa adjuntó en el briefing.
   ══════════════════════════════════════════════════════════════════ */

const HITOS = [
  { x: 96, y: 118, label: "Empezar", arriba: true },
  { x: 168, y: 152, label: "Dudar", arriba: false },
  { x: 128, y: 196, label: "Practicar", arriba: false },
  { x: 76, y: 178, label: "Aprender", arriba: true },
  { x: 108, y: 226, label: "Fallar", arriba: false },
  { x: 196, y: 214, label: "Perderse", arriba: false },
  { x: 250, y: 156, label: "Entender", arriba: true },
  { x: 322, y: 132, label: "Tener problemas", arriba: true },
  { x: 380, y: 178, label: "Lograrlo", arriba: false },
] as const;

const CAMINO_REAL = [
  "M 40 92",
  "C 62 96, 84 104, 96 118",
  "C 112 136, 152 138, 168 152",
  "C 186 168, 156 186, 128 196",
  "C 100 206, 66 194, 76 178",
  "C 86 162, 96 214, 108 226",
  "C 122 240, 176 232, 196 214",
  "C 216 196, 214 158, 250 156",
  "C 286 154, 292 122, 322 132",
  "C 352 142, 348 174, 380 178",
].join(" ");

export function DiagramaExpectativaRealidad({ className = "" }: { className?: string }) {
  const { ref, progreso } = useScrollProgress<HTMLDivElement>();
  const realRef = useRef<SVGPathElement>(null);
  const [largo, setLargo] = useState(0);
  const maximo = useRef(0);
  const reducido = useReducedMotion();

  useEffect(() => {
    if (realRef.current) setLargo(realRef.current.getTotalLength());
  }, []);

  const bruto = reducido ? 1 : Math.min(1, Math.max(0, (progreso - 0.18) / 0.4));
  maximo.current = Math.max(maximo.current, bruto);
  const avance = maximo.current;

  return (
    <div ref={ref} className={className}>
      <svg
        viewBox="0 0 430 268"
        className="w-full"
        role="img"
        aria-label="Esquema comparativo: la expectativa es una línea recta entre definir un objetivo y conseguirlo; la realidad es un camino sinuoso que pasa por empezar, dudar, aprender, practicar, fallar, perderse, entender, tener problemas y, finalmente, lograrlo."
      >
        {/* ── Expectativa ── */}
        <text x="14" y="18" className="fill-ink font-display" fontSize="15" fontStyle="italic">
          Expectativa
        </text>
        <line
          x1="40"
          y1="44"
          x2="380"
          y2="44"
          stroke="var(--color-cypress)"
          strokeWidth="1.2"
          strokeLinecap="round"
          style={{
            strokeDasharray: 340,
            strokeDashoffset: 340 * (1 - Math.min(1, avance * 2)),
            transition: "stroke-dashoffset 0.2s linear",
          }}
        />
        <circle cx="40" cy="44" r="4" className="fill-olive" />
        <circle cx="380" cy="44" r="4" className="fill-olive" />
        <text x="14" y="62" className="fill-ink-faint" fontSize="9">
          Definir un objetivo
        </text>
        <text x="352" y="62" className="fill-ink-faint" fontSize="9">
          Conseguirlo
        </text>

        {/* ── Realidad ── */}
        <path
          ref={realRef}
          d={CAMINO_REAL}
          fill="none"
          stroke="var(--color-cypress)"
          strokeWidth="1.2"
          strokeLinecap="round"
          style={{
            strokeDasharray: largo || 1,
            strokeDashoffset: largo ? largo * (1 - avance) : 0,
            transition: "stroke-dashoffset 0.2s linear",
          }}
        />
        <circle cx="40" cy="92" r="4" className="fill-olive" />
        <text x="12" y="82" className="fill-ink-faint" fontSize="9">
          Definir un objetivo
        </text>

        {HITOS.map((h, i) => {
          const visible = avance > (i + 1) / (HITOS.length + 2);
          return (
            <g
              key={h.label}
              style={{
                opacity: visible ? 1 : 0,
                transition: `opacity 0.5s ease ${i * 30}ms`,
              }}
            >
              <circle cx={h.x} cy={h.y} r="3.4" className="fill-olive" />
              <text
                x={h.x}
                y={h.arriba ? h.y - 8 : h.y + 15}
                textAnchor="middle"
                className="fill-ink-faint"
                fontSize="8.5"
              >
                {h.label}
              </text>
            </g>
          );
        })}

        <text x="14" y="262" className="fill-ink font-display" fontSize="15" fontStyle="italic">
          Realidad
        </text>
      </svg>
    </div>
  );
}
