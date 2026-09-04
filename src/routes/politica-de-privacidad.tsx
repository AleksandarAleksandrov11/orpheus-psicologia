import { createFileRoute } from "@tanstack/react-router";

import { Layout } from "@/components/site/Layout";
import { PaginaLegal, Pendiente, type SeccionLegal } from "@/components/site/PaginaLegal";
import { SITE, esPendiente } from "@/content/site";
import { migasSchema, seo } from "@/lib/seo";

export const Route = createFileRoute("/politica-de-privacidad")({
  head: () =>
    seo({
      title: "Política de privacidad",
      description:
        "Cómo se tratan tus datos en Orpheus Psicología: finalidades, base jurídica, plazos de conservación, destinatarios y cómo ejercer tus derechos.",
      path: "/politica-de-privacidad",
      jsonLd: [
        migasSchema([
          { nombre: "Inicio", path: "/" },
          { nombre: "Política de privacidad", path: "/politica-de-privacidad" },
        ]),
      ],
    }),
  component: Privacidad,
});

function Dato({ valor }: { valor: string }) {
  return esPendiente(valor) ? <Pendiente>{valor}</Pendiente> : <strong>{valor}</strong>;
}

function Privacidad() {
  const pendientes = [SITE.titular.nif, SITE.titular.domicilio].filter(esPendiente).length;

  const secciones: SeccionLegal[] = [
    {
      id: "responsable",
      titulo: "Responsable del tratamiento",
      contenido: (
        <>
          <p>
            Tus datos personales son tratados por {SITE.titular.nombre}, {SITE.psicologa.titulo}, en
            calidad de responsable del tratamiento:
          </p>
          <ul>
            <li>
              <strong>Responsable:</strong> <Dato valor={SITE.titular.nombre} />
            </li>
            <li>
              <strong>NIF:</strong> <Dato valor={SITE.titular.nif} />
            </li>
            <li>
              <strong>Domicilio:</strong> <Dato valor={SITE.titular.domicilio} />
            </li>
            <li>
              <strong>Correo de contacto y de ejercicio de derechos:</strong>{" "}
              <a href={`mailto:${SITE.privacidad.email}`}>{SITE.privacidad.email}</a>
            </li>
          </ul>
          <p>
            Esta política se ha redactado conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley
            Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales
            (LOPDGDD).
          </p>
        </>
      ),
    },
    {
      id: "datos",
      titulo: "Qué datos se tratan",
      contenido: (
        <>
          <h3>A través del formulario de contacto</h3>
          <ul>
            <li>Nombre y apellidos.</li>
            <li>Dirección de correo electrónico.</li>
            <li>Teléfono, si decides facilitarlo.</li>
            <li>
              Motivo de consulta y modalidad preferida (online o presencial), que eliges de una
              lista cerrada.
            </li>
            <li>El contenido libre del mensaje que escribas.</li>
          </ul>
          <p>
            El mensaje puede incluir, por tu propia iniciativa, información relativa a tu salud. Se
            trata de una categoría especial de datos (art. 9 RGPD) y recibe la protección reforzada
            que se describe más abajo. Te recomendamos no detallar información clínica sensible en
            un primer correo: basta con indicar el motivo general de la consulta.
          </p>
          <h3>En el marco del proceso terapéutico</h3>
          <p>
            Si llegamos a iniciar un proceso, se generará documentación clínica (historia clínica)
            con datos identificativos, antecedentes, evolución y notas de sesión. Esta documentación
            se somete al régimen específico de la Ley 41/2002, básica reguladora de la autonomía del
            paciente y de derechos y obligaciones en materia de información y documentación clínica.
          </p>
          <h3>Datos de navegación</h3>
          <p>
            Si aceptas las cookies analíticas se recogen métricas agregadas y anónimas de uso de la
            web. No permiten identificarte ni elaborar perfiles. El detalle está en la{" "}
            <a href="/politica-de-cookies">política de cookies</a>.
          </p>
        </>
      ),
    },
    {
      id: "finalidades",
      titulo: "Con qué finalidad",
      contenido: (
        <ul>
          <li>Responder a tu consulta y facilitarte la información que solicitas.</li>
          <li>Gestionar la agenda y la cita de una primera sesión.</li>
          <li>
            Prestar asistencia psicológica y llevar la documentación clínica asociada, si llegas a
            iniciar un proceso terapéutico.
          </li>
          <li>Cumplir las obligaciones legales, contables y fiscales que resulten aplicables.</li>
          <li>
            Analizar de forma agregada el uso de la web para mejorarla, solo si has dado tu
            consentimiento a las cookies analíticas.
          </li>
        </ul>
      ),
    },
    {
      id: "base-juridica",
      titulo: "Base jurídica del tratamiento",
      contenido: (
        <>
          <div className="tabla-scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">Tratamiento</th>
                  <th scope="col">Base jurídica</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Responder a tu consulta</td>
                  <td>
                    Consentimiento que prestas al enviar el formulario (art. 6.1.a RGPD) y medidas
                    precontractuales a petición tuya (art. 6.1.b)
                  </td>
                </tr>
                <tr>
                  <td>Prestación de la asistencia psicológica</td>
                  <td>
                    Ejecución del contrato de servicios (art. 6.1.b) y, para los datos de salud,
                    art. 9.2.h RGPD: fines de asistencia sanitaria por profesional sujeta a
                    obligación de secreto, en relación con la Ley 41/2002
                  </td>
                </tr>
                <tr>
                  <td>Facturación y obligaciones fiscales</td>
                  <td>Cumplimiento de una obligación legal (art. 6.1.c RGPD)</td>
                </tr>
                <tr>
                  <td>Cookies analíticas</td>
                  <td>Tu consentimiento previo, revocable en cualquier momento (art. 6.1.a)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            No se realizan decisiones automatizadas ni elaboración de perfiles con efectos jurídicos
            sobre tu persona.
          </p>
        </>
      ),
    },
    {
      id: "conservacion",
      titulo: "Durante cuánto tiempo se conservan",
      contenido: (
        <ul>
          <li>
            <strong>Consultas que no derivan en un proceso:</strong> hasta un año desde la última
            comunicación, salvo que solicites antes su supresión.
          </li>
          <li>
            <strong>Documentación clínica:</strong> como mínimo cinco años desde la fecha del alta
            de cada proceso asistencial, según el artículo 17 de la Ley 41/2002 y la normativa
            autonómica aplicable.
          </li>
          <li>
            <strong>Datos de facturación:</strong> los plazos previstos en la normativa mercantil y
            tributaria (hasta seis años, art. 30 del Código de Comercio; cuatro años de prescripción
            fiscal).
          </li>
          <li>
            <strong>Registro del consentimiento de cookies:</strong> 24 meses, transcurridos los
            cuales se vuelve a solicitar.
          </li>
        </ul>
      ),
    },
    {
      id: "destinatarios",
      titulo: "Quién más accede a tus datos",
      contenido: (
        <>
          <p>
            No se ceden datos a terceros salvo obligación legal. Sí intervienen proveedores
            tecnológicos que actúan como <strong>encargados del tratamiento</strong>, con contrato
            firmado conforme al artículo 28 del RGPD:
          </p>
          <div className="tabla-scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">Proveedor</th>
                  <th scope="col">Servicio</th>
                  <th scope="col">Ubicación y garantías</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Vercel Inc.</td>
                  <td>Alojamiento del sitio web y analítica agregada</td>
                  <td>
                    EE. UU. y UE. Transferencias amparadas por cláusulas contractuales tipo de la
                    Comisión Europea y por el Data Privacy Framework
                  </td>
                </tr>
                <tr>
                  <td>Proveedor de correo electrónico</td>
                  <td>Recepción y custodia de los mensajes de contacto</td>
                  <td>Unión Europea o país con garantías adecuadas</td>
                </tr>
                <tr>
                  <td>Plataforma de videollamada</td>
                  <td>Realización de las sesiones online, con cifrado extremo a extremo</td>
                  <td>Unión Europea o país con garantías adecuadas</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            La documentación clínica no se aloja en servicios de terceros no cifrados ni se comparte
            con ninguna plataforma de analítica o publicidad.
          </p>
        </>
      ),
    },
    {
      id: "derechos",
      titulo: "Tus derechos",
      contenido: (
        <>
          <p>Puedes ejercer en cualquier momento los siguientes derechos:</p>
          <ul>
            <li>
              <strong>Acceso:</strong> saber qué datos tuyos se tratan y obtener una copia.
            </li>
            <li>
              <strong>Rectificación:</strong> corregir datos inexactos o incompletos.
            </li>
            <li>
              <strong>Supresión:</strong> solicitar su borrado cuando ya no sean necesarios, con los
              límites que impone la conservación obligatoria de la historia clínica.
            </li>
            <li>
              <strong>Oposición:</strong> oponerte a un tratamiento por motivos de tu situación
              particular.
            </li>
            <li>
              <strong>Limitación:</strong> pedir que se conserven sin tratarlos mientras se resuelve
              una reclamación.
            </li>
            <li>
              <strong>Portabilidad:</strong> recibir tus datos en formato estructurado y de uso
              común.
            </li>
            <li>
              <strong>Retirada del consentimiento</strong> en cualquier momento, sin que ello afecte
              a la licitud del tratamiento previo.
            </li>
          </ul>
          <p>
            Para ejercerlos basta con escribir a{" "}
            <a href={`mailto:${SITE.privacidad.email}`}>{SITE.privacidad.email}</a> indicando el
            derecho que deseas ejercer y adjuntando un documento que acredite tu identidad. La
            solicitud se atiende en el plazo máximo de un mes.
          </p>
        </>
      ),
    },
    {
      id: "reclamacion",
      titulo: "Reclamación ante la autoridad de control",
      contenido: (
        <p>
          Si consideras que el tratamiento de tus datos no se ajusta a la normativa, puedes
          presentar una reclamación ante la {SITE.privacidad.autoridad}. Antes, si lo prefieres,
          puedes escribirnos a{" "}
          <a href={`mailto:${SITE.privacidad.email}`}>{SITE.privacidad.email}</a> e intentaremos
          resolverlo directamente. Más información en{" "}
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
            www.aepd.es
          </a>
          .
        </p>
      ),
    },
    {
      id: "seguridad",
      titulo: "Medidas de seguridad",
      contenido: (
        <>
          <p>
            Se aplican las medidas técnicas y organizativas apropiadas para garantizar un nivel de
            seguridad adecuado al riesgo, teniendo en cuenta que se tratan datos de salud:
          </p>
          <ul>
            <li>Conexión cifrada mediante HTTPS en todo el sitio.</li>
            <li>Acceso a la documentación clínica restringido exclusivamente a la profesional.</li>
            <li>Videollamadas en plataformas con cifrado y sin grabación de las sesiones.</li>
            <li>Dispositivos con cifrado de disco y autenticación reforzada.</li>
            <li>Secreto profesional, que se mantiene incluso después de finalizar el proceso.</li>
          </ul>
          <p>
            El secreto profesional solo cede en los supuestos legalmente tasados: riesgo grave e
            inminente para tu vida o la de terceros, requerimiento judicial y los casos previstos en
            la legislación de protección de menores y personas en situación de vulnerabilidad.
          </p>
        </>
      ),
    },
    {
      id: "menores",
      titulo: "Menores de edad",
      contenido: (
        <p>
          El formulario de contacto está dirigido a personas mayores de 14 años. Para el tratamiento
          de datos de menores de esa edad es necesario el consentimiento de quien ostente la patria
          potestad o la tutela, conforme al artículo 7 de la LOPDGDD. En la atención a adolescentes,
          la información y el consentimiento se recaban de las figuras de referencia en los términos
          previstos en la Ley 41/2002.
        </p>
      ),
    },
    {
      id: "cambios",
      titulo: "Cambios en esta política",
      contenido: (
        <p>
          Esta política puede actualizarse para adaptarla a cambios normativos o a nuevos
          tratamientos. La versión vigente es siempre la publicada en esta página, con la fecha de
          revisión indicada al inicio. Si el cambio afecta de forma sustancial a tus derechos, se te
          informará por los medios de contacto disponibles.
        </p>
      ),
    },
  ];

  return (
    <Layout>
      <PaginaLegal
        antetitulo="Política de privacidad"
        titulo="Qué pasa con tus"
        cursiva="datos."
        entradilla="Aquí se explica, sin rodeos, qué información se recoge, para qué, durante cuánto tiempo y qué puedes hacer al respecto en cualquier momento."
        secciones={secciones}
        pendientes={pendientes}
      />
    </Layout>
  );
}
