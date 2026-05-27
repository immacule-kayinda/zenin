import type { Metadata } from "next";

import { OrderForm } from "@/components/forms/OrderForm";
import { SiteContainer } from "@/components/layout/SiteContainer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { fetchProductBySlug, fetchProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Commander",
  description:
    "Commandez vos haltères Zenin en béton ou notre équipement via le formulaire ou WhatsApp.",
};

export const dynamic = "force-dynamic";

type CommanderPageProps = {
  searchParams: Promise<{ produit?: string }>;
};

export default async function CommanderPage({
  searchParams,
}: CommanderPageProps) {
  const { produit } = await searchParams;
  const products = await fetchProducts();
  const defaultSlug =
    produit && (await fetchProductBySlug(produit)) ? produit : undefined;
  const selectedProduct = defaultSlug
    ? await fetchProductBySlug(defaultSlug)
    : undefined;

  return (
    <SiteContainer as="main" className="py-[clamp(3rem,8vw,5rem)]">
      <header className="max-w-xl">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Commande</p>
        <h1 className="text-display mt-3 text-[clamp(2rem,5vw,3.25rem)] font-semibold tracking-tight text-ink">
          Commander
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
          Indiquez le modèle souhaité et vos coordonnées. Nous confirmons votre
          commande, le délai de préparation et la livraison sous 48 h ouvrées.
        </p>
      </header>

      <section
        aria-label="Commande WhatsApp"
        className="mt-10 max-w-xl border border-line bg-ink/[0.02] px-6 py-8 sm:px-8"
      >
        <p className="text-sm font-medium text-ink">Commander sur WhatsApp</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Écrivez-nous directement pour commander une paire ou poser une
          question sur la gamme. Réponse rapide, même suivi que le formulaire.
        </p>
        <div className="mt-6">
          <WhatsAppButton
            productName={selectedProduct?.name}
            variant="primary"
          />
        </div>
      </section>

      <div className="mt-12 max-w-xl">
        <p className="mb-6 text-xs uppercase tracking-[0.2em] text-muted">
          Ou via le formulaire
        </p>
        <OrderForm products={products} defaultProductSlug={defaultSlug} />
      </div>
    </SiteContainer>
  );
}
