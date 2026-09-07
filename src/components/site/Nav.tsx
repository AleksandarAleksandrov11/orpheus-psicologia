import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { NAV, SITE, type NavLink } from "@/content/site";
import { Marca } from "./ui";

export function Nav() {
  const { pathname } = useLocation();
  const [compacta, setCompacta] = useState(false);
  const [menu, setMenu] = useState(false);
  const [abierto, setAbierto] = useState<string | null>(null);
  const [progreso, setProgreso] = useState(0);
  const botonMenu = useRef<HTMLButtonElement>(null);
  const cierre = useRef<number | null>(null);

  /* La barra permanece siempre visible; al bajar solo gana fondo y filete. */
  useEffect(() => {
    let ticking = false;
    const actualizar = () => {
      ticking = false;
      const y = window.scrollY;
      const alto = document.documentElement.scrollHeight - window.innerHeight;
      setProgreso(alto > 0 ? Math.min(1, y / alto) : 0);
      setCompacta(y > 24);
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

  /* Los menús se cierran al navegar y el móvil bloquea el scroll de fondo. */
  useEffect(() => {
    setMenu(false);
    setAbierto(null);
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

  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [abierto]);

  useEffect(
    () => () => {
      if (cierre.current) window.clearTimeout(cierre.current);
    },
    [],
  );

  const alInicio = (to: string) => (e: React.MouseEvent) => {
    if (pathname === to) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMenu(false);
      setAbierto(null);
    }
  };

  /* Pequeño margen antes de cerrar: el puntero puede pasar por el hueco. */
  const abrir = (clave: string) => {
    if (cierre.current) window.clearTimeout(cierre.current);
    setAbierto(clave);
  };
  const cerrarConMargen = () => {
    if (cierre.current) window.clearTimeout(cierre.current);
    cierre.current = window.setTimeout(() => setAbierto(null), 160);
  };

  const enlacesEscritorio = NAV.slice(0, -1);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-[background-color,border-color,backdrop-filter] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          compacta && !menu
            ? "border-b border-rule/70 bg-bone/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-[var(--nav-h)] items-center justify-between gap-6 md:h-20">
          {/* Sobre el menú a pantalla completa la marca sigue visible, en claro. */}
          <Link
            to="/"
            onClick={alInicio("/")}
            aria-label={`Ir al inicio de ${SITE.name}`}
            className={`group relative z-[80] transition-opacity duration-500 hover:opacity-70 ${
              menu ? "text-on-dark" : "text-ink"
            }`}
          >
            <Marca />
          </Link>

          <nav aria-label="Navegación principal" className="hidden items-center gap-7 lg:flex">
            {enlacesEscritorio.map((l) =>
              "hijos" in l ? (
                <div
                  key={l.to}
                  className="relative"
                  onMouseEnter={() => abrir(l.to)}
                  onMouseLeave={cerrarConMargen}
                >
                  <Link
                    to={l.to}
                    onClick={alInicio(l.to)}
                    onFocus={() => abrir(l.to)}
                    aria-expanded={abierto === l.to}
                    className="link-draw flex items-center gap-1.5 py-2 text-[0.84rem] font-light tracking-[0.06em] text-ink/80 transition-colors duration-400 hover:text-cypress"
                    activeProps={{ className: "text-cypress" }}
                  >
                    {l.label}
                    <ChevronDown
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className={`size-3.5 transition-transform duration-400 ${
                        abierto === l.to ? "rotate-180" : ""
                      }`}
                    />
                  </Link>

                  <div
                    hidden={abierto !== l.to}
                    className="absolute top-full left-1/2 z-10 w-[19rem] -translate-x-1/2 pt-3"
                  >
                    <ul className="anim-fade overflow-hidden rounded-2xl border border-rule bg-bone p-2 shadow-[0_20px_55px_-28px_rgba(44,52,36,0.55)]">
                      {(l.hijos as readonly NavLink[]).map((h) => (
                        <li key={h.to}>
                          <Link
                            to={h.to}
                            onClick={alInicio(h.to)}
                            className="group block rounded-xl px-4 py-3 transition-colors duration-400 hover:bg-linen"
                            activeProps={{ className: "bg-linen" }}
                          >
                            <span className="block text-[1.02rem] text-ink transition-colors duration-400 group-hover:text-cypress">
                              {h.label}
                            </span>
                            {h.descripcion ? (
                              <span className="mt-1 block text-[0.89rem] leading-snug font-light text-ink-faint">
                                {h.descripcion}
                              </span>
                            ) : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={alInicio(l.to)}
                  onMouseEnter={cerrarConMargen}
                  className="link-draw py-2 text-[0.84rem] font-light tracking-[0.06em] text-ink/80 transition-colors duration-400 hover:text-cypress"
                  activeProps={{ className: "text-cypress" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              ),
            )}
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
                        ? `orpheus-clip-up 0.85s cubic-bezier(0.22,1,0.36,1) ${120 + i * 55}ms both`
                        : undefined,
                    }}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="eyebrow w-6 shrink-0 text-on-dark-faint">0{i + 1}</span>
                      <span className="flex-1">
                        <span className="display-sm block text-on-dark">{l.label}</span>
                        {l.descripcion ? (
                          <span className="mt-1 block text-[0.93rem] font-light text-on-dark-muted">
                            {l.descripcion}
                          </span>
                        ) : null}
                      </span>
                    </span>
                  </Link>

                  {"hijos" in l ? (
                    <ul
                      className="mb-1 flex flex-wrap gap-x-5 gap-y-2 border-b border-on-dark/12 py-3 pl-10"
                      style={{
                        animation: menu
                          ? `orpheus-fade 0.9s cubic-bezier(0.4,0,0.2,1) ${220 + i * 55}ms both`
                          : undefined,
                      }}
                    >
                      {(l.hijos as readonly NavLink[])
                        .filter((h) => h.to !== l.to)
                        .map((h) => (
                          <li key={h.to}>
                            <Link
                              to={h.to}
                              onClick={alInicio(h.to)}
                              className="link-undraw text-[0.99rem] font-light text-on-dark-muted"
                            >
                              {h.label}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  ) : null}
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
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.89rem] font-light text-on-dark-muted">
              <a href={`mailto:${SITE.contacto.email}`} className="link-undraw">
                {SITE.contacto.email}
              </a>
              <a href={`tel:${SITE.contacto.telefonoHref}`} className="link-undraw">
                {SITE.contacto.telefono}
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
