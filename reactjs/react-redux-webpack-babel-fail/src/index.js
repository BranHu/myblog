import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

//declare a function render()
const app = document.createElement('div');
document.body.appendChild(app);

// class App extends React.Component{
// 	constructor(props) {
// 		super(props);
// 	}
// 	render() {
// 		return {
// 			<div className="container">
// 				<h1>Hello React!</h1>
// 			</div>
// 		}
// 	}
// 
const App = () => (
		<div className="container">
			<h1></h1>
	 	</div>
	);

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    app
  );
};


//invoke the render()
render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App)
  });
  render(App);
}


// import React from 'react';
// import ReactDOM from 'react-dom';

// import { AppContainer } from 'react-hot-loader';
// // AppContainer is a necessary wrapper component for HMR

// import App from './components/App';

// const render = (Component) => {
//   ReactDOM.render(
//     <AppContainer>
//       <Component/>
//     </AppContainer>,
//     document.getElementById('root')
//   );
// };

// render(App);

// // Hot Module Replacement API
// if (module.hot) {
//   module.hot.accept('./components/App', () => {
//     render(App)
//   });
// }
