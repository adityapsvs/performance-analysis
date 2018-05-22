import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

export default class Routes extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/dash-board' component={Dashboard} />
      </Switch>
    )
  }
}
