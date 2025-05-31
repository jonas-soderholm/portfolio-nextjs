"use client";

import { useControls } from "leva";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// Single source of truth stored in refs (no re-render)
const freqRef = { current: 20 };
const ampRef = { current: 0.1 };
const rotRef = { current: [-1.3, 0, 0] as [number, number, number] };

// Hook to sync Leva controls to refs (does not cause animation stutter)
export function useBubbleStore() {
  useControls("Bubble", {
    freq: {
      value: freqRef.current,
      min: 1,
      max: 100,
      onChange: (v) => (freqRef.current = v),
    },
    amp: {
      value: ampRef.current,
      min: 0,
      max: 1,
      onChange: (v) => (ampRef.current = v),
    },
    rotX: {
      value: rotRef.current[0],
      min: -Math.PI,
      max: Math.PI,
      onChange: (v) => (rotRef.current[0] = v),
    },
    rotY: {
      value: rotRef.current[1],
      min: -Math.PI,
      max: Math.PI,
      onChange: (v) => (rotRef.current[1] = v),
    },
    rotZ: {
      value: rotRef.current[2],
      min: -Math.PI,
      max: Math.PI,
      onChange: (v) => (rotRef.current[2] = v),
    },
  });

  return {
    freqRef,
    ampRef,
    rotRef,
  };
}
