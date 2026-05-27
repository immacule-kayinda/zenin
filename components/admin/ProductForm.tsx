"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/Button";
import type { AdminActionState } from "@/lib/actions/admin-products";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/cn";

const initialState: AdminActionState = { ok: false, message: "" };

type ProductFormProps = {
  product?: Product;
  action: (
    prev: AdminActionState,
    formData: FormData,
  ) => Promise<AdminActionState>;
  submitLabel: string;
};

export function ProductForm({ product, action, submitLabel }: ProductFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  const specsJson = JSON.stringify(product?.specs ?? [], null, 2);
  const imagesJson = JSON.stringify(product?.images ?? [], null, 2);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {state.message ? (
        <p
          className={cn(
            "text-sm",
            state.ok ? "text-muted" : "text-ink",
          )}
          role={state.ok ? "status" : "alert"}
        >
          {state.message}
        </p>
      ) : null}

      <AdminField label="Slug" name="slug" defaultValue={product?.slug} required />
      <AdminField label="Nom" name="name" defaultValue={product?.name} required />
      <div>
        <label htmlFor="category" className="admin-label">
          Catégorie
        </label>
        <select
          id="category"
          name="category"
          defaultValue={product?.category ?? "haltères"}
          className="admin-input mt-2"
        >
          <option value="haltères">Haltères</option>
          <option value="équipement">Équipement</option>
        </select>
      </div>
      <AdminField
        label="Accroche"
        name="tagline"
        defaultValue={product?.tagline}
        required
      />
      <div>
        <label htmlFor="description" className="admin-label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          required
          defaultValue={product?.description}
          className="admin-input mt-2 resize-y"
        />
      </div>
      <AdminField
        label="Prix (libellé)"
        name="priceLabel"
        defaultValue={product?.priceLabel}
        placeholder="Ex. 189 € la paire (optionnel)"
      />
      <div>
        <label htmlFor="specsJson" className="admin-label">
          Caractéristiques (JSON)
        </label>
        <textarea
          id="specsJson"
          name="specsJson"
          rows={6}
          required
          defaultValue={specsJson}
          className="admin-input mt-2 font-mono text-xs"
        />
      </div>
      <div>
        <label htmlFor="imagesJson" className="admin-label">
          Images (JSON)
        </label>
        <textarea
          id="imagesJson"
          name="imagesJson"
          rows={8}
          required
          defaultValue={imagesJson}
          className="admin-input mt-2 font-mono text-xs"
        />
      </div>
      <label className="flex items-center gap-3 text-sm text-ink">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={product?.featured}
          className="size-4 border border-line"
        />
        Produit mis en avant
      </label>

      <Button type="submit" disabled={pending}>
        {pending ? "Enregistrement…" : submitLabel}
      </Button>
    </form>
  );
}

function AdminField({
  label,
  name,
  defaultValue,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="admin-label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="admin-input mt-2"
      />
    </div>
  );
}
