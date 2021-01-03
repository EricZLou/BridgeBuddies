import React from 'react'
import {connect} from 'react-redux'

import {Deck} from '../engine/Deck'
import {newGame} from '../redux/actions/Core'

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
    const score = (this.props.me === SEATS.NORTH || this.props.me === SEATS.SOUTH) ?
      this.props.tricks_won.NS : this.props.tricks_won.EW;
    return (
      <div className="score-container">
        <div className="score-text">
          {`Congratulations! You won ${score} tricks.`}
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
