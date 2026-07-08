import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/orpheus-logo.png.asset.json";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/sobre-mi", label: "Sobre mí" },
  { to: "/servicios", label: "Servicios" },
  { to: "/testimonios", label: "Testimonios" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Nav() {
  const location = useLocation();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleClick = (to: string) => (e: React.MouseEvent) => {
    if (location.pathname === to) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="container-editorial flex h-16 md:h-20 items-center justify-between">
        <Link
          to="/"
          onClick={handleClick("/")}
          className="flex items-center gap-2.5 group"
        >
          <img
            src={logoAsset.url}
            alt="Orpheus Psicología"
            className="h-8 md:h-9 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={handleClick(l.to)}
              className="text-[13px] tracking-wide text-foreground/75 hover:text-sage-deep transition-colors link-underline"
              activeProps={{ className: "text-sage-deep" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/contacto"
            onClick={handleClick("/contacto")}
            className="inline-flex items-center rounded-full bg-sage-deep px-5 py-2.5 text-[13px] text-primary-foreground hover:bg-foreground transition-colors duration-500"
          >
            Reservar sesión
          </Link>
        </div>

        <button
          className="md:hidden p-2 -mr-2 text-foreground"
          aria-label="Menú"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl animate-fade-in">
          <nav className="container-editorial flex flex-col py-6 gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={handleClick(l.to)}
                className="py-3 text-base text-foreground/80"
                activeProps={{ className: "text-sage-deep" }}
                activeOptions={{ exact: true }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contacto"
              onClick={handleClick("/contacto")}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-sage-deep px-5 py-3 text-sm text-primary-foreground"
            >
              Reservar sesión
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
