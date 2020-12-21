import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {addCoins} from '../redux/actions/Core';

import {TOTAL_EXP} from '../SampleData'

import '../css/Style.css';
import '../css/Header.css';
import '../css/ProfilePic.css';

import bridge_clipart from '../media/bridge_clipart.png';
import coin from '../media/coin.png';
import sreya1 from '../media/store/characters/sreya1.png';

class Header extends React.Component {
  render() {
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
              <div className="num-coins" onClick={() => {this.props.dispatch(addCoins(10));}}>{this.props.coins}</div>
            </div>
          </div>
          <div className="exp">EXP: {this.props.exp} / {TOTAL_EXP}</div>
          <hr className="hr-black"/>
        </div>
        <div className="header-dropdown">
          <div className="image-cropper-header">
            <img src={sreya1} alt="Profile" className="profile-pic-header"/>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    coins: state.coins,
    level: state.experience.level,
    exp: state.experience.exp,
  }
}
export default connect(mapStateToProps)(Header);
