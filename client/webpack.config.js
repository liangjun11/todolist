// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const sveltePreprocess = require('svelte-preprocess')

const mode = process.env.NODE_ENV || 'development'
const prod = mode === 'production'

module.exports = {
  entry: {
    todolist: ['./src/pages/todolist/main.js'],
    login: ['./src/pages/login/main.js'],
  },
  resolve: {
    alias: {
      // svelte: path.resolve("node_modules", "svelte/src/runtime"),
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
    conditionNames: ['svelte', 'browser'],
  },
  output: {
    path: path.join(__dirname, '/public'),
    filename: '[name].bundle.js',
    // chunkFilename: '[name].[id].js'
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            compilerOptions: {
              dev: !prod,
            },
            emitCss: prod,
            hotReload: !prod,
            preprocess: sveltePreprocess({
              postcss: true,
            }),
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  mode,
  // plugins: [
  //   new MiniCssExtractPlugin({
  //     filename: '[name].css',
  //   }),
  // ],
  devtool: prod ? false : 'source-map',
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, '/public'),
    },
  },
}
