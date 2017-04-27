//这是antd提供的一个例子
// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import { DatePicker } from 'antd';

// function App() {
//   return (
//     <div style={{ margin: 100 }}>
//       <h1>AntDesign Demo</h1>
//       <hr /><br />
//       <DatePicker />
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.getElementById('root'));


//换成用react组件的方式来实现antd组件方式
import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, message } from 'antd';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    };
  }
  handleChange(date) {
    message.info('您选择的日期是: ' + date.toString());
    this.setState({ date });
  }
  render() {
    return (
      <div style={{ width: 400, margin: '100px auto' }}>
        <DatePicker onChange={value => this.handleChange(value)} />
        <div style={{ marginTop: 20 }}>当前日期：{this.state.date.toString()}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));