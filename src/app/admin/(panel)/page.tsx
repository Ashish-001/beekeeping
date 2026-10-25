import Link from "next/link";
import { Suspense } from "react";
import { AdminSkeleton, Card, PageHeader, PrimaryLink, formatDate } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { getAllProducts, getEnquiries } from "@/lib/data";

export default function DashboardPage() {
  return (
    <Suspense fallback={<AdminSkeleton />}>
      <Dashboard />
    </Suspense>
  );
}

async function Dashboard() {
  const { username } = await requireAdmin();
  const [products, enquiries] = await Promise.all([getAllProducts(), getEnquiries()]);
  const fresh = enquiries.filter((e) => e.status === "new");

  const stats = [
    { label: "Total products", value: products.length, href: "/admin/products" },
    { label: "Published", value: products.filter((p) => p.published).length, href: "/admin/products" },
    { label: "New enquiries", value: fresh.length, href: "/admin/enquiries", highlight: fresh.length > 0 },
  ];

  return (
    <>
      <PageHeader title={`Welcome back, ${username} 🐝`} subtitle="Here’s what’s buzzing in the hive." action={<PrimaryLink href="/admin/products/new">+ Add product</PrimaryLink>} />

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className={`group rounded-3xl p-6 ring-1 transition hover:-translate-y-0.5 hover:shadow-lg ${s.highlight ? "bg-honey ring-honey" : "bg-white ring-bark/5"}`}>
            <p className={`text-sm font-medium ${s.highlight ? "text-bark/70" : "text-bark/50"}`}>{s.label}</p>
            <p className="mt-2 font-display text-5xl font-semibold">{s.value}</p>
          </Link>
        ))}
      </div>

      <Card className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Latest enquiries</h2>
          <Link href="/admin/enquiries" className="text-sm font-semibold text-amber hover:underline">View all →</Link>
        </div>
        {enquiries.length === 0 ? (
          <p className="py-10 text-center text-bark/50">No enquiries yet. They’ll appear here as soon as visitors send them.</p>
        ) : (
          <ul className="divide-y divide-bark/5">
            {enquiries.slice(0, 6).map((e) => (
              <li key={e.id} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="font-semibold">
                    {e.name}
                    {e.status === "new" && <span className="ml-2 rounded-full bg-honey/25 px-2 py-0.5 text-xs font-semibold text-amber">New</span>}
                  </p>
                  <p className="truncate text-sm text-bark/55">
                    {e.productName ? `${e.productName} · ` : ""}
                    {e.message}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-bark/40">{formatDate(e.createdAt)}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
