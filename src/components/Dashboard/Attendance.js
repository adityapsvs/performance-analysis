import React, { Component } from 'react';
import axios from 'axios';
import { Button, Divider, Header, Icon, Modal } from 'semantic-ui-react';

export default class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enableEntry: 1,
      enableExit: 1,
      openConfirm: false
    }
  }

  componentDidMount() {
    axios.get('/dashboard/attendance', { params: { empId: this.props.empId } })
      .then(res => {
        console.log(res);
        this.setState({ enableEntry: res.data.enableEntry, enableExit: res.data.enableExit });
      });
  }

  markEntry = (e) => {
    let empId = this.props.empId
    axios.post('/dashboard/mark-entry', { empId })
      .then(res => {
        console.log(res);
      })
  }

  confirmExit = (e) => {
    this.setState({ openConfirm: true });
  }

  closeModal = () => {
    this.setState({ openConfirm: false });
  }

  confirmedExit = (e) => {
    this.closeModal();
  }

  render() {
    return(
      <div>
        <Button inverted fluid size='medium' color='green' onClick={this.markEntry}>Mark Entry</Button>
        <Divider horizontal hidden />
        <Button inverted fluid size='medium' color='red' onClick={this.confirmExit}>Mark Exit</Button>
        <Modal open={this.state.openConfirm} onClose={this.closeModal} basic size='small'>
          <Header icon='hand peace' content='Are you sure you want mark your exit?' />
          <Modal.Content>
            <p>Please confirm if you want to mark your exit.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' inverted onClick={this.confirmedExit}>
              <Icon name='remove' /> No
            </Button>
            <Button color='green' inverted onClick={this.confirmedExit}>
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }

}
