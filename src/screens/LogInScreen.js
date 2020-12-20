import React from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '../redux/actions/Core';

import Firebase from '../Firebase';

import '../css/Style.css';
import '../css/SignInScreen.css'

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      log_in_view: true,
    }
  }
  render() {
    return (
      <div>
        <button onClick={() => {this.props.dispatch(logIn("Eric"));}}>log in as Eric</button>
        {this.state.log_in_view &&
          <div>
            this is the log in view
            <button onClick={() => this.setState({log_in_view: false})}>sign up</button>
          </div>
        }
        {!this.state.log_in_view &&
          <div>
            this is the sign up view
            <button onClick={() => this.setState({log_in_view: true})}>sign in</button>
          </div>
        }
      </div>
    );
  }
};
export default connect()(SignInScreen);
