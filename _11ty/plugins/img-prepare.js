// @ts-check
/**
 * @module img-prepare.js
 * @changed 2024.06.19, 21:04
 */

const { JSDOM } = require('jsdom');
const { promisify } = require('util');

const blurryPlaceholder = require('./blurry-placeholder');
const path = require('path');
const exists = promisify(require('fs').exists);

// @ts-ignore: To clarify typings?
const imageSize = promisify(require('image-size'));

/**
 * Sets width and height on each <img>
 */

const SITE_PATH = 'build';

const processImage = async (img, outputPath) => {
  const originalSrc = img.getAttribute('src');
  let fullSrc = originalSrc;
  if (/^(https?:\/\/|\/\/)/i.test(fullSrc)) {
    return;
  }
  if (/^\.+\//.test(fullSrc)) {
    // resolve relative URL
    fullSrc =
      '/' + path.relative(`./${SITE_PATH}/`, path.resolve(path.dirname(outputPath), fullSrc));
    if (path.sep === '\\') {
      fullSrc = fullSrc.replace(/\\/g, '/');
    }
    console.log('[img-prepare:processImage:fullSrc]', fullSrc, originalSrc);
  }
  let dimensions;
  try {
    const imageSrc = path.posix.join(SITE_PATH, fullSrc);
    console.log('[img-prepare:processImage:imageSrc]', imageSrc, originalSrc);
    dimensions = await imageSize(imageSrc);
  } catch (_e) {
    // console.warn(e.message, src);
    return;
  }
  if (!img.getAttribute('width')) {
    img.setAttribute('width', dimensions.width);
    img.setAttribute('height', dimensions.height);
  }
  if (dimensions.type === 'svg') {
    return;
  }
  // eslint-disable-next-line no-console
  console.log('[img-prepare:processImage]', img.tagName, originalSrc); // , dimensions);
  if (img.tagName === 'IMG') {
    img.setAttribute('decoding', 'async');
    img.setAttribute('loading', 'lazy');
    img.setAttribute(
      'style',
      'background-size:cover;' + `background-image:url("${await blurryPlaceholder(fullSrc)}")`,
    );

    const avifSrc = originalSrc.replace(/\.\w+$/, '.avif');
    const avifFullSrc = `${SITE_PATH}` + fullSrc.replace(/\.\w+$/, '.avif');
    if (await exists(avifFullSrc)) {
      const doc = img.ownerDocument;
      const picture = doc.createElement('picture');
      const avif = doc.createElement('source');
      avif.setAttribute('srcset', avifSrc);
      avif.setAttribute('type', 'image/avif');
      picture.appendChild(avif);
      img.parentElement.replaceChild(picture, img);
      picture.appendChild(img);
    }
  }
};

const pause = (/** @type number */ delayMs = 1000) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delayMs);
  });
};

const prepareImages = async (rawContent, outputPath) => {
  let content = rawContent;

  if (outputPath && outputPath.endsWith('.html')) {
    const dom = new JSDOM(content);
    const images = [...dom.window.document.querySelectorAll('.Article img')];

    if (images.length > 0) {
      // NOTE: Waiting for image generation...
      await pause();
      await Promise.all(images.map((i) => processImage(i, outputPath)));
      content = dom.serialize();
    }
  }

  return content;
};

module.exports = {
  initArguments: {},
  configFunction: (eleventyConfig) => {
    eleventyConfig.addTransform('img-prepare', prepareImages);
  },
};
