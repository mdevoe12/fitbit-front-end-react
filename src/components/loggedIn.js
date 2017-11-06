import React, { Component } from 'react';
import ActionButton from './actionButton';
import Graph from './graph';
import SleepActivity from './sleepActivity'
import axios from 'axios';
let api = "http://localhost:3000"

class LoggedIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSleepHeart: null,
      dataActivityRem: null,
      token: props.token
    }
  }

  componentDidMount() {
    axios.get(api + '/api/v1/fitbit_data', {
      headers: {auth_token: this.state.token}
    }).then((response) => {
      // debugger
      this.setState({
        dataSleepHeart: response.data[0],
        dataActivityRem: response.data[1]
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
    console.log(this.state.dataSleepHeart)
    return (
      <div>
        <ActionButton
        text="Logout"
        onClick={this.handleLogoutClick.bind(this)}
        />

        <br></br>
        <h3> resting heart rate vs. rem & deep sleep </h3>
        <div>
        <Graph sleepHeartData={this.state.dataSleepHeart}/>
        </div>
        <h3> activity vs. rem sleep </h3>
        <div>
        <SleepActivity sleepActivityData={this.state.dataActivityRem}/>
        </div>
      </div>
    )
  }
}

export default LoggedIn
