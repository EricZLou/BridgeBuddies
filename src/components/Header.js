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

import {LEVELS} from '../constants/AfterGame'


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.onLogOutClick = this.onLogOutClick.bind(this);
  }

  onLogOutClick() {
    Firebase.auth().signOut().then(()=>{
      this.props.mySocket.close();
      this.props.dispatch(logOut());
      this.props.dispatch(homeScreenNotReady());
    }).catch((error)=>{alert(error);});
  }

  render() {
    this.store = require('../constants/Store').STORE;
    return (
      <div className="header-width-cap-container"><div className="header-width-cap">
        <Link to="/"><img src={bridge_clipart} alt="Logo" className="logo" title="Go home"/></Link>

        <div className="header-dropdown">
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
          <div className="header-dropdown-content">
            <Link to="/me" className="header-dropdown-item">My Profile</Link>
            <Link to="/settings" className="header-dropdown-item">Settings</Link>
            <div className="header-dropdown-item" onClick={this.onLogOutClick}>Log Out</div>
          </div>
        </div>

        <div className="header-info">

          <div className="info-part level">
            <div className="info-round">
              <div className="info-logo">
                LVL
              </div>
              <div className="info-text">
                {this.props.level}
              </div>
            </div>
          </div>

          <div className="info-part coins">
            <div className="info-round">
              <div className="info-logo">
                <img src={coin} alt="Coin" className="coin-img"/>
              </div>
              <div className="info-text" onClick={() => {
                  Firebase.database().ref(this.props.userStatsPath).update(
                    {coins: this.props.coins + 10}
                  );
                }}>{this.props.coins}
              </div>
            </div>
          </div>

          <div className="info-part exp">
            <div className="info-round">
              <div className="info-logo">
                EXP
              </div>
              <div className="info-text">
                {this.props.exp}
              </div>
            </div>
          </div>

        </div>

        <div className="header-content-flex">
          <div className="header-title">
            BRIDGE BUDDIES
          </div>
        </div>

      </div></div>
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
