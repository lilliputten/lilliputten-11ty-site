/**
 * @desc Main js entry point module (scripts)
 * @module src/assets/scripts.ts
 * @changed 2024.06.14, 21:58
 */

import './sw/sw';
// import { test } from './test/test';
import { visualAnimation } from './visualAnimation/visualAnimation';

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

/*
 * const testResult = test();
 * console.log('[scripts] Main client code entry point', {
 *   test,
 *   testResult,
 *   // 'window.SimplexNoise': window.SimplexNoise,
 *   // 'window.createNoise4D': window.createNoise4D,
 * });
 */

// Start animation only on main window?
if (window.isIndex) {
  visualAnimation();
}

// Empty root module
export {};
