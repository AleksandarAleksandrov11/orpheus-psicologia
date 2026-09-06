import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Quote, Users } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Layout } from "@/components/site/Layout";
import { LineasReveladas, Parallax, Reveal } from "@/components/site/motion";
import { Antetitulo, Boton, BotonEnlace, Cita, Migas, Numero } from "@/components/site/ui";
import { EMPRESAS } from "@/content/copy";
import { RESENAS_EMPRESA } from "@/content/resenas";
import { SITE } from "@/content/site";
import { absolute, migasSchema, seo } from "@/lib/seo";

import { CtaFinal } from "./index";

import texMontanas from "@/assets/tex-montanas.webp";
import texMontanasSm from "@/assets/tex-montanas@sm.webp";

/** Servicio B2B descrito para los buscadores. */
function servicioEmpresasSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Bienestar emocional para empresas y equipos",
    serviceType: "Psicología organizacional y bienestar emocional",
    description:
      "Talleres, charlas y acompañamiento psicológico individual para equipos de trabajo, con facturación a empresa.",
    provider: { "@id": `${SITE.url}/#organizacion` },
    areaServed: { "@type": "Country", name: "España" },
    url: absolute("/empresas"),
    audience: { "@type": "BusinessAudience", name: "Empresas y equipos de trabajo" },
  };
}

export const Route = createFileRoute("/empresas")({
  head: () =>
    seo({
      title: "Bienestar emocional para empresas y equipos",
      description:
        "Talleres, charlas y acompañamiento psicológico para equipos: gestión emocional, límites y prevención del desgaste profesional. Propuesta y presupuesto a medida.",
      path: "/empresas",
      image: "/og/og-empresas.jpg",
      imageAlt: "Orpheus Psicología: bienestar emocional en entornos de trabajo",
      keywords: [
        "bienestar emocional empresas",
        "psicóloga para empresas",
        "talleres gestión emocional empresa",
        "prevención burnout equipos",
        "formación bienestar laboral",
        "psicología organizacional Madrid",
      ],
      jsonLd: [
        migasSchema([
          { nombre: "Inicio", path: "/" },
          { nombre: "Para empresas", path: "/empresas" },
        ]),
        servicioEmpresasSchema(),
      ],
    }),
  component: Empresas,
});

/* ══════════════════════════════════════════════════════════════════
   SOLICITUD DE PRESUPUESTO
   Sin servidor: el formulario redacta el correo con todo el detalle.
   Cuando Melissa facilite el código de su simulador, sustituye a este
   bloque conservando el mismo ancla (#presupuesto).
   ══════════════════════════════════════════════════════════════════ */

const SERVICIOS_B2B = [
  { valor: "taller", etiqueta: "Taller o formación práctica" },
  { valor: "acompanamiento", etiqueta: "Acompañamiento individual para el equipo" },
  { valor: "charla", etiqueta: "Charla o jornada de bienestar" },
  { valor: "mixto", etiqueta: "Una combinación de varios" },
  { valor: "no-lo-se", etiqueta: "Todavía no lo tengo claro" },
] as const;

const TAMANOS = [
  { valor: "1-10", etiqueta: "Hasta 10 personas" },
  { valor: "11-30", etiqueta: "Entre 11 y 30" },
  { valor: "31-75", etiqueta: "Entre 31 y 75" },
  { valor: "76+", etiqueta: "Más de 75" },
] as const;

type Solicitud = {
  empresa: string;
  contacto: string;
  email: string;
  tamano: string;
  servicio: string;
  detalle: string;
};

const INICIAL: Solicitud = {
  empresa: "",
  contacto: "",
  email: "",
  tamano: TAMANOS[1].valor,
  servicio: SERVICIOS_B2B[0].valor,
  detalle: "",
};

function componerMailto(d: Solicitud): string {
  const servicio = SERVICIOS_B2B.find((s) => s.valor === d.servicio)?.etiqueta ?? d.servicio;
  const tamano = TAMANOS.find((t) => t.valor === d.tamano)?.etiqueta ?? d.tamano;
  const cuerpo = [
    `Empresa: ${d.empresa.trim()}`,
    `Persona de contacto: ${d.contacto.trim()}`,
    `Email: ${d.email.trim()}`,
    `Tamaño del equipo: ${tamano}`,
    `Servicio de interés: ${servicio}`,
    "",
    `Qué necesita el equipo:\n${d.detalle.trim() || "(sin detallar)"}`,
  ].join("\n");

  return `mailto:${SITE.contacto.email}?subject=${encodeURIComponent(
    `Presupuesto para equipos · ${d.empresa.trim() || "empresa"}`,
  )}&body=${encodeURIComponent(cuerpo)}`;
}

function FormularioPresupuesto() {
  const [datos, setDatos] = useState<Solicitud>(INICIAL);
  const [errores, setErrores] = useState<Partial<Record<keyof Solicitud, string>>>({});
  const [enlace, setEnlace] = useState("");

  const actualizar = <K extends keyof Solicitud>(clave: K, valor: Solicitud[K]) => {
    setDatos((previo) => ({ ...previo, [clave]: valor }));
    setErrores((previo) => {
      if (!(clave in previo)) return previo;
      const siguiente = { ...previo };
      delete siguiente[clave];
      return siguiente;
    });
  };

  const enviar = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const fallos: Partial<Record<keyof Solicitud, string>> = {};
    if (!datos.empresa.trim()) fallos.empresa = "Dime el nombre de la empresa o del equipo.";
    if (!datos.email.trim()) {
      fallos.email = "Necesito un correo para enviarte la propuesta.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(datos.email.trim())) {
      fallos.email = "Revisa el correo: parece que le falta algo.";
    }
    setErrores(fallos);

    const primero = (["empresa", "email"] as const).find((c) => fallos[c]);
    if (primero) {
      document.getElementById(`b2b-${primero}`)?.focus();
      return;
    }

    const href = componerMailto(datos);
    setEnlace(href);
    window.location.href = href;
  };

  return (
    <form onSubmit={enviar} noValidate className="mt-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="b2b-empresa" className="eyebrow text-ink-faint">
            Empresa o equipo
          </label>
          <input
            id="b2b-empresa"
            name="empresa"
            type="text"
            autoComplete="organization"
            value={datos.empresa}
            onChange={(e) => actualizar("empresa", e.target.value)}
            aria-invalid={errores.empresa ? true : undefined}
            aria-describedby={errores.empresa ? "b2b-empresa-error" : undefined}
            className="field mt-3"
          />
          {errores.empresa ? (
            <p id="b2b-empresa-error" className="mt-2 text-[0.87rem] text-destructive">
              {errores.empresa}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="b2b-contacto" className="eyebrow text-ink-faint">
            Tu nombre
          </label>
          <input
            id="b2b-contacto"
            name="contacto"
            type="text"
            autoComplete="name"
            value={datos.contacto}
            onChange={(e) => actualizar("contacto", e.target.value)}
            className="field mt-3"
          />
        </div>

        <div>
          <label htmlFor="b2b-email" className="eyebrow text-ink-faint">
            Correo de contacto
          </label>
          <input
            id="b2b-email"
            name="email"
            type="email"
            autoComplete="email"
            value={datos.email}
            onChange={(e) => actualizar("email", e.target.value)}
            aria-invalid={errores.email ? true : undefined}
            aria-describedby={errores.email ? "b2b-email-error" : undefined}
            className="field mt-3"
          />
          {errores.email ? (
            <p id="b2b-email-error" className="mt-2 text-[0.87rem] text-destructive">
              {errores.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="b2b-tamano" className="eyebrow text-ink-faint">
            Tamaño del equipo
          </label>
          <select
            id="b2b-tamano"
            name="tamano"
            value={datos.tamano}
            onChange={(e) => actualizar("tamano", e.target.value)}
            className="field mt-3 appearance-none"
          >
            {TAMANOS.map((t) => (
              <option key={t.valor} value={t.valor}>
                {t.etiqueta}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="b2b-servicio" className="eyebrow text-ink-faint">
            Qué os interesa
          </label>
          <select
            id="b2b-servicio"
            name="servicio"
            value={datos.servicio}
            onChange={(e) => actualizar("servicio", e.target.value)}
            className="field mt-3 appearance-none"
          >
            {SERVICIOS_B2B.map((s) => (
              <option key={s.valor} value={s.valor}>
                {s.etiqueta}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="b2b-detalle" className="eyebrow text-ink-faint">
            Qué necesita tu equipo
          </label>
          <textarea
            id="b2b-detalle"
            name="detalle"
            rows={4}
            value={datos.detalle}
            onChange={(e) => actualizar("detalle", e.target.value)}
            className="field mt-3 resize-none"
            placeholder="Carga de trabajo, rotación, conflictos, agotamiento, una semana de bienestar…"
          />
        </div>
      </div>

      <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Boton type="submit">Pedir propuesta</Boton>
        <p className="max-w-sm text-[0.9rem] leading-relaxed font-light text-ink-faint">
          {EMPRESAS.simulador.nota}
        </p>
      </div>

      {enlace ? (
        <p className="mt-6 text-[0.93rem] font-light text-ink-muted">
          Si tu gestor de correo no se ha abierto,{" "}
          <a href={enlace} className="link-undraw text-cypress">
            pulsa aquí para enviarlo
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PÁGINA
   ══════════════════════════════════════════════════════════════════ */

function Empresas() {
  return (
    <Layout>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="aurora grain relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <Parallax
          amount={-32}
          className="pointer-events-none absolute -top-40 -right-36 -z-10 h-[34rem] w-[34rem] rounded-full bg-cedar/25 blur-3xl"
        >
          <span className="anim-breathe block h-full w-full" />
        </Parallax>

        <div className="relative z-10 shell">
          <Migas items={[{ nombre: "Inicio", path: "/" }, { nombre: "Para empresas" }]} />

          <div className="grid gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:items-end lg:gap-20">
            <div>
              <p className="eyebrow anim-fade flex items-center gap-3 text-olive">
                <span aria-hidden="true" className="inline-block h-px w-8 bg-olive/50" />
                {EMPRESAS.eyebrow}
              </p>

              <LineasReveladas
                lineas={["Bienestar emocional", "en entornos", "de trabajo."]}
                cursiva={2}
                delay={120}
                className="display-xl mt-7 text-ink"
              />

              <p className="lede anim-fade-up mt-8 max-w-xl" style={{ animationDelay: "0.55s" }}>
                {EMPRESAS.entradilla}
              </p>

              <div
                className="anim-fade-up mt-10 flex flex-wrap gap-3"
                style={{ animationDelay: "0.68s" }}
              >
                <BotonEnlace to="/empresas" hash="presupuesto">
                  {EMPRESAS.cta}
                </BotonEnlace>
              </div>
            </div>

            {/* Reseña real de una empresa que ya ha hecho la intervención */}
            {RESENAS_EMPRESA.slice(0, 1).map((r) => (
              <Reveal key={r.nombre} delay={280} variant="blur">
                <div className="rounded-2xl border border-rule bg-linen/85 p-7 backdrop-blur-sm md:p-9">
                  <Quote aria-hidden="true" strokeWidth={1} className="size-7 text-olive/45" />
                  <blockquote className="mt-4 font-display text-[1.18rem] leading-snug text-ink md:text-[1.32rem]">
                    «{r.texto}»
                  </blockquote>
                  <footer className="mt-6 border-t border-rule pt-4">
                    <p className="text-[0.93rem] text-ink">{r.nombre}</p>
                    {r.verificada ? (
                      <p className="eyebrow mt-3 flex items-center gap-1.5 text-cypress">
                        <BadgeCheck className="size-3.5" strokeWidth={1.7} aria-hidden="true" />
                        Verificada en Google
                      </p>
                    ) : null}
                  </footer>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ EL PROBLEMA ═══════════════════ */}
      <section
        className="relative isolate overflow-hidden bg-moss text-on-dark"
        aria-labelledby="desgaste-titulo"
      >
        <Parallax amount={70} className="absolute inset-0 -z-10 scale-110">
          <img
            src={texMontanas}
            srcSet={`${texMontanasSm} 800w, ${texMontanas} 1600w`}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1600}
            height={1000}
            className="h-full w-full object-cover opacity-25"
          />
        </Parallax>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-moss via-moss/85 to-cypress"
        />
        <div className="grain-dark absolute inset-0 -z-10" aria-hidden="true" />

        <div className="on-dark shell section-y-sm relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <Reveal>
              <Users className="size-10 text-on-dark/30" strokeWidth={1.1} aria-hidden="true" />
            </Reveal>
            <Reveal delay={80}>
              <h2 id="desgaste-titulo" className="display-md mt-8 text-on-dark">
                El desgaste también <em className="italic">se cuida</em>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <p className="text-[1.06rem] leading-[1.8] font-light text-on-dark-muted md:text-[1.12rem]">
              {EMPRESAS.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ SERVICIOS ═══════════════════ */}
      <section className="section-y" aria-labelledby="servicios-b2b-titulo">
        <div className="shell">
          <div className="max-w-3xl">
            <Reveal>
              <Antetitulo>Qué puedo hacer</Antetitulo>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="servicios-b2b-titulo" className="display-md mt-6">
                Tres formas de <em className="italic">intervenir</em>.
              </h2>
            </Reveal>
          </div>

          <ol className="mt-14 border-t border-rule-strong md:mt-20">
            {EMPRESAS.servicios.map((s, i) => (
              <Reveal
                as="li"
                key={s.t}
                delay={i * 90}
                className="grid gap-3 border-b border-rule-strong py-8 md:grid-cols-[4rem_1fr_1.2fr] md:items-baseline md:gap-10"
              >
                <Numero>{String(i + 1).padStart(2, "0")}</Numero>
                <h3 className="font-display text-[1.5rem] leading-tight text-ink md:text-[1.9rem]">
                  {s.t}
                </h3>
                <p className="prose-body md:pt-1">{s.d}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal variant="mask" delay={120} className="mt-14">
            <Cita tamano="sm" className="max-w-3xl">
              {EMPRESAS.cadaEquipo}
            </Cita>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ PRESUPUESTO ═══════════════════ */}
      <section
        id="presupuesto"
        className="relative scroll-mt-28 overflow-hidden border-y border-rule bg-paper"
        aria-labelledby="presupuesto-titulo"
      >
        <div className="grain absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 shell section-y grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <Antetitulo>{EMPRESAS.simulador.eyebrow}</Antetitulo>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="presupuesto-titulo" className="display-md mt-6">
                Calcula lo que costaría para tu <em className="italic">equipo</em>.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="prose-body mt-7 max-w-md">{EMPRESAS.simulador.intro}</p>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <div className="rounded-3xl border border-rule bg-linen p-8 md:p-11">
              <FormularioPresupuesto />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaFinal />
    </Layout>
  );
}
