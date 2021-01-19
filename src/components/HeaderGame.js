import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import '../css/Style.css'
import '../css/HeaderGame.css'
import '../css/ProfilePic.css'

import bridge_clipart from '../media/bridge_clipart.png'
import coin from '../media/coin.png'
import gespade from '../media/store/characters/gespade.png'

import {LEVELS} from '../constants/AfterGame'


class HeaderGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_level_up: false,
      level_idx: this.props.level_idx,
    };
  }

  componentDidUpdate() {
    // we prestiged!! Show a cool animation / direct user attention
    if (this.state.level_idx !== this.props.level_idx) {
      this.setState({
        show_level_up: true,
        level_idx: this.props.level_idx,
      });
      setTimeout(() => {this.setState({show_level_up: false})}, 8000);
    }
  }

  render() {
    return (
      <div className="header-container-game">
        <Link to="/" className="header-logo-game" title="Go home">
          <img src={bridge_clipart} alt="Logo" className="logo"/>
        </Link>
        <div className="header-dropdown-game">
          <div className="image-cropper-header-game">
            <img src={gespade} alt="Profile" className="profile-pic-header-game"/>
          </div>
        </div>
        <div className="header-info-game">
          <div className="level" onClick={() => {
            this.setState({show_level_up: true});
            setTimeout(() => {this.setState({show_level_up: false})}, 8000);
          }}>{LEVELS[this.state.level_idx]}</div>
          <img src={coin} alt="Coin" className="coin-img"/>
          <div className="coins">{this.props.coins}</div>
          <div className="exp">EXP: {this.props.exp}</div>
          {this.state.show_level_up &&
            <div className="prestige">
              <div className="prestige-text">
                Woohoo! You leveled up!
              </div>
              <div className="prestige-name old">
                {LEVELS[this.state.level_idx-1]}
              </div>
              <div className="prestige-arrow">
                &dArr;
              </div>
              <div className="prestige-name new">
                {LEVELS[this.state.level_idx]}
              </div>
            </div>
          }
        </div>
        <div className="header-title-game">
          BRIDGE BUDDIES
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    coins: state.coins,
    exp: state.exp,
    level_idx: state.level_idx,
  }
}
export default connect(mapStateToProps)(HeaderGame);
