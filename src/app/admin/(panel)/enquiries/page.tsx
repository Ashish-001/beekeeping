import Link from "next/link";
import { Suspense } from "react";
import { deleteEnquiry, setEnquiryStatus } from "@/app/admin/actions";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { AdminSkeleton, Card, PageHeader, formatDate } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { getEnquiries } from "@/lib/data";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "handled", label: "Handled" },
] as const;

export default function EnquiriesPage({ searchParams }: PageProps<"/admin/enquiries">) {
  return (
    <Suspense fallback={<AdminSkeleton />}>
      <EnquiriesList searchParams={searchParams} />
    </Suspense>
  );
}

async function EnquiriesList({ searchParams }: { searchParams: PageProps<"/admin/enquiries">["searchParams"] }) {
  await requireAdmin();
  const [all, sp] = await Promise.all([getEnquiries(), searchParams]);
  const filter = FILTERS.find((f) => f.key === sp.status)?.key ?? "all";
  const list = filter === "all" ? all : all.filter((e) => e.status === filter);
  const count = (k: string) => (k === "all" ? all.length : all.filter((e) => e.status === k).length);

  return (
    <>
      <PageHeader title="Enquiries" subtitle="Messages from your website visitors." />

      <div className="mb-6 flex gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f.key}
            href={f.key === "all" ? "/admin/enquiries" : `/admin/enquiries?status=${f.key}`}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${filter === f.key ? "bg-bark text-cream" : "bg-white text-bark/60 ring-1 ring-bark/5 hover:text-bark"}`}
          >
            {f.label} <span className="opacity-60">({count(f.key)})</span>
          </Link>
        ))}
      </div>

      {list.length === 0 ? (
        <Card className="py-16 text-center text-bark/50">Nothing here yet 🐝</Card>
      ) : (
        <div className="grid gap-4">
          {list.map((e) => (
            <Card key={e.id} className={e.status === "new" ? "border-l-4 border-honey" : "opacity-80"}>
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-xl font-semibold">{e.name}</h3>
                    {e.status === "new" ? (
                      <span className="rounded-full bg-honey/25 px-2.5 py-0.5 text-xs font-semibold text-amber">New</span>
                    ) : (
                      <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">Handled</span>
                    )}
                    <span className="text-xs text-bark/40">{formatDate(e.createdAt)}</span>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-bark/60">
                    <a href={`mailto:${e.email}`} className="hover:text-amber">{e.email}</a>
                    {e.phone && <a href={`tel:${e.phone}`} className="hover:text-amber">{e.phone}</a>}
                  </div>
                  {(e.productName || e.quantity) && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {e.productName && <span className="rounded-full bg-honey/15 px-3 py-1 text-xs font-semibold">🍯 {e.productName}</span>}
                      {e.quantity && <span className="rounded-full bg-bark/5 px-3 py-1 text-xs font-semibold">{e.quantity}</span>}
                    </div>
                  )}
                  <p className="mt-3 whitespace-pre-line text-bark/80">{e.message}</p>
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                  <a
                    href={`mailto:${e.email}?subject=${encodeURIComponent(`Re: your enquiry${e.productName ? ` about ${e.productName}` : ""}`)}`}
                    className="rounded-full bg-bark px-4 py-2 text-sm font-semibold text-cream transition hover:bg-comb"
                  >
                    Reply
                  </a>
                  <form action={setEnquiryStatus}>
                    <input type="hidden" name="id" value={e.id} />
                    <input type="hidden" name="status" value={e.status === "new" ? "handled" : "new"} />
                    <button className="rounded-full bg-bark/5 px-4 py-2 text-sm font-semibold transition hover:bg-honey/30">
                      {e.status === "new" ? "Mark handled" : "Mark new"}
                    </button>
                  </form>
                  <form action={deleteEnquiry}>
                    <input type="hidden" name="id" value={e.id} />
                    <ConfirmButton>Delete</ConfirmButton>
                  </form>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
