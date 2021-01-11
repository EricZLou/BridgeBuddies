import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { io } from 'socket.io-client'

import Header from '../components/Header'
import LoadingScreen from './LoadingScreen'
import {setSocket, setNumUsersLoggedIn} from "../redux/actions/Core"

import '../css/Style.css'
import '../css/HomeScreen.css'

import store_image from '../media/buttons/store.png'
import cover from '../media/cover.png'

import {GAMETYPES} from '../constants/GameEngine'
// const socketURL = 'http://localhost:8000'
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
    }
    this.waitForDataToLoad = this.waitForDataToLoad.bind(this);
  }

  componentDidMount() {
    document.body.style.backgroundColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--dark-blue');
    if (!this.props.mySocket)
      this.initSocket();
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
    if (this.state.home_type === home_type) this.setState({home_type: null});
    else this.setState({home_type: home_type});
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

              <div className="mid-space">
                <img src={cover} alt="Characters" className="characters"/>
              </div>

              <div className="side-nav">
                <div className="container">
                  <div className="title">MY FRIENDS</div>
                  <hr className="hr-clear"/>
                  <div className="friends">{
                    `Hello ${this.props.userDetails.first_name}! ` +
                    `There are ${this.props.numUsersLoggedIn} users online!`
                  }</div>
                </div>
                <Link to="/store" className="store-link" title="Go to store">
                  <img src={store_image} alt="Store" className="store"/>
                </Link>
              </div>
            </div>
          </div>
        </div></div>
      }</div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    userDetails: state.userDetails,
    storeActive: state.storeActive,
    first_name: state.userDetails.first_name,
    coins: state.coins,
    exp: state.exp,
    level: state.level_idx,
    mySocket: state.mySocket,
    numUsersLoggedIn: state.numUsersLoggedIn,
  }
}
export default connect(mapStateToProps)(HomeScreen);
