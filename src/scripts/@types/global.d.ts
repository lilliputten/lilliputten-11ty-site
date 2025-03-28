import SimplexNoise from 'simplex-noise';

declare global {
  interface Window {
    // Used libraries...
    requirejs: Require;
    THREE: typeof THREE;
    SimplexNoise: SimplexNoise;
    SimplexNoise: unknown;
    chroma: chroma;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    AOS: { init: (o: Record<string, any>) => void };
    $: jQuery;

    /** Is it in the development mode? */
    isDev: boolean;
    /** Is it the main page? */
    isIndex?: boolean;

    // Exported handlers...

    toggleTheme: () => void;
  }
}

export {};
