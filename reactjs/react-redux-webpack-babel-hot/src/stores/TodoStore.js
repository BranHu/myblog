import AppDispatcher from './dispatcher/AppDispatcher';
import { EventEmitter } from 'event';

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
	},

	deleteTodo(id) {
		this.todos = this.todos.filter(item => item.id !== id);
	},
  
    // 触发 change 事件
    emitChange: function() {
    	this.emit('change');
    },
  
    // 提供给外部 View 绑定 change 事件
    // callback 在 View 组件中是声明的onchange方法，它的内部就是调用了setState 方法对state进行了重新设置 
    addChangeListener: function(callback) {
    	this.on('change', callback);
    },
  
    removeChangeListener: function() {
    	this.remove('change', callback);
    }

};

AppDispatcher.register((action) => {

	switch (action.actionType) {

		case 'CREATE_TODO':
			TodoStore.addTodo(action.todo);
			break;
			
		case 'DELETE_TODO':
			TodoStore.deleteTodo(action.id);
			break;
		default: return;
	}
})