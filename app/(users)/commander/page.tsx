import type { Metadata } from "next";

import { CommanderProductPicker } from "@/components/commander/CommanderProductPicker";
import { CommanderProductSummary } from "@/components/commander/CommanderProductSummary";
import { CommanderWhatsApp } from "@/components/commander/CommanderWhatsApp";
import { OrderForm } from "@/components/forms/OrderForm";
import { SiteContainer } from "@/components/layout/SiteContainer";
import {
  fetchFeaturedProducts,
  fetchProductBySlug,
  fetchProducts,
} from "@/lib/catalog";
import { buildCommanderQuickPicks } from "@/lib/commander-quick-picks";

export const metadata: Metadata = {
  title: "Commander",
  description:
    "Choisissez votre haltère Zenin ou équipement, puis commandez par formulaire ou WhatsApp.",
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
  const featured = await fetchFeaturedProducts();
  const quickPicks = buildCommanderQuickPicks(featured, products);
  const selectedProduct = produit
    ? await fetchProductBySlug(produit)
    : undefined;

  return (
    <SiteContainer as="main" className="py-[clamp(3rem,8vw,5rem)]">
      <header className="max-w-xl">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Commande</p>
        <h1 className="text-display mt-3 text-[clamp(2rem,5vw,3.25rem)] font-semibold tracking-tight text-ink">
          Commander
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
          {selectedProduct
            ? "Validez votre commande pour ce produit via WhatsApp ou le formulaire."
            : "Choisissez une des trois références ci-dessous, ou parcourez le catalogue avant de commander."}
        </p>
      </header>

      {selectedProduct ? (
        <>
          <CommanderProductSummary product={selectedProduct} />
          <CommanderWhatsApp product={selectedProduct} />
          <div className="mt-12 max-w-xl">
            <p className="mb-6 text-xs uppercase tracking-[0.2em] text-muted">
              Ou via le formulaire
            </p>
            <OrderForm
              products={products}
              defaultProductSlug={selectedProduct.slug}
              lockProduct
            />
          </div>
        </>
      ) : (
        <CommanderProductPicker highlights={quickPicks} />
      )}
    </SiteContainer>
  );
}
