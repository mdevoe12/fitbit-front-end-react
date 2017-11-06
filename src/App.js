import React, { Component } from 'react';
import LoggedOut from './components/loggedOut'
import LoggedIn from './components/loggedIn'
import 'bootstrap/less/bootstrap.less'
// import './App.css';
import { Col } from 'react-bootstrap';


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
    if (!this.state.isLoggedIn) {
      display = <LoggedOut />
    } else {
      display = <LoggedIn token={this.state.token}/>
    }
    return (
      <div className="App">
        <Col xs={6} md={3} className="App-header">
          <h1 className="App-title">insight</h1>
          <p className="App-intro">
            find connections, improve your life
          </p>

        </Col>
          <Col xs={12} md={9} className="App-header-col-2">
          {display}
        </Col>

      </div>
    );
  }
}

export default App;
