"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AnimatedWords() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const color =
    !mounted || theme === "dark" ? "oklch(0.7 0.2 200)" : "oklch(0.55 0.22 15)";

  return (
    <>
      <style>{`
        @keyframes spin_words {
          8%  { transform: translateY(-102%); }
          25% { transform: translateY(-100%); }
          33% { transform: translateY(-202%); }
          50% { transform: translateY(-200%); }
          58% { transform: translateY(-302%); }
          75% { transform: translateY(-300%); }
          83% { transform: translateY(-402%); }
          100% { transform: translateY(-400%); }
        }
        .spin-outer {
          overflow: hidden;
          display: block;
          height: 100px;
          margin-top: 0px;
        }
        @media (min-width: 768px) {
          .spin-outer { height: 130px; }
        }
        .spin-word {
          display: block;
          height: 100px;
          line-height: 100px;
          animation: spin_words 5s infinite;
          font-weight: 800;
          white-space: nowrap;
          font-size: 4rem;
        }
        @media (min-width: 768px) {
          .spin-word { height: 130px; line-height: 130px; font-size: 6rem; }
        }
      `}</style>

      <span className="spin-outer">
        {[
          "tech enthusiasts.",
          "tech savvy folks.",
          "early adopters.",
          "power users.",
          "tech enthusiasts.",
        ].map((word, i) => (
          <span key={i} className="spin-word" style={{ color }}>
            {word}
          </span>
        ))}
      </span>
    </>
  );
}
