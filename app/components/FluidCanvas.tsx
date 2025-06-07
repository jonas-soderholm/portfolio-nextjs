"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useDarkMode } from "./DarkModeContext";

export default function FluidCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.style.transition = "opacity 250ms ease";
    containerRef.current.style.opacity = darkMode ? "0.6" : "1";
  }, [darkMode]);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 1);
    containerRef.current?.appendChild(renderer.domElement);

    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      0,
      1
    );

    const baseScene = new THREE.Scene();
    const displayScene = new THREE.Scene();

    const rt1 = new THREE.WebGLRenderTarget(width, height, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      depthBuffer: false,
      stencilBuffer: false,
    });

    const geometry = new THREE.PlaneGeometry(150, 150);
    const quadGeometry = new THREE.PlaneGeometry(width, height);

    const rippleTexture = new THREE.TextureLoader().load(
      "/shader_effect_circle.png"
    );

    const meshes: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[] =
      [];
    const MAX = 100;

    for (let i = 0; i < MAX; i++) {
      const mat = new THREE.MeshBasicMaterial({
        map: rippleTexture,
        transparent: true,
        opacity: 0.0,
        depthTest: false,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geometry, mat);
      mesh.visible = false;
      baseScene.add(mesh);
      meshes.push(mesh);
    }

    let current = 0;
    const mouse = new THREE.Vector2();

    let prevMouse = new THREE.Vector2();
    const speedThreshold = 3; // higher = must move faster

    window.addEventListener("mousemove", (e) => {
      const newX = e.clientX - width / 2;
      const newY = height / 2 - e.clientY;

      // distance moved since last frame
      const dx = newX - prevMouse.x;
      const dy = newY - prevMouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      prevMouse.set(newX, newY);

      if (dist < speedThreshold) return; // skip if not moving fast enough

      const mesh = meshes[current];
      mesh.position.set(newX, newY, 0);
      mesh.visible = true;
      mesh.material.opacity = 0.5;
      mesh.scale.set(1.2, 1.2, 1);
      mesh.rotation.z = Math.random() * Math.PI * 2;
      current = (current + 1) % MAX;
    });

    // ---------- VIDEO: reliable autoplay + fallbacks ----------
    const video = document.createElement("video");
    // set attributes BEFORE src for some browsers
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true; // iOS
    video.preload = "auto";
    video.src = "/gradient_background_video.mp4"; // must be in /public

    // try to play when able
    const tryPlay = () => {
      video.play().catch(() => {
        // will try again on user interaction
      });
    };

    // once enough data → attempt play
    const onCanPlay = () => {
      tryPlay();
      video.removeEventListener("canplay", onCanPlay);
    };
    video.addEventListener("canplay", onCanPlay);

    // user-gesture fallback (Mobile/Safari/strict policies)
    const resume = () => {
      tryPlay();
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
    };
    window.addEventListener("pointerdown", resume, { once: true });
    window.addEventListener("keydown", resume, { once: true });

    // helpful error log (optional)
    video.onerror = () => {
      // eslint-disable-next-line no-console
      console.warn("Video error:", video.error);
    };

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBAFormat;
    // color fidelity
    (videoTexture as any).colorSpace = THREE.SRGBColorSpace;

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const displayShader = `
      uniform sampler2D uDisplacement;
      uniform sampler2D uTexture;
      uniform float uDistortionAmount;
      varying vec2 vUv;
      const float PI = 3.141592653589793;
      void main() {
        vec4 displacement = texture2D(uDisplacement, vUv);
        float theta = displacement.r * 0.5 * PI;
        vec2 dir = vec2(sin(theta), cos(theta));
        vec2 uv = vUv + dir * displacement.r * uDistortionAmount;
        vec4 color = texture2D(uTexture, uv);
        gl_FragColor = color;
      }
    `;

    const displayMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: displayShader,
      uniforms: {
        uDisplacement: { value: rt1.texture },
        uTexture: { value: videoTexture },
        uDistortionAmount: { value: 0.25 },
      },
      depthTest: false,
      depthWrite: false,
    });

    const displayMesh = new THREE.Mesh(quadGeometry, displayMaterial);
    displayScene.add(displayMesh);

    const clock = new THREE.Clock();

    function animate() {
      clock.getDelta();

      // Update ripple meshes
      for (let i = 0; i < MAX; i++) {
        const mesh = meshes[i];
        if (!mesh.visible) continue;
        mesh.material.opacity *= 0.945;
        mesh.scale.x *= 1.03;
        mesh.scale.y = mesh.scale.x;
        if (mesh.material.opacity < 0.01) mesh.visible = false;
      }

      // write ripples into displacement target
      renderer.setRenderTarget(rt1);
      renderer.setClearColor(0x000000, 0); // transparent RT
      renderer.clear(true, true, true);
      renderer.render(baseScene, camera);

      // final pass
      renderer.setRenderTarget(null);
      renderer.render(displayScene, camera);

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      video.pause();
      renderer.dispose();
      rt1.dispose();
      quadGeometry.dispose();
      geometry.dispose();
      displayMaterial.dispose();
      meshes.forEach((m) => m.geometry.dispose());
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
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
