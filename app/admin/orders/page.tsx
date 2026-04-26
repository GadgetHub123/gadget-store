import { prisma } from "@/lib/prisma";
import { ShoppingBag, TrendingUp, Clock } from "lucide-react";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { user: true, items: true },
    orderBy: { createdAt: "desc" },
  });

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalItems = orders.reduce((sum, o) => sum + o.items.length, 0);

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-1">Orders</h1>
        <p className="text-muted-foreground">
          {orders.length} total orders placed
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          {
            label: "Total orders",
            value: orders.length,
            icon: ShoppingBag,
            color: "text-blue-400",
            bg: "from-blue-500/10 to-blue-500/5",
            border: "border-blue-500/20",
          },
          {
            label: "Total revenue",
            value: `$${totalRevenue.toFixed(2)}`,
            icon: TrendingUp,
            color: "text-primary",
            bg: "from-primary/10 to-primary/5",
            border: "border-primary/20",
          },
          {
            label: "Total items sold",
            value: totalItems,
            icon: Clock,
            color: "text-purple-400",
            bg: "from-purple-500/10 to-purple-500/5",
            border: "border-purple-500/20",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`border ${stat.border} rounded-2xl p-6 bg-gradient-to-br ${stat.bg}`}
          >
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
        ))}
      </div>

      {/* Orders table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="px-6 py-5 border-b border-border">
          <h2 className="font-semibold">All orders</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Sorted by most recent
          </p>
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
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-border hover:bg-secondary/20 transition-colors"
              >
                <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                  #{order.id.slice(0, 8)}...
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                      {order.user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{order.user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {order.items.length} items
                </td>
                <td className="px-6 py-4 font-semibold text-primary">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 text-xs bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-2.5 py-1 rounded-full capitalize">
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
