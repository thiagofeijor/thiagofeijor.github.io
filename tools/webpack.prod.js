/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config()
const { merge } = require('webpack-merge')
const path = require('path')
const WebpackAssetsManifest = require('webpack-assets-manifest')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'static/[name].[contenthash].js',
    path: path.resolve(__dirname, '..', 'docs'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'public/index.html'),
      filename: path.join(__dirname, '..', 'docs/index.html'),
    }),
    new FaviconsWebpackPlugin({
      logo: './public/logo.png',
      cache: true,
      inject: true,
      mode: 'webapp',
      manifest: './public/manifest.json',
    }),
    new CompressionPlugin({
      filename: "[path][base].gz",
    }),
    new WebpackAssetsManifest({}),
    new WorkboxPlugin.GenerateSW()
  ],
})
