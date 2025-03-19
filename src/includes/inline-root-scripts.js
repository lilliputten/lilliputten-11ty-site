/* eslint-disable no-var */
// @ts-check
/// <reference path="../scripts/@types/THTMLNode.d.ts" />

(function updateThemeWrapper() {
  function updateTheme() {
    var body = window.document.body;
    var html = /** @type THTMLNode | undefined */ (body.parentNode ? body.parentNode : body);
    var defaultTheme = 'dark'; // Default theme
    var theme =
      (window.localStorage ? window.localStorage.getItem('theme') : defaultTheme) || defaultTheme;
    // NOTE: CAUTION: Double ampersands are escaped here
    if (html) {
      if (html.setAttribute) {
        html.setAttribute('data-theme', theme);
      } else if (html.dataset) {
        html.dataset.theme = theme;
      }
    }
  }

  var body = window.document.body;
  var html = /** @type THTMLNode | undefined */ (body.parentNode);

  if (html) {
    // console.log('[inline-root-scripts] Update theme immediately');
    updateTheme();
  } else {
    // console.log('[inline-root-scripts] Update theme via load event handler');
    window.addEventListener('load', updateTheme);
  }
})();
