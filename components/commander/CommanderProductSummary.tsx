import Link from "next/link";

import { ImageFrame } from "@/components/ui/ImageFrame";
import type { Product } from "@/lib/products";

type CommanderProductSummaryProps = {
  product: Product;
};

export function CommanderProductSummary({ product }: CommanderProductSummaryProps) {
  const image = product.images[0];

  return (
    <section
      aria-label="Produit sélectionné"
      className="mt-10 max-w-xl border border-line bg-ink/[0.02] px-6 py-6 sm:px-8"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
        {image ? (
          <div className="w-full max-w-[8rem] shrink-0">
            <ImageFrame
              src={image.src}
              alt={image.alt}
              aspect={image.aspect ?? "4/5"}
              sizes="128px"
            />
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-[0.15em] text-muted">
            Votre sélection
          </p>
          <p className="text-display mt-1 text-xl font-semibold text-ink">
            {product.name}
          </p>
          <p className="mt-2 text-sm text-muted">{product.tagline}</p>
          <Link
            href="/commander"
            className="mt-4 inline-block text-sm text-muted underline-offset-4 transition-colors duration-200 ease-zenin hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            Changer de produit
          </Link>
        </div>
      </div>
    </section>
  );
}
