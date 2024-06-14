// @ts-check

import dotenv from 'dotenv';

import fs from 'fs';
import path from 'path';

import gulp from 'gulp';
import del from 'del';
import rev from 'gulp-rev';
import revRewrite from 'gulp-rev-rewrite';
import vinylPaths from 'vinyl-paths';
import workboxBuild from 'workbox-build';
import replace from 'gulp-replace';
import childProcess from 'child_process';

import gulpTypescript from 'gulp-typescript'; // @see https://www.npmjs.com/package/gulp-typescript
// import tsPipeline from 'gulp-webpack-typescript-pipeline';
// import browserify from 'gulp-browserify';
// import merge from 'merge2';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import gulpSass from 'gulp-sass';
import * as sass from 'sass';
import gulpAutoprefixer from 'gulp-autoprefixer';

const posixPath = path.posix;
const { execSync } = childProcess;

dotenv.config();

const SRC_PATH = 'src';
const DEST_PATH = 'build';

const isWin = process.platform === 'win32';
const tty = isWin ? 'CON' : '/dev/tty';

// Working paths...
const sourceScriptsPath = posixPath.join(SRC_PATH, 'scripts');
const sourceStylesPath = posixPath.join(SRC_PATH, 'styles');
const destAssetsPath = 'compiled-assets';

// Construct sass runner...
const sassRunner = gulpSass(sass);

// Construct ts runner (see `tsconfig.json`...
const tsProject = gulpTypescript.createProject('tsconfig.json');

// Watch...
const watchOptions = {
  // @see: https://gulpjs.com/docs/en/getting-started/watching-files/
  events: 'all',
  /** Omit initial action for watch cycles */
  ignoreInitial: false,
  delay: 500,
  // NOTE: There is a bug with styles compiling watching by
  // `livereload-assets-server`: it takes only previous state, needs to make
  // one extra update
};

// Styles...
const stylesSrcAll = [posixPath.join(sourceStylesPath, '**/*.scss')];
const stylesSrcEntry = posixPath.join(sourceStylesPath, 'styles.scss');
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
gulp.task('watchStyles', () => {
  return gulp.watch(stylesSrcAll.concat(stylesSrcEntry), watchOptions, compileStyles);
});

// Scripts...
const scriptsSrcAll = [posixPath.join(sourceScriptsPath, '**/*.{ts,js}')];
// const scriptsTargetFile = 'scripts.js';
function compileScripts() {
  return (
    gulp
      .src(scriptsSrcAll)
      .pipe(sourcemaps.init())
      .pipe(tsProject(gulpTypescript.reporter.fullReporter()))
      .on('error', (error) => {
        // NOTE: Prevent gulp process to halt (continue execution after an error).
        const errorMessage = 'Typescript error: task failed. ' + error.name + ': ' + error.message;
        // eslint-disable-next-line no-console
        console.error(errorMessage);
      })
      .js // prettier-ignore
      // .pipe(concat('all.js'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(destAssetsPath))
  );
}
gulp.task('compileScripts', compileScripts);
gulp.task('watchScripts', () => {
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

gulp.task('cacheHash', () => {
  return gulp
    .src(
      [
        // `${DEST_PATH}/fonts/*.woff2`,
        // `${DEST_PATH}/images/**/*.{svg,png,jpg,avif}`,
        `${DEST_PATH}/assets/**/*.{js,css}`,
        `${DEST_PATH}/compiled-assets/**/*.{js,css}`,
        // `${DEST_PATH}/sw.js`,
        // `${destAssetsPath}/*.{js,css}`,
        // `${DEST_PATH}/styles/*.css`,
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

gulp.task('cacheReplace', () => {
  return gulp
    .src([
      `${DEST_PATH}/**/*.{html,css}`,
      `${DEST_PATH}/manifest-*.webmanifest`,
      // `${DEST_PATH}/assets/compiled/**/*.{js,css}`,
    ])
    .pipe(
      revRewrite({
        // manifest: combinedManifest,
        manifest: fs.readFileSync(`${DEST_PATH}/rev.json`),
      }),
    )
    .pipe(gulp.dest(DEST_PATH));
});

gulp.task('serviceWorker', () => {
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
    'cacheHash',
    'cacheReplace',
  ),
);

gulp.task('contributorsGet', () => {
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

gulp.task('humansGenerate', () => {
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
      // gulp.parallel(
      //   // 'scripts',
      //   // 'styles',
      //   'compileScripts',
      //   'compileStyles',
      // ),
      'cache',
      'clean',
      'serviceWorker',
    ),
    gulp.series(
      // prettier-ignore
      'contributorsGet',
      'humansGenerate',
    ),
  ),
);

const compileAssetsTasks = [
  // Watch all tasks...
  'compileStyles',
  'compileScripts',
].filter(Boolean);
gulp.task('compileAssets', gulp.parallel.apply(gulp, compileAssetsTasks));

const watchAssetsTasks = [
  // Watch all tasks...
  'watchStyles',
  'watchScripts',
].filter(Boolean);
gulp.task('watchAssets', gulp.parallel.apply(gulp, watchAssetsTasks));
