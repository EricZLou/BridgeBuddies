import React from 'react'

import '../css/ScoreSubScreen.css'


export default class ScoreSubScreen extends React.Component {
  render() {
    return (
      <div className="score-container">
        <div className="score-text">
          {`Congratulations! You won ${this.props.score} tricks.`}
        </div>
        <button className="play-again-button" onClick={this.props.resetGame}>
          PLAY AGAIN
        </button>
      </div>
    )
  }
};
