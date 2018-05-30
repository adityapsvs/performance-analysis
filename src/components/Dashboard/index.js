import React, { Component } from 'react';
import { Button, Container, Dimmer, Divider, Grid, Header, Icon, Image, Loader, Modal, Segment } from 'semantic-ui-react';
import Graphs from '../Graphs';
import Employee from './Employee'
import Attendance from './Attendance';
import Demo from '../../demo.png';
import axios from 'axios';
import moment from 'moment';

export default class Dashboard extends Component {

  constructor() {
    super();
    this.state ={
      loader: true,
      confirm: false,
      empId: '',
      empName: '',
      doj: '',
      analytics: '',
      picSrc: ''
    }
  }

  componentDidMount() {
    axios.get('/dashboard/details', { params: { empId: 1001 } })
      .then(res => {
        console.log(res.data.details);
        var picSrc = res.data.details.emp_id+'.jpg';
        this.setState({ empId: res.data.details.emp_id, empName: res.data.details.fullname, doj: moment(res.data.details.doj).format('DD-MM-YYYY'), picSrc: picSrc })
      });

  }

  render() {
    const empId = this.state.empId;
    var attendanceTag;
    if(empId) {
      attendanceTag = <Attendance empId={empId} />
    } else {
      attendanceTag = <Dimmer active={this.state.loader}><Loader>Loading</Loader></Dimmer>;
    }
    console.log(this.state.picSrc);
    return(
      <Container>
        <Segment>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <div align='center'>
                  <Image src={ this.state.picSrc } circular size='small'/>
                  <p>{ this.state.empId }</p>
                  <p>{ this.state.empName }</p>
                  <p>{ this.state.doj }</p>
                </div>
                <Divider horizontal hidden />
                { attendanceTag }
              </Grid.Column>
              <Grid.Column>
                <Employee />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Divider horizontal hidden />
        <Graphs />
      </Container>
    );
  }
}
