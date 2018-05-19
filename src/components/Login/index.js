import React, { Component } from 'react';
import { Button, Form, Container, Grid} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      empId: '',
      password: ''
    }
  }

  handleChange = event => {
    event.target.name === 'empId' ? this.setState({ empId: event.target.value }) : this.setState({ password: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios
      .post('/login', { empId: this.state.empId, password: this.state.password })
      .then(res => {
        console.log(res)
      })
  }

  render() {
    return (
      <Container fluid>
        <Grid centered>
          <Grid.Row>
            <Grid.Column mobile={10} tablet={8} computer={6}>
              <Form onSubmit={ e => this.handleSubmit(e) } inverted>
                <Form.Input name='empId' icon='user' value={this.state.empId} onChange={this.handleChange} iconPosition='left' fluid label='Employee Id' placeholder='Please enter your employee Id' />
                <Form.Input name='password' icon='lock' value={this.state.password} onChange={this.handleChange} iconPosition='left' fluid label='Password' placeholder='Please enter your password' />
                <Button type='submit' floated='right' inverted fluid color='blue'>Log In</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}
