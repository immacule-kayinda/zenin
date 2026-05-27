import Link from "next/link";

import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import type { Product } from "@/lib/products";
import { isWhatsAppConfigured } from "@/lib/whatsapp";

type CommanderWhatsAppProps = {
  product: Product;
};

export function CommanderWhatsApp({ product }: CommanderWhatsAppProps) {
  return (
    <section
      aria-label="Commande WhatsApp"
      className="mt-8 max-w-xl border border-line px-6 py-8 sm:px-8"
    >
      <p className="text-sm font-medium text-ink">Commander sur WhatsApp</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Un message est prérempli avec{" "}
        <span className="text-ink">{product.name}</span>. Vous confirmez
        quantité et livraison directement dans la conversation.
      </p>
      <div className="mt-6">
        <WhatsAppButton
          productName={product.name}
          productSlug={product.slug}
          variant="primary"
        />
      </div>
      {!isWhatsAppConfigured() ? (
        <p className="mt-4 text-xs text-muted">
          Vous pouvez aussi utiliser le formulaire ci-dessous.
        </p>
      ) : null}
      <p className="mt-6 text-xs text-muted">
        <Link
          href={`/produits/${product.slug}`}
          className="text-ink underline-offset-4 hover:underline"
        >
          Voir la fiche produit
        </Link>
      </p>
    </section>
  );
}
