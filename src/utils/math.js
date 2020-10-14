// TODO tree shaking 没有引用的就不会被打包
import s from "lodash";
import s1 from "../index1";

import { add as add1 } from "./math1";
import { add as add2 } from "./math2";
import { add as add3 } from "./math3";
import { add as add4 } from "./math4";
// import(
// 	/* webpackChunkName: "math1" */ /* webpackPreFetch: true */ "./math1"
// );
// import(
// 	/* webpackChunkName: "math2" */ /* webpackPreFetch: true */ "./math2"
// );
// import(
// 	/* webpackChunkName: "math3" */ /* webpackPreFetch: true */ "./math3"
// );
// import(
// 	/* webpackChunkName: "math4" */ /* webpackPreFetch: true */ "./math4"
// );
export const add = (a, b) => {
	console.log("我是add", s,s1, add1, add2, add3, add4, minus);
	return add1(a, b) + add2(a, b) + add3(a, b) + add4(a, b);
};

export const minus = (a, b) => {
	console.log("我是minus");
	return a - b;
};
