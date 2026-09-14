import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";

/**
 * Cabeceras aplicadas en el borde (Vercel) a través de Nitro.
 * Sin CSP estricta: la web inyecta JSON-LD y un script en línea mínimo, y una
 * política mal calibrada rompería el renderizado del lado servidor.
 */
const CABECERAS_SEGURIDAD = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "SAMEORIGIN",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
};

const INMUTABLE = "public, max-age=31536000, immutable";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tanstackStart({
      // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
      server: { entry: "server" },
    }),
    nitro({
      routeRules: {
        "/**": { headers: CABECERAS_SEGURIDAD },
        // Tipografías e iconos son inmutables: se sirven con caché de un año.
        "/fonts/**": { headers: { ...CABECERAS_SEGURIDAD, "Cache-Control": INMUTABLE } },
        "/og/**": {
          headers: { ...CABECERAS_SEGURIDAD, "Cache-Control": "public, max-age=604800" },
        },
        "/_build/assets/**": { headers: { ...CABECERAS_SEGURIDAD, "Cache-Control": INMUTABLE } },
        "/favicon.ico": {
          headers: { ...CABECERAS_SEGURIDAD, "Cache-Control": "public, max-age=604800" },
        },
        "/robots.txt": {
          headers: { ...CABECERAS_SEGURIDAD, "Cache-Control": "public, max-age=86400" },
        },
        "/site.webmanifest": {
          headers: { ...CABECERAS_SEGURIDAD, "Cache-Control": "public, max-age=604800" },
        },
      },
    }),
    viteReact(),
    tailwindcss(),
  ],
  build: {
    cssMinify: "lightningcss",
  },
});
