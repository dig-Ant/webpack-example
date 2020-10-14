const path = require("path");
const webpack  = require('webpack');

module.exports = {
  entry: {
    react: ['react', 'react-dom', 'react-router']
  },
  output: {
    path: path.resolve(__dirname, '../dist/lib'),
    // filename: '[name]-[hash].js',
    // 不带hash 用插件把打包的dll.js引入html
    filename: '[name]_dll.js',
    library: '[name]_dll' // 最终会在全局暴露出一个react_dll对象
  },
  plugins: [
    new webpack.DllPlugin({
      // name: '[name]-[hash]',// 和output.filename一致即可
      name: '[name]_dll',// 和output.filename一致即可
      path: path.resolve(__dirname,'../dist/lib', '[name]-manifest.json')
    })
  ]
}