/**
 * HOOKS DE MOVIMIENTO
 * ------------------------------------------------------------------
 * Separados de los componentes para que el refresco rápido de Vite
 * funcione y para poder usarlos desde cualquier página.
 */

import { useEffect, useRef, useState } from "react";

/* ── ¿Movimiento reducido? ──────────────────────────────────────── */

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/* ── Observador global de revelados ─────────────────────────────── */

let observer: IntersectionObserver | null = null;

function ensureObserver() {
  if (observer || typeof window === "undefined") return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer?.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
  );
  return observer;
}

/**
 * Escanea el árbol en busca de elementos `[data-reveal]` sin revelar y los
 * observa. Se ejecuta al montar cada página y ante cambios del DOM.
 *
 * Además del IntersectionObserver hay un barrido ligado al scroll. Es
 * imprescindible: si alguien salta a un ancla o hace un scroll muy rápido, un
 * bloque puede cruzar el viewport entre dos fotogramas y el observador nunca
 * llega a notificarlo, dejando ese contenido invisible para siempre. El
 * barrido garantiza que todo lo que ya ha pasado por pantalla queda revelado.
 */
export function useRevealScanner(dep?: unknown) {
  useEffect(() => {
    const obs = ensureObserver();
    if (!obs) return;

    const pendientes = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"));

    const barrer = () => {
      const limite = window.innerHeight * 0.92;
      // Primero se leen todas las posiciones y luego se escribe, para no
      // provocar recálculos de estilo intercalados.
      const aRevelar = pendientes().filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top < limite && rect.bottom > -200;
      });
      aRevelar.forEach((el) => {
        el.classList.add("is-visible");
        obs.unobserve(el);
      });
    };

    const scan = () => {
      barrer();
      pendientes().forEach((el) => obs.observe(el));
    };

    scan();
    const raf = requestAnimationFrame(scan);

    let esperando = false;
    const alDesplazar = () => {
      if (esperando) return;
      esperando = true;
      requestAnimationFrame(() => {
        esperando = false;
        barrer();
      });
    };

    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", alDesplazar, { passive: true });
    window.addEventListener("resize", alDesplazar, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      window.removeEventListener("scroll", alDesplazar);
      window.removeEventListener("resize", alDesplazar);
    };
  }, [dep]);
}

/* ── Progreso de scroll de un elemento (0 → 1) ──────────────────── */

export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const recorrido = vh - rect.top;
      setProgreso(Math.min(1, Math.max(0, recorrido / total)));
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
  }, []);

  return { ref, progreso };
}
