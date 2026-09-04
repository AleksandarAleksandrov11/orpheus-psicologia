import { Link } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";
import { LEGAL_NAV, NAV, SITE, esPendiente } from "@/content/site";
import { abrirPreferenciasCookies } from "@/lib/consent";
import { Lira } from "./ui";
import { Reveal } from "./motion";

export function Footer() {
  const anio = new Date().getFullYear();
  const colegiadaPendiente = esPendiente(SITE.psicologa.colegiada);

  return (
    <footer className="aurora-deep grain-dark on-dark relative overflow-hidden text-on-dark">
      {/* Cierre editorial */}
      <div className="relative z-10 shell border-b border-on-dark/12 py-16 md:py-24">
        <Reveal className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <p className="display-md max-w-2xl text-on-dark">
            Cuando quieras empezar a <em className="italic">comprenderlo</em>, aquí estaré.
          </p>
          <Link to="/contacto" className="btn-base btn-fill btn-light shrink-0">
            <span className="relative z-10">Escríbeme</span>
          </Link>
        </Reveal>
      </div>

      <div className="relative z-10 shell grid gap-12 py-16 md:grid-cols-12 md:py-20">
        {/* Marca */}
        <div className="md:col-span-5">
          <Link
            to="/"
            aria-label={`${SITE.name} — inicio`}
            className="inline-flex items-center gap-3"
          >
            <Lira className="h-9 w-9 text-on-dark" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-2xl text-on-dark">Orpheus</span>
              <span className="eyebrow mt-1.5 text-[0.55rem] text-on-dark-faint">Psicología</span>
            </span>
          </Link>
          <p className="mt-6 max-w-xs text-[0.85rem] leading-relaxed font-light text-on-dark-muted">
            Descender para poder elevarse. Una psicología para comprender lo que te pasa,
            transformar aquello que te limita y construir una relación más amable contigo.
          </p>
          <p className="mt-6 text-[0.78rem] font-light text-on-dark-faint">
            {SITE.psicologa.nombre} · {SITE.psicologa.titulo}
            {colegiadaPendiente ? null : (
              <>
                <br />
                Colegiada n.º {SITE.psicologa.colegiada} · {SITE.psicologa.colegio}
              </>
            )}
          </p>
        </div>

        {/* Navegación */}
        <nav className="md:col-span-3" aria-label="Mapa del sitio">
          <h2 className="eyebrow text-on-dark-faint">Navegación</h2>
          <ul className="mt-6 space-y-3">
            {NAV.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="link-draw text-[0.9rem] font-light text-on-dark-muted transition-colors duration-400 hover:text-on-dark"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contacto */}
        <div className="md:col-span-4">
          <h2 className="eyebrow text-on-dark-faint">Contacto</h2>
          <ul className="mt-6 space-y-3.5 text-[0.9rem] font-light text-on-dark-muted">
            <li>
              <a
                href={`mailto:${SITE.contacto.email}`}
                className="link-draw inline-flex items-center gap-2.5 transition-colors duration-400 hover:text-on-dark"
              >
                <Mail className="size-4 shrink-0" strokeWidth={1.4} aria-hidden="true" />
                {SITE.contacto.email}
              </a>
            </li>
            <li>
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw inline-flex items-center gap-2.5 transition-colors duration-400 hover:text-on-dark"
              >
                <Instagram className="size-4 shrink-0" strokeWidth={1.4} aria-hidden="true" />
                {SITE.social.instagramHandle}
              </a>
            </li>
          </ul>
          <p className="mt-6 text-[0.78rem] leading-relaxed font-light text-on-dark-faint">
            {SITE.modalidades.join(" · ")}
            <br />
            {SITE.contacto.horario}
          </p>
        </div>
      </div>

      {/* Legal */}
      <div className="relative z-10 border-t border-on-dark/12">
        <div className="shell flex flex-col gap-4 py-7 text-[0.72rem] font-light text-on-dark-faint md:flex-row md:items-center md:justify-between">
          <p>
            © {anio} {SITE.psicologa.nombre} · {SITE.name}
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {LEGAL_NAV.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="link-draw transition-colors duration-400 hover:text-on-dark"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={abrirPreferenciasCookies}
                className="link-draw transition-colors duration-400 hover:text-on-dark"
              >
                Preferencias de cookies
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Lira gigante de fondo */}
      <Lira
        className="pointer-events-none absolute -right-16 -bottom-24 h-72 w-72 text-on-dark/[0.05] md:h-[26rem] md:w-[26rem]"
        strokeWidth={6}
      />
    </footer>
  );
}
