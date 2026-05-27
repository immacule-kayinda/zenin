import Link from "next/link";

import { SiteContainer } from "@/components/layout/SiteContainer";
import { logoutAdmin } from "@/lib/actions/admin-auth";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/produits", label: "Produits" },
  { href: "/admin/commandes", label: "Commandes" },
] as const;

type AdminShellProps = {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

export function AdminShell({ title, children, actions }: AdminShellProps) {
  return (
    <div className="min-h-[60vh] bg-surface py-10">
      <SiteContainer>
        <div className="flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              Administration
            </p>
            <h1 className="text-display mt-2 text-2xl font-semibold text-ink">
              {title}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {actions}
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                Déconnexion
              </button>
            </form>
          </div>
        </div>

        <nav
          aria-label="Navigation admin"
          className="mt-8 flex flex-wrap gap-2"
        >
          {nav.map((item) => (
            <AdminNavLink key={item.href} href={item.href}>
              {item.label}
            </AdminNavLink>
          ))}
        </nav>

        <div className="mt-10">{children}</div>
      </SiteContainer>
    </div>
  );
}

function AdminNavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-1.5 text-sm transition-colors",
        "text-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink",
      )}
    >
      {children}
    </Link>
  );
}
