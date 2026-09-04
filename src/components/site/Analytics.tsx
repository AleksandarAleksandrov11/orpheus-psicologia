/**
 * ANALÍTICA CONDICIONADA AL CONSENTIMIENTO
 * ------------------------------------------------------------------
 * Vercel Web Analytics y Speed Insights solo se cargan cuando la
 * persona ha aceptado la categoría «analítica». Si la rechaza o aún no
 * ha decidido, no se inyecta ningún script de medición.
 *
 * Los scripts se sirven desde el propio dominio (/_vercel/insights/…),
 * de modo que no hay transferencia a terceros fuera de la infraestructura
 * de Vercel, que actúa como encargada del tratamiento.
 */

import { useEffect, useState } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { leerConsentimiento, suscribirConsentimiento } from "@/lib/consent";

export function Analitica() {
  const [permitida, setPermitida] = useState(false);

  useEffect(() => {
    const sincronizar = () => {
      const estado = leerConsentimiento();
      setPermitida(estado.estado === "decidido" && estado.valor.analitica);
    };
    sincronizar();
    return suscribirConsentimiento(sincronizar);
  }, []);

  if (!permitida) return null;

  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />
    </>
  );
}
