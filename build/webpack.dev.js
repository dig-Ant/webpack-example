const merge = require("webpack-merge");
const webpack = require("webpack");
const baseConfig = require("./webpack.base");

// 分离配置
// 区分公用基础配置 开发环境配置  生产环境配置 性能测试配置等等
// ? 问号表示可以有可以没有
// 基础配置
// 	- entry - output - plugins - module (插件和loader一般大部分都是公用的)
// 开发环境
//  - ?entry - ?output - mode - devServer - devtool
// 生产环境
//  - ?entry - ?output - mode - devtool
module.exports = merge(baseConfig, {
	// mode: "production",
	// output: {
	// 	pathinfo: true // development 中默认是true 给打包后的boundle包中引入模块添加注释信息
	// },
	mode: "development",
	devServer: {
		open: true,
		port: 3001,
		hot: true,
		host: "0.0.0.0", // 配置了才可以访问本机ip
		compress: true, // 开启压缩gzip压缩
		// contentBase: "./src", // 服务器打开的初始目录 在给定目录提供服务器
		// publicPath: '/', // 值一般和output中的publicPath相同 提供内存中资源的基础路径
		proxy: {
			// headers: { // 没生效 (项目里的配置)
			// 	"Access-Control-Allow-Origin": "*",
			// },
			// 转发/api的请求
			// /api/getUserInfo  => http://localhost:9999/api/getUserInfo
			// '/api': 'http://localhost:9999'
			"/api": {
				// 改变路由去掉/api /api/getUserInfo  => http://localhost:9999/getUserInfo
				target: "http://localhost:9999",
				pathRewrite: {
					"^/api": "",
				},
			},
		},
	},
	// devtool: "source-map",
	devtool: "cheap-module--eval-source-map",
	// devtool: "eval-cheap-module-source-map",
	// devtool: 'cheap-module-source-map'

	plugins: [
		new webpack.DefinePlugin({
			IS_DEV: "true", // DefinePlugin 会解析定义的环境变量表达式,当成js执行
			// test: '1+1', // 2
			// test1: '"xx"' // 使用的地方会报错 找不到xx变量
		}),
	],
});
