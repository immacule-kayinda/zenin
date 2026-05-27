import type { ProductSpec } from "@/lib/products";

type SpecTableProps = {
  specs: ProductSpec[];
};

export function SpecTable({ specs }: SpecTableProps) {
  return (
    <dl className="divide-y divide-line border-y border-line">
      {specs.map((spec) => (
        <div
          key={spec.label}
          className="grid grid-cols-[minmax(0,9rem)_1fr] gap-4 py-4 sm:grid-cols-[minmax(0,11rem)_1fr]"
        >
          <dt className="text-xs uppercase tracking-[0.15em] text-muted">
            {spec.label}
          </dt>
          <dd className="text-sm text-ink">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}
