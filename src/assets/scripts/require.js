// @ts-check

if (typeof window.requirejs !== 'undefined') {
  /* Configure requirejs
   * @see https://requirejs.org/docs/api.html#config
   */
  window.requirejs.config({
    baseUrl: '',
    // @see https://requirejs.org/docs/api.html#config-paths
    paths: {
      // three: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.165.0/three.module',
    },
  });
  /* // DEBUG: Define demo
   * window.define('require/test', ['three', 'test/test'], (three, test) => {
   *   console.log('[require:test]', {
   *     three,
   *     test,
   *   });
   *   debugger;
   * });
   * window.requirejs(['require/test']);
   */
} else {
  // eslint-disable-next-line no-console
  console.error('Not found AMD/RequireJS modules support');
}
