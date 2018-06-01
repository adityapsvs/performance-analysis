import React, { Component } from 'react';
import { Grid, Divider } from 'semantic-ui-react';
import { PieChart, Pie, Tooltip } from 'recharts';
import axios from 'axios';
import Punctuality from './Punctuality';
import Effort from './Effort';
import TimeWastage from './TimeWastage';
import Efficiency from './Efficiency';
import Seriousness from './Seriousness';

export default class Graphs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      improvement: '',
      punctuality: [],
      effort: [],
      timeWastage: [],
      efficiency: [],
      seriousness: []
    }
  }

  componentDidMount() {
    axios.get('/dashboard/analytics', { params: { empId: 1001 } })
      .then(res => {
        this.setState({ improvement: res.data.improvement, punctuality: res.data.punctuality, effort: res.data.effort, timeWastage: res.data.timeWastage, efficiency: res.data.efficiency, seriousness: res.data.seriousness });
      });
  }

  render() {
    const improvement = this.state.improvement;
    var performanceMessage;
    if( improvement == 0 ) {
      performanceMessage = <p>Based on your track record, your work seems to be <b>à la perfection!</b></p>;
    }
    else {
      performanceMessage = <p>Based on your track record, you should maintain an average of <b>{Math.round(improvement * 100) / 100}</b>.</p>;
    }
    return(
      <div align='center'>
        {performanceMessage}
        <Divider horizontal hidden/>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column>
              <p align='center'>Punctuality</p>
              <Punctuality data={this.state.punctuality}/>
            </Grid.Column>
            <Grid.Column>
              <p align='center'>Effort</p>
              <Effort data={this.state.effort} />
            </Grid.Column>
            <Grid.Column>
              <p align='center'>Time Wastage</p>
              <TimeWastage data={this.state.timeWastage} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <p align='center'>Efficiency</p>
              <Efficiency data={this.state.efficiency} />
            </Grid.Column>
            <Grid.Column>
              <p align='center'>Seriousness</p>
              <Seriousness data={this.state.seriousness} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
