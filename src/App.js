import React, { Component } from 'react';
import logo from './logo.svg';
import LoggedOut from './components/loggedOut'
import LoggedIn from './components/loggedIn'
import 'bootstrap/less/bootstrap.less'
// import './App.css';
import { Button, Grid, Row, Col, Jumbotron, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';


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
      <Col xs={12} md={8}>
          <h1 className="App-title">insight</h1>
        </Col>
         <Col xs={6} md={4}>

        {display}

        </Col>
      </header>
      <p className="App-intro">
        insight finds relationships
      </p>
      <p className="App-intro">
        login with your fitbit account to begin your journey
      </p>
      </div>
    );
  }
}

export default App;
