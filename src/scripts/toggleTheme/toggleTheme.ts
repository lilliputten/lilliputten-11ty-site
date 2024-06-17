export function toggleTheme() {
  const body = window.document.body;
  const html = body && (body.parentNode as THTMLNode);
  const currTheme = html.dataset
    ? html.dataset.theme
    : html.getAttribute
      ? html.getAttribute('theme')
      : '';
  const theme = currTheme === 'light' ? 'dark' : 'light';
  /* console.log('[themes:toggleTheme]', {
   *   currTheme,
   *   theme,
   *   body,
   * });
   */
  if (theme && html) {
    if (html.setAttribute) {
      html.setAttribute('data-theme', theme);
    } else if (html.dataset) {
      html.dataset.theme = theme;
    }
  }
  if (window.localStorage) {
    window.localStorage.setItem('theme', theme);
  }
}
