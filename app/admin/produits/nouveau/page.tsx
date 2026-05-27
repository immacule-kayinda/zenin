import { AdminShell } from "@/components/admin/AdminShell";
import { ProductForm } from "@/components/admin/ProductForm";
import { createProductAction } from "@/lib/actions/admin-products";

export const dynamic = "force-dynamic";

export default function AdminNewProductPage() {
  return (
    <AdminShell title="Nouveau produit">
      <ProductForm action={createProductAction} submitLabel="Créer le produit" />
    </AdminShell>
  );
}
