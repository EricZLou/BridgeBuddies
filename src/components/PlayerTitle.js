import React from 'react'

import '../css/PlayerTitle.css'

import klubby from '../media/store/characters/klubby.png'


export default class PlayerTitle extends React.Component {
  render() {
    const player_title_style = {
      height: this.props.variable_sizes.card_height / 3,
      width: `calc(${this.props.variable_sizes.hand_width}px - 8px`,
    }
    const player_pic_style = {
      height: this.props.variable_sizes.card_height / 3 * 0.8,
      width: this.props.variable_sizes.card_height / 3 * 0.8,
    }
    return (
      <div className={(this.props.curr_player === this.props.seat ?
        "player-title-on" : "player-title-off")} style={player_title_style}>
        <div className="player-title-pic" style={player_pic_style}>
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
