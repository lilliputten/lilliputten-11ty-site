const prettifyXml = require('prettify-xml');
const xmlOptions = { indent: 2, newline: '\n' };

function xmlPrettify(content, outputPath) {
  if (outputPath && outputPath.endsWith('.xml')) {
    const result = prettifyXml(content, xmlOptions);
    return result;
  }
  return content;
}

module.exports = xmlPrettify;
