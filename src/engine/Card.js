import React from 'react'

import '../css/Style.css'
import '../css/Card.css'

import card_back_red from '../media/store/cardbacks/Red.png'

export default class Card extends React.Component {
  render() {
    const card_img = require('../media/cards/'+this.props.value.toString()+this.props.suit+'.png');
    return (
      <div
        className={this.props.hoverable ? "card-hoverable" : (this.props.onBoard ? "card-on-board" : "card")}
        onClick={this.props.handleCardClick.bind(this, {value: this.props.value, suit: this.props.suit})}
      >
        <img src={(this.props.visible ? card_img : card_back_red)} alt="Card."/>
      </div>
    );
  }
};
