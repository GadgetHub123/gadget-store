import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Shield, Truck, RotateCcw, Zap } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import FadeIn from "@/components/FadeIn";
import ProductReviews from "@/components/ProductReviews";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      reviews: { include: { user: true }, orderBy: { id: "desc" } },
    },
  });

  if (!product) return notFound();

  const related = await prisma.product.findMany({
    where: { category: product.category, NOT: { id } },
    take: 3,
  });

  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto px-8 pt-8">
        <FadeIn direction="left">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to products
          </Link>
        </FadeIn>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <FadeIn direction="left" delay={100}>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-3xl scale-95" />
              <div className="relative bg-card border border-border rounded-2xl overflow-hidden group hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_60px_oklch(0.7_0.2_200_/_0.1)]">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                <div className="relative h-96">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/40 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { icon: Shield, label: "2yr Warranty" },
                  { icon: Truck, label: "Fast Shipping" },
                  { icon: RotateCcw, label: "30d Returns" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1.5 bg-card border border-border rounded-xl p-3 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                  >
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={200}>
            <div className="flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Badge className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors">
                    {product.category}
                  </Badge>
                  <span
                    className={`text-xs px-2 py-1 rounded-full border ${
                      product.stock > 10
                        ? "bg-green-500/10 border-green-500/20 text-green-400"
                        : product.stock > 0
                          ? "bg-orange-500/10 border-orange-500/20 text-orange-400"
                          : "bg-red-500/10 border-red-500/20 text-red-400"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight mb-4 leading-tight">
                  {product.name}
                </h1>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {product.description}
                </p>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-5xl font-bold">₱{product.price}</span>
                <span className="text-muted-foreground text-sm mb-2">PHP</span>
              </div>
              <div className="h-px bg-gradient-to-r from-border via-primary/20 to-border" />
              <AddToCartButton product={product} />
              <div className="flex flex-wrap gap-2">
                {[
                  "Free shipping over ₱99",
                  "Secure checkout",
                  "Easy returns",
                ].map((f) => (
                  <span
                    key={f}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary border border-border px-3 py-1.5 rounded-full hover:border-primary/30 hover:text-primary transition-colors"
                  >
                    <Zap className="w-3 h-3 text-primary" />
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Reviews */}
        <FadeIn direction="up" delay={300}>
          <ProductReviews
            productId={product.id}
            initialReviews={product.reviews.map((r) => ({
              id: r.id,
              rating: r.rating,
              comment: r.comment,
              user: { name: r.user.name },
            }))}
          />
        </FadeIn>

        {/* Related products */}
        {related.length > 0 && (
          <FadeIn direction="up" delay={400}>
            <div className="mt-16">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-xl font-semibold">
                  More in {product.category}
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <Link key={rel.id} href={`/products/${rel.id}`}>
                    <div className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_oklch(0.7_0.2_200_/_0.08)]">
                      <div className="relative h-40 bg-secondary overflow-hidden">
                        <Image
                          src={rel.imageUrl}
                          alt={rel.name}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                          {rel.name}
                        </h3>
                        <p className="text-primary font-semibold mt-1">
                          ₱{rel.price}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </main>
  );
}
