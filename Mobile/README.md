# Mobile

[参考文档]()

## 目录
- [移动端的基础知识](#移动端的基础知识)
	- [移动端适配](#移动端适配)


## 移动端的基础知识

### 移动端适配

* [几个概念](http://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651553236&idx=1&sn=45e4c1787c80b1479dd037381246c54c&chksm=8025aa15b7522303c8fa368e65f246dd399c0ac13570bec8b54c542182f41cdbb9931d80dfbd&scene=21#wechat_redirect)
	1. 设备像素。设备固有的像素，为固定值。
	2. 设备像素比DPR。设备像素比(DPR) = 设备像素个数 / 理想视口CSS像素个数(device-width)
	3. css像素。为可变值，取决于手机屏幕特性和用户缩放。
	4. 布局视口。PC端只有一个视口，视口宽度 = 浏览器宽度，而手机端要想显示PC端的页面，其布局视口比视觉视口要大得多。并且css依据布局视口来计算。
	5. 视觉视口。用户正在看到网站的区域
	6. 理想视口。理想视口的尺寸因设备和浏览器的不同而不同。下面的width为布局视口，device-width为理想视口。
	```javascript
	<meta name="viewport" content="width=device-width"/>
	```
	7. 注：当我们打开调试工具的时候，显示出的类似如 320*568 的等等就是理想视口device-width，并且DPR是设备固定下来的

* meta标签

	```javascript
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
	```
	* width：设置布局视口的宽
	* init-scale：设置页面的初始缩放程度
	* minimum-scale：设置了页面最小缩放程度
	* maximum-scale：设置了页面最大缩放程度
	* user-scalable：是否允许用户对页面进行缩放操作

* 媒体查询

```css
@media 媒体类型 and (视口特性阀值) {
	// 满足条件的css样式代码
}
```

```css
@media all and (min-width: 321px) and (max-width: 400px){
    .box{
        background: red;
    }
}
```

* rem
1. rem是相对尺寸单位，相对于html标签字体大小的单位，举个例子：如果html的font-size = 18px;那么1rem = 18px，需要记住的是，rem是基于html标签的字体大小的。

2. [两种利用rem在移动端适配不同设备的方法](http://hcysun.me/2015/10/19/%E4%B8%80%E7%AF%87%E7%9C%9F%E6%AD%A3%E6%95%99%E4%BC%9A%E4%BD%A0%E5%BC%80%E5%8F%91%E7%A7%BB%E5%8A%A8%E7%AB%AF%E9%A1%B5%E9%9D%A2%E7%9A%84%E6%96%87%E7%AB%A0-%E4%BA%8C/)