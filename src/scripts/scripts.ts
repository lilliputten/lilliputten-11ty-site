/**
 * @desc Main js entry point module (scripts)
 * @module src/assets/scripts.ts
 * @changed 2025.03.26, 07:17
 */

import './sw/sw';

import { VisualAnimation } from './VisualAnimation/VisualAnimation';
import { toggleTheme } from './toggleTheme';
import { initNavigation, setUpdateVisualizationCallback } from './navigation';
import { initCarousels } from './carousels';

import './initDocument';

VisualAnimation({ setUpdateVisualizationCallback });

initNavigation();
initCarousels();

window.toggleTheme = toggleTheme;

// Root module, no exports
export {};
