import React, { Component } from 'react';
import { Button, Container, Divider, Form, Grid, Header, Icon, Input, Modal } from 'semantic-ui-react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import MultipleDatePicker from 'react-multiple-datepicker';
import axios from 'axios';

export default class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startTime: '',
      endTime: '',
      employeeOfTheMonth: '',
      message: '',
      dates: [],
      successMsg: false,
      openFailModal: false
    }
  }

  handleChange = ( event, { name } ) => {
    this.setState({
      [name]: event.target.value
    });
  }

  submitEmployee = () => {
    var empId = Number(this.state.employeeOfTheMonth);
    axios
      .post('/master/add-eom', { empId: empId })
      .then(res => {
        if(res.data.data !== undefined && res.data.data.length == 0) {
          this.setState({ employeeOfTheMonth: '' });
        }
        else if(res.data.err) { this.setState({ openFailModal: true, employeeOfTheMonth: '' }); }
      });
  }

  submitStartTime = () => {
    var startTime = this.state.startTime;
    axios
      .post('/master/add-start', { startTime: startTime })
      .then(res => {
        if(res.data.data !== undefined && res.data.data == null) { this.setState({ startTime: '' }); }
        else if(res.data.err) { this.setState({ openFailModal: true, startTime: '' }); }
       });
  }

  submitEndTime = () => {
    var endTime = this.state.endTime;
    axios
      .post('/master/add-end', { endTime: endTime })
      .then(res => {
        if(res.data.data !== undefined && res.data.data == null) { this.setState({ endTime: '' }); }
        else if(res.data.err) { this.setState({ openFailModal: true, endTime: '' }); }
       });
  }

  submitMessage = () => {
    var message = this.state.message;
    axios
      .post('/master/add-message', { message: message })
      .then(res => {
        if(res.data.data !== undefined && res.data.data == null) { this.setState({ message: '' }); }
        else if(res.data.err) { this.setState({ openFailModal: true, message: '' }); }
      });
  }

  addDates = (dates) => {
    this.setState({ dates: dates });
  }

  submitDates = () => {
    var dates = this.state.dates;
    axios
      .post('/master/add-dates', { dates: dates })
      .then(res => {
        if(res.data.data !== undefined && res.data.data === null) { this.setState({ successMsg: true }); }
        else if(res.data.err) { this.setState({ openFailModal: true }); }
       })
  }

  closeModal = () => {
    this.setState({ successMsg: false })
  }

  openFailModal = () => { this.setState({ openFailModal: false }); }

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
            <h3>Add message to the employees</h3>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column mobile={6} computer={6} tablet={6}>
              <Form inverted onSubmit={this.submitMessage}>
                <Form.Input name='message' value={this.state.message} onChange={this.handleChange} maxLength='160' fluid placeholder='Any message to the employees' />
                <Divider horizontal hidden />
                <Button type='submit' floated='right' inverted fluid color='red'>Add</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Divider horizontal hidden />
          <Grid.Row>
            <h3>Choose Holidays for the month</h3>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column mobile={6} computer={6} tablet={6}>
              <Form onSubmit={this.submitDates}>
                <Form.Input>
                  <MultipleDatePicker onSubmit={dates => this.addDates(dates)} />
                </Form.Input>
                <Divider horizontal hidden />
                <Button type='submit' floated='right' inverted fluid color='red'>Add</Button>
              </Form>
              <Modal open={this.state.successMsg} onClose={this.closeModal} basic size='small'>
                <Header icon='calendar' content='Holidays Added successfully' />
                <Modal.Actions>
                  <Button color='green' inverted onClick={this.closeModal}>
                    <Icon name='checkmark' /> Okay
                  </Button>
                </Modal.Actions>
              </Modal>
              <Modal open={this.state.openFailModal} onClose={this.openFailModal} basic size='small'>
                <Header icon='warning sign' content='Failed in doing that!' />
                <Modal.Actions>
                  <Button color='red' inverted onClick={this.openFailModal}>
                    <Icon name='repeat' /> Try again
                  </Button>
                </Modal.Actions>
              </Modal>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
