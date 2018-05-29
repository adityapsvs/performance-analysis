import React, { Component } from 'react';
import { Button, Container, Divider, Form, Grid, Input } from 'semantic-ui-react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import MultipleDatePicker from 'react-multiple-datepicker';

export default class Settings extends Component {

  constructor(props) {
    super(props);
    // let startTime = moment('11:00 AM', 'hh:mm a')
    this.state = {
      startTime: moment('11:00 AM', 'hh:mm a'),
      endTime: moment('08:00 PM', 'hh:mm a'),
      employeeOfTheMonth: ''
    }
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({ employeeOfTheMonth: [event.target.value] });
  }

  handleSubmit = event => {
    console.log(event.target.name);
  }

  handleStart = ( time ) => {
    this.setState({ startTime: time })
  }

  handleEnd = ( time ) => {
    this.setState({ endTime: time })
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
            <Grid.Column mobile={10} computer={10} tablet={10}>
              <Form inverted>
                <Form.Input name='addEmployeeInput' value={this.state.employeeOfTheMonth} onChange={this.handleChange} fluid placeholder='Enter the Name of Employee of the month' />
              </Form>
            </Grid.Column>
            <Grid.Column mobile={6} computer={6} tablet={6}>
              <Button name='addEmployeeButton' color='red' onClick={this.handleSubmit}>Submit</Button>
            </Grid.Column>
          </Grid.Row>
          <Divider horizontal hidden />
          <Grid.Row>
            <h3>Add Start time of the office</h3>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column mobile={10} computer={10} tablet={10}>
              <Form inverted>
                <style>
                  {`.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list {
                    padding-left: 0;
                    padding-right: 0;
                  }`}
                </style>
                <DatePicker
                  selected={this.state.startTime}
                  onChange={this.handleStart}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="LT"
                  timeCaption="Time"
                  placeholder="Click to select a start time"
                />
              </Form>
            </Grid.Column>
            <Grid.Column mobile={6} computer={6} tablet={6}>
              <Button name='addStartTimeButton' color='red' onClick={this.handleSubmit}>Submit</Button>
            </Grid.Column>
          </Grid.Row>
          <Divider horizontal hidden />
          <Grid.Row>
            <h3>Add End time of the office</h3>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column mobile={10} computer={10} tablet={10}>
              <Form inverted>
                <DatePicker
                  selected={this.state.endTime}
                  onChange={this.handleEnd}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="LT"
                  timeCaption="Time"
                  placeholder="Click to select an end time"
                />
              </Form>
            </Grid.Column>
            <Grid.Column mobile={6} computer={6} tablet={6}>
              <Button name='addStartTimeButton' color='red' onClick={this.handleSubmit}>Submit</Button>
            </Grid.Column>
          </Grid.Row>
          <Divider horizontal hidden />
          <Grid.Row>
            <h3>Choose Holidays for the month</h3>
          </Grid.Row>
          <Grid.Row centered>
            <Form inverted>
              <MultipleDatePicker
                onSubmit={dates => console.log('selected date', dates)}
              />
            </Form>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
