// @ts-check

const path = require('path');
// const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const minimizeAssets = true; // !isDev || !useLocalServedScripts;

module.exports = {
  mode: 'production',
  // @see https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'source-map',
  entry: [
    // prettier-ignore
    './src/scripts/scripts.ts',
    './src/styles/styles.scss',
  ],
  resolve: {
    extensions: ['.scss', '.sass', '.css', '.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        // @see https://github.com/TypeStrong/ts-loader
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },

          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false,
            },
          },

          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              /* // NOTE: Inject 'use' for math and color features, import common variables and mixins.
               * additionalData: [
               *   // '@use "sass:math";',
               *   // '@use "sass:color";',
               *   // '@import "src/variables.scss";',
               *   // '@import "src/mixins.scss";',
               * ]
               *   .filter(Boolean)
               *   .join('\n'),
               */
              api: 'modern',
              sassOptions: {
                // @see https://github.com/sass/node-sass#outputstyle
                outputStyle: minimizeAssets ? 'compressed' : 'expanded',
                quietDeps: true,
                silenceDeprecations: [
                  // @see node_modules/sass/types/deprecations.d.ts
                  'legacy-js-api',
                  'import',
                  'color-functions',
                  'global-builtin',
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_debugger: false,
            // global_defs: {
            //   '@console.log': 'alert',
            // },
            // passes: 2,
            // html5_comments: true,
          },
        },
      }),
    ],
  },
  output: {
    filename: 'scripts.js',
    path: path.resolve(__dirname, 'compiled-assets'),
  },
};
