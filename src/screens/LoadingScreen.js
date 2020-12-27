import React from 'react'

import '../css/Style.css'
import '../css/LoadingScreen.css'

import cover from '../media/cover.png'
import logo from '../media/logo.svg'

export default class LoadingScreen extends React.Component {
  render() {
    return (
      <div className="App-container">
        <div className="cs-title">BRIDGE BUDDIES</div>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="cs-loading-text">{this.props.text ? this.props.text : "Loading..."}...</div>
        <img src={cover} alt="Characters" className="cs-characters"/>
      </div>
    );
  }
};
