import { Link } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

import { Boton, BotonEnlace } from "@/components/site/ui";
import { SITE } from "@/content/site";
import {
  MAX_PUNTOS,
  OPCIONES,
  PREGUNTAS,
  TOTAL_PREGUNTAS,
  calcular,
} from "@/content/test-autoexigencia";

type Fase = "intro" | "preguntas" | "datos" | "final";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Mensaje para cada fallo que puede devolver el servidor. */
function mensajeError(estado: number | null): string {
  if (estado === 429)
    return "Has enviado varios tests seguidos. Espera un rato y vuelve a intentarlo.";
  if (estado === 503)
    return `El test todavía no está disponible. Escríbeme a ${SITE.contacto.email} y lo vemos.`;
  return `No he podido enviar tus respuestas. Comprueba la conexión y vuelve a intentarlo; si sigue fallando, escríbeme a ${SITE.contacto.email}.`;
}

export function TestAutoexigencia() {
  const [fase, setFase] = useState<Fase>("intro");
  const [actual, setActual] = useState(0);
  const [respuestas, setRespuestas] = useState<(number | null)[]>(() =>
    Array(TOTAL_PREGUNTAS).fill(null),
  );
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [consentimiento, setConsentimiento] = useState(false);
  const [novedades, setNovedades] = useState(false);
  const [trampa, setTrampa] = useState("");
  const [errores, setErrores] = useState<{ email?: string; consentimiento?: string }>({});
  const [errorEnvio, setErrorEnvio] = useState("");
  const [enviando, setEnviando] = useState(false);
  const foco = useRef<HTMLLegendElement>(null);
  const tope = useRef<HTMLDivElement>(null);

  // Al cambiar de pregunta o de paso, el foco va al enunciado: quien usa
  // lector de pantalla o teclado no se queda en un botón que ya no está.
  useEffect(() => {
    if (fase === "preguntas") foco.current?.focus({ preventScroll: true });
    if (fase !== "intro") tope.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [actual, fase]);

  const respondida = respuestas[actual] !== null;
  const porcentaje = Math.round(((actual + 1) / TOTAL_PREGUNTAS) * 100);

  const elegir = (valor: number) =>
    setRespuestas((prev) => prev.map((v, i) => (i === actual ? valor : v)));

  const siguiente = () => {
    if (!respondida) return;
    if (actual < TOTAL_PREGUNTAS - 1) setActual(actual + 1);
    else setFase("datos");
  };

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    const nuevos: typeof errores = {};
    if (!EMAIL.test(email.trim())) nuevos.email = "Escribe un correo electrónico válido.";
    if (!consentimiento)
      nuevos.consentimiento = "Necesito tu consentimiento para poder recibir tus respuestas.";
    setErrores(nuevos);
    setErrorEnvio("");
    if (Object.keys(nuevos).length) return;

    setEnviando(true);
    try {
      const respuesta = await fetch("/api/test-autoexigencia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          email: email.trim(),
          respuestas,
          consentimiento: true,
          novedades,
          web: trampa,
        }),
      });
      if (!respuesta.ok) {
        setErrorEnvio(mensajeError(respuesta.status));
        return;
      }
      setFase("final");
    } catch {
      setErrorEnvio(mensajeError(null));
    } finally {
      setEnviando(false);
    }
  };

  const resultado = fase === "final" ? calcular(respuestas as number[]) : null;

  return (
    <div ref={tope} className="scroll-mt-28 rounded-3xl border border-rule bg-paper/70 p-6 md:p-12">
      {fase === "intro" ? (
        <div>
          <ul className="flex flex-wrap gap-2.5 text-[0.93rem] font-light text-ink-muted">
            {[`${TOTAL_PREGUNTAS} preguntas`, "3 a 5 minutos", "Sin respuestas correctas"].map(
              (t) => (
                <li key={t} className="rounded-full border border-rule-strong px-4 py-2">
                  {t}
                </li>
              ),
            )}
          </ul>
          <p className="prose-body mt-7 max-w-2xl">
            Responde pensando en cómo te has sentido durante el último mes. Al terminar verás una
            puntuación orientativa y cómo se reparte por ámbitos de tu vida.
          </p>
          <p className="mt-5 max-w-2xl text-[0.93rem] leading-relaxed font-light text-ink-faint">
            Es una herramienta de autoconocimiento. No es una prueba diagnóstica ni está validada
            psicométricamente, y su resultado no sustituye una valoración profesional.
          </p>
          <div className="mt-9">
            <Boton type="button" flecha onClick={() => setFase("preguntas")}>
              Empezar el test
            </Boton>
          </div>
        </div>
      ) : null}

      {fase === "preguntas" ? (
        <div>
          <div className="flex items-center justify-between gap-4 text-[0.89rem] font-light text-ink-faint">
            <span>
              Pregunta {actual + 1} de {TOTAL_PREGUNTAS}
            </span>
            <span>{porcentaje} %</span>
          </div>
          <div
            role="progressbar"
            aria-label="Progreso del test"
            aria-valuemin={0}
            aria-valuemax={TOTAL_PREGUNTAS}
            aria-valuenow={actual + 1}
            className="mt-3 h-1.5 overflow-hidden rounded-full bg-rule"
          >
            <div
              className="h-full rounded-full bg-cypress transition-[width] duration-500"
              style={{ width: `${porcentaje}%` }}
            />
          </div>

          <fieldset className="mt-10">
            {/* El ámbito y el enunciado van juntos dentro del <legend>: fuera,
                el navegador sube el legend y deja el ámbito debajo. */}
            <legend ref={foco} tabIndex={-1} className="block w-full outline-none">
              <span className="eyebrow block text-olive">{PREGUNTAS[actual][0]}</span>
              <span className="mt-4 block font-display text-[1.45rem] leading-[1.3] text-ink md:text-[1.8rem]">
                {PREGUNTAS[actual][1]}
              </span>
            </legend>
            <div className="mt-8 grid gap-3">
              {OPCIONES.map((etiqueta, valor) => (
                <label
                  key={etiqueta}
                  className="flex cursor-pointer items-center gap-3.5 rounded-2xl border border-rule-strong px-5 py-3.5 text-[1.03rem] font-light text-ink-muted transition-colors duration-300 hover:border-olive has-[:checked]:border-moss has-[:checked]:bg-moss has-[:checked]:text-bone has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cypress"
                >
                  <input
                    type="radio"
                    name={`pregunta-${actual}`}
                    value={valor}
                    checked={respuestas[actual] === valor}
                    onChange={() => elegir(valor)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className="grid size-4 shrink-0 place-items-center rounded-full border border-current"
                  >
                    {respuestas[actual] === valor ? (
                      <span className="size-2 rounded-full bg-current" />
                    ) : null}
                  </span>
                  {etiqueta}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Boton
              type="button"
              variante="outline"
              className={actual === 0 ? "invisible" : ""}
              onClick={() => setActual(actual - 1)}
              tabIndex={actual === 0 ? -1 : undefined}
            >
              Anterior
            </Boton>
            <Boton type="button" onClick={siguiente} disabled={!respondida}>
              {actual === TOTAL_PREGUNTAS - 1 ? "Continuar" : "Siguiente"}
            </Boton>
          </div>
        </div>
      ) : null}

      {fase === "datos" ? (
        <form onSubmit={enviar} noValidate>
          <p className="eyebrow text-olive">Último paso</p>
          <h2 className="display-sm mt-4">Deja tu correo para ver el resultado</h2>
          <p className="prose-body mt-5 max-w-2xl">
            Verás tu puntuación al instante. Tus respuestas me llegan por correo electrónico, para
            que pueda revisarlas, y no se guardan en esta web.
          </p>

          <div className="mt-8 grid gap-7 sm:grid-cols-2">
            <div>
              <label htmlFor="test-nombre" className="eyebrow block text-ink-faint">
                Nombre
              </label>
              <input
                id="test-nombre"
                type="text"
                autoComplete="name"
                maxLength={100}
                className="field mt-1.5"
                placeholder="Opcional"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="test-email" className="eyebrow block text-ink-faint">
                Correo
                <span aria-hidden="true" className="ml-1 text-olive">
                  *
                </span>
              </label>
              <input
                id="test-email"
                type="email"
                autoComplete="email"
                maxLength={254}
                required
                className="field mt-1.5"
                placeholder="tucorreo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={errores.email ? true : undefined}
                aria-describedby={errores.email ? "test-email-error" : undefined}
              />
              {errores.email ? (
                <p
                  id="test-email-error"
                  className="mt-2 flex items-start gap-1.5 text-[0.86rem] text-destructive"
                >
                  <TriangleAlert
                    className="mt-0.5 size-3.5 shrink-0"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  {errores.email}
                </p>
              ) : null}
            </div>
          </div>

          {/* Campo trampa para robots: una persona no lo ve ni lo rellena. */}
          <div aria-hidden="true" className="absolute -left-[10000px] size-px overflow-hidden">
            <label htmlFor="test-web">No rellenar</label>
            <input
              id="test-web"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={trampa}
              onChange={(e) => setTrampa(e.target.value)}
            />
          </div>

          <div
            className={`mt-9 rounded-2xl border p-6 md:p-7 ${
              errores.consentimiento ? "border-destructive/50 bg-paper" : "border-rule bg-paper/60"
            }`}
          >
            <div className="flex items-start gap-3.5">
              <input
                id="test-consentimiento"
                type="checkbox"
                required
                className="mt-1 size-4 shrink-0 accent-moss"
                checked={consentimiento}
                onChange={(e) => setConsentimiento(e.target.checked)}
                aria-invalid={errores.consentimiento ? true : undefined}
                aria-describedby="test-consentimiento-ayuda"
              />
              <div>
                <label
                  htmlFor="test-consentimiento"
                  className="block cursor-pointer text-[0.99rem] leading-relaxed font-light text-ink"
                >
                  He leído la política de privacidad y consiento expresamente el tratamiento de mis
                  respuestas, que pueden revelar información sobre mi salud, para recibir mi
                  resultado y para que la psicóloga pueda revisarlas.
                  <span aria-hidden="true" className="ml-1 text-olive">
                    *
                  </span>
                </label>
                <p
                  id="test-consentimiento-ayuda"
                  className="mt-2.5 text-[0.89rem] leading-relaxed font-light text-ink-faint"
                >
                  Responsable: {SITE.titular.nombre}. Puedes retirar el consentimiento cuando
                  quieras escribiendo a {SITE.privacidad.email}. Todo el detalle está en la{" "}
                  <Link
                    to="/politica-de-privacidad"
                    target="_blank"
                    className="link-draw text-cypress"
                  >
                    política de privacidad
                  </Link>
                  .
                </p>
              </div>
            </div>
            {errores.consentimiento ? (
              <p
                role="alert"
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

          <div className="mt-5 flex items-start gap-3.5 px-1">
            <input
              id="test-novedades"
              type="checkbox"
              className="mt-1 size-4 shrink-0 accent-moss"
              checked={novedades}
              onChange={(e) => setNovedades(e.target.checked)}
            />
            <label
              htmlFor="test-novedades"
              className="cursor-pointer text-[0.96rem] leading-relaxed font-light text-ink-muted"
            >
              Quiero recibir artículos y novedades de Orpheus Psicología por correo. Es opcional, es
              independiente del test y puedo retirarlo cuando quiera.
            </label>
          </div>

          {errorEnvio ? (
            <p role="alert" className="mt-6 flex items-start gap-2 text-[0.96rem] text-destructive">
              <TriangleAlert
                className="mt-1 size-4 shrink-0"
                strokeWidth={1.7}
                aria-hidden="true"
              />
              {errorEnvio}
            </p>
          ) : null}

          <div className="mt-9 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Boton type="button" variante="outline" onClick={() => setFase("preguntas")}>
              Volver al test
            </Boton>
            <Boton type="submit" flecha disabled={enviando}>
              {enviando ? "Enviando…" : "Ver mi resultado"}
            </Boton>
          </div>
        </form>
      ) : null}

      {resultado ? (
        <div aria-live="polite">
          <p className="eyebrow text-olive">Gracias por dedicarte este momento</p>
          <div className="mt-6 rounded-2xl bg-linen p-7 md:p-9">
            <p className="text-[0.89rem] font-light text-ink-faint">Tu puntuación orientativa</p>
            <p className="mt-2 font-display text-[3.2rem] leading-none text-cypress">
              {resultado.total}
              <span className="text-[1.6rem] text-ink-faint"> / {MAX_PUNTOS}</span>
            </p>
            <h2 className="display-sm mt-6">{resultado.nivel.titulo}</h2>
            <p className="prose-body mt-3">{resultado.nivel.texto}</p>
          </div>

          <h3 className="eyebrow mt-10 text-ink-faint">Tus respuestas por ámbitos</h3>
          <ul className="mt-5 grid gap-4">
            {resultado.ambitos.map((a) => (
              <li
                key={a.nombre}
                className="grid items-center gap-x-4 gap-y-1.5 text-[0.96rem] font-light text-ink-muted sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_3rem]"
              >
                <span>{a.nombre}</span>
                <span
                  role="img"
                  aria-label={`${a.puntos} de ${a.max} puntos`}
                  className="block h-1.5 overflow-hidden rounded-full bg-rule"
                >
                  <span
                    className="block h-full rounded-full bg-cypress"
                    style={{ width: `${a.porcentaje}%` }}
                  />
                </span>
                <span className="text-ink sm:text-right">
                  {a.puntos}/{a.max}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-9 max-w-2xl text-[0.93rem] leading-relaxed font-light text-ink-faint">
            Esta interpretación es orientativa y no es un diagnóstico. Una puntuación baja tampoco
            descarta dificultades que merezcan atención.
          </p>
          <p className="prose-body mt-6 max-w-2xl">
            Si al responder has reconocido situaciones que te generan malestar, puedes ver cómo
            trabajo la{" "}
            <Link to="/servicios" hash="autoexigencia" className="link-draw text-cypress">
              autoexigencia y el perfeccionismo
            </Link>
            .
          </p>
          <div className="mt-8">
            <BotonEnlace to="/contacto">Reservar una primera sesión</BotonEnlace>
          </div>
        </div>
      ) : null}
    </div>
  );
}
