import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  Users,
  TrendingUp,
  ArrowRight,
  Clock,
} from "lucide-react";

export default async function AdminDashboard() {
  const [products, orders, users, recentOrders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: true, items: true },
    }),
  ]);

  const revenue = await prisma.order.aggregate({
    _sum: { total: true },
  });

  const stats = [
    {
      label: "Total products",
      value: products,
      icon: Package,
      href: "/admin/products",
      color: "text-blue-400",
      bg: "from-blue-500/10 to-blue-500/5",
      border: "border-blue-500/20",
      glow: "group-hover:shadow-[0_0_30px_oklch(0.6_0.2_240_/_0.15)]",
    },
    {
      label: "Total orders",
      value: orders,
      icon: ShoppingBag,
      href: "/admin/orders",
      color: "text-green-400",
      bg: "from-green-500/10 to-green-500/5",
      border: "border-green-500/20",
      glow: "group-hover:shadow-[0_0_30px_oklch(0.6_0.2_150_/_0.15)]",
    },
    {
      label: "Total users",
      value: users,
      icon: Users,
      href: "#",
      color: "text-purple-400",
      bg: "from-purple-500/10 to-purple-500/5",
      border: "border-purple-500/20",
      glow: "group-hover:shadow-[0_0_30px_oklch(0.6_0.2_300_/_0.15)]",
    },
    {
      label: "Total revenue",
      value: `?₱{(revenue._sum.total ?? 0).toFixed(2)}`,
      icon: TrendingUp,
      href: "/admin/orders",
      color: "text-primary",
      bg: "from-primary/10 to-primary/5",
      border: "border-primary/20",
      glow: "group-hover:shadow-[0_0_30px_oklch(0.7_0.2_200_/_0.15)]",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sm text-primary mb-2">
          <Clock className="w-4 h-4" />
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back — here's what's happening today.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <div
              className={`group relative border ${stat.border} rounded-2xl p-6 bg-gradient-to-br ${stat.bg} hover:-translate-y-1 transition-all duration-300 ${stat.glow} overflow-hidden`}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-20" />
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {stat.label}
                </span>
                <div
                  className={`w-8 h-8 rounded-lg bg-current/10 flex items-center justify-center ${stat.color}`}
                >
                  <stat.icon className="w-4 h-4" />
                </div>
              </div>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div>
            <h2 className="font-semibold">Recent orders</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Latest {recentOrders.length} orders
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="flex items-center gap-1 text-xs text-primary hover:underline"
          >
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground">
                Order ID
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground">
                Customer
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground">
                Items
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground">
                Total
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground">
                Status
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-border hover:bg-secondary/20 transition-colors"
              >
                <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                  #{order.id.slice(0, 8)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                      {order.user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-sm">
                      {order.user.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {order.items.length} items
                </td>
                <td className="px-6 py-4 font-semibold text-primary">
                  ₱{order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 text-xs bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


