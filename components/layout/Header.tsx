import Link from "next/link";

import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/cn";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur-[2px]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="text-display text-lg font-semibold tracking-tight text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          {SITE_NAME}
        </Link>
        <nav aria-label="Navigation principale">
          <ul className="flex items-center gap-6 sm:gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm text-muted transition-colors duration-200 ease-zenin",
                    "hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
