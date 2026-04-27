"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart, Zap, Eye } from "lucide-react";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <Link href={`/products/${product.id}`}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/60 hover:shadow-[0_0_40px_oklch(0.7_0.2_200_/_0.12)] hover:-translate-y-1"
      >
        {/* Glow top edge on hover */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Image area */}
        <div className="relative h-52 bg-secondary overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quick view button on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <span className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-border text-foreground text-xs px-3 py-1.5 rounded-full">
              <Eye className="w-3 h-3" />
              Quick view
            </span>
          </div>

          {/* Stock badge */}
          {product.stock < 10 && product.stock > 0 && (
            <div className="absolute top-3 right-3">
              <span className="bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                Only {product.stock} left
              </span>
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground border border-border px-3 py-1.5 rounded-full">
                Out of stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <Badge
              variant="secondary"
              className="text-xs bg-primary/10 text-primary border border-primary/20 transition-colors group-hover:bg-primary/20"
            >
              {product.category}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {product.stock} in stock
            </span>
          </div>

          <h2 className="font-semibold text-base mb-1 transition-colors duration-200 group-hover:text-primary">
            {product.name}
          </h2>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xl font-bold">${product.price}</span>
            </div>
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`gap-2 transition-all duration-300 ${
                added
                  ? "bg-green-500 hover:bg-green-500 text-white scale-95"
                  : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95"
              }`}
            >
              {added ? (
                <>
                  <Zap className="w-3.5 h-3.5 animate-pulse" />
                  Added!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Add
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </Link>
  );
}

