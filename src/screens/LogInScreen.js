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
                <div>
                  <div className="login-type">SIGN UP</div>
                  <div className="form-container">
                    <SignUpForm onFormSuccess={this.handleFormSuccess}/>
                  </div>
                  <div className="switch-view-text">Already have an account?</div>
                  <div className="switch-view-click" onClick={() => this.setState({view: VIEWSTATES.LOGIN})}>LOG IN</div>
                </div>
              }
            </div>
          </div>
        </div>
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
