import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR
import App from './components/app';
import FilterableProductTable from './components/reactDocument';

// function Welcome(props) {
// 	return <h1>hello,{props.name}</h1>;
// }

// function App() {
// 	return (
//     <div>
//       <Welcome name="Sara" />
//       <Welcome name="Cahal" />
//       <Welcome name="Edite" />
//     </div>
//   );
// }

//declare a function render()
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.body.appendChild(document.createElement('div'))
  );
};

//invoke the render()
render(FilterableProductTable);

// Hot Module Replacement API
//可以不需要
if (module.hot) {
  // module.hot.accept('./src/app.js',()=>function(){
  // 	render(App);
  // });
}
