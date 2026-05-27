"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { productFormSchema } from "@/lib/admin/product-schema";
import { isAdminAuthenticated } from "@/lib/admin/session";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/lib/db/products";
import type { Product } from "@/lib/products";

export type AdminActionState = {
  ok: boolean;
  message: string;
};

async function requireAdmin(): Promise<void> {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Non autorisé");
  }
}

function formDataToRaw(formData: FormData) {
  return {
    slug: formData.get("slug"),
    name: formData.get("name"),
    category: formData.get("category"),
    tagline: formData.get("tagline"),
    description: formData.get("description"),
    specsJson: formData.get("specsJson"),
    imagesJson: formData.get("imagesJson"),
    featured: formData.get("featured"),
    priceLabel: formData.get("priceLabel"),
  };
}

function revalidateProductPaths(slug: string) {
  revalidatePath("/");
  revalidatePath("/produits");
  revalidatePath(`/produits/${slug}`);
  revalidatePath("/commander");
  revalidatePath("/sitemap.xml");
}

export async function createProductAction(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = productFormSchema.safeParse(formDataToRaw(formData));

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Données invalides.",
    };
  }

  const product: Product = {
    slug: parsed.data.slug,
    name: parsed.data.name,
    category: parsed.data.category,
    tagline: parsed.data.tagline,
    description: parsed.data.description,
    specs: parsed.data.specsJson,
    images: parsed.data.imagesJson,
    featured: parsed.data.featured,
    priceLabel: parsed.data.priceLabel,
  };

  const result = await createProduct(product);
  if (!result.ok) {
    return { ok: false, message: result.error };
  }

  revalidateProductPaths(product.slug);
  redirect(`/admin/produits/${product.slug}`);
}

export async function updateProductAction(
  originalSlug: string,
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = productFormSchema.safeParse(formDataToRaw(formData));

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Données invalides.",
    };
  }

  const product: Product = {
    slug: parsed.data.slug,
    name: parsed.data.name,
    category: parsed.data.category,
    tagline: parsed.data.tagline,
    description: parsed.data.description,
    specs: parsed.data.specsJson,
    images: parsed.data.imagesJson,
    featured: parsed.data.featured,
    priceLabel: parsed.data.priceLabel,
  };

  if (originalSlug !== product.slug) {
    return {
      ok: false,
      message: "Le slug ne peut pas être modifié pour l'instant.",
    };
  }

  const result = await updateProduct(originalSlug, product);
  if (!result.ok) {
    return { ok: false, message: result.error };
  }

  revalidateProductPaths(product.slug);
  return { ok: true, message: "Produit enregistré." };
}

export async function deleteProductAction(slug: string): Promise<void> {
  await requireAdmin();
  await deleteProduct(slug);
  revalidateProductPaths(slug);
  redirect("/admin/produits");
}
