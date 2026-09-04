# Análisis y optimización SEO — Orpheus Psicología

Documento de trabajo del rediseño. Recoge el diagnóstico de la web anterior, lo
que se ha implementado y lo que queda en manos de Melissa.

---

## 1. Diagnóstico de la web anterior

| #   | Problema                                                                                                                                                                                                           | Gravedad   | Estado     |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | ---------- |
| 1   | `sitemap.xml` con URL **relativas** (`<loc>/servicios</loc>`). Un sitemap con rutas relativas es inválido y Google lo descarta entero.                                                                             | 🔴 Crítico | Resuelto   |
| 2   | `robots.txt` sin directiva `Sitemap:`, de modo que el sitemap solo se descubría si se enviaba a mano en Search Console.                                                                                            | 🔴 Crítico | Resuelto   |
| 3   | Canónicas **relativas** (`<link rel="canonical" href="/servicios">`). Google exige URL absolutas; una canónica relativa se ignora y aparecen duplicados con/sin `www` y con/sin barra final.                       | 🔴 Crítico | Resuelto   |
| 4   | `og:image` apuntaba a un asset con hash de compilación (`/assets/melissa-1-XXXX.png`), no a una imagen social 1200×630. Al compartir el enlace no se veía tarjeta.                                                 | 🟠 Alto    | Resuelto   |
| 5   | Datos estructurados mínimos: un único `ProfessionalService` sin `@id`, sin `Person`, sin `BreadcrumbList`, sin `FAQPage`. Sin posibilidad de rich results.                                                         | 🟠 Alto    | Resuelto   |
| 6   | Sin `hreflang`, sin `og:locale`, sin `lang` declarado en cabeceras HTTP.                                                                                                                                           | 🟡 Medio   | Resuelto   |
| 7   | Tipografías cargadas desde `fonts.googleapis.com`: dos conexiones bloqueantes en la ruta crítica + transferencia de IP a Google (problema de RGPD además de rendimiento).                                          | 🟠 Alto    | Resuelto   |
| 8   | Imágenes PNG sin optimizar (`melissa-1.png` pesaba **724 KB**) y sin `width`/`height`, provocando CLS.                                                                                                             | 🟠 Alto    | Resuelto   |
| 9   | Sin `manifest`, sin `apple-touch-icon`, sin iconos de aplicación.                                                                                                                                                  | 🟡 Medio   | Resuelto   |
| 10  | Contenido escaso: 5 páginas, sin blog. Sin autoridad temática ni long tail.                                                                                                                                        | 🟠 Alto    | Resuelto   |
| 11  | Sin páginas legales. Además de ser un incumplimiento legal, Google evalúa E-E-A-T y las páginas de salud entran en **YMYL** («Your Money or Your Life»), donde la ausencia de identificación profesional penaliza. | 🔴 Crítico | Resuelto   |
| 12  | Ninguna mención del número de colegiada ni de la titulación en datos estructurados: señal de autoridad clave en el sector sanitario.                                                                               | 🟠 Alto    | Parcial ⚠️ |
| 13  | Sin cabeceras de seguridad (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).                                                                                                                    | 🟡 Medio   | Resuelto   |
| 14  | Sin `Cache-Control` de larga duración para tipografías y estáticos.                                                                                                                                                | 🟡 Medio   | Resuelto   |
| 15  | Página 404 sin enlaces de recuperación ni marca.                                                                                                                                                                   | 🟢 Bajo    | Resuelto   |

---

## 2. SEO técnico implementado

### Indexación y rastreo

- **`robots.txt`** con `Allow: /`, exclusión de rutas internas y declaración explícita del sitemap.
- **`sitemap.xml`** generado en servidor (`src/routes/sitemap[.]xml.ts`): URL absolutas,
  `lastmod` real de cada artículo, `changefreq` y `priority` coherentes, y `xhtml:link`
  con `hreflang`. Incluye automáticamente cualquier artículo nuevo del Diario.
- **Canónicas absolutas** en todas las páginas, generadas desde `SITE.url`
  (configurable con `VITE_SITE_URL` para evitar que el dominio quede escrito a mano).
- **`hreflang`** `es-ES` + `x-default` en cada página.
- `robots` meta con `max-image-preview:large`, `max-snippet:-1`, `max-video-preview:-1`
  para permitir fragmentos enriquecidos.

### Datos estructurados (schema.org)

Grafo único e interconectado por `@id`, inyectado en la raíz del sitio:

| Tipo                                                       | Dónde                        | Para qué                                         |
| ---------------------------------------------------------- | ---------------------------- | ------------------------------------------------ |
| `WebSite`                                                  | Raíz                         | Identidad del sitio                              |
| `ProfessionalService` + `MedicalBusiness` + `Psychologist` | Raíz                         | Panel de conocimiento y SEO local                |
| `Person`                                                   | Raíz + /sobre-mi             | E-E-A-T: titulación, universidad, especialidades |
| `BreadcrumbList`                                           | Todas las páginas internas   | Migas en resultados de búsqueda                  |
| `FAQPage`                                                  | Inicio (6) y /servicios (10) | Resultados enriquecidos de preguntas             |
| `Service`                                                  | /servicios                   | Un nodo por espacio de trabajo                   |
| `Article`                                                  | Cada artículo del Diario     | Fecha, autor, sección y recuento de palabras     |
| `ContactPage`                                              | /contacto                    | Intención de contacto                            |

`hasOfferCatalog` enumera los servicios; `areaServed` cubre España y Madrid;
`availableLanguage: es`. `sameAs` solo incluye perfiles reales (los pendientes se
omiten automáticamente en lugar de publicar una URL falsa).

### Metadatos

- Un `title` único por página, con marca al final salvo en la portada.
- `description` propia por página, entre 120 y 160 caracteres.
- Open Graph completo (`og:type`, `og:locale`, `og:site_name`, `og:image` 1200×630
  con `width`, `height` y `alt`) y `twitter:card` `summary_large_image`.
- **Seis imágenes sociales propias** (`public/og/`), una por sección, generadas con la
  tipografía y la paleta de la marca.

### Rendimiento (Core Web Vitals)

- **Tipografías autoalojadas** en `public/fonts` con `font-display: swap`, subconjuntos
  `latin`/`latin-ext` por `unicode-range` y **precarga** de los tres cortes críticos.
  Se eliminan dos conexiones a terceros de la ruta crítica.
- **Imágenes en WebP** con duotono propio. Reducción de peso frente a los PNG originales:
  `melissa-1` 724 KB → 33 KB (−95 %), `melissa-2` 329 KB → 47 KB, `melissa-3` 205 KB → 8 KB.
  Todas las texturas se sirven con `srcSet` de dos tamaños y `sizes`.
- **`width` y `height` explícitos** en todas las imágenes y `aspect-ratio` en el
  componente `Figura`: CLS estructuralmente cercano a cero.
- La imagen del hero es la única con `loading="eager"` + `fetchPriority="high"`; el resto
  es `loading="lazy"` + `decoding="async"`.
- **Cero librerías de animación**. El movimiento usa `IntersectionObserver` y
  transformaciones CSS (`transform`/`opacity`, compuestas en GPU), con `requestAnimationFrame`
  y listeners pasivos en los efectos de scroll.
- **Ninguna analítica en la carga inicial**: los scripts de medición solo se inyectan tras
  el consentimiento, lo que además mejora el TBT de la primera visita.
- `Cache-Control: immutable` de un año para tipografías y assets con hash; cabeceras
  definidas en `vite.config.ts` mediante `routeRules` de Nitro.
- CSS minificado con Lightning CSS.

### Renderizado y contenido rastreable

- **SSR completo**: el HTML servido contiene todo el texto.
- Las animaciones de entrada solo ocultan contenido cuando el documento tiene la clase `js`,
  que añade un script en línea. **Sin JavaScript —y para cualquier rastreador que no ejecute
  JS— todo el contenido es visible desde el primer byte.** Este es el error más común al
  añadir animaciones de scroll a una web y aquí está resuelto por diseño.

### Accesibilidad (que también es SEO)

- Un único `<h1>` por página y jerarquía `h1 → h2 → h3` sin saltos.
- `aria-labelledby` en cada sección, migas con `<nav aria-label>`, enlace «Saltar al contenido».
- Foco visible en todo el sitio, con inversión de color sobre fondos oscuros.
- Contrastes verificados: texto principal 11,3:1; texto secundario 5,5:1; texto sobre
  fondo oscuro 7,6:1. Todos por encima de AA.
- `prefers-reduced-motion` desactiva todas las animaciones.
- Formulario con etiquetas asociadas, `aria-invalid`, `aria-describedby` y errores anunciados.

---

## 3. Estrategia de contenidos

### Arquitectura

```
/                    Portada — intención informativa y de marca
├── /sobre-mi        E-E-A-T: quién, formación, enfoque
├── /servicios       Página comercial. 12 espacios de trabajo con ancla propia
│   ├── #autoestima, #autoexigencia, #ansiedad, #duelo…
│   ├── #empresas    Segmento B2B
│   └── #preguntas   FAQ completa (FAQPage)
├── /diario          Blog — autoridad temática y long tail
│   └── /diario/[slug]
├── /testimonios     Prueba social
├── /contacto        Conversión
└── /aviso-legal · /politica-de-privacidad · /politica-de-cookies
```

### Cobertura de palabras clave

| Intención     | Consulta objetivo                                | Página                                                           |
| ------------- | ------------------------------------------------ | ---------------------------------------------------------------- |
| Transaccional | psicóloga online España · psicóloga Madrid       | `/` y `/servicios`                                               |
| Transaccional | terapia autoestima · psicóloga autoestima        | `/servicios#autoestima`                                          |
| Transaccional | terapia autoexigencia · perfeccionismo           | `/servicios#autoexigencia`                                       |
| Transaccional | terapia de duelo · terapia ruptura de pareja     | `/servicios#duelo`, `#ruptura-de-pareja`                         |
| Informativa   | cómo saber si necesito ir a terapia              | FAQ + `/diario`                                                  |
| Informativa   | qué es la terapia integradora                    | `/servicios#enfoque`                                             |
| Informativa   | gestión emocional · cómo gestionar las emociones | `/diario/sentir-comprender-elegir`                               |
| Informativa   | autoexigencia y responsabilidad                  | `/diario/cuando-la-autoexigencia-se-disfraza-de-responsabilidad` |
| Marca         | orpheus psicología · melissa gonzález psicóloga  | `/` y `/sobre-mi`                                                |
| B2B           | bienestar emocional empresas                     | `/servicios#empresas`                                            |

Los doce espacios de trabajo con ancla propia, indexados como `Service`, multiplican por
seis la superficie de aterrizaje frente a las cinco páginas de la web anterior. Los cuatro
artículos del Diario suman unas 4.500 palabras de contenido informativo original, escritas
a partir del material que Melissa redactó, que es exactamente el tipo de contenido con
experiencia de primera mano que Google prioriza en YMYL.

### Enlazado interno

- La portada enlaza a cada espacio de trabajo por su ancla.
- Cada artículo enlaza a `/sobre-mi`, a `/contacto` y a los dos artículos siguientes.
- El pie repite el mapa completo del sitio en todas las páginas.
- Todos los CTA usan texto descriptivo, nunca «haz clic aquí».

---

## 4. Pendiente (requiere acción de Melissa)

Ordenado por impacto en posicionamiento:

1. **Ficha de Google Business Profile.** Es la palanca número uno para «psicóloga Madrid» y
   similares. Hay que crearla o reclamarla, rellenar categoría («Psicólogo»), horario, zona de
   servicio y fotos, y pegar la URL en `SITE.social.google` y `SITE.social.googleReviews`.
   Al hacerlo, la web mostrará automáticamente el bloque de reseñas verificadas.
3. **Dominio definitivo** en `VITE_SITE_URL` (variable de entorno en Vercel) antes de publicar:
   de él dependen canónicas, sitemap y datos estructurados.
4. **Google Search Console**: verificar la propiedad y enviar `https://…/sitemap.xml`.
5. **Bing Webmaster Tools**: importar desde Search Console (dos minutos, tráfico adicional).
6. **NIF y domicilio profesional** en `SITE.titular` para completar el aviso legal.
7. **Reseñas reales** en `src/content/resenas.ts` (ver aviso del propio fichero).
8. **Publicar un artículo al mes** en `/diario`. Es lo que mantiene viva la autoridad temática;
   añadir uno son treinta líneas en `src/content/articulos.ts`.
9. Cuando haya **fotos profesionales**, sustituir los ficheros de `src/assets/` conservando los
   nombres. El sistema de duotono y los tamaños ya están preparados.

---

## 5. Cómo comprobar que todo sigue bien

```bash
bun run build && bun run preview
node .qa/screenshots.mjs http://localhost:3000    # capturas + auditoría automática
```

El script recorre todas las páginas en escritorio y móvil y avisa de: `h1` duplicados,
saltos de jerarquía, imágenes sin `alt` o sin dimensiones, falta de canónica, `og:image`
o datos estructurados, `description` demasiado larga, bloques que se quedan invisibles
por una animación y desbordamiento horizontal.

Validadores externos recomendados tras publicar:

- Rich Results Test (`search.google.com/test/rich-results`) — datos estructurados.
- PageSpeed Insights — Core Web Vitals reales.
- `validator.w3.org` — HTML.
- Facebook Sharing Debugger y X Card Validator — tarjetas sociales.
