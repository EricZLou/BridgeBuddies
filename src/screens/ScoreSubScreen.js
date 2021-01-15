import React from 'react'
import {connect} from 'react-redux'

import {Deck} from '../engine/Deck'
import {newGame} from '../redux/actions/Core'
import {getScore} from '../engine/managers/BridgeGameEngine'

import '../css/ScoreSubScreen.css'

import {SEATS} from '../constants/GameEngine'


class ScoreSubScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time_left: "",
    }
    this.countDown = this.countDown.bind(this);
    this.offlinePlayAgain = this.offlinePlayAgain.bind(this);
  }

  componentDidMount() {
    if (this.props.timer) {
      this.setState({time_left: 15});
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  componentDidUpdate() {
    if (this.props.timer && this.state.time_left === "") {
      this.setState({time_left: 15});
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  countDown() {
    const tl = this.state.time_left;
    this.setState({time_left: tl - 1});
    if (tl === 0) clearInterval(this.timer);
  }

  offlinePlayAgain() {
    this.deck = new Deck();
    this.props.dispatch(newGame(this.deck.generateHands()));
  }

  render() {
    const tricks = (this.props.me === SEATS.NORTH || this.props.me === SEATS.SOUTH) ?
      this.props.tricks_won.NS : this.props.tricks_won.EW;
    const score = getScore({contract: this.props.contract, tricks: tricks});

    const win_text = "Yay! Good play!";
    const lose_text = "Keep practicing, you can do it!"
    const pass_text = "Everyone passed."
    let score_text;
    if (score > 0) score_text = win_text;
    else if (score < 0) score_text = lose_text;
    else score_text = pass_text;

    let dbl = '';
    if (this.props.contract.doubled) dbl = 'X';
    else if (this.props.contract.redoubled) dbl = 'XX';

    return (
      <div className="score-container">
        <div className="score-text">
          <div className="phrase">
            {score_text}
          </div>
          <div className="info">
            <div className="key">Contract:</div>
            <div className="value">{`${this.props.contract.level}${this.props.contract.suit}${dbl} by ${this.props.contract.declarer}`}</div>
          </div>
          <div className="info">
            <div className="key">NS-tricks:</div>
            <div className="value">{this.props.tricks_won.NS}</div>
          </div>
          <div className="info">
            <div className="key">EW-tricks:</div>
            <div className="value">{this.props.tricks_won.EW}</div>
          </div>
          <div className="score">
            {`Your score: ${score}`}
          </div>
          <div className="earnings">
            <div className="earning">
              Coins earned: 30
            </div>
            <div className="earning">
              Exp earned: 132
            </div>
          </div>
        </div>
        {
          !this.props.online &&
          <button className="game-action offline-button" onClick={this.offlinePlayAgain}>
            PLAY AGAIN
          </button>
        }
        {
          this.props.online && this.props.timer &&
          <div className="game-action online-timer">
            {`NEW GAME IN ${this.state.time_left}`}
          </div>
        }
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    timer: state.online_game_over_timer,
  }
}
export default connect(mapStateToProps)(ScoreSubScreen);
