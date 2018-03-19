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

### 2. 如何在vue和react等单页面中引入第三方js

1. 首先在html中引入需要引入的第三方js
2. 恰当的运用webpack的externals属性
3. 在需要引入的组件内引入该第三方组件，通过import 引入
4. 该组件内就可以直接使用了
![](externals.png)


