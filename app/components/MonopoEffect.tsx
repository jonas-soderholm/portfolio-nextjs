"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { ShaderMaterial } from "three";
import { enFragmentShader, enVertexShader } from "../shaders/enShaders";

export default function MonopoEffect() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { size, viewport } = useThree();
  const texture = useTexture("/gradient_background_1.png"); // Use image or video texture

  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useFrame(({ mouse: m }) => {
    const mat = meshRef.current.material as ShaderMaterial;
    mat.uniforms.u_mouse.value = new THREE.Vector2(
      m.x * 0.5 + 0.5,
      m.y * -0.5 + 0.5
    );
    mat.uniforms.u_aspect.value = size.width / size.height;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        vertexShader={enVertexShader}
        fragmentShader={enFragmentShader}
        uniforms={{
          u_texture: { value: texture },
          u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
          u_aspect: { value: size.width / size.height },
          u_enable: { value: true },
        }}
        transparent
      />
    </mesh>
  );
}
