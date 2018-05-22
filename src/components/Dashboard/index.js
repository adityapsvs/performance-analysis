import React, { Component } from 'react';
import { Button, Container, Divider, Grid, Image, Segment } from 'semantic-ui-react';
import Graphs from '../Graphs'
import Demo from '../../demo.png';

export default class Dashboard extends Component {

  constructor() {
    super();
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
                <Button inverted fluid size='medium' color='red'>Mark Exit</Button>
              </Grid.Column>
              <Grid.Column>
                <div align='center'>
                  <Image src={ Demo } circular size='medium'/>
                  <p><bold>Employee of the month</bold></p>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Graphs />
      </Container>
    );
  }
}
