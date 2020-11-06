import React from 'react';
import {Link} from 'react-router-dom';

import '../css/InvalidScreen.css';

import logo from '../media/logo.svg';

export default function InvalidScreen() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Invalid Page
        </p>
        <Link to="/" className="App-link">Go to Home</Link>
      </header>
    </div>
  );
};
