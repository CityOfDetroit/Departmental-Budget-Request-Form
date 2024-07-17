const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// Determine mode from the environment, default to development
const mode = process.env.NODE_ENV || 'development';
const isProduction = mode === 'production';

module.exports = {
  // Entry point for the application
  entry: './src/js/init.js',

  // Output configuration for the bundle
  output: {
    filename: isProduction ? 'bundle.[contenthash].js' : 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },

  // Use the mode variable to set the mode
  mode,

  // Enable source maps for development mode
  devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',

  // Module rules for processing different types of files
  module: {
    rules: [
      {
        test: /\.js$/, // Process any .js files
        exclude: /node_modules/, // Exclude the node_modules directory
        use: {
          loader: 'babel-loader', // Use babel-loader to transpile ES6+ to ES5
        },
      },
      {
        test: /\.css$/, // Process any .css files
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 
          'css-loader'
        ], // Use style-loader in development for hot reloading
      },
      {
        test: /\.html$/, // Process any .html files
        use: ['html-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },

  // Plugins for additional functionality
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Template file to use
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].[contenthash].css' : '[name].css',
    }),
  ],

  // Configuration for the development server
  devServer: {
    hot: true, // Enable hot module replacement
    open: true, // Open the browser after server had been started
    port: 3000, // Set the port to listen on
  },

  // Optimization configuration, only configure minimizers if in production
  optimization: isProduction ? {
    minimizer: [
      new TerserJSPlugin({}), // Minimize JavaScript
      new OptimizeCSSAssetsPlugin({}), // Minimize CSS
    ],
  } : {},
};