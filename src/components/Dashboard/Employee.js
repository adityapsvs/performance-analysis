import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import axios from 'axios';
import Demo from '../../demo.png';

export default class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeOfPreviousMonth: '',
      picSrc: ''
    }
  }

  componentDidMount() {
    axios.get('/dashboard/employee')
      .then(res => {
        this.setState({ employeeOfPreviousMonth: res.data.employee.employeeofpreviousmonth, picSrc: res.data.imageURL });
      });
  }

  render() {
    return(
      <div align='center'>
        <p><b>Employee of the month</b></p>
        <Image src={ this.state.picSrc } circular size='medium'/>
        <p>{ this.state.employeeOfPreviousMonth }</p>
      </div>
    );
  }

}
