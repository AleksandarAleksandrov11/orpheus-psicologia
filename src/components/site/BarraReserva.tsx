/**
 * BARRA DE RESERVA EN MÓVIL
 * ------------------------------------------------------------------
 * Melissa pidió que «Reservar primera sesión» quede siempre a un toque
 * mientras se recorre la lista de «¿Te reconoces?», que es larga y deja
 * el botón del hero muy arriba. Es una barra fija al pie, solo en móvil.
 *
 * Reglas de convivencia con el resto de capas fijas:
 *   · aparece cuando el hero ya se ha pasado;
 *   · desaparece al llegar al cierre y al pie, donde el mismo botón ya
 *     está en pantalla y la barra solo taparía contenido;
 *   · no se muestra mientras el aviso de cookies está pendiente, para no
 *     solapar dos capas fijas;
 *   · va por debajo de la cabecera y del menú (z-60 frente a z-70/75).
 */

import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CalendarCheck } from "lucide-react";

import { leerConsentimiento, suscribirConsentimiento } from "@/lib/consent";

/** Píxeles de recorrido antes de que la barra aparezca. */
const UMBRAL = 600;

/** Rutas donde sobra: la de contacto ya es el destino de la barra. */
const SIN_BARRA = ["/contacto"];

export function BarraReserva() {
  const { pathname } = useLocation();
  const [pasadoElHero, setPasadoElHero] = useState(false);
  const [alFinal, setAlFinal] = useState(false);
  const [cookiesPendientes, setCookiesPendientes] = useState(true);

  /* Aparece al dejar atrás el hero. */
  useEffect(() => {
    let pendiente = false;
    const actualizar = () => {
      pendiente = false;
      setPasadoElHero(window.scrollY > UMBRAL);
    };
    const onScroll = () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(actualizar);
    };
    actualizar();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Se retira cuando el cierre o el pie ya están en pantalla. Se vuelve a
     montar en cada ruta porque el contenido observado cambia con ella.
     Se marcan con atributo y no con `footer` a secas: cada tarjeta de reseña
     lleva su propio <footer> con el nombre y la fecha, y la barra se escondía
     nada más asomar la primera. */
  useEffect(() => {
    setAlFinal(false);
    const zonas = document.querySelectorAll("[data-fin], [data-cierre]");
    if (!zonas.length) return;
    const enPantalla = new Set<Element>();
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) enPantalla.add(e.target);
          else enPantalla.delete(e.target);
        }
        setAlFinal(enPantalla.size > 0);
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    zonas.forEach((z) => obs.observe(z));
    return () => obs.disconnect();
  }, [pathname]);

  /* Nunca compite con el aviso de cookies. */
  useEffect(() => {
    const mirar = () => setCookiesPendientes(leerConsentimiento().estado === "pendiente");
    mirar();
    return suscribirConsentimiento(mirar);
  }, []);

  const mostrar = pasadoElHero && !alFinal && !cookiesPendientes && !SIN_BARRA.includes(pathname);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[60] px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
        mostrar ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
      aria-hidden={!mostrar}
    >
      <div className="rounded-full border border-moss/15 bg-bone/92 p-1.5 shadow-[0_-8px_30px_-14px_rgba(44,52,36,0.45)] backdrop-blur-xl">
        <Link
          to="/contacto"
          tabIndex={mostrar ? undefined : -1}
          className="btn-base btn-fill btn-solid w-full justify-center py-3.5 text-[0.7rem]"
        >
          <span className="relative z-10 flex items-center gap-2.5">
            <CalendarCheck className="size-4" strokeWidth={1.6} aria-hidden="true" />
            Reservar primera sesión
          </span>
        </Link>
      </div>
    </div>
  );
}
