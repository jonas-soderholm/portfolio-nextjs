"use client";
import * as THREE from "three";
import { useRef, useEffect } from "react";
import { vertexShader, fluidShader, displayShader } from "../shaders";
import { config } from "../utils";

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

    renderer.setRenderTarget(rt1);
    renderer.clear();
    renderer.setRenderTarget(rt2);
    renderer.clear();
    renderer.setRenderTarget(null);

    const fluidUniforms = {
      iResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
      iPreviousFrame: { value: rt1.texture },
      uBrushSize: { value: config.brushSize }, // normalized size
      uBrushStrength: { value: config.brushStrength },
      uFluidDecay: { value: config.fluidDecay },
    };

    const fluidMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: fluidShader,
      uniforms: fluidUniforms,
    });

    const fluidScene = new THREE.Scene();
    fluidScene.add(new THREE.Mesh(plane, fluidMat));

    const displayUniforms = {
      iTime: { value: 0 },
      iResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      iFluid: { value: rt1.texture },
      uDistortionAmount: { value: 0.1 },
    };

    const displayMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: displayShader,
      uniforms: displayUniforms,
    });

    const displayScene = new THREE.Scene();
    displayScene.add(new THREE.Mesh(plane, displayMat));

    const mouse = fluidUniforms.iMouse.value;
    let lastX = 0,
      lastY = 0;
    window.addEventListener("mousemove", (e) => {
      const x = e.clientX;
      const y = window.innerHeight - e.clientY;
      const dx = x - lastX;
      const dy = y - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      mouse.x = x;
      mouse.y = y;
      mouse.w = speed;
      lastX = x;
      lastY = y;
    });

    const clock = new THREE.Clock();

    const render = () => {
      fluidUniforms.uBrushSize.value = config.brushSize;
      fluidUniforms.uBrushStrength.value = config.brushStrength;
      fluidUniforms.uFluidDecay.value = config.fluidDecay;
      displayUniforms.iTime.value = clock.getElapsedTime();

      fluidUniforms.iPreviousFrame.value = rt1.texture;
      renderer.setRenderTarget(rt2);
      renderer.render(fluidScene, camera);

      displayMat.uniforms.iFluid.value = rt2.texture;

      renderer.setRenderTarget(null);
      renderer.clear();
      renderer.render(displayScene, camera);

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
