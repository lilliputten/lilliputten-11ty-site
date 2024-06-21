/* eslint-disable no-var */
// @ts-check
/// <reference path="../scripts/@types/THTMLNode.d.ts" />

// NOTE: Prevent firefox FOUC...
// var FF_FOUC_FI; // eslint-disable-line no-unused-vars

(function updateThemeWrapper() {
  function updateTheme() {
    var body = window.document.body;
    var html = /** @type THTMLNode | undefined */ (body && body.parentNode);
    var theme = (window.localStorage && window.localStorage.getItem('theme')) || 'light';
    if (theme && html) {
      if (html.setAttribute) {
        html.setAttribute('data-theme', theme);
      } else if (html.dataset) {
        html.dataset.theme = theme;
      }
    }
  }

  var body = window.document.body;
  var html = body && body.parentNode;

  if (html) {
    // console.log('[inline-root-scripts] Update theme immediately');
    updateTheme();
  } else {
    // console.log('[inline-root-scripts] Update theme via load event handler');
    window.addEventListener('load', updateTheme);
  }
})();
