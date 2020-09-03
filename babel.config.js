module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["@babel/env"],
		plugins: [
			"@babel/plugin-proposal-class-properties",
			"@babel/plugin-transform-runtime",
			"@babel/plugin-syntax-dynamic-import"
		],
	};
};
