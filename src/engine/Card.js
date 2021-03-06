import React from 'react'

import '../css/Style.css'
import '../css/Card.css'


export default class Card extends React.Component {
  render() {
    this.store = require('../constants/Store').STORE;
    const card_style = {
      height: this.props.card_height,
      width: this.props.card_width,
    }
    const card_on_board_style = {
      height: 1.1 * this.props.card_height,
      width: 1.1 * this.props.card_width,
    }

    if (!this.props.visible) {
      return (
        <div style={card_style}>
          <img src={require(`../media/store/cardbacks/${this.store.cardbacks[this.props.card_back].file}`)} alt="Card."/>
        </div>
      )
    }

    const card_img = require('../media/cards/'+this.props.value.toString()+this.props.suit+'.png');

    const card = {value: this.props.value, suit: this.props.suit};
    if (this.props.hoverable) {
      return (
        <div className={"card-hoverable"}
             style={card_style}
             onClick={this.props.handleCardPlay.bind(this, card)
        }>
          <img src={card_img} alt="Card."/>
        </div>
      );
    }

    if (this.props.onBoard) {
      return (
        <div style={card_on_board_style}>
          <img src={card_img} alt="Card."/>
        </div>
      );
    }

    return (
      <div style={card_style}>
        <img src={card_img} alt="Card."/>
      </div>
    );
  }
};
