import Link from "next/link";

import { AdminShell } from "@/components/admin/AdminShell";
import { listOrders } from "@/lib/db/orders";
import { isMongoConfigured } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function AdminOrdersPage() {
  if (!isMongoConfigured()) {
    return (
      <AdminShell title="Commandes">
        <p className="text-sm text-ink">MONGODB_URI non configuré.</p>
      </AdminShell>
    );
  }

  let orders: Awaited<ReturnType<typeof listOrders>> = [];
  try {
    orders = await listOrders();
  } catch {
    return (
      <AdminShell title="Commandes">
        <p className="text-sm text-ink">
          Impossible de charger les commandes.
        </p>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Commandes">
      <div className="overflow-x-auto border border-line">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-line bg-ink/[0.02]">
            <tr>
              <th className="px-4 py-3 font-medium text-muted">Date</th>
              <th className="px-4 py-3 font-medium text-muted">Client</th>
              <th className="px-4 py-3 font-medium text-muted">Produit</th>
              <th className="px-4 py-3 font-medium text-muted">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {orders.map((order) => (
              <tr key={order._id.toString()} className="hover:bg-ink/[0.02]">
                <td className="px-4 py-3 text-muted">
                  {formatDate(order.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/commandes/${order._id.toString()}`}
                    className="font-medium text-ink hover:underline"
                  >
                    {order.name}
                  </Link>
                  <p className="text-xs text-muted">{order.email}</p>
                </td>
                <td className="px-4 py-3 text-muted">{order.productName}</td>
                <td className="px-4 py-3">
                  {order.status === "pending" ? (
                    <span className="text-xs uppercase tracking-widest text-ink">
                      En attente
                    </span>
                  ) : (
                    <span className="text-xs uppercase tracking-widest text-muted">
                      Traitée
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {orders.length === 0 ? (
        <p className="mt-6 text-sm text-muted">Aucune commande pour le moment.</p>
      ) : null}
    </AdminShell>
  );
}
