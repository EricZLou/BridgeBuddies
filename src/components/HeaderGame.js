import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Firebase} from '../Firebase'

import SettingsScreen from '../screens/SettingsScreen'

import '../css/Style.css'
import '../css/HeaderGame.css'
import '../css/ProfilePic.css'

import bridge_clipart from '../media/bridge_clipart.png'
import coin from '../media/coin.png'
import gespade from '../media/store/characters/gespade.png'

import {EXP_BY_LEVEL, LEVELS} from '../constants/CoinsAndExp'


class HeaderGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_level_up: false,
      level_idx: this.props.level_idx,
      show_settings: false,
    };
    this.onShowSettingsClick = this.onShowSettingsClick.bind(this);
    this.onCloseSettingsClick = this.onCloseSettingsClick.bind(this);
  }

  componentDidUpdate() {
    // update leaderboard if needed
    const total_exp_path = '/leaderboards/total_exp/';
    const games_played_path = '/leaderboards/games_played/';
    // Only update leaderboard if not test user.
    if (this.props.userID !== "ii1ICvb4tWVtJtKlla8Gz52kkqr2") {
      this.maybeUpdateLeaderboard(games_played_path, this.props.games_played);
      this.maybeUpdateLeaderboard(total_exp_path, this.props.total_exp);
    }
    // prestige if needed
    this.maybePrestige();
  }

  maybeUpdateLeaderboard(path, score) {
    let ref = Firebase.database().ref(path).orderByChild('score');
    ref.once('value', (snapshot) => {
      let should_change = false;
      snapshot.forEach((data) => {
        if (should_change) return;
        const key = data.key;
        data = data.val();
        if (this.props.userID === data.user) {
          Firebase.database().ref(`${path}${key}`).remove();
          should_change = true;
        }
      });
      snapshot.forEach((data) => {
        if (should_change) return;
        const key = data.key;
        data = data.val();
        if (score > data.score) {
          Firebase.database().ref(`${path}${key}`).remove();
          should_change = true;
        }
      });
      if (should_change) {
        Firebase.database().ref(path).push().set({
          user: this.props.userID, score: score
        });
      }
    });
  }

  maybePrestige() {
    const exp_needed_to_prestige = EXP_BY_LEVEL[LEVELS[this.props.level_idx]];
    if (this.props.exp >= exp_needed_to_prestige) {
      const new_leveL_idx = this.props.level_idx + 1;
      Firebase.database().ref(this.props.userStatsPath).update({
        exp: 0,
        level_idx: new_leveL_idx,
      });
      this.setState({
        show_level_up: true,
        level_idx: new_leveL_idx,
      });
      setTimeout(() => {this.setState({show_level_up: false})}, 7000);
    }
  }

  onShowSettingsClick() {
    this.setState({show_settings: true});
  }
  onCloseSettingsClick() {
    this.setState({show_settings: false});
  }

  render() {
    return (
      <div>
        {this.state.show_settings && 
          <SettingsScreen onCloseSettings={this.onCloseSettingsClick}/>
        }
        <div className="header-container-game">
          <Link to="/" className="header-logo-game" title="Go home">
            <img src={bridge_clipart} alt="Logo" className="logo"/>
          </Link>
          <div className="header-dropdown-game" title="Settings" onClick={this.onShowSettingsClick}>
            <div className="image-cropper-header-game">
              <img src={gespade} alt="Profile" className="profile-pic-header-game"/>
            </div>
          </div>
          <div className="header-info-game">
            <div className="level">{LEVELS[this.state.level_idx]}</div>
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
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    coins: state.coins,
    exp: state.exp,
    games_played: state.games_played,
    level_idx: state.level_idx,
    total_exp: state.total_exp,
    userID: state.userID,
    userStatsPath: state.firebasePaths.stats,
  }
}
export default connect(mapStateToProps)(HeaderGame);
