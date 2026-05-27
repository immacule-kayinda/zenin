import { cn } from "@/lib/cn";
import {
  buildWhatsAppOrderUrl,
  isWhatsAppConfigured,
} from "@/lib/whatsapp";

type WhatsAppButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<WhatsAppButtonVariant, string> = {
  primary:
    "bg-ink text-surface hover:opacity-90 focus-visible:ring-ink focus-visible:ring-offset-surface",
  secondary:
    "border border-ink/20 bg-transparent text-ink hover:bg-ink/[0.04] focus-visible:ring-ink",
  ghost:
    "bg-transparent text-ink underline-offset-4 hover:underline focus-visible:ring-ink",
};

type WhatsAppButtonProps = {
  productName?: string;
  variant?: WhatsAppButtonVariant;
  label?: string;
  showIcon?: boolean;
  className?: string;
};

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-4 shrink-0", className)}
      aria-hidden
    >
      <path d="M7.5 19.5 4 21l1.5-3.5A9 9 0 1 1 12 21a8.97 8.97 0 0 1-4.5-1.5Z" />
      <path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" />
    </svg>
  );
}

export function WhatsAppButton({
  productName,
  variant = "secondary",
  label = "Commander sur WhatsApp",
  showIcon = true,
  className,
}: WhatsAppButtonProps) {
  const href = buildWhatsAppOrderUrl({ productName });
  if (!isWhatsAppConfigured() || !href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide transition-[transform,opacity,background-color] duration-200 ease-zenin focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.97]",
        variantClasses[variant],
        className,
      )}
    >
      {showIcon ? <WhatsAppIcon /> : null}
      {label}
    </a>
  );
}
