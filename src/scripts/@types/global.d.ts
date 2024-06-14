// import { Require } from 'requirejs';
import * as THREE from 'three';

declare global {
  /** Is it in the development mode? */
  const isDev: boolean;
  interface Window {
    requirejs: Require;
    isDev: boolean;
    /** Is it the main page? */
    isIndex?: boolean;
    THREE: typeof THREE;
  }
}

export {};
