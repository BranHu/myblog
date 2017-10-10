# WEBPACK

[参考文档](https://webpack.js.org/api/)
 
## 目录

- [vue中涉及到的Webpack知识点](#vue中涉及到的Webpack知识点)

## vue中涉及到的Webpack知识点

### 1. webpack中的Node API

* webpack()
	* webpack({}, callback),两个参数，第一个是webpack configuration对象，后面一个是回调函数
	* webpack({}, callback)如果没有callback，则会返回一个compiler instance，一般使用方式是  const compiler = webpack(configuration)
	
* compiler instance

* 配合express中的 app.use()

	* app.use([path,] callback [, callback...])
	* path 符合要求就触发回调函数，如果没有path则立即调用

* webpack Dev Middleware


