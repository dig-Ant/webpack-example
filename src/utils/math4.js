// TODO tree shaking 没有引用的就不会被打包
import s from 'lodash';
export const add = (a, b) => {
	console.log("我是add4",s, minus);
	return a + b;
};

export const minus = (a, b) => {
	console.log("我是minus4");
	return a - b;
};
