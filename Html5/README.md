# Html5

[参考文档](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

## 目录
- [html的标签](#html的标签)
- [html知识盲点](#html知识盲点)
	- [html5新增的drop和drag](#html5新增的drop和drag)
	- [html5中event事件对象的dataTransfer对象](#html5中event事件对象的dataTransfer对象)
- [html新增的属性](#html新增的属性)


## html的标签

### <nav>

### <header>

### <section>

## html知识盲点

### input标签checkbox和radio

* radio

	* radio为单选框，它有name属性，规定具有相同name属性的radio为一个组，只能选择其中的一个
	* radio有checked属性，用来设置默认选择项
	* radio配合的js操作一般绑定change事件，通过input对象的checked属性为true/false来做需求开发
	* radio有value属性，可以给该radio设置值，辅助js操作
	
* checkbox

	* checkbox为多选框，它有name属性，规定具有相同name属性的checkbox为一个组
	* radio有checked属性，用来设置默认选择项
	* radio配合的js操作一般绑定change事件，通过input对象的checked属性为true/false来做需求开发
	* radio有value属性，可以给该checkbox设置值，辅助js操作

## html新增的属性

### html5新增的drop和drag

[测试用例](https://github.com/BranHu/myblog/blob/master/Html5/drag-drop.html)

    * 拖拽的元素必须添加的属性和事件
	
        * draggable = true
        * ondragstart事件，这里用到了event事件对象的dataTransfer对象的setData方法
        * ondrag事件
		
    * 接收的元素必须添加的属性和事件
	
        * ondragover事件
        * ondrop事件，这里用到了event事件对象的dataTransfer对象的getData方法接收setData传递过来的信息
		
    * 其他事件
        * ondragenter事件
        * ondragleatve事件
        * ondragend事件
        * ondragexit事件
		
### html5中event事件对象的dataTransfer对象
		
	
