import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Package } from "lucide-react";
import DeleteProductButton from "@/components/DeleteProductButton";
import Image from "next/image";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany();

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-1">Products</h1>
          <p className="text-muted-foreground">
            {products.length} products across {categories.length} categories
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 shadow-[0_0_20px_oklch(0.7_0.2_200_/_0.2)]">
            <Plus className="w-4 h-4" />
            Add product
          </Button>
        </Link>
      </div>

      {/* Category stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {categories.map((cat) => {
          const count = products.filter((p) => p.category === cat).length;
          return (
            <div
              key={cat}
              className="bg-card border border-border rounded-xl p-4 hover:border-primary/40 transition-colors"
            >
              <p className="text-lg font-bold text-primary">{count}</p>
              <p className="text-xs text-muted-foreground">{cat}</p>
            </div>
          );
        })}
      </div>

      {/* Products table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground">
                Product
              </th>
              <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground">
                Category
              </th>
              <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground">
                Price
              </th>
              <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground">
                Stock
              </th>
              <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t border-border hover:bg-secondary/20 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-secondary border border-border flex-shrink-0 group-hover:border-primary/30 transition-colors">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1 max-w-xs">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs bg-primary/10 border border-primary/20 text-primary px-2.5 py-1 rounded-full">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold text-primary">
                  ₱{product.price}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full border ${
                      product.stock > 20
                        ? "bg-green-500/10 border-green-500/20 text-green-400"
                        : product.stock > 0
                          ? "bg-orange-500/10 border-orange-500/20 text-orange-400"
                          : "bg-red-500/10 border-red-500/20 text-red-400"
                    }`}
                  >
                    {product.stock} in stock
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/products/${product.id}/edit`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border hover:border-primary hover:text-primary transition-colors h-8 text-xs"
                      >
                        Edit
                      </Button>
                    </Link>
                    <DeleteProductButton id={product.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


