import Link from "next/link";

import { ImageFrame } from "@/components/ui/ImageFrame";
import type { Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
  layout?: "row" | "stack";
};

export function ProductCard({ product, layout = "row" }: ProductCardProps) {
  const image = product.images[0];

  if (layout === "stack") {
    return (
      <article>
        <Link
          href={`/produits/${product.slug}`}
          className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          <ImageFrame
            src={image.src}
            alt={image.alt}
            aspect={image.aspect ?? "4/5"}
            sizes="(max-width: 640px) 100vw, 33vw"
          />
          <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-line pt-4">
            <div>
              <h3 className="text-display text-lg font-semibold text-ink group-hover:opacity-80 transition-opacity duration-200 ease-zenin">
                {product.name}
              </h3>
              <p className="mt-1 text-sm text-muted">{product.tagline}</p>
            </div>
            {product.priceLabel ? (
              <span className="shrink-0 text-xs uppercase tracking-widest text-muted">
                {product.priceLabel}
              </span>
            ) : null}
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="border-t border-line py-8 first:border-t-0 first:pt-0 sm:py-10">
      <Link
        href={`/produits/${product.slug}`}
        className="group grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] sm:items-center sm:gap-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
      >
        <div className="order-2 sm:order-1">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            {product.category}
          </p>
          <h3 className="text-display mt-2 text-2xl font-semibold text-ink sm:text-3xl group-hover:opacity-80 transition-opacity duration-200 ease-zenin">
            {product.name}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            {product.tagline}
          </p>
          {product.priceLabel ? (
            <p className="mt-4 text-xs uppercase tracking-widest text-muted">
              {product.priceLabel}
            </p>
          ) : null}
        </div>
        <div className="order-1 sm:order-2 sm:max-w-md sm:justify-self-end sm:w-full">
          <ImageFrame
            src={image.src}
            alt={image.alt}
            aspect={image.aspect ?? "4/5"}
            sizes="(max-width: 640px) 100vw, 40vw"
          />
        </div>
      </Link>
    </article>
  );
}
