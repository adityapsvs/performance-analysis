import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Login from './components/Login';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(<Login />, document.getElementById('root'));
registerServiceWorker();
