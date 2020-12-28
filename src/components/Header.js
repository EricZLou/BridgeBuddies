import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Firebase from '../Firebase'

import {logOut, homeScreenNotReady} from '../redux/actions/Core'

import '../css/Style.css'
import '../css/Header.css'
import '../css/ProfilePic.css'

import bridge_clipart from '../media/bridge_clipart.png'
import coin from '../media/coin.png'

import {LEVELS, TOTAL_EXP} from '../constants/Levels'


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
    }
    this.onLogOutClick = this.onLogOutClick.bind(this);
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
  }

  onLogOutClick() {
    Firebase.auth().signOut().then(()=>{
      this.props.mySocket.close();
      this.props.dispatch(logOut());
      this.props.dispatch(homeScreenNotReady());
    }).catch((error)=>{alert(error);});
  }

  showDropdown() {
    this.setState({dropdown: true});
  }
  hideDropdown() {
    this.setState({dropdown: false});
  }

  render() {
    this.store = require('../constants/Store').STORE;
    return (
      <div className="header-container">
        <div className="header-space">
          <Link to="/" ><img src={bridge_clipart} alt="Logo" className="logo"/></Link>
        </div>
        <div className="header-title">
          BRIDGE BUDDIES
        </div>
        <div className="header-info">
          <hr className="hr-black"/>
          <div className="top">
            <div className="level">{this.props.level}</div>
            <div className="right">
              <img src={coin} alt="Coin" className="coin-img"/>
              <div className="num-coins" onClick={() => {
                Firebase.database().ref(this.props.userStatsPath).update(
                  {coins: this.props.coins + 10}
                );
              }}>{this.props.coins}</div>
            </div>
          </div>
          <div className="exp">EXP: {this.props.exp} / {TOTAL_EXP}</div>
          <hr className="hr-black"/>
        </div>
        <div className="header-dropdown-square" onMouseLeave={this.hideDropdown}>
          <div className="header-dropdown" onMouseEnter={this.showDropdown}>
            <div className="image-cropper-header">
              <img src={
                     require(
                       `../media/store/characters/${this.store.characters[this.props.activeCharacter].file}`
                     )
                   }
                   alt="Profile"
                   className="profile-pic-header"
              />
            </div>
            {this.state.dropdown &&
              <div className="header-dropdown-content">
                <Link to="/me" className="header-dropdown-item">My Profile</Link>
                <Link to="/settings" className="header-dropdown-item">Settings</Link>
                <div className="header-dropdown-item" onClick={this.onLogOutClick}>Log Out</div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    coins: state.coins,
    exp: state.exp,
    level: LEVELS[state.level_idx],
    userStatsPath: state.firebasePaths.stats,
    activeCharacter: state.storeActive.characters,
    mySocket: state.mySocket,
  }
}
export default connect(mapStateToProps)(Header);
