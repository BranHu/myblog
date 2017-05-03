# Highchart-interpretation

详见 [Highchart解析](https://github.com/BranHu/myblog/blob/master/Highcharts/highcharts.bran.js)

## 目录

- [Hightchart的结构](#Hightchart的结构)

## Highchart的结构

* Hightchart的结构就是一个大的复杂的IIFE，类似于jquery，这是一般的库都会采用的形式，如下。IIFE的第一个入参root是用来判断环境的，如果是在node环境下就通过module.export输出Highchart，如果是浏览器环境下则将Highchart当做window的属性，即全局变量。IIFE的第二个入参即factory在匿名函数执行传入的是一个函数，它的返回值在代码的最后一行即Highchart。核心的代码也都在这个函数内。

  ```
  (function(root,factory){....}(typeof window !== 'undefined' ? window : this,function(){
      var Highchart = (function(){}());
      //核心代码都是以如下形式
      (functioin(H){...}(Highchart))
      return Highchart
  }))
  ```

* 核心代码都是通过IIFE来构建的，有模块的思想。而且仅输出一个Highchart全局变量，其他的各类对象都构建在Highchart下面作为他的属性

  ```
  (functioin(H){...}(Highchart))
  ```

* IIFE3，SVGElement对象

* IIFE8，Axis对象

* IIFE11，pointer对象

* IIFE15，chart对象

* IIFE16，Point对象
