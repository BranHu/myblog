import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


import Home from '../views/Home';
import Detail from '../views/Detail';

class Myapp extends React.Component {
    render() {
        return (
            <Router>
               <div>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">Detail</Link></li>
                </ul>

                <Route exact path="/" component={Home}/>
                <Route path="/about" component={Detail}/>
              </div>
            </Router>
        )
    }

}

export default Myapp;