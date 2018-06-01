import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Button, Container, Dimmer, Divider, Grid, Header, Icon, Image, Loader, Modal, Segment } from 'semantic-ui-react';
import Graphs from '../Graphs';
import Employee from './Employee'
import Attendance from './Attendance';
import Messages from './Messages';
import Demo from '../../demo.png';
import axios from 'axios';
import moment from 'moment';

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      confirm: false,
      empId: '',
      empName: '',
      doj: '',
      analytics: '',
      picSrc: '',
      logout: false
    }
  }

  componentDidMount() {
    if(this.props.location.state !== undefined) {
      axios.get('/dashboard/details', { params: { empId: Number(this.props.location.state.empId) } })
        .then(res => {
          this.setState({ empId: res.data.details.emp_id, empName: res.data.details.fullname, doj: moment(res.data.details.doj).format('DD-MM-YYYY'), picSrc: res.data.details.image})
        });
      this.setState({ empId: this.props.location.state.empId });
    }
  }

  logout = () => {
    this.setState({ logout: true });
  }

  render() {
    const empId = this.state.empId;
    var attendanceTag;
    if(empId) {
      attendanceTag = <Attendance empId={empId} />;
    } else {
      attendanceTag = <Dimmer active={this.state.loader}><Loader>Loading</Loader></Dimmer>;
    }
    if(this.props.location.state === undefined || this.state.logout) {
      return <Redirect to={{ pathname: '/' }} />;
    } else {
      return(
        <Container>
          <Divider horizontal hidden />
          <Grid columns={16}>
            <Grid.Row centered>
              <Grid.Column mobile={2} computer={2} tablet={2}>
                <Button onClick={this.logout} icon labelPosition='left'>
                  <Icon name='power' />
                  Logout
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider horizontal hidden />
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
          <Messages />
          <Graphs />
        </Container>
      );
    }
  }
}
