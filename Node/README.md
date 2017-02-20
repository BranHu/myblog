# Node.js
## 一、基础知识
### 1. node.js之模块

* require 模块<br>
通过Node.js的官方API可以看到Node.js本身提供了很多核心模块 [http://nodejs.org/api/](http://nodejs.org/api/), 这些核心模块被编译成二进制文件，可以require('模块名')去获取；核心模块具有最高的加载优先级（有模块与核心模块同名时会体现）。
Node.js还有一类模块为文件模块，可以是JavaScript代码文件（.js作为文件后缀）、也可以是JSON格式文本文件（.json作为文件后缀）、还可以是编辑过的C/C++文件（.node作为文件后缀）；文件模块访问方式通过require('/文件名.后缀')、require('./文件名.后缀')、requrie('../文件名.后缀') 去访问，文件后缀可以省略；以"/"开头是以绝对路径去加载，以"./"开头和以"../"开头表示以相对路径加载，而以"./"开头表示同级目录下文件，前面提到文件后缀可以省略，Nodejs尝试加载的优先级 js文件 > json文件 > node文件。
自定义模块方式是通过**exports**和**module.exports**来自行定义，然后再通过上述方法引用。<br>
![](/images/require.png)

* events 模块<br>

* http 模块<br>
http常用的方法为：<br>
![](/images/http.png)

* file system 模块<br>

## 二、环境配置
## 三、node.js与Mysql的交互
## 四、node.js与MongoDB的交互
## 五、node.js与Redis交互
