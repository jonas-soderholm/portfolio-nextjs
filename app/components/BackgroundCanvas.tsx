"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useEffect } from "react";

function AnimatedPlane() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const { viewport } = useThree();

  // Handle window resize for resolution uniform
  useEffect(() => {
    const handleResize = () => {
      if (materialRef.current) {
        materialRef.current.uniforms.uResolution.value.set(
          window.innerWidth,
          window.innerHeight
        );
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          uTime: { value: 0 },
          uResolution: {
            value: new THREE.Vector2(window.innerWidth, window.innerHeight),
          },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          precision mediump float;
          uniform float uTime;
          uniform vec2 uResolution;
          varying vec2 vUv;

          #define AA 2

          vec3 shape(vec2 uv, float time) {
            vec2 z = -1.0 + 2.0 * uv;
            z *= 1.5;

            vec3 col = vec3(1.0);
            for (int j = 0; j < 48; j++) {
              float s = float(j) / 16.0;
              float f = 0.2 * (0.5 + 1.0 * fract(sin(s * 20.0)));

              vec2 c = 0.5 * vec2(cos(f * time + 17.0 * s), sin(f * time + 19.0 * s));
              z -= c;
              float zr = length(z);
              float ar = atan(z.y, z.x) + zr * 0.6;
              z = vec2(cos(ar), sin(ar)) / zr;
              z += c;

              col -= 0.5 * exp(-10.0 * dot(z, z)) * (0.25 + 0.4 * sin(5.5 + 1.5 * s + vec3(1.6, 0.8, 0.5)));
            }
            return col;
          }

          void main() {
            float e = 1.0 / uResolution.x;
            vec3 tot = vec3(0.0);

            for (int m = 0; m < AA; m++)
            for (int n = 0; n < AA; n++) {
              vec2 uv = (gl_FragCoord.xy + vec2(float(m), float(n)) / float(AA)) / uResolution.xy;
              vec3 col = shape(uv, uTime * 0.05 + 47.0);
              float f = dot(col, vec3(0.333));
              vec3 nor = normalize(vec3(
                dot(shape(uv + vec2(e, 0.0), uTime * 0.05 + 47.0), vec3(0.333)) - f,
                dot(shape(uv + vec2(0.0, e), uTime * 0.05 + 47.0), vec3(0.333)) - f,
                e
              ));
              col += 0.2 * vec3(1.0, 0.9, 0.5) * dot(nor, vec3(0.8, 0.4, 0.2));
              col += 0.3 * nor.z;
              tot += col;
            }

            tot /= float(AA * AA);
            tot = pow(clamp(tot, 0.0, 1.0), vec3(0.8, 1.1, 1.3));
            vec2 uv = gl_FragCoord.xy / uResolution.xy;
            tot *= 0.4 + 0.6 * pow(16.0 * uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y), 0.1);

            gl_FragColor = vec4(tot, 1.0);
          }
        `}
        transparent={false}
      />
    </mesh>
  );
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
      <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
        <AnimatedPlane />
      </Canvas>
    </div>
  );
}
