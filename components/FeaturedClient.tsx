"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: "phone",
    name: "UltraPhone 14",
    category: "Phones",
    description:
      "Flagship smartphone with 200MP camera, 5000mAh battery, and 120Hz AMOLED display.",
    price: 699,
    imageUrl: "https://cdn.mos.cms.futurecdn.net/LaTpyDmuXxPWyXhxnLxYyV.jpg",
    href: "/shop",
  },
  {
    id: "watch",
    name: "SmartWatch S2",
    category: "Wearables",
    description:
      "Health tracking smartwatch with AMOLED display, GPS, and 7-day battery life.",
    price: 249,
    imageUrl:
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=1600&h=900&fit=crop",
    href: "/shop",
  },
  {
    id: "headphones",
    name: "StudioCans HD",
    category: "Audio",
    description:
      "Over-ear studio headphones with 40mm drivers and hi-res audio certification.",
    price: 199,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&h=900&fit=crop",
    href: "/shop",
  },
  {
    id: "tablet",
    name: "TabPad Ultra",
    category: "Tablets",
    description:
      "10.9-inch tablet with stylus support, 2K display, and 12hr battery.",
    price: 449,
    imageUrl:
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=1600&h=900&fit=crop",
    href: "/shop",
  },
];

export default function FeaturedClient({
  phone,
  watch,
  headphones,
  tablet,
}: {
  phone?: any;
  watch?: any;
  headphones?: any;
  tablet?: any;
}) {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 90%" },
      },
    );
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
      },
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  function slideTo(index: number) {
    const next = index % slides.length;
    gsap.to(wrapperRef.current, {
      x: `-${next * 100}vw`,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => setCurrent(next),
    });
  }

  // Auto-loop every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      slideTo(current + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <div>
      <div
        ref={titleRef}
        className="flex items-center gap-4 pb-6 px-8"
        style={{ opacity: 0 }}
      >
        <h2 className="text-xl font-semibold">Featured</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
        <span className="text-sm text-muted-foreground">
          {current + 1} / {slides.length}
        </span>
      </div>

      <div
        ref={containerRef}
        style={{ opacity: 0 }}
        className="relative overflow-hidden w-full h-[80vh]"
      >
        {/* Sliding track */}
        <div
          ref={wrapperRef}
          className="flex h-full"
          style={{ width: `${slides.length * 100}vw` }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className="relative h-full flex-shrink-0"
              style={{ width: "100vw" }}
            >
              <Image
                src={slide.imageUrl}
                alt={slide.name}
                fill
                unoptimized
                priority={i === 0}
                className="object-cover object-center"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 px-16 pb-16">
                <span className="text-xs text-primary bg-primary/10 px-3 py-1 mb-4 inline-block">
                  {slide.category}
                </span>
                <h3 className="text-5xl md:text-7xl font-bold text-white mb-4">
                  {slide.name}
                </h3>
                <p className="text-white/60 text-lg mb-8 max-w-xl leading-relaxed">
                  {slide.description}
                </p>
                <div className="flex items-center gap-6">
                  <span className="text-4xl font-bold text-primary">
                    ${slide.price}
                  </span>
                  <Link href={slide.href}>
                    <button className="text-white/80 text-sm bg-white/10 backdrop-blur-sm px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-all duration-200">
                      Shop now →
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots only */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => slideTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "w-8 h-2 bg-primary"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

