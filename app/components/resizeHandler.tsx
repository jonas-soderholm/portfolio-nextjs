import * as THREE from "three";

export function createResizeHandler(
  renderer: THREE.WebGLRenderer,
  camera: THREE.OrthographicCamera,
  displayMesh: THREE.Mesh
) {
  function onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);

    camera.left = width / -2;
    camera.right = width / 2;
    camera.top = height / 2;
    camera.bottom = height / -2;
    camera.updateProjectionMatrix();

    // "cover" scaling, like CSS background-size: cover
    const videoAspect = 16 / 9; // adjust to your video file
    const screenAspect = width / height;

    let planeWidth: number;
    let planeHeight: number;

    if (screenAspect > videoAspect) {
      // window is wider → match width, overflow height
      planeWidth = width;
      planeHeight = width / videoAspect;
    } else {
      // window is taller → match height, overflow width
      planeHeight = height;
      planeWidth = height * videoAspect;
    }

    displayMesh.scale.set(planeWidth, planeHeight, 1);
  }

  window.addEventListener("resize", onResize);
  onResize(); // run once on mount

  return () => {
    window.removeEventListener("resize", onResize);
  };
}
