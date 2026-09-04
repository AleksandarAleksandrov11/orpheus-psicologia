import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { NAV, SITE } from "@/content/site";
import { Marca } from "./ui";

export function Nav() {
  const { pathname } = useLocation();
  const [compacta, setCompacta] = useState(false);
  const [oculta, setOculta] = useState(false);
  const [menu, setMenu] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const ultimoY = useRef(0);
  const botonMenu = useRef<HTMLButtonElement>(null);

  /* Barra reactiva: se compacta al bajar y se esconde al seguir bajando. */
  useEffect(() => {
    let ticking = false;
    const actualizar = () => {
      ticking = false;
      const y = window.scrollY;
      const alto = document.documentElement.scrollHeight - window.innerHeight;
      setProgreso(alto > 0 ? Math.min(1, y / alto) : 0);
      setCompacta(y > 24);
      setOculta(y > 260 && y > ultimoY.current + 4);
      ultimoY.current = y;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(actualizar);
      }
    };
    actualizar();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* El menú se cierra al navegar y bloquea el scroll mientras está abierto. */
  useEffect(() => {
    setMenu(false);
  }, [pathname]);

  useEffect(() => {
    if (!menu) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        botonMenu.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previo;
      window.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  const alInicio = (to: string) => (e: React.MouseEvent) => {
    if (pathname === to) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMenu(false);
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-[transform,background-color,border-color,backdrop-filter] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          oculta && !menu ? "-translate-y-full" : "translate-y-0"
        } ${
          compacta && !menu
            ? "border-b border-rule/70 bg-bone/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-[var(--nav-h)] items-center justify-between gap-6 md:h-20">
          <Link
            to="/"
            onClick={alInicio("/")}
            aria-label={`${SITE.name} — ir al inicio`}
            className="group text-ink transition-opacity duration-500 hover:opacity-70"
          >
            <Marca />
          </Link>

          <nav aria-label="Navegación principal" className="hidden items-center gap-8 lg:flex">
            {NAV.slice(1, -1).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={alInicio(l.to)}
                className="link-draw text-[0.8rem] font-light tracking-[0.06em] text-ink/80 transition-colors duration-400 hover:text-cypress"
                activeProps={{ className: "text-cypress" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contacto"
              onClick={alInicio("/contacto")}
              className="btn-base btn-fill btn-solid hidden px-6 py-3 text-[0.68rem] sm:inline-flex"
            >
              <span className="relative z-10">Reservar sesión</span>
            </Link>

            <button
              ref={botonMenu}
              type="button"
              onClick={() => setMenu((v) => !v)}
              aria-expanded={menu}
              aria-controls="menu-movil"
              aria-label={menu ? "Cerrar menú" : "Abrir menú"}
              className="relative z-[80] -mr-1.5 grid size-11 place-items-center rounded-full transition-colors duration-400 hover:bg-paper lg:hidden"
            >
              <span className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 block h-px w-6 bg-current transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    menu ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-6 bg-current transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    menu ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Progreso de lectura */}
        <div
          aria-hidden="true"
          className={`h-px origin-left bg-cypress/70 transition-opacity duration-500 ${
            compacta ? "opacity-100" : "opacity-0"
          }`}
          style={{ transform: `scaleX(${progreso})` }}
        />
      </header>

      {/* Menú a pantalla completa */}
      <div
        id="menu-movil"
        hidden={!menu}
        className="fixed inset-0 z-[75] lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        <div className="aurora-deep grain-dark absolute inset-0" aria-hidden="true" />
        <div className="on-dark relative z-10 flex h-full flex-col justify-between overflow-y-auto px-6 pt-24 pb-10">
          <nav aria-label="Navegación móvil">
            <ul className="space-y-1">
              {NAV.map((l, i) => (
                <li key={l.to} className="overflow-hidden">
                  <Link
                    to={l.to}
                    onClick={alInicio(l.to)}
                    className="group block border-b border-on-dark/12 py-4"
                    style={{
                      animation: menu
                        ? `orpheus-clip-up 0.85s cubic-bezier(0.22,1,0.36,1) ${120 + i * 65}ms both`
                        : undefined,
                    }}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="eyebrow w-6 shrink-0 text-on-dark-faint">0{i + 1}</span>
                      <span className="flex-1">
                        <span className="display-sm block text-on-dark">{l.label}</span>
                        {"descripcion" in l && l.descripcion ? (
                          <span className="mt-1 block text-[0.78rem] font-light text-on-dark-muted">
                            {l.descripcion}
                          </span>
                        ) : null}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className="mt-10"
            style={{
              animation: menu
                ? "orpheus-fade 0.9s cubic-bezier(0.4,0,0.2,1) 520ms both"
                : undefined,
            }}
          >
            <Link
              to="/contacto"
              className="btn-base btn-fill btn-light w-full"
              onClick={alInicio("/contacto")}
            >
              <span className="relative z-10">Reservar primera sesión</span>
            </Link>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.75rem] font-light text-on-dark-muted">
              <a href={`mailto:${SITE.contacto.email}`} className="link-undraw">
                {SITE.contacto.email}
              </a>
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="link-undraw"
              >
                {SITE.social.instagramHandle}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
