import { prisma } from "@/lib/prisma";
import ProductGrid from "@/components/ProductGrid";
import ShopHero from "@/components/ShopHero";

export const metadata = {
  title: "Shop — GadgetHub",
  description: "Browse all our latest gadgets",
};

export default async function ShopPage() {
  const products = await prisma.product.findMany();
  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  return (
    <main className="min-h-screen">
      <ShopHero
        productCount={products.length}
        categoryCount={categories.length - 1}
      />
      <ProductGrid products={products} categories={categories} />
    </main>
  );
}
