import {connect} from 'react-redux'

import {Player} from './Player'
import {isValidBid, isValidCard} from '../managers/BridgeGameEngine'


// REPRESENTS AN ONLINE OPPONENT
class OnlineOpponent extends Player {
  constructor(props) {
    super(props);
    this.show_bidding_box = false;
  }

  handleBidPlayWrap(bid) {
    if (!this.props.clickable) {
      this.handleBidPlay(bid);
      return;
    }
    if (this.props.curr_player === this.seat &&
      isValidBid({history: this.props.bid_history, bid: bid})) {
      this.props.mySocket.emit("bid click", bid, this.seat);
    }
  }

  handleCardPlayWrap(card) {
    if (!this.props.clickable) {
      this.handleCardPlay(card);
      return;
    }
    if (this.props.curr_player === this.seat &&
      isValidCard({cards_on_board: this.props.cards_on_board, card: card})) {
      this.props.mySocket.emit("card click", card, this.seat);
    }
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    bid_history: state.bid_history,
    cards: state.hands[ownProps.seat],
    cards_on_board: state.cards_on_board,
    curr_player: state.curr_player,
    game_state: state.game_state,
    ready_to_play: state.ready_to_play,
    mySocket: state.mySocket,
  }
}
export default connect(mapStateToProps)(OnlineOpponent);
