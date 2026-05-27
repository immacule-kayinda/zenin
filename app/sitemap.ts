import type { MetadataRoute } from "next";

import { fetchAllProductSlugs } from "@/lib/catalog";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zenin.fr";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await fetchAllProductSlugs();
  const productEntries = slugs.map((slug) => ({
    url: `${BASE_URL}/produits/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/produits`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/commander`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/a-propos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...productEntries,
  ];
}
