import type { Collection, Filter } from "mongodb";

import type { CategoryId } from "@/lib/constants";
import type { Product } from "@/lib/products";
import { getDb, isMongoConfigured } from "@/lib/mongodb";

import type { ProductDocument } from "./types";

function collection(): Promise<Collection<ProductDocument>> {
  return getDb().then((db) => db.collection<ProductDocument>("products"));
}

export function toProduct(doc: ProductDocument): Product {
  const { createdAt: _c, updatedAt: _u, ...product } = doc;
  return product;
}

export async function countProducts(): Promise<number> {
  if (!isMongoConfigured()) return 0;
  const col = await collection();
  return col.countDocuments();
}

export async function getAllFromDb(): Promise<Product[]> {
  const col = await collection();
  const docs = await col.find().sort({ name: 1 }).toArray();
  return docs.map(toProduct);
}

export async function getBySlugFromDb(slug: string): Promise<Product | null> {
  const col = await collection();
  const doc = await col.findOne({ slug } as Filter<ProductDocument>);
  return doc ? toProduct(doc) : null;
}

export async function getFeaturedFromDb(): Promise<Product[]> {
  const col = await collection();
  const docs = await col.find({ featured: true }).sort({ name: 1 }).toArray();
  return docs.map(toProduct);
}

export async function getByCategoryFromDb(
  category: CategoryId,
): Promise<Product[]> {
  const col = await collection();
  const docs = await col
    .find({ category } as Filter<ProductDocument>)
    .sort({ name: 1 })
    .toArray();
  return docs.map(toProduct);
}

export async function getAllSlugsFromDb(): Promise<string[]> {
  const col = await collection();
  const docs = await col.find({}, { projection: { slug: 1 } }).toArray();
  return docs.map((d) => d.slug);
}

export async function createProduct(
  data: Product,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const now = new Date();
  const col = await collection();
  try {
    await col.insertOne({
      ...data,
      createdAt: now,
      updatedAt: now,
    });
    return { ok: true };
  } catch (err) {
    const message =
      err instanceof Error && err.message.includes("duplicate")
        ? "Ce slug existe déjà."
        : "Impossible de créer le produit.";
    return { ok: false, error: message };
  }
}

export async function updateProduct(
  slug: string,
  data: Product,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const col = await collection();
  const result = await col.updateOne(
    { slug } as Filter<ProductDocument>,
    {
      $set: {
        ...data,
        updatedAt: new Date(),
      },
    },
  );
  if (result.matchedCount === 0) {
    return { ok: false, error: "Produit introuvable." };
  }
  return { ok: true };
}

export async function deleteProduct(
  slug: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const col = await collection();
  const result = await col.deleteOne({ slug } as Filter<ProductDocument>);
  if (result.deletedCount === 0) {
    return { ok: false, error: "Produit introuvable." };
  }
  return { ok: true };
}

export async function seedProductsIfEmpty(
  items: Product[],
): Promise<{ seeded: number; skipped: boolean }> {
  const col = await collection();
  const count = await col.countDocuments();
  if (count > 0) {
    return { seeded: 0, skipped: true };
  }
  const now = new Date();
  await col.insertMany(
    items.map((p) => ({
      ...p,
      createdAt: now,
      updatedAt: now,
    })),
  );
  return { seeded: items.length, skipped: false };
}
