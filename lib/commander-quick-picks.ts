import type { Product } from "@/lib/products";

const QUICK_PICK_COUNT = 3;

/** Jusqu'à 3 produits : featured d'abord, puis haltères du catalogue. */
export function buildCommanderQuickPicks(
  featured: Product[],
  all: Product[],
): Product[] {
  const seen = new Set<string>();
  const picks: Product[] = [];

  for (const product of featured) {
    if (picks.length >= QUICK_PICK_COUNT) break;
    if (seen.has(product.slug)) continue;
    seen.add(product.slug);
    picks.push(product);
  }

  if (picks.length < QUICK_PICK_COUNT) {
    const haltères = all.filter((p) => p.category === "haltères");
    for (const product of [...haltères, ...all]) {
      if (picks.length >= QUICK_PICK_COUNT) break;
      if (seen.has(product.slug)) continue;
      seen.add(product.slug);
      picks.push(product);
    }
  }

  return picks;
}
