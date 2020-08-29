// TODO 可以在入口文件引入 有点大 一般不用
// import "@babel/polyfill";
import $ from "jquery"; // node_modules/jquery/package.json > main
import str from "./index1";
import "./css/index.css";
import "./css/b.css";
import "./less/index.less";

// console.log("$--", $); //配置webpack.ProvidePlugin 在每个模块头部引入
// console.log("$--window", window.$); // 配置expose-loader 需要在页面引入一次
$("body").css("backgroundColor", "green");

// TODO 以下代码会被babel编辑
function test() {
	class Aa {
		constructor(props) {
			this.name = props.a;
		}
		fil = "泽";
		say = () => {
			console.log("say--1");
		};
	}
	const s = new Aa({ a: "yang" });
	setTimeout(() => {
		console.log("定时器 1秒后执行");
	}, 1000);
	console.log("sss", s);

	function* fn() {
		yield "nihao";
		yield 2;
		return 3;
	}
	const ss = fn();
	console.log(ss.next());
	console.log(ss.next());
	console.log(ss.next());
	const str = "abc";
	console.log("includes", str.includes("b"));
}
// test()

// 创建一个 button
// TODO webpackChunkName webpackPrefetch webpackPreload 区别
// webpackChunkName 在 import 的括号里 加注释 /* webpackChunkName: "lodash" */ ，为引入的文件取别名
//preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
// preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
// preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻
function test1() {
	let btn = document.createElement("button");
	btn.innerHTML = "click me";
	document.body.appendChild(btn);

	// 异步加载代码
	async function getAsyncComponent() {
		var element = document.createElement("div");
		const { default: _ } = await import(
			/* webpackChunkName: "lodash" */ /* webpackPrefetch: true */ "lodash"
		);

		element.innerHTML = _.join(["Hello!", "dynamic", "imports", "async"], " ");

		return element;
	}

	// 点击 button 时，懒加载 lodash，在网页上显示 Hello! dynamic imports async
	btn.addEventListener("click", () => {
		getAsyncComponent().then((component) => {
			document.body.appendChild(component);
		});
	});
}
// test()

// TODO 插件 webpack.DefindPlugin 添加环境变量 测试请求api
// import { getUserInfo } from "./api/http";
// console.log('IS_DEV',typeof IS_DEV,typeof test,typeof test1); // boolean number string
// console.log('----process',process.env.NODE_ENV);
// getUserInfo()
// 	.then(() => {})
// 	.catch((e) => {
// 		console.log("err getUserInfo:", e);
// 	});

// TODO 跨域处理
// 方案一: 后端使用cors 添加response头 Access-Control-Allow-Origin 前端无感
// 方案二: 使用devServer中的proxy
// import axios from "axios";
// axios.get("/api/getUserInfo").then((res) => {
// 	console.log("res---", res);
// });

// TODO 热模块更替 热更新
function test2() {
	if (module.hot) {
		module.hot.accept("./index1.js", async () => {
			const s = await import("./index1");
			console.log("str new ---", s);
		});
	}
}
// test2();

// TODO mode: production 模式下自带使用了 1.tree shaking 2. scope hoisting(webpack.optimize.ModuleConcatenationPlugin()插件) 3. uglifyJsPlugin插件进行混淆压缩
// TODO tree shaking优化 
// 通常用于打包的时候移除javascript汇总的未引用的代码(dead-code), 它依赖于ex6模块系统中的 import 和 export 的静态结构特性.
// 开发时引入一个模块后, 如果只使用其中的一个功能, 上线打包时只会把用到的功能打包进boundle,其他没有用到的功能都不会打包进来
// TODO scope hoisting 
// 将模块之间的关系进行结果推测, 可以让打包出来的文件更小,运行更快  也依赖ex6模块系统中的 import 和 export 的静态结构特性.
// 原理: 分析出模块之间的依赖关系, 尽可能的把大蒜的木块合并到一个函数中去,但前提是不能造成代码冗余.因此只有被引用了一次的模块才能被合并.

// const math = require('./math'); // 不会进行 tree shaking
import { add, minus } from "./utils/math";
async function treeShaking() {
	// const a = 1 + 1 + 1;
	// const b = 1 + 1 + 0;

	console.log('add--',add(1,2)); // 打包时只会把add打包进去 minus没有使用不会打包进boundle
	// 上面的add只使用了一次 所以会被直接打包到一个函数中
	
	// 动态引入会生成独立的chunk 包含完整的代码没有办法tree shaking
	// const math = await import(/* webpackChunkName: "math" */ /* webpackPreFetch: true */'./math');
	// console.log("add-", math.add(a, b));
	// console.log("add-", math.add(a, a));
}
// treeShaking();
 