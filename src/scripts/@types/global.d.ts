// import * as THREE from 'three';

declare global {
  // const isDev: boolean;
  interface Window {
    // Used libraries...
    requirejs: Require;
    THREE: typeof THREE;
    SimplexNoise: SimplexNoise;
    chroma: chroma;

    /** Is it in the development mode? */
    isDev: boolean;
    /** Is it the main page? */
    isIndex?: boolean;
  }
}

export {};
