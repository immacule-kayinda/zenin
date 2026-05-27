import { cookies } from "next/headers";

import { ADMIN_COOKIE } from "./constants";
import { getAdminSessionToken } from "./token";

export { ADMIN_COOKIE };

export async function isAdminAuthenticated(): Promise<boolean> {
  const expected = await getAdminSessionToken();
  if (!expected) return false;
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === expected;
}

export async function isAdminSessionValue(
  value: string | undefined,
): Promise<boolean> {
  const expected = await getAdminSessionToken();
  if (!expected || !value) return false;
  return value === expected;
}
