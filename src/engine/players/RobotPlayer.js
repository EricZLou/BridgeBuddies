import React from 'react'
import {connect} from 'react-redux'

import Player from './Player'
import {makeBid, playCard} from '../../redux/actions/Core'

import {GAMESTATES, GAMETYPES} from '../../constants/GameEngine'


// REPRESENTS A CPU PLAYER (ONLINE + OFFLINE)
class RobotPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inside_turn: false,
    }
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  makeBid() {
    if (this.state.inside_turn) return;
    this.setState({inside_turn: true});
    this.sleep(1000).then(() => {
      const bid = {type: 'pass'};
      if (this.props.online)
        this.props.mySocket.emit("bid click", bid, this.props.seat);
      else
        this.props.dispatch(makeBid({bid: bid, seat: this.props.seat}));
    }).then(() => {
      this.setState({inside_turn: false});
    });
  }

  playCard() {
    if (this.state.inside_turn) return;
    this.setState({inside_turn: true});
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
      if (this.props.online)
        this.props.mySocket.emit("card click", cardx, this.props.seat);
      else
        this.props.dispatch(playCard({card: cardx, seat: this.props.seat}));
    }).then(() => {
      this.setState({inside_turn: false});
    });
  }

  componentDidMount() {
    if (this.props.curr_player !== this.props.seat) return;
    if (this.props.game_state === GAMESTATES.BIDDING) this.makeBid();
    else if (this.props.game_state === GAMESTATES.PLAYING) this.playCard();
  }

  componentDidUpdate() {
    if (this.props.curr_player !== this.props.seat) return;
    if (this.state.inside_turn) return;
    if (this.props.clickable) return;
    if (!this.props.ready_to_play) return;
    console.log('robot gonna play');
    if (this.props.game_state === GAMESTATES.BIDDING) this.makeBid();
    else if (this.props.game_state === GAMESTATES.PLAYING) this.playCard();
  }

  render() {
    return (
      <Player
        seat={this.props.seat}
        name={this.props.name}
        cards={this.props.cards}
        visible={this.props.visible}
        clickable={this.props.clickable}
        show_bidding_box={this.props.show_bidding_box}
        handleBidPlay={() => {}}
        handleCardPlay={() => {}}
      />
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    cards: state.hands[ownProps.seat],
    cards_on_board: state.cards_on_board,
    curr_player: state.curr_player,
    game_state: state.game_state,
    mySocket: state.mySocket,
    online: (state.game_info.game_type === GAMETYPES.ONLINE ? true : false),
    ready_to_play: state.ready_to_play,
  }
}
export default connect(mapStateToProps)(RobotPlayer);
