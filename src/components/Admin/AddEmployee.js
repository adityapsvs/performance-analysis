import React, { Component } from 'react';
import { Button, Container, Form, Grid, Icon } from 'semantic-ui-react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker-cssmodules.css";

export default class AddEmployee extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      doj: '',
      empId: ''
    }
  }

  handleChange = ( event, { name } ) => {
    this.setState({
      [name]: event.target.value
    });
  }

  handleDate = ( date ) => {
    this.setState({ doj: date });
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
              <Form inverted>
                <Form.Input icon='user' name='fullName' value={this.state.fullName} onChange={this.handleChange} iconPosition='left' fluid label='Full Name' placeholder='Enter full name of the employee' />
                <Form.Input icon='hashtag' name='empId' value={this.state.empId} onChange={this.handleChange} iconPosition='left' fluid label='Employee ID' placeholder='Enter the employee ID' />
                <DatePicker onChange={this.handleDate} placeholderText='MM/DD/YYYY' selected={this.state.doj} />
                <Button type='submit' floated='right' inverted fluid color='green'>Add</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
