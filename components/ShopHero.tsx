"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import gsap from "gsap";

export default function ShopHero({
  productCount,
  categoryCount,
}: {
  productCount: number;
  categoryCount: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // GSAP entrance
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
    )
      .fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.3",
      )
      .fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4",
      )
      .fromTo(
        statsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3",
      );
  }, []);

  // Canvas particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = theme === "dark";

    // Colors based on theme
    const particleColor = isDark
      ? "0.7 0.2 200" // cyan for dark
      : "0.55 0.22 15"; // red for light

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }[] = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    let animId: number;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `oklch(${particleColor} / ${(1 - dist / 120) * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(${particleColor} / ${p.opacity})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  return (
    <div className="relative overflow-hidden border-b border-border min-h-[360px] flex items-center">
      {/* Animated canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,_oklch(0.22_0.02_260_/_0.2)_1px,_transparent_1px),linear-gradient(to_bottom,_oklch(0.22_0.02_260_/_0.2)_1px,_transparent_1px)] dark:bg-[linear-gradient(to_right,_oklch(0.22_0.02_260_/_0.2)_1px,_transparent_1px),linear-gradient(to_bottom,_oklch(0.22_0.02_260_/_0.2)_1px,_transparent_1px)] bg-[size:48px_48px]" />

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,_oklch(0.7_0.2_200_/_0.08)_0%,_transparent_70%)] dark:bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,_oklch(0.7_0.2_200_/_0.08)_0%,_transparent_70%)]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-8 py-20 w-full">
        <div
          ref={badgeRef}
          style={{ opacity: 0 }}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-sm text-primary mb-4"
        >
          ⚡ {productCount} products available
        </div>

        <h1
          ref={headingRef}
          style={{ opacity: 0 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-4 leading-none"
        >
          All Products
        </h1>

        <p
          ref={descRef}
          style={{ opacity: 0 }}
          className="text-muted-foreground text-lg max-w-md mb-8"
        >
          Browse our full collection of cutting-edge gadgets, curated for tech
          enthusiasts.
        </p>

        <div
          ref={statsRef}
          style={{ opacity: 0 }}
          className="flex items-center gap-8 flex-wrap"
        >
          {[
            { label: "Products", value: `${productCount}+` },
            { label: "Categories", value: categoryCount },
            { label: "Brands", value: "20+" },
            { label: "Happy customers", value: "1K+" },
          ].map((stat) => (
            <div key={stat.label} className="group cursor-default">
              <p className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
