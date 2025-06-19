"use client";

import { isMobileDevice } from "@/lib/isMobile";
import { useEffect, useRef, useState } from "react";

export default function FakeLoadBackground() {
  const [isMobile, setIsMobile] = useState(false);
  const [checked, setChecked] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMobile(isMobileDevice());
    setChecked(true);
  }, []);

  // Keep the fixed element aligned with the *visual* viewport on mobile
  useEffect(() => {
    if (!checked || !isMobile) return;
    const vv = window.visualViewport;
    if (!vv || !containerRef.current) return;

    const el = containerRef.current;

    const sync = () => {
      const w = Math.round(vv.width);
      const h = Math.round(vv.height);
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
      el.style.top = `${vv.offsetTop}px`;
      el.style.left = `${vv.offsetLeft}px`;
    };

    // initial + listeners
    sync();
    vv.addEventListener("resize", sync);
    vv.addEventListener("scroll", sync);
    return () => {
      vv.removeEventListener("resize", sync);
      vv.removeEventListener("scroll", sync);
    };
  }, [checked, isMobile]);

  return (
    <>
      {checked && isMobile && (
        <div
          ref={containerRef}
          className="fixed z-[-10]"
          style={{
            // dynamic viewport units for modern browsers
            height: "100dvh",
            width: "100dvw",
            // fallback if d*vh not supported
            // @ts-ignore
            heightFallback: "100vh",
            left: 0,
            top: 0,
          }}
        >
          <video
            src="/gradient.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )}
    </>
  );
}
