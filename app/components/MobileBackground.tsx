"use client";

import { isMobileDevice } from "@/lib/isMobile";
import { useEffect, useState } from "react";

export default function FakeLoadBackground() {
  const [isMobile, setIsMobile] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
    setChecked(true);
  }, []);

  return (
    <>
      {/* If mobile, show the video AFTER client check is done */}
      {checked && isMobile && (
        <div className="fixed inset-0 z-[-10]">
          <video
            src="/gradient.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover inset-0 z-[-20]"
          />
        </div>
      )}
    </>
  );
}
