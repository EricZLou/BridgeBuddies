/***************************************
DEPRECATED: USE GENPLAYER
***************************************/

import React from 'react'
import {connect} from 'react-redux'

import Player from './Player'
import {isValidBid, isValidCard} from '../managers/BridgeGameEngine'

import {GAMESTATES} from '../../constants/GameEngine'


// REPRESENTS ANY USER PLAYING ONLINE (4 users)
class OnlinePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inside_turn: false,
    }
    this.handleBidPlay = this.handleBidPlay.bind(this);
    this.handleCardPlay = this.handleCardPlay.bind(this);
  }

  handleBidPlay(bid) {
    if (this.props.game_state !== GAMESTATES.BIDDING) return;
    if (this.props.curr_player !== this.props.seat) return;
    if (this.state.inside_turn) return;
    if (isValidBid({
      history: this.props.bid_history,
      bid: bid,
    })) {
      this.setState({inside_turn: true});
      this.props.mySocket.emit("bid click", bid, this.props.seat);
      this.setState({inside_turn: false});
    }
  }

  handleCardPlay(card) {
    if (this.props.game_state !== GAMESTATES.PLAYING) return;
    if (this.props.curr_player !== this.props.seat) return;
    if (this.state.inside_turn) return;
    if (isValidCard({
      cards_on_board: this.props.cards_on_board,
      card: card,
      cards_in_hand: this.props.cards,
    })) {
      this.setState({inside_turn: true});
      this.props.mySocket.emit("card click", card, this.props.seat);
      this.setState({inside_turn: false});
    }
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
        handleBidPlay={this.handleBidPlay}
        handleCardPlay={this.handleCardPlay}
      />
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    bid_history: state.bid_history,
    cards: state.hands[ownProps.seat],
    cards_on_board: state.cards_on_board,
    curr_player: state.curr_player,
    game_state: state.game_state,
    mySocket: state.mySocket,
  }
}
export default connect(mapStateToProps)(OnlinePlayer);
