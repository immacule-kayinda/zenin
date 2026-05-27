import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin/AdminShell";
import { ProductForm } from "@/components/admin/ProductForm";
import { Button } from "@/components/ui/Button";
import {
  deleteProductAction,
  updateProductAction,
} from "@/lib/actions/admin-products";
import { fetchProductBySlug } from "@/lib/catalog";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AdminEditProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const boundUpdate = updateProductAction.bind(null, slug);

  return (
    <AdminShell
      title={`Modifier · ${product.name}`}
      actions={
        <form action={deleteProductAction.bind(null, slug)}>
          <button
            type="submit"
            className="text-sm text-muted hover:text-ink"
          >
            Supprimer
          </button>
        </form>
      }
    >
      <div className="mb-6">
        <Button
          href={`/produits/${product.slug}`}
          variant="secondary"
        >
          Voir sur le site
        </Button>
      </div>
      <ProductForm
        product={product}
        action={boundUpdate}
        submitLabel="Enregistrer"
      />
    </AdminShell>
  );
}
