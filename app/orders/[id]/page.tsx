import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Package, MapPin, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: { product: true },
      },
      user: true,
    },
  });

  if (!order) return notFound();

  return (
    <main className="min-h-screen py-12 px-8">
      <div className="max-w-2xl mx-auto">
        {/* Success header */}
        <div className="text-center mb-10">
          <div className="relative inline-flex mb-6">
            <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <div className="absolute inset-0 bg-green-500/10 rounded-full blur-xl animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order confirmed!</h1>
          <p className="text-muted-foreground">
            Thanks {order.user.name} — your order is being processed.
          </p>
        </div>

        {/* Receipt card */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {/* Top glow */}
          <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          {/* Order meta */}
          <div className="p-6 border-b border-border">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Order ID</p>
                <p className="font-mono text-sm font-medium">
                  #{order.id.slice(0, 12).toUpperCase()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Date</p>
                <p className="text-sm font-medium">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Status</p>
                <span className="inline-flex items-center gap-1.5 text-xs bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Payment</p>
                <span className="inline-flex items-center gap-1.5 text-xs bg-green-500/10 border border-green-500/20 text-green-400 px-2.5 py-1 rounded-full">
                  <CheckCircle className="w-3 h-3" />
                  Paid
                </span>
              </div>
            </div>
          </div>

          {/* Delivery address */}
          <div className="px-6 py-4 border-b border-border flex items-start gap-3">
            <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Delivery address
              </p>
              <p className="text-sm font-medium">{order.address}</p>
            </div>
          </div>

          {/* Items */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-4 h-4 text-primary" />
              <p className="text-sm font-medium">
                {order.items.length} item{order.items.length > 1 ? "s" : ""}{" "}
                ordered
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative w-16 h-16 bg-secondary rounded-xl overflow-hidden flex-shrink-0 border border-border">
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      ${item.priceAtPurchase} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-sm flex-shrink-0">
                    ${(item.priceAtPurchase * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="px-6 py-4 border-b border-border space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Shipping</span>
              <span className="text-green-400">Free</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="h-px bg-border my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">${order.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Feature strip */}
          <div className="px-6 py-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Zap className="w-3.5 h-3.5 text-primary" />
            Estimated delivery: 3-5 business days
          </div>

          {/* Bottom glow */}
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Link href="/profile" className="flex-1">
            <Button
              variant="outline"
              className="w-full border-border hover:border-primary hover:text-primary transition-colors"
            >
              View all orders
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
              Continue shopping
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
