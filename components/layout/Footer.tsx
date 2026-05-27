import Link from "next/link";

import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { NAV_LINKS, SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import { isWhatsAppConfigured } from "@/lib/whatsapp";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-[1.2fr_1fr] sm:items-start">
          <div className="max-w-sm">
            <p className="text-display text-lg font-semibold text-ink">
              {SITE_NAME}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {SITE_DESCRIPTION}
            </p>
          </div>
          <nav aria-label="Liens pied de page">
            <ul className="flex flex-col gap-3 sm:items-end">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors duration-200 ease-zenin hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {isWhatsAppConfigured() ? (
                <li>
                  <WhatsAppButton
                    variant="ghost"
                    showIcon={false}
                    className="px-0 py-0 text-sm text-muted hover:text-ink"
                  />
                </li>
              ) : null}
            </ul>
          </nav>
        </div>
        <p className="mt-12 text-xs text-muted">
          © {year} {SITE_NAME}. Haltères en béton, prêtes à commander.
        </p>
      </div>
    </footer>
  );
}
