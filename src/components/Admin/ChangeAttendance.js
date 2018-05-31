import React, { Component } from 'react';
import axios from 'axios';
import { Button, Container, Divider, Form, Grid } from 'semantic-ui-react';

export default class ChangeAttendance extends Component {

  constructor(props) {
    super(props);
    this.state = {
      empId: '',
      instatus: '',
      outstatus: ''
    }
  }

  handleChange = ( event, { name } ) => {
    this.setState({
      [name]: event.target.value
    });
  }

  changeEntry = () => {
    var empId = Number(this.state.empId), instatus = Number(this.state.instatus);
    axios
      .post('/master/change-entry', { empId: empId, instatus: instatus })
      .then(res => {
        if(res.data.data.length == 0) { this.setState({ empId: '', instatus: '' }) }
      })
      .catch(err => {
        console.log(err);
      });
  }

  changeExit = () => {
    var empId = Number(this.state.empId), outstatus = Number(this.state.outstatus);
    axios
      .post('/master/change-exit', { empId: empId, outstatus: outstatus })
      .then(res => {
        if(res.data.data.length == 0) { this.setState({ empId: '', outstatus: '' }) }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return(
      <Container fluid>
        <Grid column={16}>
          <Grid.Row centered>
            <h3>Change Entry Time</h3>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column mobile={6} computer={6} tablet={6}>
              <Form inverted onSubmit={this.changeEntry}>
                <Form.Input name='empId' value={this.state.empId} onChange={this.handleChange} fluid placeholder='Enter an Employee ID' />
                <Form.Input name='instatus' value={this.state.instatus} onChange={this.handleChange} fluid placeholder='Enter 1 - punctual, 2 - late, 3 - half day' />
                <Divider horizontal hidden />
                <Button type='submit' floated='right' inverted fluid color='blue'>Add</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <h3>Change Exit Time</h3>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column mobile={6} computer={6} tablet={6}>
              <Form inverted onSubmit={this.changeExit}>
                <Form.Input name='empId' value={this.state.empId} onChange={this.handleChange} fluid placeholder='Enter an Employee ID' />
                <Form.Input name='outstatus' value={this.state.outstatus} onChange={this.handleChange} fluid placeholder='Enter 3 - overtime, 2 - early, 1 - half day' />
                <Divider horizontal hidden />
                <Button type='submit' floated='right' inverted fluid color='blue'>Add</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
