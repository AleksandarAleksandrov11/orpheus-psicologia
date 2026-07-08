import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import melissa3 from "@/assets/melissa-3.png";

export const Route = createFileRoute("/sobre-mi")({
  head: () => ({
    meta: [
      { title: "Sobre mí · Melissa González | Orpheus Psicología" },
      {
        name: "description",
        content:
          "Melissa González, psicóloga especializada en autoestima, autoexigencia e inseguridad. Una forma cercana y humana de entender la psicología.",
      },
      { property: "og:title", content: "Sobre mí · Melissa González" },
      {
        property: "og:description",
        content:
          "Mi historia, mi forma de entender la psicología y mi compromiso contigo.",
      },
      { property: "og:url", content: "/sobre-mi" },
      { property: "og:image", content: melissa3 },
      { name: "twitter:image", content: melissa3 },
    ],
    links: [{ rel: "canonical", href: "/sobre-mi" }],
  }),
  component: SobreMi,
});

function SobreMi() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative pt-32 md:pt-44 pb-16 md:pb-24">
        <div className="container-editorial grid gap-14 lg:grid-cols-[1.1fr_1fr] items-center">
          <div className="animate-fade-up">
            <p className="text-xs uppercase tracking-[0.28em] text-sage-deep">Sobre mí</p>
            <h1 className="mt-5 font-serif text-4xl sm:text-5xl md:text-6xl text-balance leading-[1.05]">
              Soy Melissa. Y creo en una psicología que
              <span className="italic text-sage-deep"> acompaña</span>, no que juzga.
            </h1>
            <p className="mt-7 max-w-xl text-muted-foreground leading-relaxed">
              Psicóloga especializada en autoestima, autoexigencia e inseguridad. Fundadora
              de Orpheus Psicología, un espacio pensado para quienes quieren construir una
              relación más sana consigo mismas.
            </p>
          </div>

          <Reveal delay={120}>
            <div className="relative aspect-[4/5] max-w-md mx-auto overflow-hidden rounded-[2rem] bg-sage-soft/40">
              <img src={melissa3} alt="Retrato de Melissa González" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* MI HISTORIA */}
      <section className="container-editorial py-20 md:py-32 grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-sage-deep sticky top-28">Mi historia</p>
        </Reveal>
        <div className="space-y-6 text-[15px] md:text-lg leading-relaxed text-foreground/85 max-w-2xl">
          <Reveal>
            <p>
              Descubrí la psicología buscando entenderme. Como muchas personas, viví durante
              años bajo una autoexigencia silenciosa que confundía con responsabilidad. Fue
              precisamente ese camino personal el que dio forma a la profesional que soy hoy.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p>
              Me formé con la convicción de que la terapia debía ser rigurosa y, al mismo
              tiempo, profundamente humana. Que la evidencia científica y la calidez no solo
              pueden convivir: se necesitan.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p className="font-serif italic text-2xl text-sage-deep">
              Creo en la psicología como un lugar donde volver a mirarse con respeto.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="container-editorial"><div className="hairline" /></div>

      {/* MI FORMA DE ENTENDER LA PSICOLOGÍA */}
      <section className="container-editorial py-20 md:py-32">
        <Reveal className="max-w-2xl mb-14">
          <p className="text-xs uppercase tracking-[0.28em] text-sage-deep">Mi forma de entender la psicología</p>
          <h2 className="mt-4 font-serif text-3xl md:text-5xl text-balance">
            Una terapia que <span className="italic">respeta</span> tu ritmo.
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Basada en evidencia",
              d: "Trabajo con enfoques respaldados por la investigación clínica: cognitivo-conductual, ACT, terapia de esquemas y compasión.",
            },
            {
              t: "Profundamente humana",
              d: "Ningún manual sustituye la escucha. La técnica sostiene el trabajo; la relación es la que lo transforma.",
            },
            {
              t: "Adaptada a ti",
              d: "Cada persona llega con su historia. No hay procesos idénticos, hay procesos honestos y sostenibles.",
            },
          ].map((b, i) => (
            <Reveal
              key={b.t}
              delay={i * 100}
              className="rounded-2xl border border-border/70 bg-cream p-8 hover:border-sage/50 transition-colors"
            >
              <h3 className="font-serif text-2xl">{b.t}</h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{b.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* COMPROMISO */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container-editorial grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-sage-deep">Mi compromiso contigo</p>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-balance">
              Un espacio <span className="italic">seguro</span>. Siempre.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {[
              ["Confidencialidad total", "Todo lo que compartes queda protegido por el secreto profesional."],
              ["Ausencia de juicio", "Aquí no hay nada malo en ti. Solo hay una historia por comprender."],
              ["Rigor profesional", "Formación continua, supervisión y ética clínica en cada sesión."],
              ["Presencia real", "Te acompaño con atención plena. No eres un caso: eres tú."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 80} className="border-t border-border/70 pt-5">
                <h4 className="font-serif text-xl">{t}</h4>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUÉ PUEDES ESPERAR */}
      <section className="container-editorial py-24 md:py-32">
        <Reveal className="max-w-2xl mb-14">
          <p className="text-xs uppercase tracking-[0.28em] text-sage-deep">Qué puedes esperar</p>
          <h2 className="mt-4 font-serif text-3xl md:text-5xl text-balance">
            De nuestras <span className="italic">sesiones</span>.
          </h2>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            "Un espacio cuidado, tranquilo y sin prisa donde ser escuchada de verdad.",
            "Herramientas prácticas basadas en evidencia, adaptadas a tu momento vital.",
            "Comprensión sin juicio de tu historia, tus emociones y tus contradicciones.",
            "Un proceso claro, con objetivos que trabajamos juntas, a tu ritmo.",
          ].map((t, i) => (
            <Reveal key={t} delay={i * 80} className="rounded-2xl bg-cream border border-border/70 p-7 md:p-8">
              <span className="text-xs tracking-[0.22em] uppercase text-sage-deep">0{i + 1}</span>
              <p className="mt-5 font-serif text-lg md:text-xl leading-snug text-balance">{t}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-editorial py-16 md:py-24">
        <Reveal className="rounded-[2rem] bg-sage-deep text-primary-foreground px-8 md:px-16 py-16 md:py-24 text-center relative overflow-hidden">
          <h2 className="font-serif text-3xl md:text-5xl max-w-3xl mx-auto text-balance">
            ¿Quieres saber si <span className="italic">encajamos</span>?
          </h2>
          <p className="mt-5 text-primary-foreground/80 max-w-xl mx-auto">
            La primera sesión es un espacio para conocernos y ver cómo puedo ayudarte.
          </p>
          <Link
            to="/contacto"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-background text-foreground px-7 py-4 text-sm hover:bg-cream transition-colors"
          >
            Reservar primera sesión
            <ArrowUpRight className="size-4" />
          </Link>
        </Reveal>
      </section>
    </Layout>
  );
}
