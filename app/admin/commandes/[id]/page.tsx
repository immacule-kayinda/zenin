import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import { markOrderProcessed } from "@/lib/actions/admin-orders";
import { getOrderById } from "@/lib/db/orders";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}

export default async function AdminOrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <AdminShell title={`Commande · ${order.name}`}>
      <dl className="max-w-xl space-y-4 text-sm">
        <DetailRow label="Date" value={formatDate(order.createdAt)} />
        <DetailRow label="Statut" value={order.status === "pending" ? "En attente" : "Traitée"} />
        <DetailRow label="Nom" value={order.name} />
        <DetailRow label="E-mail" value={order.email} />
        {order.phone ? (
          <DetailRow label="Téléphone" value={order.phone} />
        ) : null}
        <DetailRow label="Produit" value={order.productName} />
        <DetailRow label="Slug produit" value={order.productSlug} />
        <div>
          <dt className="text-xs uppercase tracking-[0.15em] text-muted">
            Message
          </dt>
          <dd className="mt-2 whitespace-pre-wrap leading-relaxed text-ink">
            {order.message}
          </dd>
        </div>
      </dl>

      <div className="mt-10 flex flex-wrap gap-4">
        {order.status === "pending" ? (
          <form action={markOrderProcessed.bind(null, id)}>
            <Button type="submit">Marquer comme traitée</Button>
          </form>
        ) : null}
        <Button href="/admin/commandes" variant="secondary">
          Retour à la liste
        </Button>
      </div>
    </AdminShell>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.15em] text-muted">{label}</dt>
      <dd className="mt-1 text-ink">{value}</dd>
    </div>
  );
}
