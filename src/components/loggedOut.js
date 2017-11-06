import React, { Component } from 'react';
import ActionButton from './actionButton'
import axios from 'axios';
import FitbitApiClient from 'fitbit-node';
// import { Button, Grid, Row, Col } from 'react-bootstrap';
import '../App.css';

let api = "http://localhost:3000"

class LoggedOut extends Component {

  handleOnClick = () => {
    axios.get(api + '/api/v1/keys')
    .then((response) => {
      let client = new FitbitApiClient(response.data["id"], response.data["secret"])
      let scope = 'activity heartrate location nutrition profile settings sleep social weight'
      let callback = api + '/auth/fitbit/callback'
      window.location.href = client.getAuthorizeUrl(scope, callback)
    })
  }

  render() {
    return (
        <ActionButton
        text="Login with FitBit"
        onClick={this.handleOnClick.bind(this)}
        
        />
    )
  }
}

export default LoggedOut
