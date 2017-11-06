import React, { Component } from 'react';
import ActionButton from './actionButton'
import axios from 'axios';
import FitbitApiClient from 'fitbit-node';
// import { Button, Grid, Row, Col } from 'react-bootstrap';
import '../App.css';

let api = "https://insight-api.herokuapp.com"

class LoggedOut extends Component {

  handleOnClick = () => {
    axios.get(api + '/api/v1/keys', {
      headers: {url: window.location.href}
    })
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
