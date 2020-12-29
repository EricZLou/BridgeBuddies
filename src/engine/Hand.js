import React from 'react'

import Card from './Card'

import '../css/Hand.css'


export default class Hand extends React.Component {
  render() {
    const card_spacing = getComputedStyle(document.documentElement)
      .getPropertyValue('--card-spacing');
    let cards_list = [];
    if (this.props.cards) {
      cards_list = this.props.cards.map((card, idx) => {
        return (
          <div className="hand" style={{left: parseInt(card_spacing)*idx}} key={idx}>
            <Card
              value={card.value}
              suit={card.suit}
              handleCardPlay={this.props.handleCardPlay.bind(this)}
              visible={this.props.visible}
              hoverable={this.props.clickable}
            />
          </div>
        );
      });
    } else {
      for (let idx = 0; idx < 13; idx++) {
        cards_list.push(
          <div className="hand" style={{left: parseInt(card_spacing)*idx}} key={idx}>
            <Card visible={false}/>
          </div>
        )
      }
    }
    return (
      <div style={{position: 'absolute'}}>
        {cards_list}
      </div>
    )
  }
};
