import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Heart,
  Sparkles,
  ShieldCheck,
  Waves,
  Compass,
  Star,
  Users,
  Leaf,
} from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import melissa1 from "@/assets/melissa-1.png";
import melissa2 from "@/assets/melissa-2.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Melissa González · Orpheus Psicología | Especialista en autoestima" },
      {
        name: "description",
        content:
          "Construye una autoestima que no dependa de la aprobación de los demás. Terapia especializada en autoestima, autoexigencia e inseguridad.",
      },
      { property: "og:title", content: "Melissa González · Orpheus Psicología" },
      {
        property: "og:description",
        content:
          "La relación más importante de tu vida es la que tienes contigo. Terapia basada en evidencia, cercana y sofisticada.",
      },
      { property: "og:url", content: "/" },
      { property: "og:image", content: melissa1 },
      { name: "twitter:image", content: melissa1 },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const helps = [
  { icon: Heart, title: "Autoestima", text: "Construir una base emocional sólida y estable." },
  { icon: Compass, title: "Autoexigencia", text: "Aprender a soltar la presión constante." },
  { icon: ShieldCheck, title: "Inseguridad", text: "Ganar confianza desde dentro." },
  { icon: Waves, title: "Ansiedad", text: "Regular la respuesta emocional del cuerpo." },
  { icon: Sparkles, title: "Gestión emocional", text: "Nombrar, entender y acompañar lo que sientes." },
  { icon: Star, title: "Perfeccionismo", text: "Descubrir el valor de lo suficiente." },
  { icon: Users, title: "Relaciones personales", text: "Vincularte desde un lugar más sano." },
  { icon: Leaf, title: "Crecimiento personal", text: "Un camino de retorno hacia ti." },
];

const proceso = [
  { n: "01", t: "Primera sesión", d: "Un espacio para conocernos, comprender qué te trae y qué te gustaría transformar." },
  { n: "02", t: "Comprender tu historia", d: "Explorar con calma las raíces de aquello que hoy te limita." },
  { n: "03", t: "Identificar patrones", d: "Reconocer los guiones internos que sostienen la autoexigencia o la inseguridad." },
  { n: "04", t: "Trabajar nuevas herramientas", d: "Incorporar recursos prácticos, basados en evidencia, para tu día a día." },
  { n: "05", t: "Consolidar cambios", d: "Integrar lo aprendido para que la nueva relación contigo sea sostenible." },
];

const beneficios = [
  { t: "Aprender a poner límites", d: "Con firmeza y sin culpa." },
  { t: "Mejorar tu autoestima", d: "Desde el respeto, no desde la exigencia." },
  { t: "Reducir la autoexigencia", d: "Rebajar el volumen del crítico interior." },
  { t: "Gestionar mejor tus emociones", d: "Regularte con más comprensión." },
  { t: "Hablarte con más amabilidad", d: "Cambiar tu diálogo interno." },
  { t: "Ganar seguridad personal", d: "Confiar en tu propio criterio." },
  { t: "Construir relaciones más sanas", d: "Vincularte desde la tranquilidad." },
  { t: "Vivir con más calma", d: "Una vida menos ruidosa por dentro." },
];

const testimonios = [
  {
    text: "Melissa tiene una forma muy particular de acompañar. Nunca me sentí juzgada, y por primera vez pude mirar mi historia con comprensión en lugar de dureza.",
    name: "Laura M.",
    role: "Proceso de autoestima",
  },
  {
    text: "Aprendí que descansar no es debilidad. Su trabajo con la autoexigencia ha cambiado mi manera de relacionarme conmigo y con los demás.",
    name: "Andrea R.",
    role: "Autoexigencia y perfeccionismo",
  },
  {
    text: "Un espacio realmente seguro. Cada sesión es cuidada, profunda y muy humana. Salgo con herramientas concretas y con más claridad.",
    name: "Clara S.",
    role: "Ansiedad e inseguridad",
  },
];

function Home() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-28 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-sage-soft/50 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 -left-40 h-[420px] w-[420px] rounded-full bg-beige/70 blur-3xl"
        />
        <div className="container-editorial relative grid gap-12 md:gap-16 lg:grid-cols-[1.05fr_1fr] items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-sage/30 bg-white/70 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-sage-deep backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-sage" /> Melissa González · Psicóloga
            </div>
            <h1 className="mt-6 font-serif text-[40px] leading-[1.05] sm:text-5xl md:text-6xl lg:text-[68px] text-foreground text-balance">
              Construye una autoestima que no dependa de la
              <span className="italic text-sage-deep"> aprobación </span>
              de los demás.
            </h1>
            <p className="mt-7 max-w-xl text-[15px] md:text-base leading-relaxed text-muted-foreground">
              Acompaño a personas que viven atrapadas en la autoexigencia, la inseguridad o el
              perfeccionismo a desarrollar una autoestima sólida, saludable y auténtica desde un
              enfoque psicológico basado en evidencia.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/contacto"
                className="group inline-flex items-center gap-2 rounded-full bg-sage-deep px-6 py-3.5 text-sm text-primary-foreground hover:bg-foreground transition-all duration-500"
              >
                Reservar una sesión
                <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/servicios"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 backdrop-blur px-6 py-3.5 text-sm text-foreground hover:border-sage-deep hover:text-sage-deep transition-colors"
              >
                Conocer cómo puedo ayudarte
              </Link>
            </div>
            <div className="mt-12 flex items-center gap-6 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <span>Terapia online</span>
              <span className="size-1 rounded-full bg-border" />
              <span>Basada en evidencia</span>
              <span className="hidden sm:inline size-1 rounded-full bg-border" />
              <span className="hidden sm:inline">Espacio seguro</span>
            </div>
          </div>

          <div className="relative animate-fade-up delay-200">
            <div className="relative mx-auto aspect-[4/5] max-w-md md:max-w-none overflow-hidden rounded-[2rem] bg-sage-soft/50">
              <img
                src={melissa1}
                alt="Melissa González, psicóloga especializada en autoestima"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 md:-left-8 max-w-[220px] rounded-2xl bg-background/95 backdrop-blur border border-border p-4 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.15)]">
              <p className="font-serif italic text-sage-deep text-sm leading-snug">
                “La relación más importante de tu vida es la que tienes contigo.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EN QUÉ PUEDO AYUDARTE — BENTO */}
      <section className="container-editorial py-20 md:py-32">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.28em] text-sage-deep">En qué puedo ayudarte</p>
          <h2 className="mt-4 font-serif text-3xl md:text-5xl text-balance">
            Espacios de trabajo donde <span className="italic">acompaño</span>.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[minmax(160px,auto)]">
          {helps.map((h, i) => {
            const Icon = h.icon;
            const featured = i === 0;
            return (
              <Reveal
                key={h.title}
                delay={i * 60}
                className={`group relative overflow-hidden rounded-2xl border border-border/70 bg-cream p-5 md:p-6 transition-all duration-500 hover:border-sage/60 hover:bg-white ${
                  featured ? "col-span-2 row-span-2 bg-sage-soft/40 border-sage/40" : ""
                }`}
              >
                <Icon className={`${featured ? "size-7" : "size-5"} text-sage-deep`} strokeWidth={1.4} />
                <h3 className={`mt-auto ${featured ? "mt-14 text-2xl md:text-3xl" : "mt-10 text-lg"} font-serif`}>
                  {h.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground max-w-xs">
                  {h.text}
                </p>
                <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-sage-soft/30 to-transparent" />
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* MI FORMA DE TRABAJAR */}
      <section className="bg-cream py-24 md:py-36">
        <div className="container-editorial grid gap-14 md:gap-20 lg:grid-cols-[1fr_1.1fr] items-center">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] max-w-lg mx-auto lg:mx-0">
              <img
                src={melissa2}
                alt="Melissa González en consulta"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="hidden md:block absolute -top-6 -right-6 w-40 rotate-3 rounded-2xl border border-border bg-background p-4">
              <p className="font-serif italic text-sm text-sage-deep leading-snug">
                Terapia cercana, humana y basada en evidencia.
              </p>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.28em] text-sage-deep">Mi forma de trabajar</p>
              <h2 className="mt-4 font-serif text-3xl md:text-5xl text-balance">
                Un espacio para <span className="italic">habitarte</span> sin juicio.
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed max-w-xl">
                No creo en la psicología fría ni en las recetas rápidas. Creo en un
                acompañamiento profundo, cercano y adaptado a ti, donde puedas dejar de
                exigirte tanto y empezar a construir una relación más sana contigo.
              </p>
            </Reveal>

            <div className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-6">
              {[
                ["Terapia personalizada", "Cada proceso se diseña contigo, a tu ritmo."],
                ["Escucha activa", "Un espacio donde ser realmente escuchada."],
                ["Evidencia científica", "Herramientas con base clínica sólida."],
                ["Espacio seguro", "Sin juicio, con confidencialidad total."],
                ["Comprensión sin juicio", "Mirar tu historia con respeto."],
                ["Herramientas prácticas", "Recursos que puedes integrar en tu día."],
                ["Objetivos adaptados", "Metas realistas y sostenibles."],
                ["Acompañamiento cercano", "Presente en cada paso del camino."],
              ].map(([t, d], i) => (
                <Reveal key={t} delay={i * 50} className="border-t border-border/70 pt-4">
                  <h4 className="font-serif text-lg text-foreground">{t}</h4>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CUANDO LA AUTOEXIGENCIA TOMA EL CONTROL */}
      <section className="container-editorial py-24 md:py-36">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] items-start">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-sage-deep">Un momento honesto</p>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-balance">
              Cuando la autoexigencia toma el <span className="italic">control</span>.
            </h2>
          </Reveal>
          <div className="space-y-6 text-[15px] md:text-base leading-relaxed text-foreground/85">
            <Reveal delay={80}>
              <p>
                A veces la exigencia se disfraza de responsabilidad, de ambición o de amor.
                Pero cuando nunca es suficiente, cuando descansar produce culpa, cuando
                cualquier logro se evapora antes de poder sentirlo, el cuerpo y la mente
                empiezan a pagar un precio invisible.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p>
                Vivir bajo esa presión constante puede erosionar la autoestima, tensar las
                relaciones y convertir la vida en una sucesión de metas que nunca alcanzan
                para calmar la voz interior. No se trata de dejar de esforzarse: se trata de
                dejar de exigirse desde un lugar que hace daño.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="pt-2 font-serif italic text-lg text-sage-deep">
                No necesitas rendir más. Necesitas empezar a relacionarte contigo de otra manera.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROCESO — TIMELINE */}
      <section className="bg-moss/60 py-24 md:py-36">
        <div className="container-editorial">
          <Reveal className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-sage-deep">Cómo es el proceso</p>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-balance">
              Un camino con <span className="italic">calma</span>, paso a paso.
            </h2>
          </Reveal>

          <ol className="mt-16 relative">
            <div aria-hidden className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-sage/30" />
            {proceso.map((p, i) => (
              <Reveal
                key={p.n}
                delay={i * 80}
                as="li"
                className={`relative pl-14 md:pl-0 md:grid md:grid-cols-2 md:gap-16 py-8 md:py-10 ${
                  i % 2 === 0 ? "md:[&>div:first-child]:text-right md:[&>div:first-child]:pr-16" : "md:[&>div:first-child]:order-2 md:[&>div:first-child]:pl-16"
                }`}
              >
                <div>
                  <span className="font-serif text-xs tracking-[0.3em] text-sage-deep">{p.n}</span>
                  <h3 className="mt-2 font-serif text-2xl md:text-3xl">{p.t}</h3>
                </div>
                <div className={i % 2 === 0 ? "md:pl-16 md:border-l md:border-sage/20" : "md:pr-16 md:border-r md:border-sage/20 md:order-1 md:text-right"}>
                  <p className="text-muted-foreground leading-relaxed max-w-md md:max-w-none">{p.d}</p>
                </div>
                <span
                  aria-hidden
                  className="absolute left-3.5 md:left-1/2 top-10 md:top-12 -translate-x-1/2 size-3 rounded-full bg-background border-2 border-sage-deep"
                />
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* BENEFICIOS — BENTO */}
      <section className="container-editorial py-24 md:py-36">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.28em] text-sage-deep">Beneficios</p>
          <h2 className="mt-4 font-serif text-3xl md:text-5xl text-balance">
            Lo que empieza a cambiar <span className="italic">dentro</span>.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(140px,auto)] gap-3 md:gap-4">
          {beneficios.map((b, i) => {
            const big = i === 0 || i === 5;
            return (
              <Reveal
                key={b.t}
                delay={i * 50}
                className={`group rounded-2xl border border-border/70 p-6 transition-all duration-500 hover:border-sage/60 ${
                  big ? "sm:col-span-2 bg-sage-deep text-primary-foreground border-transparent" : "bg-cream hover:bg-white"
                }`}
              >
                <span className={`text-xs tracking-[0.22em] uppercase ${big ? "text-sage-soft" : "text-sage-deep"}`}>
                  0{i + 1}
                </span>
                <h3 className={`mt-8 font-serif ${big ? "text-2xl md:text-3xl" : "text-xl"}`}>{b.t}</h3>
                <p className={`mt-2 text-[13px] leading-relaxed ${big ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
                  {b.d}
                </p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="bg-cream py-24 md:py-36">
        <div className="container-editorial">
          <Reveal className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-sage-deep">Testimonios</p>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-balance">
              Palabras de quienes han <span className="italic">caminado</span> este proceso.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonios.map((t, i) => (
              <Reveal
                key={t.name}
                delay={i * 100}
                className="rounded-2xl border border-border/70 bg-background p-7 md:p-8 flex flex-col"
              >
                <div className="text-sage-deep font-serif text-4xl leading-none">“</div>
                <p className="mt-4 font-serif text-lg md:text-xl leading-snug text-foreground/90 text-balance">
                  {t.text}
                </p>
                <div className="mt-8 pt-6 border-t border-border/70">
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/testimonios"
              className="link-underline text-sm text-sage-deep tracking-wide"
            >
              Leer más testimonios
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="container-editorial py-24 md:py-36">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-sage-deep text-primary-foreground px-8 md:px-16 py-20 md:py-28 text-center">
          <div aria-hidden className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-eucalyptus/25 blur-3xl" />
          <div aria-hidden className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-sage-soft/20 blur-3xl" />
          <p className="relative text-xs uppercase tracking-[0.28em] text-sage-soft">Un nuevo comienzo</p>
          <h2 className="relative mt-5 font-serif text-3xl md:text-5xl lg:text-6xl max-w-3xl mx-auto text-balance">
            No necesitas convertirte en otra persona para sentirte suficiente. A veces solo
            necesitas <span className="italic">aprender a mirarte</span> desde un lugar diferente.
          </h2>
          <div className="relative mt-10">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-7 py-4 text-sm hover:bg-cream transition-colors"
            >
              Quiero comenzar mi proceso
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </Layout>
  );
}
