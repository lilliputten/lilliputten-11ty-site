// @ts-check
/**
 * @module .eleventy.js
 * @changed 2025.03.26, 07:32
 */

const fs = require('fs');

// const isDev = process.env.ELEVENTY_ENV === 'development';

module.exports = function (config) {
  config.addPassthroughCopy({
    'static/images/favicon/favicon.ico': 'favicon.ico',
  });
  config.addPassthroughCopy('src/app-info.json');
  config.addPassthroughCopy('src/manifest.webmanifest');
  config.addPassthroughCopy('src/fonts/*.woff2');
  config.addPassthroughCopy('static');
  // config.addPassthroughCopy('src/assets');
  config.addPassthroughCopy('src/scripts');
  config.addPassthroughCopy('compiled-assets');
  config.addPassthroughCopy('src/**/*.(html|jpg|png|webp|avif|ico|svg|mp4|xml)');
  config.addPassthroughCopy('src/(robots|humans).txt');

  // config.watchIgnores.delete('compiled-assets');
  // // Watch and hot-reload...
  // config.addWatchTarget('compiled-assets', {
  //   resetConfig: true
  // });

  // NOTE: Styles and scripts should be monitored and re-built by `gulp watchAssets`
  config.watchIgnores.add('src/scripts');
  config.watchIgnores.add('src/styles');

  // NOTE: It's better to update static folder manually (be restart the server), as it's too big
  config.watchIgnores.add('static');

  // Collections

  config.addCollection('tagList', (collection) => {
    const set = new Set();
    for (const item of collection.getAllSorted()) {
      if ('tags' in item.data) {
        let tags = item.data.tags;
        if (typeof tags === 'string') {
          tags = [tags];
        }
        for (const tag of tags) {
          set.add(String(tag));
        }
      }
    }
    return [...set].sort();
  });

  config.addCollection('withTags', function (collectionApi) {
    return collectionApi.getAll().filter(function (item) {
      return 'tags' in item.data;
    });
  });

  // Filters

  config.addFilter('readableDate', (d) => {
    const year = d.getFullYear();
    const date = d.getDate();

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const monthIndex = d.getMonth();
    const monthName = months[monthIndex];

    return `${monthName} ${date}, ${year}`;
  });

  function sortByDate(array, dateField = 'date') {
    return [...array].sort((a, b) => a[dateField].getTime() - b[dateField].getTime());
  }

  config.addFilter('getLastArticle', (array) => {
    const articles = sortByDate(array);

    return articles[articles.length - 1];
  });

  config.addFilter('sortByDate', (array) => {
    return sortByDate(array);
  });

  config.addFilter('getRSSArticles', (array) => {
    const articles = sortByDate(array).reverse();

    return articles.slice(0, 20);
  });

  config.addFilter('limit', (array, limit) => {
    return array.slice(0, limit);
  });

  config.addFilter('filterTags', (array) => {
    return array.filter((tag) => tag !== 'article');
  });

  config.addFilter('prepareTalks', (data) => {
    const talks = data.talks;

    talks.forEach((talk) => {
      let lastDate = new Date('1970-01-01');

      talk.versions.forEach((version) => {
        version.dateObj = new Date(version.date);

        if (version.dateObj.getTime() > lastDate.getTime()) {
          lastDate = version.dateObj;
        }

        version.slidesLink = version.slides.startsWith('https:')
          ? version.slides
          : data.pathPrefix + version.slides;
      });

      talk.date = lastDate;
    });

    return sortByDate(talks);
  });

  config.addFilter('preparePodcasts', (data) => {
    const podcasts = data.podcasts;

    podcasts.forEach((podcast) => {
      podcast.dateObj = new Date(podcast.date);
    });

    return sortByDate(podcasts, 'dateObj');
  });

  config.addFilter('prepareRSS', (content) => {
    const reg =
      /(src="\.\/)|(src="[^(https://)])|(src="\/)|(href="\.\/)|(href="[^(https://)])|(href="\/)/g;
    const prefix = 'https://lilliputten.com' + content.url;
    return content.templateContent.replace(reg, (match) => {
      if (match === 'src="/' || match === 'href="/') {
        match = match.slice(0, -1);
        return match + prefix;
      }
      if (match === 'src="./' || match === 'href="./') {
        match = match.slice(0, -2);
        return match + prefix;
      }
      return match.slice(0, -1) + prefix + match.slice(-1);
    });
  });

  config.addFilter('listFilterTags', (array, tags) => {
    if (!Array.isArray(tags)) {
      return array;
    }
    const tagsList = tags.map(String);
    /* console.log('[.eleventy:listFilterTags]', {
     *   tagsList,
     *   array,
     * });
     */
    const result = array.filter((item) => {
      if ('tags' in item.data && Array.isArray(item.data.tags)) {
        const itemTags = /** @type {string[]} */ (item.data.tags.map(String));
        /* const hasAtLeastOneTag = itemTags.find((tag) => {
         *   return tagsList.includes(tag);
         * });
         */
        const hasAllTags = tagsList.reduce((found, tag) => {
          return found && itemTags.includes(tag);
        }, true);
        /* console.log('[.eleventy:listFilterTags]', item.fileSlug, {
         *   hasAllTags,
         *   // hasAtLeastOneTag,
         *   tagsList,
         *   itemTags,
         *   item,
         * });
         */
        return hasAllTags;
      }
    });
    // console.log('[.eleventy:listFilterTags]', tagsList, result);
    return result;
  });

  config.addFilter('filterCollection', (array, tag) => {
    if (!tag) {
      return array;
    }
    return array.filter((item) => 'tags' in item.data && item.data.tags.map(String).includes(tag));
  });

  config.addFilter('isCyrillic', function (input) {
    return /[а-яА-ЯЁё]/.test(input);
  });

  // SOURCE: https://github.com/maxboeck/mxb
  config.addFilter('isOwnWebmention', function (webmention) {
    const urls = [
      'https://lilliputten.com',
      'https://lilliputten.github.io',
      'https://lilliputten.ru',
    ];
    const authorUrl = webmention.author ? webmention.author.url : false;
    // check if a given URL is part of this site.
    return authorUrl && urls.includes(authorUrl);
  });

  config.addFilter('likesAndRepostsByUrl', function (webmentions, url) {
    const mentions = webmentions.filter((entry) => new URL(entry['wm-target']).pathname === url);
    const likes = mentions.filter((entry) =>
      ['like-of', 'bookmark-of'].includes(entry['wm-property']),
    );
    const reposts = mentions.filter((entry) => ['repost-of'].includes(entry['wm-property']));

    return {
      likes: likes.length,
      reposts: reposts.length,
    };
  });

  config.addFilter('webmentionsByUrl', function (webmentions, url) {
    const allowedTypes = ['mention-of', 'in-reply-to'];
    const allowedHTML = {
      allowedTags: ['b', 'i', 'em', 'strong', 'a', 'code'],
      allowedAttributes: {
        a: ['href'],
      },
    };

    // TODO?
    // @ts-ignore
    const orderByDate = (a, b) => new Date(a.published) - new Date(b.published);

    const checkRequiredFields = (entry) => {
      const { author, published, content } = entry;
      return !!author && !!author.name && !!published && !!content;
    };

    const sanitizeHTML = require('sanitize-html');
    const clean = (entry) => {
      const { html, text } = entry.content;

      if (html) {
        // really long html mentions, usually newsletters or compilations
        entry.content.value =
          html.length > 2000
            ? `mentioned this in <a href="${entry['wm-source']}" target="_blank">${entry['wm-source']}</a>`
            : sanitizeHTML(html, allowedHTML);
      } else {
        entry.content.value = sanitizeHTML(text, allowedHTML);
      }

      return entry;
    };

    return webmentions
      .filter((entry) => new URL(entry['wm-target']).pathname === url)
      .filter((entry) => allowedTypes.includes(entry['wm-property']))
      .filter(checkRequiredFields)
      .sort(orderByDate)
      .map(clean);
  });

  config.addFilter('webmentionCountByType', function (webmentions, url, ...types) {
    const isUrlMatch = (entry) => entry['wm-target'] === url;

    return String(
      webmentions.filter(isUrlMatch).filter((entry) => types.includes(entry['wm-property'])).length,
    );
  });

  config.addFilter('dateFromISO', (date) => {
    return new Date(date);
  });

  config.addFilter('isoDate', (date) => {
    return new Date(date).toISOString().substring(0, 10);
  });

  // Transforms

  // if (!isDev) {
  //   config.addTransform('htmlmin', require('./_11ty/transforms/htmlmin'));
  //   config.addTransform('xmlmin', require('./_11ty/transforms/xmlmin'));
  // }
  // config.addTransform('html-prettify', require('./_11ty/transforms/html-prettify'));
  // config.addTransform('xml-prettify', require('./_11ty/transforms/xml-prettify'));

  // BrowserSync config

  config.setBrowserSyncConfig({
    callbacks: {
      ready: function (_err, bs) {
        bs.addMiddleware('*', (_req, res) => {
          const content_404 = fs.readFileSync('build/404.html');
          res.writeHead(404, {
            'Content-Type': 'text/html; charset=UTF-8',
          });
          res.write(content_404);
          res.end();
        });
      },
    },
  });

  // Markdown config

  const markdownIt = require('markdown-it');
  const anchor = require('markdown-it-anchor');
  const mdIterator = require('markdown-it-for-inline');

  const markdownItAttrs = require('markdown-it-attrs');

  // @see https://markdown-it.github.io/markdown-it/
  const mdOptions = {
    html: true,
    linkify: true,
    typographer: true,
    quotes: '«»‘’',
  };

  // @ts-ignore: Wrong typings?
  const md = markdownIt(mdOptions)
    .use(mdIterator, 'url_new_win', 'link_open', (tokens, idx) => {
      const [attrName, href] = tokens[idx].attrs.find((attr) => attr[0] === 'href');
      if (attrName !== 'href' || !href) {
        return;
      }
      const isHttpLink = href.startsWith('https:') || href.startsWith('http:');
      const isMailLink = href.startsWith('mailto:');
      if (isHttpLink || isMailLink) {
        const className = ['external', isMailLink && 'mail'].filter(Boolean).join(' ');
        tokens[idx].attrPush('class', className);
        tokens[idx].attrPush(['class', className]);
        tokens[idx].attrPush([
          'title',
          (isMailLink ? 'Mail address' : 'External link') + ': ' + href,
        ]);
      }
    })
    // @ts-ignore: Wrong typings?
    .use(anchor, {
      // @ts-ignore: Wrong typings?
      permalink: anchor.permalink.linkInsideHeader(
        /* @type {anchor.LinkAfterHeaderPermalinkOptions} */ {
          symbol: '<i class="bi bi-link-45deg"></i>', // '🔗',
        },
      ),
      slugify: (/** @type {string} */ text) => {
        const newText = text
          .replace(/([\W\s\r\n\t ]+)/g, ' ')
          .toLowerCase()
          .trim()
          .replace(/\W/g, '-');
        // console.log('[markdownIt:slugify]', text, '->', newText);
        return newText;
      },
    })
    // @ts-ignore
    .use(markdownItAttrs, {
      // optional, these are default options
      leftDelimiter: '{',
      rightDelimiter: '}',
      allowedAttributes: [], // empty array = all attributes are allowed
    })
    .disable('code');
  config.setLibrary('md', md);

  // Plugins

  // @see https://www.11ty.dev/docs/plugins/navigation
  const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
  config.addPlugin(eleventyNavigationPlugin);

  config.addPlugin(require('eleventy-plugin-reading-time'));

  config.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'), {
    templateFormats: ['njk', 'md'],
    trim: true,
  });

  config.addPlugin(require('@hirusi/eleventy-plugin-safe-external-links'));

  config.addPlugin(require('./_11ty/plugins/img-prepare.js'));

  return {
    dir: {
      input: 'src',
      output: 'build',
      includes: 'includes',
      layouts: 'layouts',
      data: 'data',
    },
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    passthroughFileCopy: true,
    templateFormats: ['md', 'njk'],
  };
};
