const path = require('path')
const HWP = require('html-webpack-plugin')
const webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, '/src/index.js'),
  output: {
    filename: 'build.js',
    path: path.join(__dirname, '/dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },

      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',




      },




    ],


  },

 plugins: [
  new HWP({ template: path.join(__dirname, '/src/index.html') }),
  new webpack.DefinePlugin({
    'process.env.REACT_APP_WHATSAPP_API_URL': JSON.stringify(process.env.REACT_APP_WHATSAPP_API_URL),
    'process.env.REACT_APP_WHATSAPP_API_KEY': JSON.stringify(process.env.REACT_APP_WHATSAPP_API_KEY),
        'process.env': JSON.stringify(process.env)
  }),
],

  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    historyApiFallback: true,


  },
  mode: 'development',

}