import React from 'react'

import Hand from '../Hand'
import Player from './Player'
import PlayerTitle from './PlayerTitle'

import '../../css/Player.css'


export default class OnlinePlayer extends Player {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <div>
        <Hand
          cards={this.props.cards}
          seat={this.props.seat}
          handleHandClick={this.props.handlePlayerClick}
          visible={this.props.visible}
          clickable={this.props.clickable}
        />
        <div className="player-title">
          <PlayerTitle
            seat={this.props.seat}
            is_my_turn={this.props.is_my_turn}
            name={this.props.name}
          />
        </div>
      </div>
    )
  }
};
