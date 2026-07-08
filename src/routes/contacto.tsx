import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, Instagram, Send, Check, MessageCircle } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto · Orpheus Psicología | Reserva tu sesión" },
      {
        name: "description",
        content:
          "Solicita información o reserva tu primera sesión con Melissa González, psicóloga especializada en autoestima, autoexigencia e inseguridad.",
      },
      { property: "og:title", content: "Contacto · Orpheus Psicología" },
      {
        property: "og:description",
        content: "Un mensaje, un email, un primer paso. Estoy aquí para acompañarte.",
      },
      { property: "og:url", content: "/contacto" },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  component: Contacto,
});

const motivos = ["Autoestima", "Autoexigencia", "Inseguridad", "Ansiedad", "Crecimiento personal", "Otro"];

function Contacto() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    motivo: "",
    mensaje: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Solicitud de información — ${form.nombre}`);
    const body = encodeURIComponent(
      `Nombre: ${form.nombre}\nEmail: ${form.email}\nTeléfono: ${form.telefono}\nMotivo de consulta: ${form.motivo}\n\nMensaje:\n${form.mensaje}`,
    );
    window.location.href = `mailto:hola@orpheuspsicologia.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <Layout>
      <section className="pt-32 md:pt-44 pb-12 md:pb-20">
        <div className="container-editorial max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-sage-deep">Contacto</p>
          <h1 className="mt-5 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-balance leading-[1.02] animate-fade-up">
            Un primer <span className="italic text-sage-deep">paso</span>.
          </h1>
          <p className="mt-7 text-lg text-muted-foreground max-w-2xl leading-relaxed animate-fade-up delay-100">
            Cuéntame qué te trae. Te responderé personalmente en un plazo máximo de 48 horas
            laborables para acordar juntas cómo empezar.
          </p>
        </div>
      </section>

      <section className="container-editorial pb-24 md:pb-32 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <Reveal className="space-y-4">
          <div className="rounded-2xl border border-border/70 bg-cream p-7">
            <p className="text-xs uppercase tracking-[0.22em] text-sage-deep">Escríbeme</p>
            <a href="mailto:hola@orpheuspsicologia.com" className="mt-3 flex items-center gap-3 font-serif text-lg hover:text-sage-deep transition-colors">
              <Mail className="size-4" /> hola@orpheuspsicologia.com
            </a>
          </div>
          <div className="rounded-2xl border border-border/70 bg-cream p-7">
            <p className="text-xs uppercase tracking-[0.22em] text-sage-deep">Teléfono</p>
            <a href="tel:+34600000000" className="mt-3 flex items-center gap-3 font-serif text-lg hover:text-sage-deep transition-colors">
              <Phone className="size-4" /> +34 600 000 000
            </a>
          </div>
          <div className="rounded-2xl border border-border/70 bg-cream p-7">
            <p className="text-xs uppercase tracking-[0.22em] text-sage-deep">Redes</p>
            <a href="https://instagram.com/orpheus.psicologia" target="_blank" rel="noreferrer" className="mt-3 flex items-center gap-3 font-serif text-lg hover:text-sage-deep transition-colors">
              <Instagram className="size-4" /> @orpheus.psicologia
            </a>
          </div>
          <div className="rounded-2xl bg-sage-deep text-primary-foreground p-7">
            <p className="text-xs uppercase tracking-[0.22em] text-sage-soft">Próximamente</p>
            <p className="mt-3 font-serif text-lg leading-snug">
              Reservas online integradas directamente desde la web.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <form
            onSubmit={onSubmit}
            className="rounded-[2rem] border border-border/70 bg-background p-8 md:p-12"
          >
            <h2 className="font-serif text-2xl md:text-3xl">Solicitar información</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Todos los campos son confidenciales.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field label="Nombre" required>
                <input
                  required
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="input-field"
                />
              </Field>
              <Field label="Email" required>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field"
                />
              </Field>
              <Field label="Teléfono">
                <input
                  type="tel"
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  className="input-field"
                />
              </Field>
              <Field label="Motivo de consulta">
                <select
                  value={form.motivo}
                  onChange={(e) => setForm({ ...form, motivo: e.target.value })}
                  className="input-field bg-transparent"
                >
                  <option value="">Selecciona</option>
                  {motivos.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </Field>
            </div>
            <div className="mt-5">
              <Field label="Mensaje">
                <textarea
                  rows={5}
                  value={form.mensaje}
                  onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                  className="input-field resize-none"
                  placeholder="Cuéntame brevemente qué te trae aquí."
                />
              </Field>
            </div>

            <button
              type="submit"
              className="mt-8 group inline-flex items-center gap-2 rounded-full bg-sage-deep text-primary-foreground px-7 py-4 text-sm hover:bg-foreground transition-colors"
            >
              {sent ? <><Check className="size-4" /> Mensaje preparado</> : <>Solicitar información <Send className="size-4 group-hover:translate-x-0.5 transition-transform" /></>}
            </button>
            <p className="mt-4 text-xs text-muted-foreground">
              Al enviar aceptas la política de privacidad. Tus datos se tratan con confidencialidad.
            </p>
          </form>
        </Reveal>
      </section>

      {/* Floating WhatsApp / contact button */}
      <a
        href="mailto:hola@orpheuspsicologia.com"
        aria-label="Contactar"
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-sage-deep text-primary-foreground px-5 py-3.5 text-sm shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] hover:bg-foreground transition-colors"
      >
        <MessageCircle className="size-4" />
        <span className="hidden sm:inline">Escríbeme</span>
      </a>

      <style>{`
        .input-field {
          width: 100%;
          border: 0;
          border-bottom: 1px solid var(--border);
          background: transparent;
          padding: 0.75rem 0;
          font-size: 0.95rem;
          color: var(--foreground);
          outline: none;
          transition: border-color 0.3s ease;
        }
        .input-field:focus { border-color: var(--sage-deep); }
      `}</style>
    </Layout>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.2em] text-sage-deep mb-1">
        {label}{required && <span className="text-muted-foreground"> · obligatorio</span>}
      </span>
      {children}
    </label>
  );
}
