import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { PieChart, Pie, Tooltip } from 'recharts';

const data02 = [{name: 'Group A', value: 2400}, {name: 'Group B', value: 4567},
                {name: 'Group C', value: 1398}, {name: 'Group D', value: 9800},
                {name: 'Group E', value: 3908}, {name: 'Group F', value: 4800}];

export default class Graphs extends Component {

  render() {
    return(
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>
            <PieChart width={350} height={200}>
              <Pie data={data02} cx={200} cy={100} innerRadius={40} outerRadius={80} fill="#462171"/>
              <Tooltip />
            </PieChart>
          </Grid.Column>
          <Grid.Column>
            <PieChart width={350} height={200}>
              <Pie data={data02} cx={200} cy={100} innerRadius={40} outerRadius={80} fill="#DA7678"/>
              <Tooltip />
            </PieChart>
          </Grid.Column>
          <Grid.Column>
            <PieChart width={350} height={200}>
              <Pie data={data02} cx={200} cy={100} innerRadius={40} outerRadius={80} fill="#FCAA7A"/>
              <Tooltip />
            </PieChart>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
