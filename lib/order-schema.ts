import { z } from "zod";

export const orderSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Indiquez votre nom (2 caractères minimum)."),
  email: z
    .string()
    .trim()
    .email("Adresse e-mail invalide."),
  phone: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v === "" ? undefined : v)),
  productSlug: z
    .string()
    .trim()
    .min(1, "Sélectionnez un produit valide."),
  message: z
    .string()
    .trim()
    .min(10, "Décrivez votre demande (10 caractères minimum).")
    .max(2000, "Message trop long (2000 caractères maximum)."),
});

export type OrderInput = z.infer<typeof orderSchema>;

export type OrderFormState = {
  ok: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof OrderInput, string>>;
};

export const initialOrderState: OrderFormState = {
  ok: false,
  message: "",
};
