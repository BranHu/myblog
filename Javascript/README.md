# JavaScript

[参考文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)

## 目录

- [基础知识](#基础知识)
- [事件](#事件)
- [方法](#方法)
  - [数组的方法](#数组的方法)
  - [字符串的方法](#字符串的方法)
  - [其他常用的方法](#其他常用的方法)
- [创建对象的方法](#创建对象的方法)
- [设计模式](#设计模式)
- [正则表达式](#正则表达式)

## 基础知识
### 1.undefined
* 变量被声明了，但没有赋值时，就等于undefined
* 调用函数时，应该提供的参数没有提供，该参数等于undefined
* 对象没有赋值的属性，该属性的值为undefined
* 函数没有返回值时，默认返回undefined

### 2.&&和||
*  "&&" 运算遇到false就返回 "||"运算遇到true就返回
![](eg6.png)
![](eg6.png)

### 3.词法作用域及闭包
* JS作用域
    * JS引擎：从头到尾负责整个Javascript程序的编译及执行过程
    * context<br>
    ![](context.png)
    ![](context2.png)
    * 编译器：分词/词法分析（词法单元）、解析/语法分析（抽象语法树AST）、代码生成（将AST转为机器指令）
    * 变量的赋值操作：首先编译器会在当前作用域中声明一个变量，然后在运行时引擎会在作用域中查找该变量，如果能够找到就会对他赋值
    * for<br>
    ![](for.png)
    ![](for-answer.png)
* 闭包记住两种情况，一个是函数当作值传递，一个是返回函数

* 若想利用单例形成闭包需要在全局作用域下，如果在一个函数作用域内是形成不了的

### 4.this
* 默认绑定
* 隐式绑定
* 显示绑定
* new绑定

### 5.理解异步编程

[http://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html](http://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html) 
[http://developer.51cto.com/art/201609/516971.htm](http://developer.51cto.com/art/201609/516971.htm)<br>
[https://segmentfault.com/a/1190000002999668](https://segmentfault.com/a/1190000002999668)

### 6.argument

### 7.Object.assign()

* Object.assign()方法可以将多个对象的属性值拷贝到target对象上，并且返回target

* 如果拷贝的属性值名有相同的，则会覆盖，即Merging objects with same properties

* 拷贝的值要是可枚举的，如果设置某值不枚举，则不会被拷贝

* source对象中的属性值是基本类型的该方法会将他直接赋给target对象

* source对象中的属性值是对象的(引用类型)，该方法采用的是浅拷贝(地址)，因此如果改变源对象source中的对象属性中某个值，那么target中的该对象属性也会相应的改变

* deep clone的方法为JSON.parse(JSON.stringify(obj1))，即将源对象进行一个转换(obj->string->obj)后再赋值

* 语法

```javascript
Object.assign(target,...source)
```

[参考资料](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

### 8.Object.defineProperty()

* 语法

```javascript
Object.defineProperty(obj, prop, descriptor)
```

* descriptor是一个对象{},其中包含了configurable,enumerable,value,writable,get,set等设置属性

[参考资料](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

### 9.浅拷贝和深拷贝

* 一般的对象赋值是浅拷贝
* 深拷贝的方法
	* JSON.parse(JSON.stringify(obj1)),这种方法会丢失了对象的constructor属性
	* 第二种方法clone对象
	```javascript
	function clone(obj) {
		// Handle the 3 simple types, and null or undefined
		if (null == obj || "object" != typeof obj) return obj;

		// Handle Date
		if (obj instanceof Date) {
			var copy = new Date();
			copy.setTime(obj.getTime());
			return copy;
		}

		// Handle Array
		if (obj instanceof Array) {
			var copy = [];
			for (var i = 0, var len = obj.length; i < len; ++i) {
				copy[i] = clone(obj[i]);
			}
			return copy;
		}

		// Handle Object
		if (obj instanceof Object) {
			var copy = {};
			for (var attr in obj) {
				if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
			}
			return copy;
		}

		throw new Error("Unable to copy obj! Its type isn't supported.");
	}
	```
	



### 10. selectionStart

### 11. JS中递归算法运用for循环的注意点
（1）递归算法的关键点是函数调用自身，当函数中有return或者break的时候，只会跳出该次函数，但是母函数及祖先函数并不会跳出，会继续执行，直到继续执行完。

## 事件

### 1. onresize()
* onresize 事件会在窗口或框架被调整大小时发生。

### 2.oncontextmenu()
* oncontextmenu 事件在元素中用户右击鼠标时触发并打开上下文菜单。
* 例：<div oncontextmenu="myFunction()" contextmenu="mymenu">

### 3.事件可绑定多个函数
* 例如：onclick=“a();b();c()”,绑定的函数按顺序执行

### 4.keydown事件
* keydown事件触发针对不同的元素实现方法可能不一样，经过测验后在document、input、button上可以直接绑定，聚焦(鼠标点击)后即可触发
* 如果想让div、span等标签进行触发则需要在第一条的基础上(鼠标点击聚焦)给元素增加tabindex属性，那么就可以触发keydown事件函数

### 5.oninput事件
* oninput事件可以实时监听input标签输入内容的动作，输入即触发
* 运用oninput事件相比运用onchange事件的好处，onchange触发需要以下两个条件
    * 当input捕获到焦点后，系统储存当前值
	* 当input焦点离开后，判断当前值与之前存储的值是否不等，如果为true则触发onchange事件。
	
### 6.dblclick事件
* 若元素即绑定了dblclick事件又绑定了mousedown事件，则双击鼠标两者都会触发，mousedown事件会触发一次

## 方法

### 数组的方法

[参考文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
### 1.pop()

* pop() 方法用于删除并返回数组的最后一个元素
* arrayObject.pop()
* pop() 方法将删除 arrayObject 的最后一个元素，把数组长度减 1，并且返回它删除的元素的值。如果数组已经为空，则 pop() 不改变数组，并返回 undefined 值

### 2.shift()

* shift() 方法用于删除并返回数组的第一个元素
* arrayObject.shift()
* shift() 方法将删除 arrayObject 的第一个元素，把数组长度减 1，并且返回它删除的元素的值。如果数组已经为空，则 shift() 不改变数组，并返回 undefined 值

### 3.slice()

* slice() 方法可从已有的数组中返回选定的元素
* arrayObject.slice(start,end)
* 数组从0开始计数
* 不包含最后一个元素，即end对应的元素
* 不写end，即没有结尾，指一直到数组的最后一个元素且包含最后一个元素

### 4.join()

* 所的数组元素被转换成字符串，再用一个分隔符将这些字符串连接起来。如果元素是undefined 或者null， 则会转化成空字符串
* 例子
```javascript
var a = ['Wind', 'Rain', 'Fire'];
var myVar1 = a.join();      // myVar1的值变为"Wind,Rain,Fire"
var myVar2 = a.join(', ');  // myVar2的值变为"Wind, Rain, Fire"
var myVar3 = a.join(' + '); // myVar3的值变为"Wind + Rain + Fire"
var myVar4 = a.join('');    // myVar4的值变为"WindRainFire"
```

### 5.map()

* map() 方法返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组。
* map 方法会给原数组中的每个元素都顺序调用一次 callback 函数。callback 每次执行后的返回值（包括undefined组合起来形成一个新数组。 callback 函数只会在有值的索引上被调用；那些从来没被赋过值或者使用 delete 删除的索引则不会被调用。
* array.map(callback[, thisArg])
* 例：
```javascript
var numbers = [1, 4, 9];
var roots = numbers.map(Math.sqrt);
//roots的值为[1, 2, 3], numbers的值仍为[1, 4, 9]
```

### 6.forEach()

* 数组的迭代器，和map()类似，入参是一个回调函数（对数组的每个元素都会调用该元素）和一个可选的参数thisArg(用来显示的指定回调函数中的this)
* 主要需要研究回调函数
* 回调函数的第一个参数为当前元素，第二个元素为指数，第三个元素为该迭代的数组
* 语法
```javascript
arr.forEach(function callback(currentValue, index, array) {
    //your iterator
}[, thisArg]);
```

### 7.filter()

* 数组的过滤器(也是迭代器，一个个元素的比较)，入参是一个回调函数（对数组的每个元素都会调用该元素）和一个可选的参数thisArg(用来显示的指定回调函数中的this)
* 返回值就是过滤筛选出来的数组
* 回调函数的第一个参数为当前元素，第二个元素为指数，第三个元素为该迭代的数组
* 回调函数中要写return语句，且后面跟着一个判断的表达式，比如大于小于等于之类的
* 语法
```javascript
arr.filter(function callback(currentValue, index, array) {
    return currentValue == 1;
}[, thisArg]);
```

### 8.every()

* 数组的检查器(和filter比较类似)，入参是一个回调函数（对数组的每个元素都会调用该元素）和一个可选的参数thisArg(用来显示的指定回调函数中的this)
* 返回值是true和false
* 回调函数的第一个参数为当前元素，第二个元素为指数，第三个元素为该迭代的数组
* 回调函数中要写return语句，且后面跟着一个判断的表达式，比如大于小于等于之类的，用来测试每个元素是否符合要求
* 语法
```javascript
arr.filter(function callback(currentValue, index, array) {
    return currentValue == 1;
}[, thisArg]);
```

### 9.concat()

* concat() 方法将多个数组组合成一个
* new_array = old_array.concat(value1[, value2[, ...[, valueN]]])

### 10.fill()

* concat() 方法将一个数组内的元素部分进行替换，返回替换了的数组
* arr.fill(value)
* arr.fill(value, start)
* arr.fill(value, start, end)

### 11.find()

* find() 方法和filter方法类似，但是find是找到符合条件的第一个元素并返回该元素，相当于找到该元素就中断迭代了，而filter()是遍历，将全部的都寻找出来组成数组返回
* 语法
```javascript
arr.find(function callback(currentValue, index, array) {
    return currentValue == 1;
}[, thisArg]);
```

### 12.some()

* some() 方法和every()方法类似，不同处是只要arr中有一个元素符合条件的some的返回值就是true，而every却要保证所有的元素都要符合要求
* 语法
```javascript
arr.find(function callback(currentValue, index, array) {
    return currentValue == 1;
}[, thisArg]);
```

### 13.splice()

* splice()方法是向数组中添加元素或删除元素
* arr.sort()
* arr.sort(compareFunction)
* 入参start是数组操作的起点，入参deleteCount是要删除元素的个数，入参item是添加的元素

### 14.sort()

* sort()方法是将数组进行排序
* arr.sort()
* arr.sort(compareFunction)
* 如果没有compareFunction的时候，sort()方法比较的依据是将数组中的元素转换为字符串(不论是对象、整型还是浮点型)，依据字符串的unicode值来进行排序
* 如果有compareFuction，当compareFunction(a,b)的返回值<0时，a comes first，反之当compareFunction(a,b)的返回值>0时，b comes first，当相等时，a和b的位置保持不变

### 15.indexOf()

### 16.reverse()

### 17.includes()

### 18.reduce()

* 累计计算，将数组转换为单一的值(二维数组转换为一维数组)
* 入参为一个回调函数，callback(accumulator,currentValue,currentIndex,index)
* 语法
```javascript
arr.reduce(callback[, initialValue])

var result = [0, 1, 2, 3, 4].reduce( (prev, curr) => prev + curr );
```

### 字符串的方法

### 1.substr()

* stringObject.substr(start,length)
* substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符

### 2.substring()

* 和数组的slice类似
* 语法
```javascript
str.substring(indexStart[, indexEnd])
```

### 3.charAt()

* 返回特定位置上的字符,从0开始
* 语法
```javascript
str.charAt(index)
```

### 4.charCodeAt()

* 返回特定位置上的unicode码,即在charAt的基础上多了一个转unicode码的过程，从0开始
* 语法
```javascript
str.charCodeAt(index)
```

### 5.fromCharCode()

* fromCharCode()中的入参是Unicode码，方法调用后返回字符串
* fromCharCode()是String上的静态方法，不是原型上的，他会直接返回一个字符串，而不是一个字符串object
* 语法
```javascript
String.fromCharCode(num1[, ...[, numN]])
```

### 6.indexOf()

* indexOf()方法可返回某个指定的字符串值在字符串中首次出现的位置，当单个字符时与charAt方法相反，不过indexOf也可以是一个字符串
* 如果要检索的字符串值没出现，则该方法返回 -1
* 语法
```javascript
stringObject.indexOf(searchvalue,fromindex)
```

### 7.concat()

* concat()方法和数组的concat()的方法一致，将多个数组组合成一个
* 返回值为全部拼装完成的最终的那一个
* 语法
```javascript
str.concat(string2[, string3, ..., stringN])
```

### 8.split()

* split() 方法用于把一个字符串分割成字符串数组，有点反join()的意思
* 语法
```javascript
str.split([separator[, limit]])
```

### 9.macth()和正则对象的exec()

* macth()方法在str中查找正则的匹配，返回一个数组
* 如果有g全局标志,那么match()返回的数组保存的是所有匹配的内容，不包过子匹配(正则中含有子集( ))
* 如果没有g全局标志，macth()方法会进行子匹配(正则中含有子集( ))，那么返回的数组的第一个元素为匹配最完整的字符串，然后依次是子集，数组的第二个元素为匹配的第一个子集，数组的第三个元素为匹配的第二个子集，依次类推
* 语法
```javascript
str.match(regexp)
regexp.match(str)
```
* exec()方法和match()的作用类似，也是用来进行匹配的
* 如果正则没有子集，那么如果有匹配，他将返回一个只有一个元素的数组，这个数组唯一的元素就是该正则表达式匹配的第一个串，如果没有匹配则返回null
* exec永远只返回第一个匹配，即使是指定了g的情况下，而match在正则指定了g属性的时候，会返回所有匹配


### 10.replace()

* replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
* stringObject.replace(regexp/substr,replacement)
* 例：
```javascript
<script type="text/javascript">
var str="Visit Microsoft!"
document.write(str.replace(/Microsoft/, "W3School"))
</script>
```

### 11.search()和正则对象的test()

* search()方法是用来查找匹配的子字符串，返回值为stringObject 中第一个与 regexp 相匹配的子串的起始位置，没有则返回-1
* test()方法是是否存在匹配的子字符串，有的话返回true，没有的话返回false
* 语法
```javascript
str.search(regexp)
regexp.test(str)
```

### 其他常用的方法

### 1. Window.open()

* open() 方法用于打开一个新的浏览器窗口或查找一个已命名的窗口
* window.open(URL,name,features,replace)
* 注：open()中的入参代表意思以及窗口的一些属性配置（比如大小、位置）需详查W3C。另，窗口的属性可以在入参features中进行配置

### 2. dateObj.valueOf()

* Date的对象的valueOf()方法返回的是从1970年1月1日0时0分0秒到当前的毫秒数
* dateObj.valueOf()的作用和Date.prototype.getTime()方法一样

### 3. Object.keys(json)

* 如果想获取json的长度，像数组一样取length属性是不行的
* Object.keys(json)会将json的keys(属性)取出来，返回一个数组
```javascript
var json = {
	name: 'hujun',
	age: '29',
	hobby: 'basketball',
}
console.log(json.length);  //undefined
var arr = Object.keys(json);  //["name","age","hobby"]
console.log(arr.length)   //3
```

### 4.js减法的类型转换

* 如果两个操作符都是数值, 则执行常规的算术减法操作，并返回结果
* 如果有一个操作数是NAN， 则结果也是NaN
* 如果有一个操作数是字符串、布尔值、null、undefined则先在后台调用Number()方法将其转换为数值, 然后在根据根据前面的规则进行减法计算，如果转换的结果是NaN, 则减法的结果就是NaN。
* 如果有一个操作数是对象，则调用对象的 valueof() 方法以取得该方法返回后的值，如果得到的值是NaN,则减法的结果就是NaN, 如果对象没有valueOf()方法，则调用其toString()方法并将得到的字符串转为数值。

```javascript
var res = 5 - true;  //4    因为true被转换成1了
var res = NaN - 1;   //NaN
var res = 5 - 2;     //3
var res = 5 -"";    // 5    因为空字串被转换成0了
var res = 5 - "2";   //3   因为字符串2被转成数字2了
var res = 5 - null;   //5  因为null 被转换成数值0了

// 在js中null、""、false 都可以被转化成数字0
// undefined 转成数值是 NaN
```

### 5.instanceof()
* 在 JavaScript 中，判断一个变量的类型尝尝会用 typeof 运算符，在使用 typeof 运算符时采用引用类型存储值会出现一个问题，无论引用的是什么类型的对象，它都返回 “object”。这就需要用到instanceof来检测某个对象是不是另一个对象的实例。
另外，更重的一点是 instanceof 可以在继承关系中用来判断一个实例是否属于它的父类型。<br>例如：
```javascript
function Foo(){} 
Foo.prototype = new Aoo();//JavaScript 原型继承 
var foo = new Foo(); 
console.log(foo instanceof Foo)//true 
console.log(foo instanceof Aoo)//true
```

* 在多层继承关系中，instanceof 运算符同样适用
```javascript
console.log(Object instanceof Object);//true 
console.log(Function instanceof Function);//true 
console.log(Number instanceof Number);//false 
console.log(String instanceof String);//false 
console.log(Function instanceof Object);//true 
console.log(Foo instanceof Function);//true 
console.log(Foo instanceof Foo);//false
```

### 7.hasOwnProperty()

* 语法：object.hasOwnProperty(proName)

* hasOwnProperty() 方法用来判断某个对象是否含指定的自身属性。所继承了 Object.prototype 的对象都会从原型链上继承到 hasOwnProperty 方法，这个方法可以用来检测一个对象是否含有特定的自身属性，和in运算符不同，该方法会忽略掉那些从原型链上继承到的属性。

* 返回值：true/false

### 8.location()

<table>
    <th>
        <td>属性</td>
        <td>描述</td>
    </th>
    <tbody>
    <tr>
    <td>1</td>
        <td>hash</td>
        <td>设置或返回从井号 (#) 开始的 URL（锚）</td>
    </tr>
    <tr>
    <td>2</td>
        <td>host</td>
        <td>设置或返回主机名和当前 URL 的端口号</td>
    </tr>
    <tr>
    <td>3</td>
        <td>hostname</td>
        <td>设置或返回当前 URL 的主机名</td>
    </tr>
    <tr>
    <td>4</td>
        <td>href</td>
        <td>设置或返回完整的 URL</td>
    </tr>
    <tr>
    <td>5</td>
        <td>port</td>
        <td>设置或返回当前 URL 的端口号</td>
    </tr>
    <tr>
    <td>6</td>
        <td>pathname</td>
        <td>设置或返回当前 URL 的路径部分</td>
    </tr>
    <tr>
    <td>7</td>
        <td>protocol</td>
        <td>设置或返回当前 URL 的协议</td>
    </tr>
    <tr>
    <td>8</td>
        <td>search</td>
        <td>设置或返回从问号 (?) 开始的 URL（查询部分）</td>
    </tr>
    </tbody>
</table>

### 13.appendChild()
* appendChild() 方法向节点添加最后一个子节点
* 例：document.getElementById("myList").appendChild(newListItem)


### 16.JSON.parse(str)

* 将Json字符串转化为JS对象,下面的data_json已经是一个Json对象了

```javascript
data_json = JSON.parse(data);
```
### 17.JSON.stringfy(data_json)

* 将Json对象转化为字符串

## 创建对象的方法

### 1.工厂模式
![](factory.png)
### 2.构造函数模式
![](constructor.png)
### 3.原型模式
![](prototype.png)
### 4.构造和原型混合使用（这个比较常用），注意constructor
![](hybrid.png)

## 设计模式

### 1.单体模式、Module模式

* 最简单的单体实际上是一个对象字面量，创建私有成员的方法有
    * 用下划线表示
    * 用闭包
    
![](module.png)

### 2.构造器模式
### 3.单例模式

## 正则表达式
正则表达式要配合正则对象的一些方法和属性来使用，比如exec()

### 1.直接量语法
* /pattern/attributes

### 2.创建 RegExp 对象的语法
```javascript
//第一种
var a = new RegExp(pattern, attributes)
//第二种
var a = /pattern/attributes
```
### 3.修饰符
<table>
   <th>
   <td>修饰符</td>
   <td>描述</td>
   </th>
   <tr>
   <td>1</td>
   <td>i</td>
   <td>执行对大小写不敏感的匹配</td>
   </tr>
   <tr>
   <td>2</td>
   <td>g</td>
   <td>执行全局匹配</td>
   </tr>
   <tr>
   <td>3</td>
   <td>m</td>
   <td>执行多行匹配</td>
   </tr>
</table>

### 4.方括号
<table>
   <th>
   <td>表达式</td>
   <td>描述</td>
   </th>
   <tr>
   <td>1</td>
   <td>[abc]</td>
   <td>查找方括号之间的任何字符</td>
   </tr>
   <tr>
   <td>2</td>
   <td>[^abc]</td>
   <td>查找任何不在方括号之间的字符</td>
   </tr>
   <tr>
   <td>3</td>
   <td>[0-9]</td>
   <td>查找任何从 0 至 9 的数字</td>
   </tr>
   <tr>
   <td>4</td>
   <td>[a-z]</td>
   <td>查找任何从小写 a 到小写 z 的字符</td>
   </tr>
   <tr>
   <td>5</td>
   <td>[A-Z]</td>
   <td>查找任何从大写 A 到大写 Z 的字符</td>
   </tr>
   <tr>
   <td>6</td>
   <td>[A-z]</td>
   <td>查找任何从大写 A 到小写 z 的字符</td>
   </tr>
   <tr>
   <td>7</td>
   <td>[A-z]</td>
   <td>查找任何从大写 A 到小写 z 的字符</td>
   </tr>
   <tr>
   <td>8</td>
   <td>[adgk]</td>
   <td>查找给定集合内的任何字符</td>
   </tr>
   <tr>
   <td>9</td>
   <td>[^adgk]</td>
   <td>查找给定集合外的任何字符</td>
   </tr>
   <tr>
   <td>10</td>
   <td>(red|blue|green)</td>
   <td>查找任何指定的项</td>
   </tr>
</table>

### 5.元字符
<table>
   <th>
   <td>元字符</td>
   <td>描述</td>
   </th>
   <tr>
   <td>1</td>
   <td>.</td>
   <td>查找单个字符，除了换行和行结束符</td>
   </tr>
   <tr>
   <td>2</td>
   <td>\w</td>
   <td>查找单词字符</td>
   </tr>
   <tr>
   <td>3</td>
   <td>\W</td>
   <td>查找非单词字符</td>
   </tr>
   <tr>
   <td>4</td>
   <td>\d</td>
   <td>查找数字</td>
   </tr>
   <tr>
   <td>5</td>
   <td>\D</td>
   <td>查找非数字</td>
   </tr>
   <tr>
   <td>6</td>
   <td>\s</td>
   <td>查找空白字符</td>
   </tr>
   <tr>
   <td>7</td>
   <td>\S</td>
   <td>查找非空白字符</td>
   </tr>
   <tr>
   <td>8</td>
   <td>\b</td>
   <td>匹配单词边界</td>
   </tr>
   <tr>
   <td>9</td>
   <td>\B</td>
   <td>匹配非单词边界</td>
   </tr>
   <tr>
   <td>10</td>
   <td>\0</td>
   <td>查找 NUL 字符</td>
   </tr>
   <tr>
   <td>11</td>
   <td>\n</td>
   <td>查找换行符。</td>
   </tr>
   <tr>
   <td>12</td>
   <td>\f</td>
   <td>查找换页符</td>
   </tr>
   <tr>
   <td>13</td>
   <td>\r</td>
   <td>查找回车符</td>
   </tr>
   <tr>
   <td>14</td>
   <td>\xxx</td>
   <td>查找以八进制数 xxx 规定的字符</td>
   </tr>
   <tr>
   <td>15</td>
   <td>\xdd</td>
   <td>查找以十六进制数 dd 规定的字符</td>
   </tr>
   <tr>
   <td>16</td>
   <td>\uxxxx</td>
   <td>查找以十六进制数 xxxx 规定的 Unicode 字符</td>
   </tr>
</table>

### 6.量词
<table>
   <th>
   <td>量词</td>
   <td>描述</td>
   </th>
   <tr>
   <td>1</td>
   <td>n+</td>
   <td>匹配任何包含至少一个 n 的字符串</td>
   </tr>
   <tr>
   <td>2</td>
   <td>n*</td>
   <td>匹配任何包含零个或多个 n 的字符串</td>
   </tr>
   <tr>
   <td>3</td>
   <td>n?</td>
   <td>匹配任何包含零个或一个 n 的字符串</td>
   </tr>
   <tr>
   <td>4</td>
   <td>n{X}</td>
   <td>匹配包含 X 个 n 的序列的字符串</td>
   </tr>
   <tr>
   <td>5</td>
   <td>n{X,Y}</td>
   <td>匹配包含 X 至 Y 个 n 的序列的字符串</td>
   </tr>
   <tr>
   <td>6</td>
   <td>n{X,}</td>
   <td>匹配包含至少 X 个 n 的序列的字符串</td>
   </tr>
   <tr>
   <td>7</td>
   <td>n$</td>
   <td>匹配任何结尾为 n 的字符串</td>
   </tr>
   <tr>
   <td>8</td>
   <td>^n</td>
   <td>匹配任何开头为 n 的字符串</td>
   </tr>
   <tr>
   <td>9</td>
   <td>?=n</td>
   <td>匹配任何其后紧接指定字符串 n 的字符串</td>
   </tr>
   <tr>
   <td>10</td>
   <td>?!n</td>
   <td>匹配任何其后没紧接指定字符串 n 的字符串。</td>
   </tr>
</table>
