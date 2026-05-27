import type { CategoryId } from "@/lib/constants";
import {
  countProducts,
  getAllFromDb,
  getAllSlugsFromDb,
  getByCategoryFromDb,
  getBySlugFromDb,
  getFeaturedFromDb,
} from "@/lib/db/products";
import { isMongoConfigured } from "@/lib/mongodb";
import {
  getAllProductSlugs as staticSlugs,
  getFeaturedProducts as staticFeatured,
  getProductBySlug as staticGetBySlug,
  getProductsByCategory as staticByCategory,
  products as staticProducts,
  type Product,
} from "@/lib/products";

async function useDbCatalog(): Promise<boolean> {
  if (!isMongoConfigured()) return false;
  try {
    return (await countProducts()) > 0;
  } catch {
    return false;
  }
}

export async function fetchProducts(): Promise<Product[]> {
  if (await useDbCatalog()) {
    return getAllFromDb();
  }
  return staticProducts;
}

export async function fetchProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  if (await useDbCatalog()) {
    const fromDb = await getBySlugFromDb(slug);
    return fromDb ?? undefined;
  }
  return staticGetBySlug(slug);
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  if (await useDbCatalog()) {
    return getFeaturedFromDb();
  }
  return staticFeatured();
}

export async function fetchProductsByCategory(
  category: CategoryId,
): Promise<Product[]> {
  if (await useDbCatalog()) {
    return getByCategoryFromDb(category);
  }
  return staticByCategory(category);
}

export async function fetchAllProductSlugs(): Promise<string[]> {
  if (await useDbCatalog()) {
    return getAllSlugsFromDb();
  }
  return staticSlugs();
}

export async function isValidProductSlug(slug: string): Promise<boolean> {
  const slugs = await fetchAllProductSlugs();
  return slugs.includes(slug);
}
