import { TConf } from './TConf';

export const conf: TConf = {
  el: 'VisualAnimation',
  wrapperEl: 'PageVisual',

  fov: 70, // 75,
  cameraZ: 100, // 75,
  xyCoef: 120, // 50,
  zCoef: 15, // 10,
  lightIntensity: 1, // 0.9,

  ambientColor: '#cc2200', // '#00ff00', // 0x000000,

  /*
   * // Default colors (convert from hex color string: s/'#\(.*\)'/0x\1/)
   * light1Color: '#0e09dc',
   * light2Color: '#1cd1e1',
   * light3Color: '#18c02c',
   * light4Color: '#ee3bcf',
   */
  // Set 1
  light1Color: '#4b9e89',
  light2Color: '#5c75a1',
  light3Color: '#1418cd',
  light4Color: '#b9caec',
};
