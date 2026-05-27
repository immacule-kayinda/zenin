import Link from "next/link";

import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import { getAllFromDb } from "@/lib/db/products";
import { isMongoConfigured } from "@/lib/mongodb";
import { fetchProducts } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  let items = await fetchProducts();

  if (isMongoConfigured()) {
    try {
      const fromDb = await getAllFromDb();
      if (fromDb.length > 0) items = fromDb;
    } catch {
      /* use catalog fallback */
    }
  }

  return (
    <AdminShell
      title="Produits"
      actions={
        <Button href="/admin/produits/nouveau" variant="secondary">
          Nouveau produit
        </Button>
      }
    >
      <div className="overflow-x-auto border border-line">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-line bg-ink/[0.02]">
            <tr>
              <th className="px-4 py-3 font-medium text-muted">Nom</th>
              <th className="px-4 py-3 font-medium text-muted">Slug</th>
              <th className="px-4 py-3 font-medium text-muted">Catégorie</th>
              <th className="px-4 py-3 font-medium text-muted">Mis en avant</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {items.map((product) => (
              <tr key={product.slug} className="hover:bg-ink/[0.02]">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/produits/${product.slug}`}
                    className="font-medium text-ink hover:underline"
                  >
                    {product.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted">{product.slug}</td>
                <td className="px-4 py-3 text-muted">{product.category}</td>
                <td className="px-4 py-3 text-muted">
                  {product.featured ? "Oui" : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {items.length === 0 ? (
        <p className="mt-6 text-sm text-muted">
          Aucun produit. Lancez le seed ou créez un produit.
        </p>
      ) : null}
    </AdminShell>
  );
}
