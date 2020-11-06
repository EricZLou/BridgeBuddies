import React from 'react';
import {Link} from 'react-router-dom';

import '../css/Style.css';
import '../css/HeaderGame.css';
import '../css/ProfilePic.css';

import bridge_clipart from '../media/bridge_clipart.png';
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
        <div className="exp">EXP: 320 / 1000</div>
        <div className="level">Novice</div>
      </div>
      <div className="header-dropdown-game">
        <div className="image-cropper-header-game">
          <img src={sreya1} alt="Profile" className="profile-pic-header-game"/>
        </div>
      </div>
    </div>
  );
};
