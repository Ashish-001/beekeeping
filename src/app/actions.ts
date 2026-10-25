"use server";

import { randomUUID } from "crypto";
import { getEnquiries, getProductById, saveEnquiries } from "@/lib/data";
import type { Enquiry } from "@/lib/types";

export type EnquiryState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim().slice(0, 2000);

  // Honeypot field — real visitors never fill this in
  if (get("company")) return { ok: true };

  const name = get("name");
  const email = get("email");
  const phone = get("phone");
  const message = get("message");
  const quantity = get("quantity");
  const productId = get("productId") || null;

  const fieldErrors: EnquiryState["fieldErrors"] = {};
  if (name.length < 2) fieldErrors.name = "Please tell us your name";
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Please enter a valid email";
  if (message.length < 5) fieldErrors.message = "A few words about your enquiry, please";
  if (Object.keys(fieldErrors).length) return { ok: false, fieldErrors };

  const product = productId ? await getProductById(productId) : null;

  const enquiry: Enquiry = {
    id: randomUUID(),
    name,
    email,
    phone,
    message,
    quantity,
    productId: product?.id ?? null,
    productName: product?.name ?? null,
    status: "new",
    createdAt: new Date().toISOString(),
  };

  try {
    const list = await getEnquiries();
    list.push(enquiry);
    await saveEnquiries(list);
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
  return { ok: true };
}
