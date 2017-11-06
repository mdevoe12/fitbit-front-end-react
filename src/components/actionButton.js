import React, { Component } from 'react';

class ActionButton extends Component {
  render() {
    return (
      <button className="action-button"
        onClick={this.props.onClick}>

        {this.props.text}
      </button>
    )
  }
}

export default ActionButton;
