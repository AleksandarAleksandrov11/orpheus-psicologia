import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { SITE } from "@/content/site";
import { ARTICULOS } from "@/content/articulos";

/**
 * Mapa del sitio con URL absolutas (una URL relativa en <loc> invalida el
 * sitemap para Google) y fechas de última modificación reales en el blog.
 */

type Entrada = {
  path: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: string;
  lastmod?: string;
};

const HOY = new Date().toISOString().slice(0, 10);

const PAGINAS: Entrada[] = [
  { path: "/", changefreq: "weekly", priority: "1.0", lastmod: HOY },
  { path: "/sobre-mi", changefreq: "monthly", priority: "0.9", lastmod: HOY },
  { path: "/servicios", changefreq: "monthly", priority: "0.9", lastmod: HOY },
  { path: "/empresas", changefreq: "monthly", priority: "0.8", lastmod: HOY },
  { path: "/preguntas-frecuentes", changefreq: "monthly", priority: "0.7", lastmod: HOY },
  { path: "/por-que-orpheus", changefreq: "yearly", priority: "0.6", lastmod: HOY },
  { path: "/diario", changefreq: "weekly", priority: "0.8", lastmod: HOY },
  { path: "/testimonios", changefreq: "monthly", priority: "0.7", lastmod: HOY },
  { path: "/contacto", changefreq: "monthly", priority: "0.8", lastmod: HOY },
  { path: "/aviso-legal", changefreq: "yearly", priority: "0.2" },
  { path: "/politica-de-privacidad", changefreq: "yearly", priority: "0.2" },
  { path: "/politica-de-cookies", changefreq: "yearly", priority: "0.2" },
];

const ARTICULOS_SITEMAP: Entrada[] = ARTICULOS.map((a) => ({
  path: `/diario/${a.slug}`,
  changefreq: "yearly",
  priority: "0.7",
  lastmod: a.actualizado ?? a.fecha,
}));

const escapar = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function url(e: Entrada) {
  const loc = escapar(`${SITE.url}${e.path === "/" ? "/" : e.path}`);
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
    `    <changefreq>${e.changefreq}</changefreq>`,
    `    <priority>${e.priority}</priority>`,
    `    <xhtml:link rel="alternate" hreflang="es-ES" href="${loc}"/>`,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
          '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
          ...[...PAGINAS, ...ARTICULOS_SITEMAP].map(url),
          "</urlset>",
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
          },
        });
      },
    },
  },
});
