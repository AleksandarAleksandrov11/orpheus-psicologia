/**
 * PRIMITIVAS DE MOVIMIENTO
 * ------------------------------------------------------------------
 * Animaciones ligeras basadas en IntersectionObserver y transformaciones
 * CSS. No hay librería de animación: todo pesa ~3 KB y respeta
 * `prefers-reduced-motion`.
 *
 * El contenido se oculta únicamente cuando el documento tiene la clase
 * `js` (la añade un script en línea del shell), de forma que sin
 * JavaScript —y para los rastreadores— el texto siempre es visible.
 */

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

import { useReducedMotion } from "@/lib/motion";

export type RevealVariant =
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale"
  | "blur"
  | "curtain"
  | "mask";

/* ── <Reveal> ───────────────────────────────────────────────────── */

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  variant?: RevealVariant;
  /** Retardo en milisegundos. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
} & Record<string, unknown>;

export function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className,
  style,
  ...rest
}: RevealProps) {
  const Component = Tag as ElementType;
  return (
    <Component
      data-reveal={variant}
      className={className}
      style={{
        ...(delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : null),
        ...style,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}

/* ── Titular con entrada línea a línea ──────────────────────────── */

export function LineasReveladas({
  lineas,
  className = "",
  lineaClassName = "",
  cursiva,
  delay = 0,
  as: Tag = "h1",
}: {
  lineas: readonly string[];
  className?: string;
  lineaClassName?: string;
  /** Primera línea que va en cursiva; de ahí en adelante también. */
  cursiva?: number;
  delay?: number;
  as?: ElementType;
}) {
  const Component = Tag as ElementType;
  return (
    <Component className={className}>
      {lineas.map((linea, i) => (
        <span key={linea + i} className={`clip-line ${lineaClassName}`}>
          <span
            style={{ animationDelay: `${delay + i * 110}ms` }}
            className={cursiva !== undefined && i >= cursiva ? "italic" : undefined}
          >
            {linea}
          </span>
        </span>
      ))}
    </Component>
  );
}

/* ── Paralaje vertical ligero ───────────────────────────────────── */

export function Parallax({
  children,
  /** Píxeles de desplazamiento total a lo largo del viewport. */
  amount = 60,
  className,
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -200 || rect.top > vh + 200) return;
      // -1 (abajo del viewport) → 1 (arriba del viewport)
      const progreso = (vh / 2 - (rect.top + rect.height / 2)) / (vh / 2 + rect.height / 2);
      el.style.transform = `translate3d(0, ${(progreso * amount).toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [amount, reduced]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

/* ── Botón magnético ────────────────────────────────────────────── */

export function Magnetico({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    };
    const onLeave = () => {
      el.style.transform = "translate3d(0,0,0)";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength, reduced]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: "inline-block", transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1)" }}
    >
      {children}
    </span>
  );
}

/* ── Marquesina infinita ────────────────────────────────────────── */

export function Marquesina({
  items,
  separador = "·",
  className = "",
  duracion = 46,
}: {
  items: readonly string[];
  separador?: string;
  className?: string;
  duracion?: number;
}) {
  const secuencia = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div className="marquee-track" style={{ animationDuration: `${duracion}s` }}>
        {secuencia.map((item, i) => (
          <span key={`${item}-${i}`} className="flex shrink-0 items-center">
            <span className="whitespace-nowrap">{item}</span>
            <span className="mx-6 opacity-40 md:mx-10" aria-hidden="true">
              {separador}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Contador animado ───────────────────────────────────────────── */

export function Contador({
  hasta,
  duracion = 1600,
  sufijo = "",
  className,
}: {
  hasta: number;
  duracion?: number;
  sufijo?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [valor, setValor] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setValor(hasta);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        const inicio = performance.now();
        const paso = (t: number) => {
          const p = Math.min(1, (t - inicio) / duracion);
          const eased = 1 - Math.pow(1 - p, 3);
          setValor(Math.round(eased * hasta));
          if (p < 1) raf = requestAnimationFrame(paso);
        };
        raf = requestAnimationFrame(paso);
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [hasta, duracion, reduced]);

  return (
    <span ref={ref} className={className}>
      {valor}
      {sufijo}
    </span>
  );
}
