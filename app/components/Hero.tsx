// app/components/Hero.tsx
"use client";

import React from "react";
import { useDarkMode } from "./DarkModeContext";

function Hero() {
  const { darkMode } = useDarkMode();

  return (
    <section className="relative flex items-center justify-center mb-20 px-4 md:px-8 lg:px-12 text-foreground">
      <div className="relative z-10 flex w-full max-w-6xl flex-col gap-10 md:flex-row md:items-center">
        {/* Left: main intro */}
        <div className="flex-1 space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs md:text-sm font-medium tracking-wide backdrop-blur text-card-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            Open to freelance
          </p>

          <div className="space-y-3">
            <h1 className="header-font text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95]">
              <span className="block text-sm md:text-base font-normal tracking-[0.25em] uppercase text-emerald-300/90">
                Jonas • Portfolio 2026
              </span>
              <span className="mt-2 block">Full Stack</span>
              <span className="block bg-gradient-to-r from-emerald-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">
                Web & XR Developer
              </span>
            </h1>

            <p className="max-w-xl text-sm sm:text-base md:text-lg text-muted-foreground">
              I design and build fast, production-ready web and immersive
              experiences, from idea to deployment. Focused on clean UX,
              maintainable code, and workflows that scale with real teams.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-2.5 text-sm md:text-base font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-300"
            >
              View selected work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-border bg-card/80 px-6 py-2.5 text-sm md:text-base font-medium text-card-foreground backdrop-blur transition hover:-translate-y-0.5 hover:border-emerald-300/60"
            >
              Let’s build something
            </a>
          </div>

          {/* quick meta row */}
          <div className="mt-4 flex flex-wrap gap-4 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-7 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400" />
              <span>Based in Stockholm • Remote friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-7 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400" />
              <span>Typescript, Next.js, Three/Fiber, Node</span>
            </div>
          </div>
        </div>

        {/* Right: compact “profile card” showing credibility */}
        <aside className="flex-1 md:max-w-sm">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card/80 p-5 backdrop-blur">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.11)_0,_transparent_60%)]" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Currently crafting
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    Product-grade web & XR experiences
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs sm:text-sm">
                <div className="rounded-xl border border-border bg-card/60 p-3">
                  <p className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                    Experience
                  </p>
                  <p className="mt-1 text-lg font-semibold">4+ yrs</p>
                </div>
                <div className="rounded-xl border border-border bg-card/60 p-3">
                  <p className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                    Focus
                  </p>
                  <p className="mt-1 text-sm font-semibold">Full Stack • XR</p>
                </div>
                <div className="rounded-xl border border-border bg-card/60 p-3">
                  <p className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                    Strength
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    Full stack, UX, Ai
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  "Next.js",
                  "React Three Fiber",
                  "TypeScript",
                  "Node.js",
                  "Tailwind",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-card/60 px-3 py-1 text-[0.7rem] uppercase tracking-wide text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Hero;
