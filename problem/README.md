# 疑问

## 目录
- [element中table的bug](#element中table的bug)

## element中table的bug

#### 当处理的数据存在嵌套比较复杂的时候，如一个json中嵌套了两到三级的Array和json时，结合使用element的table和vuex会出现一些问题，工作当中就遇见了这样的情况，一个这样数据结构
```javascript
{
  id: '',
  array: [
    {
      id: '',
      array: []
    }
    ...
  ]
}
```
#### 业务需求是在table中进行编辑和显示的切换，table中的tableData为该json中的第一个Array，json为state上的唯一一个变量，当点击table行中的编辑按钮时候，行并不会立即在dispatch后触发切换显示状态，而是在该Array有元素增删的时候才会进行切换，而事件触发的时候处理array中的某个元素的某个字段时该数据是立即变化了的。
#### 还存在的现象是当改变的数据不是控制dom是否显示的数据时，table会即可显示触发而改变的数据，而一旦事件触发的是决定dom是否显示的数据时，如editing为true或false时，则出现上述情况。
#### 可能的原因是：
1. json作为state上的一个全局变量，该json的某个字段是数组，而数组内的元素的字段发生改变时，vue并不会觉察到该数据发生了变化，而当数组发生增减时才觉察出该json发生了数据的改变，并立刻进行数据view的渲染
2. vue中的virtualDom没有觉察到dom发生了变化
#### 目前解决的方案
1. 将第一级的Array剥离出来作为state上的一个全局变量，单独处理该Array。