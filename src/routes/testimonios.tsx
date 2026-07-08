import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/testimonios")({
  head: () => ({
    meta: [
      { title: "Testimonios · Orpheus Psicología" },
      {
        name: "description",
        content:
          "Palabras de personas que han hecho su proceso terapéutico con Melissa González en Orpheus Psicología.",
      },
      { property: "og:title", content: "Testimonios · Orpheus Psicología" },
      {
        property: "og:description",
        content: "Historias reales de procesos de autoestima, autoexigencia e inseguridad.",
      },
      { property: "og:url", content: "/testimonios" },
    ],
    links: [{ rel: "canonical", href: "/testimonios" }],
  }),
  component: Testimonios,
});

const items = [
  {
    text: "Melissa tiene una forma muy particular de acompañar. Nunca me sentí juzgada, y por primera vez pude mirar mi historia con comprensión en lugar de dureza.",
    name: "Laura M.",
    role: "Proceso de autoestima",
    length: "long",
  },
  {
    text: "Aprendí que descansar no es debilidad.",
    name: "Andrea R.",
    role: "Autoexigencia",
    length: "short",
  },
  {
    text: "Un espacio realmente seguro. Cada sesión es cuidada, profunda y muy humana. Salgo con herramientas concretas y con más claridad de la que llegué.",
    name: "Clara S.",
    role: "Ansiedad e inseguridad",
    length: "long",
  },
  {
    text: "Después de años intentándolo todo, aquí encontré algo diferente: comprensión real y herramientas que funcionan.",
    name: "Marta L.",
    role: "Perfeccionismo",
    length: "medium",
  },
  {
    text: "Ha cambiado la forma en que me hablo por dentro.",
    name: "Sara P.",
    role: "Autoestima",
    length: "short",
  },
  {
    text: "Melissa combina rigor y calidez de una forma poco común. Se nota que se toma en serio cada proceso, cada palabra, cada silencio. He aprendido a mirarme de otra manera.",
    name: "Elena V.",
    role: "Crecimiento personal",
    length: "long",
  },
  {
    text: "Lo que más agradezco es no haberme sentido nunca un ‘caso’, sino una persona.",
    name: "Nuria B.",
    role: "Inseguridad",
    length: "medium",
  },
  {
    text: "Vale cada minuto invertido en ti.",
    name: "Paula G.",
    role: "Autoexigencia",
    length: "short",
  },
];

function Testimonios() {
  return (
    <Layout>
      <section className="pt-32 md:pt-44 pb-12 md:pb-20">
        <div className="container-editorial max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-sage-deep">Testimonios</p>
          <h1 className="mt-5 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-balance leading-[1.02] animate-fade-up">
            Historias que <span className="italic text-sage-deep">acompañan</span> mi trabajo.
          </h1>
          <p className="mt-7 text-lg text-muted-foreground max-w-2xl leading-relaxed animate-fade-up delay-100">
            Cada proceso es único. Estas palabras son un reflejo del respeto con el que
            intento habitar cada sesión.
          </p>
        </div>
      </section>

      <section className="container-editorial pb-24 md:pb-36">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {items.map((t, i) => (
            <Reveal
              key={i}
              delay={(i % 3) * 80}
              className={`mb-6 break-inside-avoid rounded-2xl border border-border/70 p-8 ${
                i % 4 === 0 ? "bg-sage-deep text-primary-foreground border-transparent" : "bg-cream"
              }`}
            >
              <span
                className={`font-serif text-4xl leading-none ${
                  i % 4 === 0 ? "text-sage-soft" : "text-sage-deep"
                }`}
              >
                “
              </span>
              <p
                className={`mt-4 font-serif ${
                  t.length === "long" ? "text-xl md:text-2xl" : t.length === "medium" ? "text-lg md:text-xl" : "text-2xl md:text-3xl"
                } leading-snug text-balance ${i % 4 === 0 ? "" : "text-foreground/90"}`}
              >
                {t.text}
              </p>
              <div
                className={`mt-8 pt-5 border-t ${
                  i % 4 === 0 ? "border-primary-foreground/20" : "border-border/70"
                }`}
              >
                <p className="text-sm font-medium">{t.name}</p>
                <p className={`text-xs mt-0.5 ${i % 4 === 0 ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {t.role}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-editorial pb-24 md:pb-32">
        <Reveal className="rounded-[2rem] bg-cream border border-border/70 px-8 md:px-16 py-16 md:py-24 text-center">
          <h2 className="font-serif text-3xl md:text-5xl max-w-3xl mx-auto text-balance">
            Tu historia también puede comenzar a
            <span className="italic text-sage-deep"> escribirse</span> distinto.
          </h2>
          <Link
            to="/contacto"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-sage-deep text-primary-foreground px-7 py-4 text-sm hover:bg-foreground transition-colors"
          >
            Reservar una primera sesión
            <ArrowUpRight className="size-4" />
          </Link>
        </Reveal>
      </section>
    </Layout>
  );
}
