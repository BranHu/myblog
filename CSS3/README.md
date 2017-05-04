# CSS3

[参考文档](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)

## 目录
- [元素位置重叠的问题](#元素位置重叠的问题)
- [flex](#flex)
- [css中的选择器](#css中的选择器)
- [css中的属性](#css中的属性)
- [css中的技巧](#css中的技巧)

## 元素位置重叠的问题

### 1.元素位置重叠的背景常识

html文档中的元素默认处于普通流（normal flow）中，也就是说其顺序由元素在文档中的先后位置决定，此时一般不会产生重叠（但指定负边距可能产生重叠）。当我们用css为某个元素指定float浮动或者position定位后，元素的定位将会依情况发生如下改变：

* 指定float值left/right
    * 行内元素也会隐形变成块元素，元素会脱离文档的普通流，向左或右浮动，直到其外边缘碰到包含框或另一个浮动框
    
* 指定position值relative
    * 可以相对于其在普通流中的位置偏移，原本所占的空间仍保留。
    
* 指定position值absolute
    * 行内元素也会隐形变成块元素，元素会脱离文档的普通流，相对于最近的已定位祖先元素偏移，如果元素没有已定位的祖先元素，那么它的位置相对于最初的包含块偏移。
    
* 指定position值fixed
    * 元素会脱离文档的普通流，相对于浏览器窗口偏移，固定在浏览器的某个位置。

以上四种情况下，文档中的元素都将可能被浮动/定位元素覆盖产生重叠。

### 2.元素位置重叠的可能原因

* 负边距/float浮动
    * margin为负值时元素会依参考线向外偏移。margin-left/margin-top的参考线为左边的元素/上面的元素（如无兄弟元素则为父元素的左内侧/上内侧）,margin-right和margin-bottom的参考线为元素本身的border右侧/border下侧。一般可以利用负边距来就行布局，但没有计算好的话就可能造成元素重叠。堆叠顺序由元素在文档中的先后位置决定，后出现的会在上面。
浮动元素会脱离文档的普通流，可能覆盖或遮挡掉文档中的元素。

* position的relative/absolute/fixed定位 
    * 当为元素设置position值为relative/absolute/fixed后，元素发生的偏移可能产生重叠，且z-index属性被激活。z-index值可以控制定位元素在垂直于显示屏方向（Z 轴）上的堆叠顺序（stack order），值大的元素发生重叠时会在值小的元素上面。
    
* window窗口元素引发的重叠
    * 浏览器解析页面时，先判断元素的类型：窗口元素优于非窗口元素显示（也就是窗口元素会覆盖在其它非窗口元素之上，同为非窗口类型才能在激活z-index属性控制堆叠顺序。

### 3.浅说position定位及z-index使用

* 使用前提
    * z-index只能在position属性值为relative或absolute或fixed的元素上有效。
    
* 基本原理
    * z-index值可以控制定位元素在垂直于显示屏方向（Z 轴）上的堆叠顺序（stack order），值大的元素发生重叠时会在值小的元素上面。
    
* 使用的相对性
    * z-index值只决定同一父元素中的同级子元素的堆叠顺序。父元素的z-index值（如果有）为子元素定义了堆叠顺序（css版堆叠“拼爹”）。向上追溯找不到含有z-index值的父元素的情况下，则可以视为自由的z-index元素，它可以与父元素的同级兄弟定位元素或其他自由的定位元素来比较z-index的值，决定其堆叠顺序。同级元素的z-index值如果相同，则堆叠顺序由元素在文档中的先后位置决定，后出现的会在上面。
    
    * 所以如果当你发现一个z-index值较大的元素被值较小的元素遮挡了，请先检查它们之间的dom结点关系，多半是因为其父结点含有激活并设置了z-index值的position定位元素。
    
    * 也因为这个相对性，还会引发浏览器表现不一致出现兼容问题。原因是ie6、7下面position值为非static的元素在未设置z-index值的情况下都会被隐含添加z-index:0，而Firefox/Chrome等现代浏览器会遵循标准默认z-index:auto不会产生值。
    
    * 还一点需要注意，负值的z-index也依照大小比较的原理，但一般来说负值的z-index会被透明的body覆盖导致点击等事件响应出现问题，请谨慎使用。
    
### 4.简单总结及建议

* 普通元素的堆叠顺序由元素在文档中的先后位置决定，后出现的会在上面，请小心计算好浮动和负边距布局，注意窗口元素的特殊性；非同级关系和非父子关系定位元素之间的堆叠顺序，要向上追溯到其为兄弟关系的父元素上，先比较其z-index值，只有父辈元素中的z-index值较大的后代子元素才能超过z-index值较小的父辈元素及其子孙元素。

* 为了在编码时就减少z-index值判断的复杂性，我建议对于一般页面内容类定位元素的z-index设置小于99的值（如非必要不使用负值），广告类定位元素的z-index设置100～500的值，公告提示等弹出类定位元素的z-index设置大于500的值；对于比较复杂定位嵌套页面，为了避免ie6/7的显示差异，请为父辈类定位元素显性加上z-index:0或其他值。

## flex

[参考资料](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

* display: flex
    
* flex-direction

    * row | row-reverse | column | column-reverse
    
* flex-wrap

    * nowrap | wrap | wrap-reverse

* flex-flow
    
    * 是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap
    
* justify-content

    * flex-start | flex-end | center | space-between | space-around
    
* align-items

    * flex-start | flex-end | center | baseline | stretch
    
* align-content

    * flex-start | flex-end | center | space-between | space-around | stretch

## css中的选择器

### 1.first-of-type 和 nth-of-type(1)

* 使用该属性做选择器需要元素都是兄弟元素才行

### 2.+,~选择器

* \+
    * 选择相邻兄弟节点。如果需要选择紧接在另一个元素后的元素，而且二者有相同的父元素，可以使用相邻兄弟选择器。
    
* ~
    * 作用是查找某一个指定元素的后面的所有兄弟结点。
    
## css中的属性

### 1.border-top-left-radius

* 可以控制部分角倒角，其他角不倒角

### 2.overflow

* visible
    * 默认值。内容不会被修剪，会呈现在元素框之外。
    
* hidden
    * 内容会被修剪，并且其余内容是不可见的。
    
* scroll
    * 内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。
    
* auto
    * 如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。
    
* inherit
    * 规定应该从父元素继承 overflow 属性的值。
    
### 3.background-size

* cover
    * 调整背景图片的宽度或高度（较小者，会有不显示的），以铺满整个元素，保持背景图片的宽高比
    
* contain
    * 调整背景图片的宽度或高度（较大者，会存在白边），使背景图片完全包含在元素中，保持背景图片的宽高比

* x,y
    * 通过x,y的值直接对背景图片进行定位
    
## css中的技巧

### 1.字体的两端对齐

* text-align:justify;text-justify:distribute-all-lines;text-align-last

### 2.自定义单选框

* 该样式用到了`<label>`的`for`属性，同时也运用到了伪类`::before`和`::after`,以及`:checked`选择器。详见[css3.html](https://github.com/BranHu/myblog/blob/master/CSS3/css3.html)
