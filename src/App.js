import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import FitbitApiClient from 'fitbit-node';

import { LineChart, Line } from 'recharts';

let api = "http://localhost:3000"
let current_url = window.location.href
let token = ""

let data = [      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},]

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
        <LineChart width={400} height={400} data={data}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        </LineChart>
      </div>
    );
  }
}

export default App;
