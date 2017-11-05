import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Graph = props => {
    return (
      <LineChart className="graph" width={900} height={300} data={props.data}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="date"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone" dataKey="heart_rate" stroke="#8884d8" activeDot={{r: 8}}/>
       <Line type="monotone" dataKey="rem" stroke="#82ca9d" />
       <Line type="monotone" dataKey="deep" stroke="#82ca9d" />
      </LineChart>
    )
  }

export default Graph;
