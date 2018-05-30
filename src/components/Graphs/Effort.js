import React, { Component } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default class Effort extends Component {

  render() {
    return(
      <AreaChart width={350} height={200} data={this.props.data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Area type="monotone" dataKey="effort" stroke="#82ca9d" fill="#814175" />
     </AreaChart>
    );
  }
}
