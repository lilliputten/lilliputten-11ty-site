export type TColor = number | string;

export interface TConf {
  el: string;
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
