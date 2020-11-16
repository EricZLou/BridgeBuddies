import React from 'react';

import '../css/Style.css';
import '../css/Card.css';

export default class Card extends React.Component {
  render() {
    const card_img = require(
      '../media/cards/'+this.props.value.toString()+this.props.suit+'.png'
    );
    return (
      <div
        className={this.props.hoverable ? "card-hoverable" : "card"}
        onClick={this.props.handleCardClick.bind(this, {value: this.props.value, suit: this.props.suit})}
      >
        <img src={card_img} alt="Card."/>
      </div>
    );
  }
};
