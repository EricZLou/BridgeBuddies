import React from 'react'

import '../css/CurrentGameStats.css'


export default class CurrentGameStats extends React.Component {
  render() {
    return (
      <div className="current-game-stats">
        {`NS: ${this.props.tricks_won.NS}, EW: ${this.props.tricks_won.EW}, `}
        {`Contract: ${this.props.contract.level}${this.props.contract.suit} by ${this.props.contract.declarer}`}
      </div>
    )
  }
};
