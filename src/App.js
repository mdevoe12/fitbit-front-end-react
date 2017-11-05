import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoggedOut from './components/loggedOut'
import LoggedIn from './components/loggedIn'

let current_url = window.location.href
let token = ""

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      data: [],
      token: null
    };
  }

  componentDidMount() {
    if (current_url.includes("token")) {
      let raw_token = current_url.split('token=')[1]
      token = raw_token.replace(/#/, "").replace(/_/g, "").replace(/=/g, "")
      this.setState({isLoggedIn: true, token: token})
    } else {
      this.setState({isLoggedIn: false})
    }
  }


  render() {
    let display;
    // {
    //   (this.state.isLoggedIn) &&
    //   <LoggedOut />
    // }
    if (!this.state.isLoggedIn) {
      display = <LoggedOut />
    } else {
      display = <LoggedIn token={this.state.token}/>
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
        {display}
      </div>
    );
  }
}

export default App;
