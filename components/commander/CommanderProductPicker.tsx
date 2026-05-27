import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import type { Product } from "@/lib/products";

type CommanderProductPickerProps = {
  /** Jusqu'à 3 produits mis en avant pour une sélection rapide */
  highlights: Product[];
};

export function CommanderProductPicker({
  highlights,
}: CommanderProductPickerProps) {
  return (
    <div className="mt-10 max-w-5xl">
      <section aria-labelledby="choix-rapide">
        <h2
          id="choix-rapide"
          className="text-display text-lg font-semibold text-ink"
        >
          Sélection rapide
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
          Trois références phares. Consultez la fiche ou passez directement à la
          commande.
        </p>

        {highlights.length > 0 ? (
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {highlights.map((product) => {
              const image = product.images[0];
              const commanderHref = `/commander?produit=${encodeURIComponent(product.slug)}`;
              const detailHref = `/produits/${product.slug}`;

              return (
                <li
                  key={product.slug}
                  className="flex h-full flex-col border border-line bg-ink/[0.02]"
                >
                  {image ? (
                    <Link
                      href={detailHref}
                      className="relative block aspect-[4/5] w-full overflow-hidden bg-ink/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-opacity duration-200 ease-zenin hover:opacity-90"
                      />
                    </Link>
                  ) : null}
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-xs uppercase tracking-[0.15em] text-muted">
                      {product.category}
                    </p>
                    <Link
                      href={detailHref}
                      className="text-display mt-2 font-semibold text-ink transition-opacity duration-200 ease-zenin hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {product.tagline}
                    </p>
                    <div className="mt-5 flex flex-col gap-2">
                      <Button
                        href={commanderHref}
                        className="w-full px-4 py-2.5 text-xs sm:text-sm"
                      >
                        Commander
                      </Button>
                      <Button
                        href={detailHref}
                        variant="secondary"
                        className="w-full px-4 py-2.5 text-xs sm:text-sm"
                      >
                        Voir le détail
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-6 text-sm text-muted">
            Aucun produit en vitrine pour le moment.
          </p>
        )}
      </section>

      <section
        aria-labelledby="catalogue-complet"
        className="mt-12 border-t border-line pt-12"
      >
        <h2
          id="catalogue-complet"
          className="text-display text-lg font-semibold text-ink"
        >
          Autre modèle ?
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          Parcourez le catalogue complet. Sur chaque fiche, le bouton « Commander
          ce produit » vous ramène ici avec la référence déjà sélectionnée.
        </p>
        <div className="mt-8">
          <Button href="/produits">Voir tous les produits</Button>
        </div>
      </section>
    </div>
  );
}
