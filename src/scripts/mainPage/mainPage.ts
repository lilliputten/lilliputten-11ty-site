/**
 * @module mainPage
 * @changed 2024.06.14, 13:06
 */

export function mainPage() {
  const canvas = document.getElementById('background');
  console.log('mainPage', {
    canvas,
    isDev: window.isDev,
    THREE: window.THREE,
  });
}
