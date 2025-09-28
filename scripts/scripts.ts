/**
 * @desc Main js entry point module (scripts)
 * @module src/assets/scripts.ts
 * @changed 2025.03.28, 11:34
 */

import './sw/sw';

import { VisualAnimation } from './VisualAnimation/VisualAnimation';
import { BottomAnimation } from './BottomAnimation/BottomAnimation';
import { toggleTheme } from './toggleTheme';
import { initNavigation, setUpdateVisualizationCallback } from './navigation';
import { initCarousels } from './carousels';
import { initAOS } from './aos';

import './initDocument';

VisualAnimation({ setUpdateVisualizationCallback });
BottomAnimation();

initNavigation();
initCarousels();
initAOS();

window.toggleTheme = toggleTheme;

// Root module, no exports
export {};
