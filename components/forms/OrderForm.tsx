"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/Button";
import { initialOrderState, submitOrder } from "@/lib/actions/order";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/cn";

type OrderFormProps = {
  products: Product[];
  defaultProductSlug?: string;
  /** Produit imposé (page commander après sélection) */
  lockProduct?: boolean;
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 text-xs text-ink" role="alert">
      {message}
    </p>
  );
}

export function OrderForm({
  products,
  defaultProductSlug,
  lockProduct = false,
}: OrderFormProps) {
  const locked =
    lockProduct &&
    defaultProductSlug &&
    products.some((p) => p.slug === defaultProductSlug);
  const lockedProduct = locked
    ? products.find((p) => p.slug === defaultProductSlug)
    : undefined;
  const [state, formAction, pending] = useActionState(
    submitOrder,
    initialOrderState,
  );

  if (state.ok) {
    return (
      <div
        className="border border-line bg-ink/[0.03] px-6 py-10 sm:px-10"
        role="status"
      >
        <p className="text-display text-xl font-semibold text-ink">
          Commande envoyée
        </p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-8" noValidate>
      {!state.ok && state.message ? (
        <p className="text-sm text-ink" role="alert">
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-xs uppercase tracking-[0.15em] text-muted">
            Nom
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={cn(
              "mt-2 w-full border border-line bg-surface px-4 py-3 text-sm text-ink",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            )}
            aria-invalid={!!state.fieldErrors?.name}
            aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
          />
          <FieldError message={state.fieldErrors?.name} />
        </div>

        <div>
          <label htmlFor="email" className="text-xs uppercase tracking-[0.15em] text-muted">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={cn(
              "mt-2 w-full border border-line bg-surface px-4 py-3 text-sm text-ink",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            )}
            aria-invalid={!!state.fieldErrors?.email}
          />
          <FieldError message={state.fieldErrors?.email} />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="text-xs uppercase tracking-[0.15em] text-muted">
          Téléphone <span className="normal-case tracking-normal">(optionnel)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className={cn(
            "mt-2 w-full border border-line bg-surface px-4 py-3 text-sm text-ink",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          )}
        />
      </div>

      {locked && lockedProduct ? (
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-muted">
            Produit
          </p>
          <p className="mt-2 text-sm font-medium text-ink">
            {lockedProduct.name}
          </p>
          <input
            type="hidden"
            name="productSlug"
            value={lockedProduct.slug}
          />
        </div>
      ) : (
        <div>
          <label
            htmlFor="productSlug"
            className="text-xs uppercase tracking-[0.15em] text-muted"
          >
            Produit
          </label>
          <select
            id="productSlug"
            name="productSlug"
            required
            defaultValue={defaultProductSlug ?? ""}
            className={cn(
              "mt-2 w-full border border-line bg-surface px-4 py-3 text-sm text-ink",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            )}
            aria-invalid={!!state.fieldErrors?.productSlug}
          >
            <option value="" disabled>
              Sélectionnez un produit
            </option>
            {products.map((product) => (
              <option key={product.slug} value={product.slug}>
                {product.name}
                {product.priceLabel ? ` · ${product.priceLabel}` : ""}
              </option>
            ))}
          </select>
          <FieldError message={state.fieldErrors?.productSlug} />
        </div>
      )}

      <div>
        <label htmlFor="message" className="text-xs uppercase tracking-[0.15em] text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Quantité, adresse de livraison, délai souhaité..."
          className={cn(
            "mt-2 w-full resize-y border border-line bg-surface px-4 py-3 text-sm text-ink",
            "placeholder:text-muted/70",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          )}
          aria-invalid={!!state.fieldErrors?.message}
        />
        <FieldError message={state.fieldErrors?.message} />
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Envoi en cours…" : "Envoyer la commande"}
      </Button>
    </form>
  );
}
