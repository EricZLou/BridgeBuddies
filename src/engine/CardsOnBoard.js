import React from 'react';

import Card from './Card'

import '../css/CardsOnBoard.css';

export default class CardsOnBoard extends React.Component {
  render() {
    const card_spacing = getComputedStyle(document.documentElement)
      .getPropertyValue('--card-spacing');
    const cards_list = this.props.cards.map((card, idx) => {
      return (
        <div className="hand" style={{left: parseInt(card_spacing)*idx}} key={idx}>
          <Card
            value={card.value}
            suit={card.suit}
            handleCardClick={()=>{}}
          />
        </div>
      );
    });
    return (
      <div>
        <div style={{position: 'absolute'}}>
          {cards_list}
        </div>
      </div>
    )
  }
};
