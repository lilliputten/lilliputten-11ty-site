export type TColor = number | string;

export interface TConf {
  el: string;
  wrapperEl: string;

  fov: number;
  cameraZ: number;
  ambientColor: TColor;
}

export const conf: TConf = {
  el: 'BottomAnimation',
  wrapperEl: 'BottomAnimationWrapper',

  fov: 50, // 75,
  cameraZ: 1, // 75,

  ambientColor: '#cc2200',
};
