import React from 'react';
import ReactDOM from 'react-dom';
import Myapp from './routes/index.js';
import { AppContainer } from 'react-hot-loader';


ReactDOM.render(
    <AppContainer>
	  <Provider store={store}>
	    <Myapp />
	  </Provider>  
    </AppContainer>,document.getElementById('root'));