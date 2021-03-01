import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Firebase from '../Firebase'

import {logOut} from '../redux/actions/Core'
import SettingsScreen from '../screens/SettingsScreen'

import '../css/Style.css'
import '../css/Header.css'
import '../css/ProfilePic.css'

import bridge_clipart from '../media/bridge_clipart.png'
import coin from '../media/coin.png'

import {EXP_BY_LEVEL, LEVELS} from '../constants/CoinsAndExp'


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_level_up: false,
      level_idx: this.props.level_idx,
      show_settings: false,
    };
    this.onLogOutClick = this.onLogOutClick.bind(this);
    this.onShowSettingsClick = this.onShowSettingsClick.bind(this);
    this.onCloseSettingsClick = this.onCloseSettingsClick.bind(this);
  }

  onLogOutClick() {
    Firebase.auth().signOut().then(()=>{
      this.props.mySocket.emit("logged out", this.props.userID, this.props.userFriends);
      this.props.mySocket.close();
      this.props.dispatch(logOut());
    }).catch((error)=>{alert(error);});
  }

  onShowSettingsClick() {
    this.setState({show_settings: true});
  }
  onCloseSettingsClick() {
    this.setState({show_settings: false});
  }

  componentDidUpdate() {
    if (this.state.show_level_up) return;
    // update leaderboard if needed
    const games_played_path = '/leaderboards/games_played/';
    const total_exp_path = '/leaderboards/total_exp/';
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

  render() {
    this.store = require('../constants/Store').STORE;
    return (
      <div className="header-width-cap-container"><div className="header-width-cap">
        {this.state.show_settings &&
          <SettingsScreen onCloseSettings={this.onCloseSettingsClick}/>
        }
        <Link to="/"><img src={bridge_clipart} alt="Logo" className="logo" title="Go home"/></Link>

        <div className="header-dropdown">
          <div className="image-cropper-header">
            <img src={
                   require(
                     `../media/store/characters/${this.store.characters[this.props.activeCharacter || "Gespade"].file}`
                   )
                 }
                 alt="Profile"
                 className="profile-pic-header"
            />
          </div>
          <div className="header-dropdown-content">
            <Link to="/me" className="header-dropdown-item">My Profile</Link>
            <div className="header-dropdown-item" onClick={this.onShowSettingsClick}>Settings</div>
            <div className="header-dropdown-item" onClick={this.onLogOutClick}>Log Out</div>
          </div>
        </div>

        <div className="header-info">

          <div className="info-part level">
            <div className="info-round">
              <div className="info-logo">
                LVL
              </div>
              <div className="info-text">{LEVELS[this.state.level_idx]}</div>
            </div>
          </div>

          <div className="info-part coins">
            <div className="info-round">
              <div className="info-logo">
                <img src={coin} alt="Coin" className="coin-img"/>
              </div>
              <div className="info-text">{this.props.coins}</div>
            </div>
          </div>

          <div className="info-part exp">
            <div className="info-round">
              <div className="info-logo">
                EXP
              </div>
              <div className="info-text">{this.props.exp}</div>
            </div>
          </div>

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
    activeCharacter: state.storeActive.characters,
    coins: state.coins,
    exp: state.exp,
    games_played: state.games_played,
    level_idx: state.level_idx,
    mySocket: state.mySocket,
    total_exp: state.total_exp,
    userFriends: state.userFriends,
    userID: state.userID,
    userStatsPath: state.firebasePaths.stats,
  }
}
export default connect(mapStateToProps)(Header);
