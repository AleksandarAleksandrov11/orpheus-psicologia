import { Link } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";
import logoAsset from "@/assets/orpheus-logo.png.asset.json";

export function Footer() {
  return (
    <footer className="mt-24 md:mt-40 border-t border-border/70 bg-cream">
      <div className="container-editorial py-16 md:py-24 grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <img src={logoAsset.url} alt="Orpheus Psicología" className="h-10 w-auto mb-6 opacity-90" />
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            Un espacio seguro para construir una relación más sana contigo. Terapia
            especializada en autoestima, autoexigencia e inseguridad.
          </p>
        </div>
        <div>
          <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-sage-deep mb-5">Navegación</h4>
          <ul className="space-y-3 text-sm text-foreground/80">
            <li><Link to="/" className="hover:text-sage-deep transition-colors">Inicio</Link></li>
            <li><Link to="/sobre-mi" className="hover:text-sage-deep transition-colors">Sobre mí</Link></li>
            <li><Link to="/servicios" className="hover:text-sage-deep transition-colors">Servicios</Link></li>
            <li><Link to="/testimonios" className="hover:text-sage-deep transition-colors">Testimonios</Link></li>
            <li><Link to="/contacto" className="hover:text-sage-deep transition-colors">Contacto</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-sage-deep mb-5">Contacto</h4>
          <ul className="space-y-3 text-sm text-foreground/80">
            <li className="flex items-center gap-2"><Mail className="size-4" /> hola@orpheuspsicologia.com</li>
            <li className="flex items-center gap-2"><Instagram className="size-4" /> @orpheus.psicologia</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container-editorial py-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Melissa González · Orpheus Psicología</p>
          <p>Colegiada · Psicología basada en evidencia</p>
        </div>
      </div>
    </footer>
  );
}
