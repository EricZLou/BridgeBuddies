import React from 'react'

import Card from './Card'

import '../css/Hand.css'

import {SCREENSIZES} from '../constants/Screen'


export default class Hand extends React.Component {
  render() {
    if (!this.props.cards)
      return (<div/>);

    let card_spacing_css;
    switch (this.props.size) {
      case SCREENSIZES.SMALL:
        card_spacing_css = '--small-card-spacing';
        break;
      case SCREENSIZES.MEDIUM:
        card_spacing_css = '--medium-card-spacing';
        break;
      case SCREENSIZES.LARGE:
        card_spacing_css = '--large-card-spacing';
        break;
      default:
        throw Error("invalid size");
    }

    const card_spacing = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue(card_spacing_css));

    const cards_list = this.props.cards.map((card, idx) => {
      return (
        <div className="hand" style={{left: card_spacing*idx}} key={idx}>
          {Object.keys(card).length === 0 && <Card
            visible={false}
            size={this.props.size}
          />}
          {Object.keys(card).length !== 0 && <Card
            value={card.value}
            suit={card.suit}
            handleCardPlay={this.props.handleCardPlay.bind(this)}
            visible={this.props.visible}
            hoverable={this.props.clickable}
            size={this.props.size}
          />}
        </div>
      );
    });
    return (
      <div style={{position: 'absolute'}}>
        {cards_list}
      </div>
    )
  }
};
