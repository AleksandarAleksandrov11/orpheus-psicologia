/**
 * GESTIÓN DEL CONSENTIMIENTO DE COOKIES
 * ------------------------------------------------------------------
 * Modelo de consentimiento previo, granular y revocable, conforme al
 * art. 22.2 LSSI-CE y a la Guía sobre el uso de cookies de la AEPD:
 *
 *  · Nada que no sea estrictamente necesario se carga antes de que la
 *    persona decida (`estado === "pendiente"` bloquea la analítica).
 *  · «Aceptar» y «Rechazar» tienen el mismo peso visual y el mismo
 *    número de clics.
 *  · La decisión se puede cambiar en cualquier momento desde el pie.
 *  · El consentimiento caduca a los 24 meses y se vuelve a solicitar.
 *
 * La preferencia se guarda en localStorage, que es almacenamiento
 * estrictamente necesario para recordar la propia elección.
 */

export const CLAVE_CONSENTIMIENTO = "orpheus.consentimiento.v1";
export const EVENTO_CONSENTIMIENTO = "orpheus:consentimiento";
/** Caducidad del consentimiento: 24 meses (recomendación AEPD). */
export const CADUCIDAD_MS = 24 * 30 * 24 * 60 * 60 * 1000;

export type Consentimiento = {
  /** Versión del esquema, para poder re-preguntar si cambian las cookies. */
  v: 1;
  /** Marca de tiempo en milisegundos. */
  ts: number;
  /** Cookies analíticas y de medición de rendimiento. */
  analitica: boolean;
};

export type EstadoConsentimiento =
  | { estado: "pendiente" }
  | { estado: "decidido"; valor: Consentimiento };

const hayVentana = () => typeof window !== "undefined";

export function leerConsentimiento(): EstadoConsentimiento {
  if (!hayVentana()) return { estado: "pendiente" };
  try {
    const bruto = window.localStorage.getItem(CLAVE_CONSENTIMIENTO);
    if (!bruto) return { estado: "pendiente" };
    const valor = JSON.parse(bruto) as Consentimiento;
    if (valor?.v !== 1 || typeof valor.analitica !== "boolean") return { estado: "pendiente" };
    if (!Number.isFinite(valor.ts) || Date.now() - valor.ts > CADUCIDAD_MS) {
      return { estado: "pendiente" };
    }
    return { estado: "decidido", valor };
  } catch {
    // Modo privado, almacenamiento bloqueado o JSON corrupto.
    return { estado: "pendiente" };
  }
}

export function guardarConsentimiento(analitica: boolean): Consentimiento {
  const valor: Consentimiento = { v: 1, ts: Date.now(), analitica };
  if (hayVentana()) {
    try {
      window.localStorage.setItem(CLAVE_CONSENTIMIENTO, JSON.stringify(valor));
    } catch {
      /* Si el almacenamiento está bloqueado, la decisión solo dura la sesión. */
    }
    window.dispatchEvent(new CustomEvent(EVENTO_CONSENTIMIENTO, { detail: valor }));
  }
  return valor;
}

/** Retira el consentimiento y vuelve a mostrar el aviso. */
export function revocarConsentimiento() {
  if (!hayVentana()) return;
  try {
    window.localStorage.removeItem(CLAVE_CONSENTIMIENTO);
  } catch {
    /* noop */
  }
  borrarCookiesDeTerceros();
  window.dispatchEvent(new CustomEvent(EVENTO_CONSENTIMIENTO, { detail: null }));
}

/**
 * Elimina las cookies que no son estrictamente necesarias.
 * Vercel Analytics no usa cookies, pero si en el futuro se añade otra
 * herramienta basta con listar aquí sus prefijos.
 */
const PREFIJOS_NO_NECESARIOS = ["_va", "_vercel_insights", "_ga", "_gid", "_gat", "_fbp"];

export function borrarCookiesDeTerceros() {
  if (!hayVentana() || typeof document === "undefined") return;
  const host = window.location.hostname;
  const dominios = [host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  document.cookie.split(";").forEach((par) => {
    const nombre = par.split("=")[0]?.trim();
    if (!nombre) return;
    if (!PREFIJOS_NO_NECESARIOS.some((p) => nombre.startsWith(p))) return;
    dominios.forEach((d) => {
      document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${d}`;
    });
    document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  });
}

/** Se suscribe a los cambios de consentimiento. Devuelve la función de baja. */
export function suscribirConsentimiento(cb: () => void): () => void {
  if (!hayVentana()) return () => {};
  const manejar = () => cb();
  window.addEventListener(EVENTO_CONSENTIMIENTO, manejar);
  window.addEventListener("storage", manejar);
  return () => {
    window.removeEventListener(EVENTO_CONSENTIMIENTO, manejar);
    window.removeEventListener("storage", manejar);
  };
}

/** Abre el panel de preferencias desde cualquier punto del sitio. */
export const EVENTO_ABRIR_PREFERENCIAS = "orpheus:preferencias-cookies";

export function abrirPreferenciasCookies() {
  if (!hayVentana()) return;
  window.dispatchEvent(new CustomEvent(EVENTO_ABRIR_PREFERENCIAS));
}
