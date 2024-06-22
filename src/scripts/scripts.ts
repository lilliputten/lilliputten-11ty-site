/**
 * @desc Main js entry point module (scripts)
 * @module src/assets/scripts.ts
 * @changed 2024.06.15, 15:50
 */

import './sw/sw';

import { VisualAnimation } from './VisualAnimation/VisualAnimation';
import { toggleTheme } from './toggleTheme';
import { initNavigation, setUpdateVisualizationCallback } from './navigation';

import './initDocument';

/* // Test
 * import { test } from './test/test';
 * const testResult = test();
 * console.log('[scripts] Main client code entry point', {
 *   test,
 *   testResult,
 *   // 'window.SimplexNoise': window.SimplexNoise,
 *   // 'window.createNoise4D': window.createNoise4D,
 * });
 */

VisualAnimation({ setUpdateVisualizationCallback });

initNavigation();

window.toggleTheme = toggleTheme;

// Root module, no exports
export {};
