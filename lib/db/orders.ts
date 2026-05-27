import { ObjectId, type Collection } from "mongodb";

import { getDb, isMongoConfigured } from "@/lib/mongodb";

import type { OrderDocument, OrderListItem, OrderStatus } from "./types";

function collection(): Promise<Collection<OrderDocument>> {
  return getDb().then((db) => db.collection<OrderDocument>("orders"));
}

export type CreateOrderInput = {
  name: string;
  email: string;
  phone?: string;
  productSlug: string;
  productName: string;
  message: string;
};

export async function createOrder(
  input: CreateOrderInput,
): Promise<{ ok: true; id: string } | { ok: false }> {
  if (!isMongoConfigured()) {
    return { ok: false };
  }
  const col = await collection();
  const doc: OrderDocument = {
    ...input,
    status: "pending",
    createdAt: new Date(),
  };
  const result = await col.insertOne(doc);
  return { ok: true, id: result.insertedId.toString() };
}

export async function listOrders(limit = 100): Promise<OrderListItem[]> {
  const col = await collection();
  const docs = await col
    .find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
  return docs.filter((d): d is OrderListItem => Boolean(d._id));
}

export async function getOrderById(id: string): Promise<OrderListItem | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await collection();
  const doc = await col.findOne({ _id: new ObjectId(id) });
  if (!doc?._id) return null;
  return doc as OrderListItem;
}

export async function countOrders(status?: OrderStatus): Promise<number> {
  const col = await collection();
  const filter = status ? { status } : {};
  return col.countDocuments(filter);
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const col = await collection();
  const result = await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status } },
  );
  return result.matchedCount > 0;
}

export async function countRecentPending(): Promise<number> {
  return countOrders("pending");
}
