import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import FitbitApiClient from 'fitbit-node';
let current_url = window.location.href
let token = ""




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
    axios.delete('http://localhost:3000/api/v1/logout', {
      headers: {auth_token: token}
    }).then((response => {
      window.location.href = 'http://localhost:8080'
    }))
  }

  handleOnClick = () => {
    axios.get('http://localhost:3000/api/v1/keys')
    .then((response) => {
      let client = new FitbitApiClient(response.data["id"], response.data["secret"])
      let scope = 'activity heartrate location nutrition profile settings sleep social weight'
      let callback = 'http://localhost:3000/auth/fitbit/callback'
      console.log(token)
      window.location.href = client.getAuthorizeUrl(scope, callback)
    })
  }


  render() {
    console.log(token)
    let button = null;
    if (token == "") {
      button = <button text="Login with FitBit" onClick={this.handleOnClick} type="button">
      Login with FitBit
      </button>
    } else {
      button = <button text="Login with FitBit" onClick={this.handleLogoutClick} type="button">
      Logout
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
      </div>
    );
  }
}

export default App;
