# ECMAScript 6


## 目录
- 设计模式
  - [单例模式](https://github.com/BranHu/myblog/blob/master/DesginPatterns/single.html)
  - [策略模式](https://github.com/BranHu/myblog/blob/master/DesginPatterns/strategy.html)
  - [代理模式](https://github.com/BranHu/myblog/blob/master/DesginPatterns/proxy.html)
  - [发布-订阅模式](https://github.com/BranHu/myblog/blob/master/DesginPatterns/abserver.html)
  - [模板方法模式](https://github.com/BranHu/myblog/blob/master/DesginPatterns/TemplateMethod.html)
  - [享元模式](https://github.com/BranHu/myblog/blob/master/DesginPatterns/flyweight.html)
  - [中介者模式](https://github.com/BranHu/myblog/blob/master/DesginPatterns/mediator.html)
  - [装饰者模式](https://github.com/BranHu/myblog/blob/master/DesginPatterns/decorator.html)
	
- 设计原则
  - [单一职责原则](#单一职责原则)
  - [最少知识原则](#最少知识原则)
  - [开放封闭原则](#开放封闭原则)
	
	
## 设计原则

### 单一职责原则

* 一个对象/方法只做一件事件，让其担任的职责尽量简化

* 单一职责原则指导我们把对象划分为较小的粒度，提高对象的可复用性

* 何时该分离
	* 并不是所有的职责都改一一分离
	* 若随着需求的变化，有两个职责总是同时变化，那就不必分离他们
	* 两个职责虽耦合在一起，但是它们没有发生变化的征兆，就没有必要主动分离它们

### 最少知识原则

* 一个软件实体(包含对象、系统、类、模块、函数等等)应当尽可能少地与其他实体发生相互作用

* 最少知识原则要求我们在设计程序时，尽量减少对象之间的交互

* 解决的方式通常是引入第三方对象来承担所有的通信任务

### 开放封闭原则

* 当需要改变一个程序的功能或者给这个功能增加新功能的时候，可以使用增加代码的方法，但是不允许改动程序的源代码

* 用对象的多态性消除条件分支

* 找出变化的地方

	* 放置挂钩
		* 放置钩子是隔离变化的一种常见手段
		* 添加一个方法 return true/false
		* 运用的时候进行判断
	
	* 使用回调函数