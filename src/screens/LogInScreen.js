import React from 'react'
import {connect} from 'react-redux'

import Firebase from '../Firebase'
import LogInForm from '../components/LogInForm'
import SignUpForm from '../components/SignUpForm'
import {logIn, homeScreenReady,
  setFirebasePaths, setUserDetails,
  setCoins, setExp, setLevel,
  setStoreActive, setStoreOwned,
} from '../redux/actions/Core'

import '../css/Style.css'
import '../css/LogInScreen.css'


class LogInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      log_in_view: true,
    }
    this.handleFormSuccess = this.handleFormSuccess.bind(this);
    this.logInAsTestUser = this.logInAsTestUser.bind(this);
  }

  componentDidMount() {
    this.auth_listener = Firebase.auth().onAuthStateChanged(user => {
      if (user) this.handleFormSuccess(user.uid);
    });
  }

  componentWillUnmount() {
    this.auth_listener = null;
    this.listener1 = null;
    this.listener2 = null;
    this.listener3 = null;
  }

  async userDetailsListener() {
    this.listener1 = Firebase.database().ref(this.props.detailsPath).on('value', (snapshot) => {
      this.props.dispatch(setUserDetails(snapshot.val().first_name, snapshot.val().last_name));
    });
  }
  async userStatsListener() {
    this.listener2 = Firebase.database().ref(this.props.statsPath).on('value', (snapshot) => {
      this.props.dispatch(setCoins(snapshot.val().coins));
      this.props.dispatch(setExp(snapshot.val().exp));
      this.props.dispatch(setLevel(snapshot.val().level_idx));
    });
  }
  async userStoreListener() {
    this.listener3 = Firebase.database().ref(this.props.storePath).on('value', (snapshot) => {
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
    await this.props.dispatch(homeScreenReady(true));
  }

  logInAsTestUser() {
    Firebase.auth().signInWithEmailAndPassword("foobar@gmail.com", "foobar123")
      .then((userCredentials) => {
        const uid = userCredentials.user.uid;
        this.handleFormSuccess(uid);
      }).catch((error) => {alert(error)});
  }

  render() {
    return (
      <div>
        {/* LOG IN VIEW */}
        {this.state.log_in_view &&
          <div>
            this is the log in view
            <button onClick={this.logInAsTestUser}>Log in as test user</button>
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
