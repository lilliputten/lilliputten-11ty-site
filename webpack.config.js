// @ts-check

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const prodMode = 'production';
const defaultMode = prodMode;
const mode = process.env.NODE_ENV || defaultMode;
const isDev = mode !== prodMode;

module.exports = {
  // @see https://webpack.js.org/configuration/devtool/#devtool
  mode: mode,
  devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
  entry: [
    // prettier-ignore
    './src/scripts/scripts.ts',
    './src/styles/styles.scss',
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
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
    new webpack.DefinePlugin({
      'process.env': {
        // NODE_ENV: mode,
        // ...variablesFromEnvironmentJsonConfig
      },
    }),
    // ...
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'scripts.js',
    path: path.resolve(__dirname, 'compiled-assets'),
    // sourceMapFilename: '[file].map',
  },
};
