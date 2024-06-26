const Dotenv                 = require('dotenv-webpack');
const HtmlWebpackPlugin      = require('html-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const {resolve}              = require('path');

module.exports = function(env, {analyze}) {
  const production = env.production || process.env.NODE_ENV === 'production';

  return {
    target: 'web',
    mode: production ? 'production' : 'development',
    entry: {
      main: './src/main.ts'
    },
    output: {
      path: resolve(__dirname, 'dist'),
      filename: '[name].bundle.js'
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [resolve(__dirname, 'src'), 'node_modules']
    },
    devServer: {
      static: {directory: __dirname},
      historyApiFallback: false,
      open: !process.env.CI,
      port: 9000
    },
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset'
        },
        {
          test: /\.(woff|woff2|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
          type: 'asset'
        },
        {
          test: /\.ts$/i,
          use: ['ts-loader', '@aurelia/webpack-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.scss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader', {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer']
              }
            }
          }]
        },
        {
          test: /[/\\]src[/\\].+\.html$/i,
          use: '@aurelia/webpack-loader',
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({template: 'index.html'}),
      new Dotenv({path: `./.env${production ? '' : '.' + 'development'}`}),
      analyze && new BundleAnalyzerPlugin()
    ].filter(p => p),
    stats: {warnings: !production}
  };
};
