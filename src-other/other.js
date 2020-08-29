import "./less/index.less";
// import '../src/less/index.less'
// console.log("$--", $);
// console.log("$--window", window.$);
window.onload = function () {
	document.querySelector("h1").style.color = "red";
	$("body img").css("height", "100").css("width", "100");
};
