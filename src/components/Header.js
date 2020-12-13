import React from 'react';
import {Link} from 'react-router-dom';

import '../css/Style.css';
import '../css/Header.css';
import '../css/ProfilePic.css';

import bridge_clipart from '../media/bridge_clipart.png';
import coin from '../media/coin.png';
import sreya1 from '../media/store/characters/sreya1.png';

export default function Header() {
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
          <div className="level">Novice</div>
          <div className="right">
            <img src={coin} alt="Coin" className="coin-img"/>
            <div className="num-coins">10</div>
          </div>
        </div>
        <div className="exp">EXP: 320 / 1000</div>
        <hr className="hr-black"/>
      </div>
      <div className="header-dropdown">
        <div className="image-cropper-header">
          <img src={sreya1} alt="Profile" className="profile-pic-header"/>
        </div>
      </div>
    </div>
  );
};
