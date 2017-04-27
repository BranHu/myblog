import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {cyan500} from 'material-ui/styles/colors';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';

const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500,
  },
  appBar: {
    height: 50,
  },
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <MyAwesomeReactComponent />
  </MuiThemeProvider>
);

export default App;
