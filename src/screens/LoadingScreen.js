import React from 'react'
import {Link} from 'react-router-dom'

import '../css/Style.css'
import '../css/LoadingScreen.css'

import cover from '../media/cover.png'
import logo from '../media/logo.svg'


export default class LoadingScreen extends React.Component {
  componentDidMount() {
    document.body.style.backgroundColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--dark-blue');
  }
  render() {
    return (
      <div className="App-container">
        <div title="Go back">
          <Link to={this.props.return ? this.props.return : '/'}
                className="loading-x-circle">
            <div className="loading-x">&larr;</div>
          </Link>
        </div>
        <div className="loading-title">BRIDGE BUDDIES</div>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="loading-text">{this.props.text ? this.props.text : "Loading..."}</div>
        <img src={cover} alt="Characters" className="loading-characters"/>
      </div>
    );
  }
};
