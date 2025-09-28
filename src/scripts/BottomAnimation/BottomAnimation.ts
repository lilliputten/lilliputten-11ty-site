import type { Mesh, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

import { TConf, conf } from './conf';

function startBottomAnimation(conf: TConf) {
  const THREE = window.THREE;

  let renderer: WebGLRenderer;
  let scene: Scene;
  let camera: PerspectiveCamera;
  let width: number;
  let height: number;
  let wWidth: number;
  // let wHeight: number;

  const tubes: Mesh[] = [];

  const canvas = document.getElementById(conf.el) as HTMLCanvasElement;
  const wrapper = document.getElementById(conf.wrapperEl) as HTMLDivElement;

  init();

  function init() {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    camera = new THREE.PerspectiveCamera(conf.fov);
    camera.position.z = conf.cameraZ;

    updateSize();
    window.addEventListener('resize', updateSize, false);

    initScene();
    animate();
  }

  function initScene() {
    scene = new THREE.Scene();

    const numSegments = 20;
    const material = new THREE.MeshBasicMaterial({ color: conf.ambientColor });

    for (let i = 0; i < numSegments; i++) {
      const tube = new THREE.Mesh(new THREE.BufferGeometry(), material);
      tubes.push(tube);
      scene.add(tube);
    }
  }

  function animate() {
    const time = performance.now() * 0.001;
    const numSegments = tubes.length;
    const pointsPerSegment = 5;

    for (let i = 0; i < numSegments; i++) {
      const segmentStart = i / numSegments;
      const segmentEnd = (i + 1) / numSegments;

      const points = [];
      for (let j = 0; j <= pointsPerSegment; j++) {
        const t = segmentStart + (j / pointsPerSegment) * (segmentEnd - segmentStart);
        const x = t * wWidth - wWidth / 2;
        const y = Math.sin(t * 10 + time) * 0.2 + Math.sin(t * 20 + time * 0.5) * 0.05;
        points.push(new THREE.Vector3(x * 2, y, 0));
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const radius = 0.05 + Math.sin(segmentStart * 8 + time * 2) * 0.02;

      tubes[i].geometry.dispose();
      tubes[i].geometry = new THREE.TubeGeometry(curve, 8, radius, 6, false);
    }

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
  }

  function updateSize() {
    const elWidth = wrapper.clientWidth;
    const elHeight = wrapper.clientHeight;
    width = elWidth;
    height = elHeight; // Math.min(Math.max(elHeight, minHeight), maxHeight);
    if (renderer && camera) {
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      const wsize = getRendererSize();
      wWidth = wsize[0];
      // wHeight = wsize[1];
    }
  }

  function getRendererSize() {
    const cam = new THREE.PerspectiveCamera(camera.fov, camera.aspect);
    const vFOV = (cam.fov * Math.PI) / 180;
    const height = 2 * Math.tan(vFOV / 2) * Math.abs(conf.cameraZ);
    const width = height * cam.aspect;
    return [width, height];
  }
}

export function BottomAnimation() {
  startBottomAnimation(conf);
}
