const beautify = require('beautify');
const options = { format: 'html' };

function htmlPrettify(content, outputPath) {
  if (outputPath && outputPath.endsWith('.html')) {
    // const result = prettifyHtml(content);
    // const result = prettifyXml(content, xmlOptions);
    const result = beautify(content, options);
    // TODO: Remove empty lines?
    return result;
  }
  return content;
}

module.exports = htmlPrettify;
