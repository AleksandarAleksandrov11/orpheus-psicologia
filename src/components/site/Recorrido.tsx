/**
 * ¿CÓMO TRABAJAREMOS? — recorrido terapéutico en olas
 * ------------------------------------------------------------------
 * Melissa pidió dos cosas en dos revisiones seguidas: que la sección
 * dejara de parecer una escalera («la terapia nunca es lineal») y que
 * dejara de ser una columna vertical estática. Así que las cuatro fases
 * se reparten ahora a lo largo de una ola horizontal que baja y sube,
 * y que se dibuja sola a medida que se hace scroll.
 *
 * La ola arranca hacia abajo y termina arriba, que es justo el gesto
 * del proyecto: descender para poder elevarse.
 */

import { useEffect, useRef, useState } from "react";
import { RECORRIDO } from "@/content/copy";
import { Reveal } from "./motion";
import { useReducedMotion, useScrollProgress } from "@/lib/motion";

/** Posición de cada fase, en porcentaje de la caja. Alterna valle y cresta. */
const NODOS = [
  { x: 12.5, y: 67, arriba: false },
  { x: 37.5, y: 33, arriba: true },
  { x: 62.5, y: 67, arriba: false },
  { x: 87.5, y: 33, arriba: true },
] as const;

/**
 * La ola, en coordenadas del viewBox (1200 × 400). Cada nodo cae en un
 * extremo de la curva, con las tangentes horizontales, para que la
 * ondulación sea suave y las fases queden en el punto más alto o más
 * bajo de cada tramo.
 */
const OLA = [
  "M 0 200",
  "C 50 200, 100 268, 150 268",
  "C 225 268, 375 132, 450 132",
  "C 525 132, 675 268, 750 268",
  "C 825 268, 975 132, 1050 132",
  "C 1100 132, 1150 200, 1200 200",
].join(" ");

/**
 * Longitud real del trazo, en píxeles de pantalla.
 *
 * `getTotalLength()` devuelve la longitud en unidades del viewBox, pero el
 * trazo lleva `vector-effect: non-scaling-stroke`, y con esa propiedad el
 * navegador calcula el patrón de guiones en el espacio de la pantalla. Como
 * además el SVG se estira con `preserveAspectRatio="none"` (la escala no es
 * uniforme), ambas magnitudes no coinciden y el último tramo de la curva se
 * quedaba sin dibujar. Se mide muestreando la curva y llevando cada punto a
 * coordenadas de pantalla con la matriz del SVG.
 */
function largoEnPantalla(path: SVGPathElement): number {
  const total = path.getTotalLength();
  const ctm = path.getScreenCTM();
  if (!ctm) return total;

  const MUESTRAS = 240;
  let suma = 0;
  let previo: DOMPoint | null = null;
  for (let i = 0; i <= MUESTRAS; i++) {
    const q = path.getPointAtLength((total * i) / MUESTRAS);
    const punto = new DOMPoint(q.x, q.y).matrixTransform(ctm);
    if (previo) suma += Math.hypot(punto.x - previo.x, punto.y - previo.y);
    previo = punto;
  }
  // El muestreo por cuerdas se queda algo corto en las curvas: un margen
  // pequeño garantiza que el trazo llegue siempre hasta el último nodo.
  return suma * 1.02;
}

export function RecorridoNoLineal() {
  const { ref, progreso } = useScrollProgress<HTMLDivElement>();
  const pathRef = useRef<SVGPathElement>(null);
  const [largo, setLargo] = useState(0);
  const maximo = useRef(0);
  const reducido = useReducedMotion();

  // Se remide al cambiar el tamaño: la escala del SVG depende del ancho.
  useEffect(() => {
    const medir = () => {
      if (pathRef.current) setLargo(largoEnPantalla(pathRef.current));
    };
    medir();
    window.addEventListener("resize", medir, { passive: true });
    return () => window.removeEventListener("resize", medir);
  }, []);

  // El trazo empieza a dibujarse cuando la sección entra de verdad en pantalla
  // y se completa con holgura, para que nunca se quede a medias.
  const bruto = reducido ? 1 : Math.min(1, Math.max(0, (progreso - 0.08) / 0.4));
  // El avance no retrocede: lo ya recorrido se queda dibujado aunque se suba.
  maximo.current = Math.max(maximo.current, bruto);
  const avance = maximo.current;

  return (
    <div ref={ref} className="relative mt-14 md:mt-20">
      {/* ── Escritorio: la ola horizontal con las fases repartidas ── */}
      <div className="relative hidden h-[34rem] lg:block xl:h-[36rem]">
        <svg
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
          focusable="false"
        >
          {/* Trazo fantasma: la ola completa, tenue */}
          <path
            d={OLA}
            fill="none"
            stroke="var(--color-cedar)"
            strokeOpacity="0.34"
            strokeWidth="1.5"
            strokeDasharray="2 7"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Trazo que se dibuja con el scroll */}
          <path
            ref={pathRef}
            d={OLA}
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

        {/* Nodos sobre la cresta o el valle de cada tramo */}
        {NODOS.map((nodo, i) => {
          const activo = avance > (i + 0.4) / NODOS.length;
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

        {/* Cada fase, por el lado libre de la ola: arriba en las crestas,
            abajo en los valles. Así el texto nunca cae sobre el trazo. */}
        {RECORRIDO.pasos.map((paso, i) => {
          const nodo = NODOS[i];
          const activo = avance > (i + 0.4) / NODOS.length;
          return (
            <div
              key={paso.n}
              className={`absolute w-[15.5rem] -translate-x-1/2 text-center transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] xl:w-[17rem] ${
                activo ? "translate-y-0 opacity-100" : "translate-y-2 opacity-50"
              }`}
              style={
                nodo.arriba
                  ? { left: `${nodo.x}%`, bottom: `${100 - nodo.y + 5}%` }
                  : { left: `${nodo.x}%`, top: `${nodo.y + 5}%` }
              }
            >
              <p className="eyebrow text-olive">{paso.n}</p>
              <h3 className="display-sm mt-2.5">{paso.t}</h3>
              <p className="prose-body mt-2.5 text-[0.95rem] leading-[1.65]">{paso.d}</p>
            </div>
          );
        })}
      </div>

      {/* ── Móvil y tableta: columna con conector ── */}
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
            <p className="prose-body mt-2.5 text-[0.99rem]">{paso.d}</p>
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
