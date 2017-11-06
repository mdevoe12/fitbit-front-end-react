import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SleepGraph = props => {
    return (
      <LineChart className="graph" width={900} height={400} data={props.sleepHeartData}>
       <XAxis dataKey="date"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }}/>
       <Legend />
       <Line type="monotone" dataKey="wake" stroke="#40E0D0"/>
       <Line type="monotone" dataKey="rem" stroke="yellow" />
       <Line type="monotone" dataKey="deep" stroke="#82ca9d" />
      </LineChart>
    )
  }

export default SleepGraph;
