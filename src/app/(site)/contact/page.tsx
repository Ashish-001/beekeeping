import type { Metadata } from "next";
import { Bee } from "@/components/site/Bee";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Enquiries",
  description: "Send us an enquiry for retail, wholesale or gifting orders.",
};

const INFO = [
  { icon: "✉️", label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: "📞", label: "Phone", value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, "")}` },
  { icon: "📍", label: "Apiary", value: SITE.address },
];

export default function ContactPage() {
  return (
    <div className="bg-honeycomb relative overflow-hidden">
      <div className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-honey-light/40 blur-[130px]" />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 pb-32 pt-40 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber">Say hello</p>
          <h1 className="mt-3 font-display text-5xl font-semibold leading-tight md:text-6xl">
            Let’s talk <em className="text-shimmer font-normal italic">honey</em>
          </h1>
          <p className="mt-5 text-lg text-bark/65">
            Whether it’s a single jar, a restaurant supply or 500 wedding favours — drop us a line. We usually reply within a day.
          </p>

          <div className="mt-10 space-y-4">
            {INFO.map((i) => {
              const body = (
                <>
                  <span className="clip-hex grid h-12 w-14 shrink-0 place-items-center bg-honey text-xl">{i.icon}</span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-bark/45">{i.label}</span>
                    <span className="font-semibold">{i.value}</span>
                  </span>
                </>
              );
              const cls = "flex items-center gap-4 rounded-3xl bg-white/80 p-4 ring-1 ring-bark/5 transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-lg";
              return i.href ? (
                <a key={i.label} href={i.href} className={cls}>{body}</a>
              ) : (
                <div key={i.label} className={cls}>{body}</div>
              );
            })}
          </div>

          <div className="relative mt-12 hidden h-24 lg:block">
            <Bee className="animate-float absolute left-10 w-16" />
            <Bee className="animate-float absolute left-40 top-8 w-10 [animation-delay:-3s]" />
          </div>
        </Reveal>

        <Reveal delay={0.15} className="rounded-[2rem] bg-white p-6 shadow-[0_30px_80px_-30px_rgba(43,26,14,0.35)] ring-1 ring-bark/5 md:p-10">
          <h2 className="font-display text-3xl font-semibold">Send an enquiry</h2>
          <p className="mb-8 mt-2 text-bark/60">Tell us what you’re looking for and we’ll get back with prices and availability.</p>
          <EnquiryForm />
        </Reveal>
      </div>
    </div>
  );
}
