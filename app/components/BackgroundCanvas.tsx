"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function AnimatedPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh scale={[10, 10, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          precision mediump float;
          varying vec2 vUv;
          uniform float uTime;

          void main() {
            vec2 uv = vUv;
            float r = 0.5 + 0.5 * sin(uTime + uv.x * 10.0);
            float g = 0.5 + 0.5 * sin(uTime + uv.y * 10.0 + 2.0);
            float b = 0.5 + 0.5 * sin(uTime + uv.x * 10.0 + 4.0);
            gl_FragColor = vec4(r, g, b, 1.0);
          }
        `}
      />
    </mesh>
  );
}

export default function BackgroundCanvas() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <AnimatedPlane />
      </Canvas>
    </div>
  );
}
