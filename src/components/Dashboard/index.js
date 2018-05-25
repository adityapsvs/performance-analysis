import React, { Component } from 'react';
import { Button, Container, Divider, Grid, Header, Icon, Image, Modal, Segment } from 'semantic-ui-react';
import Graphs from '../Graphs'
import Demo from '../../demo.png';

export default class Dashboard extends Component {

  constructor() {
    super();
    this.state ={
      loader: true,
      confirm: false
    }
  }

  confirmExit = (e) => {
    // e.preventDefault();
    this.setState({ confirm: true });
    // console.log(this.state.confirm);
  }

  closeModal = () => {
    this.setState({ confirm: false });
  }

  confirmedExit = (e) => {
    this.closeModal();
  }

  render() {
    return(
      <Container>
        <Segment>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <div align='center'>
                  <Image src={ Demo } circular size='small'/>
                  <p>1001</p>
                  <p>Aditya PSVS</p>
                  <p>25-08-2018</p>
                </div>
                <Divider horizontal hidden />
                <Button inverted fluid size='medium' color='green'>Mark Entry</Button>
                <Divider horizontal hidden />
                <Button inverted fluid size='medium' color='red' onClick={this.confirmExit}>Mark Exit</Button>
              </Grid.Column>
              <Grid.Column>
                <div align='center'>
                  <Image src={ Demo } circular size='medium'/>
                  <p>Employee of the month</p>
                </div>
              </Grid.Column>
              <Modal open={this.state.confirm} onClose={this.closeModal} basic size='small'>
                <Header icon='hand peace outline' content='Are you sure you want mark your exit?' />
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
            </Grid.Row>
          </Grid>
        </Segment>
        <Graphs />
      </Container>
    );
  }
}
