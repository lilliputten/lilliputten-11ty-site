import type { Mesh, PerspectiveCamera, PointLight, Scene, WebGLRenderer } from 'three';

import { conf, TConf, TColor } from './conf';

export interface TVisualAnimationParams {
  setUpdateVisualizationCallback?: (updateVisualizationCallback: () => void) => void;
}

const useInteractve = false;

function startVisualAnimation(conf: TConf, params: TVisualAnimationParams) {
  const { setUpdateVisualizationCallback } = params;

  const THREE = window.THREE;

  let renderer: WebGLRenderer;
  let scene: Scene;
  let camera: PerspectiveCamera;
  // let cameraCtrl;
  let width: number;
  let height: number;
  // let cx: number;
  // let cy: number;
  let wWidth: number;
  let wHeight: number;

  let plane: Mesh;

  // @ts-ignore: Wrong type definitions for simplex noise
  const simplex = new window.SimplexNoise();

  const mouse = new THREE.Vector2();
  const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  // const mousePosition = new THREE.Vector3();
  // const raycaster = new THREE.Raycaster();

  let light1: PointLight;
  let light2: PointLight;
  let light3: PointLight;
  let light4: PointLight;

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

    if (setUpdateVisualizationCallback) {
      setUpdateVisualizationCallback(updateSize);
    }

    if (useInteractve) {
      document.addEventListener('mousemove', mouseHandler);
    }

    initScene();
    animate();
  }

  function mouseHandler(e: MouseEvent) {
    const v = new THREE.Vector3();
    camera.getWorldDirection(v);
    v.normalize();
    mousePlane.normal = v;
    mouse.x = (e.clientX / width) * 2 - 1;
    mouse.y = -(e.clientY / height) * 2 + 1;
    // raycaster.setFromCamera(mouse, camera);
    // raycaster.ray.intersectPlane(mousePlane, mousePosition);
  }

  function numericColor(s: TColor): number {
    if (typeof s === 'string') {
      if (s.startsWith('#')) {
        s = s.replace('#', '0x');
      }
      s = Number(s);
    }
    return s;
  }

  function addLight(color: TColor, lightDistance: number, x: number, y: number, z: number) {
    const light = new THREE.PointLight(numericColor(color), conf.lightIntensity, lightDistance);
    light.position.set(x, y, z);
    scene.add(light);
    return light;
  }

  function initScene() {
    scene = new THREE.Scene();
    initLights();

    const mat = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const geo = new THREE.PlaneBufferGeometry(wWidth, wHeight, wWidth / 2, wHeight / 2);
    plane = new THREE.Mesh(geo, mat);
    scene.add(plane);

    const planeRotationX = -Math.PI / 2 - 0.1; // -Math.PI / 2 - 0.2;
    const planePositionY = 20; // -25;
    const cameraPositionZ = 30; // 60;
    plane.rotation.x = planeRotationX;
    plane.position.y = planePositionY;
    camera.position.z = cameraPositionZ;
  }

  function initLights() {
    const r = 30; // 30;
    const y = 10; // 10;
    const lightDistance = 300; // 500;

    const light = new THREE.AmbientLight(numericColor(conf.ambientColor));
    scene.add(light);

    light1 = addLight(conf.light1Color, lightDistance, 0, y, r); // Set 1
    // light2 = addLight(conf.light2Color, lightDistance, 0, -y, -r);
    light3 = addLight(conf.light3Color, lightDistance, r, y, 0); // Set 1
    // light4 = addLight(conf.light4Color, lightDistance, -r, y, 0);
  }

  function animate() {
    animatePlane();
    animateLights();

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
  }

  function animatePlane() {
    const gArray = plane.geometry.attributes.position.array as number[];
    const time = Date.now() * 0.0002;
    for (let i = 0; i < gArray.length; i += 3) {
      gArray[i + 2] =
        simplex.noise4D(
          gArray[i] / conf.xyCoef,
          gArray[i + 1] / conf.xyCoef,
          time,
          mouse.x + mouse.y,
        ) * conf.zCoef;
    }
    plane.geometry.attributes.position.needsUpdate = true;
  }

  function animateLights() {
    const time = Date.now() * 0.001;
    const d = 50;
    if (light1) {
      light1.position.x = Math.sin(time * 0.1) * d;
      light1.position.z = Math.cos(time * 0.2) * d;
    }
    if (light2) {
      light2.position.x = Math.cos(time * 0.3) * d;
      light2.position.z = Math.sin(time * 0.4) * d;
    }
    if (light3) {
      light3.position.x = Math.sin(time * 0.5) * d;
      light3.position.z = Math.sin(time * 0.6) * d;
    }
    if (light4) {
      light4.position.x = Math.sin(time * 0.7) * d;
      light4.position.z = Math.cos(time * 0.8) * d;
    }
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
      wHeight = wsize[1];
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

export function VisualAnimation(params: TVisualAnimationParams) {
  startVisualAnimation(conf, params);
}
