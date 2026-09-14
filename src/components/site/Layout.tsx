import { useLocation } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { CookieConsent } from "./CookieConsent";
import { BarraReserva } from "./BarraReserva";
import { Analitica } from "./Analytics";
import { useRevealScanner } from "@/lib/motion";

export function Layout({ children }: { children: ReactNode }) {
  const { pathname, hash } = useLocation();
  const rutaPrevia = useRef<string | null>(null);
  useRevealScanner(pathname);

  /**
   * Cada página nueva se abre arriba del todo. Sin esto, el navegador
   * conserva la posición anterior y la página aparece a media altura.
   * Se salta cuando la URL trae un ancla, para no romper los enlaces
   * internos del tipo /servicios#empresas.
   */
  useEffect(() => {
    const cambioDeRuta = rutaPrevia.current !== null && rutaPrevia.current !== pathname;
    rutaPrevia.current = pathname;
    if (!cambioDeRuta || hash) return;

    // `instant` evita que el desplazamiento suave del sitio lo anime.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  // Cada cambio de ruta anuncia la página nueva a los lectores de pantalla.
  useEffect(() => {
    const t = setTimeout(() => {
      const h1 = document.querySelector("main h1");
      if (h1 instanceof HTMLElement) {
        h1.setAttribute("tabindex", "-1");
      }
    }, 60);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div className="relative flex min-h-screen flex-col bg-bone text-ink">
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <Nav />
      <main id="contenido" className="flex-1">
        {children}
      </main>
      <Footer />
      <BarraReserva />
      <CookieConsent />
      <Analitica />
    </div>
  );
}
