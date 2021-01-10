import React from 'react'
import {connect} from 'react-redux'

import BiddingBox from '../BiddingBox'
import Hand from '../Hand'
import PlayerTitle from '../../components/PlayerTitle'

import {isValidBid, isValidCard} from '../managers/BridgeGameEngine'
import {makeBid, playCard} from '../../redux/actions/Core'

import '../../css/Player.css'

import {GAMESTATES, GAMETYPES} from '../../constants/GameEngine'


async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// REPRESENTS ANY PLAYER IN GENERAL
class GenPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inside_turn: false,
    }
    this.userBidPlay = this.userBidPlay.bind(this);
    this.userCardPlay = this.userCardPlay.bind(this);
  }

  robotBidPlay() {
    if (this.state.inside_turn) return;
    this.setState({inside_turn: true});
    sleep(1000).then(() => {
      const bid = {type: 'pass'};
      if (this.props.online)
        this.props.mySocket.emit("bid click", bid, this.props.seat);
      else
        this.props.dispatch(makeBid({bid: bid, seat: this.props.seat}));
    }).then(() => {
      this.setState({inside_turn: false});
    });
  }

  robotCardPlay() {
    if (this.state.inside_turn) return;
    this.setState({inside_turn: true});
    sleep(1000).then(() => {
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

  userBidPlay(bid) {
    if (this.props.game_state !== GAMESTATES.BIDDING) return;
    if (this.props.curr_player !== this.props.seat) return;
    if (this.state.inside_turn) return;
    if (isValidBid({
      history: this.props.bid_history,
      bid: bid,
    })) {
      this.setState({inside_turn: true});
      if (this.props.online)
        this.props.mySocket.emit("bid click", bid, this.props.seat);
      else
        this.props.dispatch(makeBid({bid: bid, seat: this.props.seat}));
      this.setState({inside_turn: false});
    }
  }

  userCardPlay(card) {
    if (this.props.game_state !== GAMESTATES.PLAYING) return;
    if (this.props.curr_player !== this.props.seat) return;
    if (this.state.inside_turn) return;
    if (isValidCard({
      cards_on_board: this.props.cards_on_board,
      card: card,
      cards_in_hand: this.props.cards,
    })) {
      this.setState({inside_turn: true});
      if (this.props.online)
        this.props.mySocket.emit("card click", card, this.props.seat);
      else
        this.props.dispatch(playCard({card: card, seat: this.props.seat}));
      this.setState({inside_turn: false});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.clickable !== this.props.clickable) return true;
    if (nextProps.curr_player !== this.props.curr_player) return true;
    if (nextProps.game_state !== this.props.game_state) return true;
    if (nextProps.player_type !== this.props.player_type) return true;
    if (nextProps.ready_to_play !== this.props.ready_to_play) return true;
    if (nextProps.visible !== this.props.visible) return true;
    return false;
  }

  tryToPlay() {
    if (this.props.curr_player !== this.props.seat) return;
    if (this.props.online && this.props.player_type === GAMETYPES.ONLINE) return;
    if (this.state.inside_turn) return;
    if (this.props.clickable) return;
    if (!this.props.ready_to_play) return;
    if (this.props.game_state === GAMESTATES.BIDDING) this.robotBidPlay();
    else if (this.props.game_state === GAMESTATES.PLAYING) this.robotCardPlay();
  }

  componentDidMount() {
    this.tryToPlay();
  }

  componentDidUpdate() {
    this.tryToPlay();
  }

  render() {
    return (
      <div>
        <Hand
          cards={this.props.cards}
          seat={this.props.seat}
          handleCardPlay={this.userCardPlay}
          visible={this.props.visible}
          clickable={this.props.clickable}
        />
        <div className="player-title">
          <PlayerTitle
            seat={this.props.seat}
            name={this.props.name}
            curr_player={this.props.curr_player}
          />
        </div>
        {this.props.game_state === GAMESTATES.BIDDING &&
          this.props.curr_player === this.props.seat &&
          this.props.me === this.props.seat &&
          <div className="bidding-box-container">
            <BiddingBox handleBidPlay={this.userBidPlay}/>
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
    curr_player: state.curr_player,
    me: state.game_info.me,
    game_state: state.game_state,
    mySocket: state.mySocket,
    online: state.game_info.game_type === GAMETYPES.ONLINE,
    player_type: state.player_types[ownProps.seat],
    ready_to_play: state.ready_to_play,
  }
}
export default connect(mapStateToProps)(GenPlayer);
