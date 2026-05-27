import Link from "next/link";

import { LoginForm } from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <main className="h-screen w-screen grid grid-cols-2 bg-red">
      <div className="flex flex-col justify-center px-24 col-span-1">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          Zenin · Admin
        </p>
        <h1 className="text-display mt-3 text-2xl font-semibold text-ink">
          Connexion
        </h1>
        <p className="mt-4 max-w-md text-sm text-muted">
          Espace réservé à la gestion des produits et des commandes.
        </p>
        <div className="mt-10">
          <LoginForm />
        </div>
        <p className="mt-12 text-sm text-muted">
          <Link href="/" className="hover:text-ink">
            ← Retour au site
          </Link>
        </p>
      </div>
      <div className="flex-1 bg-muted/20 col-span-1"></div>
    </main>
  );
}
