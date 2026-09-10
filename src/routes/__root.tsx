import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { SITE } from "@/content/site";
import { grafoBase } from "@/lib/seo";
import { Layout } from "@/components/site/Layout";
import { Lira } from "@/components/site/ui";

/**
 * Marca el documento como «con JavaScript» antes del primer pintado.
 * Las animaciones de entrada solo ocultan contenido si esta clase existe,
 * de modo que sin JS —y para los rastreadores— todo el texto es visible.
 */
const SCRIPT_JS = `document.documentElement.classList.add('js')`;

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#f2f0e7" },
      { name: "color-scheme", content: "light" },
      { name: "format-detection", content: "telephone=no" },
      { name: "apple-mobile-web-app-title", content: SITE.shortName },
      { name: "application-name", content: SITE.name },
      { httpEquiv: "content-language", content: "es-ES" },
      { name: "geo.region", content: "ES-MD" },
      { name: "geo.placename", content: SITE.contacto.ciudad },
      // Valores por defecto; cada ruta los sobrescribe con `seo()`.
      { title: `${SITE.name} · ${SITE.psicologa.nombre}` },
      {
        name: "description",
        content:
          "Psicología para comprender lo que te pasa, transformar aquello que te limita y construir una relación más amable contigo.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
      // Las tipografías se sirven desde el propio dominio: ni una petición
      // a Google Fonts (mejor LCP y sin transferencia de IP a terceros).
      {
        rel: "preload",
        href: "/fonts/playfair-normal-400-600-latin.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/jost-normal-300-600-latin.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/playfair-italic-400-600-latin.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      // Las dos caras que solo aportan la «g» (ver fonts.css). Pesan 3 KB
      // entre las dos y van precargadas para que no se vea un instante la
      // ge de la tipografía de reserva dentro de un titular en Playfair.
      {
        rel: "preload",
        href: "/fonts/g-prata-normal.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/g-spectral-italic.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
    scripts: [
      { children: SCRIPT_JS },
      { type: "application/ld+json", children: JSON.stringify(grafoBase()) },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}

/* ══════════════════════════════════════════════════════════════════
   404 y errores
   ══════════════════════════════════════════════════════════════════ */

function PaginaMensaje({
  codigo,
  titulo,
  texto,
  acciones,
}: {
  codigo: string;
  titulo: ReactNode;
  texto: string;
  acciones: ReactNode;
}) {
  return (
    <div className="aurora grain flex min-h-[75vh] items-center justify-center px-6 py-28">
      <div className="relative z-10 max-w-lg text-center">
        <Lira className="mx-auto h-12 w-12 text-cypress/50" />
        <p className="eyebrow mt-8 text-olive">{codigo}</p>
        <h1 className="display-lg mt-5">{titulo}</h1>
        <p className="lede mt-6">{texto}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">{acciones}</div>
      </div>
    </div>
  );
}

/**
 * La 404 lleva la cabecera y el pie completos: quien llega aquí desde un
 * enlace roto necesita poder seguir navegando, no un callejón sin salida.
 */
function NotFoundComponent() {
  return (
    <Layout>
      <PaginaMensaje
        codigo="Error 404"
        titulo={
          <>
            Esta página no <em className="italic">existe</em>.
          </>
        }
        texto="Puede que el enlace haya cambiado de sitio. Vuelve al inicio, explora las secciones del menú o escríbeme y te oriento."
        acciones={
          <>
            <Link to="/" className="btn-base btn-fill btn-solid">
              <span className="relative z-10">Volver al inicio</span>
            </Link>
            <Link to="/contacto" className="btn-base btn-fill btn-outline">
              <span className="relative z-10">Escribirme</span>
            </Link>
          </>
        }
      />
    </Layout>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <PaginaMensaje
      codigo="Error"
      titulo={
        <>
          Algo no ha <em className="italic">cargado</em>.
        </>
      }
      texto="Ha ocurrido un problema al mostrar esta página. Puedes intentarlo de nuevo o volver al inicio."
      acciones={
        <>
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-base btn-fill btn-solid"
          >
            <span className="relative z-10">Intentar de nuevo</span>
          </button>
          <a href="/" className="btn-base btn-fill btn-outline">
            <span className="relative z-10">Ir al inicio</span>
          </a>
        </>
      }
    />
  );
}
