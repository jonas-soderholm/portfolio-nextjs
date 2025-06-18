"use client";

import { useEffect, useState } from "react";
import FluidCanvas from "./FluidCanvas";
import { isMobileDevice } from "@/lib/isMobile";

export default function ClientOnlyFluidCanvas() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!isMobileDevice()) {
      setShouldRender(true);
    }
  }, []);

  if (!shouldRender) return null;
  return (
    <>
      <FluidCanvas />
    </>
  );
}
