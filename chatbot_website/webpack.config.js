require('dotenv').config();
const { EnvironmentPlugin } = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleTracker = require('webpack-bundle-tracker');

const babelPresets = require('../package.json').babel.presets;

const FRONTEND_BASE = path.join(__dirname, 'chatbot_frontend');
const BUILD_DIR = path.resolve(FRONTEND_BASE, 'static', 'assets');
const SRC_DIR = path.resolve(FRONTEND_BASE, 'src');
const SCSS_DIR = path.resolve(FRONTEND_BASE, 'scss');


module.exports = (env = {}) => {
  const webpackPlugins = [
    new EnvironmentPlugin(['GCP_API_KEY']),
    new BundleTracker({ path: __dirname, filename: './webpack-stats.json' }),
    new MiniCssExtractPlugin({
      filename: env.production ? '[name]--[hash].css' : '[name].css',
      chunkFilename: '[id].css'
    })
  ];
  const stylePlugin = MiniCssExtractPlugin.loader;

  return {
    context: __dirname,
    entry: {
      index: [
        '@babel/polyfill',
        SRC_DIR + '/index.js'
      ]
    },
    output: {
      path: BUILD_DIR,
      publicPath: '/static/assets/',
      filename: env.production ? '[name]--[hash].js' : '[name].bundle.js'
    },
    // watch: true,
    devtool: env.production ? 'eval' : 'eval-source-map',
    devServer: {
      contentBase: BUILD_DIR,
      //   port: 9001,
      compress: true,
      historyApiFallback: true,
      hot: true,
      open: true
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: babelPresets
            }
          }
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.(scss)$/,
          use: [
            stylePlugin,
            {
              loader: 'css-loader',
              options: {
                localIdentName: env.production ? '[hash:base64:8]' : '[local]--[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => {
                  const plugins = [
                    require('autoprefixer')()
                  ];
                  if (env.production) {
                    plugins.push(require('cssnano')());
                  }
                  return plugins;
                },
                sourceMap: !env.production
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.css$/,
          use: [
            stylePlugin,
            'css-loader'
          ]
        }
      ]
    },
    optimization: {
      minimize: true,
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    plugins: webpackPlugins,
    resolve: {
      extensions: ['.js', '.scss', '.css', '.json'],
      alias: {
        src: SRC_DIR,
        scss: SCSS_DIR
      }
    }
  };
};
