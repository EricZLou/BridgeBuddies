import React from 'react'
import {connect} from 'react-redux'

import Firebase from '../Firebase'
import Header from '../components/Header'

import '../css/Style.css'
import '../css/ProfileScreen.css'

import {EXP_BY_LEVEL, LEVELS} from '../constants/CoinsAndExp'


class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  componentDidMount() {
    document.body.style.backgroundColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--theme-sky');
    const user = Firebase.auth().currentUser;
    this.setState({email: user.email});
  }

  render() {
    this.store = require('../constants/Store').STORE;
    const progress_str = `${100 * this.props.exp / EXP_BY_LEVEL[LEVELS[this.props.level_idx]]}%`;
    return (
      <div>
        <Header/>
        <div className="body-width-cap-container"><div className="body-width-cap">
          <div className="profile-body-container"><div className="profile-container">
            <div className="profile-left-container">
              <div className="profile-left">
                <div className="profile-title">PROFILE</div>
                <img src={
                       require(
                         `../media/store/characters/${this.store.characters[this.props.storeActive.characters].file}`
                       )
                     }
                     alt="Profile"
                     className="profile-profile-pic"
                />
              </div>
            </div>
            <div className="profile-right-container">
              <div className="profile-right">
                <div className="profile-right-top">
                  <div className="profile-exp">
                    <div className="profile-exp-symbol">&#9876;</div>
                    <div className="profile-exp-level-bar">
                      <div className="profile-exp-level-bar-cover" style={{
                        width: progress_str
                      }}/>
                      <div className="profile-exp-level">{LEVELS[this.props.level_idx]}</div>
                    </div>
                    <div className="profile-exp-exp">{`${this.props.exp} / ${EXP_BY_LEVEL[LEVELS[this.props.level_idx]]}`}</div>
                  </div>
                  <div className="profile-username">{this.props.userDetails.username}</div>
                </div>
                <div className="profile-right-bottom">
                  <div className="profile-stats">
                    <div className="profile-stats-title">&#9733; STATS &#9733;</div>
                    <div className="profile-stat">
                      <div>Games played:</div>
                      <div>{this.props.games_played}</div>
                    </div>
                    <div className="profile-stat">
                      <div>Total exp:</div>
                      <div>{this.props.total_exp}</div>
                    </div>
                  </div>
                  <div className="profile-infos">
                    <div className="profile-infos-title">&#9733; INFO &#9733;</div>
                    <div className="profile-info">
                      <div>First name:</div>
                      <div>{this.props.userDetails.first_name}</div>
                    </div>
                    <div className="profile-info">
                      <div>Last name:</div>
                      <div>{this.props.userDetails.last_name}</div>
                    </div>
                    <div className="profile-info">
                      <div>Email:</div>
                      <div>{this.state.email}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div></div>
        </div></div>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    exp: state.exp,
    games_played: state.games_played,
    level_idx: state.level_idx,
    storeActive: state.storeActive,
    total_exp: state.total_exp,
    userDetails: state.userDetails,
  }
}
export default connect(mapStateToProps)(ProfileScreen);
