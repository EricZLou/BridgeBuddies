import React from 'react'
import {connect} from 'react-redux'

import Firebase from '../Firebase'
import LogInForm from '../components/LogInForm'
import SignUpForm from '../components/SignUpForm'
import {
  logIn, setFirebasePaths,
  setUserDetails, setUserStats, setStoreActive, setStoreOwned,
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
    this.listener1 = null;
    this.listener2 = null;
    this.listener3 = null;
    this.listener4 = null;
  }

  async userDetailsListener(detailsPath) {
    this.listener1 = Firebase.database().ref(detailsPath).on('value', (snapshot) => {
      console.log(snapshot.val());
      this.props.dispatch(setUserDetails(snapshot.val()));
    });
  }
  async userStatsListener(statsPath) {
    this.listener2 = Firebase.database().ref(statsPath).on('value', (snapshot) => {
      this.props.dispatch(setUserStats(snapshot.val()));
    });
  }
  async userStoreListener(storePath) {
    this.listener3 = Firebase.database().ref(storePath).on('value', (snapshot) => {
      this.props.dispatch(setStoreActive(snapshot.val().active));
      this.props.dispatch(setStoreOwned(snapshot.val().owned));
    });
  }
  async userFriendsListener() {
    this.listener4 = Firebase.database().ref(this.props.friendsPath).on('value', (snapshot) => {
      ;
    });
  }
  async setUpFirebaseListeners(detailsPath, statsPath, storePath) {
    await this.userDetailsListener(detailsPath);
    await this.userStatsListener(statsPath);
    await this.userStoreListener(storePath);
  }

  async handleFormSuccess(uid) {
    const detailsPath = '/users/' + uid + '/details';
    const statsPath = '/users/' + uid + '/stats';
    const storePath = '/users/' + uid + '/store';

    this.props.dispatch(setFirebasePaths(
      detailsPath, statsPath, storePath
    ));
    await this.setUpFirebaseListeners(detailsPath, statsPath, storePath);
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
                  <div className="motto">This website is so much fun! So fun!</div>
                  <button className="signup" onClick={(() => {this.setState({view: VIEWSTATES.SIGNUP})})}>Get started</button>
                  <button className="login" onClick={(() => {this.setState({view: VIEWSTATES.LOGIN})})}>I already have an account</button>
                </div>
              }
              {/* LOG IN VIEW */}
              {this.state.view === VIEWSTATES.LOGIN &&
                <div className="login-view">
                  <div className="login-type">LOG IN</div>
                  <div className="form-container">
                    <LogInForm onFormSuccess={this.handleFormSuccess}/>
                  </div>
                  <div>
                    <div className="switch-view-text">Don't have an account?</div>
                    <div className="switch-view-click" onClick={() => this.setState({view: VIEWSTATES.SIGNUP})}>SIGN UP</div>
                  </div>
                  <button className="tmp-button" onClick={this.logInAsTestUser}>LOG IN AS TEST USER</button>
                </div>
              }

              {/* SIGN UP VIEW */}
              {this.state.view === VIEWSTATES.SIGNUP &&
                <div className="login-view">
                  <div className="login-type">SIGN UP</div>
                  <div className="form-container">
                    <SignUpForm onFormSuccess={this.handleFormSuccess}/>
                  </div>
                  <div>
                    <div className="switch-view-text">Already have an account?</div>
                    <div className="switch-view-click" onClick={() => this.setState({view: VIEWSTATES.LOGIN})}>LOG IN</div>
                  </div>
                  <button className="tmp-button" onClick={this.logInAsTestUser}>LOG IN AS TEST USER</button>
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
