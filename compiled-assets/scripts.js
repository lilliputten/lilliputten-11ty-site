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
 * @module mainPage
 * @changed 2024.06.14, 13:06
 */
define("mainPage/mainPage", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mainPage = void 0;
    // import * as THREE from 'three';
    function mainPage() {
        var canvas = document.getElementById('background');
        console.log('mainPage', {
            canvas: canvas,
            isDev: window.isDev,
            THREE: window.THREE,
            // THREE,
        });
    }
    exports.mainPage = mainPage;
});
/**
 * @desc Main js entry point module (scripts)
 * @module src/assets/scripts.ts
 * @changed 2024.06.12, 02:11
 */
define("scripts", ["require", "exports", "test/test", "mainPage/mainPage", "sw/sw"], function (require, exports, test_1, mainPage_1) {
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
        (0, mainPage_1.mainPage)();
    }
});

//# sourceMappingURL=scripts.js.map
