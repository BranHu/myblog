import React from 'react';
import TodoAction from './actions/TodoAction';
import TodoStore from './stores/TodoStore';

class Todo extends React.Component {
	constructor(props) {
		super(props);
		//获取store存放的所有的数据，将其赋值给state
		this.state = {
			todos: TodoStore.getAll();
		}
		//这里的bind(this)是es6中的写法
		this.createTodo = this.createTodo.bind(this);
		this.deleteTodo = this.deleteTodo.bind(this);
		this.onChange = this.onChange.bind(this);
	}
	
	componentDidMount() {
		//初始化的时候在store中注册这个事件,this.onChange这个入参是触发后的callback
		TodoStore.addChangeListener(this.onChange);
	}

	componentWillUnmount() {
		//组件卸载的时候记得要清除这个事件绑定
		TodoStore.removeChangeListener(this.onChange);
	}

	onChange() {
		//store 改变后触发的回调，用setState来更新整个UI
		this.setState({
			todos: TodoStore.getAll()
		})
	}

	//新建函数对Action中的action creator进行封装
	createTodo() {
		//调用Action中的 action creator 方法
		TodoAction.create({
			id: uuid.v4(),
			content: '3rd stuff'
		});
	}

	deleteTodo() {
		TodoAction.delete(id);
	}

	render() {
		return (
			<div>
				<List items={this.state.todos} onDelete={this.deleteTodo} />
				<CreateButton onClick={this.createTodo} />
			</div>
		)
	}
}

export default Todo;