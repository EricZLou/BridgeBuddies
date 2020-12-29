import {connect} from 'react-redux'

import {Player} from './Player'
import {game_engine} from '../managers/BridgeGameEngine'

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
      if (game_engine.isBiddingComplete() && this.seat === PARTNERS[this.props.contract.declarer])
        this.props.mySocket.emit("dummy hand", this.cards);
    });
    this.props.mySocket.on("dummy hand", (cards) => {
      console.log("received cards");
      console.log(cards);
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
    contract: state.contract,
    curr_player: state.curr_player,
    game_state: state.game_state,
    ready_to_play: state.ready_to_play,
    mySocket: state.mySocket,
  }
}
export default connect(mapStateToProps)(OnlinePlayer);
