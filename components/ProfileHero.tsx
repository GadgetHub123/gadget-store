"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import gsap from "gsap";

export default function ProfileHero({
  name,
  email,
  totalOrders,
  totalItems,
  totalSpent,
}: {
  name: string;
  email: string;
  totalOrders: number;
  totalItems: number;
  totalSpent: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = theme === "dark";
    const particleColor = isDark ? "0.7 0.2 200" : "0.55 0.22 15";

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

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    let animId: number;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `oklch(${particleColor} / ${(1 - dist / 120) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

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
    <div className="relative border-b border-border overflow-hidden min-h-[280px] flex items-center">
      {/* Animated canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,_oklch(0.22_0.02_260_/_0.2)_1px,_transparent_1px),linear-gradient(to_bottom,_oklch(0.22_0.02_260_/_0.2)_1px,_transparent_1px)] bg-[size:48px_48px]" />

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_0%_50%,_oklch(0.7_0.2_200_/_0.08)_0%,_transparent_70%)]" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-pulse delay-1000" />

      {/* Content */}
      <div
        ref={contentRef}
        style={{ opacity: 0 }}
        className="relative max-w-4xl mx-auto px-8 py-16 w-full"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">
              {name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-sm text-primary font-medium mb-1">
              Welcome back
            </p>
            <h1 className="text-3xl font-bold">{name}</h1>
            <p className="text-muted-foreground text-sm">{email}</p>
          </div>
        </div>

        <div className="flex items-center gap-8 mt-8 flex-wrap">
          {[
            { label: "Total orders", value: totalOrders },
            { label: "Items purchased", value: totalItems },
            { label: "Total spent", value: totalSpent },
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
