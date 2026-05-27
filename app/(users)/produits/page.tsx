import type { Metadata } from "next";
import Link from "next/link";

import { ProductCard } from "@/components/product/ProductCard";
import { SiteContainer } from "@/components/layout/SiteContainer";
import { CATEGORIES, type CategoryId } from "@/lib/constants";
import { fetchProducts } from "@/lib/catalog";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Produits",
  description:
    "Catalogue Zenin : haltères en béton et équipement pour home gym.",
};

type ProduitsPageProps = {
  searchParams: Promise<{ categorie?: string }>;
};

function resolveCategory(raw?: string): CategoryId | null {
  if (!raw) return null;
  const match = CATEGORIES.find((c) => c.id === raw);
  return match?.id ?? null;
}

export const dynamic = "force-dynamic";

export default async function ProduitsPage({ searchParams }: ProduitsPageProps) {
  const { categorie: categorieParam } = await searchParams;
  const activeCategory = resolveCategory(categorieParam);
  const products = await fetchProducts();

  const filtered = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

  return (
    <SiteContainer as="main" className="py-[clamp(3rem,8vw,5rem)]">
      <header className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Catalogue</p>
        <h1 className="text-display mt-3 text-[clamp(2rem,5vw,3.25rem)] font-semibold tracking-tight text-ink">
          Produits
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
          Haltères en béton coulées et équipement assorti. Ouvrez une fiche,
          puis passez commande pour la référence choisie.
        </p>
      </header>

      <nav
        aria-label="Filtrer par catégorie"
        className="mt-10 flex flex-wrap gap-3 border-b border-line pb-8"
      >
        <Link
          href="/produits"
          className={cn(
            "px-4 py-2 text-sm transition-colors duration-200 ease-zenin focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink",
            !activeCategory
              ? "bg-ink text-surface"
              : "text-muted hover:text-ink",
          )}
          aria-current={!activeCategory ? "page" : undefined}
        >
          Tout
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/produits?categorie=${encodeURIComponent(cat.id)}`}
            className={cn(
              "px-4 py-2 text-sm transition-colors duration-200 ease-zenin focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink",
              activeCategory === cat.id
                ? "bg-ink text-surface"
                : "text-muted hover:text-ink",
            )}
            aria-current={activeCategory === cat.id ? "page" : undefined}
          >
            {cat.label}
          </Link>
        ))}
      </nav>

      <div className="mt-4">
        {filtered.length === 0 ? (
          <p className="py-16 text-sm text-muted">
            Aucun produit dans cette catégorie.
          </p>
        ) : (
          filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))
        )}
      </div>
    </SiteContainer>
  );
}
