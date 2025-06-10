"use client";

import { Canvas } from "@react-three/fiber";
import MonopoEffect from "./MonopoEffect";

export default function CanvasWrapper() {
  return (
    <Canvas gl={{ alpha: true }} camera={{ position: [0, 0, 5], fov: 75 }}>
      <MonopoEffect />
    </Canvas>
  );
}
