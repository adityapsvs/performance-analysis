import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';

export default class Routes extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route eact path='/admin' component={Admin} />
      </Switch>
    )
  }
}
