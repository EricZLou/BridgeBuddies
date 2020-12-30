import {connect} from 'react-redux'

import {Player} from './Player'
import {game_engine} from '../managers/BridgeGameEngine'
import {setHand} from '../../redux/actions/Core'

import {PARTNERS} from '../../constants/GameEngine'


// REPRESENTS CURRENT USER PLAYING ONLINE
class OnlinePlayer extends Player {
  constructor(props) {
    super(props);
    this.show_bidding_box = true;
  }

  componentDidMount() {
    // in-game play
    this.props.mySocket.on("bid click", (bid, seat) => {
      this.processBidPlayForSeat(bid, seat);
      const dummy = PARTNERS[this.props.contract.declarer];
      if (game_engine.isBiddingComplete() && this.seat === dummy)
        this.props.mySocket.emit("dummy hand", this.props.cards);
    });
    this.props.mySocket.on("dummy hand", (cards) => {
      const dummy = PARTNERS[this.props.contract.declarer];
      this.props.dispatch(setHand({seat: dummy, cards: cards}));
      console.log("received cards");
    });
    this.props.mySocket.on("card click", (card, seat) => {
      this.processCardPlayForSeat(card, seat);
    });
  }

  handleBidPlayWrap(bid) {
    if (this.handleBidPlay(bid)) {
      this.props.mySocket.emit("bid click", bid, this.seat);
    }
  }

  handleCardPlayWrap(card) {
    if (this.handleCardPlay(card)) {
      this.props.mySocket.emit("card click", card, this.seat);
    }
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    cards: state.hands[ownProps.seat],
    contract: state.contract,
    curr_player: state.curr_player,
    game_state: state.game_state,
    ready_to_play: state.ready_to_play,
    mySocket: state.mySocket,
  }
}
export default connect(mapStateToProps)(OnlinePlayer);
