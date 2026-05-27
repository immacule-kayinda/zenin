import Link from "next/link";

import { ProductCard } from "@/components/product/ProductCard";
import { Section } from "@/components/ui/Section";
import { fetchFeaturedProducts } from "@/lib/catalog";

export async function FeaturedStrip() {
  const featured = (await fetchFeaturedProducts()).slice(0, 3);

  return (
    <Section className="py-[clamp(4rem,10vw,7rem)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Ligne phare
          </p>
          <h2 className="text-display mt-2 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-tight text-ink">
            Haltères Zenin
          </h2>
        </div>
        <Link
          href="/produits?categorie=haltères"
          className="text-sm text-muted transition-colors duration-200 ease-zenin hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          Toute la gamme →
        </Link>
      </div>
      <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {featured.map((product) => (
          <ProductCard key={product.slug} product={product} layout="stack" />
        ))}
      </div>
    </Section>
  );
}
