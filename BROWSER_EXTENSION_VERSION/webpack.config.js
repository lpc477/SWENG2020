const HTMLPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const ExtensionReloader = require('webpack-extension-reloader');
const ManifestVersionSyncPlugin = require('webpack-manifest-version-sync-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    options: './options.js',
    popup: './popup.js',
    content: './content.js',
    background: './background.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
	  {
		  test: /\.css$/,
		  use: [MiniCssExtractPlugin.loader, "css-loader"],
	  },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new HTMLPlugin({
      chunks: ['options'],
      filename: 'options.html',
      title: 'Options page title',
    }),
    new HTMLPlugin({
      chunks: ['popup'],
      filename: 'popup.html',
    }),
    new CopyPlugin([
      { from: './_locales/', to: './_locales' },
	  { from: './src/image', to: './image' },
	  { from: './manifest.json', to: './manifest.json' },
    ]),
    new ManifestVersionSyncPlugin(),
	new MiniCssExtractPlugin(),
  ],
  optimization: {
    minimize: true,
  },
  mode: 'production',
  stats: 'minimal',
};
