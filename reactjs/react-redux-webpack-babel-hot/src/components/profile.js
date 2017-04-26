import React from 'react';
import Hobby from './hobby.js';

// const propTypes = {
//   name: ProTypes.string.isRequired,
//   age: ProTypes.string.isRequired
// }

class Profile extends React.Component {
	constructor(props) {
	  //props是组件内部的属性
	  super(props);
	  //props也是组件内部的属性，状态机
	  this.state = {
	  	liked: 0,
	  	hobbies: ['skateboarding','rock music']
	  }
	  //this就是这个组件，即Profile
	  this.likedCallback = this.likedCallback.bind(this);
	}

	likedCallback() {
	  let liked = this.state.liked;
	  liked++;
	  //通过setState来设置状态机
	  this.setState({
	  	liked
	  });
	}
	//每个组件都有一个render()作用是渲染virtrual Dom结构
	//注意下面的点击事件的c为大写
	//react 中的{ }应用，map没有实现
	render() {
		return (
		  <div className = "profile-component">
		    <h1>我的名字叫{this.props.name}</h1>
		    <h2>我今年{this.props.age}</h2>
		    <button onClick={this.likedCallback}>给我点赞</button>
		    <h2>点赞总数：{this.state.liked}</h2>
		    <h2>我的爱好：</h2>
		    <ul>
			  {this.state.hobbies.map((hobby,i) => {
			     <Hobby key={i} hobby={hobby} />
			  })}
		    </ul>
		  </div>
		)
	}
}
//Profile.propTypes = propTypes;

export default Profile;
