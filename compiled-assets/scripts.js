var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
/**
 * @module test.ts
 * @changed 2024.06.12, 02:11
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
define("test/index", ["require", "exports", "test/test"], function (require, exports, test_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(test_1, exports);
});
/**
 * @desc Main js entry point module (scripts)
 * @module src/assets/scripts.ts
 * @changed 2024.06.12, 02:11
 */
define("scripts", ["require", "exports", "test/index"], function (require, exports, test_2) {
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
    var testResult = (0, test_2.test)();
    console.log('[scripts] Main client code entry point', {
        test: test_2.test,
        testResult: testResult,
    });
});

//# sourceMappingURL=scripts.js.map
