import React from 'react';
import List from './list/list';
//import CreateBar from './createbar/createbar';
import ItemShowLayer from './ItemShowLayer/ItemShowLayer'

class Deskmark extends React.Component {
	render() {
		const items = [
			{
				'id': "123456789",
				'title': 'hello',
				'content': '# testing markdown',
				'time': 1458030208359
			},{
				'id': "132456789",
				'title': 'hello2',
				'content': '# hello world',
				'time': 1458030208359
			}
		]
		const currentItem = items[0];

		return (
			
			<section className='destmark-component'>
				<div className='container'>
					<div className='row'>
						<List items={items} />
						<ItemShowLayer item={currentItem}/>
					</div>
				</div>
			</section>
		)
	}
}

export default Deskmark;