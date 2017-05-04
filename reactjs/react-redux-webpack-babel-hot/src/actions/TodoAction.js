import AppDispatcher from './dispatcher/AppDispatcher';

const TodoAction = {
	//这里有两个action，需要store进行判断(store中的switch)
	create(todo) {
		AppDispatcher.dispatch({
			actionType: 'CREATE_TODO',
			todo,
			text,
			value
		//后面的数据可以有多个
		});
	},

	delete(id) {
		AppDispatcher.dispatch({
			actionType: 'DELETE_TODO',
			id,
			name,
			menu
		//后面的数据可以有多个
		})
	}
}