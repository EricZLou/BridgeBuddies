import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { io } from 'socket.io-client'

import DailyChallengeScreen from './DailyChallengeScreen'
import Header from '../components/Header'
import LeaderboardScreen from './LeaderboardScreen'
import LoadingScreen from './LoadingScreen'
import {setSocket, setNumUsersLoggedIn} from "../redux/actions/Core"

import '../css/Style.css'
import '../css/HomeScreen.css'

import store_image from '../media/buttons/store.png'
import cover from '../media/cover.png'

import {GAMETYPES} from '../constants/GameEngine'
const socketURL = 'http://localhost:8000'


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
    if (!this.props.mySocket) {
      this.initSocket();
    }
    if (this.dataLoaded()) this.setState({ready: true});
    else this.interval = setInterval(this.waitForDataToLoad, 500);
  }
  initSocket = () => {
    this.socket = io(socketURL);
    this.socket.on("num users logged in", (num) => {
      this.props.dispatch(setNumUsersLoggedIn(num));
    });
    this.props.dispatch(setSocket(this.socket));
  }

  dataLoaded() {
    if (this.props.storeActive !== undefined &&
        this.props.first_name !== "" &&
        this.props.coins !== "" &&
        this.props.exp !== "" &&
        this.props.level !== ""
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
      this.setState({ready: true});
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
                    <div className="side-nav-title">MY FRIENDS</div>
                    <hr className="hr-clear"/>
                    <div className="friends">{
                      `Hello ${this.props.userDetails.first_name}! ` +
                      `There are ${this.props.numUsersLoggedIn} users online!`
                    }</div>
                    <div className="coming-soon">
                      Add your friends: coming soon...
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
    first_name: state.userDetails.first_name,
    level: state.level_idx,
    mySocket: state.mySocket,
    numUsersLoggedIn: state.numUsersLoggedIn,
    storeActive: state.storeActive,
    userDetails: state.userDetails,
    screen_width: state.variable_sizes.screen_width,
  }
}
export default connect(mapStateToProps)(HomeScreen);
