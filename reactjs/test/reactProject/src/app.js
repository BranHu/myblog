import React,{ Component } from 'react';

export default class app extends Component {
	render() {
		console.log('%c%s','font-size:20px;color:red','Something happened.');

		return (
			<div>this is a react project with webpack and es6.</div>
		)
	}
}