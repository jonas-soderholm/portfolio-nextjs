"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useBubbleStore } from "./levaSotre";

export default function BubblePlane() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  const { freqRef, ampRef, rotRef } = useBubbleStore(); // read refs from store

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
      materialRef.current.uniforms.uFreq.value = freqRef.current;
      materialRef.current.uniforms.uAmp.value = ampRef.current;
    }

    if (meshRef.current) {
      meshRef.current.rotation.set(...rotRef.current);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[4, 4, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          uTime: { value: 0 },
          uFreq: { value: freqRef.current },
          uAmp: { value: ampRef.current },
        }}
        vertexShader={`
          uniform float uTime;
          uniform float uFreq;
          uniform float uAmp;
          varying vec2 vUv;

          void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z += sin(uv.x * uFreq + uTime) * sin(uv.y * uFreq + uTime) * uAmp;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          precision mediump float;
          varying vec2 vUv;

          void main() {
            vec3 color = mix(vec3(0.2, 0.4, 0.9), vec3(0.9, 0.2, 0.7), vUv.y);
            gl_FragColor = vec4(color, 1.0);
          }
        `}
        wireframe={false}
      />
    </mesh>
  );
}
