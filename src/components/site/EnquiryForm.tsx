"use client";

import { useActionState, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { submitEnquiry, type EnquiryState } from "@/app/actions";
import { Bee } from "./Bee";

type Props = {
  productId?: string;
  productName?: string;
  sizes?: string[];
  dark?: boolean;
};

export function EnquiryForm({ productId, productName, sizes = [], dark = false }: Props) {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(submitEnquiry, { ok: false });
  const [formKey, setFormKey] = useState(0);
  // Each submission returns a new state object, so remembering the dismissed one lets us reset
  const [dismissed, setDismissed] = useState<EnquiryState | null>(null);
  const showSuccess = state.ok && state !== dismissed;

  const field = `w-full rounded-2xl border px-4 py-3.5 outline-none transition-all focus:ring-4 ${
    dark
      ? "border-cream/15 bg-cream/5 text-cream placeholder:text-cream/40 focus:border-honey focus:ring-honey/20"
      : "border-bark/10 bg-white placeholder:text-bark/35 focus:border-amber focus:ring-honey/25"
  }`;
  const label = `mb-1.5 block text-sm font-medium ${dark ? "text-cream/80" : "text-bark/80"}`;
  const err = (msg?: string) =>
    msg ? (
      <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-sm text-red-500">
        {msg}
      </motion.p>
    ) : null;

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {showSuccess ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center py-12 text-center"
          >
            <div className="relative h-28 w-28">
              <motion.div
                initial={{ scale: 0, rotate: -120 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 160, damping: 12 }}
                className="clip-hex absolute inset-0 grid place-items-center bg-honey"
              >
                <svg viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="#2b1a0e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.35, duration: 0.5 }} />
                </svg>
              </motion.div>
              <motion.div
                className="absolute -right-8 -top-6 w-10"
                initial={{ x: -80, y: 60, opacity: 0 }}
                animate={{ x: [-80, 10, 0], y: [60, -10, 0], opacity: 1 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
              >
                <Bee />
              </motion.div>
            </div>
            <h3 className={`mt-6 font-display text-3xl font-semibold ${dark ? "text-cream" : ""}`}>Thank you — buzz received!</h3>
            <p className={`mt-2 max-w-sm ${dark ? "text-cream/60" : "text-bark/60"}`}>
              We’ve got your enquiry{productName ? ` about ${productName}` : ""} and will get back to you within 24 hours.
            </p>
            <button
              onClick={() => {
                setDismissed(state);
                setFormKey((k) => k + 1);
              }}
              className="mt-6 text-sm font-semibold text-amber underline-offset-4 hover:underline"
            >
              Send another enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form key={`form-${formKey}`} action={action} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            {productId && <input type="hidden" name="productId" value={productId} />}
            {productName && <input type="hidden" name="productName" value={productName} />}
            {/* honeypot */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            {productName && (
              <div className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm ${dark ? "bg-honey/15 text-cream" : "bg-honey/15"}`}>
                <span className="text-lg">🍯</span>
                Enquiring about <strong>{productName}</strong>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="name">Your name *</label>
                <input id="name" name="name" required className={field} placeholder="Jane Doe" />
                {err(state.fieldErrors?.name)}
              </div>
              <div>
                <label className={label} htmlFor="email">Email *</label>
                <input id="email" name="email" type="email" required className={field} placeholder="jane@example.com" />
                {err(state.fieldErrors?.email)}
              </div>
              <div>
                <label className={label} htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" className={field} placeholder="+91 …" />
              </div>
              <div>
                <label className={label} htmlFor="quantity">{sizes.length ? "Size / quantity" : "Quantity"}</label>
                {sizes.length ? (
                  <select id="quantity" name="quantity" className={field} defaultValue="">
                    <option value="">Select a size</option>
                    {sizes.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                    <option>Bulk / wholesale</option>
                  </select>
                ) : (
                  <input id="quantity" name="quantity" className={field} placeholder="e.g. 5 jars, bulk order" />
                )}
              </div>
            </div>
            <div>
              <label className={label} htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className={`${field} resize-none`}
                placeholder={productName ? `Hi! I'd like to know more about ${productName}…` : "Tell us what you’re looking for…"}
              />
              {err(state.fieldErrors?.message)}
            </div>
            {state.error && <p className="text-sm text-red-500">{state.error}</p>}

            <button
              type="submit"
              disabled={pending}
              className="group relative w-full overflow-hidden rounded-full bg-honey px-8 py-4 font-semibold text-bark shadow-lg shadow-honey/30 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-70 sm:w-auto"
            >
              <span className="absolute inset-0 translate-y-full bg-honey-light transition-transform duration-300 group-hover:translate-y-0" />
              <span className="relative flex items-center justify-center gap-2">
                {pending ? (
                  <>
                    <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="inline-block h-4 w-4 rounded-full border-2 border-bark border-t-transparent" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Enquiry <span className="transition-transform group-hover:translate-x-1">→</span>
                  </>
                )}
              </span>
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
