import React, { Component } from 'react';
import ActionButton from './actionButton'
import axios from 'axios';
let api = "http://localhost:3000"


class LoggedIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: props.token
    }
  }

  handleLogoutClick = () => {
    axios.delete(api + '/api/v1/logout', {
      headers: {auth_token: this.state.token}
    }).then((response => {
      window.location.href = 'http://localhost:8080'
    }))
  }

  render() {
    return (
      <ActionButton
      text="Logout"
      onClick={this.handleLogoutClick.bind(this)}
      />
    )
  }
}

export default LoggedIn
