"use client";
import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useControls } from "leva";
import { vertexShader, fluidShader, displayShader } from "../shaders";

export default function FluidCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { brushSize, brushStrength, fluidDecay, distortionAmount } =
    useControls("Fluid", {
      brushSize: { value: 60.0, min: 1, max: 120, step: 1 },
      brushStrength: { value: 1.2, min: 0.1, max: 5, step: 0.1 },
      fluidDecay: { value: 0.996, min: 0.9, max: 0.9999, step: 0.0001 },
      distortionAmount: { value: 0.08, min: 0.0, max: 0.2, step: 0.001 },
    });

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

    const fluidUniforms = {
      iResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
      iPreviousFrame: { value: rt1.texture },
      uBrushSize: { value: brushSize },
      uBrushStrength: { value: brushStrength },
      uFluidDecay: { value: fluidDecay },
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
      uDistortionAmount: { value: distortionAmount },
    };

    const displayMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: displayShader,
      uniforms: displayUniforms,
    });

    const displayScene = new THREE.Scene();
    displayScene.add(new THREE.Mesh(plane, displayMat));

    const mouse = fluidUniforms.iMouse.value;
    const updateMouse = (e: MouseEvent) => {
      const x = e.clientX;
      const y = window.innerHeight - e.clientY;
      mouse.x = x;
      mouse.y = y;
    };
    let lastX = 0,
      lastY = 0;
    window.addEventListener("mousemove", (e) => {
      const x = e.clientX;
      const y = window.innerHeight - e.clientY;

      // velocity magnitude
      const dx = x - lastX;
      const dy = y - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      mouse.x = x;
      mouse.y = y;
      mouse.w = speed; // store velocity for shader

      lastX = x;
      lastY = y;
    });
    window.addEventListener("mousedown", () => (mouse.z = 1.0));
    window.addEventListener("mouseup", () => (mouse.z = 0.0));

    const clock = new THREE.Clock();

    const render = () => {
      fluidUniforms.uBrushSize.value = brushSize;
      fluidUniforms.uBrushStrength.value = brushStrength;
      fluidUniforms.uFluidDecay.value = fluidDecay;
      displayUniforms.uDistortionAmount.value = distortionAmount;
      displayUniforms.iTime.value = clock.getElapsedTime();

      // 1. simulate fluid → rt2
      fluidUniforms.iPreviousFrame.value = rt1.texture;
      renderer.setRenderTarget(rt2);
      renderer.render(fluidScene, camera);

      // 2. update display shader
      displayMat.uniforms.iFluid.value = rt2.texture;

      // 3. render to screen
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
  }, [brushSize, brushStrength, fluidDecay, distortionAmount]);

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
