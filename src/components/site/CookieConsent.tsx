/**
 * AVISO DE COOKIES
 * ------------------------------------------------------------------
 * Banner de consentimiento previo + panel de configuración granular.
 * «Aceptar» y «Rechazar» tienen idéntica jerarquía visual, tal y como
 * exige la Guía de cookies de la AEPD (sin patrones oscuros).
 */

import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import {
  EVENTO_ABRIR_PREFERENCIAS,
  guardarConsentimiento,
  leerConsentimiento,
  borrarCookiesDeTerceros,
  suscribirConsentimiento,
} from "@/lib/consent";
import { Lira } from "./ui";

type Vista = "oculto" | "banner" | "panel";

export function CookieConsent() {
  const [vista, setVista] = useState<Vista>("oculto");
  // Arranca desactivada: la AEPD prohíbe las casillas premarcadas.
  const [analitica, setAnalitica] = useState(false);
  const [montado, setMontado] = useState(false);

  // Solo se decide en cliente: el HTML servido nunca contiene el aviso,
  // así no aparece en el SSR ni penaliza el LCP.
  useEffect(() => {
    setMontado(true);
    const estado = leerConsentimiento();
    if (estado.estado === "pendiente") {
      const t = setTimeout(() => setVista("banner"), 900);
      return () => clearTimeout(t);
    }
    setAnalitica(estado.valor.analitica);
  }, []);

  useEffect(() => {
    const abrir = () => {
      const estado = leerConsentimiento();
      setAnalitica(estado.estado === "decidido" ? estado.valor.analitica : false);
      setVista("panel");
    };
    window.addEventListener(EVENTO_ABRIR_PREFERENCIAS, abrir);
    return () => window.removeEventListener(EVENTO_ABRIR_PREFERENCIAS, abrir);
  }, []);

  useEffect(
    () =>
      suscribirConsentimiento(() => {
        const estado = leerConsentimiento();
        if (estado.estado === "pendiente") setVista("banner");
      }),
    [],
  );

  const decidir = useCallback((valorAnalitica: boolean) => {
    guardarConsentimiento(valorAnalitica);
    if (!valorAnalitica) borrarCookiesDeTerceros();
    setAnalitica(valorAnalitica);
    setVista("oculto");
  }, []);

  // Cierra el panel con Escape (equivale a no cambiar nada).
  useEffect(() => {
    if (vista !== "panel") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const estado = leerConsentimiento();
        setVista(estado.estado === "pendiente" ? "banner" : "oculto");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [vista]);

  if (!montado || vista === "oculto") return null;

  if (vista === "panel") {
    return (
      <div
        className="fixed inset-0 z-[90] flex items-end justify-center p-3 sm:items-center sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookies-panel-titulo"
      >
        <div
          className="absolute inset-0 bg-moss/45 backdrop-blur-[3px]"
          onClick={() => {
            const estado = leerConsentimiento();
            setVista(estado.estado === "pendiente" ? "banner" : "oculto");
          }}
          aria-hidden="true"
        />
        <div className="anim-fade-up relative w-full max-w-xl overflow-hidden rounded-2xl border border-rule bg-linen shadow-[0_40px_120px_-40px_rgba(44,52,36,0.55)]">
          <div className="grain absolute inset-0" aria-hidden="true" />
          <div className="relative z-10 p-6 sm:p-9">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Lira className="h-7 w-7 text-cypress" trazo={2.6} />
                <h2 id="cookies-panel-titulo" className="display-sm">
                  Preferencias de cookies
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  const estado = leerConsentimiento();
                  setVista(estado.estado === "pendiente" ? "banner" : "oculto");
                }}
                aria-label="Cerrar preferencias de cookies"
                className="-mr-1.5 -mt-1.5 rounded-full p-2 text-ink-faint transition-colors hover:bg-paper hover:text-ink"
              >
                <X className="size-4" />
              </button>
            </div>

            <p className="prose-body mt-5 text-[0.95rem]">
              Elige qué se puede utilizar mientras navegas. Puedes cambiar esta decisión cuando
              quieras desde el enlace «Preferencias de cookies» del pie de página.
            </p>

            <div className="mt-7 space-y-4">
              <Categoria
                titulo="Estrictamente necesarias"
                descripcion="Permiten que la web funcione y recuerdan tu elección sobre cookies. No se pueden desactivar."
                obligatoria
              />
              <Categoria
                titulo="Analítica y rendimiento"
                descripcion="Vercel Analytics y Speed Insights: métricas agregadas y anónimas de visitas y velocidad de carga. No crean perfiles ni identifican a personas."
                activa={analitica}
                onChange={setAnalitica}
              />
            </div>

            {/* «Aceptar» y «rechazar» comparten fila e idéntica jerarquía visual;
                guardar la selección propia ocupa una fila propia debajo. */}
            <div className="mt-8 space-y-2.5">
              <div className="grid gap-2.5 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => decidir(true)}
                  className="btn-base btn-fill btn-outline w-full px-4"
                >
                  <span className="relative z-10">Aceptar todas</span>
                </button>
                <button
                  type="button"
                  onClick={() => decidir(false)}
                  className="btn-base btn-fill btn-outline w-full px-4"
                >
                  <span className="relative z-10">Rechazar todas</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => decidir(analitica)}
                className="btn-base btn-fill btn-solid w-full px-4"
              >
                <span className="relative z-10">Guardar mi selección</span>
              </button>
            </div>

            <p className="mt-6 text-[0.72rem] leading-relaxed text-ink-faint">
              Más información en la{" "}
              <Link to="/politica-de-cookies" className="link-undraw text-cypress">
                política de cookies
              </Link>{" "}
              y en la{" "}
              <Link to="/politica-de-privacidad" className="link-undraw text-cypress">
                política de privacidad
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="anim-fade-up fixed inset-x-0 bottom-0 z-[90] p-3 sm:p-5"
      role="region"
      aria-label="Aviso de cookies"
    >
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-rule bg-linen shadow-[0_30px_90px_-35px_rgba(44,52,36,0.5)]">
        <div className="grain absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 flex flex-col gap-5 p-5 sm:p-7 lg:flex-row lg:items-center lg:gap-8">
          <div className="flex-1">
            <p className="eyebrow flex items-center gap-2.5 text-olive">
              <Cookie className="size-3.5" strokeWidth={1.6} aria-hidden="true" />
              Aviso de cookies
            </p>
            <p className="prose-body mt-3 text-[0.875rem] sm:text-[0.95rem]">
              Uso cookies propias necesarias para que la web funcione y, solo si lo aceptas,
              analítica anónima para saber qué contenidos resultan útiles. Ninguna cookie sirve para
              crear perfiles publicitarios.{" "}
              <Link to="/politica-de-cookies" className="link-undraw text-cypress">
                Leer la política de cookies
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row lg:shrink-0">
            <button
              type="button"
              onClick={() => decidir(true)}
              className="btn-base btn-fill btn-solid px-6 py-3.5 text-[0.72rem]"
            >
              <span className="relative z-10">Aceptar</span>
            </button>
            <button
              type="button"
              onClick={() => decidir(false)}
              className="btn-base btn-fill btn-outline px-6 py-3.5 text-[0.72rem]"
            >
              <span className="relative z-10">Rechazar</span>
            </button>
            <button
              type="button"
              onClick={() => setVista("panel")}
              className="btn-base px-6 py-3.5 text-[0.72rem] text-ink-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              <span className="relative z-10">Configurar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Categoria({
  titulo,
  descripcion,
  activa,
  obligatoria = false,
  onChange,
}: {
  titulo: string;
  descripcion: string;
  activa?: boolean;
  obligatoria?: boolean;
  onChange?: (v: boolean) => void;
}) {
  const encendida = obligatoria || Boolean(activa);
  return (
    <div className="flex items-start justify-between gap-5 rounded-xl border border-rule bg-bone/70 p-4">
      <div>
        <h3 className="font-sans text-[0.8rem] font-medium tracking-wide text-ink uppercase">
          {titulo}
        </h3>
        <p className="mt-1.5 text-[0.8rem] leading-relaxed font-light text-ink-muted">
          {descripcion}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={encendida}
        aria-label={`${titulo}: ${encendida ? "activadas" : "desactivadas"}`}
        disabled={obligatoria}
        onClick={() => onChange?.(!encendida)}
        className={`relative mt-1 h-6 w-11 shrink-0 rounded-full transition-colors duration-400 ${
          encendida ? "bg-cypress" : "bg-cedar/50"
        } ${obligatoria ? "cursor-not-allowed opacity-55" : "cursor-pointer"}`}
      >
        <span
          className={`absolute top-1 size-4 rounded-full bg-bone transition-all duration-400 ${
            encendida ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}
