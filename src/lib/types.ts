export const CATEGORIES = [
  "Honey",
  "Honeycomb",
  "Bee Pollen",
  "Propolis",
  "Royal Jelly",
  "Beeswax",
  "Gift Sets",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  tagline: string;
  description: string;
  /** Free text, e.g. "From ₹450" — optional, since we only take enquiries */
  priceNote: string;
  sizes: string[];
  highlights: string[];
  /** Jar/illustration tint used when there is no photo */
  color: string;
  image: string | null;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  quantity: string;
  productId: string | null;
  productName: string | null;
  status: "new" | "handled";
  createdAt: string;
};
