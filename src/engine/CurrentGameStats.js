import React from 'react'

import '../css/CurrentGameStats.css'


export default class CurrentGameStats extends React.Component {
  render() {
    let dbl = '';
    if (this.props.contract.doubled) dbl = 'X';
    else if (this.props.contract.redoubled) dbl = 'XX';

    return (
      <div className="current-game-stats">
        <div className="item">
          GAME INFO
        </div>
        <hr className="item hr-black"/>
        <div className="item">
          {`${this.props.contract.level}${this.props.contract.suit}${dbl} by ${this.props.contract.declarer}`}
        </div>
        <div className="item split">
          <div>{`NS: ${this.props.tricks_won.NS}`}</div>
          <div>{`EW: ${this.props.tricks_won.EW}`}</div>
        </div>
      </div>
    )
  }
};
