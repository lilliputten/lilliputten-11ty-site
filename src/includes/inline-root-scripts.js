(function updateThemeWrapper() {
  function updateTheme() {
    var body = window.document.body;
    var html = (body.parentNode ? body.parentNode : body);
    var theme = window.localStorage ? window.localStorage.getItem('theme') : null;
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
  window.addEventListener('load', updateTheme);
  updateTheme();
})();
