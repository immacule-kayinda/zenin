import Link from "next/link";

import { SiteContainer } from "@/components/layout/SiteContainer";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <SiteContainer as="main" className="py-24 text-center sm:py-32">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">404</p>
      <h1 className="text-display mt-4 text-3xl font-semibold text-ink">
        Page introuvable
      </h1>
      <p className="mx-auto mt-4 max-w-sm text-sm text-muted">
        Cette référence n&apos;existe pas dans le catalogue Zenin.
      </p>
      <div className="mt-10 flex justify-center gap-4">
        <Button href="/">Accueil</Button>
        <Button href="/produits" variant="secondary">
          Catalogue
        </Button>
      </div>
      <Link
        href="/produits"
        className="sr-only"
      >
        Retour au catalogue
      </Link>
    </SiteContainer>
  );
}
