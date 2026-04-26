"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <>
      <style>{`
        .cosmic-toggle {
          position: relative;
          width: 44px;
          height: 22px;
          transform-style: preserve-3d;
          perspective: 500px;
        }
        .toggle { opacity: 0; width: 0; height: 0; }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(45deg, #1a1a2e, #16213e);
          border-radius: 35px;
          transition: 0.5s;
          transform-style: preserve-3d;
          box-shadow: 0 0 20px rgba(0,0,0,0.5), inset 0 0 15px rgba(255,255,255,0.05);
          overflow: hidden;
        }
        .cosmos {
          position: absolute;
          inset: 0;
          background: radial-gradient(1px 1px at 10% 10%, #fff 100%, transparent),
            radial-gradient(1px 1px at 30% 30%, #fff 100%, transparent),
            radial-gradient(2px 2px at 50% 50%, #fff 100%, transparent),
            radial-gradient(1px 1px at 70% 70%, #fff 100%, transparent),
            radial-gradient(1px 1px at 90% 90%, #fff 100%, transparent);
          background-size: 200% 200%;
          opacity: 0.15;
          transition: 0.5s;
        }
        .toggle-orb {
          position: absolute;
          height: 18px;
          width: 18px;
          left: 2px;
          bottom: 2px;
          background: linear-gradient(145deg, #ff6b6b, #4ecdc4);
          border-radius: 50%;
          transition: 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          transform-style: preserve-3d;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }
        .inner-orb {
          position: absolute;
          inset: 3px;
          border-radius: 50%;
          background: linear-gradient(145deg, #fff, #e6e6e6);
          transition: 0.5s;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
        }
        .ring {
          position: absolute;
          inset: -2px;
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          transition: 0.5s;
        }
        .toggle:checked + .slider {
          background: linear-gradient(45deg, #e8e8f0, #d0d0e8);
        }
        .toggle:checked + .slider .toggle-orb {
          transform: translateX(22px) rotate(360deg);
          background: linear-gradient(145deg, #ffd700, #ffb300);
        }
        .toggle:checked + .slider .inner-orb {
          background: linear-gradient(145deg, #ffe066, #ffd700);
        }
        .toggle:checked + .slider .cosmos {
          opacity: 0.05;
        }
        .toggle:checked + .slider .ring {
          border-color: rgba(255, 200, 0, 0.4);
          animation: ringPulse 2s infinite;
        }
        .energy-line {
          position: absolute;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(78,205,196,0.5), transparent);
          opacity: 0;
          transition: 0.5s;
        }
        .energy-line:nth-child(1) { top: 25%; }
        .energy-line:nth-child(2) { top: 50%; }
        .energy-line:nth-child(3) { top: 75%; }
        .toggle:checked + .slider .energy-line {
          opacity: 0;
        }
        .slider:hover .toggle-orb {
          filter: brightness(1.2);
          box-shadow: 0 0 15px rgba(78,205,196,0.5);
        }
        .slider:hover .cosmos {
          opacity: 0.25;
        }
        .cosmic-toggle:hover .slider {
          transform: rotateX(5deg) rotateY(5deg);
        }
        @keyframes ringPulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.15); opacity: 0.7; }
        }
      `}</style>

      <label className="cosmic-toggle">
        <input
          type="checkbox"
          className="toggle"
          checked={!isDark}
          onChange={() => setTheme(isDark ? "light" : "dark")}
        />
        <span className="slider">
          <span className="cosmos" />
          <span className="energy-line" />
          <span className="energy-line" />
          <span className="energy-line" />
          <span className="toggle-orb">
            <span className="ring" />
            <span className="inner-orb">{isDark ? "🌙" : "☀️"}</span>
          </span>
        </span>
      </label>
    </>
  );
}
