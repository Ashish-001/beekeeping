"use server";

import { randomUUID, timingSafeEqual } from "crypto";
import { promises as fs } from "fs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { refresh, updateTag } from "next/cache";
import { ADMIN_CONFIG } from "@/config/admin";
import { requireAdmin } from "@/lib/auth";
import {
  UPLOADS_DIR,
  uploadPath,
  getEnquiries,
  readProductsUncached,
  saveEnquiries,
  saveProducts,
} from "@/lib/data";
import { SESSION_COOKIE, createSessionToken, sessionCookieOptions } from "@/lib/session";
import { CATEGORIES, type Category, type Product } from "@/lib/types";

/* ---------- Auth ---------- */

export type LoginState = { error?: string; attempt?: number };

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  // Username is forgiving about case/whitespace; the password must match exactly
  const username = String(formData.get("username") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const expectedUser = ADMIN_CONFIG.username.trim().toLowerCase();
  const expectedPass = ADMIN_CONFIG.password;

  // Evaluate both so timing doesn't reveal which one was wrong
  const userOk = safeEqual(username, expectedUser);
  const passOk = safeEqual(password, expectedPass);
  if (!userOk || !passOk) {
    await new Promise((r) => setTimeout(r, 400));
    return { error: "Invalid username or password", attempt: Date.now() };
  }

  (await cookies()).set(SESSION_COOKIE, await createSessionToken(username), sessionCookieOptions);
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

/* ---------- Products ---------- */

export type ProductFormState = { error?: string };

const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);

const lines = (v: FormDataEntryValue | null) =>
  String(v ?? "")
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);

async function storeImage(file: File) {
  const ext = IMAGE_TYPES[file.type];
  if (!ext) throw new Error("Image must be JPG, PNG, WEBP, AVIF or GIF");
  if (file.size > MAX_IMAGE_BYTES) throw new Error("Image must be under 5 MB");
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  const name = `${randomUUID()}.${ext}`;
  await fs.writeFile(uploadPath(name), Buffer.from(await file.arrayBuffer()));
  return `/media/${name}`;
}

async function removeImage(src: string | null) {
  if (!src?.startsWith("/media/")) return;
  await fs.rm(uploadPath(src), { force: true });
}

export async function saveProduct(_prev: ProductFormState, formData: FormData): Promise<ProductFormState> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "") || null;
  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "") as Category;
  const color = String(formData.get("color") ?? "#E8A317");

  if (name.length < 2) return { error: "Product name is required" };
  if (!CATEGORIES.includes(category)) return { error: "Choose a valid category" };

  const products = await readProductsUncached();
  const existing = id ? products.find((p) => p.id === id) : undefined;
  if (id && !existing) return { error: "Product not found" };

  let slug = slugify(String(formData.get("slug") ?? "") || name) || randomUUID().slice(0, 8);
  if (products.some((p) => p.slug === slug && p.id !== id)) slug = `${slug}-${randomUUID().slice(0, 4)}`;

  let image = existing?.image ?? null;
  const upload = formData.get("image");
  try {
    if (upload instanceof File && upload.size > 0) {
      const stored = await storeImage(upload);
      await removeImage(image);
      image = stored;
    } else if (formData.get("removeImage") === "on") {
      await removeImage(image);
      image = null;
    }
  } catch (e) {
    return { error: (e as Error).message };
  }

  const now = new Date().toISOString();
  const product: Product = {
    id: existing?.id ?? `p_${randomUUID().slice(0, 8)}`,
    slug,
    name,
    category,
    tagline: String(formData.get("tagline") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    priceNote: String(formData.get("priceNote") ?? "").trim(),
    sizes: lines(formData.get("sizes")),
    highlights: lines(formData.get("highlights")),
    color: /^#[0-9a-f]{6}$/i.test(color) ? color : "#E8A317",
    image,
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  await saveProducts(existing ? products.map((p) => (p.id === id ? product : p)) : [...products, product]);
  updateTag("products");
  redirect("/admin/products?saved=1");
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const products = await readProductsUncached();
  const target = products.find((p) => p.id === id);
  if (!target) return;
  await removeImage(target.image);
  await saveProducts(products.filter((p) => p.id !== id));
  updateTag("products");
}

export async function toggleProductFlag(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const flag = String(formData.get("flag")) as "featured" | "published";
  if (flag !== "featured" && flag !== "published") return;
  const products = await readProductsUncached();
  await saveProducts(products.map((p) => (p.id === id ? { ...p, [flag]: !p[flag], updatedAt: new Date().toISOString() } : p)));
  updateTag("products");
}

/* ---------- Enquiries ---------- */

export async function setEnquiryStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = formData.get("status") === "handled" ? "handled" : "new";
  const list = await getEnquiries();
  await saveEnquiries(list.map((e) => (e.id === id ? { ...e, status } : e)));
  refresh();
}

export async function deleteEnquiry(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const list = await getEnquiries();
  await saveEnquiries(list.filter((e) => e.id !== id));
  refresh();
}
