import type { Metadata } from "next";

import { SiteContainer } from "@/components/layout/SiteContainer";
import { Button } from "@/components/ui/Button";
import { ImageFrame } from "@/components/ui/ImageFrame";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Zenin conçoit et vend des haltères en béton pour l'entraînement à la maison. Découvrez notre matière, notre fabrication et notre gamme.",
};

function AboutBlock({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-12 sm:py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">{eyebrow}</p>
      <h2 className="text-display mt-3 text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold tracking-tight text-ink">
        {title}
      </h2>
      <div className="mt-6 max-w-2xl space-y-4 text-sm leading-relaxed text-muted sm:text-base">
        {children}
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <SiteContainer as="main" className="py-[clamp(3rem,8vw,5rem)]">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16">
        <div className="max-w-lg">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Zenin</p>
          <h1 className="text-display mt-3 text-[clamp(2rem,5vw,3.25rem)] font-semibold tracking-tight text-ink">
            Des haltères en béton, rien de plus.
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-muted sm:text-base">
            Nous ne sommes pas une usine de fitness générique. Zenin fabrique
            et vend des haltères coulées en béton fibré : des objets lourds,
            stables, faits pour durer dans un salon, un bureau ou un garage
            aménagé.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Pas de plastique chromé, pas de promesses marketing. Une matière
            brute, une forme tenue, un poids réel que vous posez au sol.
          </p>
        </div>
        <ImageFrame
          src="/images/atelier-zenin.svg"
          alt="Haltère Zenin en béton, vue atelier"
          aspect="4/5"
          sizes="(max-width: 1024px) 100vw, 45vw"
        />
      </div>

      <AboutBlock eyebrow="Produit" title="Ce que nous vendons">
        <p>
          La ligne principale, ce sont des paires d&apos;haltères monoblocs de
          10 à 25 kg. Chaque référence partage la même logique de coulage, la
          même finition brute satinée, la même exigence de calibrage au gramme
          près.
        </p>
        <p>
          Nous proposons aussi un peu d&apos;équipement complémentaire (banc,
          rack, tapis) pour compléter l&apos;espace sans casser la palette
          visuelle. L&apos;haltère reste le cœur de la marque.
        </p>
      </AboutBlock>

      <AboutBlock eyebrow="Matière" title="Pourquoi le béton">
        <p>
          Le béton fibré offre une masse compacte et un centre de gravité bas.
          Posée sur un sol sensible, une paire Zenin ne glisse pas comme un
          disque mal calé ; elle reste là, silencieuse, sans vibration
          plastique.
        </p>
        <p>
          Le grain apparent n&apos;est pas un défaut de finition : c&apos;est la
          trace du coulage et du ponçage. La couleur varie légèrement d&apos;une
          pièce à l&apos;autre, comme la pierre naturelle.
        </p>
        <ul className="list-inside list-disc space-y-2 pl-1 text-muted">
          <li>Béton fibré haute densité</li>
          <li>Poignée moulée dans la masse</li>
          <li>Finition brut satiné, sans revêtement cache</li>
          <li>Contrôle du poids avant expédition</li>
        </ul>
      </AboutBlock>

      <AboutBlock eyebrow="Fabrication" title="Comment une paire naît">
        <p>
          Chaque haltère est coulée dans un moule dédié, puis laissée à cure
          avant ponçage et contrôle. Nous vérifions le poids, les dimensions et
          l&apos;état de surface avant emballage.
        </p>
        <p>
          Les délais dépendent du format choisi et du volume de commandes en
          cours. Dès validation de votre commande, nous vous confirmons une
          fenêtre de livraison réaliste.
        </p>
      </AboutBlock>

      <AboutBlock eyebrow="Usage" title="Pour qui">
        <p>
          Zenin s&apos;adresse aux personnes qui entraînent chez elles et refusent
          le look &quot;salle de sport discount&quot;. Architectes d&apos;intérieur,
          sportifs réguliers, créateurs de home gym discrets : vous cherchez un
          objet qui assume sa masse.
        </p>
        <p>
          Les haltères conviennent au force training, aux circuits de renfort et
          aux séances techniques à charge modérée. Elles ne remplacent pas un
          rack olympique complet : elles complètent un espace déjà pensé.
        </p>
      </AboutBlock>

      <section className="border-t border-line py-12 sm:py-16">
        <h2 className="text-display text-[clamp(1.5rem,3.5vw,2rem)] font-semibold text-ink">
          Prêt à choisir votre paire ?
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          Parcourez le catalogue, choisissez votre paire, puis finalisez sur la
          page Commander.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/produits">Voir le catalogue</Button>
          <Button href="/commander" variant="secondary">
            Passer commande
          </Button>
        </div>
      </section>
    </SiteContainer>
  );
}
