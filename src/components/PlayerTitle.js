import React from 'react'

import '../css/PlayerTitle.css'

import klubby from '../media/store/characters/klubby.png'


export default class PlayerTitle extends React.Component {
  render() {
    return (
      <div className={this.props.curr_player === this.props.seat ?
        "player-title-on" : "player-title-off"}>
        <div className="player-title-pic">
          <img src={klubby} alt="Profile"/>
        </div>
        <div className="player-title-name">
          {this.props.name}
        </div>
        <div className="player-title-seat">
          {this.props.seat}
        </div>
      </div>
    )
  }
};
