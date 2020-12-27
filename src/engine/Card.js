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
    return (
      <div
        className={this.props.hoverable ? "card-hoverable" : (this.props.onBoard ? "card-on-board" : "card")}
        onClick={this.props.handleCardClick.bind(this, {value: this.props.value, suit: this.props.suit})}
      >
        <img src={card_img} alt="Card."/>
      </div>
    );
  }
};
