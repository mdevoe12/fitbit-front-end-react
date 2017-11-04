import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import FitbitApiClient from 'fitbit-node';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

let api = "http://localhost:3000"
let current_url = window.location.href
let token = ""

let data = [      {name: '10/01', sleep: 400, weight: 85, amt: 240},
                  {name: '10/02', sleep: 300, weight: 90, amt: 221},
                  {name: '10/03', sleep: 200, weight: 89, amt: 220},
                  {name: '10/04', sleep: 180, weight: 88, amt: 200},
                  {name: '10/05', sleep: 0,   weight: 87, amt: 218},
                  {name: '10/06', sleep: 100, weight: 86, amt: 250},
                  {name: '10/07', sleep: 300, weight: 87, amt: 221},
                  {name: '10/08', sleep: 200, weight: 89, amt: 290},
                  {name: '10/09', sleep: 278, weight: 91, amt: 200},
                  {name: '10/10', sleep: 189, weight: 92, amt: 281},
                  {name: '10/11', sleep: 239, weight: 91, amt: 250},
                  {name: '10/12', sleep: 349, weight: 89, amt: 210},]

function setToken() {
  if (current_url.includes("token")) {
    let raw_token = current_url.split('token=')[1]
    token = raw_token.replace(/#/, "").replace(/_/g, "").replace(/=/g, "")
  } else {
    return {isLoggedIn: false}
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = setToken();
  }

  handleLogoutClick = () => {
    axios.delete(api + '/api/v1/logout', {
      headers: {auth_token: token}
    }).then((response => {
      window.location.href = 'http://localhost:8080'
    }))
  }

  handleOnClick = () => {
    axios.get(api + '/api/v1/keys')
    .then((response) => {
      let client = new FitbitApiClient(response.data["id"], response.data["secret"])
      let scope = 'activity heartrate location nutrition profile settings sleep social weight'
      let callback = api + '/auth/fitbit/callback'
      console.log(token)
      window.location.href = client.getAuthorizeUrl(scope, callback)
    })
  }

  handleImportClick = () => {
    console.log(token)
    axios.post(api + '/api/v1/fitbit_data', "", {
      headers: {auth_token: token}
    })
    .then((response) => {
      console.log("success")
    })
  }




  render() {
    console.log(token)
    let button = null;
    let import_button = null;
    let graph = null;

    if (token === "") {
      button = <button onClick={this.handleOnClick} type="button">
      Login with FitBit
      </button>
    } else {
      button = <button onClick={this.handleLogoutClick} type="button">
      Logout
      </button>
      import_button = <button onClick={this.handleImportClick} type="button">
      Import Data
      </button>
      graph =         <LineChart width={900} height={300} data={data}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <XAxis dataKey="name"/>
             <YAxis/>
             <CartesianGrid strokeDasharray="3 3"/>
             <Tooltip/>
             <Legend />
             <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{r: 8}}/>
             <Line type="monotone" dataKey="sleep" stroke="#82ca9d" />
              </LineChart>
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Correlation Station</h1>
        </header>
        <p className="App-intro">
          Correlation Station uses your existing FitBit data and displays correlations among the major data points.
        </p>
        <p className="App-intro">
          Click the button below to begin
        </p>
        {button}
        {import_button}
        {graph}
      </div>
    );
  }
}

export default App;
