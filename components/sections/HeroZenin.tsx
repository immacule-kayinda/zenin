import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

import { HeroFloatMedia } from "./HeroFloatMedia";

export function HeroZenin() {
  return (
    <Section className="bg-surface">
      <div className="grid lg:grid-cols-2 lg:min-h-[min(75vh,48rem)]">
        <div className="flex flex-col justify-center py-16 sm:py-20 lg:py-24 lg:pr-10 xl:pr-14">
          <p className="text-xs uppercase tracking-[0.25em] text-muted">
            Haltères en béton
          </p>
          <h1 className="text-display text-balance mt-4 text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-ink">
            La masse devient objet.
          </h1>
          <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-muted sm:text-lg">
            Zenin coule des haltères monolithiques pour des espaces où
            l&apos;entraînement ne dégrade pas l&apos;architecture du lieu.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/produits">Voir le catalogue</Button>
            <Button href="/commander" variant="secondary">
              Commander
            </Button>
          </div>
        </div>

        <div className="lg:pl-10 xl:pl-14">
          <HeroFloatMedia
            src="/images/hero-haltere.svg"
            alt="Haltère Zenin en béton"
          />
        </div>
      </div>
    </Section>
  );
}
