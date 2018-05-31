import React, { Component } from "react";
import { render } from "react-dom";
import { Container, Divider, Grid, Icon, Image, Menu, Sidebar, Responsive, Button } from "semantic-ui-react";
import AddEmployee from './AddEmployee';
import ChangeAttendance from './ChangeAttendance';
import Settings from './Settings';
import RatePerformance from './RatePerformance';

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      component: 'addEmployee'
    };
  }

  renderComponent(name) {
    console.log(name);
    switch(name) {
      case 'addEmployee':
        return <AddEmployee />;
        break;
      case 'generalSettings':
        return <Settings />;
        break;
      case 'changeAttendance':
        return <ChangeAttendance />;
        break;
      case 'ratePerformance':
        return <RatePerformance />;
        break;
      default:
        return <AddEmployee />;
    }
  }

  changeComponent = event => {
    console.log(event.target.name);
    this.setState({ component: event.target.name });
  }

  render() {
    var AdminComponent = this.renderComponent(this.state.component);
    return (
      <Container fluid>
        <Grid columns={4}>
          <Divider horizontal hidden />
          <Grid.Row>
            <Grid.Column>
              <Button onClick={this.changeComponent} name='addEmployee' size='medium' inverted fluid color='green'>Add Employee</Button>
            </Grid.Column>
            <Grid.Column>
              <Button onClick={this.changeComponent} name='generalSettings' size='medium' inverted fluid color='red'>General Settings</Button>
            </Grid.Column>
            <Grid.Column>
              <Button onClick={this.changeComponent} name='changeAttendance' size='medium' inverted fluid color='blue'>Change Attendance</Button>
            </Grid.Column>
            <Grid.Column>
              <Button onClick={this.changeComponent} name='ratePerformance' size='medium' inverted fluid color='orange'>Rate performance</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            { AdminComponent }
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
