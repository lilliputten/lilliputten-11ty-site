export type TColor = number | string;

export interface TConf {
  el: string;
  wrapperEl: string;

  fov: number;
  cameraZ: number;
  xyCoef: number;
  zCoef: number;
  lightIntensity: number;
  ambientColor: TColor;

  // Basic colors
  light1Color: TColor;
  light2Color: TColor;
  light3Color: TColor;
  light4Color: TColor;
}

export const conf: TConf = {
  el: 'VisualAnimation',
  wrapperEl: 'PageVisual',

  fov: 70, // 75,
  cameraZ: 100, // 75,
  xyCoef: 250, // 50,
  zCoef: 15, // 10,
  lightIntensity: 1, // 0.9,

  ambientColor: '#cc2200',

  // Set 1
  light1Color: '#4b9e89',
  light2Color: '#5c75a1',
  light3Color: '#1418cd',
  light4Color: '#b9caec',
};
