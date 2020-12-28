import React from 'react'

import '../css/ComingSoonScreen.css'

import logo from '../media/logo.svg'


export default function Loading() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Loading
        </p>
      </header>
    </div>
  );
};
