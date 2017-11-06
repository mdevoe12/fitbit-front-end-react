import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const WeightHeart = props => {
  console.log(props.sleepActivityData)
    return (
      <LineChart className="graph" width={900} height={400} data={props.sleepActivityData}>
       <XAxis dataKey="date"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }}/>
       <Legend />
       <Line type="monotone" dataKey="caloriesOut_in_thousands" stroke="#40E0D0"/>
       <Line type="monotone" dataKey="heart_rate" stroke="yellow" />
      </LineChart>
    )
  }

export default WeightHeart;
