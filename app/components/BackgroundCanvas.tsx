"use client";

import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useControls } from "leva";
import { useEffect } from "react";

function Plane() {
  const { x, y, z, wireframe } = useControls("Plane", {
    x: { value: -1.34, min: -Math.PI, max: Math.PI, step: 0.01 },
    y: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    z: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    wireframe: false,
  });

  return (
    <mesh rotation={[x, y, z]}>
      <planeGeometry args={[1, 1, 32, 32]} />{" "}
      {/* use more segments for better wireframe */}
      <meshBasicMaterial
        color={new THREE.Color("#ff00ff")}
        wireframe={wireframe}
      />
    </mesh>
  );
}

function ZoomController() {
  const camera = useThree((state) => state.camera);
  const { zoom } = useControls("Camera", {
    zoom: { value: 0.62, min: -5, max: 30, step: 0.001 },
  });

  useEffect(() => {
    camera.position.z = zoom;
  }, [zoom, camera]);

  return null;
}

export default function BackgroundCanvas() {
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
        <Plane />
      </Canvas>
    </div>
  );
}
