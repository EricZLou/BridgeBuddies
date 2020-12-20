import React from 'react';
import {Link} from 'react-router-dom';

import {LEVEL, CURR_EXP, TOTAL_EXP, NUM_COINS} from '../SampleData'

import '../css/Style.css';
import '../css/HeaderGame.css';
import '../css/ProfilePic.css';

import bridge_clipart from '../media/bridge_clipart.png';
import coin from '../media/coin.png';
import sreya1 from '../media/store/characters/sreya1.png';

export default function HeaderGame() {
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
          <div className="level">{LEVEL}</div>
          <div className="exp">EXP: {CURR_EXP} / {TOTAL_EXP}</div>
          <img src={coin} alt="Coin" className="coin-img"/>
          <div className="coins">{NUM_COINS}</div>
        </div>
      </div>
      <div className="header-dropdown-game">
        <div className="image-cropper-header-game">
          <img src={sreya1} alt="Profile" className="profile-pic-header-game"/>
        </div>
      </div>
    </div>
  );
};
