"use client";

import { Canvas } from "@react-three/fiber";
import BubblePlane from "./BubblePlane";
import ZoomController from "./ZoomController";
import { useBubbleStore } from "./levaSotre";

export default function BackgroundCanvas() {
  useBubbleStore(); // enable Leva controls

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        width: "100vw",
        height: "100vh",
      }}
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ZoomController />
        <BubblePlane />
      </Canvas>
    </div>
  );
}
