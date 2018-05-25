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
            <p align='center'>Punctuality</p>
            <PieChart width={350} height={200}>
              <Pie data={data02} cx={200} cy={100} innerRadius={40} outerRadius={80} fill="#462171"/>
              <Tooltip />
            </PieChart>
          </Grid.Column>
          <Grid.Column>
            <p align='center'>Effort</p>
            <PieChart width={350} height={200}>
              <Pie data={data02} cx={200} cy={100} innerRadius={40} outerRadius={80} fill="#814175"/>
              <Tooltip />
            </PieChart>
          </Grid.Column>
          <Grid.Column>
            <p align='center'>Time Wastage</p>
            <PieChart width={350} height={200}>
              <Pie data={data02} cx={200} cy={100} innerRadius={40} outerRadius={80} fill="#D46C77"/>
              <Tooltip />
            </PieChart>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <p align='center'>Efficiency</p>
            <PieChart width={350} height={200}>
              <Pie data={data02} cx={200} cy={100} innerRadius={40} outerRadius={80} fill="#E78876"/>
              <Tooltip />
            </PieChart>
          </Grid.Column>
          <Grid.Column>
            <p align='center'>Seriousness</p>
            <PieChart width={350} height={200}>
              <Pie data={data02} cx={200} cy={100} innerRadius={40} outerRadius={80} fill="#FDAB79"/>
              <Tooltip />
            </PieChart>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
