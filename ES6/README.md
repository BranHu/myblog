# ECMAScript 6

[参考文档](http://es6.ruanyifeng.com/#README)

## 目录
- [箭头函数](#箭头函数)
- [模板字符串](#模板字符串)
- [promise](#promise)
- [generator](#generator)
- [class](#class类)
- [fetch](#fetch)

## 箭头函数

#### 1.箭头函数中的this

* this对象的指向是可变的，但是在箭头函数中，它是固定的。
* this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。
* 测试见[es6.html](https://github.com/BranHu/myblog/blob/master/ES6/es6.html)
    
#### 2.不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误

#### 3.不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替

#### 4.不可以使用yield命令，因此箭头函数不能用作Generator函数

## 模板字符串

#### 1.标签内写入事件

```
var html = `<div onclick='click(event,"${this.attr}")'></div>`
```

#### 2.标签内写入样式和class均不需要再加''

#### 3.如果大括号中的值不是字符串，将按照一般的规则转为字符串

#### 4.因此如果大括号内部是一个字符串，将会原样输出

#### 5.模板字符串之中还能调用函数(函数要有返回值)

## promise

## generator

## class类

详见 [es6](https://github.com/BranHu/myblog/blob/master/ES6/es6.html) 和 [es6(1)](https://github.com/BranHu/myblog/blob/master/ES6/es6(1).html)

## fetch

#### fetch的作用就是代替ajax进行后台的交互

#### 获取数据get data

[参考blog](https://css-tricks.com/using-fetch/)

* fetch返回的是一个promise，即可以直接调用promise的then(fn(response))方法，response为请求返回的结果，json对象/xml/image，例子中可以看到json对象中有个body属性，我们获取的内容就在这个body中，它是一个readable stream

* 将返回的response转换为我们能操作的data数据，对应的返回数据的类型有如下方法

	* response.json

	* response.text

	* response.blob

#### 传送数据send data

* fetch('url',options)有两个入参，后面的options即是一个对象，来设置向后台请求是传递的数据，不设置options的话就相当于是get data了

* options的具体内容

	* 第一个option是请求的方法，post,get,del
	* 第二个option是headers，'Content-Type': 'application/json'
	* 第三个option是body，body的内容应该是字符串

* fetch的error

	* 在第一个then是没有catch error，需要用response的ok来进行判断
	* 如果想知道error的具体信息，可以充分对response这个返回的内容进行操作，如果是json对象的话，里面有status和statusText，具体描述了相应的结果

