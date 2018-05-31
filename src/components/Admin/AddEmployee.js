import React, { Component } from 'react';
import { Button, Container, Form, Grid, Icon } from 'semantic-ui-react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import axios from 'axios';

export default class AddEmployee extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      empId: '',
      password: '',
      doj: ''
    }
  }

  handleChange = ( event, { name } ) => {
    this.setState({
      [name]: event.target.value
    });
  }

  handleDate = ( date ) => {
    console.log(typeof date);
    this.setState({ doj: date });
  }

  handleSubmit = () => {
    console.log(this.state.fullName, this.state.empId, this.state.doj, this.state.password);
    var dateString = this.state.doj.split('/');
    var date = new Date(dateString[2], dateString[1]-1, dateString[0]);
    axios
      .post('/master/add-employee', { fullName: this.state.fullName, empId: this.state.empId, password: this.state.password, doj: date })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return(
      <Container fluid>
        <Grid centered>
          <Grid.Row>
            <h1>Add Employee</h1>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={10} tablet={8} computer={6}>
              <Form inverted onSubmit={this.handleSubmit}>
                <Form.Input icon='user' name='fullName' value={this.state.fullName} onChange={this.handleChange} iconPosition='left' fluid label='Full Name' placeholder='Enter full name of the employee' />
                <Form.Input icon='hashtag' name='empId' value={this.state.empId} onChange={this.handleChange} iconPosition='left' fluid label='Employee ID' placeholder='Enter the employee ID' />
                <Form.Input icon='spy' name='password' value={this.state.password} onChange={this.handleChange} iconPosition='left' fluid label='Password' placeholder='Enter the password' type='password'/>
                <Form.Input icon='calendar' name='doj' value={this.state.doj} onChange={this.handleChange} iconPosition='left' fluid label='DOJ' placeholder='DD/MM/YYYY'/>
                <Button type='submit' floated='right' inverted fluid color='green'>Add</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
