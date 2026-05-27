import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductGallery } from "@/components/product/ProductGallery";
import { SpecTable } from "@/components/product/SpecTable";
import { SiteContainer } from "@/components/layout/SiteContainer";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { fetchProductBySlug } from "@/lib/catalog";

export const dynamic = "force-dynamic";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) return { title: "Produit introuvable" };

  return {
    title: product.name,
    description: product.tagline,
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: product.images[0]
        ? [{ url: product.images[0].src, alt: product.images[0].alt }]
        : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <SiteContainer as="main" className="py-[clamp(3rem,8vw,5rem)]">
      <nav aria-label="Fil d'Ariane" className="mb-10 text-sm text-muted">
        <Link
          href="/produits"
          className="transition-colors duration-200 ease-zenin hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          Produits
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
        <ProductGallery images={product.images} />

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            {product.category}
          </p>
          <h1 className="text-display mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold text-ink">
            {product.name}
          </h1>
          <p className="mt-4 text-lg text-muted">{product.tagline}</p>
          {product.priceLabel ? (
            <p className="mt-6 text-xs uppercase tracking-widest text-muted">
              {product.priceLabel}
            </p>
          ) : null}
          <p className="mt-8 max-w-prose text-sm leading-relaxed text-muted sm:text-base">
            {product.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              href={`/commander?produit=${encodeURIComponent(product.slug)}`}
            >
              Commander ce produit
            </Button>
            <WhatsAppButton
              productName={product.name}
              variant="secondary"
            />
            <Button href="/produits" variant="secondary">
              Retour au catalogue
            </Button>
          </div>
        </div>
      </div>

      <section className="mt-16 max-w-xl border-t border-line pt-12 lg:mt-20">
        <h2 className="text-display text-lg font-semibold text-ink">
          Caractéristiques
        </h2>
        <div className="mt-6">
          <SpecTable specs={product.specs} />
        </div>
      </section>
    </SiteContainer>
  );
}
