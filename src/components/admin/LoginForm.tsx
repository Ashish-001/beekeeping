"use client";

import { useActionState, useState } from "react";
import { motion } from "framer-motion";
import { login, type LoginState } from "@/app/admin/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  const [showPassword, setShowPassword] = useState(false);
  const input =
    "w-full rounded-2xl border border-cream/15 bg-cream/5 px-4 py-3.5 text-cream outline-none transition placeholder:text-cream/30 focus:border-honey focus:ring-4 focus:ring-honey/20";

  return (
    <motion.form
      action={action}
      initial={{ opacity: 0, y: 20 }}
      animate={state.error ? { opacity: 1, y: 0, x: [0, -10, 10, -6, 6, 0] } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      key={state.attempt ?? 0}
      className="space-y-4 rounded-[2rem] bg-cream/[0.04] p-8 ring-1 ring-cream/10 backdrop-blur"
    >
      <div>
        <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-cream/70">Username</label>
        <input id="username" name="username" autoComplete="username" autoCapitalize="none" autoCorrect="off" spellCheck={false} required className={input} />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-cream/70">Password</label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            required
            className={`${input} pr-20`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-cream/60 hover:text-honey"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>
      {state.error && <p className="rounded-xl bg-red-500/10 px-4 py-2.5 text-sm text-red-300">{state.error}</p>}
      <button
        disabled={pending}
        className="w-full rounded-full bg-honey px-6 py-3.5 font-semibold text-bark transition hover:bg-honey-light disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </motion.form>
  );
}
