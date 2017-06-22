import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import createHistory from 'history/createHashHistory';
const history = createHistory();

import Home from '../views/Home';
import Detail from '../views/Detail';

class Routhu extends React.Component {
    render() {
        return (
            <Router history={history}>
                <div>
                <Route path='/' component={Home} />
                <Route path='/detail' component={Detail} />
                </div>
            </Router>
        )
    }

}

export default Routhu;