---
layout: article.njk
title: Gulp LQIP small image placeholder generator plugin
hasThumb: true
eleventyNavigation:
  key: gulp-lqip-plugin
  title: Gulp LQIP small image placeholder generator plugin
  parent: articles
date: 2025-05-04
showNavigationBreadcrumbs: true
tags:
  - articles
  - '2025'
  - gulp
  - npm
  - plugin
  - lqip
  - ckeditor
  - image
  - background
  - html
---

<!--
@changed 2025.05.04, 20:34
-->

{% import "macros.njk" as macros with context %}

[LQIP](https://cloudinary.com/blog/low_quality_image_placeholders_lqip_explained) stands for "Low-quality image placeholders" technique to provide already prepared small resource-effective image previews.

The plugin combines [Johann Servoire's gulp-image-lqip](https://github.com/Johann-S/gulp-image-lqip) plugin and [Nikita Dubko's 11ty site solution to embed previews](https://github.com/MeFoDy/mefody.dev), but:

- It doesn't require JS on the client side (it rather embeds a downscaled image into an image's style `background` (as an svg object) and sets `loading=lazy` attribute to allow the browser to control the images loading).
- It allows you to more finely control the generation (like scale factor, source and target attribues, valid extensions etc).
- It returns relevant vinyl streams and allow further processing of the stream (compared to the `gulp-image-lqip` plugin). And it means that now you must to handle the resulting streams (at least to write them into the destination).
- It automatically sets the `width`, `height` (collected from the original image) and `loading=lazy` attributes for the processed images.
- It doesn't try to prettify the results. So, you should care about that by yourself (take a look at the [gulp-html-prettify](https://www.npmjs.com/package/gulp-html-prettify) plugin).

I used it my [TubeCaster Telegram Bot landing](/projects/2025/tubecaster-telegram-bot/), get the real-life example there.

See the [npm repository](https://www.npmjs.com/package/gulp-embed-lqip-as-background).

## Basic usage

```javascript
gulp.task('lqip', () => gulp
  .src(['*.html'])
  .pipe(
    gulpEmbedLqipAsBackground({
      rootPath: __dirname,
      lazyLoadClass: 'lazy-load',
      // srcAttr: 'src',
      // dataSrcAttr: '',
      // scaleFactorAttr: 'data-scale-factor',
      // scaleFactor: 10,
      // validFileExtensions: ['.html', '.htm'],
    }),
  )
  .pipe(gulp.dest('.')));

```

All the commented parameters are optional. See [API reference](https://github.com/lilliputten/gulp-embed-lqip-as-background#api)

See the example: [source code](https://github.com/lilliputten/gulp-embed-lqip-as-background/blob/HEAD/test/test.html) or [demo html](https://html-preview.github.io/?url=https://github.com/lilliputten/gulp-embed-lqip-as-background/blob/HEAD/test/test.html).

For example, the above command will process the images with `lazy-load` class, like this:

```html
<img
  src="img/csb.jpg"
  class="img-fluid lazy-load figure"
  data-scale-factor="5"
/>
```

-- to the code like this:

```html
<img
  src="img/csb.jpg"
  class="img-fluid lazy-load figure"
  data-scale-factor="5"
  loading="lazy"
  style="background-size: cover; background-image: url(&quot;data:image/svg+xml;charset=utf-8,%3Csvg
    xmlns='http%3A//www.w3.org/2000/svg' xmlns%3Axlink='http%3A//www.w3.org/1999/xlink'
    viewBox='0 0 600 599'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur
    stdDeviation='.5'%3E%3C/feGaussianBlur%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete'
    tableValues='1 1'%3E%3C/feFuncA%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Cimage
    filter='url(%23b)' preserveAspectRatio='none' height='100%25' width='100%25'
    xlink%3Ahref='data%3Aimage/jpeg;base64,/9j/---A LONG BASE64 ENCOED STRING IS COMING HERE---//2Q=='%3E%3C/image%3E%3C/svg%3E&quot;);"
  width="600"
  height="599"
/>
```

Notice the added `loading="lazy"` and `width` and `height` attributes, and the svg object with an embedded preview in the background css style.

## Old (data-src, with js & css) approach

In case if you specify the `dataSrcAttr` options parameter (eg, with `data-src`), then it'll behave in original way: by storing the downscaled preview in the specified attribute instead of `style:background` object.

But this approach required extra js code & styles, see those in the example: [source code](https://html-preview.github.io/?url=https://github.com/lilliputten/gulp-embed-lqip-as-background/blob/HEAD/test/demo-data-src-test.html) or [demo html](https://html-preview.github.io/?url=https://github.com/lilliputten/gulp-embed-lqip-as-background/blob/HEAD/test/demo-data-src-test.html).

```javascript
gulp.task('lqip', () => gulp
  .src(['*.html'])
  .pipe(
    gulpEmbedLqipAsBackground({
      rootPath: __dirname,
      dataSrcAttr: 'data-src',
    }),
  )
  .pipe(gulp.dest('.')));

```
## See also

See the brief [installation](https://github.com/lilliputten/gulp-embed-lqip-as-background#install) and [usage](https://github.com/lilliputten/gulp-embed-lqip-as-background#usage) manuals.
