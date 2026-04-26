import Link from "next/link";
import { Zap, Globe, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">
                Gadget<span className="text-primary">Hub</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Your one-stop shop for the latest and greatest in consumer
              technology. Curated for tech enthusiasts.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {[Globe, Mail, ExternalLink].map((Icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-4">Shop</h3>
            <ul className="space-y-2">
              {[
                "All Products",
                "Audio",
                "Wearables",
                "Phones",
                "Tablets",
                "Accessories",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/shop"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-4">Account</h3>
            <ul className="space-y-2">
              {[
                { label: "Login", href: "/login" },
                { label: "Register", href: "/register" },
                { label: "My Orders", href: "/profile" },
                { label: "Cart", href: "/cart" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 GadgetHub. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
