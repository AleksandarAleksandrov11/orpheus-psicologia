/**
 * SIMULADOR DE BENEFICIO SOCIAL DE PSICOLOGÍA
 * ------------------------------------------------------------------
 * Reimplementación del simulador que Melissa tiene publicado, con su
 * misma tabla de precios y sus mismas fórmulas. Dos diferencias
 * deliberadas respecto al original:
 *
 *  1. Los resultados no se ocultan tras un formulario. Se ven al
 *     instante y la solicitud de propuesta va después, ya con el
 *     cálculo hecho: convierte igual y no penaliza en buscadores.
 *  2. Los datos de contacto no se envían a un formulario de Google en
 *     segundo plano, sino que se redactan en un correo que la persona
 *     ve y envía. Sin transferencias silenciosas a terceros.
 */

import { useMemo, useState, type ReactNode } from "react";
import { Download } from "lucide-react";

import { EMPRESAS } from "@/content/copy";
import { SITE } from "@/content/site";
import { Boton, BotonExterno } from "./ui";
import { Reveal } from "./motion";

/* ── Tarifas vigentes ───────────────────────────────────────────── */

/** Precio por sesión de psicoterapia según el volumen contratado. */
const TRAMOS = [
  { hasta: 50, precio: 60 },
  { hasta: 100, precio: 59 },
  { hasta: 150, precio: 58 },
  { hasta: 200, precio: 57 },
  { hasta: 250, precio: 56 },
  { hasta: 300, precio: 55 },
  { hasta: Infinity, precio: 54 },
] as const;

const PRECIO_CONCIENCIACION = 500;
const MAX_PERSONAS_POR_SESION = 30;
/** Precio medio de una sesión privada, para la comparativa. */
const PRECIO_MERCADO = 70;

const precioPorSesion = (sesiones: number) =>
  TRAMOS.find((t) => sesiones <= t.hasta)?.precio ?? TRAMOS[TRAMOS.length - 1].precio;

/* ── Formato ────────────────────────────────────────────────────── */

/**
 * Formateo manual en lugar de `Intl`: el servidor y el navegador pueden
 * resolver la misma llamada de forma distinta y romper la hidratación.
 */
function euros(n: number, decimales = 2): string {
  if (!Number.isFinite(n)) return "—";
  const fijo = Math.abs(n).toFixed(decimales);
  const [entera, decimal] = fijo.split(".");
  const conMiles = entera.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const signo = n < 0 ? "-" : "";
  return `${signo}${conMiles}${decimal ? `,${decimal}` : ""} €`;
}

const entero = (v: string): number => {
  const n = Number(v);
  if (!v.trim() || !Number.isFinite(n)) return NaN;
  return Math.max(0, Math.floor(n));
};

/* ── Cálculo ────────────────────────────────────────────────────── */

type Entradas = { empleados: string; sesiones: string; subvencion: string; concienciacion: string };

function calcular({ empleados, sesiones, subvencion, concienciacion }: Entradas) {
  const nEmp = entero(empleados);
  const hayEmp = Number.isFinite(nEmp) && nEmp > 0;

  // Recomendación: 10 % de la plantilla se beneficia, 8 sesiones cada persona.
  const recomendadas = hayEmp ? Math.ceil(0.8 * nEmp) : NaN;
  const recConcienciacion = hayEmp ? Math.ceil(nEmp / MAX_PERSONAS_POR_SESION) : NaN;

  const nSes = entero(sesiones);
  const nCon = entero(concienciacion);
  const pct = Math.min(100, Math.max(0, Number(subvencion) || 0));

  const porSesion = Number.isFinite(nSes) && nSes > 0 ? precioPorSesion(nSes) : NaN;
  const pagaEmpresaPorSesion = Number.isFinite(porSesion) ? porSesion * (pct / 100) : NaN;
  const pagaEmpleadoPorSesion = Number.isFinite(porSesion) ? porSesion - pagaEmpresaPorSesion : NaN;

  const costePsico =
    Number.isFinite(nSes) && Number.isFinite(porSesion) ? nSes * (pct / 100) * porSesion : 0;
  const costeConcienciacion = Number.isFinite(nCon) ? nCon * PRECIO_CONCIENCIACION : 0;
  const total = costePsico + costeConcienciacion;

  const porEmpleado = hayEmp ? total / nEmp : NaN;
  const porEmpleadoMes = Number.isFinite(porEmpleado) ? porEmpleado / 12 : NaN;
  const alDia = total / 365;

  const masBarato = Number.isFinite(pagaEmpleadoPorSesion)
    ? Math.max(0, ((PRECIO_MERCADO - pagaEmpleadoPorSesion) / PRECIO_MERCADO) * 100)
    : NaN;
  const gratisParaEmpleado = Number.isFinite(pagaEmpleadoPorSesion) && pagaEmpleadoPorSesion <= 0;

  return {
    nEmp,
    hayEmp,
    recomendadas,
    recConcienciacion,
    nSes,
    nCon,
    pct,
    porSesion,
    pagaEmpresaPorSesion,
    pagaEmpleadoPorSesion,
    costePsico,
    costeConcienciacion,
    total,
    porEmpleado,
    porEmpleadoMes,
    alDia,
    masBarato,
    gratisParaEmpleado,
  };
}

/* ── Piezas de interfaz ─────────────────────────────────────────── */

function Paso({
  n,
  titulo,
  sub,
  children,
}: {
  n: ReactNode;
  titulo: string;
  sub: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-on-dark/18 bg-on-dark/[0.05] p-6 md:p-8">
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="grid size-8 shrink-0 place-items-center rounded-full border border-on-dark/25 bg-on-dark/10 text-[0.88rem] text-on-dark"
        >
          {n}
        </span>
        <div>
          <h3 className="font-display text-[1.32rem] leading-tight text-on-dark md:text-[1.5rem]">
            {titulo}
          </h3>
          <p className="mt-1.5 text-[0.96rem] leading-relaxed font-light text-on-dark-muted">
            {sub}
          </p>
        </div>
      </div>
      <div className="mt-7">{children}</div>
    </section>
  );
}

function Campo({
  id,
  etiqueta,
  ayuda,
  children,
}: {
  id: string;
  etiqueta: string;
  ayuda?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow block text-on-dark-faint">
        {etiqueta}
      </label>
      <div className="mt-3">{children}</div>
      {ayuda ? (
        <p className="mt-2.5 text-[0.88rem] leading-relaxed font-light text-on-dark-faint">
          {ayuda}
        </p>
      ) : null}
    </div>
  );
}

const CAMPO_EDITABLE =
  "w-full rounded-lg border border-on-dark/25 bg-bone px-4 py-3 font-sans text-[1rem] font-light text-moss transition-colors duration-300 focus:border-aloe focus:outline-none";
const CAMPO_CALCULADO =
  "w-full rounded-lg border border-dashed border-on-dark/25 bg-transparent px-4 py-3 font-sans text-[1rem] font-light text-on-dark";

function Kpi({ titulo, valor, detalle }: { titulo: string; valor: string; detalle: string }) {
  return (
    <div className="rounded-2xl border border-on-dark/18 bg-on-dark/[0.06] p-6 md:p-7">
      <p className="eyebrow text-on-dark-faint">{titulo}</p>
      <p className="mt-4 font-display text-[2.1rem] leading-none text-on-dark md:text-[2.5rem]">
        {valor}
      </p>
      <p className="mt-3 text-[0.91rem] leading-relaxed font-light text-on-dark-muted">{detalle}</p>
    </div>
  );
}

/* ── Componente ─────────────────────────────────────────────────── */

const INICIAL: Entradas = {
  empleados: "",
  sesiones: "",
  subvencion: "50",
  concienciacion: "",
};

export function SimuladorEmpresas() {
  const [datos, setDatos] = useState<Entradas>(INICIAL);
  const [tocado, setTocado] = useState({ sesiones: false, concienciacion: false });
  const [contacto, setContacto] = useState({ nombre: "", empresa: "", email: "" });
  const [errorEmail, setErrorEmail] = useState("");

  const r = useMemo(() => {
    // Mientras no se toquen a mano, las sesiones siguen la recomendación.
    const efectivas: Entradas = {
      ...datos,
      sesiones:
        !tocado.sesiones && !datos.sesiones.trim() && Number.isFinite(entero(datos.empleados))
          ? String(Math.ceil(0.8 * entero(datos.empleados)))
          : datos.sesiones,
      concienciacion:
        !tocado.concienciacion &&
        !datos.concienciacion.trim() &&
        Number.isFinite(entero(datos.empleados))
          ? String(Math.ceil(entero(datos.empleados) / MAX_PERSONAS_POR_SESION))
          : datos.concienciacion,
    };
    return calcular(efectivas);
  }, [datos, tocado]);

  const actualizar = (clave: keyof Entradas) => (valor: string) =>
    setDatos((previo) => ({ ...previo, [clave]: valor }));

  const hayCalculo = r.hayEmp && r.total > 0;

  const solicitar = () => {
    if (contacto.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contacto.email.trim())) {
      setErrorEmail("Revisa el correo: parece que le falta algo.");
      return;
    }
    setErrorEmail("");
    const lineas = [
      `Empresa: ${contacto.empresa.trim() || "(sin indicar)"}`,
      `Persona de contacto: ${contacto.nombre.trim() || "(sin indicar)"}`,
      `Email: ${contacto.email.trim() || "(sin indicar)"}`,
      "",
      "Simulación realizada en la web:",
      `· Empleados: ${r.hayEmp ? r.nEmp : "(sin indicar)"}`,
      `· Sesiones de psicoterapia: ${Number.isFinite(r.nSes) ? r.nSes : 0} a ${euros(r.porSesion)} por sesión`,
      `· Subvención de la empresa: ${r.pct} %`,
      `· Sesiones de concienciación: ${Number.isFinite(r.nCon) ? r.nCon : 0}`,
      "",
      `Coste total estimado para la empresa: ${euros(r.total)}`,
      `Coste por empleado y año: ${euros(r.porEmpleado)}`,
      `Coste por empleado y mes: ${euros(r.porEmpleadoMes)}`,
      `Precio por sesión para el empleado: ${euros(r.pagaEmpleadoPorSesion)}`,
    ].join("\n");

    window.location.href = `mailto:${SITE.contacto.email}?subject=${encodeURIComponent(
      `Propuesta para equipos · ${contacto.empresa.trim() || "empresa"}`,
    )}&body=${encodeURIComponent(lineas)}`;
  };

  return (
    <div className="on-dark grain-dark relative isolate overflow-hidden rounded-3xl bg-moss p-7 md:p-11">
      <span
        aria-hidden="true"
        className="anim-breathe pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-olive/25 blur-3xl"
      />

      <div className="relative z-10">
        <div className="space-y-5">
          <Paso
            n="1"
            titulo="¿Cuántas personas sois?"
            sub="Con la plantilla calculo las sesiones recomendadas de psicoterapia y de concienciación."
          >
            <div className="max-w-xs">
              <Campo
                id="sim-empleados"
                etiqueta="Nº de empleados"
                ayuda="La recomendación parte de que se beneficie el 10 % de la plantilla, con ocho sesiones por persona."
              >
                <input
                  id="sim-empleados"
                  type="number"
                  min={1}
                  step={1}
                  inputMode="numeric"
                  placeholder="Ej. 120"
                  value={datos.empleados}
                  onChange={(e) => actualizar("empleados")(e.target.value)}
                  className={CAMPO_EDITABLE}
                />
              </Campo>
            </div>
          </Paso>

          <Paso
            n="2"
            titulo="Psicoterapia para el equipo"
            sub="Elige cuántas sesiones contratáis y qué parte asume la empresa."
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Campo
                id="sim-recomendadas"
                etiqueta="Sesiones recomendadas"
                ayuda="Cálculo automático."
              >
                <input
                  id="sim-recomendadas"
                  readOnly
                  value={Number.isFinite(r.recomendadas) ? String(r.recomendadas) : ""}
                  placeholder="Introduce la plantilla"
                  className={CAMPO_CALCULADO}
                />
              </Campo>

              <Campo
                id="sim-sesiones"
                etiqueta="Sesiones a contratar"
                ayuda="A más volumen, menor precio por sesión."
              >
                <input
                  id="sim-sesiones"
                  type="number"
                  min={0}
                  step={1}
                  inputMode="numeric"
                  placeholder="Ej. 96"
                  value={
                    !tocado.sesiones && !datos.sesiones && Number.isFinite(r.recomendadas)
                      ? String(r.recomendadas)
                      : datos.sesiones
                  }
                  onChange={(e) => {
                    setTocado((t) => ({ ...t, sesiones: true }));
                    actualizar("sesiones")(e.target.value);
                  }}
                  className={CAMPO_EDITABLE}
                />
              </Campo>

              <Campo
                id="sim-precio"
                etiqueta="Precio por sesión"
                ayuda="Según el tramo de volumen contratado."
              >
                <input
                  id="sim-precio"
                  readOnly
                  value={Number.isFinite(r.porSesion) ? euros(r.porSesion) : ""}
                  placeholder="Introduce las sesiones"
                  className={CAMPO_CALCULADO}
                />
              </Campo>

              <Campo
                id="sim-subvencion"
                etiqueta="% que subvenciona la empresa"
                ayuda={
                  Number.isFinite(r.porSesion)
                    ? `De ${euros(r.porSesion)} por sesión, la empresa pone ${euros(
                        r.pagaEmpresaPorSesion,
                      )} y la persona ${euros(r.pagaEmpleadoPorSesion)}.`
                    : "Introduce las sesiones para ver el reparto."
                }
              >
                <input
                  id="sim-subvencion"
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  inputMode="numeric"
                  value={datos.subvencion}
                  onChange={(e) => actualizar("subvencion")(e.target.value)}
                  className={CAMPO_EDITABLE}
                />
              </Campo>
            </div>
          </Paso>

          <Paso
            n="3"
            titulo="Concienciación en salud mental"
            sub={`Cuatro horas en grupo sobre salud mental. ${euros(PRECIO_CONCIENCIACION, 0)} por sesión, hasta ${MAX_PERSONAS_POR_SESION} personas.`}
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Campo
                id="sim-rec-concienciacion"
                etiqueta="Sesiones sugeridas"
                ayuda={
                  r.hayEmp
                    ? `${r.recConcienciacion} sesión(es) para ${r.nEmp} personas, sin pasar de ${MAX_PERSONAS_POR_SESION} por grupo.`
                    : "Cálculo automático."
                }
              >
                <input
                  id="sim-rec-concienciacion"
                  readOnly
                  value={Number.isFinite(r.recConcienciacion) ? String(r.recConcienciacion) : ""}
                  placeholder="Introduce la plantilla"
                  className={CAMPO_CALCULADO}
                />
              </Campo>

              <Campo
                id="sim-concienciacion"
                etiqueta="Sesiones que queréis"
                ayuda="Se pueden contratar por separado."
              >
                <input
                  id="sim-concienciacion"
                  type="number"
                  min={0}
                  step={1}
                  inputMode="numeric"
                  placeholder="Ej. 4"
                  value={
                    !tocado.concienciacion &&
                    !datos.concienciacion &&
                    Number.isFinite(r.recConcienciacion)
                      ? String(r.recConcienciacion)
                      : datos.concienciacion
                  }
                  onChange={(e) => {
                    setTocado((t) => ({ ...t, concienciacion: true }));
                    actualizar("concienciacion")(e.target.value);
                  }}
                  className={CAMPO_EDITABLE}
                />
              </Campo>
            </div>
          </Paso>
        </div>

        {/* ── Resultados ── */}
        <div className="mt-10 border-t border-on-dark/18 pt-10" aria-live="polite">
          <p className="eyebrow text-on-dark-faint">Resultado estimado</p>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <Kpi
              titulo="Coste total para la empresa"
              valor={hayCalculo ? euros(r.total) : "—"}
              detalle={
                hayCalculo
                  ? `Psicoterapia ${euros(r.costePsico)} · Concienciación ${euros(r.costeConcienciacion)}`
                  : "Introduce la plantilla y las sesiones."
              }
            />
            <Kpi
              titulo="Por empleado y año"
              valor={hayCalculo ? euros(r.porEmpleado) : "—"}
              detalle={hayCalculo ? `${euros(r.total)} entre ${r.nEmp} personas` : "—"}
            />
            <Kpi
              titulo="Por empleado y mes"
              valor={hayCalculo ? euros(r.porEmpleadoMes) : "—"}
              detalle="Coste anual repartido en doce meses"
            />
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-2xl border border-on-dark/18 bg-on-dark/[0.06] p-6 md:p-7">
              <p className="eyebrow text-on-dark-faint">Comparativa con el mercado</p>
              <dl className="mt-6 space-y-4">
                {[
                  [
                    "Precio por sesión para el empleado",
                    hayCalculo ? euros(r.pagaEmpleadoPorSesion) : "—",
                  ],
                  ["Precio medio de mercado", euros(PRECIO_MERCADO)],
                  [
                    "Diferencia",
                    !hayCalculo || !Number.isFinite(r.masBarato)
                      ? "—"
                      : r.gratisParaEmpleado
                        ? "Sin coste"
                        : `${Math.round(r.masBarato)} % más barato`,
                  ],
                ].map(([etiqueta, valor]) => (
                  <div
                    key={etiqueta}
                    className="flex items-baseline justify-between gap-6 border-b border-on-dark/12 pb-4 last:border-b-0 last:pb-0"
                  >
                    <dt className="text-[0.99rem] font-light text-on-dark-muted">{etiqueta}</dt>
                    <dd className="font-display text-[1.35rem] text-on-dark">{valor}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex flex-col justify-center rounded-2xl border border-aloe/30 bg-aloe/10 p-6 md:p-7">
              <p className="cita-menor text-[1.35rem] leading-snug text-on-dark md:text-[1.55rem]">
                {!hayCalculo || !Number.isFinite(r.masBarato)
                  ? "Completa los tres pasos y aquí verás cuánto cuesta al día."
                  : r.gratisParaEmpleado
                    ? `Por ${euros(r.alDia)} al día, tu equipo accede a psicoterapia sin que le cueste nada.`
                    : `Por ${euros(r.alDia)} al día, tu equipo accede a psicoterapia un ${Math.round(r.masBarato)} % más barata que en el mercado.`}
              </p>
            </div>
          </div>

          <p className="mt-6 text-[0.91rem] leading-relaxed font-light text-on-dark-faint">
            {EMPRESAS.simulador.nota}
          </p>
        </div>

        {/* ── Solicitud de propuesta ── */}
        <div className="mt-10 border-t border-on-dark/18 pt-10">
          <h3 className="font-display text-[1.5rem] leading-tight text-on-dark md:text-[1.8rem]">
            ¿Te encaja? Te preparo la propuesta.
          </h3>
          <p className="mt-3 max-w-xl text-[1.01rem] leading-relaxed font-light text-on-dark-muted">
            Al enviarla se adjunta la simulación que acabas de hacer, para no repetir números.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <Campo id="sim-empresa" etiqueta="Empresa">
              <input
                id="sim-empresa"
                type="text"
                autoComplete="organization"
                placeholder="Mi Empresa S. L."
                value={contacto.empresa}
                onChange={(e) => setContacto((c) => ({ ...c, empresa: e.target.value }))}
                className={CAMPO_EDITABLE}
              />
            </Campo>
            <Campo id="sim-nombre" etiqueta="Tu nombre">
              <input
                id="sim-nombre"
                type="text"
                autoComplete="name"
                placeholder="Ana Pérez"
                value={contacto.nombre}
                onChange={(e) => setContacto((c) => ({ ...c, nombre: e.target.value }))}
                className={CAMPO_EDITABLE}
              />
            </Campo>
            <Campo id="sim-email" etiqueta="Correo" ayuda={errorEmail || undefined}>
              <input
                id="sim-email"
                type="email"
                autoComplete="email"
                placeholder="nombre@empresa.com"
                value={contacto.email}
                onChange={(e) => setContacto((c) => ({ ...c, email: e.target.value }))}
                aria-invalid={errorEmail ? true : undefined}
                className={CAMPO_EDITABLE}
              />
            </Campo>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Boton type="button" variante="light" onClick={solicitar}>
              Pedir propuesta
            </Boton>
            <BotonExterno
              href={EMPRESAS.dosier.archivo}
              download
              variante="ghost-dark"
              flecha={false}
            >
              <Download className="size-4" strokeWidth={1.6} aria-hidden="true" />
              {EMPRESAS.dosier.etiqueta}
            </BotonExterno>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Envoltorio con revelado, para usarlo directamente en la página. */
export function BloqueSimulador() {
  return (
    <Reveal variant="scale" delay={100}>
      <SimuladorEmpresas />
    </Reveal>
  );
}
