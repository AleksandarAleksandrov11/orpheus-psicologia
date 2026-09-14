/**
 * Resuelve la textura declarada por cada artículo (`imagen`) en el fichero
 * real, su variante pequeña y sus dimensiones, para poder componer el
 * `srcSet` y fijar `width`/`height` sin provocar saltos de maquetación.
 */

import type { Articulo } from "@/content/articulos";

import texNiebla from "@/assets/tex-niebla.webp";
import texNieblaSm from "@/assets/tex-niebla@sm.webp";
import texBosque from "@/assets/tex-bosque.webp";
import texBosqueSm from "@/assets/tex-bosque@sm.webp";
import texSendero from "@/assets/tex-sendero.webp";
import texSenderoSm from "@/assets/tex-sendero@sm.webp";
import texMontanas from "@/assets/tex-montanas.webp";
import texMontanasSm from "@/assets/tex-montanas@sm.webp";
import texRaices from "@/assets/tex-raices.webp";
import texRaicesSm from "@/assets/tex-raices@sm.webp";

export type Portada = { src: string; sm: string; w: number; h: number; wSm: number };

export const PORTADAS: Record<Articulo["imagen"], Portada> = {
  niebla: { src: texNiebla, sm: texNieblaSm, w: 1800, h: 1012, wSm: 900 },
  bosque: { src: texBosque, sm: texBosqueSm, w: 1600, h: 1000, wSm: 800 },
  sendero: { src: texSendero, sm: texSenderoSm, w: 1100, h: 1375, wSm: 640 },
  montanas: { src: texMontanas, sm: texMontanasSm, w: 1800, h: 1012, wSm: 900 },
  raices: { src: texRaices, sm: texRaicesSm, w: 1100, h: 1375, wSm: 640 },
};

export const srcSetPortada = (p: Portada) => `${p.sm} ${p.wSm}w, ${p.src} ${p.w}w`;

const FORMATO_FECHA = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** El mediodía evita que el cambio de huso desplace la fecha un día atrás. */
export const fechaLarga = (iso: string) => FORMATO_FECHA.format(new Date(`${iso}T12:00:00`));
