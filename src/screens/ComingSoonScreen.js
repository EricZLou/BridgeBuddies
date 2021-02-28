import React from 'react';

import '../css/Style.css';
import '../css/ComingSoonScreen.css';

import cover from '../media/cover.png';
import logo from '../media/logo.svg';

export default function ComingSoonScreen() {
  return (
    <div className="App-container">
        <div className="cs-title">BRIDGE BUDDIES</div>
        <img src={logo} className="App-logo" alt="logo" />
        <a href="https://bridge-buddies.herokuapp.com/"
           target="_blank"
           rel="noopener noreferrer">
          <button className="cs-button">Try the demo!</button>
        </a>
        <img src={cover} alt="Characters" className="cs-characters"/>
    </div>
  );
};
