# Html5

[参考文档](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

## 目录
- [html的标签](#html的标签)
- [html知识盲点](#html知识盲点)
	- [html5新增的drop和drag](#html5新增的drop和drag)
	- [html5中event事件对象的dataTransfer对象](#html5中event事件对象的dataTransfer对象)
	- [html5中的URL.createObjectURL()](#html5中的URL.createObjectURL())
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

### html5中的URL.createObjectURL()

1.  我们可以通过URL.createObjectURL()来在前端创建以url形式访问的文件对象，URL是全局变量，可以直接使用或者通过window.URL来调用。
2. createObjectURL()的入参可以为File、Blob、MediaStream, 或者 MediaSource等object，常用File和Blob。
3. 通常情况下URL.createObjectURL()可使用于两种情况
	* 上传图片的预览
		* 通过type为file的input选择文件，通过URL.createObjectURL()将该File对象转成url访问的对象。
		* 将此对象赋值给img标签的src属性，即可通过img预览此File文件
	* 将以restful形式get到的json格式数据转换成文件格式下载
		* 首先api请求get到json数据
		* 将该数据通过new Blob()的方式生成blob对象
		* 将此对象赋值传入给createObjectURL()转换
		* 最后将转换的值赋值给a标签，a标签要附带属性download
4. 其实以上两种使用场景还可以通过[File Reader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)对象来实现，File Reader有文件读取不同阶段的触发事件，如，FileReader.onload。还有读取文件的不同种格式，如可实现以上两种场景的[FileReader.readAsDataURL()](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL)，结合这两种手法也可以实现上传下载。

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
		
