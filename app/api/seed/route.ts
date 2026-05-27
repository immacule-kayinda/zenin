import { NextResponse } from "next/server";

import { seedProductsIfEmpty } from "@/lib/db/products";
import { isMongoConfigured } from "@/lib/mongodb";
import { products } from "@/lib/products";

export async function POST(request: Request) {
  const secret = process.env.SEED_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "SEED_SECRET non configuré." },
      { status: 503 },
    );
  }

  const auth =
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
    new URL(request.url).searchParams.get("secret");

  if (auth !== secret) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  if (!isMongoConfigured()) {
    return NextResponse.json(
      { error: "MONGODB_URI non configuré." },
      { status: 503 },
    );
  }

  try {
    const result = await seedProductsIfEmpty(products);
    return NextResponse.json({
      ok: true,
      seeded: result.seeded,
      skipped: result.skipped,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
