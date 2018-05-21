import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/Login';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Login />
  </BrowserRouter>, document.getElementById('root'));
