import React, { Component } from 'react';
import { Button, Container, Dimmer, Divider, Dropdown, Form, Grid, Header, Icon, Input, Loader, Modal } from 'semantic-ui-react';
import axios from 'axios';

export default class RatePerformace extends Component {

  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      loader: true,
      empId: '',
      effort: '',
      seriousness: '',
      efficiency: '',
      timeWastage: '',
      enable: true,
      openFailModal: false
    }
  }

  componentDidMount() {
    axios
      .get('/master/employees')
      .then(res => {
        if(res.data.enable === 0) { this.setState({ enable: false }); }
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange = ( event, { name } ) => {
    this.setState({
      [name]: event.target.value
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

  render() {
    var employees = this.state.employees;
    if(!employees) {
      return (
        <Container fluid>
          <Dimmer active={this.state.loader}><Loader>Loading</Loader></Dimmer>;
        </Container>
      );
    } else {
      return(
        <Container fluid>
          <Grid columns={16}>
            <Grid.Row centered>
              {employees}
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column mobile={6} computer={6} tablet={6}>
                <Input name='empId' value={this.state.empId} onChange={this.handleChange} inverted fluid placeholder='Employee ID'/>
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
                  <Form.Input name='empId' value={this.state.empId} onChange={this.handleChange} fluid placeholder='Employee ID' />
                  <Form.Input name='effort' value={this.state.effort} onChange={this.handleChange} fluid placeholder='Efforts /10' />
                  <Form.Input name='seriousness' value={this.state.seriousness} onChange={this.handleChange} fluid placeholder='Seriousness /10' />
                  <Form.Input name='efficiency' value={this.state.efficiency} onChange={this.handleChange} fluid placeholder='Efficiency /10' />
                  <Form.Input name='timeWastage' value={this.state.timeWastage} onChange={this.handleChange} fluid placeholder='Time Wastage /10' />
                  <Divider horizontal hidden />
                  <Button type='submit' floated='right' inverted fluid color='orange'>Add</Button>
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
}
