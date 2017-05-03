# ECMAScript 6

[参考文档](http://es6.ruanyifeng.com/#README)

## 目录
- [箭头函数](#箭头函数)
- [模板字符串](#模板字符串)
- [promise](#promise)
- [generator](#generator)
- [class](#class类)

## 箭头函数

* 1.箭头函数中的this

    * this对象的指向是可变的，但是在箭头函数中，它是固定的。
    * this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。
    * 测试见[es6.html](https://github.com/BranHu/myblog/master/ES6/es6.html)
         
    ```
    // ES6
    function foo() {
      setTimeout(() => {
        console.log('id:', this.id);
      }, 100);
    }
    function foo() {
      var _this = this; 

      setTimeout(function () {
        console.log('id:', _this.id);
      }, 100);
    }
    ```



