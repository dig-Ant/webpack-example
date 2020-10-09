// export default "我是index1133";

// import { add, minus } from "./math";
// async function treeShaking() {
// 	const a = 1 + 1 + 1;
// 	const b = 1 + 1 + 0;

// 	console.log('add--1',add(a, b)); // 打包时只会把add打包进去 minus没有使用不会打包进boundle
// 	console.log('add--1',add(a+1, b)); // 打包时只会把add打包进去 minus没有使用不会打包进boundle
// 	console.log('add--1',add(a+2, b)); // 打包时只会把add打包进去 minus没有使用不会打包进boundle
// 	console.log('add--1',add(a+3, b)); // 打包时只会把add打包进去 minus没有使用不会打包进boundle
// 	console.log('add--1',add(a, b)); // 打包时只会把add打包进去 minus没有使用不会打包进boundle
// 	// 上面的add只使用了一次 所以会被直接打包到一个函数中

// 	// 动态引入会生成独立的chunk 包含完整的代码没有办法tree shaking
// 	// const math = await import(/* webpackChunkName: "math" */ /* webpackPreFetch: true */'./math');
// 	// console.log("add-", math.add(a, b));
// 	// console.log("add-", math.add(a, a));
// }
// treeShaking();

export default {
	a: 1,
};
