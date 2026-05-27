import { ImageFrame } from "@/components/ui/ImageFrame";
import { Section } from "@/components/ui/Section";

export function MaterialStory() {
  return (
    <Section className="border-t border-line py-[clamp(4rem,10vw,7rem)]">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
        <div className="max-w-lg">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Matière
          </p>
          <h2 className="text-display mt-3 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-tight text-ink">
            Béton fibré, contrôlé au gramme.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-muted sm:text-base">
            Chaque paire est coulée, poncée et contrôlée avant expédition. Le
            grain apparent n&apos;est pas un défaut : c&apos;est la preuve d&apos;une
            masse réelle, stable au sol, silencieuse à la pose.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Pas de revêtement plastique, pas de cache esthétique. Le béton
            assume le poids et la lumière de votre pièce.
          </p>
        </div>
        <ImageFrame
          src="/images/zenin-detail.svg"
          alt="Gros plan sur la texture du béton Zenin"
          aspect="16/9"
          sizes="(max-width: 1024px) 100vw, 55vw"
        />
      </div>
    </Section>
  );
}
