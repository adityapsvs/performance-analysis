import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, document.getElementById('root'));
