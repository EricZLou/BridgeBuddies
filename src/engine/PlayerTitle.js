import React from 'react'

import '../css/PlayerTitle.css'

import sreya2 from '../media/store/characters/sreya2.png';

export default class PlayerTitle extends React.Component {
  render() {
    return (
      <div className={this.props.is_my_turn ? "player-title-on" : "player-title-off"}>
        <div className="player-title-pic">
          <img src={sreya2} alt="Profile"/>
        </div>
        <div className="player-title-name">
          insert username ({this.props.seat})
        </div>
        <div className="player-title-seat">
          {this.props.seat}
        </div>
      </div>
    )
  }
};
