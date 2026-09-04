import { useLocation } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { CookieConsent } from "./CookieConsent";
import { Analitica } from "./Analytics";
import { useRevealScanner } from "@/lib/motion";

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  useRevealScanner(pathname);

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
      <CookieConsent />
      <Analitica />
    </div>
  );
}
