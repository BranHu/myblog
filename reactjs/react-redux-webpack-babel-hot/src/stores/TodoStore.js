import AppDispatcher from './dispatcher/AppDispatcher';

const TodoStore = {
	//存放所有文章的列表，里面有两条默认的数据
	todos: [{ 
		id: uuid.v4(), 
		content: 'first one'
	},{
		id: uuid.v4(), 
		content: '2nd one'
	}],

	getAll() {
		return this.todos;
	},

	addTodo(todo) {
		this.todos.push(todo);
	}

	deleteTodo(id) {
		this.todos = this.todos.filter(item => item.id !== id);
	}
};

AppDispatcher.register((action) => {
	switch (action.actionType) {
		case 'CREATE_TODO':
			TodoStore.addTodo(action.todo);
			break;
		case 'CREATE_TODO':
			TodoStore.deleteTodo(action.id);
			break;
		default: return;
	}
})