// @ts-check

import dotenv from 'dotenv';

import fs from 'fs';
import path from 'path';

import gulp from 'gulp';
import postcss from 'gulp-postcss';
import swc from 'gulp-swc';
import del from 'del';
import rev from 'gulp-rev';
import revRewrite from 'gulp-rev-rewrite';
import vinylPaths from 'vinyl-paths';
import workboxBuild from 'workbox-build';
import replace from 'gulp-replace';
import childProcess from 'child_process';

import gulpTypescript from 'gulp-typescript'; // @see https://www.npmjs.com/package/gulp-typescript
import sourcemaps from 'gulp-sourcemaps';
import gulpSass from 'gulp-sass';
import * as sass from 'sass';
import gulpAutoprefixer from 'gulp-autoprefixer';

const posixPath = path.posix;
const { execSync } = childProcess;

dotenv.config();

const DEST_PATH = '_public';
const SRC_PATH = 'src';

const isWin = process.platform === 'win32';
const tty = isWin ? 'CON' : '/dev/tty';

// Working paths...
// const srcPath = 'src/';
// const publicPath = posixPath.join(SRC_PATH, DEST_PATH);
const sourceScriptsPath = posixPath.join(SRC_PATH, 'scripts');
const sourceStylesPath = posixPath.join(SRC_PATH, 'styles');
// const srcAssetsPath = posixPath.join(SRC_PATH, 'assets');
const destAssetsPath = 'assets';
// const targetScriptsPath = posixPath.join(DEST_PATH, 'scripts');

// Construct sass runner...
const sassRunner = gulpSass(sass);

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

/* // OLD assets config...
 *
 * // Styles
 *
 * gulp.task('styles', () => {
 *   return gulp
 *     .src(`${DEST_PATH}/styles/{styles,dark}.css`)
 *     .pipe(postcss([require('postcss-import'), require('postcss-lightningcss')]))
 *     .pipe(gulp.dest(`${DEST_PATH}/styles`));
 * });
 *
 * // Scripts
 *
 * gulp.task('scripts', () => {
 *   return gulp
 *     .src(`${DEST_PATH}/scripts/*.js`)
 *     .pipe(
 *       swc({
 *         minify: true,
 *       }),
 *     )
 *     .pipe(gulp.dest(`${DEST_PATH}/scriptsjs`));
 * });
 */

// Styles...
const stylesSrcAll = [posixPath.resolve(sourceStylesPath, '**/*.scss')];
const stylesSrcEntry = posixPath.resolve(sourceStylesPath, 'styles.scss');
function compileStyles() {
  return gulp
    .src(stylesSrcEntry)
    .pipe(sourcemaps.init())
    .pipe(sassRunner().on('error', sassRunner.logError))
    .pipe(gulpAutoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(destAssetsPath));
}
gulp.task('compileStyles', compileStyles);
gulp.task('compileStylesWatch', () => {
  return gulp.watch(stylesSrcAll.concat(stylesSrcEntry), watchOptions, compileStyles);
});

// Scripts...
const scriptsSrcAll = [sourceScriptsPath + '**/*.{ts,js}'];
// const scriptsTargetFile = 'scripts.js';
function compileScripts() {
  return gulp
    .src(scriptsSrcAll)
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .js // prettier-ignore
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(destAssetsPath));
}
gulp.task('compileScripts', compileScripts);
gulp.task('compileScriptsWatch', () => {
  return gulp.watch(scriptsSrcAll, watchOptions, compileScripts);
});

// Clean

gulp.task('clean', () => {
  return del([
    `${DEST_PATH}/rev*.json`,
    // `${DEST_PATH}/styles/**/*`,
    // `!${DEST_PATH}/styles/{styles,dark}.{css,map}`,
    // `${DEST_PATH}/scripts/**/*`,
    // `!${DEST_PATH}/scripts/scripts.{js,map}`,
  ]);
});

// Cache

gulp.task('cache:hash', () => {
  return gulp
    .src(
      [
        `${DEST_PATH}/fonts/*.woff2`,
        `${DEST_PATH}/images/**/*.{svg,png,jpg,avif}`,
        `${DEST_PATH}/assets/*.{js,css}`,
        `${DEST_PATH}/styles/*.css`,
        `${DEST_PATH}/manifest.webmanifest`,
      ],
      {
        base: DEST_PATH,
        allowEmpty: true,
      },
    )
    .pipe(vinylPaths(del))
    .pipe(rev())
    .pipe(gulp.dest(DEST_PATH))
    .pipe(rev.manifest('rev.json'))
    .pipe(gulp.dest(DEST_PATH));
});

/* gulp.task('cache:combine', () => {
 *   return gulp
 *     .src([
 *       // prettier-ignore
 *       `${DEST_PATH}/rev-misc.json`,
 *       `${DEST_PATH}/rev-scripts.json`,
 *     ])
 *     .pipe(mergeJson({ fileName: 'rev.json' }))
 *     .pipe(gulp.dest(DEST_PATH));
 * });
 */

gulp.task('cache:replace', () => {
  return gulp
    .src([`${DEST_PATH}/**/*.{html,css}`, `${DEST_PATH}/manifest-*.webmanifest`])
    .pipe(
      revRewrite({
        // manifest: combinedManifest,
        manifest: fs.readFileSync(`${DEST_PATH}/rev.json`),
      }),
    )
    .pipe(gulp.dest(DEST_PATH));
});

gulp.task('service-worker', () => {
  return workboxBuild.generateSW({
    globDirectory: DEST_PATH,
    globPatterns: ['**/*.{js,css,webmanifest,ico,woff2}', '**/404.html'],
    swDest: `${DEST_PATH}/sw.js`,
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

gulp.task(
  'cache',
  gulp.series(
    // prettier-ignore
    'cache:hash',
    // 'cache:combine',
    'cache:replace',
  ),
);

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
    .src(`${DEST_PATH}/humans.txt`)
    .pipe(replace('{LAST_UPDATE}', date.toISOString()))
    .pipe(replace('{CONTRIBUTORS}', contributors.join('\n\t')))
    .pipe(gulp.dest(DEST_PATH));
});

// Build

gulp.task(
  'build',
  gulp.parallel(
    gulp.series(
      gulp.parallel(
        // 'scripts',
        // 'styles',
        'compileScripts',
        'compileStyles',
      ),
      'cache',
      'clean',
      'service-worker',
    ),
    gulp.series(
      // prettier-ignore
      'contributors:get',
      'humans:generate',
    ),
  ),
);
