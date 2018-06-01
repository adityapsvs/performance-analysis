import React, { Component } from 'react';
import { Button, Container, Divider, Form, Grid, Input } from 'semantic-ui-react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import MultipleDatePicker from 'react-multiple-datepicker';
import axios from 'axios';

export default class Settings extends Component {

  constructor(props) {
    super(props);
    // let startTime = moment('11:00 AM', 'hh:mm a')
    this.state = {
      startTime: '',
      endTime: '',
      employeeOfTheMonth: ''
    }
  }

  handleChange = ( event, { name } ) => {
    this.setState({
      [name]: event.target.value
    });
  }

  submitEmployee = () => {
    console.log(this.state.employeeOfTheMonth);
    var empId = Number(this.state.employeeOfTheMonth);
    axios
      .post('/master/add-eom', { empId: empId })
      .then(res => { if(res.data.data.length == 0) { this.setState({ employeeOfTheMonth: '' }); } })
      .catch(err => { console.log(err); });
  }

  submitStartTime = () => {
    console.log(this.state.startTime);
    var startTime = this.state.startTime;
    axios
      .post('/master/add-start', { startTime: startTime })
      .then(res => { if(res.data.data == null) { this.setState({ startTime: '' }); } })
      .catch(err => { console.log(err); });
  }

  submitEndTime = () => {
    console.log(this.state.endTime);
    var endTime = this.state.endTime;
    axios
      .post('/master/add-end', { endTime: endTime })
      .then(res => { if(res.data.data == null) { this.setState({ endTime: '' }); } })
      .catch(err => { console.log(err); });
  }

  render() {
    return(
      <Container fluid>
        <Grid centered columns={16}>
          <Grid.Row>
            <h1>General Settings</h1>
          </Grid.Row>
          <Divider horizontal hidden />
          <Grid.Row>
            <h3>Add Employee of the month</h3>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column mobile={6} computer={6} tablet={6}>
              <Form inverted onSubmit={this.submitEmployee}>
                <Form.Input name='employeeOfTheMonth' value={this.state.employeeOfTheMonth} onChange={this.handleChange} fluid placeholder='Enter an Employee ID' />
                <Divider horizontal hidden />
                <Button type='submit' floated='right' inverted fluid color='red'>Add</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Divider horizontal hidden />
          <Grid.Row>
            <h3>Add Start time of the office</h3>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column mobile={6} computer={6} tablet={6}>
              <Form inverted onSubmit={this.submitStartTime}>
                <Form.Input name='startTime' value={this.state.startTime} onChange={this.handleChange} fluid placeholder='HH:MM:SS' />
                <Divider horizontal hidden />
                <Button type='submit' floated='right' inverted fluid color='red'>Add</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Divider horizontal hidden />
          <Grid.Row>
            <h3>Add End time of the office</h3>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column mobile={6} computer={6} tablet={6}>
              <Form inverted onSubmit={this.submitEndTime}>
                <Form.Input name='endTime' value={this.state.endTime} onChange={this.handleChange} fluid placeholder='HH:MM:SS' />
                <Divider horizontal hidden />
                <Button type='submit' floated='right' inverted fluid color='red'>Add</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Divider horizontal hidden />
          <Grid.Row>
            <h3>Choose Holidays for the month</h3>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
