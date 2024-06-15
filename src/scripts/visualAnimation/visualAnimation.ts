/**
 * @module visualAnimation
 * @changed 2024.06.14, 13:06
 */

import {
  Mesh,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
  // Camera,
  // Object3D,
} from 'three';

import { TConf, TColor } from './TConf';
import { conf } from './conf';

function App(conf: TConf) {
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

  // const TMath = THREE.Math;

  let plane: Mesh; // : Object3D;

  // const SimplexNoiseClass = window.SimplexNoise as SimplexNoise;
  // @ts-ignore: Wrong type definitions for simplex noise
  const simplex = new window.SimplexNoise();
  // const noise4D = createNoise4D();

  const mouse = new THREE.Vector2();
  const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const mousePosition = new THREE.Vector3();
  const raycaster = new THREE.Raycaster();

  /* // UNUSED: Input controls
   * //  <input type="range" min="1" max="100" class="custom-range" id="noiseInput">
   * const noiseInput = document.getElementById('noiseInput');
   * // <input type="range" min="1" max="100" class="custom-range" id="heightInput">
   * const heightInput = document.getElementById('heightInput');
   */

  let light1: PointLight;
  let light2: PointLight;
  let light3: PointLight;
  let light4: PointLight;

  init();

  function init() {
    console.log('[visualAnimation:init]');
    const canvas = document.getElementById(conf.el) as HTMLCanvasElement;
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    camera = new THREE.PerspectiveCamera(conf.fov);
    camera.position.z = conf.cameraZ;

    updateSize();
    window.addEventListener('resize', updateSize, false);

    // document.addEventListener('mousemove', mouseHandler);

    initScene();
    // initGui();
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

  /* // UNUSED: Input controls
   * function initGui() {
   *   noiseInput.value = 101 - conf.xyCoef;
   *   heightInput.value = (conf.zCoef * 100) / 25;
   *   // Noise Coef input
   *   noiseInput.addEventListener('input', (e) => {
   *     conf.xyCoef = 101 - noiseInput.value;
   *   });
   *   // Height Coef input
   *   heightInput.addEventListener('input', (e) => {
   *     conf.zCoef = (heightInput.value * 25) / 100;
   *   });
   *   // Random colors
   *   document.getElementById('trigger').addEventListener('click', (e) => {
   *     updateLightsColors();
   *   });
   * }
   */

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
    const light = new THREE.PointLight(
      // prettier-ignore
      numericColor(color),
      conf.lightIntensity,
      lightDistance,
    );
    light.position.set(x, y, z);
    scene.add(light);
    return light;
  }

  function initScene() {
    scene = new THREE.Scene();
    initLights();

    const mat = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    // let mat = new THREE.MeshPhongMaterial({ color: 0xffffff });
    // let mat = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.5, metalness: 0.8 });
    const geo = new THREE.PlaneBufferGeometry(wWidth, wHeight, wWidth / 2, wHeight / 2);
    plane = new THREE.Mesh(geo, mat);
    scene.add(plane);

    const planeRotationX = -Math.PI / 2 - 0.2; // -Math.PI / 2 - 0.2;
    const planePositionY = -25; // -25;
    const cameraPositionZ = 60; // 60;
    plane.rotation.x = planeRotationX;
    plane.position.y = planePositionY;
    camera.position.z = cameraPositionZ;
    console.log('[visualAnimation:initScene]', {
      planeRotationX,
      planePositionY,
      cameraPositionZ,
    });
  }

  function initLights() {
    const r = 30; // 30;
    const y = 10; // 10;
    const lightDistance = 800; // 500;

    const light = new THREE.AmbientLight(numericColor(conf.ambientColor));
    scene.add(light);

    /* // UNUSED: Original light adding code...
     * // light1
     * light1 = new THREE.PointLight(
     *   numericColor(conf.light1Color),
     *   conf.lightIntensity,
     *   lightDistance,
     * );
     * light1.position.set(0, y, r);
     * scene.add(light1);
     *
     * // light2
     * light2 = new THREE.PointLight(
     *   numericColor(conf.light2Color),
     *   conf.lightIntensity,
     *   lightDistance,
     * );
     * light2.position.set(0, -y, -r);
     * scene.add(light2);
     *
     * // light3
     * light3 = new THREE.PointLight(
     *   numericColor(conf.light3Color),
     *   conf.lightIntensity,
     *   lightDistance,
     * );
     * light3.position.set(r, y, 0);
     * scene.add(light3);
     *
     * // light4
     * light4 = new THREE.PointLight(
     *   numericColor(conf.light4Color),
     *   conf.lightIntensity,
     *   lightDistance,
     * );
     * light4.position.set(-r, y, 0);
     * scene.add(light4);
     */

    // light1 = addLight(conf.light1Color, lightDistance, 0, y, r);
    // light2 = addLight(conf.light2Color, lightDistance, 0, -y, -r);
    light3 = addLight(conf.light3Color, lightDistance, r, y, 0);
    light4 = addLight(conf.light4Color, lightDistance, -r, y, 0);
  }

  function animate() {
    // console.log('[visualAnimation:animate]');
    requestAnimationFrame(animate);

    animatePlane();
    // animateLights();

    renderer.render(scene, camera);
  }

  function animatePlane() {
    const gArray = plane.geometry.attributes.position.array as number[];
    const time = Date.now() * 0.0002;
    /* console.log('[visualAnimation:animatePlane]', {
     *   gArray,
     *   time,
     * });
     */
    for (let i = 0; i < gArray.length; i += 3) {
      gArray[i + 2] =
        simplex.noise4D(
          // prettier-ignore
          gArray[i] / conf.xyCoef,
          gArray[i + 1] / conf.xyCoef,
          time,
          mouse.x + mouse.y,
        ) * conf.zCoef;
    }
    plane.geometry.attributes.position.needsUpdate = true;
    // plane.geometry.computeBoundingSphere();
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

  /** Create random colors */
  function updateLightsColors() {
    conf.light1Color = window.chroma.random().hex();
    conf.light2Color = window.chroma.random().hex();
    conf.light3Color = window.chroma.random().hex();
    conf.light4Color = window.chroma.random().hex();
    light1.color = new THREE.Color(conf.light1Color);
    light2.color = new THREE.Color(conf.light2Color);
    light3.color = new THREE.Color(conf.light3Color);
    light4.color = new THREE.Color(conf.light4Color);
    // console.log(conf);
  }

  function updateSize() {
    width = window.innerWidth;
    // cx = width / 2;
    height = window.innerHeight;
    // cy = height / 2;
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

export function visualAnimation() {
  /* console.log('[visualAnimation]', {
   *   isDev: window.isDev,
   *   THREE: window.THREE,
   *   SimplexNoise: window.SimplexNoise,
   *   chroma: window.chroma,
   *   App,
   *   conf,
   * });
   */
  App(conf);
}
