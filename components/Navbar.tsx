"use client";

import Link from "next/link";
import { ShoppingCart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import gsap from "gsap";

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lastY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);

      if (navRef.current) {
        if (currentY > lastY.current && currentY > 100) {
          gsap.to(navRef.current, { y: -80, duration: 0.3, ease: "power2.in" });
        } else {
          gsap.to(navRef.current, { y: 0, duration: 0.3, ease: "power2.out" });
        }
      }
      lastY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`border-b sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-border bg-card/95 backdrop-blur-md shadow-[0_1px_20px_oklch(0_0_0_/_0.1)]"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Gadget<span className="text-primary">Hub</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
            >
              Home
            </Button>
          </Link>
          <Link href="/shop">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
            >
              Products
            </Button>
          </Link>
          {session && (
            <Link href="/profile">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                My Orders
              </Button>
            </Link>
          )}
          {(session?.user as any)?.role === "admin" && (
            <Link href="/admin">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                Admin
              </Button>
            </Link>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <ThemeToggle />

          {/* Cart */}
          <Link href="/cart">
            <button className="relative p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 group">
              <ShoppingCart className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium animate-pulse">
                  {count}
                </span>
              )}
            </button>
          </Link>

          {/* Auth */}
          {session ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden md:block">
                {session.user?.name}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="border-border hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
