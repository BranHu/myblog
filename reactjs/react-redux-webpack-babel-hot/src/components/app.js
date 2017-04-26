import React from 'react';
import Profile from './profile';

//改过后测试的---测试成功
//一种方式
class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Profile name="hujun" age="30" />
		)
		
	}
}

//第二种方式
// const App = () => (
//   <div>
//     <h2>Hello, what is webpack。</h2>
//   </div>
// );

export default App;
