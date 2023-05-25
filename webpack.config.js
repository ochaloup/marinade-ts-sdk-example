const path = require('path')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const config = {
  mode: 'production',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            configFile: "tsconfig.webpack.json"
          },
        }],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    fallback: {
      fs: false,
      tls: false,
      net: false,
    },
  },
  plugins: [new NodePolyfillPlugin()],
  optimization: {
    usedExports: true,
    minimize: false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  experiments: {
    outputModule: true,
  },
  target: 'es6',
  output: {
    filename: 'marinade-ts-sdk-example.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'module',
    },
    chunkFormat: 'module',
    module: true,
  },
  devtool: 'source-map',
}

module.exports = [config]
