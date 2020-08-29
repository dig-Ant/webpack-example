// TODO tree shaking 没有引用的就不会被打包

export const add = (a, b) => {
	console.log("我是add");
	return a + b;
};

export const minus = (a, b) => {
	console.log("我是minus");
	return a - b;
};
