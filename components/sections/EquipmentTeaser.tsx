import Link from "next/link";

import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { fetchProductsByCategory } from "@/lib/catalog";

export async function EquipmentTeaser() {
  const equipment = (await fetchProductsByCategory("équipement")).slice(0, 2);

  return (
    <Section className="border-t border-line py-[clamp(4rem,10vw,7rem)]">
      <div className="max-w-xl">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          Équipement
        </p>
        <h2 className="text-display mt-3 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold text-ink">
          Compléter l&apos;espace d&apos;entraînement.
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Banc, rack et protection de sol dans la même exigence visuelle que les
          haltères.
        </p>
      </div>
      <div className="mt-12">
        {equipment.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
      <div className="mt-10 flex items-center gap-6">
        <Button href="/produits?categorie=équipement" variant="secondary">
          Voir l&apos;équipement
        </Button>
        <Link
          href="/a-propos"
          className="text-sm text-muted transition-colors duration-200 ease-zenin hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          Notre atelier
        </Link>
      </div>
    </Section>
  );
}
