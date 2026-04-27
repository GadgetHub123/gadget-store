import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import ProfileHero from "@/components/ProfileHero";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  const totalItems = orders.reduce((sum, o) => sum + o.items.length, 0);
  const totalSpent = `?${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}`;

  return (
    <main className="min-h-screen">
      <ProfileHero
        name={session.user.name!}
        email={session.user.email!}
        totalOrders={orders.length}
        totalItems={totalItems}
        totalSpent={totalSpent}
      />

      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="flex items-center gap-4 mb-8">
          <ShoppingBag className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Order history</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
        </div>

        {orders.length === 0 ? (
          <div className="relative border border-border rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,_oklch(0.7_0.2_200_/_0.05)_0%,_transparent_70%)]" />
            <div className="relative flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                <Package className="w-10 h-10 text-primary/50" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
              <p className="text-muted-foreground text-sm mb-8 max-w-xs">
                You haven't placed any orders yet. Start browsing our
                collection!
              </p>
              <Link href="/shop">
                <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 hover:scale-105 transition-all duration-200">
                  Start shopping
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <Link key={order.id} href={`/orders/${order.id}`}>
                <div className="group border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.7_0.2_200_/_0.06)]">
                  <div className="h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/40 transition-all duration-300" />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <Package className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-mono text-sm font-medium">
                            #{order.id.slice(0, 12).toUpperCase()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 text-xs bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full capitalize">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                          {order.status}
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 4).map((item) => (
                          <div
                            key={item.id}
                            className="relative w-10 h-10 rounded-lg border-2 border-background overflow-hidden bg-secondary flex-shrink-0"
                          >
                            <Image
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          </div>
                        ))}
                        {order.items.length > 4 && (
                          <div className="w-10 h-10 rounded-lg border-2 border-background bg-secondary flex items-center justify-center text-xs text-muted-foreground font-medium flex-shrink-0">
                            +{order.items.length - 4}
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {order.items.length} item
                        {order.items.length > 1 ? "s" : ""}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex flex-wrap gap-1">
                        {order.items.slice(0, 2).map((item) => (
                          <span
                            key={item.id}
                            className="text-xs bg-secondary text-muted-foreground px-2 py-1 rounded-md"
                          >
                            {item.product.name}
                          </span>
                        ))}
                        {order.items.length > 2 && (
                          <span className="text-xs bg-secondary text-muted-foreground px-2 py-1 rounded-md">
                            +{order.items.length - 2} more
                          </span>
                        )}
                      </div>
                      <p className="font-bold text-lg text-primary">
                        ₱{order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {orders.length > 0 && (
          <div className="mt-8 text-center">
            <Link href="/shop">
              <button className="flex items-center gap-2 mx-auto text-sm text-muted-foreground hover:text-primary transition-colors">
                Continue shopping
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}


