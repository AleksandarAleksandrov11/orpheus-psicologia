/**
 * ANALÍTICA CONDICIONADA AL CONSENTIMIENTO
 * ------------------------------------------------------------------
 * Vercel Web Analytics, Speed Insights y Google Tag Manager (que sirve Google
 * Analytics) solo se cargan cuando la persona ha aceptado la categoría
 * «analítica». Si la rechaza o aún no ha decidido, no se inyecta ningún script
 * de medición ni se hace ninguna petición a Google.
 *
 * Los de Vercel se sirven desde el propio dominio (/_vercel/insights/…), de
 * modo que no hay transferencia a terceros fuera de la infraestructura de
 * Vercel, que actúa como encargada del tratamiento. Google Tag Manager sí se
 * pide a googletagmanager.com, y por eso solo se hace tras el consentimiento.
 */

import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { GTM_ID } from "@/content/site";
import { leerConsentimiento, suscribirConsentimiento } from "@/lib/consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/** Las órdenes de consentimiento deben entrar al dataLayer como `arguments`, no como array. */
function gtag(..._orden: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

const ID_SCRIPT = "gtm-orpheus";

/**
 * Cada ruta pinta su propio `Layout`, así que este componente se desmonta y se
 * vuelve a montar en cada navegación. Lo que debe sobrevivir a eso (la última
 * ruta contada y el último estado de consentimiento enviado) vive aquí fuera.
 */
let rutaAnterior: string | null = null;
let almacenamiento: "granted" | "denied" | null = null;

/** Avisa a Google del estado de la analítica solo cuando cambia. */
function fijarAnalitica(valor: "granted" | "denied") {
  if (almacenamiento === valor) return;
  almacenamiento = valor;
  gtag("consent", "update", { analytics_storage: valor });
}

/**
 * Carga Google Tag Manager una sola vez. El consentimiento de las personas de
 * esta web es solo «analítica»: la publicidad queda denegada de partida, de modo
 * que ninguna etiqueta del contenedor puede usar almacenamiento publicitario.
 */
function cargarGoogleTagManager() {
  if (document.getElementById(ID_SCRIPT)) return;
  window.dataLayer = window.dataLayer || [];
  gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  almacenamiento = "granted";
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const script = document.createElement("script");
  script.id = ID_SCRIPT;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

function GoogleTagManager() {
  const ruta = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    cargarGoogleTagManager();
    fijarAnalitica("granted");
  }, []);

  // La web es una aplicación de una sola página: tras la primera carga, cada
  // cambio de ruta avisa al contenedor para que pueda contar la página vista.
  useEffect(() => {
    if (rutaAnterior === null || rutaAnterior === ruta) {
      rutaAnterior = ruta;
      return;
    }
    rutaAnterior = ruta;
    // Sin limpiar el temporizador al desmontar: el componente se vuelve a montar
    // en cada navegación y cancelarlo aquí perdería la página vista.
    window.setTimeout(() => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "spa_page_view",
        page_path: ruta,
        page_location: window.location.href,
        page_title: document.title,
      });
    }, 150);
  }, [ruta]);

  return null;
}

export function Analitica() {
  const [permitida, setPermitida] = useState(false);

  useEffect(() => {
    const sincronizar = () => {
      const estado = leerConsentimiento();
      const acepta = estado.estado === "decidido" && estado.valor.analitica;
      setPermitida(acepta);
      // Si se retira el consentimiento sin recargar, GTM sigue en la página
      // pero deja de poder medir y guardar nada.
      if (!acepta && document.getElementById(ID_SCRIPT)) fijarAnalitica("denied");
    };
    sincronizar();
    return suscribirConsentimiento(sincronizar);
  }, []);

  if (!permitida) return null;

  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />
      <GoogleTagManager />
    </>
  );
}
