import type { Metadata } from "next";
import { Sidebar } from "@/components/admin/Sidebar";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex min-h-screen flex-col bg-[#fbf6ee] md:flex-row">
      <Sidebar />
      <div className="min-w-0 flex-1 px-5 py-8 md:px-10 md:py-10">{children}</div>
    </div>
  );
}
