"use client";

import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect } from "react";
import * as THREE from "three";

// Shared refs for the shader
export const zoomRef = { current: 3.36 };
export const freqRef = { current: 0.8 };
export const ampRef = { current: 0.98 };
export const numBubblesRef = { current: 184 };
export const rotRef = new THREE.Euler(-1.18, 0, 0);
export const colorARef = { current: "#346aff" };
export const colorBRef = { current: "#f04cc2" };

export default function BubbleControls() {
  const camera = useThree((state) => state.camera);

  const controls = useControls("Bubbles", {
    zoom: { value: zoomRef.current, min: 1, max: 30, step: 0.01 },
    freq: { value: freqRef.current, min: 0.1, max: 10, step: 0.1 },
    amp: { value: ampRef.current, min: 0, max: 1, step: 0.01 },
    numBubbles: { value: numBubblesRef.current, min: 1, max: 200, step: 1 },
    rotX: { value: rotRef.x, min: -Math.PI, max: Math.PI },
    rotY: { value: rotRef.y, min: -Math.PI, max: Math.PI },
    rotZ: { value: rotRef.z, min: -Math.PI, max: Math.PI },
    colorA: colorARef.current,
    colorB: colorBRef.current,
  });

  useEffect(() => {
    zoomRef.current = controls.zoom;
    freqRef.current = controls.freq;
    ampRef.current = controls.amp;
    numBubblesRef.current = controls.numBubbles;
    rotRef.set(controls.rotX, controls.rotY, controls.rotZ);
    colorARef.current = controls.colorA;
    colorBRef.current = controls.colorB;
    camera.position.z = controls.zoom;
  }, [controls, camera]);

  return null;
}
