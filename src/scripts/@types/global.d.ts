// import * as THREE from 'three';
// import { createNoise4D } from 'simplex-noise';
import SimplexNoise from 'simplex-noise';

declare global {
  // const isDev: boolean;
  interface Window {
    // Used libraries...
    requirejs: Require;
    THREE: typeof THREE;
    SimplexNoise: SimplexNoise;
    SimplexNoise: unknown;
    // createNoise4D: typeof createNoise4D;
    // createNoise4D: any;
    chroma: chroma;

    /** Is it in the development mode? */
    isDev: boolean;
    /** Is it the main page? */
    isIndex?: boolean;
  }
}

export {};
