import React, { Component } from 'react';
import { Divider, Grid, Message } from 'semantic-ui-react';
import axios from 'axios';

export default class Messages extends Component {

  constructor() {
    super();
    this.state = {
      message: ''
    }
  }

  componentDidMount() {
    axios
      .get('/dashboard/message')
      .then(res => {
        this.setState({ message: res.data.message.message });
      });
  }

  render() {
    var message = this.state.message;
    if(message == null) {
      return(
        <Divider horizontal hidden />
      );
    } else {
      return(
        <div align='center'>
          <Grid columns={16}>
            <Grid.Row centered>
              <Divider horizontal hidden />
              <Message info>
                <Message.Header>Message from Admin</Message.Header>
                <p>{message}</p>
              </Message>
              <Divider horizontal hidden />
            </Grid.Row>
          </Grid>
        </div>
      );
    }
  }
}
