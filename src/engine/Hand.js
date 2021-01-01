import React from 'react'

import Card from './Card'

import '../css/Hand.css'


export default class Hand extends React.Component {
  render() {
    if (!this.props.cards)
      return (<div/>);

    const card_spacing = getComputedStyle(document.documentElement)
      .getPropertyValue('--card-spacing');
    const cards_list = this.props.cards.map((card, idx) => {
      return (
        <div className="hand" style={{left: parseInt(card_spacing)*idx}} key={idx}>
          {Object.keys(card).length === 0 && <Card visible={false}/>}
          {Object.keys(card).length !== 0 && <Card
            value={card.value}
            suit={card.suit}
            handleCardPlay={this.props.handleCardPlay.bind(this)}
            visible={this.props.visible}
            hoverable={this.props.clickable}
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
