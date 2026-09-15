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
        // Los assets llevan el hash en el nombre, así que caducan solos.
        "/assets/**": { headers: { ...CABECERAS_SEGURIDAD, "Cache-Control": INMUTABLE } },
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
    /**
     * Lightning CSS reescribe `@media (min-width: 768px)` como
     * `@media (width >= 768px)` salvo que se le diga que apunte a
     * navegadores anteriores a esa sintaxis (Safari 16.4, Chrome 104).
     * Con la forma moderna hay analizadores y auditores que no reconocen
     * ninguna media query y dan la web por no responsive.
     */
    cssTarget: ["chrome100", "edge100", "firefox100", "safari15.4"],
  },
});
