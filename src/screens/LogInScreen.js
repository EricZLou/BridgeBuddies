import React from 'react'
import {connect} from 'react-redux'

import Firebase from '../Firebase'
import LogInForm from '../components/LogInForm'
import SignUpForm from '../components/SignUpForm'
import {
  logIn, setFirebasePaths,
  setUserDetails, setUserStats, setUserStoreActive, setUserStoreOwned,
  setUserFriends, setUserSettings,
  resizeScreen,
} from '../redux/actions/Core'

import '../css/Style.css'
import '../css/LogInScreen.css'

import cover from '../media/cover.png'


const VIEWSTATES = {
  DEFAULT: "DEFAULT",
  LOGIN: "LOGIN",
  SIGNUP: "SIGNUP",
}

class LogInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: VIEWSTATES.DEFAULT,
    }
    this.handleFormSuccess = this.handleFormSuccess.bind(this);
    this.logInAsTestUser = this.logInAsTestUser.bind(this);
  }

  componentDidMount() {
    document.body.style.backgroundColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--dark-blue');
    this.auth_listener = Firebase.auth().onAuthStateChanged(user => {
      if (user) this.handleFormSuccess(user.uid);
    });
    this.props.dispatch(resizeScreen({height: window.innerHeight, width: window.innerWidth}));
    window.addEventListener('resize', () => {
      this.props.dispatch(resizeScreen({height: window.innerHeight, width: window.innerWidth}));
    })
  }

  componentWillUnmount() {
    this.auth_listener = null;
    this.details_listener = null;
    this.stats_listener = null;
    this.store_listener = null;
    this.friends_listener = null;
    this.settings_listener = null;
  }

  async userDetailsListener(path) {
    this.details_listener = Firebase.database().ref(path).once('value', (snapshot) => {
      this.props.dispatch(setUserDetails(snapshot.val()));
    });
  }
  async userStatsListener(path) {
    this.stats_listener = Firebase.database().ref(path).on('value', (snapshot) => {
      this.props.dispatch(setUserStats(snapshot.val()));
    });
  }
  async userStoreListener(path) {
    this.store_listener = Firebase.database().ref(path).on('value', (snapshot) => {
      this.props.dispatch(setUserStoreActive(snapshot.val().active));
      this.props.dispatch(setUserStoreOwned(snapshot.val().owned));
    });
  }
  async userFriendsListener(path) {
    this.friends_listener = Firebase.database().ref(path).once('value', (snapshot) => {
      this.props.dispatch(setUserFriends(Object.keys(snapshot.val())));
    });
  }
  async userSettingsListener(path) {
    this.settings_listener = Firebase.database().ref(path).once('value', (snapshot) => {
      this.props.dispatch(setUserSettings(snapshot.val()));
    });
  }
  async setUpFirebaseListeners(
    detailsPath, statsPath, storePath, friendsPath, settingsPath
  ) {
    await this.userDetailsListener(detailsPath);
    await this.userStatsListener(statsPath);
    await this.userStoreListener(storePath);
    await this.userFriendsListener(friendsPath);
    await this.userSettingsListener(settingsPath);
  }

  async handleFormSuccess(uid) {
    const detailsPath = '/users/' + uid + '/details';
    const statsPath = '/users/' + uid + '/stats';
    const storePath = '/users/' + uid + '/store';
    const friendsPath = '/users/' + uid + '/friends';
    const settingsPath = '/users/' + uid + '/settings';

    this.props.dispatch(setFirebasePaths(
      detailsPath, statsPath, storePath, friendsPath, settingsPath
    ));
    await this.setUpFirebaseListeners(
      detailsPath, statsPath, storePath, friendsPath, settingsPath
    );
    await this.props.dispatch(logIn(uid));
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
      <div className="LogInScreen-entire">
        <div className="login-container">
          <div className="header">Bridge Buddies</div>
          <div className="content">
            <div className="design-part">
              <img src={cover} alt="Characters" className="characters"/>
            </div>
            <div className="form-part">
              {/* DEFAULT VIEW */}
              {this.state.view === VIEWSTATES.DEFAULT &&
                <div className="default-view">
                  <div className="motto">Play and level up!</div>
                  <button className="clicky-button signup large" onClick={
                    () => {this.setState({view: VIEWSTATES.SIGNUP})}
                  }>create an account</button>
                  <div className="log-in-space"/>
                  <button className="login clicky-button large" onClick={
                    () => {this.setState({view: VIEWSTATES.LOGIN})}
                  }>log in</button>
                  <div className="log-in-space"/>
                </div>
              }
              {/* LOG IN AND SIGN UP VIEWS */}
              {this.state.view !== VIEWSTATES.DEFAULT &&
                <div className="login-view">
                  {this.state.view === VIEWSTATES.LOGIN &&
                    <div>
                      <div className="login-type">LOG IN</div>
                      <div className="form-container">
                        <LogInForm onFormSuccess={this.handleFormSuccess}/>
                      </div>
                      <div>
                        <div className="switch-view-text">Don't have an account?</div>
                        <div className="switch-view-click" onClick={
                          () => this.setState({view: VIEWSTATES.SIGNUP})
                        }>SIGN UP</div>
                      </div>
                    </div>
                  }
                  {this.state.view === VIEWSTATES.SIGNUP &&
                    <div>
                      <div className="login-type">SIGN UP</div>
                      <div className="form-container">
                        <SignUpForm onFormSuccess={this.handleFormSuccess}/>
                      </div>
                      <div>
                        <div className="switch-view-text">Already have an account?</div>
                        <div className="switch-view-click" onClick={
                          () => this.setState({view: VIEWSTATES.LOGIN})
                        }>LOG IN</div>
                      </div>
                    </div>
                  }
                  <div className="log-in-space"/>
                  <button className="tmp-button clicky-button small" onClick={this.logInAsTestUser}>
                    TRY BRIDGE BUDDIES WITHOUT CREATING AN ACCOUNT
                  </button>
                  <div className="log-in-space"/>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default connect()(LogInScreen);
