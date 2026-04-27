"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Truck, Smartphone, CreditCard, Check } from "lucide-react";

const paymentMethods = [
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: Truck,
  },
  {
    id: "gcash",
    label: "GCash",
    description: "Pay via GCash mobile wallet",
    icon: Smartphone,
  },
  {
    id: "card",
    label: "Credit / Debit Card",
    description: "Visa, Mastercard, and more",
    icon: CreditCard,
  },
];

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("cod");
  const [gcashNumber, setGcashNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => setHydrated(true), []);

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
    if (payment === "gcash" && !gcashNumber.trim()) {
      setError("Please enter your GCash number");
      return;
    }
    if (
      payment === "card" &&
      (!cardNumber.trim() || !cardExpiry.trim() || !cardCvv.trim())
    ) {
      setError("Please fill in all card details");
      return;
    }

    setLoading(true);
    setError("");

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, address, payment }),
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
    <main className="max-w-4xl mx-auto px-8 py-12">
      <h1 className="text-2xl font-semibold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Order summary */}
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

        {/* Right side */}
        <div className="flex flex-col gap-6">
          {/* Delivery address */}
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

          {/* Payment method */}
          <div>
            <Label className="mb-3 block">Payment method</Label>
            <div className="flex flex-col gap-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPayment(method.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left ${
                    payment === method.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40 bg-card"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      payment === method.id ? "bg-primary/10" : "bg-secondary"
                    }`}
                  >
                    <method.icon
                      className={`w-5 h-5 ${payment === method.id ? "text-primary" : "text-muted-foreground"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium ${payment === method.id ? "text-primary" : ""}`}
                    >
                      {method.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {method.description}
                    </p>
                  </div>
                  {payment === method.id && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* GCash number input */}
          {payment === "gcash" && (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="gcash">GCash number</Label>
              <Input
                id="gcash"
                placeholder="09XX XXX XXXX"
                value={gcashNumber}
                onChange={(e) => setGcashNumber(e.target.value)}
                className="bg-card border-border focus:border-primary"
              />
              <p className="text-xs text-muted-foreground">
                You will receive a payment request on your GCash app.
              </p>
            </div>
          )}

          {/* Card details */}
          {payment === "card" && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="cardNumber">Card number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="bg-card border-border focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="expiry">Expiry date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="bg-card border-border focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="bg-card border-border focus:border-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            size="lg"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_oklch(0.7_0.2_200_/_0.2)]"
            onClick={handleOrder}
            disabled={loading}
          >
            {loading
              ? "Placing order..."
              : `Pay with ${paymentMethods.find((m) => m.id === payment)?.label}`}
          </Button>
        </div>
      </div>
    </main>
  );
}
