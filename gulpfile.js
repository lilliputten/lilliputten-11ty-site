// @ts-check

require('dotenv').config();

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const swc = require('gulp-swc');
const del = require('del');
const rev = require('gulp-rev');
const revRewrite = require('gulp-rev-rewrite');
const paths = require('vinyl-paths');
const workboxBuild = require('workbox-build');
const replace = require('gulp-replace');
const execSync = require('child_process').execSync;
const fs = require('fs');

const gulpTypescript = require('gulp-typescript'); // @see https://www.npmjs.com/package/gulp-typescript
const sourcemaps = require('gulp-sourcemaps');

const PUBLIC_PATH = '_public';
const SRC_PATH = 'src';
const tty = process.platform === 'win32' ? 'CON' : '/dev/tty';

// Working paths...
const srcPath = 'src/';
const staticPath = 'static/';
const sourceAssetsPath = srcPath + 'assets/';
const targetAssetsPath = staticPath + 'assets/';

// Construct sass runner...
// const sassRunner = gulpSass(sass);

// Construct ts runner (see `tsconfig.json`...
const tsProject = gulpTypescript.createProject('tsconfig.json');

// Watch...
const watchOptions = {
  // @see: https://gulpjs.com/docs/en/getting-started/watching-files/
  events: 'all',
  /** Omit initial action for watch cycles */
  ignoreInitial: true,
  delay: 500,
  // NOTE: There is a bug with styles compiling watching by
  // `livereload-assets-server`: it takes only previous state, needs to make
  // one extra update
};

// Styles

gulp.task('styles', () => {
  return gulp
    .src(`${PUBLIC_PATH}/styles/{styles,dark}.css`)
    .pipe(postcss([require('postcss-import'), require('postcss-lightningcss')]))
    .pipe(gulp.dest(`${PUBLIC_PATH}/styles`));
});

// Scripts

gulp.task('scripts', () => {
  return gulp
    .src(`${PUBLIC_PATH}/scripts/*.js`)
    .pipe(
      swc({
        minify: true,
      }),
    )
    .pipe(gulp.dest(`${PUBLIC_PATH}/scripts`));
});

// Scripts...
const scriptsSrcAll = [sourceAssetsPath + '**/*.{js,ts}'];
// const scriptsTargetFile = 'scripts.js';
const scriptsDest = targetAssetsPath;
function compileScripts() {
  return gulp
    .src(scriptsSrcAll)
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .js.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(scriptsDest));
}
gulp.task('compileScripts', compileScripts);
gulp.task('compileScriptsWatch', () => {
  return gulp.watch(scriptsSrcAll, watchOptions, compileScripts);
  // .on('change', onWatchChange); // TODO?
});

// Clean

gulp.task('clean', () => {
  return del([
    `${PUBLIC_PATH}/styles/**/*`,
    `!${PUBLIC_PATH}/styles/{styles,dark}.css`,
    `${PUBLIC_PATH}/scripts/**/*`,
    `!${PUBLIC_PATH}/scripts/scripts.js`,
  ]);
});

// Cache

gulp.task('cache:hash', () => {
  return gulp
    .src(
      [
        `${PUBLIC_PATH}/fonts/*.woff2`,
        `${PUBLIC_PATH}/images/**/*.{svg,png,jpg,avif}`,
        `${PUBLIC_PATH}/scripts/*.js`,
        `${PUBLIC_PATH}/styles/*.css`,
        `${PUBLIC_PATH}/manifest.webmanifest`,
      ],
      {
        base: PUBLIC_PATH,
      },
    )
    .pipe(paths(del))
    .pipe(rev())
    .pipe(gulp.dest(PUBLIC_PATH))
    .pipe(rev.manifest('rev.json'))
    .pipe(gulp.dest(PUBLIC_PATH));
});

gulp.task('cache:replace', () => {
  return gulp
    .src([`${PUBLIC_PATH}/**/*.{html,css}`, `${PUBLIC_PATH}/manifest-*.webmanifest`])
    .pipe(
      revRewrite({
        manifest: fs.readFileSync(`${PUBLIC_PATH}/rev.json`),
      }),
    )
    .pipe(gulp.dest(PUBLIC_PATH));
});

gulp.task('service-worker', () => {
  return workboxBuild.generateSW({
    globDirectory: PUBLIC_PATH,
    globPatterns: ['**/*.{js,css,webmanifest,ico,woff2}', '**/404.html'],
    swDest: `${PUBLIC_PATH}/sw.js`,
    runtimeCaching: [
      {
        urlPattern: /\.(?:png|jpg|avif|svg)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images',
          expiration: {
            maxEntries: 30,
          },
        },
      },
      {
        urlPattern: /(\.(?:html))|(\/)$/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'articles',
          expiration: {
            maxEntries: 20,
          },
        },
      },
    ],
    mode: 'production',
    skipWaiting: true,
    clientsClaim: true,
    sourcemap: false,
  });
});

gulp.task('cache', gulp.series('cache:hash', 'cache:replace'));

gulp.task('contributors:get', () => {
  // Get new contributors only on local build
  if (process.env.ELEVENTY_ENV === 'production') {
    return new Promise((resolve) => resolve(undefined));
  }

  const contributors = execSync('git shortlog -sne < ' + tty).toString();
  const myEmails = [
    'igor@lilliputten.com',
    'igor@lilliputten.ru',
    'lilliputten@gmail.com',
    'lilliputten@yandex.ru',
  ];
  const contributorsNames = contributors
    .split('\n')
    .filter(Boolean)
    .filter((line) => !myEmails.some((myEmail) => line.includes(myEmail)))
    .map((contributorLine) => {
      const info = contributorLine.split('\t')[1];
      const name = info.split(' <')[0];
      return name;
    });

  return new Promise((resolve) => {
    fs.writeFileSync(`${SRC_PATH}/data/contributors.json`, JSON.stringify(contributorsNames));

    resolve(undefined);
  });
});

gulp.task('humans:generate', () => {
  const contributors = JSON.parse(fs.readFileSync(`${SRC_PATH}/data/contributors.json`).toString());
  const date = new Date();

  return gulp
    .src(`${PUBLIC_PATH}/humans.txt`)
    .pipe(replace('{LAST_UPDATE}', date.toISOString()))
    .pipe(replace('{CONTRIBUTORS}', contributors.join('\n\t')))
    .pipe(gulp.dest(PUBLIC_PATH));
});

// Build

gulp.task(
  'build',
  gulp.parallel(
    gulp.series(
      // prettier-ignore
      'scripts',
      'styles',
      'clean',
      'cache',
      'service-worker',
    ),
    gulp.series(
      // prettier-ignore
      'contributors:get',
      'humans:generate',
    ),
  ),
);
