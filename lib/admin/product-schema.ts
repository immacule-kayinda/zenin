import { z } from "zod";

import { CATEGORIES, type CategoryId } from "@/lib/constants";

const categoryIds = CATEGORIES.map((c) => c.id) as [CategoryId, ...CategoryId[]];

const productImageSchema = z.object({
  src: z.string().trim().min(1, "URL d'image requise."),
  alt: z.string().trim().min(1, "Texte alternatif requis."),
  aspect: z.enum(["4/5", "16/9", "1/1"]).optional(),
});

const productSpecSchema = z.object({
  label: z.string().trim().min(1),
  value: z.string().trim().min(1),
});

export const productFormSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2)
    .max(80)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug : minuscules, chiffres et tirets uniquement.",
    ),
  name: z.string().trim().min(2).max(120),
  category: z.enum(categoryIds),
  tagline: z.string().trim().min(5).max(200),
  description: z.string().trim().min(20).max(3000),
  specsJson: z
    .string()
    .trim()
    .transform((v) => (v === "" ? "[]" : v))
    .refine((v) => {
      try {
        const parsed = JSON.parse(v);
        return Array.isArray(parsed);
      } catch {
        return false;
      }
    }, "JSON des caractéristiques invalide.")
    .transform((v) => {
      const parsed = JSON.parse(v) as unknown[];
      return z.array(productSpecSchema).parse(parsed);
    }),
  imagesJson: z
    .string()
    .trim()
    .transform((v) => (v === "" ? "[]" : v))
    .refine((v) => {
      try {
        const parsed = JSON.parse(v);
        return Array.isArray(parsed);
      } catch {
        return false;
      }
    }, "JSON des images invalide.")
    .transform((v) => {
      const parsed = JSON.parse(v) as unknown[];
      return z.array(productImageSchema).parse(parsed);
    }),
  featured: z
    .string()
    .optional()
    .transform((v) => v === "on" || v === "true"),
  priceLabel: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v === "" ? undefined : v)),
});

export type ProductFormInput = z.infer<typeof productFormSchema>;

export const loginSchema = z.object({
  password: z.string().min(1, "Mot de passe requis."),
});
