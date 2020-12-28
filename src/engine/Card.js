import React from 'react'

import '../css/Style.css'
import '../css/Card.css'

import card_back_red from '../media/store/cardbacks/Red.png'


export default class Card extends React.Component {
  render() {
    if (!this.props.visible) {
      return (
        <div className="card">
          <img src={card_back_red} alt="Card."/>
        </div>
      )
    }

    const card_img = require('../media/cards/'+this.props.value.toString()+this.props.suit+'.png');
    const card = {value: this.props.value, suit: this.props.suit};

    let card_class;
    if (this.props.hoverable) card_class = "card-hoverable";
    else if (this.props.onBoard) card_class = "card-on-board";
    else card_class = "card";

    return (
      <div
        className={card_class}
        onClick={this.props.handleCardPlay.bind(this, card)}
      >
        <img src={card_img} alt="Card."/>
      </div>
    );
  }
};
