/**
 * @desc Main js entry point module (scripts)
 * @module src/assets/scripts.ts
 * @changed 2024.06.12, 02:11
 */

import { test } from './test';

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

const testResult = test();
console.log('[scripts] Main client code entry point', {
  test,
  testResult,
});

// Empty root module
export {};
