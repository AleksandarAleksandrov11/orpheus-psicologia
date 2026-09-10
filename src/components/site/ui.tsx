/**
 * PRIMITIVAS DE INTERFAZ
 * Botones, antetítulos, títulos de sección, marca, acordeón y migas.
 */

import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import {
  useId,
  useState,
  type ComponentProps,
  type CSSProperties,
  type MouseEventHandler,
  type ReactNode,
} from "react";
import { Reveal, Magnetico } from "./motion";

/** Destino aceptado por el enrutador, tipado según el árbol de rutas real. */
export type Destino = LinkProps["to"];

/* ══════════════════════════════════════════════════════════════════
   MARCA — la lira lunar de Orpheus
   ------------------------------------------------------------------
   Reproducción vectorial del logotipo original (el mismo que aparece
   en las tarjetas, en la reserva de sesiones y en redes). La geometría
   se midió sobre el archivo original: la caja es la luna creciente que
   resulta de restar una elipse a un círculo, y sobre ella descansan el
   yugo con sus dos remates y las cuatro cuerdas.
   ══════════════════════════════════════════════════════════════════ */

/** Círculo exterior de la luna. */
const LUNA = { cx: 50, cy: 41.05, r: 44.9 } as const;
/** Elipse que vacía la luna y forma la curva interior. */
const HUECO = { cx: 50, cy: 31.85, rx: 34.7, ry: 41.2 } as const;
/** Yugo: travesaño con un remate redondo en cada extremo. */
const YUGO = { y: 18.15, x1: 4.4, x2: 95.6, remate: 3 } as const;
/** Cuerdas, simétricas respecto del eje. */
const CUERDAS = [32.6, 41.3, 50, 58.7, 67.4] as const;

/** Punto en el que cada cuerda se apoya sobre la curva interior de la luna. */
function apoyoCuerda(x: number) {
  const t = (x - HUECO.cx) / HUECO.rx;
  return HUECO.cy + HUECO.ry * Math.sqrt(Math.max(0, 1 - t * t)) + 0.6;
}

/**
 * Puntas de la luna: donde se cortan el círculo y la elipse.
 *
 * Se calculan en lugar de escribirse a mano porque de ahí salen los dos
 * extremos del arco. Restar la elipse con `fill-rule="evenodd"` no vale:
 * la elipse es más alta que el círculo y su casquete superior quedaba
 * fuera de él, así que se pintaba, y el viewBox lo recortaba en plano.
 * Era el «redondel oscuro» que asomaba por encima del logotipo.
 */
const PUNTAS = (() => {
  const { cx, cy, r } = LUNA;
  const { ry, rx } = HUECO;
  // Igualando ambas cónicas queda una ecuación de segundo grado en y.
  const k = 1 - (rx * rx) / (ry * ry);
  const a = k;
  const b = -2 * cy + (2 * HUECO.cy * rx * rx) / (ry * ry);
  const c = cy * cy - r * r + rx * rx - (HUECO.cy * HUECO.cy * rx * rx) / (ry * ry);
  const y = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
  const dx = Math.sqrt(Math.max(0, r * r - (y - cy) * (y - cy)));
  return { y, izq: cx - dx, der: cx + dx };
})();

/** Silueta de la luna: arco exterior por abajo y curva interior de vuelta. */
const SILUETA = [
  `M ${PUNTAS.izq.toFixed(3)} ${PUNTAS.y.toFixed(3)}`,
  `A ${LUNA.r} ${LUNA.r} 0 1 0 ${PUNTAS.der.toFixed(3)} ${PUNTAS.y.toFixed(3)}`,
  `A ${HUECO.rx} ${HUECO.ry} 0 1 1 ${PUNTAS.izq.toFixed(3)} ${PUNTAS.y.toFixed(3)}`,
  "Z",
].join(" ");

export function Lira({
  className = "",
  trazo = 1.8,
  title,
}: {
  className?: string;
  /** Grosor de las cuerdas en unidades del viewBox. */
  trazo?: number;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 88"
      fill="none"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}

      {/* Caja de resonancia: la luna creciente */}
      <path d={SILUETA} fill="currentColor" />

      {/* Cuerdas */}
      <g stroke="currentColor" strokeWidth={trazo} strokeLinecap="round">
        {CUERDAS.map((x) => (
          <line key={x} x1={x} y1={2.2} x2={x} y2={apoyoCuerda(x)} />
        ))}
      </g>

      {/* Yugo y remates */}
      <line
        x1={YUGO.x1}
        y1={YUGO.y}
        x2={YUGO.x2}
        y2={YUGO.y}
        stroke="currentColor"
        strokeWidth={trazo * 0.86}
        strokeLinecap="round"
      />
      <circle cx={YUGO.x1} cy={YUGO.y} r={YUGO.remate} fill="currentColor" />
      <circle cx={YUGO.x2} cy={YUGO.y} r={YUGO.remate} fill="currentColor" />
    </svg>
  );
}

export function Marca({
  className = "",
  variante = "completa",
}: {
  className?: string;
  variante?: "completa" | "lira";
}) {
  if (variante === "lira") {
    return <Lira className={className} title="Orpheus Psicología" />;
  }
  return (
    <span className={`flex items-center gap-2.5 md:gap-3 ${className}`}>
      <Lira className="h-8 w-8 shrink-0 md:h-10 md:w-10" trazo={2.4} />
      <span className="font-display text-[1.3rem] leading-[1.15] whitespace-nowrap md:text-[1.62rem]">
        Orpheus <span className="text-[0.82em] opacity-80">Psicología</span>
      </span>
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════════
   BOTONES
   ══════════════════════════════════════════════════════════════════ */

type Variante = "solid" | "outline" | "light" | "ghost-dark";

const VARIANTES: Record<Variante, string> = {
  solid: "btn-base btn-fill btn-solid",
  outline: "btn-base btn-fill btn-outline",
  light: "btn-base btn-fill btn-light",
  "ghost-dark": "btn-base btn-fill btn-ghost-dark",
};

type BotonBase = {
  children: ReactNode;
  variante?: Variante;
  className?: string;
  flecha?: boolean;
  magnetico?: boolean;
};

export function BotonEnlace({
  to,
  hash,
  children,
  variante = "solid",
  className = "",
  flecha = true,
  magnetico = true,
  onClick,
  "aria-label": ariaLabel,
}: BotonBase & {
  to: Destino;
  hash?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  "aria-label"?: string;
}) {
  const contenido = (
    <Link
      to={to}
      hash={hash}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${VARIANTES[variante]} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {flecha ? <ArrowUpRight className="size-4" strokeWidth={1.6} aria-hidden="true" /> : null}
      </span>
    </Link>
  );
  return magnetico ? <Magnetico>{contenido}</Magnetico> : contenido;
}

export function BotonExterno({
  href,
  children,
  variante = "solid",
  className = "",
  flecha = true,
  magnetico = true,
  ...rest
}: BotonBase & ComponentProps<"a">) {
  const contenido = (
    <a href={href} className={`${VARIANTES[variante]} ${className}`} {...rest}>
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {flecha ? <ArrowUpRight className="size-4" strokeWidth={1.6} aria-hidden="true" /> : null}
      </span>
    </a>
  );
  return magnetico ? <Magnetico>{contenido}</Magnetico> : contenido;
}

export function Boton({
  children,
  variante = "solid",
  className = "",
  flecha = false,
  ...rest
}: BotonBase & ComponentProps<"button">) {
  return (
    <button className={`${VARIANTES[variante]} ${className}`} {...rest}>
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {flecha ? <ArrowUpRight className="size-4" strokeWidth={1.6} aria-hidden="true" /> : null}
      </span>
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════════
   ANTETÍTULOS Y TÍTULOS DE SECCIÓN
   ══════════════════════════════════════════════════════════════════ */

export function Antetitulo({
  children,
  className = "",
  oscuro = false,
}: {
  children: ReactNode;
  className?: string;
  oscuro?: boolean;
}) {
  return (
    <p
      className={`eyebrow flex items-center gap-3 ${oscuro ? "text-on-dark" : "text-olive"} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`inline-block h-px w-7 ${oscuro ? "bg-on-dark/55" : "bg-olive/50"}`}
      />
      {children}
    </p>
  );
}

export function TituloSeccion({
  antetitulo,
  children,
  descripcion,
  oscuro = false,
  centrado = false,
  className = "",
  as = "h2",
}: {
  antetitulo?: string;
  children: ReactNode;
  descripcion?: ReactNode;
  oscuro?: boolean;
  centrado?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const H = as;
  return (
    <div className={`${centrado ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}>
      {antetitulo ? (
        <Reveal>
          <Antetitulo oscuro={oscuro} className={centrado ? "justify-center" : ""}>
            {antetitulo}
          </Antetitulo>
        </Reveal>
      ) : null}
      <Reveal delay={80}>
        <H className={`display-md mt-6 ${oscuro ? "text-on-dark" : "text-ink"}`}>{children}</H>
      </Reveal>
      {descripcion ? (
        <Reveal delay={160}>
          <div className={`lede mt-6 ${oscuro ? "text-on-dark-muted" : ""}`}>{descripcion}</div>
        </Reveal>
      ) : null}
    </div>
  );
}

/** Número editorial grande, usado como ancla visual en las secciones. */
export function Numero({
  children,
  oscuro = false,
  className = "",
}: {
  children: ReactNode;
  oscuro?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`font-display text-[2.75rem] leading-none tabular-nums md:text-[3.5rem] ${
        oscuro ? "text-on-dark/25" : "text-olive/35"
      } ${className}`}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════════
   ACORDEÓN accesible (sin dependencias)
   ══════════════════════════════════════════════════════════════════ */

export function Acordeon({
  items,
  oscuro = false,
  abiertoInicial = -1,
}: {
  items: readonly { q: string; a: string }[];
  oscuro?: boolean;
  abiertoInicial?: number;
}) {
  const [abierto, setAbierto] = useState(abiertoInicial);
  const baseId = useId();

  return (
    <div className="divide-y" style={{ borderColor: "inherit" }}>
      {items.map((item, i) => {
        const activo = abierto === i;
        const idBoton = `${baseId}-b-${i}`;
        const idPanel = `${baseId}-p-${i}`;
        return (
          <div
            key={item.q}
            className={oscuro ? "border-on-dark/15" : "border-rule"}
            style={{ borderTopWidth: i === 0 ? 1 : 0, borderBottomWidth: 1 }}
          >
            <h3>
              <button
                id={idBoton}
                type="button"
                aria-expanded={activo}
                aria-controls={idPanel}
                onClick={() => setAbierto(activo ? -1 : i)}
                className={`group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-500 ${
                  oscuro ? "text-on-dark hover:text-aloe" : "text-ink hover:text-cypress"
                }`}
              >
                <span className="font-display text-[1.15rem] leading-snug md:text-[1.4rem]">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className={`relative mt-1.5 grid size-6 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                    oscuro ? "border-on-dark/30" : "border-rule-strong"
                  } ${activo ? (oscuro ? "bg-on-dark text-moss" : "bg-moss text-bone") : ""}`}
                >
                  <span className="absolute h-px w-2.5 bg-current" />
                  <span
                    className={`absolute h-2.5 w-px bg-current transition-transform duration-500 ${
                      activo ? "scale-y-0" : "scale-y-100"
                    }`}
                  />
                </span>
              </button>
            </h3>
            <div
              id={idPanel}
              role="region"
              aria-labelledby={idBoton}
              className="grid transition-[grid-template-rows] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ gridTemplateRows: activo ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p
                  className={`max-w-2xl pb-7 text-[1.05rem] leading-relaxed font-light ${
                    oscuro ? "text-on-dark-muted" : "text-ink-muted"
                  }`}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MIGAS DE PAN
   ══════════════════════════════════════════════════════════════════ */

export function Migas({
  items,
  oscuro = false,
}: {
  items: { nombre: string; path?: Destino }[];
  oscuro?: boolean;
}) {
  return (
    <nav aria-label="Migas de pan" className="mb-8">
      <ol
        className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.7rem] tracking-[0.14em] uppercase ${
          oscuro ? "text-on-dark-faint" : "text-ink-faint"
        }`}
      >
        {items.map((item, i) => (
          <li key={item.nombre} className="flex items-center gap-2">
            {item.path ? (
              <Link to={item.path} className="link-draw transition-colors hover:text-olive">
                {item.nombre}
              </Link>
            ) : (
              <span aria-current="page">{item.nombre}</span>
            )}
            {i < items.length - 1 ? (
              <span aria-hidden="true" className="opacity-50">
                /
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ══════════════════════════════════════════════════════════════════
   FIGURA — imagen con marco, grano y proporción fija (evita CLS)
   ══════════════════════════════════════════════════════════════════ */

export function Figura({
  src,
  alt,
  ratio = "4 / 5",
  className = "",
  imgClassName = "",
  eager = false,
  width,
  height,
  sizes,
  srcSet,
  style,
}: {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  srcSet?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`photo-frame ${className}`} style={{ aspectRatio: ratio, ...style }}>
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        decoding={eager ? "sync" : "async"}
        fetchPriority={eager ? "high" : undefined}
        className={`img-cover ${imgClassName}`}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   CITA DESTACADA
   ══════════════════════════════════════════════════════════════════ */

export function Cita({
  children,
  autor,
  oscuro = false,
  className = "",
  tamano = "md",
}: {
  children: ReactNode;
  autor?: string;
  oscuro?: boolean;
  className?: string;
  tamano?: "sm" | "md" | "lg";
}) {
  // En tamaño pequeño Playfair Display pierde legibilidad, así que ahí manda
  // la serif de texto, y en redonda: la cursiva se quitó a petición de Melissa.
  const escala = {
    sm: "display-sm cita-menor",
    md: "display-md cita-menor",
    lg: "display-lg cita-menor",
  }[tamano];
  return (
    <figure className={className}>
      <blockquote className={`${escala} ${oscuro ? "text-on-dark" : "text-cypress"}`}>
        {children}
      </blockquote>
      {autor ? (
        <figcaption className={`eyebrow mt-6 ${oscuro ? "text-on-dark-faint" : "text-ink-faint"}`}>
          {autor}
        </figcaption>
      ) : null}
    </figure>
  );
}
