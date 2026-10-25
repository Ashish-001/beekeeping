import Link from "next/link";

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-3xl font-semibold md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-1 text-bark/55">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 rounded-full bg-bark px-5 py-3 text-sm font-semibold text-cream transition hover:-translate-y-0.5 hover:bg-comb">
      {children}
    </Link>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-3xl bg-white p-6 shadow-[0_10px_30px_-20px_rgba(43,26,14,0.3)] ring-1 ring-bark/5 ${className}`}>{children}</div>;
}

export function AdminSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-10 w-56 animate-pulse rounded-2xl bg-wax" />
      <div className="h-5 w-80 animate-pulse rounded-full bg-wax/70" />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-32 animate-pulse rounded-3xl bg-wax/70" />
        ))}
      </div>
      <div className="h-72 animate-pulse rounded-3xl bg-wax/50" />
    </div>
  );
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}
