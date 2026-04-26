import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingBag, Zap } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || (session.user as any).role !== "admin") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 border-r border-border bg-card flex flex-col">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold">
              Gadget<span className="text-primary">Hub</span>
            </span>
          </Link>
          <div className="mt-3 px-2 py-1 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="text-xs text-primary font-medium">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1">
          {[
            { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
            { href: "/admin/products", icon: Package, label: "Products" },
            { href: "/admin/orders", icon: ShoppingBag, label: "Orders" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 group"
            >
              <item.icon className="w-4 h-4 transition-transform group-hover:scale-110" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to store
          </Link>
        </div>
      </aside>

      <main className="flex-1 bg-background">
        <div className="h-px bg-gradient-to-r from-primary/20 via-transparent to-transparent" />
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
