"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingCart, ArrowRight, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import FadeIn from "@/components/FadeIn";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);
  if (!hydrated) return null;

  if (items.length === 0) {
    return (
      <main className="max-w-6xl mx-auto px-8 py-24 text-center">
        <FadeIn direction="scale">
          <div className="inline-flex w-20 h-20 rounded-full bg-muted border border-border items-center justify-center mb-6">
            <ShoppingCart className="w-9 h-9 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Add some gadgets to get started.
          </p>
          <Link href="/">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
              Browse products
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </FadeIn>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-8 py-12">
      <FadeIn direction="up">
        <h1 className="text-2xl font-semibold mb-2">Your cart</h1>
        <p className="text-muted-foreground text-sm mb-8">
          {items.length} item{items.length > 1 ? "s" : ""} in your cart
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {items.map((item, i) => (
            <FadeIn key={item.id} direction="left" delay={i * 80}>
              <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:border-primary/30 transition-colors">
                <div className="relative w-20 h-20 bg-secondary rounded-xl overflow-hidden flex-shrink-0 border border-border">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-medium text-sm truncate mb-1">
                    {item.name}
                  </h2>
                  <p className="text-primary text-sm font-semibold">
                    ${item.price}
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-secondary border border-border rounded-lg p-1">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <div className="text-sm font-semibold w-16 text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 rounded-lg hover:bg-red-500/10 hover:text-red-400 text-muted-foreground transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Summary */}
        <FadeIn direction="right" delay={200}>
          <div className="bg-card border border-border rounded-xl overflow-hidden sticky top-24">
            <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="p-6">
              <h2 className="font-semibold mb-4">Order summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${total().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="h-px bg-border my-3" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">${total().toFixed(2)}</span>
                </div>
              </div>
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_oklch(0.7_0.2_200_/_0.2)]"
                onClick={() => router.push("/checkout")}
              >
                Checkout
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Link href="/">
                <Button
                  variant="ghost"
                  className="w-full mt-2 text-muted-foreground hover:text-primary"
                >
                  Continue shopping
                </Button>
              </Link>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
        </FadeIn>
      </div>
    </main>
  );
}


