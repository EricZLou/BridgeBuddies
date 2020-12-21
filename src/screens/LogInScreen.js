import React from 'react'
import {connect} from 'react-redux';
import {logIn} from '../redux/actions/Core';

import LogInForm from '../components/LogInForm';
import SignUpForm from '../components/SignUpForm';

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

        {/* LOG IN VIEW */}
        {this.state.log_in_view &&
          <div>
            this is the log in view
            <LogInForm/>
            Don't have an account?
            <button onClick={() => this.setState({log_in_view: false})}>Sign up here</button>
          </div>
        }

        {/* SIGN UP VIEW */}
        {!this.state.log_in_view &&
          <div>
            this is the sign up view
            <SignUpForm/>
            <button onClick={() => this.setState({log_in_view: true})}>go to log in</button>
          </div>
        }
      </div>
    );
  }
};
export default connect()(SignInScreen);
