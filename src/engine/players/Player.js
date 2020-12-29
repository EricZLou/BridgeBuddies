import React from 'react'
import {connect} from 'react-redux'

import BiddingBox from '../BiddingBox'
import {sortHand} from '../Deck'
import Hand from '../Hand'
import PlayerTitle from './PlayerTitle'
import {game_engine} from '../managers/BridgeGameEngine'
import {getNextPlayer} from '../utils/GameScreenUtils'
import {setCurrPlayer, setPlayerCards, setReadyToPlay} from '../../redux/actions/Core'

import '../../css/Player.css'

import {GAMESTATES} from '../../constants/GameEngine'


// REPRESENTS
export class Player extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   sorted: false,
    // }
    this.seat = this.props.seat;
    this.handleBidPlayWrap = this.handleBidPlayWrap.bind(this);
    this.handleCardPlayWrap = this.handleCardPlayWrap.bind(this);
  }

  // componentDidUpdate() {
  //   if (this.state.cards && this.props.contract && !this.state.sorted) {
  //     this.setState({
  //       cards: sortHand(this.state.cards, this.props.contract.suit),
  //       sorted: true,
  //     });
  //   }
  // }
  //
  updateHand(card_played) {
    let cards_copy = [...this.props.cards];
    for (let idx in this.props.cards) {
      if (JSON.stringify(this.props.cards[idx]) === JSON.stringify(card_played)) {
        cards_copy.splice(idx, 1);
        this.props.dispatch(setPlayerCards({seat: this.seat, cards: cards_copy}));
        return;
      }
    }
    cards_copy.pop();
    this.props.dispatch(setPlayerCards({seat: this.seat, cards: cards_copy}));
  }

  processBidPlayForSeat(bid, seat) {
    if (bid.level)
      console.log(`[GAME PLAY] ${seat} bids ${bid.level}${bid.suit}`);
    else
      console.log(`[GAME PLAY] ${seat} bids ${bid.type}`);
    game_engine.doBid(bid, seat);
    this.props.updateBidsOnBoard(seat, bid);
    if (game_engine.isBiddingComplete()) {
      this.props.handleBiddingComplete();
    } else {
      this.props.dispatch(setCurrPlayer(getNextPlayer(seat)));
    }
  }

  handleBidPlay(bid) {
    if (this.props.game_state !== GAMESTATES.BIDDING) return false;
    if (this.props.curr_player === this.seat &&
      game_engine.isValidBid(bid, this.props.curr_player)
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
    game_engine.playCard(card, seat);
    this.updateHand(card);
    this.props.updateCardsOnBoard(seat, card);
    if (game_engine.isTrickOver()) {
      this.props.dispatch(setReadyToPlay(false));
      this.props.dispatch(setCurrPlayer(game_engine.getRoundWinner()));
    } else {
      this.props.dispatch(setCurrPlayer(getNextPlayer(seat)));
    }
  }

  handleCardPlay(card) {
    if (this.props.game_state !== GAMESTATES.PLAYING) return false;
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
            is_my_turn={this.props.curr_player === this.seat}
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
    cards: state.player_cards[ownProps.seat],
    contract: state.contract,
    curr_player: state.curr_player,
    game_state: state.game_state,
    ready_to_play: state.ready_to_play,
  }
}
export default connect(mapStateToProps)(Player);
