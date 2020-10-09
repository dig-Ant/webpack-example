const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/main.js",
	output: {
		// path.resolve  解析相对路径为绝对路径
		// path: path.resolve('./dist'),
		// path.join 拼接相对路径为绝对路径
		path: path.join(__dirname, "./dist"),
		filename: "cutom.js",
	},
	plugins: [
		new HtmlWebpackPlugin({
			// filename: "index.html", // 生成文件名
			// template: "./src/index.html", // 参照的模板
			// templateParameters: {// html-loader 导致失效
			// 	'ddd': 'dds'
			// },
			// title: 'nihao', // html-loader 导致失效
			// chunks: ["index", "other"], // 可以控制css引入?
			// inject: true, // true head body false true和body:所有JavaScript资源插入到body元素的底部 false不插入 head插入到head
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
				// use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"], // 使用MiniCssExtractPlugin提取独立css文件
			},
			{
				test: /\.less$/,
				use: ["style-loader", "css-loader", "less-loader"],
				// use: [
				// 	MiniCssExtractPlugin.loader,
				// 	"css-loader",
				// 	"postcss-loader",
				// 	"less-loader",
				// ],
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
	mode: "production",
	// watch: true,
};
