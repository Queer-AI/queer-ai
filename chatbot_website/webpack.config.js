const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const babelPresets = require('../package.json').babel.presets;

const FRONTEND_BASE = path.join(__dirname, 'chatbot_frontend')
const BUILD_DIR = path.resolve(FRONTEND_BASE, 'static', 'assets');
const SRC_DIR = path.resolve(FRONTEND_BASE, 'src');
const SCSS_DIR = path.resolve(FRONTEND_BASE, 'scss');

module.exports = (env = {}) => {
  return {
    entry: {
      index: [
        '@babel/polyfill',
        SRC_DIR + '/index.js'
      ]
    },
    output: {
      path: BUILD_DIR,
      publicPath: '/',
      filename: env.prod ? '[name]--[hash].js' : '[name].bundle.js'
    },
    // watch: true,
    devtool: env.prod ? 'source-map' : 'cheap-module-eval-source-map',
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
            'css-hot-loader',
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                localIdentName: '[local]--[hash:base64:5]'
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
                  if (env.prod) {
                    plugins.push(require('cssnano')());
                  }
                  return plugins;
                },
                sourceMap: !env.prod
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ],
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
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      })
    ],
    resolve: {
      extensions: ['.js', '.scss', '.css', '.json'],
      alias: {
        src: SRC_DIR,
        scss: SCSS_DIR
      }
    }
  };
};
