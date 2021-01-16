import React from 'react'

import '../css/Style.css'
import '../css/Card.css'

import card_back_red from '../media/store/cardbacks/Red.png'


export default class Card extends React.Component {
  render() {
    if (!this.props.visible) {
      return (
        <div className={`card ${this.props.size}`}>
          <img src={card_back_red} alt="Card."/>
        </div>
      )
    }

    const card_img = require('../media/cards/'+this.props.value.toString()+this.props.suit+'.png');

    const card = {value: this.props.value, suit: this.props.suit};
    if (this.props.hoverable) {
      return (
        <div className={`card-hoverable ${this.props.size}`}
             onClick={this.props.handleCardPlay.bind(this, card)
        }>
          <img src={card_img} alt="Card."/>
        </div>
      );
    }

    if (this.props.onBoard) {
      return (
        <div className={`card-on-board ${this.props.size}`}>
          <img src={card_img} alt="Card."/>
        </div>
      );
    }

    return (
      <div className={`card ${this.props.size}`}>
        <img src={card_img} alt="Card."/>
      </div>
    );
  }
};
