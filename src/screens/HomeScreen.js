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


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      showPlayOptions: false,
    }
    this.togglePlayOptions = this.togglePlayOptions.bind(this);
    this.waitForDataToLoad = this.waitForDataToLoad.bind(this);
  }

  componentDidMount() {
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

  togglePlayOptions() {
    this.setState({showPlayOptions: !this.state.showPlayOptions});
  }

  dataLoaded() {
    if (this.props.storeActive !== undefined &&
        this.props.first_name !== "" &&
        this.props.coins !== "" &&
        this.props.exp !== "" &&
        this.props.level !== ""
    ) return true;
    return false;
  }

  waitForDataToLoad() {
    if (this.dataLoaded()) {
      clearInterval(this.interval);
      this.setState({ready: true});
    }
  }

  render() {
    return (<div>
      {!this.state.ready && <LoadingScreen/>}
      {this.state.ready &&
        <div>
          <Header/>
          <div className="body-container">
            <div className="main-nav">
              <div className="container">
                <button onClick={this.togglePlayOptions}>PLAY</button>
                {this.state.showPlayOptions &&
                  <div className="play-options">
                    <Link to={{
                      pathname: "/game",
                      state: {type: GAMETYPES.ROBOT},
                    }} ><button>Robots</button></Link>
                    <Link to={{
                      pathname: "/game",
                      state: {type: GAMETYPES.ONLINE},
                    }} ><button>Online</button></Link>
                  </div>
                }
                <Link to="/store" style={{pointerEvents: "none"}}><button>DAILY CHALLENGE</button></Link>
                <Link to="/store" style={{pointerEvents: "none"}}><button>LEARN</button></Link>
                <Link to="/store" style={{pointerEvents: "none"}}><button>LEADERBOARDS</button></Link>
              </div>
            </div>
            <div className="mid-space">
              <img src={cover} alt="Characters" className="characters"/>
            </div>
            <div className="side-nav">
              <div className="container">
                <div className="title">MY FRIENDS</div>
                <hr className="hr-black"/>
                <div className="friends">{
                  `Hello ${this.props.userDetails.first_name}! ` +
                  `There are ${this.props.numUsersLoggedIn} users online!`
                }</div>
              </div>
              <Link to="/store" className="store-link">
                <img src={store_image} alt="Store" className="store"/>
              </Link>
            </div>
          </div>
        </div>
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
