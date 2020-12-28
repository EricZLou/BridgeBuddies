import React from 'react'

import Hand from '../Hand'
import {Player} from './Player'
import PlayerTitle from './PlayerTitle'


// REPRESENTS AN ONLINE PLAYER (except current user)
export default class OnlinePlayer extends Player {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Hand
          cards={this.props.cards}
          seat={this.seat}
          handleCardPlay={this.handleCardPlay}
          visible={this.props.visible}
          clickable={this.props.clickable}
        />
        <div className="player-title">
          <PlayerTitle
            seat={this.seat}
            is_my_turn={this.props.is_my_turn}
            name={this.props.name}
          />
        </div>
      </div>
    )
  }
};
