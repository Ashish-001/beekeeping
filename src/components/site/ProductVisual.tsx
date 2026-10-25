import type { Product } from "@/lib/types";
import { HoneyJar } from "./HoneyJar";

/** Photo when the admin uploaded one, otherwise a tinted illustrated jar. */
export function ProductVisual({ product, className = "" }: { product: Product; className?: string }) {
  if (product.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={product.image} alt={product.name} className={`h-full w-full object-cover ${className}`} />;
  }
  return (
    <div className={`flex h-full w-full items-center justify-center p-8 ${className}`}>
      <HoneyJar color={product.color} label={product.name} className="h-full max-h-72 w-auto drop-shadow-xl" />
    </div>
  );
}
