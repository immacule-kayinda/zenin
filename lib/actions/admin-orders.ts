"use server";

import { revalidatePath } from "next/cache";

import { isAdminAuthenticated } from "@/lib/admin/session";
import { updateOrderStatus } from "@/lib/db/orders";
import type { OrderStatus } from "@/lib/db/types";

export async function markOrderProcessed(orderId: string): Promise<void> {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Non autorisé");
  }
  await updateOrderStatus(orderId, "processed");
  revalidatePath("/admin");
  revalidatePath("/admin/commandes");
  revalidatePath(`/admin/commandes/${orderId}`);
}

export async function setOrderStatus(
  orderId: string,
  status: OrderStatus,
): Promise<{ ok: boolean }> {
  if (!(await isAdminAuthenticated())) {
    return { ok: false };
  }
  const updated = await updateOrderStatus(orderId, status);
  if (updated) {
    revalidatePath("/admin");
    revalidatePath("/admin/commandes");
    revalidatePath(`/admin/commandes/${orderId}`);
  }
  return { ok: updated };
}
