"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ADMIN_COOKIE } from "@/lib/admin/session";
import { getAdminSessionToken } from "@/lib/admin/token";
import { loginSchema } from "@/lib/admin/product-schema";

export type LoginState = {
  error?: string;
};

export async function loginAdmin(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Mot de passe requis." };
  }

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return { error: "ADMIN_PASSWORD non configuré sur le serveur." };
  }

  if (parsed.data.password !== expected) {
    return { error: "Mot de passe incorrect." };
  }

  const token = await getAdminSessionToken();
  if (!token) {
    return { error: "Session admin indisponible." };
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

export async function logoutAdmin(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}
