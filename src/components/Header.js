import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Firebase from '../Firebase'

import {TOTAL_EXP} from '../SampleData'
import {LEVELS} from '../constants/Levels'
import {logOut, homeScreenNotReady} from '../redux/actions/Core'
import {STORE} from '../constants/Store'

import '../css/Style.css'
import '../css/Header.css'
import '../css/ProfilePic.css'

import bridge_clipart from '../media/bridge_clipart.png'
import coin from '../media/coin.png'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
    }
    this.onHeaderDropdownClick = this.onHeaderDropdownClick.bind(this);
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
  }

  onHeaderDropdownClick() {
    this.props.dispatch(logOut());
    this.props.dispatch(homeScreenNotReady());
    Firebase.auth().signOut().then(()=>{}).catch((error)=>{alert(error);});
  }

  showDropdown() {
    this.setState({dropdown: true});
  }
  hideDropdown() {
    this.setState({dropdown: false});
  }

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
              <img src={require(`../media/store/characters/${STORE.characters[this.props.activeCharacter].file}`)} alt="Profile" className="profile-pic-header"/>
            </div>
            {this.state.dropdown &&
              <div className="header-dropdown-content">
                <div>My Profile</div>
                <div>Settings</div>
                <div onClick={this.onHeaderDropdownClick}>Log Out</div>
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
    userStorePath: state.firebasePaths.store,
    activeCharacter: state.storeActive.characters,
  }
}
export default connect(mapStateToProps)(Header);
