import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import '../css/Style.css'
import '../css/HeaderGame.css'
import '../css/ProfilePic.css'

import bridge_clipart from '../media/bridge_clipart.png'
import coin from '../media/coin.png'
import gespade from '../media/store/characters/gespade.png'

const {LEVELS, TOTAL_EXP} = require('../constants/Levels')


class HeaderGame extends React.Component {
  render() {
    return (
      <div className="header-container-game">
        <Link to="/" className="header-logo-game">
          <img src={bridge_clipart} alt="Logo" className="logo"/>
        </Link>
        <div className="header-space-game"/>
        <div className="header-title-game">
          BRIDGE BUDDIES
        </div>
        <div className="header-info-game">
          <div className="right">
            <div className="level">{this.props.level}</div>
            <div className="exp">EXP: {this.props.exp} / {TOTAL_EXP}</div>
            <img src={coin} alt="Coin" className="coin-img"/>
            <div className="coins">{this.props.coins}</div>
          </div>
        </div>
        <div className="header-dropdown-game">
          <div className="image-cropper-header-game">
            <img src={gespade} alt="Profile" className="profile-pic-header-game"/>
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
  }
}
export default connect(mapStateToProps)(HeaderGame);
