const merge = require("webpack-merge");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
	devtool: "source-map",
	mode: "production",
	plugins: [new BundleAnalyzerPlugin()],
});
