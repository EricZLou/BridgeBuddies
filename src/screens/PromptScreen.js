import React from 'react'

import '../css/PopUp.css'
import '../css/PromptScreen.css'
import '../css/Style.css'


export default class PromptScreen extends React.Component {
  render() {
    return (
      <div className="pop-up-container">
        <div className="pop-up">
          <div
            className="pop-up-X"
            onClick={this.props.onCancel.bind(this)}
          >&#10006;</div>
          <div className="prompt-top">
            <div className="prompt-text">
              <div className="warning-symbol">&#9888;</div>
              {this.props.text}</div>
          </div>
          <div className="prompt-bottom">
            <button
              className="clicky-button medium cancel-button"
              onClick={this.props.onCancel.bind(this)}
            >Cancel</button>
            <button
              className="clicky-button medium confirm-button"
              onClick={this.props.onConfirm.bind(this)}
            >Confirm</button>
          </div>
        </div>
      </div>
    )
  }
};
