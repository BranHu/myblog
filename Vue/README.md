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
  - [vue-loader](#vue-loader)

- Vue-Router
  - [keep-alive](#keep-alive)
  - [解决的问题和优缺点](#解决的问题和优缺点)
  - [项目构建的文档结构](#项目构建的文档结构)
  - [dispatcher](#dispatcher)
  - [action](#action)
  - [store](#store)
  - [view](#view)

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

### vue-loader
- templateLoader.js 中如下一段代码
```javascript
  const { compileTemplate } = require('component-compiler-utils')
  ....
  const compiler = options.compiler || require('vue-template-compiler')
  ...
  const finalOptions = {
    source,
    filename: this.resourcePath,
    compiler,
    compilerOptions,
    // allow customizing behavior of vue-template-es2015-compiler
    transpileOptions: options.transpileOptions,
    transformAssetUrls: options.transformAssetUrls || true,
    isProduction,
    isFunctional,
    optimizeSSR: isServer && options.optimizeSSR !== false
  }

  const compiled = compileTemplate(finalOptions)
```
从 vue-template-compiler 引入的 compiler 作为 component-compiler-utils 传入到 compileTemplate 中, component-compiler-utils 中的 index 文件有下面代码
```javascript
import {
  compileTemplate,
  TemplateCompileOptions,
  TemplateCompileResult
} from './compileTemplate'
```
- index 同级的 compileTemplate 文件

可见 compileTemplate 主要调用的是 actuallyCompile，注意这里的 compiler 是之前传入的 finalOptions
```javascript
export function compileTemplate (
  options: TemplateCompileOptions
): TemplateCompileResult {
  ...
  if (preprocessor) {
    ...
  } else if (preprocessLang) {
    ...
  } else {
    return actuallyCompile(options)
  }
}
```
- actuallyCompile(options)

首先用 es6 的解构赋值将 templateLoader.js 中传入的各个属性值进行赋值, 最后将 compiler.compile 赋值给 compile 变量，然后调用这个 compile 方法生成 render 和 staticRenderFns 再解构赋值, 然后对生成的 render 和 staticRenderFns 进行字符串优化处理，这里用到了 vue-template-es2015-compiler 模块做 babel 的优化
```javascript
  const {
    source,
    compiler,
    compilerOptions = {},
    transpileOptions = {},
    transformAssetUrls,
    isProduction = process.env.NODE_ENV === 'production',
    isFunctional = false,
    optimizeSSR = false
  } = options
  
  const compile = optimizeSSR && compiler.ssrCompile
    ? compiler.ssrCompile
    : compiler.compile
    
  let finalCompilerOptions = compilerOptions
    
  const {
    render,
    staticRenderFns,
    tips,
    errors
  } = compile(source, finalCompilerOptions)
  
  ...
  
    const toFunction = (code: string): string => {
      return `function (${isFunctional ? `_h,_vm` : ``}) {${code}}`
    }

    // transpile code with vue-template-es2015-compiler, which is a forked
    // version of Buble that applies ES2015 transforms + stripping `with` usage
    let code = transpile(
      `var render = ${toFunction(render)}\n` +
      `var staticRenderFns = [${staticRenderFns.map(toFunction)}]`,
      finalTranspileOptions
    ) + `\n`
```
- vue-template-compiler 中的 compiler

vue-template-compiler 中的 compiler 实际上是来源自它的 build.js 文件，在 build.js 中有如下代码，那么在上面调用 compiler.compile 的时候即调用的这里的 compile 方法，函数调用的逻辑 compile => ref.compile => createCompiler => createCompilerCreator => createCompiler => compile
注意这里有个技巧，在调用 createCompilerCreator(function baseCompile) 传入的 baseCompile 方法会在 createCompilerCreator 内部进行运用处理
```
...
// 等价于 var createCompiler = function createCompiler (baseOptions) { ... }
var createCompiler = createCompilerCreator(function baseCompile ( 
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

var ref = createCompiler(baseOptions); // 等价
var compile = ref.compile;
var compileToFunctions = ref.compileToFunctions;

...

exports.parseComponent = parseComponent;
exports.compile = compile;
exports.compileToFunctions = compileToFunctions;
exports.ssrCompile = compile$1;
exports.ssrCompileToFunctions = compileToFunctions$1;
```

- createCompilerCreator 方法

createCompilerCreator 这里用到闭包，返回 createCompiler
```
function createCompilerCreator (baseCompile) {  
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
    
      ...

      var compiled = baseCompile(template, finalOptions);
      if (process.env.NODE_ENV !== 'production') {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}
```
注意这里的调用的传入的 baseCompile 方法
```javascript
const compiled = baseCompile(template, finalOptions)
```
仔细查看上方传入的 baseCompile 方法可以发现有3个核心的步骤
```javascript
  var ast = parse(template.trim(), options);  
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
```


#### Vue render
`function createComponent (Ctor, data, context, children, tag)`
  1. 在_createElement函数中当要渲染的是组件的时候通过这种方法来执行`vnode = createComponent(Ctor, data, context, children, tag);`或者 `vnode = createComponent(tag, data, context, children);`
#### Vue update

- `Vue.prototype._update = function (vnode, hydrating)`
  1. `_update` 是 `Vnode` 转 `dom` 的一个过渡，重新渲染dom，主要是调用了 `__patch__`，实际上最终是调用的 `createPatchFunction` 这个方法
  2. 函数调用路径是 `vue.prototype.__patch__` ==> `createPatchFunction` ==> `return function patch () {}`
  3. 好似给dom的重新渲染就像一个patch补丁一样打上去
  4. 先判断是否是之前有mounted渲染过，如果有的话此时的_update就是更新dom，因此要触发beforeUpdate生命周期钩子函数
  ```JavaScript
  if (vm._isMounted) {
    callHook(vm, 'beforeUpdate');
  }
  ```
  5. 声明preEl和prevVnode来判断是否是初始的渲染还是修改更新的渲染，初始化的渲染执行`vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false,vm.$options._parentElm,vm.$options._refElm);`，更新的渲染执行`vm.$el = vm.__patch__(prevVnode, vnode);`
  ```javascript
  var prevEl = vm.$el;
  var prevVnode = vm._vnode;
  var prevActiveInstance = activeInstance;
  activeInstance = vm; //
  vm._vnode = vnode;
  if (!prevVnode) {
    // initial render
    vm.$el = vm.__patch__(
      vm.$el, vnode, hydrating, false /* removeOnly */,
      vm.$options._parentElm,
      vm.$options._refElm
    );
    // no need for the ref nodes after initial patch
    // this prevents keeping a detached DOM tree in memory (#5851)
    vm.$options._parentElm = vm.$options._refElm = null;
  } else {
    // updates
    vm.$el = vm.__patch__(prevVnode, vnode);
  }
  ```
  <br/>
- `vm.__patch__(vm.$el, vnode, hydrating, false, vm.$options._parentElm, vm.$options._refElm)`
  1. `Vue.prototype.__patch__ = inBrowser ? patch : noop; `给`vue`的原型上添加`__patch__`方法，为全局变量`patch`
  2. `var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules }); `，`patch`为`createPatchFunction`
  3. `nodeOps` 和 `modules` 都是全局变量，`nodeOps`组装了js中操作`dom`的方法，`modules`中是一些共用的模块
  ```javascript
  // 这里freeze的object的属性都是封装了js中操作dom的一些方法, 可以看后面
  var nodeOps = Object.freeze({
    createElement: createElement$1,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    setAttribute: setAttribute
  });
  
  var platformModules = [
    attrs,
    klass,
    events,
    domProps,
    style,
    transition
  ];

  var baseModules = [
    ref,
    directives
  ];

  // the directive module should be applied last, after all
  // built-in modules have been applied.
  var modules = platformModules.concat(baseModules);
  ```
- `function createPatchFunction (backend)`
  1. 该函数内部声明了一些函数，如`updateChildren, createElm, createComponent, insert`等，最后返回`function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm)`, 那么我们在给全局变量 patch 赋值的时候`var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });`，实际上是将内部的`function patch` 赋值给了全局`patch`，继而赋值给了 `__patch__`
  2. 这段代码的作用后续补充
  ```JavaScript
  // 全局的hooks
  var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];
  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }
  ```
- `function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm)`
  1. 该函数是 `function createPatchFunction (backend)` 的返回值
  2. 初始化的时候执行的是`vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false,vm.$options._parentElm,vm.$options._refElm);`即`vm.$el = patch(vm.$el, vnode, hydrating, false, vm.$options._parentElm, vm.$options._refElm);`
  3. `if (isUndef(oldVnode)) { } else { } `，注意初始化的时候 `oldVnode` 为 `vm.$el`，为`mount`时的真实`dom`，因此不会走这个分支会走 `else` 分支
  4. `var isRealElement = isDef(oldVnode.nodeType);` isDef 的作用是判断是否为 `undefined` 或 `null`，为`undefined `或` null`返回`false`，其他的为`true`，初始化的时候`oldVnode.nodeType`为`1`，即`isRealElement`为`true`
  5. `if (!isRealElement && sameVnode(oldVnode, vnode)) {} else {}` ，初始化的时候`isRealElement`为`true`因此会走`else`分支，`oldVnode = emptyNodeAt(oldVnode);`将`oldVnode`这个真实`dom`创建一个空`vnode`
  6. `var oldElm = oldVnode.elm;`初始化的时候oldVnode.elm就是mount的#app这个div，`var parentElm$1 = nodeOps.parentNode(oldElm);`，找到他的父节点赋值给 parentElm$1，然后执行createElm（）
  ```javascript
  // replacing existing element  将原来的旧节点dom提取出来，为后面替换做准备
  var oldElm = oldVnode.elm;
  var parentElm$1 = nodeOps.parentNode(oldElm);
  // create new node  创建新的节点并插入到旧节点的父节点下
  createElm(
    vnode,
    insertedVnodeQueue,
    oldElm._leaveCb ? null : parentElm$1,  // 插入的父节点
    nodeOps.nextSibling(oldElm)  // 旧节点的下一个同胞节点
  );
  ```
- `function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested)`作用是依据将入参`vnode`转换成真实的`dom`并挂载在`parentElm`上
  1. `if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {return}`，这里调用的是`createPatchFunction`内的 `createComponent `注意函数的作用域链，在上方，其作用是判断 vnode 是否为组件，如果是组件vnode, 则直接进入下面的if分支然后退出函数运行
  2. 如果是非组件，`var data = vnode.data;var children = vnode.children;var tag = vnode.tag;`，将`vnode.data`和`children`和`tag`取出，然后依据条件执行，一般有`dom`的情况，`comment`的情况，文本的情况，主要还是通过`insert`函数插入不同类型的`node`，如果`vnode`还有`children`属性，还要调用`createChildren`方法
  ```javascript
  if (isDef(tag)) {
    vnode.elm = vnode.ns
      ? nodeOps.createElementNS(vnode.ns, tag)
      : nodeOps.createElement(tag, vnode);
    setScope(vnode);

    /* istanbul ignore if */
    {
      createChildren(vnode, children, insertedVnodeQueue);
      if (isDef(data)) {
        invokeCreateHooks(vnode, insertedVnodeQueue);
      }
      insert(parentElm, vnode.elm, refElm);
    }

    if ("development" !== 'production' && data && data.pre) {
      creatingElmInVPre--;
    }
  } else if (isTrue(vnode.isComment)) {
    vnode.elm = nodeOps.createComment(vnode.text);
    insert(parentElm, vnode.elm, refElm);
  } else {
    vnode.elm = nodeOps.createTextNode(vnode.text);
    insert(parentElm, vnode.elm, refElm);
  }
  ```
- `function insert (parent, elm, ref$$1)`
该函数的作用就是执行nodeOps.insertBefore或nodeOps.appendChild给parent上插入elm，只是dom操作
- `function createChildren (vnode, children, insertedVnodeQueue)`
判断children是否是数组，如果是则遍历`children`调用`createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);`即进行了逐层递归操作执行`createElm`
- `function createComponent (vnode, insertedVnodeQueue, parentElm, refElm)`
  1. 注意这里是`createPatchFunction`中声明的方法，`createElm`内部在调用`createComponent`时应该注意函数的作用域链，优先调用内部的`createComponent`
  2. 这里使用了 `i.hook` 和 `i.init`, 全局的 `createComponent`(构建组件`vnode`) 中的 `mergeHooks(data)`，具体的再看看全局的createComponent，我们在_createElement中对tag进行了分条件处理，如是html/svg的字符串、对象组件等
  3. 这里的`data`是创建组件的时候穿进去的 `data`，详见`vue`文档
  ```javascript
  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }
  ```
  
  
- init钩子
  1. `options`中的`_isComponent`为`true`
  2. `options`中的`parent`为`activeInstance`，这里的`activeInstance`为全局变量，是在`_update`的时候赋值的，`var prevActiveInstance = activeInstance;activeInstance = vm;`，即`activeInstance`就为当前的vm实例，如果是在首次初始化（main.js中）的时候就为那个时候的vue实例，可以理解为App组件的父实例
  3. options中的`_parentVnode`为`vnode`，在初始化的时候为
  ```javascript
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );
  ```
  4. options中的`_parentElm`为`vm.$options._parentElm`，在初始化的时候为`null`
  5. options中的`_refElm`为`vm.$options._refElm`，在初始化的时e候为`null`
- `new Vue`这里就需要回到查看`Vue`的构造函数了，即`Vue`的初始化`_init`函数
因为`options._isComponent`为true，因此会走到`initInternalComponent(vm, options)`这个分支，注意这里的vm就为后面通过`createComponentInstanceForVnode`函数创建的Vue的子类实例
  ```javascript
  var vm = this;
  if (options && options._isComponent) {
    initInternalComponent(vm, options);  // 如果是组件渲染的时候走进去了这个分支
  } else {
    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor), // constructor只有实例对象有，指向是的对象的构造函数
      options || {},
      vm
    );                                          //  最后merge的options是挂载在$options上的
  }
  ```
- initInternalComponent(vm, options);
  ```javascript
  function initInternalComponent (vm, options) {  // 注意这里的入参vm传入的是子类vue的实例，不是父实例，父实例在options的parent属性上
    var opts = vm.$options = Object.create(vm.constructor.options);
    // doing this because it's faster than dynamic enumeration.
    var parentVnode = options._parentVnode; // 创建的组件虚拟node
    opts.parent = options.parent; // 父实例
    opts._parentVnode = parentVnode; // 创建的组件虚拟node
    opts._parentElm = options._parentElm; // 初始化的时候为null
    opts._refElm = options._refElm; // 初始化的时候为null
    
    // componentOptions 为 { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
    var vnodeComponentOptions = parentVnode.componentOptions; 
    opts.propsData = vnodeComponentOptions.propsData;
    opts._parentListeners = vnodeComponentOptions.listeners;
    opts._renderChildren = vnodeComponentOptions.children;
    opts._componentTag = vnodeComponentOptions.tag;

    if (options.render) {
      opts.render = options.render;
      opts.staticRenderFns = options.staticRenderFns;
    }
  }
  ```
