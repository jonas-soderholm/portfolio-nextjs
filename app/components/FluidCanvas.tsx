"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";

export default function FluidCanvas() {
  const containerRef = useRef(null);

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
    });

    const geometry = new THREE.PlaneGeometry(150, 150);
    const quadGeometry = new THREE.PlaneGeometry(width, height);

    const rippleTexture = new THREE.TextureLoader().load(
      "/shader_effect_circle.png"
    );

    const meshes = [];
    const MAX = 50;

    for (let i = 0; i < MAX; i++) {
      const mat = new THREE.MeshBasicMaterial({
        map: rippleTexture,
        transparent: true,
        opacity: 0.0,
      });
      const mesh = new THREE.Mesh(geometry, mat);
      mesh.visible = false;
      baseScene.add(mesh);
      meshes.push(mesh);
    }

    let current = 0;
    const mouse = new THREE.Vector2();

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX - width / 2;
      mouse.y = height / 2 - e.clientY;

      const mesh = meshes[current];

      mesh.position.set(mouse.x, mouse.y, 0);
      mesh.visible = true;
      mesh.material.opacity = 0.5;
      mesh.scale.set(1.5, 1.5, 1);
      mesh.rotation.z = Math.random() * Math.PI * 2;
      current = (current + 1) % MAX;
    });

    const video = document.createElement("video");
    video.src = "/gradient_background_video.mp4";
    video.loop = true;
    video.muted = true;
    video.autoplay = true;
    video.play();

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBAFormat;

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
        float theta = displacement.r * 2.0 * PI;
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
    });

    const displayMesh = new THREE.Mesh(quadGeometry, displayMaterial);
    displayScene.add(displayMesh);

    const clock = new THREE.Clock();

    function animate() {
      const dt = clock.getDelta();

      // Update ripple meshes
      meshes.forEach((mesh) => {
        if (mesh.visible) {
          mesh.material.opacity *= 0.94;
          mesh.scale.x *= 1.03;
          mesh.scale.y = mesh.scale.x;
          if (mesh.material.opacity < 0.01) mesh.visible = false;
        }
      });

      renderer.setRenderTarget(rt1);
      renderer.clear();
      renderer.render(baseScene, camera);
      renderer.setRenderTarget(null);

      renderer.render(displayScene, camera);

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      video.pause();
      renderer.dispose();
      rt1.dispose();
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
