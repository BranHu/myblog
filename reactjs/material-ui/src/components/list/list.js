import React from 'react';
import ListItem from '../listItem/listItem';

//map 的灵活运用
//{ }在jsx的灵活运用
function List({items}) {
	items = items.map(
		items => (
			<ListItem
			  item = {item}
			  key = {item.id}
			 />
		)
	);

	return (
		<div className='list-component col-md-4 list-group'>
			{items}
		</div>)
}

export default List;