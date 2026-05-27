import type { ObjectId } from "mongodb";

import type { CategoryId } from "@/lib/constants";
import type { Product, ProductImage, ProductSpec } from "@/lib/products";

export type ProductDocument = Product & {
  createdAt: Date;
  updatedAt: Date;
};

export type OrderStatus = "pending" | "processed";

export type OrderDocument = {
  _id?: ObjectId;
  name: string;
  email: string;
  phone?: string;
  productSlug: string;
  productName: string;
  message: string;
  status: OrderStatus;
  createdAt: Date;
};

export type ProductInput = Omit<Product, never> & {
  specs?: ProductSpec[];
  images?: ProductImage[];
};

export type OrderListItem = OrderDocument & { _id: ObjectId };
