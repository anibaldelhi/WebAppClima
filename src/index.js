import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/Routes';
import {ThemeProvider} from '@material-ui/core/styles';
import Theme from './themes/ThemeConfig';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <Routes />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
