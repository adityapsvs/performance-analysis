import React, { Component } from "react";
import { render } from "react-dom";
import { Container, Divider, Icon, Image, Menu, Sidebar, Responsive, Button } from "semantic-ui-react";
import AddEmployee from './AddEmployee';
import ChangeAttendance from './ChangeAttendance';
import Settings from './Settings';

const NavBarMobile = ({ object, onPusherClick, onToggle, visible }) => (
  <Sidebar.Pushable>
    <Sidebar
      as={Menu}
      animation="scale down"
      vertical
      visible={visible}
    >
      <Menu.Item onClick={ object.renderAdmin } name='addEmployee'>
        <Icon name='add user' />
        Add Employee
      </Menu.Item>
      <Menu.Item onClick={ object.renderAdmin } name='settings'>
        <Icon name='settings' />
        General settings
      </Menu.Item>
      <Menu.Item onClick={ object.renderAdmin } name='changeAttendance'>
        <Icon name='alarm' />
        Change Attendance
      </Menu.Item>
    </Sidebar>
    <Sidebar.Pusher
      dimmed={visible}
      onClick={onPusherClick}
      style={{ minHeight: "100vh" }}
    >
      <Divider horizontal hidden />
      <Container>
        <Button onClick={onToggle} size='huge'>
          <div align='center'>
            <Icon name="setting" />
          </div>
        </Button>
        <div id='admin' align='center'>
          <h1>Welcome to the Admin Panel</h1>
        </div>
      </Container>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

export default class NavBar extends Component {
  state = {
    visible: false
  };

  handlePusher = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  renderAdmin = ( event, { name } ) => {
    event.preventDefault();
    this.setState({ visible: false });
    switch (name) {
      case 'addEmployee':
        render(<AddEmployee />, document.getElementById('admin'));
        break;
      case 'settings':
        render(<Settings />, document.getElementById('admin'));
        break;
      case 'changeAttendance':
        render(<ChangeAttendance />, document.getElementById('admin'));
    }
  }

  render() {
    const { visible } = this.state;

    return (
      <div>
        <Responsive {...Responsive.onlyMobile}>
          <NavBarMobile
            object={this}
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            visible={visible}
          />
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <NavBarMobile
            object={this}
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            visible={visible}
          />
        </Responsive>
      </div>
    );
  }
}
