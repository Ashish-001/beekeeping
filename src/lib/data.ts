import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { cacheLife, cacheTag } from "next/cache";
import type { Enquiry, Product } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const ENQUIRIES_FILE = path.join(DATA_DIR, "enquiries.json");
export const UPLOADS_DIR = path.join(process.cwd(), "data", "uploads");

/** Statically scoped so the bundler only traces data/uploads, not the whole project. */
export function uploadPath(fileName: string) {
  return path.join(process.cwd(), "data", "uploads", path.basename(fileName));
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, value: unknown) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const tmp = `${file}.${Date.now()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(value, null, 2));
  await fs.rename(tmp, file);
}

/* ---------- Products ---------- */

export async function getAllProducts(): Promise<Product[]> {
  "use cache";
  cacheTag("products");
  cacheLife("max");
  const products = await readJson<Product[]>(PRODUCTS_FILE, []);
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

export async function saveProducts(products: Product[]) {
  await writeJson(PRODUCTS_FILE, products);
}

export async function readProductsUncached() {
  return readJson<Product[]>(PRODUCTS_FILE, []);
}

/* ---------- Enquiries ---------- */

export async function getEnquiries(): Promise<Enquiry[]> {
  const list = await readJson<Enquiry[]>(ENQUIRIES_FILE, []);
  return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function saveEnquiries(list: Enquiry[]) {
  await writeJson(ENQUIRIES_FILE, list);
}
