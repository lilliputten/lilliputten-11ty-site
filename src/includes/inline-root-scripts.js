/* eslint-disable no-var */
// @ts-check
/// <reference path="../scripts/@types/THTMLNode.d.ts" />

(function updateThemeWrapper() {
  function updateTheme() {
    var body = window.document.body;
    var html = /** @type THTMLNode | undefined */ (body.parentNode ? body.parentNode : body);
    var theme = window.localStorage ? window.localStorage.getItem('theme') : null;
    // NOTE: CAUTION: Double ampersands are escaped here
    if (theme) {
      if (html) {
        if (html.setAttribute) {
          html.setAttribute('data-theme', theme);
        }
        if (html.dataset) {
          html.dataset.theme = theme;
        }
      }
    }
  }

  updateTheme();
  window.addEventListener('load', updateTheme);

  // {% if isdevelopment %}
  setTimeout(updateTheme, 50);
  // {% endif %}
})();
