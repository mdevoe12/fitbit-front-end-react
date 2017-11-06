import React, { Component } from 'react';
import ActionButton from './actionButton';
import SleepGraph from './sleepGraph';
import WeightHeart from './weightHeart'
import axios from 'axios';
let api = "https://insight-api.herokuapp.com"

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
      window.location.href = 'https://mdevoe12.github.io/fitbit-front-end-react/'
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
        <h3> sleep: wake - rem - deep </h3>
          <div>
          <SleepGraph sleepHeartData={this.state.dataSleepHeart}/>
          </div>
        <h3> heart rate - calories burned  </h3>
          <div>
          <WeightHeart sleepActivityData={this.state.dataActivityRem}/>
          </div>
      </div>
    )
  }
}

export default LoggedIn
