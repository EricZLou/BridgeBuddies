import React from 'react'
import {connect} from 'react-redux';

import Firebase from '../Firebase';
import LogInForm from '../components/LogInForm';
import SignUpForm from '../components/SignUpForm';
import {logIn, homeScreenReady,
  setFirebasePaths, setUserDetails,
  setCoins, setExp, setLevel,
  setStoreActive, setStoreOwned,
} from '../redux/actions/Core';

import '../css/Style.css';
import '../css/LogInScreen.css'

class LogInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      log_in_view: true,
    }
    this.handleFormSuccess = this.handleFormSuccess.bind(this);
  }

  userDetailsListener() {
    Firebase.database().ref(this.props.detailsPath).on('value', (snapshot) => {
      this.props.dispatch(setUserDetails(snapshot.val().first_name, snapshot.val().last_name));
    });
  }
  userStatsListener() {
    Firebase.database().ref(this.props.statsPath).on('value', (snapshot) => {
      this.props.dispatch(setCoins(snapshot.val().coins));
      this.props.dispatch(setExp(snapshot.val().exp));
      this.props.dispatch(setLevel(snapshot.val().level_idx));
    });
  }
  userStoreListener() {
    Firebase.database().ref(this.props.storePath).on('value', (snapshot) => {
      this.props.dispatch(setStoreActive(snapshot.val().active));
      this.props.dispatch(setStoreOwned(snapshot.val().owned));
    });
  }
  async setUpFirebaseListeners() {
    await this.userDetailsListener();
    await this.userStatsListener();
    await this.userStoreListener();
  }

  async handleFormSuccess(uid) {
    const detailsPath = '/users/' + uid + '/details';
    const statsPath = '/users/' + uid + '/stats';
    const storePath = '/users/' + uid + '/store';
    await this.props.dispatch(setFirebasePaths(
      detailsPath, statsPath, storePath
    ));
    await this.setUpFirebaseListeners();
    await this.props.dispatch(logIn(uid));
    await this.props.dispatch(homeScreenReady());
  }

  render() {
    return (
      <div>
        {/* LOG IN VIEW */}
        {this.state.log_in_view &&
          <div>
            this is the log in view
            <LogInForm onFormSuccess={this.handleFormSuccess}/>
            Don't have an account?
            <button onClick={() => this.setState({log_in_view: false})}>Sign up here</button>
          </div>
        }

        {/* SIGN UP VIEW */}
        {!this.state.log_in_view &&
          <div>
            this is the sign up view
            <SignUpForm onFormSuccess={this.handleFormSuccess}/>
            <button onClick={() => this.setState({log_in_view: true})}>go to log in</button>
          </div>
        }
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    detailsPath: state.firebasePaths.details,
    statsPath: state.firebasePaths.stats,
    storePath: state.firebasePaths.store,
  }
}
export default connect(mapStateToProps)(LogInScreen);
