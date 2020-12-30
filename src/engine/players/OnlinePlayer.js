import {connect} from 'react-redux'

import {Player} from './Player'
import {isBiddingComplete, isValidBid, isValidCard} from '../managers/BridgeGameEngine'
import {sortHand} from '../Deck'
import {setHand} from '../../redux/actions/Core'


// REPRESENTS CURRENT USER PLAYING ONLINE
class OnlinePlayer extends Player {
  constructor(props) {
    super(props);
    this.show_bidding_box = true;
  }

  componentDidMount() {
    // in-game play
    this.props.mySocket.on("bid click", (bid, seat) => {
      console.log(`[player] received bid click ${bid.suit}${bid.level} from ${seat}`);
      this.processBidPlayForSeat(bid, seat);
      if (isBiddingComplete(this.props.bid_history) && this.seat === this.props.dummy) {
        const sorted_hand = sortHand(this.props.cards, this.props.contract.suit);
        this.props.mySocket.emit("dummy hand", sorted_hand);
      }
    });
    this.props.mySocket.on("dummy hand", (cards) => {
      this.props.dispatch(setHand({seat: this.props.dummy, cards: cards}));
    });
    this.props.mySocket.on("card click", (card, seat) => {
      console.log(`[player] received card click ${card.suit}${card.value} from ${seat}`);
      this.processCardPlayForSeat(card, seat);
    });
  }

  handleBidPlayWrap(bid) {
    if (this.props.curr_player === this.seat && isValidBid({history: this.props.bid_history, bid: bid})) {
      this.props.mySocket.emit("bid click", bid, this.seat);
    }
  }

  handleCardPlayWrap(card) {
    if (this.props.curr_player === this.seat && isValidCard({cards_on_board: this.props.cards_on_board, card: card, cards_in_hand: this.props.cards})) {
      this.props.mySocket.emit("card click", card, this.seat);
    }
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    bid_history: state.bid_history,
    cards: state.hands[ownProps.seat],
    cards_on_board: state.cards_on_board,
    contract: state.contract,
    curr_player: state.curr_player,
    dummy: state.dummy,
    game_state: state.game_state,
    ready_to_play: state.ready_to_play,
    mySocket: state.mySocket,
  }
}
export default connect(mapStateToProps)(OnlinePlayer);
