import Link from "next/link";

import { AdminShell } from "@/components/admin/AdminShell";
import { countRecentPending, listOrders } from "@/lib/db/orders";
import { countProducts } from "@/lib/db/products";
import { isMongoConfigured } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const mongoReady = isMongoConfigured();
  let productCount = 0;
  let pendingCount = 0;
  let recentOrders: Awaited<ReturnType<typeof listOrders>> = [];

  if (mongoReady) {
    try {
      [productCount, pendingCount, recentOrders] = await Promise.all([
        countProducts(),
        countRecentPending(),
        listOrders(5),
      ]);
    } catch {
      /* dashboard still renders */
    }
  }

  return (
    <AdminShell title="Tableau de bord">
      {!mongoReady ? (
        <p className="text-sm text-ink" role="alert">
          MONGODB_URI non configuré. Ajoutez la variable d&apos;environnement
          puis redémarrez le serveur.
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Produits" value={String(productCount)} />
        <StatCard
          label="Commandes en attente"
          value={String(pendingCount)}
        />
        <StatCard
          label="Dernières commandes"
          value={String(recentOrders.length)}
        />
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          href="/admin/produits"
          className="border border-line px-4 py-2 text-sm text-ink hover:bg-ink/[0.03]"
        >
          Gérer les produits
        </Link>
        <Link
          href="/admin/commandes"
          className="border border-line px-4 py-2 text-sm text-ink hover:bg-ink/[0.03]"
        >
          Voir les commandes
        </Link>
      </div>

      {recentOrders.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-sm font-medium text-ink">Activité récente</h2>
          <ul className="mt-4 divide-y divide-line border border-line">
            {recentOrders.map((order) => (
              <li key={order._id.toString()}>
                <Link
                  href={`/admin/commandes/${order._id.toString()}`}
                  className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm hover:bg-ink/[0.02]"
                >
                  <span className="text-ink">{order.name}</span>
                  <span className="text-muted">{order.productName}</span>
                  <StatusBadge status={order.status} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </AdminShell>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-line px-6 py-8">
      <p className="text-xs uppercase tracking-[0.15em] text-muted">{label}</p>
      <p className="text-display mt-2 text-3xl font-semibold text-ink">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: "pending" | "processed" }) {
  return (
    <span
      className={
        status === "pending"
          ? "text-xs uppercase tracking-widest text-ink"
          : "text-xs uppercase tracking-widest text-muted"
      }
    >
      {status === "pending" ? "En attente" : "Traitée"}
    </span>
  );
}
