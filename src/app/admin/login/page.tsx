import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";
import { Bee } from "@/components/site/Bee";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Admin login", robots: { index: false } };

export default function LoginPage() {
  return (
    <div className="bg-honeycomb-dark relative flex min-h-screen items-center justify-center overflow-hidden bg-night px-6">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-honey/15 blur-[140px]" />
      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center text-cream">
          <span className="clip-hex grid h-20 w-24 place-items-center bg-honey">
            <Bee className="w-12" />
          </span>
          <h1 className="mt-5 font-display text-3xl font-semibold">{SITE.name} Admin</h1>
          <p className="mt-1 text-cream/50">Sign in to manage products & enquiries</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
