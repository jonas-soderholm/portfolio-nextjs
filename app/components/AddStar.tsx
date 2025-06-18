// app/components/AddStar.tsx
"use client";

import React, { useEffect, useState } from "react";

export interface AddStarProps {
  initialSize: number;
  positionX: string;
  positionY: string;
  scaleUpTime: number;
  scaleDownTime: number;
  remainVisible: boolean;
  id: string;
}

export default function AddStar({
  initialSize,
  positionX,
  positionY,
  scaleUpTime,
  scaleDownTime,
  remainVisible,
  id,
}: AddStarProps) {
  const [size, setSize] = useState(0);

  useEffect(() => {
    const scaleUpTimeout = setTimeout(() => {
      setSize(initialSize);
    }, scaleUpTime);

    const scaleDownTimeout = setTimeout(() => {
      if (!remainVisible) {
        setSize(0);
      }
    }, scaleDownTime);

    return () => {
      clearTimeout(scaleUpTimeout);
      clearTimeout(scaleDownTimeout);
    };
  }, [initialSize, scaleUpTime, scaleDownTime, remainVisible]);

  return (
    <div
      id={id}
      className="stars absolute"
      style={{
        top: positionY,
        left: positionX,
        width: `${size}vw`,
        height: `${size}vw`,
        transition: "width 1s, height 2s",
      }}
    >
      <img src="./ai-star.svg" alt="" />
    </div>
  );
}
