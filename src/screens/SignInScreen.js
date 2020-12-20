import React from 'react'
import {Link} from 'react-router-dom';

import Firebase from '../Firebase';

import '../css/Style.css';
import '../css/SignInScreen.css'

export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>hi <Link to="/"><button>go to home</button></Link>
      </div>
    );
  }
};
