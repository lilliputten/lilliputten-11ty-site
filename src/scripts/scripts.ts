/**
 * @desc Main js entry point module (scripts)
 * @module src/assets/scripts.ts
 * @changed 2024.06.15, 15:50
 */

import './sw/sw';

import { VisualAnimation } from './VisualAnimation/VisualAnimation';

// import { test } from './test/test';

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
// if (window.isIndex) {}
VisualAnimation();

// Empty root module
export {};
