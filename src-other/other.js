import "./less/index.less";
// import '../src/less/index.less'
// import $ from "jquery"; // node_modules/jquery/package.json > main
// TODO codeSplitting 相关 other.js  main.js 多入口
// 都引入相同文件时会重复打包 比如jquery 会在两个boundle中都把jquery打包进去
// 需要在optimization中 splitChunks {chunks: 'all'}
console.log("$--", $);
// console.log("$--window", window.$);

// import { add, minus } from "../src/utils/math";
// console.log('add---',add);

window.onload = function () {
	console.log('other onload11');
	document.querySelector("h1").style.color = "red";
	$("body img").css("height", "100").css("width", "100");
};
// import lodash from 'lodash';
async function a() {
	// const { default: _ } = await import(
	// 	/* webpackChunkName: "lodash" */ /* webpackPrefetch: true */ "lodash"
	// );
		// console.log('lodash',lodash)
}
// a();