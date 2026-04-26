"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, Shield, Zap } from "lucide-react";
import AnimatedWords from "@/components/AnimatedWords";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7 },
    )
      .fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.4",
      )
      .fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.4",
      )
      .fromTo(
        buttonsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.4",
      )
      .fromTo(
        featuresRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3",
      );
  }, []);

  function scrollToProducts() {
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div
      ref={containerRef}
      className="relative border-b border-border overflow-hidden min-h-[600px] flex items-center"
    >
      {/* Dark mode video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40 hidden dark:block"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      {/* Light mode video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80 block dark:hidden"
      >
        <source src="/bg-light.mp4" type="video/mp4" />
      </video>

      {/* Dark mode overlays */}
      <div className="absolute inset-0 hidden dark:block bg-[linear-gradient(to_right,_oklch(0.22_0.02_260_/_0.3)_1px,_transparent_1px),linear-gradient(to_bottom,_oklch(0.22_0.02_260_/_0.3)_1px,_transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,_oklch(0.7_0.2_200_/_0.15)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 hidden dark:block bg-gradient-to-t from-background via-background/20 to-transparent" />

      {/* Light mode overlays */}
      <div className="absolute inset-0 dark:hidden bg-gradient-to-t from-background via-transparent to-transparent" />
      <div className="absolute inset-0 dark:hidden bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,_oklch(0.7_0.15_200_/_0.08)_0%,_transparent_60%)]" />

      {/* Floating orbs */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-pulse delay-1000" />

      <div className="relative max-w-6xl mx-auto px-8 py-24 md:py-32 w-full">
        <div ref={badgeRef} style={{ opacity: 0 }}>
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-sm text-primary mb-6 hover:bg-primary/20 transition-colors cursor-default">
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            New arrivals every week
          </div>
        </div>

        <div ref={headingRef} style={{ opacity: 0 }}>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 max-w-5xl leading-none">
            Next-gen gadgets for
            <span className="block" style={{ marginTop: "-8px" }}>
              <AnimatedWords />
            </span>
          </h1>
        </div>

        <div ref={descRef} style={{ opacity: 0 }}>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl leading-relaxed">
            Discover cutting-edge technology — from premium audio to smart
            wearables. Curated for people who demand the best.
          </p>
        </div>

        <div ref={buttonsRef} style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-16 flex-wrap">
            <Button
              size="lg"
              onClick={scrollToProducts}
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_0_20px_oklch(0.55_0.2_200_/_0.3)]"
            >
              Shop now <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToProducts}
              className="border-border hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-200"
            >
              Browse all
            </Button>
          </div>
        </div>

        <div ref={featuresRef} style={{ opacity: 0 }}>
          <div className="flex items-center gap-8 text-sm text-muted-foreground flex-wrap">
            {[
              { icon: Shield, label: "2 year warranty" },
              { icon: Zap, label: "Fast delivery" },
              { icon: Cpu, label: "Latest tech" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 hover:text-primary transition-colors cursor-default"
              >
                <Icon className="w-4 h-4 text-primary" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
