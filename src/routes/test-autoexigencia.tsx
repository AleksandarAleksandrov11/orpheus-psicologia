import { createFileRoute } from "@tanstack/react-router";

import { Layout } from "@/components/site/Layout";
import { LineasReveladas, Parallax } from "@/components/site/motion";
import { TestAutoexigencia } from "@/components/site/TestAutoexigencia";
import { Migas } from "@/components/site/ui";
import { migasSchema, seo } from "@/lib/seo";

/**
 * Test de autoexigencia.
 *
 * Mientras no esté lanzado va con `noindex`, sin enlace en el menú y fuera del
 * mapa del sitio. Para lanzarlo: configurar RESEND_API_KEY en Vercel (ver
 * `api.test-autoexigencia.ts`), añadir el tratamiento a la política de
 * privacidad, quitar `noindex` aquí y sumar la ruta al mapa del sitio y al menú.
 */
export const Route = createFileRoute("/test-autoexigencia")({
  head: () =>
    seo({
      title: "Test de autoexigencia",
      description:
        "Veinte preguntas para explorar cómo influye la autoexigencia en tu descanso, tus relaciones y la forma en que te valoras. Orientativo, no es un diagnóstico.",
      path: "/test-autoexigencia",
      noindex: true,
      jsonLd: [
        migasSchema([
          { nombre: "Inicio", path: "/" },
          { nombre: "Test de autoexigencia", path: "/test-autoexigencia" },
        ]),
      ],
    }),
  component: Test,
});

function Test() {
  return (
    <Layout>
      <section className="aurora grain relative overflow-hidden pt-28 pb-24 md:pt-40 md:pb-32">
        <Parallax
          amount={-30}
          className="pointer-events-none absolute -top-40 -right-36 -z-10 h-[32rem] w-[32rem] rounded-full bg-aloe/50 blur-3xl"
        >
          <span className="anim-breathe block h-full w-full" />
        </Parallax>

        <div className="relative z-10 shell">
          <Migas items={[{ nombre: "Inicio", path: "/" }, { nombre: "Test de autoexigencia" }]} />

          <div className="max-w-3xl">
            <p className="eyebrow anim-fade flex items-center gap-3 text-olive">
              <span aria-hidden="true" className="inline-block h-px w-8 bg-olive/50" />
              Autoconocimiento
            </p>
            <LineasReveladas
              lineas={["¿Te exiges", "demasiado?"]}
              cursiva={1}
              delay={120}
              className="display-xl mt-7 text-ink"
            />
            <p className="lede anim-fade-up mt-8 max-w-xl" style={{ animationDelay: "0.55s" }}>
              A veces nos acostumbramos tanto a exigirnos que dejamos de darnos cuenta de cuánto nos
              cuesta. Explora cómo puede estar influyendo en distintas áreas de tu vida.
            </p>
          </div>

          <div className="mt-14 max-w-3xl md:mt-20">
            <TestAutoexigencia />
          </div>
        </div>
      </section>
    </Layout>
  );
}
