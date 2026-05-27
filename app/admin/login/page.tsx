import Link from "next/link";

import { LoginForm } from "@/components/admin/LoginForm";
import { SiteContainer } from "@/components/layout/SiteContainer";

export default function AdminLoginPage() {
  return (
    <SiteContainer as="main" className="py-[clamp(3rem,8vw,5rem)]">
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
    </SiteContainer>
  );
}
