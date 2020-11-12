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
        className="card"
        onClick={this.props.handleCardClick.bind(this, this.props.suit, this.props.value)}
      >
        <img src={card_img} alt="Card."/>
      </div>
    );
  }
};
