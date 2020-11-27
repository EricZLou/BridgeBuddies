import React from 'react';

import Card from './Card'

import '../css/CardsOnBoard.css';

export default class CardsOnBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards_on_board: this.props.cards,
    }
  }
  render() {
    const cards_list = this.props.cards.map((card_play, idx) => {
      return (
        <div className={card_play.seat} key={idx}>
          <Card
            value={card_play.card.value}
            suit={card_play.card.suit}
            handleCardClick={()=>{}}
            visible={true}
            onBoard={true}
          />
        </div>
      );
    });
    return (
      <div className="cards-on-board-container">
        {cards_list}
      </div>
    )
  }
};
