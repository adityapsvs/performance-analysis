import React, { Component } from 'react';
import { Button, Container, Dimmer, Divider, Dropdown, Form, Grid, Header, Icon, Input, Loader, Modal } from 'semantic-ui-react';
import axios from 'axios';

export default class RatePerformace extends Component {

  constructor(props) {
    super(props);
    this.state = {
      employees: this.props.employees,
      loader: true,
      empId: '',
      effort: 1,
      seriousness: 1,
      efficiency: 1,
      timeWastage: 1,
      enable: true,
      openFailModal: false,
      employees: this.props.employees
    }
  }

  componentDidMount() {
    axios
      .get('/master/holiday')
      .then(res => {
        if(res.data.enable === 0) { this.setState({ enable: false }); }
      })
      .catch(err => {
        console.log(err);
      });
  }

  submitPerformance = () => {
    var empId = Number(this.state.empId), effort = Number(this.state.effort), seriousness = Number(this.state.seriousness), efficiency = Number(this.state.efficiency), timeWastage = Number(this.state.timeWastage);
    axios
      .post('/master/performance', {empId: empId, effort: effort, seriousness: seriousness, efficiency: efficiency, timeWastage: timeWastage})
      .then(res => {
        if(res.data.data === undefined && res.data.data.length == 0) { this.setState({ empId: '', effort: '', seriousness: '', efficiency: '', timeWastage: '' }); }
        else if(res.data.err) { this.setState({ openFailModal: true, empId: '', effort: '', seriousness: '', efficiency: '', timeWastage: '' }); }
      });
  }

  goodReason = () => {
    var empId = Number(this.state.empId);
    axios
      .post('/master/good-reason', { empId: empId })
      .then(res => {
        if(res.data.data !== undefined && res.data.data.length == 0) {
          this.setState({ empId: '' });
        }
        else if(res.data.err) { this.setState({ openFailModal: true, empId: '' }); }
      });
  }

  badReason = () => {
    var empId = Number(this.state.empId);
    axios
      .post('/master/bad-reason', { empId: empId })
      .then(res => {
        if(res.data.data !== undefined && res.data.data.length == 0) {
          this.setState({ empId: '' });
        }
        else if(res.data.err) { this.setState({ openFailModal: true, empId: '' }); }
      });
  }

  openFailModal = () => { this.setState({ openFailModal: false }); }

  handleEmpId = (event) => { this.setState({ empId: event.target.value }); }

  handleParameters = (event) => { this.setState({ [event.target.name]: event.target.value }); }

  render() {
    var employees = this.state.employees;
    var parameters = ['effort', 'seriousness', 'efficiency', 'timeWastage'];
    return(
      <Container fluid>
        <Grid columns={16}>
          <Grid.Row centered>
            <Grid.Column mobile={6} computer={6} tablet={6}>
              <Form inverted>
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
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column mobile={6} computer={6} tablet={6}>
              <Button disabled={!(this.state.enable)} onClick={this.goodReason} fluid inverted color='orange'>Reason for leave accepted</Button>
            </Grid.Column>
            <Grid.Column mobile={6} computer={6} tablet={6}>
              <Button disabled={!(this.state.enable)} onClick={this.badReason} fluid inverted color='orange'>Reason for leave rejected</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column mobile={6} computer={6} tablet={6}>
              <Form inverted onSubmit={this.submitPerformance}>
                <b>Employee ID:</b>
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
                {
                  parameters.map((parameter, index) => {
                    return(
                      <div key={index}>
                        <b>{parameter}:</b>
                        <Form.Field name={parameter} onChange={this.handleParameters} control='select' key={index}>
                          {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value, index) => {
                              return (
                                <option value={value} key={index}>{value}</option>
                              );
                            })
                          }
                        </Form.Field>
                        <Divider horizontal hidden />
                      </div>
                    );
                  })
                }
                <Divider horizontal hidden />
                <Button disabled={!(this.state.enable)} type='submit' floated='right' inverted fluid color='orange'>Add</Button>
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
