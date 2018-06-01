import React, { Component } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default class Efficiency extends Component {

  render() {
    return(
      <AreaChart width={350} height={200} data={this.props.data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <YAxis/>
       <XAxis dataKey="date"/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Area type="monotone" dataKey="efficiency" stroke="#db725e" fill="#E78876" />
      </AreaChart>
    );
  }
}
