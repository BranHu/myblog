import React from 'react';

//入参还能这样，要值得注意
function ListItem({item}) {
	return (
		<a 
		  href='#' class='list-group-Item list-component'
		>
		  <span class='label label-default label-pill pull-xs-right'>
		    {item.name}
		  </span>
			{item.title}
		</a>
	);
}

export default ListItem;