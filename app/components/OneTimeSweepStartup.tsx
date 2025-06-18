// import * as THREE from "three";

// export function initVerticalRippleSweep(
//   meshes: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[],
//   width: number,
//   height: number,
//   currentRef: { current: number },
//   startDelay: number = 200, // ⏱ when to start
//   stepDelay: number = 5 // speed between steps
// ) {
//   const startX = -width / 2; // left side of screen
//   const endX = width / 2; // right side of screen
//   const centerY = 0;

//   const steps = 60;

//   setTimeout(() => {
//     let i = 0;

//     const interval = setInterval(() => {
//       if (i > steps) {
//         clearInterval(interval);
//         return;
//       }

//       const t = i / steps;
//       const x = startX + t * (endX - startX);

//       const mesh = meshes[currentRef.current];
//       mesh.position.set(x, centerY, 0);
//       mesh.visible = true;
//       mesh.material.opacity = 0.5;
//       mesh.scale.set(1.2, 1.2, 4);
//       mesh.rotation.z = Math.random() * Math.PI * 2;

//       currentRef.current = (currentRef.current + 1) % meshes.length;
//       i++;
//     }, stepDelay);
//   }, startDelay);
// }
