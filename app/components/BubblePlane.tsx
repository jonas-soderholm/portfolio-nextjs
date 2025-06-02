"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useMemo } from "react";
import {
  ampRef,
  freqRef,
  rotRef,
  colorARef,
  colorBRef,
  numBubblesRef,
} from "./BubbleControls";

export default function BubblePlane() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: ampRef.current },
      uFreq: { value: freqRef.current },
      uColorA: { value: new THREE.Color(colorARef.current) },
      uColorB: { value: new THREE.Color(colorBRef.current) },
      uNumBubbles: { value: numBubblesRef.current },
    }),
    []
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    uniforms.uAmp.value = ampRef.current;
    uniforms.uFreq.value = freqRef.current;
    uniforms.uColorA.value.set(colorARef.current);
    uniforms.uColorB.value.set(colorBRef.current);
    uniforms.uNumBubbles.value = numBubblesRef.current;

    if (meshRef.current) {
      meshRef.current.rotation.set(rotRef.x, rotRef.y, rotRef.z);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[4, 4, 256, 256]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          uniform float uAmp;
          uniform float uFreq;
          uniform float uNumBubbles;
          varying vec2 vUv;

          float hash(float n) {
            return fract(sin(n) * 43758.5453123);
          }

          float bubble(vec2 uv, vec2 center, float speed, float phase) {
            float d = distance(uv, center);
            float falloff = exp(-pow(d * 20.0, 2.0)); // tighter but visible
            float anim = sin(uTime * speed + phase) * 0.5 + 0.5;
            return falloff * anim;
          }

          void main() {
            vUv = uv;
            vec3 pos = position;

            float elevation = 0.0;

            for (int i = 0; i < 100; i++) {
              if (float(i) >= uNumBubbles) break;

              float fi = float(i);
              vec2 center = vec2(hash(fi * 13.1), hash(fi * 17.2));
              float speed = uFreq * (0.5 + hash(fi * 23.3));
              float phase = hash(fi * 29.8) * 6.2831;

              elevation += bubble(uv, center, speed, phase);
            }

            pos.z += elevation * uAmp * 0.3; // ✅ scaled globally

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          precision mediump float;
          varying vec2 vUv;

          uniform vec3 uColorA;
          uniform vec3 uColorB;

          void main() {
            vec3 color = mix(uColorA, uColorB, vUv.y);
            gl_FragColor = vec4(color, 1.0);
          }
        `}
        wireframe={false}
      />
    </mesh>
  );
}
