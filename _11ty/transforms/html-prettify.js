const prettifyXml = require('html-prettify');

function htmlPrettify(content, outputPath) {
  if (outputPath && outputPath.endsWith('.html')) {
    const result = prettifyXml(content);
    return result;
  }
  return content;
}

module.exports = htmlPrettify;
