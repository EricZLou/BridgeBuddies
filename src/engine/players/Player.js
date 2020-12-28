import React from 'react'
import {connect} from 'react-redux'

import BiddingBox from '../BiddingBox'
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
    this.state = {
      cards: this.props.cards,
    }
    this.seat = this.props.seat;
    this.handleCardPlay = this.handleCardPlay.bind(this);
    this.handleBidPlay = this.handleBidPlay.bind(this);
  }

  updateHand(card_played) {
    for (let idx in this.state.cards) {
      if (JSON.stringify(this.state.cards[idx]) === JSON.stringify(card_played)) {
        let cards_copy = [...this.state.cards];
        cards_copy.splice(idx, 1);
        this.setState({cards: cards_copy});
        return;
      }
    }
  }

  handleCardPlay(card) {
    if (this.props.game_state !== GAMESTATES.PLAYING) return;
    if (this.props.curr_player === this.seat &&
        this.props.game_engine.isValidCard(card, this.state.cards)
    ) {
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

  handleBidPlay(bid) {
    if (this.props.game_state !== GAMESTATES.BIDDING) return;
    // if (this.props.curr_player === this.seat &&
    if (true &&
      this.props.game_engine.isValidBid(bid, this.props.curr_player)
    ) {
      if (this.props.online) this.props.handleBidClick(bid);
      this.props.game_engine.doBid(bid, this.props.curr_player);
      this.props.updateBidsOnBoard(this.props.curr_player, bid);
      if (this.props.game_engine.isBiddingComplete()) {
        this.props.handleBiddingComplete();
      } else {
        this.props.dispatch(setCurrPlayer(getNextPlayer(this.seat)));
      }
    }
  }

  render() {
    return (
      <div>
        <Hand
          cards={this.state.cards}
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
        {(this.props.game_state === GAMESTATES.BIDDING && this.props.curr_player === this.seat) &&
          <div className="bidding-box-container">
            <BiddingBox
              handleBidPlay={this.handleBidPlay}
            />
          </div>
        }
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
