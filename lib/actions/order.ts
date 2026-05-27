"use server";

import {
  initialOrderState,
  orderSchema,
  type OrderFormState,
} from "@/lib/order-schema";
import { isValidProductSlug, fetchProductBySlug } from "@/lib/catalog";
import { createOrder } from "@/lib/db/orders";
import { isMongoConfigured } from "@/lib/mongodb";

export async function submitOrder(
  _prevState: OrderFormState,
  formData: FormData,
): Promise<OrderFormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    productSlug: formData.get("productSlug"),
    message: formData.get("message"),
  };

  const parsed = orderSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: NonNullable<OrderFormState["fieldErrors"]> = {};
    const fields = [
      "name",
      "email",
      "phone",
      "productSlug",
      "message",
    ] as const;
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (
        typeof key === "string" &&
        fields.includes(key as (typeof fields)[number]) &&
        !fieldErrors[key as keyof typeof fieldErrors]
      ) {
        fieldErrors[key as keyof typeof fieldErrors] = issue.message;
      }
    }
    return {
      ok: false,
      message: "Corrigez les champs signalés.",
      fieldErrors,
    };
  }

  const slugValid = await isValidProductSlug(parsed.data.productSlug);
  if (!slugValid) {
    return {
      ok: false,
      message: "Corrigez les champs signalés.",
      fieldErrors: {
        productSlug: "Sélectionnez un produit valide.",
      },
    };
  }

  const product = await fetchProductBySlug(parsed.data.productSlug);
  const productName = product?.name ?? parsed.data.productSlug;

  if (isMongoConfigured()) {
    try {
      const inserted = await createOrder({
        ...parsed.data,
        productName,
      });
      if (!inserted.ok) {
        return {
          ok: false,
          message:
            "Enregistrement impossible pour le moment. Réessayez ou contactez-nous par e-mail.",
        };
      }
    } catch {
      return {
        ok: false,
        message:
          "Enregistrement impossible pour le moment. Réessayez ou contactez-nous par e-mail.",
      };
    }
  }

  console.info("[zenin:order]", {
    ...parsed.data,
    productName,
    at: new Date().toISOString(),
  });

  if (process.env.ORDER_WEBHOOK_URL) {
    try {
      await fetch(process.env.ORDER_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          productName,
        }),
      });
    } catch {
      return {
        ok: false,
        message:
          "Envoi impossible pour le moment. Réessayez ou contactez-nous par e-mail.",
      };
    }
  }

  return {
    ok: true,
    message:
      "Demande reçue. Nous revenons vers vous sous 48 h ouvrées avec un devis personnalisé.",
  };
}

export { initialOrderState };
