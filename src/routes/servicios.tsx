import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios · Orpheus Psicología | Terapia especializada" },
      {
        name: "description",
        content:
          "Terapia individual online y presencial. Autoestima, autoexigencia, inseguridad y crecimiento personal. Un enfoque psicológico basado en evidencia.",
      },
      { property: "og:title", content: "Servicios · Orpheus Psicología" },
      {
        property: "og:description",
        content:
          "Cinco espacios de trabajo terapéutico: terapia individual, autoestima, autoexigencia, inseguridad y crecimiento personal.",
      },
      { property: "og:url", content: "/servicios" },
    ],
    links: [{ rel: "canonical", href: "/servicios" }],
  }),
  component: Servicios,
});

const servicios = [
  {
    id: "individual",
    kicker: "Servicio principal",
    title: "Terapia individual",
    desc: "Un proceso profundo y personalizado para trabajar aquello que te trae y aquello que descubrirás por el camino. La modalidad más completa.",
    beneficios: [
      "Diagnóstico psicológico integral",
      "Plan terapéutico adaptado a ti",
      "Herramientas prácticas semana a semana",
      "Seguimiento cercano de tu evolución",
    ],
    para: "Personas que quieren hacer un trabajo profundo sobre sí mismas con acompañamiento continuado.",
  },
  {
    id: "autoestima",
    kicker: "Especialidad",
    title: "Autoestima",
    desc: "Construir una autoestima que no dependa de la validación externa. Trabajar la relación contigo desde el respeto, la comprensión y una nueva mirada.",
    beneficios: [
      "Comprender el origen de tu autoconcepto",
      "Silenciar el crítico interior",
      "Reconocer tus logros sin descalificarlos",
      "Sostener una imagen realista y amable de ti",
    ],
    para: "Personas que sienten que nunca son suficientes o que buscan la aprobación de los demás para sentirse bien.",
  },
  {
    id: "autoexigencia",
    kicker: "Especialidad",
    title: "Autoexigencia",
    desc: "Bajar el volumen de la exigencia constante sin perder tu compromiso ni tus valores. Aprender que descansar, fallar y ser humana también forman parte.",
    beneficios: [
      "Identificar patrones de perfeccionismo",
      "Trabajar la culpa asociada al descanso",
      "Redefinir el éxito desde tu propio criterio",
      "Reducir la ansiedad de rendimiento",
    ],
    para: "Personas atrapadas en la sensación de que nunca hacen suficiente o que se hablan con dureza.",
  },
  {
    id: "inseguridad",
    kicker: "Especialidad",
    title: "Inseguridad",
    desc: "Ganar confianza desde dentro, no desde la aprobación externa. Entender tu inseguridad, comprender su historia y aprender a moverte con más firmeza.",
    beneficios: [
      "Identificar los detonantes de la inseguridad",
      "Aprender a sostener tu propio criterio",
      "Regular la comparación constante",
      "Ganar seguridad en tus relaciones",
    ],
    para: "Personas que dudan constantemente de sí mismas, en su trabajo o en sus vínculos.",
  },
  {
    id: "crecimiento",
    kicker: "Proceso",
    title: "Crecimiento personal",
    desc: "Un espacio para personas que no están en crisis pero que quieren evolucionar, conocerse mejor y construir una versión más consciente de sí mismas.",
    beneficios: [
      "Trabajar valores y prioridades vitales",
      "Fortalecer el autoconocimiento",
      "Diseñar decisiones alineadas contigo",
      "Sostener cambios en el tiempo",
    ],
    para: "Personas que quieren dar un paso hacia una vida más coherente con quienes son.",
  },
];

const senales = [
  "Nunca sientes que haces suficiente.",
  "Te cuesta reconocer tus logros.",
  "Buscas constantemente la aprobación de los demás.",
  "Te hablas con mucha dureza.",
  "Sientes inseguridad en tus relaciones.",
  "Quieres construir una autoestima más estable.",
];

function Servicios() {
  return (
    <Layout>
      {/* HERO */}
      <section className="pt-32 md:pt-44 pb-16 md:pb-24">
        <div className="container-editorial max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-sage-deep">Servicios</p>
          <h1 className="mt-5 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-balance leading-[1.02] animate-fade-up">
            Un acompañamiento pensado para
            <span className="italic text-sage-deep"> ti</span>.
          </h1>
          <p className="mt-7 text-lg text-muted-foreground max-w-2xl leading-relaxed animate-fade-up delay-100">
            Trabajo desde una mirada integradora que combina rigor clínico, cercanía humana y
            un profundo respeto por tu proceso.
          </p>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="container-editorial space-y-6">
        {servicios.map((s, i) => (
          <Reveal
            key={s.id}
            delay={i * 60}
            className={`group rounded-[2rem] border border-border/70 overflow-hidden transition-colors ${
              i === 0 ? "bg-sage-deep text-primary-foreground border-transparent" : "bg-cream hover:border-sage/50"
            }`}
          >
            <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 md:gap-14 p-8 md:p-12 lg:p-14">
              <div>
                <p className={`text-xs uppercase tracking-[0.28em] ${i === 0 ? "text-sage-soft" : "text-sage-deep"}`}>
                  {s.kicker}
                </p>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-balance">
                  {s.title}
                </h2>
                <p className={`mt-6 leading-relaxed ${i === 0 ? "text-primary-foreground/85" : "text-muted-foreground"}`}>
                  {s.desc}
                </p>
                <Link
                  to="/contacto"
                  className={`mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm transition-colors ${
                    i === 0
                      ? "bg-background text-foreground hover:bg-cream"
                      : "bg-sage-deep text-primary-foreground hover:bg-foreground"
                  }`}
                >
                  Solicitar información
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className={`text-xs uppercase tracking-[0.22em] mb-4 ${i === 0 ? "text-sage-soft" : "text-sage-deep"}`}>
                    Beneficios
                  </p>
                  <ul className="space-y-3">
                    {s.beneficios.map((b) => (
                      <li key={b} className="flex gap-3 text-sm leading-relaxed">
                        <Check className={`size-4 mt-0.5 shrink-0 ${i === 0 ? "text-sage-soft" : "text-sage-deep"}`} strokeWidth={1.5} />
                        <span className={i === 0 ? "text-primary-foreground/90" : "text-foreground/85"}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className={`text-xs uppercase tracking-[0.22em] mb-4 ${i === 0 ? "text-sage-soft" : "text-sage-deep"}`}>
                    Para quién
                  </p>
                  <p className={`text-sm leading-relaxed ${i === 0 ? "text-primary-foreground/85" : "text-muted-foreground"}`}>
                    {s.para}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ESTE ESPACIO PUEDE AYUDARTE SI... */}
      <section className="container-editorial py-24 md:py-36 mt-16">
        <Reveal className="max-w-2xl mb-14">
          <p className="text-xs uppercase tracking-[0.28em] text-sage-deep">Este espacio puede ayudarte si…</p>
          <h2 className="mt-4 font-serif text-3xl md:text-5xl text-balance">
            Quizás te <span className="italic">reconoces</span> aquí.
          </h2>
        </Reveal>

        <div className="grid gap-3 md:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {senales.map((s, i) => (
            <Reveal
              key={s}
              delay={i * 60}
              className="group rounded-2xl border border-border/70 bg-background p-6 hover:border-sage/50 hover:bg-cream transition-colors"
            >
              <div className="flex items-start gap-4">
                <span className="mt-1 size-2 rounded-full bg-sage-deep shrink-0" />
                <p className="font-serif text-lg leading-snug text-balance">{s}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 rounded-full bg-sage-deep text-primary-foreground px-7 py-4 text-sm hover:bg-foreground transition-colors"
          >
            Empezar mi proceso
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
