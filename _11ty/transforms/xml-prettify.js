const prettifyXml = require('prettify-xml');
const options = { indent: 2, newline: '\n' };

function xmlPrettify(content, outputPath) {
  if (outputPath && outputPath.endsWith('.xml')) {
    const result = prettifyXml(content, options);
    // TODO: Remove empty lines?
    return result;
  }
  return content;
}

module.exports = xmlPrettify;
