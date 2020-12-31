import React from 'react'

import '../css/ScoreSubScreen.css'

import {SEATS} from '../constants/GameEngine'


export default class ScoreSubScreen extends React.Component {
  render() {
    const score = (this.me === SEATS.NORTH || this.me === SEATS.SOUTH) ? this.props.tricks_won.NS : this.props.tricks_won.EW;
    return (
      <div className="score-container">
        <div className="score-text">
          {`Congratulations! You won ${score} tricks.`}
        </div>
        <button className="play-again-button" onClick={this.props.resetGame}>
          PLAY AGAIN
        </button>
      </div>
    )
  }
};
