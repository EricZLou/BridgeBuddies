import React from 'react'
import {connect} from 'react-redux'

import Hand from '../Hand'
import {Player} from './Player'
import PlayerTitle from './PlayerTitle'


// REPRESENTS A CPU
class RobotPlayer extends Player {
  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  playCard() {
    this.sleep(1000).then(() => {
      let cardx = null;
      const cards = this.cards;
      if (!this.props.opening_suit) {
        cardx = cards[Math.floor(Math.random() * cards.length)];
      }
      else {
        let found = false;
        for (let card of cards) {
          if (card.suit === this.props.opening_suit) {
            cardx = card;
            found = true;
            break;
          }
        }
        if (!found) cardx = cards[0];
      }
      this.handleCardPlay(cardx);
    });
  }

  componentDidUpdate() {
    if (this.props.clickable)
      return;
    if (this.props.curr_player === this.seat && this.props.ready_to_play) this.playCard();
  }

  render() {
    return (
      <div>
        <Hand
          cards={this.cards}
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
export default connect(mapStateToProps)(RobotPlayer);
