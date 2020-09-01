const merge = require("webpack-merge");
const webpack = require("webpack");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
	mode: "production",
	// devtool: "source-map",
	devtool: "cheap-module-source-map",
	// devtool: "eval-cheap-module-source-map",
	// devtool: 'cheap-module-source-map'

	plugins: [
		new webpack.DefinePlugin({
			IS_DEV: "false",
		}),
	],

	optimization: {
		minimizer: [
			new TerserJSPlugin({
				// parallel: true,
				// sourceMap: true,
				// terserOptions: {
				// 	output: {
				// 		comments: false
				// 	}
				// },
				extractComments: false// 取消评论文件
			}),
			new OptimizeCSSAssetsPlugin({}),
		],
	},
});
