import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import FitbitApiClient from 'fitbit-node';

class App extends Component {
  handleOnClick = () => {
    axios.get('http://localhost:3000/api/v1/keys')
    .then((response) => {
      let client = new FitbitApiClient(response.data["id"], response.data["secret"])
      let scope = 'activity heartrate location nutrition profile settings sleep social weight'
      let callback = 'http://localhost:3000/auth/fitbit/callback'
      window.location.href = client.getAuthorizeUrl(scope, callback)
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <a href="//google.com">Click to Login to FitBit</a>
        <button text="Login with FitBit" onClick={this.handleOnClick} type="button">
        Login with FitBit
        </button>
      </div>
    );
  }
}

export default App;
