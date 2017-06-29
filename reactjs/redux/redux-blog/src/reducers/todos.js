/*
**reducer为一个纯函数，将state和action进行一个对应
**在使用reducer的时候多联想Array.prototype.reduce()
**在写reducer的时候千万记住是不能改state的
**reducer结构以一个switch为主
**reducer可能有很多，最后将他们都合并成一个
*/

const todos = (state = [], action) => {  //这里的state经过优化为一个数组[],数组中元素为一个个的json对象
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,     //这里运用到了es6的结构赋值，此处的state是一个组数对象，因此此处的...state包含了之前的state所有元素
        {             //这里的json就等于添加的新的数组元素了
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map(todo =>     //todo为json对象，即每一个do
        (todo.id === action.id) 
          ? {...todo, completed: !todo.completed}
          : todo
      )
    default:
      return state
  }
}

export default todos