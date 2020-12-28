import React from 'react'
import {connect} from 'react-redux'

import Hand from '../Hand'
import {Player} from './Player'
import PlayerTitle from './PlayerTitle'


// REPRESENTS AN ONLINE PLAYER (except current user)
class OnlinePlayer extends Player {
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
            is_my_turn={this.props.curr_player === this.seat}
            name={this.props.name}
          />
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    contract: state.contract,
    curr_player: state.curr_player,
    game_engine: state.game_engine,
    game_state: state.game_state,
    ready_to_play: state.ready_to_play,
  }
}
export default connect(mapStateToProps)(OnlinePlayer);
