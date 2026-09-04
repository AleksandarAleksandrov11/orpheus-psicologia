# Orpheus Psicología — web de Melissa González

Sitio web de la consulta **Orpheus Psicología**. Construido con TanStack Start
(React 19 + Vite + Nitro), Tailwind CSS v4 y renderizado en servidor, desplegado
en Vercel.

---

## ⚠️ Antes de publicar: datos pendientes

Todos los datos que faltan están **en un solo fichero**: [`src/content/site.ts`](src/content/site.ts).
Aparecen marcados con `PENDIENTE("…")` y el sitio los oculta automáticamente o los
muestra con un aviso visible en las páginas legales, para que sea imposible
publicar sin darse cuenta.

| Dato                        | Dónde                                   | Por qué es obligatorio                   |
| --------------------------- | --------------------------------------- | ---------------------------------------- |
| Nº de colegiada y colegio   | `SITE.psicologa.colegiada`              | Ley 44/2003 de profesiones sanitarias    |
| NIF / DNI del titular       | `SITE.titular.nif`                      | Art. 10 LSSI-CE (aviso legal)            |
| Domicilio profesional       | `SITE.titular.domicilio`                | Art. 10 LSSI-CE (aviso legal)            |
| Teléfono de contacto        | `SITE.contacto.telefono`                | Recomendado (confianza y SEO local)      |
| Dirección de la consulta    | `SITE.contacto.direccion`               | SEO local y ficha de Google              |
| Enlace a la ficha de Google | `SITE.social.google` / `.googleReviews` | Para mostrar las reseñas verificadas     |
| Dominio definitivo          | `SITE.url` o variable `VITE_SITE_URL`   | Canónicas, sitemap y datos estructurados |

### Reseñas

`src/content/resenas.ts` contiene los testimonios que ya estaban en la web
anterior, marcados con `verificada: false`. **Sustitúyelos por las reseñas reales
de Google Business Profile** (array `RESENAS_GOOGLE`) o elimina los que no cuenten
con autorización escrita de quien los escribió. El fichero explica el procedimiento.

### Precios

`MOSTRAR_PRECIOS` en `src/content/copy.ts` está en `false`. Ponlo en `true` y
rellena el campo `precio` de cada entrada de `SESIONES` para que aparezcan las
tarifas en la página de terapia. Mientras esté desactivado, la web muestra un
enlace a «Consultar tarifas».

---

## Puesta en marcha

```bash
bun install
bun run dev        # http://localhost:5173
bun run build      # compilación de producción (.output)
bun run preview    # servidor local sobre la compilación
bun run lint       # ESLint
bunx tsc --noEmit  # comprobación de tipos
```

Variables de entorno (opcionales, se configuran en Vercel):

| Variable        | Uso                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------- |
| `VITE_SITE_URL` | Dominio canónico sin barra final. Si no se define se usa el valor por defecto de `site.ts`. |

---

## Estructura

```
src/
├── assets/            Fotos de Melissa y texturas duotono
├── components/site/   Layout, Nav, Footer, primitivas de UI y de movimiento
│   ├── motion.tsx     Reveal, Parallax, Marquesina, Contador, Magnetico…
│   ├── ui.tsx         Lira (logo SVG), botones, acordeón, migas, figuras
│   ├── Recorrido.tsx  Diagrama del proceso terapéutico no lineal
│   ├── CookieConsent  Banner y panel de preferencias de cookies
│   └── Analytics.tsx  Vercel Analytics, condicionado al consentimiento
├── content/           TODO el texto del sitio, separado de la maquetación
│   ├── site.ts        Configuración global y datos de contacto
│   ├── copy.ts        Textos de las páginas
│   ├── articulos.ts   Artículos del Diario
│   └── resenas.ts     Reseñas y testimonios
├── lib/
│   ├── seo.ts         Metadatos y datos estructurados (schema.org)
│   └── consent.ts     Lógica del consentimiento de cookies
├── routes/            Una página por fichero (enrutado por ficheros)
└── styles.css         Sistema de diseño completo
public/fonts/          Tipografías autoalojadas (sin peticiones a Google)
```

---

## Sistema de diseño

**Paleta** (definida en `src/styles.css`):

| Token             | Hex                   | Uso                             |
| ----------------- | --------------------- | ------------------------------- |
| `moss`            | `#2C3424`             | Fondos oscuros, texto principal |
| `cypress`         | `#4C583E`             | Acento, enlaces, trazos         |
| `olive`           | `#768064`             | Antetítulos, detalles           |
| `cedar`           | `#959581`             | Filetes y elementos secundarios |
| `aloe`            | `#DADED8`             | Fondos suaves sobre oscuro      |
| `bone`            | `#F2F0E7`             | Fondo base (papel)              |
| `paper` / `linen` | `#EAE7DA` / `#F7F6F0` | Bandas alternas y tarjetas      |

**Tipografía**: Instrument Serif (display) + Jost (interfaz y texto), ambas
autoalojadas en `public/fonts` con `font-display: swap` y precarga de los cortes
críticos.

**Movimiento**: sin librerías externas. Todo se basa en `IntersectionObserver` y
transformaciones CSS, y respeta `prefers-reduced-motion`. El contenido solo se
oculta si el documento tiene la clase `js`, de modo que sin JavaScript —y para los
rastreadores— el texto siempre es visible.

---

## Privacidad y cookies

- **Consentimiento previo**: no se carga ninguna analítica hasta que la persona
  acepta. «Aceptar» y «Rechazar» tienen el mismo peso visual y el mismo número de
  clics, según la guía de la AEPD.
- **Vercel Analytics** y **Speed Insights** se montan únicamente si hay
  consentimiento (`src/components/site/Analytics.tsx`). Ambos son sin cookies.
- La decisión se guarda en `localStorage` (`orpheus.consentimiento.v1`), caduca a
  los 24 meses y puede cambiarse desde «Preferencias de cookies» en el pie.
- Las tipografías están autoalojadas: la web no hace **ninguna** petición a
  servidores de Google.

---

## SEO

- Canónicas absolutas, `hreflang` `es-ES` y `x-default` en todas las páginas.
- `sitemap.xml` generado en servidor con URL absolutas y fechas reales
  (`src/routes/sitemap[.]xml.ts`), y `robots.txt` que lo declara.
- Datos estructurados schema.org: `WebSite`, `ProfessionalService` + `Psychologist`,
  `Person`, `BreadcrumbList`, `FAQPage`, `Service` y `Article`.
- Imágenes Open Graph propias (1200×630) para cada sección, en `public/og/`.
- Imágenes en WebP con `width`/`height` explícitos para evitar CLS.

---

## Créditos de las imágenes

Los retratos de Melissa González son propiedad de la titular del sitio. Las
texturas (`src/assets/tex-*.webp`) proceden de [Unsplash](https://unsplash.com)
bajo su licencia de uso libre, y han sido reprocesadas con un duotono propio para
integrarlas en la paleta de la marca.
