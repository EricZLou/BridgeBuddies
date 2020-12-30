import React from 'react'
import {connect} from 'react-redux'

import BiddingBox from '../BiddingBox'
import Hand from '../Hand'
import PlayerTitle from './PlayerTitle'
import {game_engine} from '../managers/BridgeGameEngine'
import {finishBidding, finishTrick, incrementCurrPlayer, makeBid, playCard, setReadyToPlay} from '../../redux/actions/Core'

import '../../css/Player.css'

import {GAMESTATES} from '../../constants/GameEngine'


// REPRESENTS
export class Player extends React.Component {
  constructor(props) {
    super(props);
    this.seat = this.props.seat;
    this.handleBidPlayWrap = this.handleBidPlayWrap.bind(this);
    this.handleCardPlayWrap = this.handleCardPlayWrap.bind(this);
  }

  processBidPlayForSeat(bid, seat) {
    if (bid.level)
      console.log(`[GAME PLAY] ${seat} bids ${bid.level}${bid.suit}`);
    else
      console.log(`[GAME PLAY] ${seat} bids ${bid.type}`);
    this.props.dispatch(makeBid({bid: bid, seat: seat}));
    game_engine.doBid(bid, seat);
    if (game_engine.isBiddingComplete()) {
      this.props.dispatch(finishBidding(game_engine.getContract()));
      this.props.dispatch(setReadyToPlay(true));
    } else {
      this.props.dispatch(incrementCurrPlayer());
    }
  }

  handleBidPlay(bid) {
    if (this.props.curr_player === this.seat &&
      game_engine.isValidBid(bid)
    ) {
      this.processBidPlayForSeat(bid, this.seat)
      this.making_bid = false;
      return true;
    }
    return false;
  }
  handleBidPlayWrap(bid) {
    this.handleBidPlay(bid);
  }

  processCardPlayForSeat(card, seat) {
    console.log(`[GAME PLAY] ${seat} plays ${card.value}${card.suit}`)
    this.props.dispatch(playCard({card: card, seat: seat}));
    game_engine.playCard(card, seat);
    if (game_engine.isTrickOver()) {
      this.props.dispatch(finishTrick());
      this.props.dispatch(setReadyToPlay(false));
    } else {
      this.props.dispatch(incrementCurrPlayer());
    }
  }

  handleCardPlay(card) {
    if (this.props.curr_player === this.seat &&
        game_engine.isValidCard(card, this.props.cards)
    ) {
      this.processCardPlayForSeat(card, this.seat);
      this.playing_card = false;
      return true;
    }
    return false;
  }
  handleCardPlayWrap(card) {
    this.handleCardPlay(card);
  }

  render() {
    return (
      <div>
        <Hand
          cards={this.props.cards}
          seat={this.seat}
          handleCardPlay={this.handleCardPlayWrap}
          visible={this.props.visible}
          clickable={this.props.clickable}
        />
        <div className="player-title">
          <PlayerTitle
            seat={this.seat}
            name={this.props.name}
          />
        </div>
        {this.props.game_state === GAMESTATES.BIDDING &&
          this.props.curr_player === this.seat &&
          this.show_bidding_box &&
          <div className="bidding-box-container">
            <BiddingBox handleBidPlay={this.handleBidPlayWrap}/>
          </div>
        }
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    cards: state.hands[ownProps.seat],
    contract: state.contract,
    curr_player: state.curr_player,
    game_state: state.game_state,
    ready_to_play: state.ready_to_play,
  }
}
export default connect(mapStateToProps)(Player);
