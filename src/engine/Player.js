import React from 'react'

import Hand from './Hand'
import PlayerTitle from './PlayerTitle'

import '../css/Player.css'

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.seat = this.props.seat;
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  playCard() {
    this.sleep(1000).then(() => {
      let cardx = null;
      const cards = this.props.cards;
      if (!this.props.opening_suit) {
        cardx = cards[Math.floor(Math.random() * cards.length)];
      }
      else {
        let found = false;
        for (let card of cards) {
          if (card.suit === this.props.opening_suit) {
            cardx = card;
            found = true;
            break;
          }
        }
        if (!found) cardx = cards[0];
      }
      this.props.handlePlayerClick(this.seat, cardx);
    });
  }

  componentDidUpdate() {
    if (this.props.clickable)
      return;
    if (this.props.is_my_turn && this.props.ready_to_play) this.playCard();
  }

  render() {
    return (
      <div>
        <Hand
          cards={this.props.cards}
          seat={this.props.seat}
          handleHandClick={this.props.handlePlayerClick}
          visible={this.props.visible}
          clickable={this.props.clickable}
        />
        <div className="player-title">
          <PlayerTitle
            seat={this.seat}
            is_my_turn={this.props.is_my_turn}
            name={this.props.name}
          />
        </div>
      </div>
    )
  }
};
