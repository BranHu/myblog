import React from 'react';
import TodoAction from './actions/TodoAction';

class Todo extends React.Component {
	constructor(props) {
		this.createTodo = this.createTodo.bind(this);
		this.deleteTodo = this.deleteTodo.bind(this);
	}

	createTodo() {
		//创建Todo的事件回调
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