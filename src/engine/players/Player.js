import React from 'react'
import {connect} from 'react-redux'

import Hand from '../Hand'
import PlayerTitle from './PlayerTitle'
import {getNextPlayer, getPartner} from '../utils/GameScreenUtils'
import {setCurrPlayer, setReadyToPlay} from '../../redux/actions/Core'

import '../../css/Player.css'

import {GAMESTATES} from '../../constants/GameEngine'


// REPRESENTS THE USER
export class Player extends React.Component {
  constructor(props) {
    super(props);
    this.seat = this.props.seat;
    this.cards = this.props.cards;
    this.handleCardPlay = this.handleCardPlay.bind(this);
  }

  updateHand(card_played) {
    for (let idx in this.cards) {
      if (JSON.stringify(this.cards[idx]) === JSON.stringify(card_played)) {
        console.log(`[${this.seat}] Play ${card_played.suit} ${card_played.value}`);
        this.cards.splice(idx, 1);
        return;
      }
    }
  }

  handleCardPlay(card) {
    if (this.props.game_state !== GAMESTATES.PLAYING) return;
    if (this.props.curr_player === this.seat &&
        this.props.game_engine.isValidCard(card, this.cards)
    ) {
      this.props.game_engine.setDummy(getPartner(this.props.contract.declarer));
      this.props.game_engine.playCard(card, this.seat);
      this.updateHand(card);
      this.props.updateCardsOnBoard(this.seat, card);
      if (this.props.game_engine.isTrickOver()) {
        this.props.dispatch(setReadyToPlay(false));
        this.props.dispatch(setCurrPlayer(this.props.game_engine.getRoundWinner()));
      } else {
        this.props.dispatch(setCurrPlayer(getNextPlayer(this.seat)));
      }
    }
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
            name={this.props.name}
            is_my_turn={this.props.curr_player === this.seat}
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
export default connect(mapStateToProps)(Player);
