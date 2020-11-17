import React from 'react'

import Hand from './Hand'
import {SEATS} from '../constants/Game'

import '../css/Player.css'

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.seat = this.props.seat;
  }

  // this.props.handlePlayerClick()

  playCard() {
    const cards = this.props.cards;
    const cards_on_board = this.props.cards_on_board;
    if (cards_on_board.length === 0) {
      return cards[Math.floor(Math.random() * cards.length)];
    }
    else {
      const opening_suit = cards_on_board[0].suit;
      for (let card of cards) {
        if (card.suit === opening_suit) return card;
      }
      return cards[0];
    }
  }

  componentDidUpdate() {
    if (this.props.is_my_turn && this.props.ready_to_play && this.seat !== SEATS.SOUTH) {
      this.props.handlePlayerClick(this.seat, this.playCard());
    }
  }

  render() {
    return (
      <Hand
        cards={this.props.cards}
        seat={this.props.seat}
        handleHandClick={this.props.handlePlayerClick}
        visible={this.props.visible}
      />
    )
  }
};
