// GitHub Pages build only: next.config.ts aliases "@/lib/data" to this file. Products are read
// once at build time from data/products.json, so there's no caching or writing here.
import "server-only";
import { promises as fs } from "fs";
import path from "path";
import type { Product } from "./types";

export async function getAllProducts(): Promise<Product[]> {
  const products = JSON.parse(await fs.readFile(path.join(process.cwd(), "data", "products.json"), "utf8")) as Product[];
  return products.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getPublishedProducts() {
  return (await getAllProducts()).filter((p) => p.published);
}

export async function getProductBySlug(slug: string) {
  return (await getPublishedProducts()).find((p) => p.slug === slug) ?? null;
}

export async function getProductById(id: string) {
  return (await getAllProducts()).find((p) => p.id === id) ?? null;
}
