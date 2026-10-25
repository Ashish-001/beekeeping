import Link from "next/link";
import { Bee } from "@/components/site/Bee";

export default function NotFound() {
  return (
    <div className="bg-honeycomb flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Bee className="animate-float w-24" />
      <h1 className="mt-6 font-display text-6xl font-semibold">404</h1>
      <p className="mt-3 text-lg text-bark/60">This bee wandered off. The page you’re looking for isn’t here.</p>
      <Link href="/" className="mt-8 rounded-full bg-bark px-6 py-3 font-semibold text-cream hover:bg-comb">
        Back to the hive
      </Link>
    </div>
  );
}
