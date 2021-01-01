import React from 'react'
import {connect} from 'react-redux'

import BiddingBox from '../BiddingBox'
import Hand from '../Hand'
import PlayerTitle from '../../components/PlayerTitle'
import {
  isValidBid, isValidCard
} from '../managers/BridgeGameEngine'
import {makeBid, playCard} from '../../redux/actions/Core'

import '../../css/Player.css'

import {GAMESTATES} from '../../constants/GameEngine'


// REPRESENTS
export class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inside_turn: false,
    }
    this.seat = this.props.seat;
    this.handleBidPlay = this.handleBidPlay.bind(this);
    this.handleCardPlay = this.handleCardPlay.bind(this);
  }

  handleBidPlay(bid) {
    if (this.props.curr_player === this.seat && isValidBid({
      history: this.props.bid_history, bid: bid
    })) {
      this.props.dispatch(makeBid({bid: bid, seat: this.seat}));
      this.setState({inside_turn: false});
    }
  }

  handleCardPlay(card) {
    if (this.props.curr_player === this.seat && isValidCard({
      cards_on_board: this.props.cards_on_board, card: card, cards_in_hand: this.props.cards
    })) {
      this.props.dispatch(playCard({card: card, seat: this.seat}));
      this.setState({inside_turn: false});
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
            name={this.props.name}
            curr_player={this.props.curr_player}
          />
        </div>
        {this.props.game_state === GAMESTATES.BIDDING &&
          this.props.curr_player === this.seat &&
          this.show_bidding_box &&
          <div className="bidding-box-container">
            <BiddingBox handleBidPlay={this.handleBidPlay}/>
          </div>
        }
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    bid_history: state.bid_history,
    cards: state.hands[ownProps.seat],
    cards_on_board: state.cards_on_board,
    contract: state.contract,
    curr_player: state.curr_player,
    game_state: state.game_state,
    ready_to_play: state.ready_to_play,
  }
}
export default connect(mapStateToProps)(Player);
