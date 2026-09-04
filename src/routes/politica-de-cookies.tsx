import { createFileRoute } from "@tanstack/react-router";

import { Layout } from "@/components/site/Layout";
import { PaginaLegal, type SeccionLegal } from "@/components/site/PaginaLegal";
import { Boton } from "@/components/site/ui";
import { SITE } from "@/content/site";
import { abrirPreferenciasCookies } from "@/lib/consent";
import { migasSchema, seo } from "@/lib/seo";

export const Route = createFileRoute("/politica-de-cookies")({
  head: () =>
    seo({
      title: "Política de cookies",
      description:
        "Qué cookies utiliza Orpheus Psicología, para qué sirven, cuánto duran y cómo aceptarlas, rechazarlas o cambiar tu decisión en cualquier momento.",
      path: "/politica-de-cookies",
      jsonLd: [
        migasSchema([
          { nombre: "Inicio", path: "/" },
          { nombre: "Política de cookies", path: "/politica-de-cookies" },
        ]),
      ],
    }),
  component: Cookies,
});

const NAVEGADORES = [
  {
    nombre: "Google Chrome",
    url: "https://support.google.com/chrome/answer/95647?hl=es",
  },
  {
    nombre: "Mozilla Firefox",
    url: "https://support.mozilla.org/es/kb/Borrar%20cookies",
  },
  {
    nombre: "Safari",
    url: "https://support.apple.com/es-es/guide/safari/sfri11471/mac",
  },
  {
    nombre: "Microsoft Edge",
    url: "https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
  },
];

function Cookies() {
  const secciones: SeccionLegal[] = [
    {
      id: "que-son",
      titulo: "Qué son las cookies",
      contenido: (
        <>
          <p>
            Una cookie es un pequeño fichero que un sitio web guarda en tu dispositivo al visitarlo.
            La normativa española —artículo 22.2 de la Ley 34/2002 (LSSI-CE)— extiende ese concepto
            a cualquier tecnología de almacenamiento o recuperación de datos en el terminal, como el{" "}
            <em>localStorage</em> del navegador. Esta política cubre todas ellas.
          </p>
          <p>
            Salvo las estrictamente necesarias para que la web funcione, ninguna se activa sin tu
            consentimiento previo.
          </p>
        </>
      ),
    },
    {
      id: "tipos",
      titulo: "Qué se utiliza en esta web",
      contenido: (
        <>
          <p>Esta web emplea dos categorías, y solo la primera es obligatoria:</p>
          <ul>
            <li>
              <strong>Técnicas o estrictamente necesarias.</strong> Permiten que el sitio funcione y
              recuerdan tu decisión sobre cookies. No requieren consentimiento y no se pueden
              desactivar.
            </li>
            <li>
              <strong>Analíticas o de medición.</strong> Proporcionan estadísticas agregadas de uso
              y de velocidad de carga. Requieren tu consentimiento y puedes rechazarlas sin que ello
              afecte a la navegación.
            </li>
          </ul>
          <p>
            <strong>
              No se utilizan cookies publicitarias, de personalización de anuncios ni de elaboración
              de perfiles.
            </strong>{" "}
            No hay píxeles de redes sociales, ni etiquetas de terceros con fines comerciales.
          </p>
          <h3>Tipografías alojadas en el propio servidor</h3>
          <p>
            Las fuentes tipográficas se sirven desde este mismo dominio, no desde Google Fonts. Al
            visitar la web <strong>no se realiza ninguna petición a servidores de Google</strong>,
            de modo que tu dirección IP no se transfiere a terceros por ese motivo.
          </p>
        </>
      ),
    },
    {
      id: "tabla",
      titulo: "Relación detallada",
      contenido: (
        <div className="tabla-scroll">
          <table>
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Titular</th>
                <th scope="col">Finalidad</th>
                <th scope="col">Duración</th>
                <th scope="col">Tipo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>orpheus.consentimiento.v1</code>
                  <br />
                  <em>(localStorage)</em>
                </td>
                <td>Propia</td>
                <td>
                  Guarda tu elección sobre las cookies para no volver a preguntártelo en cada
                  visita.
                </td>
                <td>24 meses</td>
                <td>Técnica · necesaria</td>
              </tr>
              <tr>
                <td>Vercel Web Analytics</td>
                <td>Vercel Inc. (encargada del tratamiento)</td>
                <td>
                  Estadística agregada y anónima de páginas vistas y procedencia del tráfico.{" "}
                  <strong>No utiliza cookies</strong>: emplea un identificador de sesión derivado
                  que no se almacena en tu dispositivo y no permite identificarte.
                </td>
                <td>No aplica</td>
                <td>Analítica</td>
              </tr>
              <tr>
                <td>Vercel Speed Insights</td>
                <td>Vercel Inc. (encargada del tratamiento)</td>
                <td>
                  Mide métricas de rendimiento real (Core Web Vitals) para detectar páginas lentas.{" "}
                  <strong>Tampoco utiliza cookies.</strong>
                </td>
                <td>No aplica</td>
                <td>Analítica</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      id: "consentimiento",
      titulo: "Cómo se pide tu consentimiento",
      contenido: (
        <>
          <p>
            En tu primera visita aparece un aviso en la parte inferior con tres opciones:{" "}
            <strong>Aceptar</strong>, <strong>Rechazar</strong> y <strong>Configurar</strong>.
            Siguiendo la Guía sobre el uso de cookies de la Agencia Española de Protección de Datos:
          </p>
          <ul>
            <li>
              Aceptar y rechazar tienen la misma presencia visual y se consiguen con el mismo número
              de clics: no hay patrones que empujen a aceptar.
            </li>
            <li>
              Nada que no sea estrictamente necesario se carga antes de que decidas. Si cierras el
              aviso sin elegir, se entiende que no consientes.
            </li>
            <li>
              La opción «Configurar» permite aceptar unas categorías y rechazar otras, con todas las
              casillas no necesarias desmarcadas de inicio.
            </li>
            <li>
              El consentimiento caduca a los <strong>24 meses</strong>, transcurridos los cuales se
              vuelve a solicitar.
            </li>
            <li>Retirar el consentimiento es tan sencillo como darlo.</li>
          </ul>
        </>
      ),
    },
    {
      id: "cambiar",
      titulo: "Cambiar tu decisión",
      contenido: (
        <>
          <p>
            Puedes revisar o modificar tu elección cuando quieras, desde aquí o desde el enlace
            «Preferencias de cookies» que hay en el pie de todas las páginas.
          </p>
          <p className="not-prose mt-6">
            <Boton
              variante="outline"
              onClick={abrirPreferenciasCookies}
              className="px-7 py-3.5 text-[0.72rem]"
            >
              Abrir preferencias de cookies
            </Boton>
          </p>
        </>
      ),
    },
    {
      id: "navegador",
      titulo: "Eliminar cookies desde tu navegador",
      contenido: (
        <>
          <p>
            Con independencia de lo anterior, puedes configurar tu navegador para bloquear o
            eliminar cookies y datos de sitios web. Ten en cuenta que bloquear las técnicas puede
            impedir que se recuerde tu decisión y el aviso volverá a aparecer en cada visita.
          </p>
          <ul>
            {NAVEGADORES.map((n) => (
              <li key={n.nombre}>
                <a href={n.url} target="_blank" rel="noopener noreferrer">
                  {n.nombre}
                </a>
              </li>
            ))}
          </ul>
          <p>
            La mayoría de navegadores ofrecen además un modo de navegación privada que descarta el
            almacenamiento al cerrar la ventana.
          </p>
        </>
      ),
    },
    {
      id: "mas-informacion",
      titulo: "Más información y actualizaciones",
      contenido: (
        <>
          <p>
            El tratamiento de los datos recogidos a través de estas tecnologías se detalla en la{" "}
            <a href="/politica-de-privacidad">política de privacidad</a>. Para cualquier duda puedes
            escribir a <a href={`mailto:${SITE.privacidad.email}`}>{SITE.privacidad.email}</a>.
          </p>
          <p>
            Esta política puede modificarse si cambian las herramientas utilizadas o la normativa
            aplicable. Cuando la modificación afecte a las categorías de cookies, se volverá a
            solicitar tu consentimiento.
          </p>
        </>
      ),
    },
  ];

  return (
    <Layout>
      <PaginaLegal
        antetitulo="Política de cookies"
        titulo="Qué se guarda en tu"
        cursiva="navegador."
        entradilla="Muy poco, y nada que sirva para perfilarte. Aquí tienes el detalle completo y la forma de cambiar tu decisión cuando quieras."
        secciones={secciones}
      />
    </Layout>
  );
}
