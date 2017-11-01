import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import FitbitApiClient from 'fitbit-node';
let test = "test";


class App extends Component {
  handleOnClick = () => {
    axios.get('http://localhost:3000/api/v1/keys')
    .then((response) => {
      let client = new FitbitApiClient(response.data["id"], response.data["secret"])
      let scope = 'activity heartrate location nutrition profile settings sleep social weight'
      let callback = 'http://localhost:3000/auth/fitbit/callback'
      console.log(test)
      window.location.href = client.getAuthorizeUrl(scope, callback)
    })
  }


  render() {
    // debugger
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
        <button text="Login with FitBit" onClick={this.handleOnClick} type="button">
        Login with FitBit
        </button>
      </div>
    );
  }
}

export default App;
