import React from 'react';

import '../css/Style.css';
import '../css/Card.css';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.suit = this.props.suit;
    this.value = this.props.value;
  }
  render() {
    const card_img = require('../media/cards/'+this.value.toString()+this.suit+'.png');
    return (
      <div className="card" onClick={this.props.handleCardClick.bind(this, this.suit, this.value)}>
        <img src={card_img} alt="Card."/>
      </div>
    );
  }
};
