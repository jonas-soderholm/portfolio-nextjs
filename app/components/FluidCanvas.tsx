"use client";
import * as THREE from "three";
import { useRef, useEffect } from "react";
import { vertexShader, fluidShader, displayShader } from "../shaders";
import { hexToRgb, config } from "../utils";

export default function FluidCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 1);
    containerRef.current?.appendChild(renderer.domElement);

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const plane = new THREE.PlaneGeometry(2, 2);

    const getTarget = () =>
      new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
        depthBuffer: false,
        stencilBuffer: false,
      });

    let rt1 = getTarget();
    let rt2 = getTarget();

    const uniforms = {
      iTime: { value: 0 },
      iResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
      iPreviousFrame: { value: rt1.texture },
      uBrushSize: { value: config.brushSize },
      uBrushStrength: { value: config.brushStrength },
      uFluidDecay: { value: config.fluidDecay },
    };

    const fluidMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: fluidShader,
      uniforms,
    });

    const displayMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: displayShader,
      uniforms,
    });

    const fluidScene = new THREE.Scene();
    const fluidMesh = new THREE.Mesh(plane, fluidMat);
    fluidScene.add(fluidMesh);

    const displayScene = new THREE.Scene();
    const displayMesh = new THREE.Mesh(plane, displayMat);
    displayScene.add(displayMesh);

    // Mouse
    const mouse = uniforms.iMouse.value;
    const updateMouse = (e: MouseEvent) => {
      const x = e.clientX;
      const y = window.innerHeight - e.clientY;
      mouse.x = x;
      mouse.y = y;
    };
    window.addEventListener("mousemove", updateMouse);
    window.addEventListener("mousedown", () => {
      mouse.z = 1.0;
    });
    window.addEventListener("mouseup", () => {
      mouse.z = 0.0;
    });

    const clock = new THREE.Clock();

    const render = () => {
      uniforms.iTime.value = clock.getElapsedTime();

      // 1. fluid sim → rt2
      uniforms.iPreviousFrame.value = rt1.texture;
      renderer.setRenderTarget(rt2);
      renderer.render(fluidScene, camera);

      // 2. display → screen
      uniforms.iPreviousFrame.value = rt2.texture;
      renderer.setRenderTarget(null);
      renderer.clear();
      renderer.render(displayScene, camera);

      // swap
      [rt1, rt2] = [rt2, rt1];

      requestAnimationFrame(render);
    };

    render();

    return () => {
      renderer.dispose();
      rt1.dispose();
      rt2.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
}
