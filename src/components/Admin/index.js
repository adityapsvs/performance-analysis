import React, { Component } from "react";
import { Redirect } from "react-router";
import { Button, Container, Divider, Grid, Icon, Image, Menu, Sidebar, Table, Responsive } from "semantic-ui-react";
import AddEmployee from './AddEmployee';
import ChangeAttendance from './ChangeAttendance';
import Settings from './Settings';
import RatePerformance from './RatePerformance';
import axios from 'axios';

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      component: '',
      logout: false,
      employees: []
    };
  }

  componentDidMount() {
    axios
      .get('/master/employees')
      .then(res => {
        this.setState({ employees: res.data.employees });
      });
  }

  renderComponent(name) {
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
        return null;
    }
  }

  changeComponent = event => {
    this.setState({ component: event.target.name });
  }

  logout = () => {
    this.setState({ logout: true });
  }

  render() {
    var employees = this.state.employees;
    var AdminComponent = this.renderComponent(this.state.component, this.state.employees);
    if(this.state.logout || this.props.location.state === undefined) {
      return <Redirect to={{ pathname: '/' }} />;
    } else {
      return (
        <Container fluid>
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

            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column mobile={10} tablet={8} computer={2}>
                <Table singleLine>
                  <Table.Body>
                    {
                      employees.map((employee, index) => {
                        return (
                          <Table.Row key={index}>
                            <Table.Cell>{ employee.emp_id }</Table.Cell>
                            <Table.Cell>{ employee.fullname }</Table.Cell>
                          </Table.Row>
                        );
                      })
                    }
                  </Table.Body>
                </Table>
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
}
