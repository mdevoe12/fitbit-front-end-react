import React, { Component } from 'react';
import ActionButton from './actionButton'
import Graph from './graph'
import axios from 'axios';
let api = "http://localhost:3000"

class LoggedIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: props.token,
      data: null
    }
  }

  componentDidMount() {
    axios.get(api + '/api/v1/fitbit_data', {
      headers: {auth_token: this.state.token}
    }).then((response) => {
      this.setState({
        data: response.data
      })
    })
    .catch((error) => {
      console.error(error)
    })
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
      <div>
        <ActionButton
        text="Logout"
        onClick={this.handleLogoutClick.bind(this)}
        />
        <Graph data={this.state.data}/>
      </div>
    )
  }
}

export default LoggedIn
