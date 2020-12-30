import {connect} from 'react-redux'

import {Player} from './Player'

import {GAMESTATES} from '../../constants/GameEngine'


// REPRESENTS A CPU OPPONENT
class RobotOpponent extends Player {
  constructor(props) {
    super(props);
    this.show_bidding_box = false;
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  playCard() {
    this.sleep(1000).then(() => {
      let cardx = null;
      const cards = this.props.cards;
      if (this.props.cards_on_board.length === 0) {
        cardx = cards[Math.floor(Math.random() * cards.length)];
      }
      else {
        const opening_suit = this.props.cards_on_board[0].card.suit;
        let found = false;
        for (let card of cards) {
          if (card.suit === opening_suit) {
            cardx = card;
            found = true;
            break;
          }
        }
        if (!found) cardx = cards[0];
      }
      this.handleCardPlay(cardx);
    });
  }

  makeBid() {
    this.sleep(1000).then(() => {
      this.handleBidPlay({type: 'pass'});
    });
  }

  componentDidMount() {
    if (this.props.curr_player !== this.seat)
      return;
    this.making_bid = true;
    this.makeBid();
  }

  componentDidUpdate() {
    if (this.props.clickable || this.props.curr_player !== this.seat)
      return;
    if (this.props.game_state === GAMESTATES.BIDDING) {
      this.making_bid = true;
      this.makeBid();
    } else if (this.props.game_state === GAMESTATES.PLAYING) {
      if (!this.playing_card && this.props.ready_to_play) {
        this.playing_card = true;
        this.playCard();
      }
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
    game_state: state.game_state,
    ready_to_play: state.ready_to_play,
  }
}
export default connect(mapStateToProps)(RobotOpponent);
