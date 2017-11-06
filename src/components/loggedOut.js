import React, { Component } from 'react';
import ActionButton from './actionButton'
import axios from 'axios';
// import FitbitApiClient from 'fitbit-node';
import '../App.css';

let api = "https://insight-api.herokuapp.com"

class LoggedOut extends Component {

  handleOnClick = () => {
    axios.get(api + '/api/v1/keys', {
      headers: {url: window.location.href}
    })
    .then((response) => {
      // let client = new FitbitApiClient(response.data["id"], response.data["secret"])
      let scope = 'activity heartrate location nutrition profile settings sleep social weight'
      // let callback = api + '/auth/fitbit/callback'
      // window.location.href = client.getAuthorizeUrl(scope, callback)
      window.location.href = "https://www.fitbit.com/oauth2/authorize?response_type=code&" + "client_id=" + response.data["id"] + "&redirect_uri=" + api + "/auth/fitbit/callback&" + "scope=" + scope + "&expires_in=604800"

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
