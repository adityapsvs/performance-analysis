import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Routes from './Routes';
import Login from './components/Login';

class App extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <Container fluid style={{margin:0, padding:0}}>
        <Routes>
          <Login />
        </Routes>
      </Container>
    );
  }
}

export default App;
