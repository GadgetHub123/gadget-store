"use client";

import { useEffect, useRef, useState } from "react";

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  className?: string;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const directions = {
    up: "translate-y-6 opacity-0",
    down: "-translate-y-6 opacity-0",
    left: "translate-x-6 opacity-0",
    right: "-translate-x-6 opacity-0",
    scale: "scale-95 opacity-0",
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible
          ? "translate-y-0 translate-x-0 scale-100 opacity-100"
          : directions[direction]
      } ${className}`}
    >
      {children}
    </div>
  );
}
