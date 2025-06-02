// app/components/MouseTracker.ts
"use client";

import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useEffect } from "react";

export const mousePos = new THREE.Vector2();
export const intersectPos = new THREE.Vector2();

export default function MouseTracker() {
  const raycaster = useRef(new THREE.Raycaster());
  const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const tempVec = useRef(new THREE.Vector3());

  const { camera, mouse, viewport } = useThree();

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useFrame(() => {
    raycaster.current.setFromCamera(mousePos, camera);
    raycaster.current.ray.intersectPlane(plane.current, tempVec.current);
    intersectPos.set(
      tempVec.current.x / viewport.width + 0.5,
      tempVec.current.y / viewport.height + 0.5
    );
  });

  return null;
}
