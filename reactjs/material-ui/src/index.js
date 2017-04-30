import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR
//import App from './components/app';
import Destmark from './components/deskmark'

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
render(Destmark);

// Hot Module Replacement API
//不要可行？？需要确定,先暂时不用
if (module.hot) {
  // module.hot.accept('./src/app.js',()=>function(){
  // 	render(App);
  // });
}