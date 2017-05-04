# React and Flux

## 目录

- React
  - [component](#component)
  - [props](#props)
  - [state](#state)
  - [lifecircle](#lifecircle)
  - [其他](#其他)
  
- Flux
  - [核心思想](#核心思想)
  - [解决的问题和优缺点](#解决的问题和优缺点)
  - [项目构建的文档结构](#项目构建的文档结构)
  - [Dispatcher](#Dispatcher)
  - [Action](#Action)
  - [Store](#Store)
  - [View](#View)
  
## React

### component

### props and state

### lifecircle

## Flux

### 核心思想

![](img/flux.png)

#### Flux 的最大特点，就是数据的"单向流动"。任何相邻的部分都不会发生数据的"双向流动"。所有的状态都由 Store 来维护，通过 Action 传递数据。流程如下：

* 首先要有 action，通过定义一些 action creator 方法根据需要创建 Action 提供给 dispatcher
* View 层通过用户交互（比如 onClick）会触发 Action
* Dispatcher 会分发触发的 Action 给所有注册的 Store 的回调函数
* Store 回调函数根据接收的 Action 更新自身数据之后会触发一个 change 事件通知 View 数据更改了
* View 会监听这个 change 事件，拿到对应的新数据并调用 setState 更新组件 UI


### 解决的问题和优缺点

* 解决的问题

    * React的核心是组件，而且它负责的就是view的处理。但是当应用的复杂程度增加的时候，最上层组件中的state就会变得越来越复杂，单纯的只用React来开发会变得相当复杂和困难。
    
* 优缺点及适用条件

    * Flux会增加代码量，额外的引入了大量的概念和文件。
    * Flux会带来清晰的数据流，并且把数据和组件的state分离，保持了清晰的逻辑，避免了多向数据流动带来的混乱和维护困难问题。
    * Flux适用于比较复杂的多人项目，有较多的数据变动及交互的项目。不适合全部都是静态组件，且组件之间没有共享数据的项目。

### 项目构建的文档结构

#### 项目构建时的文档结构可以按照Flux中的四个核心概念来组织

* components/
    * view层的模板
* actions/
    * TodoAction.js
* dispatcher/
    * AppDispatcher.js
* stores/
    * TodoStore.js

### Dispatcher

### Action

### Store

### View
