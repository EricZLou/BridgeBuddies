import React from 'react'
import {connect} from 'react-redux'

import Hand from '../Hand'
import PlayerTitle from './PlayerTitle'
import {getPartner} from '../utils/GameScreenUtils'
import {setCurrPlayer, setReadyToPlay} from '../../redux/actions/Core'

import '../../css/Player.css'

import {GAMESTATES} from '../../constants/GameEngine'


// REPRESENTS THE USER
export class Player extends React.Component {
  constructor(props) {
    super(props);
    this.seat = this.props.seat;
    this.handleCardPlay = this.handleCardPlay.bind(this);
  }

  handleCardPlay(seat, card) {
    if (this.props.game_state !== GAMESTATES.PLAYING) return;
    if (this.props.curr_player === seat &&
        this.props.game_engine.isValidCard(card, this[seat])
    ) {
      if (this.props.online) this.props.emitCardClick(card, seat);
      this.props.game_engine.setDummy(getPartner(this.props.contract.declarer));
      this.props.game_engine.playCard(card, seat);
      this.updateHands(seat, card);
      this.updateCardsOnBoard(seat, card);
      if (this.props.game_engine.isTrickOver()) {
        this.props.dispatch(setCurrPlayer(this.props.game_engine.getRoundWinner()));
        this.props.dispatch(setReadyToPlay(false));
      } else {
        this.goToNextPlayer();
      }
    }
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
