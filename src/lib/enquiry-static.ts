// GitHub Pages build only: next.config.ts aliases "@/app/actions" to this file, because a
// static site can't run server actions. Enquiries are emailed to you via Web3Forms instead.
// Get a free access key at https://web3forms.com and add it as the repo secret WEB3FORMS_ACCESS_KEY.

export type EnquiryState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim().slice(0, 2000);

  if (get("company")) return { ok: true };

  const name = get("name");
  const email = get("email");
  const message = get("message");
  const productName = get("productName");

  const fieldErrors: EnquiryState["fieldErrors"] = {};
  if (name.length < 2) fieldErrors.name = "Please tell us your name";
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Please enter a valid email";
  if (message.length < 5) fieldErrors.message = "A few words about your enquiry, please";
  if (Object.keys(fieldErrors).length) return { ok: false, fieldErrors };

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!accessKey) return { ok: false, error: "Enquiries aren't set up yet. Please email us directly." };

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: productName ? `New enquiry: ${productName}` : "New website enquiry",
        from_name: name,
        name,
        email,
        phone: get("phone"),
        product: productName || "General enquiry",
        quantity: get("quantity"),
        message,
      }),
    });
    const data = (await res.json()) as { success?: boolean };
    if (!res.ok || !data.success) throw new Error();
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
  return { ok: true };
}
