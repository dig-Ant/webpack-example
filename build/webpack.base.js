const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 配置dll 添加dll引入到html中
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");
const manifestJson = require(path.resolve(__dirname, '../dist/lib','react-manifest.json'))
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
const BUILD_PUBLIC_PATH = '/'
module.exports = {
	entry: {
		index: [
			// "@babel/polyfill",// 可以兼容ie
			"./src/main.js",
		],
		// other: "./src-other/other.js",
	},
	output: {
		// path.resolve  解析相对路径为绝对路径
		path: path.resolve("./dist"),
		// path.join 拼接相对路径为绝对路径
		// path: path.join(__dirname, "../","./dist"), // 相对当前路径 如果配置放到build文件下 dist就会打包到build配置文件下(resolve不会)
		// 热更新(HMR)不能和[chunkhash]同时使用。
		filename: "[name].[hash:4].js",
		chunkFilename: "[name].[hash:2].js", //指未被列在 entry 中，却又需要被打包出来的 chunk 文件的名称。一般来说，这个 chunk 文件指的就是要懒加载的代码。
		// filename: "[name].[contenthash].js",
		// chunkFilename: "[name].[contenthash].js",
		publicPath: BUILD_PUBLIC_PATH, // 作用在每个路由之前

		// TODO hash chunkhash contenthash  (filename 和chunkFilename 使用的hash必须一致?)
		// hash 计算与整个项目的构建相关；
		// chunkhash 计算与同一 chunk 内容相关；同一个chunk打包出来的boundle用同一个chunkhash 变动一个文件 其他同同一个chunkhash的文件也会变动
		// contenthash 计算与文件内容本身相关。
	},
	// watch: true,
	plugins: [
		// TODO 功能 1.打包时 根据模板生成html 并自动引入js 2.配合devserver使用 内存中生成js文件
		// 3.运行时 生成内存中的html 并引入打包好的内存中的js文件
		// TODO 多页面打包
		// 1. 配置entry多入口 2. output输出filename等名字不能是固定的 3.添加多个htmlWebpackPlugin插件(可多个)添加chunks选择要哪些chunk
		new HtmlWebpackPlugin({
			// filename: "index.html", // 生成文件名
			template: "./src/index.html", // 参照的模板
			templateParameters: {// html-loader 导致失效
				'ddd': 'dds',
				dll: `${BUILD_PUBLIC_PATH}lib/${manifestJson.name}.js`
			},
			title: 'nihao', // html-loader 导致失效
			chunks: ["index", "other"], // 可以控制css引入?
			// inject: true, // true head body false true和body:所有JavaScript资源插入到body元素的底部 false不插入 head插入到head
		}),
		// new HtmlWebpackPlugin({
		// 	filename: "other.html", // 生成文件名
		// 	template: "./src-other/other.html", // 参照的模板
		// 	chunks: ["other"],
		// }),
		// 打包删除上一次打包遗留的文件
		// 使用dll的时候要去除dll文件 不要删
		// new CleanWebpackPlugin({
		// 	// cleanOnceBeforeBuildPatterns: ["*", "!img", "!assets1"],
		// }),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: ['*',`!lib`]
			// cleanOnceBeforeBuildPatterns: ['**/*',`!lib`, '!lib/*']
		}),
		// 在html文件中引入本地静态资源时, 资源不会被打包进去
		// 使用插件copy资源目录 到打包目录中
		// new CopyWebpackPlugin([
		// 	{
		// 		// from: path.resolve("./assets"),
		// 		from: path.join(__dirname, "../", "assets"),
		// 		to: "assets",
		// 	},
		// ]),
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
			chunkFilename: "[id].[contenthash].css",
		}),

		new webpack.DllReferencePlugin({
			// 两种方式在html中引入dll文件
			// TODO: 第一种 如果名称带hash 就直接加载json 取name值
			// 在html-webpack-plugin中申明变量 在html模板中引入dll
			// name: 'react_dll', // 保持name与output.library 一致。
			// manifest: manifestJson

			// TODO: 第二种 如果名称不带hash manifest直接引入绝对路径不需要直接引入json文件
			// 通过插件 add-asset-html-webpack-plugin 动态引入
			name: 'react_dll', // 保持name与output.library 一致。
			manifest: path.resolve(__dirname, '../dist/lib','react-manifest.json')
		}),
		// 必须在htmlwebpackplugin之后引入
		new AddAssetHtmlWebpackPlugin({
			filepath: path.resolve(__dirname, '../dist/lib/react_dll.js')
		})
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

			// 功能一: 把html中的引入的图片资源也打包到dist (和html-webpack-plugin的传参功能冲突)
			// {
			// 	test: /\.html$/i,
			// 	loader: "html-loader",
			// },
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

	// code splitting
	// 都引入相同文件时会重复打包 比如jquery 会在两个boundle中都把jquery打包进去
	// 多入口单入口都会抽取(看配置)
	// js并行请求 减少首屏渲染时间
	optimization: {
		splitChunks: {
			chunks: "all", // 动态引入的文件里的 静态引入资源也会被抽离
			// chunks: 'initial', // 动态引入的文件里的 静态引入资源不会被抽离
			maxAsyncRequests: 5, // 默认 5 按需引入的包中并行请求的最大数量。超出数量直接不拆分包 如果为1 例子中动态引入的math.js不会把lodash单独抽出
			// 理解? 当整个项目打包完之后，一个按需加载的包最终被拆分成 n 个包，maxAsyncRequests 就是用来限制 n 的最大值
			// maxInitialRequests: 3, // 默认 3 页面初始化同时发送的请求数量最大不能超过3 超出不拆分chunk 超出的不拆分
			// chunks: 'async' // 默认async 只对异步加载的模块进行拆分 还有all和initial都会对静态导入复用的模块进行拆分 all initial区别?
			minSize: 20000, // 模块最少大于30kb才会拆分
			maxSize: 0, // 如果超出了maxSize 才会进一步才分 (一般不写)
			minChunks: 1, // 模块最少引用1次才会被拆分  不同chunks引用同一个?
			automaticNameDelimiter: '~', // 默认的连接符
			name: true, // 拆分的chunk名, 设为true时 表示根据模块名和cacheGroups的key来自动生成, 使用上面的连接符链接
			cacheGroups: {  // 可以继承和覆盖splitChunks中的选项
				// default: false,
        vendors: { // 同一个chunk中引用的静态资源(lodash jquery)会独立到一个chunk中 异步加载模块中的资源的会产生第二个chunk
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: { // 
					minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
		},
	},
};
