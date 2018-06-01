import React, { Component } from 'react';
import { Button, Container, Divider, Form, Grid, Message} from 'semantic-ui-react';
import { Redirect } from 'react-router';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empId: '',
      password: '',
      redirect: false,
      failure: false
    }
  }

  handleChange = event => {
    event.target.name === 'empId' ? this.setState({ empId: event.target.value }) : this.setState({ password: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ redirect: 'dashboard' });
    axios
      .post('/login', { empId: this.state.empId, password: this.state.password })
      .then(res => {
        if(res.data.redirect === 1) { this.setState({ redirect: 'admin' }); }
        else if(res.data.redirect === 2) { this.setState({ redirect: 'user' }); }
        else if(res.data.redirect === 0) { this.setState({ failure: true }); }
      });
  }

  render() {
    const redirect = this.state.redirect;
    if(redirect === 'user') {
      return ( <Redirect to={{ pathname: '/dashboard', state: { empId: this.state.empId } }} /> );
    } else if(redirect === 'admin') {
      return ( <Redirect to={{ pathname: '/admin', state: { empId: 1000 } }} /> );
    } else {
      var failure = null;
      if(this.state.failure) { failure =
        <Message negative>
          <Message.Header>Authentication failure!</Message.Header>
        </Message>
      }
      return (
        <Container fluid>
          <Grid centered>
            <Grid.Row>
              <Grid.Column mobile={10} tablet={8} computer={6}>
                <Form onSubmit={ e => this.handleSubmit(e) } inverted>
                  <Form.Input name='empId' icon='user' value={this.state.empId} onChange={this.handleChange} iconPosition='left' fluid label='Employee Id' placeholder='Please enter your employee Id' />
                  <Form.Input name='password' icon='lock' value={this.state.password} onChange={this.handleChange} iconPosition='left' fluid label='Password' type='password' placeholder='Please enter your password' />
                  <Button type='submit' floated='right' inverted fluid color='blue'>Log In</Button>
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column mobile={10} tablet={8} computer={6}>
                {failure}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      );
    }
  }
}
