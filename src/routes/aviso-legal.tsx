import { createFileRoute } from "@tanstack/react-router";

import { Layout } from "@/components/site/Layout";
import { PaginaLegal, Pendiente, type SeccionLegal } from "@/components/site/PaginaLegal";
import { SITE, esPendiente } from "@/content/site";
import { migasSchema, seo } from "@/lib/seo";

export const Route = createFileRoute("/aviso-legal")({
  head: () =>
    seo({
      title: "Aviso legal",
      description:
        "Datos identificativos del titular, condiciones de uso, propiedad intelectual, exclusión de responsabilidad y legislación aplicable de la web de Orpheus Psicología.",
      path: "/aviso-legal",
      jsonLd: [
        migasSchema([
          { nombre: "Inicio", path: "/" },
          { nombre: "Aviso legal", path: "/aviso-legal" },
        ]),
      ],
    }),
  component: AvisoLegal,
});

/** Muestra el dato o, si aún no está, la marca de pendiente. */
function Dato({ valor }: { valor: string }) {
  return esPendiente(valor) ? <Pendiente>{valor}</Pendiente> : <strong>{valor}</strong>;
}

function AvisoLegal() {
  // Solo se cuentan los datos que esta página muestra realmente.
  const pendientes = [SITE.titular.nif, SITE.titular.domicilio, SITE.psicologa.colegiada].filter(
    esPendiente,
  ).length;

  const secciones: SeccionLegal[] = [
    {
      id: "titular",
      titulo: "Identificación del titular",
      contenido: (
        <>
          <p>
            En cumplimiento del deber de información recogido en el artículo 10 de la Ley 34/2002,
            de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico
            (LSSI-CE), se facilitan los siguientes datos:
          </p>
          <ul>
            <li>
              <strong>Titular:</strong> <Dato valor={SITE.titular.nombre} />
            </li>
            <li>
              <strong>NIF:</strong> <Dato valor={SITE.titular.nif} />
            </li>
            <li>
              <strong>Domicilio profesional:</strong> <Dato valor={SITE.titular.domicilio} />
            </li>
            <li>
              <strong>Correo electrónico:</strong>{" "}
              <a href={`mailto:${SITE.contacto.email}`}>{SITE.contacto.email}</a>
            </li>
            <li>
              <strong>Actividad:</strong> {SITE.titular.actividad}
            </li>
            <li>
              <strong>Titulación:</strong> {SITE.psicologa.titulo}
            </li>
            <li>
              <strong>Nº de colegiada:</strong> <Dato valor={SITE.psicologa.colegiada} /> del{" "}
              {SITE.psicologa.colegio}
            </li>
            <li>
              <strong>Sitio web:</strong> <a href={SITE.url}>{SITE.url}</a>
            </li>
          </ul>
          <p>
            La actividad de psicología sanitaria está regulada por la Ley 44/2003, de 21 de
            noviembre, de ordenación de las profesiones sanitarias, y sujeta al Código Deontológico
            del Consejo General de la Psicología de España.
          </p>
        </>
      ),
    },
    {
      id: "objeto",
      titulo: "Objeto y ámbito de aplicación",
      contenido: (
        <>
          <p>
            El presente aviso legal regula el acceso, la navegación y el uso de este sitio web. La
            navegación por el sitio atribuye la condición de usuario e implica la aceptación plena
            de todas las cláusulas aquí recogidas en la versión publicada en el momento del acceso.
          </p>
          <p>
            El sitio tiene por finalidad dar a conocer los servicios de psicología prestados por la
            titular, ofrecer contenidos divulgativos sobre salud mental y facilitar un canal de
            contacto. No permite la contratación en línea ni el pago de servicios a través de la
            web.
          </p>
        </>
      ),
    },
    {
      id: "uso",
      titulo: "Condiciones de uso",
      contenido: (
        <>
          <p>
            El usuario se compromete a hacer un uso diligente del sitio y a no emplearlo para fines
            ilícitos o contrarios a la buena fe. En particular, se compromete a abstenerse de:
          </p>
          <ul>
            <li>
              Reproducir, copiar, distribuir o transformar los contenidos sin autorización expresa.
            </li>
            <li>
              Introducir programas, virus, macros o cualquier elemento que pueda dañar los sistemas
              informáticos de la titular o de terceros.
            </li>
            <li>
              Utilizar el formulario de contacto para remitir comunicaciones comerciales no
              solicitadas o contenidos ofensivos, difamatorios o ilícitos.
            </li>
            <li>
              Suplantar la identidad de otra persona al facilitar datos a través de los formularios.
            </li>
          </ul>
          <p>
            El acceso al sitio es gratuito y no exige registro previo. La titular se reserva el
            derecho a denegar el acceso a quienes incumplan estas condiciones.
          </p>
        </>
      ),
    },
    {
      id: "propiedad",
      titulo: "Propiedad intelectual e industrial",
      contenido: (
        <>
          <p>
            Todos los contenidos del sitio (textos, artículos, fotografías, marca, logotipo, diseño
            gráfico, código fuente y estructura de navegación) son titularidad de{" "}
            {SITE.titular.nombre} o de terceros que han autorizado su uso, y están protegidos por la
            normativa española y europea de propiedad intelectual e industrial.
          </p>
          <p>
            Queda prohibida su reproducción, distribución, comunicación pública o transformación sin
            autorización escrita, salvo el uso estrictamente personal y privado. Se permite citar
            fragmentos de los artículos siempre que se indique la autoría y se enlace a la fuente
            original.
          </p>
          <h3>Fotografías de terceros</h3>
          <p>
            Las imágenes de naturaleza empleadas como recurso gráfico proceden del banco de imágenes{" "}
            <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer">
              Unsplash
            </a>{" "}
            y se utilizan bajo su licencia de uso libre, con un tratamiento cromático propio. Los
            retratos de la titular son de su exclusiva propiedad.
          </p>
        </>
      ),
    },
    {
      id: "responsabilidad",
      titulo: "Exclusión de responsabilidad",
      contenido: (
        <>
          <h3>Los contenidos no sustituyen una consulta profesional</h3>
          <p>
            La información publicada en esta web, incluidos los artículos del Diario, tiene carácter{" "}
            <strong>exclusivamente divulgativo y orientativo</strong>. No constituye un diagnóstico,
            un tratamiento ni una recomendación clínica individualizada, y en ningún caso sustituye
            la valoración de una profesional de la psicología o de la medicina en una consulta
            personal.
          </p>
          <p>
            <strong>
              Si te encuentras en una situación de urgencia o de riesgo para tu vida o la de otra
              persona, llama al 112 (emergencias) o al 024 (línea de atención a la conducta suicida,
              gratuita, confidencial y disponible las 24 horas).
            </strong>
          </p>
          <h3>Disponibilidad del servicio</h3>
          <p>
            La titular no garantiza la ausencia de interrupciones o errores en el acceso al sitio,
            ni se hace responsable de los daños derivados de fallos técnicos, de la presencia de
            virus o de un uso indebido del sitio por parte del usuario, siempre que haya actuado con
            la diligencia debida.
          </p>
        </>
      ),
    },
    {
      id: "enlaces",
      titulo: "Enlaces a sitios de terceros",
      contenido: (
        <p>
          El sitio puede contener enlaces a páginas de terceros (redes sociales, fichas de reseñas,
          bancos de imágenes o recursos de ayuda). Estos enlaces se ofrecen únicamente como
          información. La titular no controla ni asume responsabilidad alguna sobre sus contenidos,
          sus políticas de privacidad ni sus prácticas. Recomendamos leer las condiciones de cada
          sitio antes de facilitar datos personales.
        </p>
      ),
    },
    {
      id: "datos",
      titulo: "Protección de datos y cookies",
      contenido: (
        <p>
          El tratamiento de los datos personales facilitados a través de esta web se rige por la{" "}
          <a href="/politica-de-privacidad">política de privacidad</a>, y el uso de dispositivos de
          almacenamiento en el terminal del usuario por la{" "}
          <a href="/politica-de-cookies">política de cookies</a>. Ambas forman parte inseparable de
          este aviso legal.
        </p>
      ),
    },
    {
      id: "legislacion",
      titulo: "Legislación aplicable y jurisdicción",
      contenido: (
        <>
          <p>
            Las presentes condiciones se rigen por la legislación española. Para la resolución de
            cualquier controversia derivada del acceso o uso del sitio, las partes se someten a los
            juzgados y tribunales del domicilio de la persona usuaria cuando esta tenga la condición
            de consumidora, conforme al Real Decreto Legislativo 1/2007.
          </p>
          <p>
            La persona usuaria puede acudir asimismo a la plataforma europea de resolución de
            litigios en línea de la Comisión Europea disponible en{" "}
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
              ec.europa.eu/consumers/odr
            </a>
            .
          </p>
        </>
      ),
    },
    {
      id: "modificaciones",
      titulo: "Modificaciones",
      contenido: (
        <p>
          La titular se reserva el derecho a modificar en cualquier momento la presentación, la
          configuración y los contenidos del sitio, así como el presente aviso legal, para
          adaptarlos a novedades legislativas o a cambios en la actividad. La fecha de la última
          revisión figura al inicio de esta página.
        </p>
      ),
    },
  ];

  return (
    <Layout>
      <PaginaLegal
        antetitulo="Aviso legal"
        titulo="Quién está detrás de esta"
        cursiva="web."
        entradilla="Información identificativa, condiciones de uso y responsabilidades, conforme a la Ley 34/2002 de Servicios de la Sociedad de la Información."
        secciones={secciones}
        pendientes={pendientes}
      />
    </Layout>
  );
}
