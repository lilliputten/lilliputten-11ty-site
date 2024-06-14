define("sw/sw", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    if ('serviceWorker' in navigator) {
        if (window.isDev) {
            navigator.serviceWorker.getRegistrations().then(function (registrations) {
                for (var _i = 0, registrations_1 = registrations; _i < registrations_1.length; _i++) {
                    var registration = registrations_1[_i];
                    registration.unregister();
                }
            });
        }
        else {
            window.addEventListener('load', function () {
                navigator.serviceWorker.register('/sw.js');
            });
        }
    }
});
/**
 * @module test
 * @changed 2024.06.14, 13:12
 */
define("test/test", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.test = void 0;
    function test() {
        console.log('Test', window);
        return 'Test';
    }
    exports.test = test;
});
/**
 * @module visualAnimation
 * @changed 2024.06.14, 13:06
 */
define("visualAnimation/visualAnimation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.visualAnimation = void 0;
    var conf = {
        el: 'visualAnimation',
        fov: 75,
        cameraZ: 75,
        xyCoef: 50,
        zCoef: 10,
        lightIntensity: 0.9,
        ambientColor: 0x000000,
        /*
         * // Default colors (convert from hex color string: s/'#\(.*\)'/0x\1/)
         * light1Color: '#0e09dc',
         * light2Color: '#1cd1e1',
         * light3Color: '#18c02c',
         * light4Color: '#ee3bcf',
         */
        // Set 1
        light1Color: '#4b9e89',
        light2Color: '#5c75a1',
        light3Color: '#1418cd',
        light4Color: '#b9caec',
    };
    function App(conf) {
        var THREE = window.THREE;
        var renderer;
        var scene;
        var camera;
        // let cameraCtrl;
        var width;
        var height;
        // let cx: number;
        // let cy: number;
        var wWidth;
        var wHeight;
        // const TMath = THREE.Math;
        var plane; // : Object3D;
        var simplex = new window.SimplexNoise();
        var mouse = new THREE.Vector2();
        var mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        var mousePosition = new THREE.Vector3();
        var raycaster = new THREE.Raycaster();
        /* // UNUSED: Input controls
         * //  <input type="range" min="1" max="100" class="custom-range" id="noiseInput">
         * const noiseInput = document.getElementById('noiseInput');
         * // <input type="range" min="1" max="100" class="custom-range" id="heightInput">
         * const heightInput = document.getElementById('heightInput');
         */
        var light1;
        var light2;
        var light3;
        var light4;
        init();
        function init() {
            console.log('[visualAnimation:init]');
            var canvas = document.getElementById(conf.el);
            renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                antialias: true,
                alpha: true,
            });
            camera = new THREE.PerspectiveCamera(conf.fov);
            camera.position.z = conf.cameraZ;
            updateSize();
            window.addEventListener('resize', updateSize, false);
            document.addEventListener('mousemove', function (e) {
                var v = new THREE.Vector3();
                camera.getWorldDirection(v);
                v.normalize();
                mousePlane.normal = v;
                mouse.x = (e.clientX / width) * 2 - 1;
                mouse.y = -(e.clientY / height) * 2 + 1;
                // raycaster.setFromCamera(mouse, camera);
                // raycaster.ray.intersectPlane(mousePlane, mousePosition);
            });
            initScene();
            // initGui();
            animate();
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
        function initScene() {
            scene = new THREE.Scene();
            initLights();
            var mat = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
            // let mat = new THREE.MeshPhongMaterial({ color: 0xffffff });
            // let mat = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.5, metalness: 0.8 });
            var geo = new THREE.PlaneBufferGeometry(wWidth, wHeight, wWidth / 2, wHeight / 2);
            plane = new THREE.Mesh(geo, mat);
            scene.add(plane);
            var planeRotationX = -Math.PI / 2 + 0.2; // -Math.PI / 2 - 0.2;
            var planePositionY = 15; // -25;
            var cameraPositionZ = 60; // 60;
            plane.rotation.x = planeRotationX;
            plane.position.y = planePositionY;
            camera.position.z = cameraPositionZ;
            console.log('[visualAnimation:initScene]', {
                planeRotationX: planeRotationX,
                planePositionY: planePositionY,
                cameraPositionZ: cameraPositionZ,
            });
        }
        function numericColor(s) {
            if (typeof s === 'string') {
                if (s.startsWith('#')) {
                    s = s.replace('#', '0x');
                }
                s = Number(s);
            }
            return s;
        }
        function initLights() {
            var r = 30;
            var y = 10;
            var lightDistance = 500;
            var light = new THREE.AmbientLight(numericColor(conf.ambientColor));
            scene.add(light);
            light1 = new THREE.PointLight(numericColor(conf.light1Color), conf.lightIntensity, lightDistance);
            light1.position.set(0, y, r);
            scene.add(light1);
            light2 = new THREE.PointLight(numericColor(conf.light2Color), conf.lightIntensity, lightDistance);
            light2.position.set(0, -y, -r);
            scene.add(light2);
            light3 = new THREE.PointLight(numericColor(conf.light3Color), conf.lightIntensity, lightDistance);
            light3.position.set(r, y, 0);
            scene.add(light3);
            light4 = new THREE.PointLight(numericColor(conf.light4Color), conf.lightIntensity, lightDistance);
            light4.position.set(-r, y, 0);
            scene.add(light4);
        }
        function animate() {
            console.log('[visualAnimation:animate]');
            requestAnimationFrame(animate);
            animatePlane();
            animateLights();
            renderer.render(scene, camera);
        }
        function animatePlane() {
            var gArray = plane.geometry.attributes.position.array;
            var time = Date.now() * 0.0002;
            for (var i = 0; i < gArray.length; i += 3) {
                gArray[i + 2] =
                    simplex.noise4D(gArray[i] / conf.xyCoef, gArray[i + 1] / conf.xyCoef, time, mouse.x + mouse.y) * conf.zCoef;
            }
            plane.geometry.attributes.position.needsUpdate = true;
            // plane.geometry.computeBoundingSphere();
        }
        function animateLights() {
            var time = Date.now() * 0.001;
            var d = 50;
            light1.position.x = Math.sin(time * 0.1) * d;
            light1.position.z = Math.cos(time * 0.2) * d;
            light2.position.x = Math.cos(time * 0.3) * d;
            light2.position.z = Math.sin(time * 0.4) * d;
            light3.position.x = Math.sin(time * 0.5) * d;
            light3.position.z = Math.sin(time * 0.6) * d;
            light4.position.x = Math.sin(time * 0.7) * d;
            light4.position.z = Math.cos(time * 0.8) * d;
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
                var wsize = getRendererSize();
                wWidth = wsize[0];
                wHeight = wsize[1];
            }
        }
        function getRendererSize() {
            var cam = new THREE.PerspectiveCamera(camera.fov, camera.aspect);
            var vFOV = (cam.fov * Math.PI) / 180;
            var height = 2 * Math.tan(vFOV / 2) * Math.abs(conf.cameraZ);
            var width = height * cam.aspect;
            return [width, height];
        }
    }
    function visualAnimation() {
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
    exports.visualAnimation = visualAnimation;
});
/**
 * @desc Main js entry point module (scripts)
 * @module src/assets/scripts.ts
 * @changed 2024.06.12, 02:11
 */
define("scripts", ["require", "exports", "test/test", "visualAnimation/visualAnimation", "sw/sw"], function (require, exports, test_1, visualAnimation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /* // NOTE: These modules are unused. Used only
     * // `src/assets/stripe-init/stripe_payment_intents_support.ts`, via requirejs,
     * // without exposing to global scope.
     *
     * import { startStripeElementsForm } from './stripe-init/stripe_payment_intents_support';
     *
     * console.log('[scripts] Main client code entry point', {
     *   startStripeElementsForm,
     * });
     */
    var testResult = (0, test_1.test)();
    console.log('[scripts] Main client code entry point', {
        test: test_1.test,
        testResult: testResult,
    });
    if (window.isIndex) {
        (0, visualAnimation_1.visualAnimation)();
    }
});

//# sourceMappingURL=scripts.js.map
