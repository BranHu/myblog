# ECMAScript 6

[参考文档](http://es6.ruanyifeng.com/#README)

## 目录
- [箭头函数](#箭头函数)
- [模板字符串](#模板字符串)
- [promise](#promise)
- [generator](#generator)
- [class](#class类)

## 箭头函数 =>

#### 1.箭头函数中的this

* this对象的指向是可变的，但是在箭头函数中，它是固定的。
* this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。
* 测试见[es6.html](https://github.com/BranHu/myblog/master/ES6/es6.html)
    
#### 2.不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误

#### 3.不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替

#### 4.不可以使用yield命令，因此箭头函数不能用作Generator函数

## 模板字符串 \` \`

#### 1.标签内写入事件

```
var html = `<div onclick='click(event,"${this.attr}")'></div>`
```

#### 2.标签内写入样式和class均不需要再加''

#### 3.如果大括号中的值不是字符串，将按照一般的规则转为字符串

#### 4.因此如果大括号内部是一个字符串，将会原样输出

#### 5.模板字符串之中还能调用函数(函数要有返回值)

## class
详见 [es6](https://github.com/BranHu/myblog/master/ES6/es6.html) 和 [es6(1)](https://github.com/BranHu/myblog/master/ES6/es6(1).html)


