# Node.js
## 一、基础知识
### 1. node.js之模块

* require 模块<br>
通过Node.js的官方API可以看到Node.js本身提供了很多核心模块 [http://nodejs.org/api/](http://nodejs.org/api/), 这些核心模块被编译成二进制文件，可以require('模块名')去获取；核心模块具有最高的加载优先级（有模块与核心模块同名时会体现）
