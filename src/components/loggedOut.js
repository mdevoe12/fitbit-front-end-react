import React, { Component } from 'react';
import ActionButton from './actionButton'
import axios from 'axios';
import '../App.css';

let api = "https://insight-api.herokuapp.com"

class LoggedOut extends Component {

  handleOnClick = () => {
    axios.get(api + '/api/v1/keys', {
      headers: {url: window.location.href}
    })
    .then((response) => {
      let client = "https://www.fitbit.com/oauth2/authorize?"
      let responseType = "response_type=code&"
      let client_id = "client_id=" + response.data["id"]
      let callback = "&redirect_uri=" + api + '/auth/fitbit/callback&'
      let scope = 'scope=activity heartrate location nutrition profile settings sleep social weight'
      let expiresIn = "&expires_in=604800"
      window.location.href = client + responseType + client_id + callback + scope + expiresIn
      // window.location.href = "https://www.fitbit.com/oauth2/authorize?response_type=code&" + "client_id=" + response.data["id"] + "&redirect_uri=" + api + "/auth/fitbit/callback&" + "scope=" + scope + "&expires_in=604800"

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
