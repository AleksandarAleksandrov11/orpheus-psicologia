import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Check,
  ChevronDown,
  Clock,
  Instagram,
  Mail,
  MapPin,
  Phone,
  TriangleAlert,
  Video,
} from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";

import { Layout } from "@/components/site/Layout";
import { LineasReveladas, Parallax, Reveal } from "@/components/site/motion";
import {
  Acordeon,
  Antetitulo,
  Boton,
  BotonEnlace,
  Lira,
  Migas,
  Numero,
} from "@/components/site/ui";
import { CTA_FINAL, ESPACIOS, FAQ } from "@/content/copy";
import { SITE, esPendiente } from "@/content/site";
import { absolute, migasSchema, seo } from "@/lib/seo";

import texMontanas from "@/assets/tex-montanas.webp";
import texMontanasSm from "@/assets/tex-montanas@sm.webp";

/** Nodo ContactPage: describe la página como punto de contacto de la consulta. */
function contactoSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contacto · ${SITE.name}`,
    url: absolute("/contacto"),
    inLanguage: "es-ES",
    description:
      "Formulario de contacto para solicitar información o reservar una primera sesión con Melissa González, psicóloga general sanitaria.",
    mainEntity: {
      "@type": "ProfessionalService",
      name: SITE.name,
      email: SITE.contacto.email,
      availableLanguage: "es",
      areaServed: [
        { "@type": "Country", name: "España" },
        { "@type": "City", name: SITE.contacto.ciudad },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Solicitud de primera sesión",
        email: SITE.contacto.email,
        availableLanguage: "es",
      },
    },
  };
}

export const Route = createFileRoute("/contacto")({
  head: () =>
    seo({
      title: "Contacto",
      description:
        "Escríbeme y te respondo personalmente en un máximo de 48 h laborables. Terapia online en toda España y presencial en Madrid con Melissa González.",
      path: "/contacto",
      image: "/og/og-contacto.jpg",
      imageAlt: "Orpheus Psicología: no tienes que tenerlo todo claro para empezar",
      keywords: [
        "contactar psicóloga",
        "reservar sesión psicología",
        "psicóloga online España",
        "psicóloga Madrid",
        "primera sesión terapia",
        "Melissa González psicóloga",
      ],
      jsonLd: [
        migasSchema([
          { nombre: "Inicio", path: "/" },
          { nombre: "Contacto", path: "/contacto" },
        ]),
        contactoSchema(),
      ],
    }),
  component: Contacto,
});

/* ══════════════════════════════════════════════════════════════════
   DATOS DEL FORMULARIO
   ══════════════════════════════════════════════════════════════════ */

type Datos = {
  nombre: string;
  email: string;
  telefono: string;
  motivo: string;
  modalidad: string;
  mensaje: string;
  consentimiento: boolean;
};

type Clave = "nombre" | "email" | "consentimiento";

/** Orden de foco cuando la validación falla. */
const ORDEN_CAMPOS: Clave[] = ["nombre", "email", "consentimiento"];

const INICIAL: Datos = {
  nombre: "",
  email: "",
  telefono: "",
  motivo: "",
  modalidad: "indiferente",
  mensaje: "",
  consentimiento: false,
};

const MODALIDADES = [
  { valor: "online", etiqueta: "Online (lo habitual)" },
  { valor: "presencial", etiqueta: `Presencial en ${SITE.contacto.ciudad}, si hay hueco` },
  { valor: "indiferente", etiqueta: "Me da igual / aún no lo sé" },
];

const PASOS = [
  {
    titulo: "Te respondo yo misma",
    texto:
      "Leo tu mensaje y te contesto personalmente en un máximo de 48 horas laborables. Sin secretarías, sin respuestas automáticas y sin que tengas que explicar nada dos veces.",
  },
  {
    titulo: "Acordamos una primera sesión",
    texto:
      "Buscamos un hueco que te encaje. La consulta trabaja sobre todo online, y si necesitas vernos en Madrid lo valoramos. Te confirmo por correo el día, la hora y cómo conectarnos.",
  },
  {
    titulo: "Decides si quieres seguir",
    texto:
      "Esa primera sesión sirve para contarme qué te trae y para comprobar si te sientes a gusto conmigo. No hay compromiso: si creo que otra profesional puede ayudarte mejor, te lo diré.",
  },
];

/* ══════════════════════════════════════════════════════════════════
   VALIDACIÓN Y COMPOSICIÓN DEL CORREO
   ══════════════════════════════════════════════════════════════════ */

function validar(d: Datos): Partial<Record<Clave, string>> {
  const errores: Partial<Record<Clave, string>> = {};
  if (!d.nombre.trim()) {
    errores.nombre = "Dime cómo te llamas para saber cómo dirigirme a ti.";
  }
  if (!d.email.trim()) {
    errores.email = "Necesito un correo para poder responderte.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) {
    errores.email = "Revisa el correo: parece que le falta algo.";
  }
  if (!d.consentimiento) {
    errores.consentimiento = "Sin tu consentimiento no puedo tratar tus datos para responderte.";
  }
  return errores;
}

/** Como no hay servidor, el envío abre el cliente de correo con todo redactado. */
function componerMailto(d: Datos): string {
  const espacio = ESPACIOS.find((e) => e.slug === d.motivo);
  const motivo = espacio ? espacio.titulo : d.motivo === "otro" ? "Otro" : "Sin especificar";
  const modalidad = MODALIDADES.find((m) => m.valor === d.modalidad)?.etiqueta ?? "Sin especificar";

  const asunto = `Primer contacto de ${d.nombre.trim()}`;
  const ficha = [
    `Nombre: ${d.nombre.trim()}`,
    `Email: ${d.email.trim()}`,
    ...(d.telefono.trim() ? [`Teléfono: ${d.telefono.trim()}`] : []),
    `Motivo de consulta: ${motivo}`,
    `Modalidad preferida: ${modalidad}`,
  ];
  const cuerpo = [
    ficha.join("\n"),
    `Mensaje:\n${d.mensaje.trim() || "(sin mensaje)"}`,
    "He leído la política de privacidad y consiento el tratamiento de mis datos para responder a esta consulta.",
  ].join("\n\n");

  return `mailto:${SITE.contacto.email}?subject=${encodeURIComponent(
    asunto,
  )}&body=${encodeURIComponent(cuerpo)}`;
}

/* ══════════════════════════════════════════════════════════════════
   PÁGINA
   ══════════════════════════════════════════════════════════════════ */

function Contacto() {
  const [datos, setDatos] = useState<Datos>(INICIAL);
  const [errores, setErrores] = useState<Partial<Record<Clave, string>>>({});
  const [enlace, setEnlace] = useState("");
  const [enviado, setEnviado] = useState(false);

  const hayTelefono = !esPendiente(SITE.contacto.telefono);
  const hayDireccion = !esPendiente(SITE.contacto.direccion);
  const hayErrores = Object.keys(errores).length > 0;

  const actualizar = <K extends keyof Datos>(clave: K, valor: Datos[K]) => {
    setDatos((previo) => ({ ...previo, [clave]: valor }));
    setErrores((previo) => {
      if (!(clave in previo)) return previo;
      const siguiente = { ...previo };
      delete siguiente[clave as Clave];
      return siguiente;
    });
  };

  const enviar = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const nuevos = validar(datos);
    setErrores(nuevos);

    const primerFallo = ORDEN_CAMPOS.find((c) => nuevos[c]);
    if (primerFallo) {
      document.getElementById(`campo-${primerFallo}`)?.focus();
      return;
    }

    const href = componerMailto(datos);
    setEnlace(href);
    setEnviado(true);
    window.location.href = href;
  };

  const describir = (clave: Clave, ayuda?: string) => {
    const ids = [ayuda, errores[clave] ? `campo-${clave}-error` : undefined].filter(Boolean);
    return ids.length ? ids.join(" ") : undefined;
  };

  return (
    <Layout>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="aurora grain relative overflow-hidden pt-28 pb-12 md:pt-40 md:pb-24">
        <Parallax
          amount={-30}
          className="pointer-events-none absolute -top-44 -left-36 -z-10 h-[34rem] w-[34rem] rounded-full bg-olive/15 blur-3xl"
        >
          <span className="anim-breathe block h-full w-full" />
        </Parallax>

        <div className="relative z-10 shell">
          <Migas items={[{ nombre: "Inicio", path: "/" }, { nombre: "Contacto" }]} />

          <div className="max-w-4xl">
            <p className="eyebrow anim-fade flex items-center gap-3 text-olive">
              <span aria-hidden="true" className="inline-block h-px w-8 bg-olive/50" />
              {CTA_FINAL.eyebrow}
            </p>

            {/* CTA_FINAL.titulo, partido en líneas para el revelado */}
            <LineasReveladas
              lineas={["No tienes que tenerlo", "todo claro", "para empezar."]}
              cursiva={1}
              delay={120}
              className="display-xl mt-7 text-ink"
            />

            <p className="lede anim-fade-up mt-8 max-w-2xl" style={{ animationDelay: "0.55s" }}>
              Cuéntame qué te trae y decidimos juntos el siguiente paso. Respondo yo misma.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FORMULARIO + COLUMNA LATERAL ═══════════════════ */}
      <section className="section-y" aria-labelledby="formulario-titulo">
        <div className="shell grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
          {/* ── Formulario ── */}
          <Reveal variant="up">
            <div className="card-paper p-7 md:p-11">
              <Antetitulo>Escríbeme</Antetitulo>
              <h2 id="formulario-titulo" className="display-sm mt-5 text-ink">
                Cuéntame qué te <em className="italic">trae</em>.
              </h2>
              <p className="mt-4 max-w-lg text-[1.02rem] leading-relaxed font-light text-ink-muted">
                No hace falta que lo tengas ordenado ni que uses las palabras correctas. Con unas
                líneas basta para empezar.
              </p>

              {enviado ? (
                <div className="mt-9 rounded-2xl border border-rule bg-paper/70 p-7 md:p-8">
                  <span className="grid size-11 place-items-center rounded-full bg-moss text-bone">
                    <Check className="size-5" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-[1.6rem] leading-tight text-ink md:text-[1.9rem]">
                    Tu mensaje está redactado.
                  </h3>
                  <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed font-light text-ink-muted">
                    Se ha abierto tu programa de correo con todos los datos preparados. Solo queda
                    que lo envíes desde ahí. {SITE.contacto.respuesta}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href={enlace} className="btn-base btn-fill btn-solid">
                      <span className="relative z-10">Abrir el correo otra vez</span>
                    </a>
                    <Boton
                      type="button"
                      variante="outline"
                      onClick={() => {
                        setEnviado(false);
                        setEnlace("");
                        setDatos(INICIAL);
                      }}
                    >
                      Escribir otro mensaje
                    </Boton>
                  </div>
                  <p className="mt-6 text-[0.89rem] font-light text-ink-faint">
                    ¿No se ha abierto nada? Escríbeme directamente a{" "}
                    <a href={`mailto:${SITE.contacto.email}`} className="link-draw text-cypress">
                      {SITE.contacto.email}
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <form onSubmit={enviar} noValidate className="mt-9">
                  <div className="grid gap-7 sm:grid-cols-2">
                    <Campo id="campo-nombre" etiqueta="Nombre" obligatorio error={errores.nombre}>
                      <input
                        id="campo-nombre"
                        name="nombre"
                        type="text"
                        autoComplete="name"
                        required
                        className="field"
                        placeholder="Cómo quieres que te llame"
                        value={datos.nombre}
                        onChange={(e) => actualizar("nombre", e.target.value)}
                        aria-invalid={errores.nombre ? true : undefined}
                        aria-describedby={describir("nombre")}
                      />
                    </Campo>

                    <Campo id="campo-email" etiqueta="Correo" obligatorio error={errores.email}>
                      <input
                        id="campo-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="field"
                        placeholder="tucorreo@ejemplo.com"
                        value={datos.email}
                        onChange={(e) => actualizar("email", e.target.value)}
                        aria-invalid={errores.email ? true : undefined}
                        aria-describedby={describir("email")}
                      />
                    </Campo>

                    <Campo
                      id="campo-telefono"
                      etiqueta="Teléfono"
                      ayuda="Opcional. Solo si prefieres que te escriba por ahí."
                    >
                      <input
                        id="campo-telefono"
                        name="telefono"
                        type="tel"
                        autoComplete="tel"
                        className="field"
                        placeholder="Opcional"
                        value={datos.telefono}
                        onChange={(e) => actualizar("telefono", e.target.value)}
                        aria-describedby="campo-telefono-ayuda"
                      />
                    </Campo>

                    <Campo id="campo-motivo" etiqueta="Motivo de consulta">
                      <div className="relative">
                        <select
                          id="campo-motivo"
                          name="motivo"
                          className="field appearance-none"
                          style={{ paddingRight: "1.75rem" }}
                          value={datos.motivo}
                          onChange={(e) => actualizar("motivo", e.target.value)}
                        >
                          <option value="">Prefiero no concretarlo</option>
                          {ESPACIOS.map((espacio) => (
                            <option key={espacio.slug} value={espacio.slug}>
                              {espacio.titulo}
                            </option>
                          ))}
                          <option value="otro">Otro</option>
                        </select>
                        <ChevronDown
                          aria-hidden="true"
                          strokeWidth={1.5}
                          className="pointer-events-none absolute top-1/2 right-1 size-4 -translate-y-1/2 text-ink-faint"
                        />
                      </div>
                    </Campo>
                  </div>

                  <fieldset className="mt-8">
                    <legend className="eyebrow text-ink-faint">¿Cómo prefieres vernos?</legend>
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {MODALIDADES.map((m) => (
                        <label
                          key={m.valor}
                          className="cursor-pointer rounded-full border border-rule-strong px-4 py-2.5 text-[0.93rem] font-light text-ink-muted transition-colors duration-500 hover:border-olive has-[:checked]:border-moss has-[:checked]:bg-moss has-[:checked]:text-bone has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cypress"
                        >
                          <input
                            type="radio"
                            name="modalidad"
                            value={m.valor}
                            className="sr-only"
                            checked={datos.modalidad === m.valor}
                            onChange={() => actualizar("modalidad", m.valor)}
                          />
                          {m.etiqueta}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <Campo
                    id="campo-mensaje"
                    etiqueta="Mensaje"
                    className="mt-8"
                    ayuda="Lo que quieras contarme. Nada de esto sale de aquí."
                  >
                    <textarea
                      id="campo-mensaje"
                      name="mensaje"
                      rows={5}
                      className="field resize-none"
                      placeholder="Llevo un tiempo sintiendo que…"
                      value={datos.mensaje}
                      onChange={(e) => actualizar("mensaje", e.target.value)}
                      aria-describedby="campo-mensaje-ayuda"
                    />
                  </Campo>

                  {/* Consentimiento RGPD — requisito legal, no adorno */}
                  <div
                    className={`mt-9 rounded-2xl border p-6 transition-colors duration-500 md:p-7 ${
                      errores.consentimiento
                        ? "border-destructive/50 bg-paper"
                        : "border-rule bg-paper/60"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <input
                        id="campo-consentimiento"
                        name="consentimiento"
                        type="checkbox"
                        required
                        className="mt-1 size-4 shrink-0 accent-moss"
                        checked={datos.consentimiento}
                        onChange={(e) => actualizar("consentimiento", e.target.checked)}
                        aria-invalid={errores.consentimiento ? true : undefined}
                        aria-describedby={describir("consentimiento", "campo-consentimiento-ayuda")}
                      />
                      <div>
                        <label
                          htmlFor="campo-consentimiento"
                          className="block cursor-pointer text-[0.99rem] leading-relaxed font-light text-ink"
                        >
                          He leído la política de privacidad y consiento el tratamiento de mis datos
                          con la única finalidad de responder a esta consulta.
                          <span aria-hidden="true" className="ml-1 text-olive">
                            *
                          </span>
                        </label>
                        <p
                          id="campo-consentimiento-ayuda"
                          className="mt-2.5 text-[0.89rem] leading-relaxed font-light text-ink-faint"
                        >
                          Responsable: {SITE.titular.nombre}. Tus datos no se ceden a terceros ni se
                          usan para enviar comunicaciones comerciales, y puedes retirar el
                          consentimiento cuando quieras escribiendo a {SITE.privacidad.email}. Todo
                          el detalle está en la{" "}
                          <Link to="/politica-de-privacidad" className="link-draw text-cypress">
                            política de privacidad
                          </Link>
                          .
                        </p>
                      </div>
                    </div>
                    {errores.consentimiento ? (
                      <p
                        id="campo-consentimiento-error"
                        className="mt-3 flex items-start gap-1.5 text-[0.86rem] text-destructive"
                      >
                        <TriangleAlert
                          className="mt-0.5 size-3.5 shrink-0"
                          strokeWidth={1.7}
                          aria-hidden="true"
                        />
                        {errores.consentimiento}
                      </p>
                    ) : null}
                  </div>

                  <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                    <Boton type="submit" flecha>
                      Enviar mensaje
                    </Boton>
                    <p className="text-[0.89rem] font-light text-ink-faint">
                      Los campos con <span className="text-olive">*</span> son obligatorios.
                    </p>
                  </div>

                  <p
                    role="alert"
                    className={`text-[0.93rem] text-destructive ${hayErrores ? "mt-4" : "sr-only"}`}
                  >
                    {hayErrores ? "Revisa los campos marcados antes de enviar." : ""}
                  </p>
                </form>
              )}
            </div>
          </Reveal>

          {/* ── Columna lateral ── */}
          <div className="space-y-8 lg:sticky lg:top-32 lg:self-start">
            <Reveal delay={90}>
              <div className="rounded-2xl border border-rule bg-linen p-7 md:p-9">
                <p className="eyebrow text-ink-faint">Directo</p>
                <a
                  href={`mailto:${SITE.contacto.email}`}
                  className="group mt-5 flex items-start gap-3 font-display text-[1.15rem] leading-snug text-ink transition-colors duration-500 hover:text-cypress"
                >
                  <Mail className="mt-1.5 size-4 shrink-0 text-olive" strokeWidth={1.6} />
                  <span className="break-all">{SITE.contacto.email}</span>
                </a>
                <a
                  href={SITE.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-3 text-[1.01rem] font-light text-ink-muted transition-colors duration-500 hover:text-cypress"
                >
                  <Instagram className="size-4 shrink-0 text-olive" strokeWidth={1.6} />
                  {SITE.social.instagramHandle}
                </a>
                {hayTelefono ? (
                  <a
                    href={`tel:${SITE.contacto.telefono.replace(/\s/g, "")}`}
                    className="mt-4 flex items-center gap-3 text-[1.01rem] font-light text-ink-muted transition-colors duration-500 hover:text-cypress"
                  >
                    <Phone className="size-4 shrink-0 text-olive" strokeWidth={1.6} />
                    {SITE.contacto.telefono}
                  </a>
                ) : null}
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="rounded-2xl border border-rule bg-linen p-7 md:p-9">
                <p className="eyebrow text-ink-faint">Modalidades</p>
                <ul className="mt-5 space-y-3.5">
                  {SITE.modalidades.map((m, i) => {
                    const Icono = i === 0 ? Video : MapPin;
                    return (
                      <li
                        key={m}
                        className="flex items-start gap-3 text-[1.01rem] leading-relaxed font-light text-ink-muted"
                      >
                        <Icono
                          className="mt-0.5 size-4 shrink-0 text-olive"
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                        {m}
                      </li>
                    );
                  })}
                </ul>
                {hayDireccion ? (
                  <p className="mt-5 border-t border-rule pt-5 text-[0.96rem] leading-relaxed font-light text-ink-faint">
                    {SITE.contacto.direccion}
                  </p>
                ) : null}
              </div>
            </Reveal>

            <Reveal delay={230}>
              <div className="rounded-2xl border border-rule bg-paper p-7">
                <p className="eyebrow text-ink-faint">Horario y respuesta</p>
                <p className="mt-5 flex items-start gap-3 text-[1.01rem] leading-relaxed font-light text-ink-muted">
                  <Clock
                    className="mt-0.5 size-4 shrink-0 text-olive"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  {SITE.contacto.horario}
                </p>
                <hr className="rule-fade my-5" />
                <p className="cita-menor text-[1.2rem] leading-snug text-cypress">
                  {SITE.contacto.respuesta}
                </p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex items-center gap-4 px-1">
                <Lira className="h-7 w-7 shrink-0 text-cedar" trazo={2.6} />
                <p className="text-[0.93rem] leading-relaxed font-light text-ink-faint">
                  Todo lo que escribas aquí queda protegido por el secreto profesional.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════ QUÉ PASA DESPUÉS ═══════════════════ */}
      <section
        className="relative isolate overflow-hidden bg-moss text-on-dark"
        aria-labelledby="despues-titulo"
      >
        <Parallax amount={60} className="absolute inset-0 -z-10 scale-110">
          <img
            src={texMontanas}
            srcSet={`${texMontanasSm} 900w, ${texMontanas} 1800w`}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1800}
            height={1012}
            className="h-full w-full object-cover opacity-25"
          />
        </Parallax>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-moss via-moss/85 to-moss"
        />
        <div className="grain-dark absolute inset-0 -z-10" aria-hidden="true" />

        <div className="on-dark shell section-y relative">
          <div className="max-w-2xl">
            <Reveal>
              <Antetitulo oscuro>Después de darle a enviar</Antetitulo>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="despues-titulo" className="display-md mt-6 text-on-dark">
                Qué pasa cuando me <em className="italic">escribes</em>.
              </h2>
            </Reveal>
          </div>

          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-on-dark/15 md:mt-16 md:grid-cols-3">
            {PASOS.map((paso, i) => (
              <Reveal
                as="li"
                key={paso.titulo}
                delay={i * 110}
                className="bg-on-dark/[0.04] p-7 md:p-9"
              >
                <Numero oscuro>{String(i + 1).padStart(2, "0")}</Numero>
                <h3 className="mt-6 font-display text-[1.45rem] leading-tight text-on-dark md:text-[1.65rem]">
                  {paso.titulo}
                </h3>
                <p className="mt-3 text-[1.02rem] leading-relaxed font-light text-on-dark-muted">
                  {paso.texto}
                </p>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={140} className="mt-12">
            <p className="max-w-2xl text-[1.02rem] leading-relaxed font-light text-on-dark-faint">
              Si prefieres saltarte el formulario, escribe directamente a{" "}
              <a href={`mailto:${SITE.contacto.email}`} className="link-draw text-on-dark-muted">
                {SITE.contacto.email}
              </a>
              . Llega al mismo sitio.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ MINI FAQ ═══════════════════ */}
      <section className="section-y" aria-labelledby="preguntas-titulo">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <Antetitulo>Antes de escribir</Antetitulo>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="preguntas-titulo" className="display-md mt-6">
                Cuatro dudas que suelen frenar el <em className="italic">primer</em> paso.
              </h2>
            </Reveal>
            <Reveal delay={160} className="mt-8">
              <BotonEnlace to="/preguntas-frecuentes" variante="outline">
                Ver todas las preguntas
              </BotonEnlace>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <Acordeon items={FAQ.slice(0, 4)} abiertoInicial={0} />
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}

/* ══════════════════════════════════════════════════════════════════
   CAMPO — etiqueta, control, ayuda y error asociados por id
   ══════════════════════════════════════════════════════════════════ */

function Campo({
  id,
  etiqueta,
  children,
  obligatorio = false,
  error,
  ayuda,
  className = "",
}: {
  id: string;
  etiqueta: string;
  children: ReactNode;
  obligatorio?: boolean;
  error?: string;
  ayuda?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow block text-ink-faint">
        {etiqueta}
        {obligatorio ? (
          <span aria-hidden="true" className="ml-1 text-olive">
            *
          </span>
        ) : null}
      </label>
      <div className="mt-1.5">{children}</div>
      {ayuda ? (
        <p id={`${id}-ayuda`} className="mt-2 text-[0.76rem] font-light text-ink-faint">
          {ayuda}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${id}-error`}
          className="mt-2 flex items-start gap-1.5 text-[0.86rem] text-destructive"
        >
          <TriangleAlert
            className="mt-0.5 size-3.5 shrink-0"
            strokeWidth={1.7}
            aria-hidden="true"
          />
          {error}
        </p>
      ) : null}
    </div>
  );
}
