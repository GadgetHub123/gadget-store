"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart, Zap, Check } from "lucide-react";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex flex-col gap-3">
      <Button
        size="lg"
        className={`w-full h-14 text-base font-semibold gap-3 transition-all duration-300 ${
          added
            ? "bg-green-500 hover:bg-green-500 text-white shadow-[0_0_30px_oklch(0.7_0.2_145_/_0.3)]"
            : product.stock === 0
              ? "opacity-50 cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_oklch(0.7_0.2_200_/_0.2)] hover:shadow-[0_0_40px_oklch(0.7_0.2_200_/_0.35)]"
        }`}
        disabled={product.stock === 0}
        onClick={handleAdd}
      >
        {added ? (
          <>
            <Check className="w-5 h-5" />
            Added to cart!
          </>
        ) : product.stock === 0 ? (
          "Out of stock"
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            Add to cart
            <Zap className="w-4 h-4 ml-auto opacity-60" />
          </>
        )}
      </Button>

      {added && (
        <p className="text-center text-sm text-green-400 animate-pulse">
          ✓ Check your cart to checkout
        </p>
      )}
    </div>
  );
}
