import Link from "next/link";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-surface hover:opacity-90 focus-visible:ring-ink focus-visible:ring-offset-surface",
  secondary:
    "border border-ink/20 bg-transparent text-ink hover:bg-ink/[0.04] focus-visible:ring-ink",
  ghost:
    "bg-transparent text-ink underline-offset-4 hover:underline focus-visible:ring-ink",
};

type SharedProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = SharedProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps &
  React.ComponentProps<typeof Link> & {
    href: string;
  };

export function Button({
  variant = "primary",
  className,
  children,
  href,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide transition-[transform,opacity,background-color] duration-200 ease-zenin focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    className,
  );

  if (href) {
    const { href: _h, className: _c, ...linkProps } =
      props as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } =
    props as React.ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
