# Vue生态圈

## 目录

- Vue
  - [nextTick](#nextTick)
  - [set](#set)
  - [mixin](#mixin)
  - [组件的合理应用props](#组件的合理应用props)
  - [parent和children](#parent和children)
  - [render函数](#render函数)
  - [directives自定义指令](#directives自定义指令)
  - [自定义v-model](#自定义v-model)
  - [vue源码解读](#vue源码解读)

- Vue-Router
  - [keep-alive](#keep-alive)
  - [解决的问题和优缺点](#解决的问题和优缺点)
  - [项目构建的文档结构](#项目构建的文档结构)
  - [dispatcher](#dispatcher)
  - [action](#action)
  - [store](#store)
  - [view](#view)


### nextTick
* dom渲染后再触发，比较适合取dom的操作, this.$nextTick(fn)
* 入参是一个回调函数

### set
* 通过手动给data属性添加值
* 如果是component的方式，一般是vm.$set
* 如果是single component的话，是this.$set
* 注意转换方式  vm转成this

### keep-alive
* keep alive在router-view来回切换跳转的时候会保留数据，但是一般从体验上还是建议不要使用keep alive

### mixin
* mixin的意思是拼装，mixin是一个对象json，里面可写上vue中的各种属性如props，created等等，然后在vue组件中中通过mixin属性直接引用到这个vue组件中作为补充

### 组件的合理应用props
* 如果props是一个boolean值，可以不用赋初值，vue会自动识别，如果父组件添加了这个则子组件获得的就是true，如果没添加则是false
* props还可以传递函数function，在子组件运用的时候直接 *this.函数();* 就可以调用了

### parent和children
* $children是在父组件中访问子组件的组件的
* $parent是在子组件中访问父组件的
* 可以通过 console.log(this) 查看$children 和 $parent

### render函数
* render是一个函数
* render的入参是一个函数，原名是createElement，一般用h代替
* render函数要最后要返回h的调用，像这样 return h（这里面有很多参数）
* vue选项中的render函数若存在，则vue构造函数不会从template选项或通过el选项指定的挂载元素中提取html模版编译渲染函数
* 如4，经过测试后在vue文件中，即用单文件格式，在有template和render共存的情况下，首先会渲染render的dom。
* 如5，因此如果要用render就不要使用template，而直接使用export default返回一个js对象
* h函数的特点记住他有三个入参，一个是tag（不仅仅是html的tag还可以是已经封装好的组件），第二个是属性对象，包含style、props、class等等，第三个是一个数组或者字符串即子节点，如果想要子组件再调用h函数

### directives自定义指令
* 单例文件通过directive来属性添加
* 五个钩子函数，bind，inserted，update，componentUpdated，unbind
* 五个钩子函数包含四个入参，el是指令所绑的元素，binding一个对象包含六个属性，vnode，oldVnode
* 注意binding的六个属性，注意value，expression，arg，其中expression传递的都是字符串，通过它可以调用el上面绑定的一些methods

### 自定义v-model
* 父组件添加了v-model
* 因为v-model是:value和@input的语法糖，所以自定式组件的子组件就需要:value和@input两块
* 子组件中props的value来接受父组件v-model的赋值，然后在子组件中的input中有:value=value，然后再给@input绑定一个方法，最后一定要触发input，this.$emit('input')

