"use client";

import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect } from "react";

export default function ZoomController() {
  const camera = useThree((state) => state.camera);

  const { zoom } = useControls("Camera", {
    zoom: { value: 0.62, min: -5, max: 30, step: 0.001 },
  });

  useEffect(() => {
    camera.position.z = zoom;
  }, [zoom, camera]);

  return null;
}
