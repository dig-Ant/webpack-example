const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

// 相对路径 都是相对项目根目录

// 分离配置
// 区分公用基础配置 开发环境配置  生产环境配置 性能测试配置等等
// ? 问号表示可以有可以没有
// 基础配置
// 	- entry - output - plugins - module (插件和loader一般大部分都是公用的)
// 开发环境
//  - ?entry - ?output - mode - devServer - devtool
// 生产环境
//  - ?entry - ?output - mode - devtool
module.exports = {
	entry: {
		index: [
			// "@babel/polyfill",
			"./src/main.js",
		],
		other: "./src-other/other.js",
	},
	output: {
		// path.resolve  解析相对路径为绝对路径
		path: path.resolve("./dist"),
		// path.join 拼接相对路径为绝对路径
		// path: path.join(__dirname, "../","./dist"), // 相对当前路径 如果配置放到build文件下 dist就会打包到build配置文件下(resolve不会)
		filename: "[name].[hash:4].js",
		// filename: "[name].[chunkhash].js",
		// 热更新(HMR)不能和[chunkhash]同时使用。
		chunkFilename: "[name].[hash:2].js", //指未被列在 entry 中，却又需要被打包出来的 chunk 文件的名称。一般来说，这个 chunk 文件指的就是要懒加载的代码。
		publicPath: "/", // 作用在每个路由之前
	},
	// watch: true,
	plugins: [
		// TODO 功能 1.打包时 根据模板生成html 并自动引入js 2.配合devserver使用 内存中生成js文件
		// 3.运行时 生成内存中的html 并引入打包好的内存中的js文件
		// TODO 多页面打包
		// 1. 配置entry多入口 2. output输出filename等名字不能是固定的 3.添加多个htmlWebpackPlugin插件(可多个)添加chunks选择要哪些chunk
		new HtmlWebpackPlugin({
			filename: "index.html", // 生成文件名
			template: "./src/index.html", // 参照的模板
			chunks: ["index", "other"],
		}),
		new HtmlWebpackPlugin({
			filename: "other.html", // 生成文件名
			template: "./src-other/other.html", // 参照的模板
			chunks: ["other"],
		}),
		// 打包删除上一次打包遗留的文件
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: ["*", "!img", "!assets1"],
		}),
		// 在html文件中引入本地静态资源时, 资源不会被打包进去
		// 使用插件copy资源目录 到打包目录中
		new CopyWebpackPlugin([
			{
				// from: path.resolve("./assets"),
				from: path.join(__dirname, "../", "assets"),
				to: "assets",
			},
		]),
		// 给打包好的boundle文件添加注释版权
		new webpack.BannerPlugin("[name]我是chunk版本信息"),
		// 将库自动加载到每个模块
		new webpack.ProvidePlugin({
			$: "jquery",
			jquery: "jquery",
		}),
		// 使用MiniCssExtractPlugin提取独立css文件  (如果不使用插件 默认会打包到页面style标签中 内联样式)
		new MiniCssExtractPlugin({
			// filename: "[name].css", //name 和输出文件的name一致  home/[name].[contenthash].css 表示前面加文件夹
			filename: "[name].[contenthash].css", //name 和输出文件的name一致  home/[name].[contenthash].css 表示前面加文件夹
			chunkFilename: "[id].css",
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				// use: ["style-loader", "css-loader"],
				use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"], // 使用MiniCssExtractPlugin提取独立css文件
			},
			{
				test: /\.less$/,
				// use: ["style-loader", "css-loader", "less-loader"],
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader",
					"less-loader",
				],
			},
			{
				test: /\.(jpg|png|gif|jpeg)$/,
				// use: ["url-loader"]
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 3 * 1024,
							outputPath: "img", //打包后dist文件夹下将创建的文件目录
							// publicPath: "./images",
							name: "[name]-[hash:base64].[ext]",
							// name: 'images/[name]-[hash:base64:5].[ext]?[hash:base64:4]'
						},
					},
				],
			},
			{
				test: /\.js$/,
				use: [
					{
						loader: "babel-loader",
						// options: {
						// 	presets: ["@babel/env"],
						// 	plugins: [
						// 		"@babel/plugin-proposal-class-properties",
						// 		"@babel/plugin-transform-runtime",
						// 	],
						// 	// sourceType: "unambiguous",
						// },
					},
				],
				exclude: [/^node_modules/],
				include: [/src/],
			},
			// html-loader 替代 html-withimg-loader(不好用html生成引用地址是对象)
			// {
			// 	test: /\.(htm|html)$/i,
			// 	loader: "html-withimg-loader",
			// },

			// 功能一: 把html中的引入的图片资源也打包到dist
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			// 将库引入到全局作用域
			// {
			// 	// 用于解析jquery模块的绝对路径
			// 	test: require.resolve("jquery"),
			// 	use: [
			// 		{
			// 			loader: "expose-loader",
			// 			options: {
			// 				exposes: "$",
			// 			},
			// 		},
			// 	],
			// },
		],
	},
};
