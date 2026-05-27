import { SITE_NAME } from "@/lib/constants";

/** E.164 digits only (no +), from NEXT_PUBLIC_WHATSAPP_NUMBER */
export function getWhatsAppNumber(): string {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  return raw.replace(/\D/g, "");
}

export function isWhatsAppConfigured(): boolean {
  return getWhatsAppNumber().length >= 8;
}

export function buildWhatsAppOrderMessage(productName?: string): string {
  if (productName?.trim()) {
    return `Bonjour, je souhaite commander ${productName.trim()} (${SITE_NAME}). Pouvez-vous me confirmer disponibilité et délai ?`;
  }
  return `Bonjour, je souhaite passer une commande ${SITE_NAME}. Pouvez-vous me guider sur les options et le délai ?`;
}

export function buildWhatsAppOrderUrl(options?: {
  productName?: string;
}): string | null {
  const number = getWhatsAppNumber();
  if (!number) return null;

  const text = encodeURIComponent(
    buildWhatsAppOrderMessage(options?.productName),
  );
  return `https://wa.me/${number}?text=${text}`;
}
