import { SITE_NAME } from "@/lib/constants";

function readRawWhatsAppNumber(): string {
  return (
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ??
    process.env.WHATSAPP_NUMBER ??
    ""
  );
}

/**
 * Normalise vers E.164 sans le + (ex. France : 0612345678 → 33612345678).
 */
export function normalizeWhatsAppNumber(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (!digits) return "";

  if (digits.startsWith("00")) {
    digits = digits.slice(2);
  }

  // France : 0X XX XX XX XX
  if (digits.length === 10 && digits.startsWith("0")) {
    return `33${digits.slice(1)}`;
  }

  // France : 6/7XXXXXXXX (sans le 0 initial)
  if (digits.length === 9 && /^[67]/.test(digits)) {
    return `33${digits}`;
  }

  return digits;
}

/** E.164 digits only (no +) */
export function getWhatsAppNumber(): string {
  return normalizeWhatsAppNumber(readRawWhatsAppNumber());
}

export function isWhatsAppConfigured(): boolean {
  const n = getWhatsAppNumber();
  return n.length >= 10 && n.length <= 15;
}

export function buildWhatsAppOrderMessage(
  productName: string,
  productSlug?: string,
): string {
  const name = productName.trim();
  const ref = productSlug?.trim() ? ` (réf. ${productSlug.trim()})` : "";
  return `Bonjour, je souhaite commander ${name}${ref} chez ${SITE_NAME}. Merci de me confirmer le prix, la disponibilité et le délai de livraison.`;
}

export function buildWhatsAppOrderUrl(options: {
  productName: string;
  productSlug?: string;
}): string | null {
  const number = getWhatsAppNumber();
  if (!isWhatsAppConfigured() || !options.productName?.trim()) return null;

  const text = encodeURIComponent(
    buildWhatsAppOrderMessage(options.productName, options.productSlug),
  );

  return `https://api.whatsapp.com/send?phone=${number}&text=${text}`;
}
