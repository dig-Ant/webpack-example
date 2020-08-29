const merge = require("webpack-merge");
const webpack = require("webpack");
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
});
