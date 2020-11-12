import React from 'react';

import Card from './Card'

import '../css/Hand.css';

export default class Hand extends React.Component {
  constructor(props) {
    super(props);
    this.seat = this.props.seat;
  }

  render() {
    const card_spacing = getComputedStyle(document.documentElement)
      .getPropertyValue('--card-spacing');
    const cards_list = this.props.cards.map((card, idx) => {
      return (
        <div className="hand" style={{left: parseInt(card_spacing)*idx}} key={idx}>
          <Card
            value={card.value}
            suit={card.suit}
            handleCardClick={this.props.handleHandClick.bind(this, this.seat)}
          />
        </div>
      );
    });
    return (
      <div style={{position: 'absolute'}}>
        {cards_list}
      </div>
    )
  }
};
