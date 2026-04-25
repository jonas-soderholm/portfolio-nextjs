"use client";

import React, { useMemo } from "react";
import { useDarkMode } from "./DarkModeContext";

function makeNoiseDataUri() {
  // Tiny inline SVG noise overlay (no external assets, minimal overhead).
  // Note: keep opacity low so it won't look grainy.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">
  <filter id="n">
    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
  </filter>
  <rect width="160" height="160" filter="url(#n)" opacity="0.45"/>
</svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export default function AppBackground() {
  const { darkMode } = useDarkMode();

  const noiseUrl = useMemo(() => makeNoiseDataUri(), []);

  const baseGradient = darkMode
    ? [
        "radial-gradient(1200px circle at 20% 10%, rgba(16,185,129,0.25) 0%, rgba(16,185,129,0) 60%)",
        "radial-gradient(900px circle at 80% 30%, rgba(59,130,246,0.22) 0%, rgba(59,130,246,0) 58%)",
        "radial-gradient(900px circle at 60% 90%, rgba(168,85,247,0.18) 0%, rgba(168,85,247,0) 60%)",
        "linear-gradient(to bottom, #020617 0%, #020617 35%, #030712 100%)",
      ].join(",")
    : [
        "radial-gradient(1200px circle at 20% 10%, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0) 60%)",
        "radial-gradient(900px circle at 80% 30%, rgba(59,130,246,0.16) 0%, rgba(59,130,246,0) 58%)",
        "radial-gradient(900px circle at 60% 90%, rgba(168,85,247,0.14) 0%, rgba(168,85,247,0) 60%)",
        "linear-gradient(to bottom, #f8fafc 0%, #eef2ff 55%, #f8fafc 100%)",
      ].join(",");

  const gridOpacity = darkMode ? 0.11 : 0.07;
  const vignetteOpacity = darkMode ? 0.72 : 0.26;

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-[-10] overflow-hidden"
    >
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage: baseGradient,
          backgroundSize: "cover",
          opacity: 1,
        }}
      />

      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(148,163,184,${gridOpacity}) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,${gridOpacity}) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          mixBlendMode: darkMode ? "overlay" : "multiply",
          opacity: 0.9,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("${noiseUrl}")`,
          opacity: darkMode ? 0.045 : 0.025,
          mixBlendMode: "soft-light",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            darkMode
              ? "radial-gradient(120% 90% at 50% 30%, rgba(2,6,23,0) 0%, rgba(2,6,23,1) 100%)"
              : "radial-gradient(120% 90% at 50% 30%, rgba(255,255,255,0) 0%, rgba(248,250,252,1) 100%)",
          opacity: vignetteOpacity,
        }}
      />
    </div>
  );
}

