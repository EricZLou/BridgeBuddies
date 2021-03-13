import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { io } from 'socket.io-client'

import DailyChallengeScreen from './DailyChallengeScreen'
import FriendsScreen from './FriendsScreen'
import Header from '../components/Header'
import LeaderboardScreen from './LeaderboardScreen'
import LoadingScreen from './LoadingScreen'
import {
  setSocket, setNumUsersLoggedIn,
  friendsLoggedIn, friendLoggedIn, friendLoggedOut,
} from "../redux/actions/Core"

import '../css/Style.css'
import '../css/HomeScreen.css'

import store_image from '../media/buttons/store.png'
import cover from '../media/cover.png'

import {GAMETYPES} from '../constants/GameEngine'
const socketURL = '/'


const HOMETYPES = {
  PLAY: 'PLAY',
  DAILY: 'DAILY',
  LEARN: 'LEARN',
  BOARD: 'BOARD',
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      home_type: null,
      show_mid_nav: false,
      show_side_nav: true,
    }
    this.waitForDataToLoad = this.waitForDataToLoad.bind(this);
  }

  componentDidMount() {
    document.body.style.backgroundColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--dark-blue');
    if (this.dataLoaded() && this.props.mySocket !== "") {
      window.addEventListener("beforeunload", () => {
        this.props.mySocket.emit("logged out", this.props.userID, this.props.userFriends)
      });
      this.setState({ready: true});
    }
    else this.interval = setInterval(this.waitForDataToLoad, 500);
  }

  dataLoaded() {
    if (this.props.storeActive !== undefined &&
        this.props.name !== "" &&
        this.props.coins !== "" &&
        this.props.exp !== "" &&
        this.props.level !== "" &&
        this.props.userFriends !== null &&
        this.props.userID !== ""
    ) {
      document.body.style.backgroundColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--theme-cream');
      return true;
    }
    return false;
  }

  waitForDataToLoad() {
    if (this.dataLoaded()) {
      clearInterval(this.interval);
      // Init socket
      if (!this.props.mySocket) {
        this.socket = io(socketURL);
        window.addEventListener("beforeunload", () => {
          this.socket.emit("logged out", this.props.userID, this.props.userFriends)
        });
        this.props.dispatch(setSocket(this.socket));
        this.socket.on("num users logged in", (num) => {
          this.props.dispatch(setNumUsersLoggedIn(num));
        });
        this.socket.once("friends that are logged in", (friendIDs) => {
          this.props.dispatch(friendsLoggedIn(friendIDs));
        });
        this.socket.on("friend logged in", (friendID) => {
          this.props.dispatch(friendLoggedIn(friendID));
        });
        this.socket.on("friend logged out", (friendID) => {
          this.props.dispatch(friendLoggedOut(friendID));
        });
        this.socket.emit("logged in", this.props.userID, this.props.userFriends);
      }
      this.setState({
        ready: true,
      });
    }
  }

  toggleHomeType(home_type) {
    if (this.state.home_type === home_type) this.setState({
      home_type: null,
      show_mid_nav: false,
      show_side_nav: true,
    });
    else this.setState({
      home_type: home_type,
      show_mid_nav: home_type !== HOMETYPES.PLAY ? true : false,
      show_side_nav: home_type === HOMETYPES.PLAY || this.props.screen_width >= 1000,
    });
  }

  render() {
    return (<div>
      {!this.state.ready && <LoadingScreen/>}
      {this.state.ready &&
        <div>
          <Header/>
          <div className="body-width-cap-container"><div className="body-width-cap">
            <div className="body-container">
              <div className="main-nav">
                <div className="container">
                  <div className={`${this.state.home_type === HOMETYPES.PLAY ? 'button-outer button-active':'button-outer'}`}
                       onClick={this.toggleHomeType.bind(this, HOMETYPES.PLAY)}>
                    <div className="button-inner">{`> Play`}</div>
                  </div>
                  {this.state.home_type === HOMETYPES.PLAY &&
                    <div className="play-options">
                      <Link to={{
                        pathname: "/game",
                        state: {type: GAMETYPES.ROBOT},
                      }} className="no-underline">
                        <div className="button-outer">
                          <div className="button-inner">{`> Robots`}</div>
                        </div>
                      </Link>
                      <Link to="/tables" className="no-underline">
                        <div className="button-outer">
                          <div className="button-inner">{`> Online`}</div>
                        </div>
                      </Link>
                    </div>
                  }
                  <Link to="/" className="no-underline">
                    <div className={`${this.state.home_type === HOMETYPES.DAILY ? 'button-outer button-active':'button-outer'}`}
                         onClick={this.toggleHomeType.bind(this, HOMETYPES.DAILY)}>
                      <div className="button-inner">{`> Daily Challenge`}</div>
                    </div>
                  </Link>
                  <Link to="/" className="no-underline">
                    <div className={`${this.state.home_type === HOMETYPES.LEARN ? 'button-outer button-active':'button-outer'}`}
                         onClick={this.toggleHomeType.bind(this, HOMETYPES.LEARN)}>
                      <div className="button-inner">{`> Learn`}</div>
                    </div>
                  </Link>
                  <Link to="/" className="no-underline">
                    <div className={`${this.state.home_type === HOMETYPES.BOARD ? 'button-outer button-active':'button-outer'}`}
                         onClick={this.toggleHomeType.bind(this, HOMETYPES.BOARD)}>
                      <div className="button-inner">{`> Leaderboard`}</div>
                    </div>
                  </Link>
                </div>
              </div>

              <div className={`mid-nav${this.state.show_mid_nav ? "":" empty"}`}>
                {this.state.show_mid_nav &&
                  <div className="mid-nav-item">
                    {this.state.home_type === HOMETYPES.DAILY && <DailyChallengeScreen/>}
                    {this.state.home_type === HOMETYPES.LEARN && <div>Coming Soon</div>}
                    {this.state.home_type === HOMETYPES.BOARD && <LeaderboardScreen/>}
                  </div>
                }
                <img src={cover} alt="Characters" className="characters"/>
              </div>

              {this.state.show_side_nav &&
                <div className="side-nav">
                  <div className="container">
                    <div className="side-nav-sticky">
                      <div className="side-nav-title">MY FRIENDS</div>
                      <hr className="hr-clear"/>
                    </div>
                    <div>{
                      `Hello ${this.props.name} -- ` +
                      (this.props.numUsersLoggedIn === 1 ?
                        "you are online!" :
                        `there are ${this.props.numUsersLoggedIn} users online`)
                    }</div>
                    <div className="friends">
                      <FriendsScreen/>
                    </div>
                  </div>
                  <Link to="/store" className="store-link" title="Go to store">
                    <img src={store_image} alt="Store" className="store"/>
                  </Link>
                </div>
              }
            </div>
          </div>
        </div></div>
      }</div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    coins: state.coins,
    exp: state.exp,
    name: state.userDetails.name,
    level: state.level_idx,
    mySocket: state.mySocket,
    numUsersLoggedIn: state.numUsersLoggedIn,
    screen_width: state.variable_sizes.screen_width,
    storeActive: state.storeActive,
    userFriends: state.userFriends,
    userID: state.userID,
  }
}
export default connect(mapStateToProps)(HomeScreen);
