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
					hobbies: ['skateboarding', 'rock music'],
					value: ''
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

		handleValueChange(e) {
			this.setState({
		        value: e.target.value
		    });
		}
		addHobbyCallback() {
			//用this.refs.name来取DOM节点（过时了，会报错）
			//refs的string方式，即this.refs.hobby已经被祛除掉了,下面进行了改写
			//加了一个onchange事件,加了一个this.state.value,加了一个e.target.value
			let val = this.state.value;
			if(val) {
				let hobbies = this.state.hobbies;
				hobbies = [...hobbies,val];
				this.setState({
					hobbies
				},() => {
					this.state.value = ''
				})
			}
		}
		//每个组件都有一个render()作用是渲染virtrual Dom结构
		//注意下面的点击事件的c为大写
		//react 中的{ }应用，map没有实现!!如果是括号的话要return,
		//如this.state.hobbies.map((hobby,i) => {return <Hobby key={i} hobby={hobby} />})
		render() {
			return (
				<div className = "profile-component">
		    	  <h1>我的名字叫{this.props.name}</h1>
		    	  <h2>我今年{this.props.age}</h2>
		    	  <button onClick={this.likedCallback}>给我点赞</button>
		    	  <h2>点赞总数：{this.state.liked}</h2>
		    	  <h2>我的爱好：</h2>
			      <ul>
				    {this.state.hobbies.map((hobby,i) => <Hobby key={i} hobby={hobby} />)}
			      </ul>
			      <input type="text" value={this.state.value} onChange={this.handleValueChange.bind(this)} />
			      <button onClick={this.addHobbyCallback.bind(this)}>添加爱好</button>
			  </div>
			)
		}
	}
	//Profile.propTypes = propTypes;

export default Profile;