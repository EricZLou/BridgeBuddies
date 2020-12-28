import React from 'react'

import Hand from '../Hand'
import PlayerTitle from './PlayerTitle'

import '../../css/Player.css'


export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.seat = this.props.seat;
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <div>
        <Hand
          cards={this.props.cards}
          seat={this.props.seat}
          handleHandClick={this.props.handlePlayerClick}
          visible={this.props.visible}
          clickable={this.props.clickable}
        />
        <div className="player-title">
          <PlayerTitle
            seat={this.seat}
            is_my_turn={this.props.is_my_turn}
            name={this.props.name}
          />
        </div>
      </div>
    )
  }
};
