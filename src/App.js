import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import FitbitApiClient from 'fitbit-node';
import LoggedOut from './components/loggedOut'
import LoggedIn from './components/loggedIn'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

let api = "http://localhost:3000"
let current_url = window.location.href
let token = ""


class App extends Component {
  componentDidMount() {
    if (current_url.includes("token")) {
      let raw_token = current_url.split('token=')[1]
      token = raw_token.replace(/#/, "").replace(/_/g, "").replace(/=/g, "")
      this.setState({isLoggedIn: true, token: token})
    } else {
      this.setState({isLoggedIn: false})
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      data: [],
      token: null
    };
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

  handleRenderGraph = () => {
    axios.get(api + '/api/v1/fitbit_data', {
      headers: {auth_token: token}
    }).then((response) => {
      this.setState({
        data: response.data
      })
    })
    .catch((error) => {
      console.error(error)
    })
  }



  render() {
    let button;
    let renderGraph;
    let graph;
    // {
    //   (this.state.isLoggedIn) &&
    //   <LoggedOut />
    // }
    if (!this.state.isLoggedIn) {
      // button = <button onClick={this.handleOnClick} type="button">
      // Login with FitBit
      // </button>
      button = <LoggedOut />
    } else {
      // button = <button onClick={this.handleLogoutClick} type="button">
      // Logout
      // </button>
      button = <LoggedIn token={this.state.token}/>
      renderGraph = <button onClick={this.handleRenderGraph} type="button">
      Correlate My Data!
      </button>
      graph = <LineChart width={900} height={300} data={this.state.data}
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
        {renderGraph}
        {graph}
      </div>
    );
  }
}

export default App;
