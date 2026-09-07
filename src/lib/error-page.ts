/**
 * Página de error 500 servida cuando el renderizado en servidor falla.
 * Es HTML autocontenido (sin CSS ni JS externos) porque el fallo puede
 * haber ocurrido antes de que se cargue nada del sitio.
 */
export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>Esta página no ha cargado · Orpheus Psicología</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <style>
      :root { color-scheme: light; }
      * { box-sizing: border-box; }
      body {
        margin: 0; min-height: 100vh; padding: 1.5rem;
        display: grid; place-items: center;
        background: #f2f0e7; color: #2c3424;
        font: 300 15px/1.7 "Jost", ui-sans-serif, system-ui, -apple-system, sans-serif;
        -webkit-font-smoothing: antialiased;
      }
      .card { max-width: 32rem; width: 100%; text-align: center; padding: 2rem 1rem; }
      svg { width: 48px; height: 48px; color: #4c583e; opacity: .6; }
      .eyebrow {
        margin: 2rem 0 0; font-size: .6875rem; font-weight: 500;
        letter-spacing: .26em; text-transform: uppercase; color: #768064;
      }
      h1 {
        font-family: "Playfair Display", Georgia, serif; font-weight: 400;
        font-size: clamp(1.9rem, 1.2rem + 3vw, 2.75rem); line-height: 1.05;
        letter-spacing: -.02em; margin: 1rem 0 0;
      }
      h1 em { font-style: italic; }
      p { color: #5c6350; margin: 1.25rem 0 0; }
      .actions { display: flex; gap: .625rem; justify-content: center; flex-wrap: wrap; margin-top: 2.25rem; }
      a, button {
        font: inherit; font-size: .8125rem; font-weight: 500;
        letter-spacing: .09em; text-transform: uppercase;
        padding: 1rem 1.75rem; border-radius: 999px; cursor: pointer;
        text-decoration: none; border: 1px solid transparent;
        transition: background-color .4s ease, color .4s ease, border-color .4s ease;
      }
      .primary { background: #2c3424; color: #f2f0e7; }
      .primary:hover { background: #4c583e; }
      .secondary { background: transparent; color: #2c3424; border-color: #b9b7a4; }
      .secondary:hover { background: #2c3424; color: #f2f0e7; border-color: #2c3424; }
      .contacto { margin-top: 2.5rem; font-size: .8rem; color: #7d8271; }
      .contacto a { all: unset; color: #4c583e; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; }
    </style>
  </head>
  <body>
    <div class="card">
      <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <g stroke="currentColor" stroke-width="1.9" stroke-linecap="round">
          <line x1="33" y1="9" x2="33" y2="73"/><line x1="41.5" y1="9" x2="41.5" y2="73"/>
          <line x1="50" y1="9" x2="50" y2="73"/><line x1="58.5" y1="9" x2="58.5" y2="73"/>
          <line x1="67" y1="9" x2="67" y2="73"/>
        </g>
        <line x1="21" y1="36.4" x2="79" y2="36.4" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M24.4 36.4 A33 33 0 1 0 75.6 36.4" stroke="currentColor" stroke-width="8.5" stroke-linecap="round"/>
        <circle cx="22.2" cy="36.4" r="5" fill="currentColor"/><circle cx="77.8" cy="36.4" r="5" fill="currentColor"/>
      </svg>
      <p class="eyebrow">Error 500</p>
      <h1>Esta página no ha <em>cargado</em>.</h1>
      <p>Ha ocurrido un problema en el servidor. Puedes intentarlo de nuevo o volver al inicio.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Intentar de nuevo</button>
        <a class="secondary" href="/">Ir al inicio</a>
      </div>
      <p class="contacto">
        Si el problema continúa, escríbeme a
        <a href="mailto:hola@orpheuspsicologia.com">hola@orpheuspsicologia.com</a>.
      </p>
    </div>
  </body>
</html>`;
}
