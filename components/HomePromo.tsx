"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prisma } from "@/lib/prisma";

gsap.registerPlugin(ScrollTrigger);

const promos = [
  {
    name: "ProBuds X5",
    tagline: "Hear everything.",
    sub: "Premium noise-cancelling earbuds.",
    imageUrl:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=600&fit=crop",
    href: "/shop",
    bg: "from-zinc-900 to-zinc-800",
    light: false,
  },
  {
    name: "FitBand Ultra",
    tagline: "Live smarter.",
    sub: "Track your health 24/7.",
    imageUrl:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&h=600&fit=crop",
    href: "/shop",
    bg: "from-sky-100 to-cyan-50",
    light: true,
  },
  {
    name: "MechKeys Pro",
    tagline: "Type differently.",
    sub: "Wireless mechanical keyboard.",
    imageUrl:
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&h=600&fit=crop",
    href: "/shop",
    bg: "from-zinc-900 to-zinc-800",
    light: false,
  },
  {
    name: "DrawPad Pro",
    tagline: "Create freely.",
    sub: "12.9-inch pro tablet for creators.",
    imageUrl:
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&h=600&fit=crop",
    href: "/shop",
    bg: "from-orange-50 to-amber-50",
    light: true,
  },
];

export default function HomePromo() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        },
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="px-8 py-12">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-xl font-semibold">Our picks</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
        <Link href="/shop" className="text-sm text-primary hover:underline">
          Shop all →
        </Link>
      </div>

      {/* 2x2 grid like Apple */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {promos.map((promo, i) => (
          <Link key={promo.name} href={promo.href}>
            <div
              ref={(el) => {
                refs.current[i] = el;
              }}
              style={{ opacity: 0 }}
              className={`group relative bg-gradient-to-br ${promo.bg} overflow-hidden rounded-2xl h-[420px] hover:shadow-2xl transition-all duration-500`}
            >
              <Image
                src={promo.imageUrl}
                alt={promo.name}
                fill
                unoptimized
                className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <h3
                  className={`text-4xl font-bold mb-2 ${promo.light ? "text-gray-900" : "text-white"}`}
                >
                  {promo.tagline}
                </h3>
                <p
                  className={`text-lg mb-1 ${promo.light ? "text-gray-700" : "text-white/80"}`}
                >
                  {promo.name}
                </p>
                <p
                  className={`text-sm mb-6 ${promo.light ? "text-gray-500" : "text-white/60"}`}
                >
                  {promo.sub}
                </p>
                <span
                  className={`text-sm px-5 py-2 rounded-full border transition-all duration-200 group-hover:scale-105 ${
                    promo.light
                      ? "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                      : "border-white text-white hover:bg-white hover:text-gray-900"
                  }`}
                >
                  Shop now
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom banner */}
      <div className="mt-4 relative bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/20 rounded-2xl overflow-hidden h-48 flex items-center px-12">
        <div className="relative z-10">
          <p className="text-sm text-primary font-medium mb-1">New arrivals</p>
          <h3 className="text-3xl font-bold mb-3">
            The latest tech, curated for you.
          </h3>
          <Link href="/shop">
            <span className="text-sm text-primary hover:underline">
              Browse all products →
            </span>
          </Link>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-primary/10 to-transparent" />
      </div>
    </section>
  );
}

