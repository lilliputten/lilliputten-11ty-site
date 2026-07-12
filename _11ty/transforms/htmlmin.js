const htmlMinifier = require('html-minifier');

function htmlmin(content, outputPath) {
  if (outputPath && outputPath.endsWith('.html')) {
    const result = htmlMinifier.minify(content, {
      removeComments: true,
      collapseWhitespace: true,
      minifyCSS: true,
      // minifyJS: true,
      minifyJS: {
        ecma: 5,
        mangle: true,
        compress: {
          ecma: 5,
          arrows: false,
          passes: 1,
          unsafe: false,
          booleans: true,
          dead_code: true,
          drop_console: false,
          drop_debugger: false,
          keep_fargs: true,
          keep_fnames: true,
          sequences: false,
          side_effects: false,
          reduce_funcs: false,
          reduce_vars: false,
          inline: false,
        },
        format: {
          ecma: 5,
          comments: false,
          quote_style: 3,
        },
      },
    });
    return result;
  }
  return content;
}

module.exports = htmlmin;
