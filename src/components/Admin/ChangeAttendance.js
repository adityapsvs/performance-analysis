import React, { Component } from 'react';
import axios from 'axios';
import { Button, Container, Divider, Form, Grid, Header, Icon, Modal } from 'semantic-ui-react';

export default class ChangeAttendance extends Component {

  constructor(props) {
    super(props);
    this.state = {
      empId: '',
      instatus: 1,
      outstatus: 1,
      openFailModal: false,
      employees: this.props.employees
    }
  }

  changeEntry = () => {
    var empId = Number(this.state.empId), instatus = Number(this.state.instatus);
    axios
      .post('/master/change-entry', { empId: empId, instatus: instatus })
      .then(res => {
        if(res.data.data !== undefined) { this.setState({ empId: '', instatus: '' }) }
        else if(res.data.err) { this.setState({ openFailModal: true, empId: '', instatus: '' }); }
      });
  }

  changeExit = () => {
    var empId = Number(this.state.empId), outstatus = Number(this.state.outstatus);
    axios
      .post('/master/change-exit', { empId: empId, outstatus: outstatus })
      .then(res => {
        if(res.data.data !== undefined) { this.setState({ empId: '', outstatus: '' }) }
        else if(res.data.err) { this.setState({ openFailModal: true, empId: '', outstatus: '' }); }
      });
  }

  handleEmpId = (event) => { this.setState({ empId: event.target.value }); }

  handleOutStatus = (event) => { this.setState({ outstatus: event.target.value }); }

  handleInStatus = (event) => { this.setState({ instatus: event.target.value }); }

  openFailModal = () => { this.setState({ openFailModal: false }); }

  render() {
    var employees = this.state.employees;
    return(
      <Container fluid>
        <Grid column={16}>
          <Grid.Row centered>
            <h3>Change Entry Time</h3>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column mobile={6} computer={6} tablet={6}>
              <Form inverted onSubmit={this.changeEntry}>
                <Form.Field name='empId' onChange={this.handleEmpId} control='select'>
                  {
                    employees.map((employee, index) => {
                      var value = employee.emp_id+' - '+employee.fullname;
                      return (
                        <option value={employee.emp_id} key={index}>{value}</option>
                      );
                    })
                  }
                </Form.Field>
                <Form.Field name='instatus' onChange={this.handleInStatus} control='select'>
                  {
                    ['punctual', 'Late', 'Half'].map((status, index) => {
                      var value = (index+1)+' - '+status;
                      return (
                        <option value={index+1} key={index}>{value}</option>
                      );
                    })
                  }
                </Form.Field>
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
                <Form.Field name='empId' onChange={this.handleEmpId} placeholder='Select an employee' control='select'>
                  {
                    employees.map((employee, index) => {
                      var value = employee.emp_id+': '+employee.fullname;
                      return (
                        <option value={employee.emp_id} key={index}>{value}</option>
                      );
                    })
                  }
                </Form.Field>
                <Form.Field name='outstatus' onChange={this.handleOutStatus} control='select'>
                  {
                    ['Half', 'Early', 'overtime'].map((status, index) => {
                      var value = (index+1)+' - '+status;
                      return (
                        <option value={index+1} key={index}>{value}</option>
                      );
                    })
                  }
                </Form.Field>
                <Divider horizontal hidden />
                <Button type='submit' floated='right' inverted fluid color='blue'>Add</Button>
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
