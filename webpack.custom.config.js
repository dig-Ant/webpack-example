const path = require("path");
module.exports = {
	entry: "./src/main.js",
	output: {
		// path.resolve  解析相对路径为绝对路径
		// path: path.resolve('./dist'),
		// path.join 拼接相对路径为绝对路径
		path: path.join(__dirname, "./dist"),
		filename: "cutom.js",
	},
	mode: "production",
	watch: true,
};
