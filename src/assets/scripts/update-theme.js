// @ts-check

/// <reference path="../../scripts/@types/THTMLNode.d.ts" />

(function updateThemeWrapper() {
  function updateTheme() {
    const body = window.document.body;
    const html = /** @type THTMLNode | undefined */ (body && body.parentNode);
    const theme = (window.localStorage && window.localStorage.getItem('theme')) || 'light';
    if (theme && html) {
      if (html.setAttribute) {
        html.setAttribute('data-theme', theme);
      } else if (html.dataset) {
        html.dataset.theme = theme;
      }
    }
  }

  const body = window.document.body;
  const html = body && body.parentNode;

  if (html) {
    updateTheme();
  } else {
    window.addEventListener('load', updateTheme);
  }
})();
