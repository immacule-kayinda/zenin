import type { Metadata } from "next";

import { ImageFrame } from "@/components/ui/ImageFrame";
import { SiteContainer } from "@/components/layout/SiteContainer";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Zenin : fabrication d'haltères en béton et équipement sport pour intérieurs exigeants.",
};

export default function AboutPage() {
  return (
    <SiteContainer as="main" className="py-[clamp(3rem,8vw,5rem)]">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
        <div className="max-w-lg">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Atelier</p>
          <h1 className="text-display mt-3 text-[clamp(2rem,5vw,3.25rem)] font-semibold tracking-tight text-ink">
            Le poids comme matière première.
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-muted sm:text-base">
            Zenin est né d&apos;un constat simple : les haltères domestiques
            ressemblent toutes à du matériel de club, alors que l&apos;entraînement
            à la maison mérite des objets durables, silencieux, assumés dans le
            salon ou le garage aménagé.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Nous coulons chaque paire en béton fibré, contrôlons les tolérances
            de poids et expédions sur commande. Pas de stock anonyme : chaque
            lot est traçable jusqu&apos;à la livraison.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            L&apos;équipement complémentaire (banc, rack, tapis) suit la même
            discipline visuelle : structure sobre, pas de couleur parasite.
          </p>
          <div className="mt-10">
            <Button href="/commander">Demander un devis</Button>
          </div>
        </div>
        <ImageFrame
          src="/images/atelier-zenin.svg"
          alt="Atelier de fabrication Zenin, coulage de béton"
          aspect="4/5"
          sizes="(max-width: 1024px) 100vw, 45vw"
        />
      </div>
    </SiteContainer>
  );
}
