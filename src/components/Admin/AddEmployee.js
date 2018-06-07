import React, { Component } from 'react';
import { Button, Container, Form, Grid, Icon, Modal, Header } from 'semantic-ui-react';
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
      doj: '',
      image: '',
      openFailModal: false
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

  handleSubmit = () => {
    var dateString = this.state.doj.split('/');
    var date = new Date(dateString[2], dateString[1]-1, dateString[0]);
    axios
      .post('/master/add-employee', { fullName: this.state.fullName, empId: this.state.empId, password: this.state.password, doj: date, image: this.state.image })
      .then(res => {
        if(res.data.message) { this.setState({ fullName: '', empId: '', password: '', doj: '', image: '' }); }
        else if(res.data.err) { this.setState({ openFailModal: true, fullName: '', empId: '', password: '', doj: '', image: '' }); }
      })
  }

  openFailModal = () => { this.setState({ openFailModal: false }); }

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
                <Form.Input icon='image' name='image' value={this.state.image} onChange={this.handleChange} iconPosition='left' fluid label='Image' placeholder='Upload the host link'/>
                <Button type='submit' floated='right' inverted fluid color='green'>Add</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Modal open={this.state.openFailModal} onClose={this.openFailModal} basic size='small'>
            <Header icon='warning sign' content='Failed in doing that!' />
            <Modal.Actions>
              <Button color='red' inverted onClick={this.openFailModal}>
                <Icon name='repeat' /> Try again
              </Button>
            </Modal.Actions>
          </Modal>
        </Grid>
      </Container>
    );
  }
}
