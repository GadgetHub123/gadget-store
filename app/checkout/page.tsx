"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && items.length === 0 && !orderPlaced) {
      router.push("/cart");
    }
  }, [hydrated, items, router, orderPlaced]);

  if (!hydrated) return null;
  if (items.length === 0 && !orderPlaced) return null;

  async function handleOrder() {
    if (!address.trim()) {
      setError("Please enter a delivery address");
      return;
    }

    setLoading(true);
    setError("");

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, address }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      setLoading(false);
      return;
    }

    setOrderPlaced(true);
    clearCart();
    router.push(`/orders/${data.orderId}`);
  }

  return (
    <main className="max-w-3xl mx-auto px-8 py-12">
      <h1 className="text-2xl font-semibold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col gap-4">
          <h2 className="font-medium">Order summary</h2>
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="relative w-14 h-14 bg-secondary rounded-xl overflow-hidden flex-shrink-0 border border-border">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  x{item.quantity}
                </p>
              </div>
              <p className="text-sm font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          <div className="border-t border-border pt-4 flex justify-between">
            <span className="font-medium">Total</span>
            <span className="font-bold text-primary">
              ${total().toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-medium">Delivery details</h2>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="address">Delivery address</Label>
            <Input
              id="address"
              placeholder="123 Main St, City, Country"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-card border-border focus:border-primary"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            size="lg"
            className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_oklch(0.7_0.2_200_/_0.2)]"
            onClick={handleOrder}
            disabled={loading}
          >
            {loading ? "Placing order..." : "Place order"}
          </Button>
        </div>
      </div>
    </main>
  );
}
