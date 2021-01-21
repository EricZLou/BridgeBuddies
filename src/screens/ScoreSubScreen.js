import React from 'react'
import {connect} from 'react-redux'
import Firebase from '../Firebase'

import {resetGameRedux} from '../redux/actions/Core'
import {getScore} from '../engine/managers/BridgeGameEngine'

import '../css/ScoreSubScreen.css'

import {
  getCoinsFromScore, getExpFromScore,
} from '../constants/AfterGame'
import {GAMETYPES, SEATS} from '../constants/GameEngine'


class ScoreSubScreen extends React.Component {
  constructor(props) {
    super(props);
    const tricks = (this.props.me === SEATS.NORTH || this.props.me === SEATS.SOUTH) ?
      this.props.tricks_won.NS : this.props.tricks_won.EW;
    const score_and_score_type = getScore({contract: this.props.contract, tricks: tricks});
    const score = score_and_score_type.score;
    const score_type = score_and_score_type.score_type;
    const coins = getCoinsFromScore(score, score_type);
    const exp = getExpFromScore(score, score_type);

    Firebase.database().ref(this.props.userStatsPath).update({
      coins: this.props.coins + coins,
      exp: this.props.exp + exp,
      games_played: this.props.games_played + 1,
      total_exp: this.props.total_exp + exp,
    });

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

    const contract_text = (score === 0) ? "None" :
      `${this.props.contract.level}${this.props.contract.suit}${dbl} by ${this.props.contract.declarer}`;

    this.state = {
      time_left: "",
      score: score,
      coins: coins,
      exp: exp,
      score_text: score_text,
      contract_text: contract_text,
    };
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(resetGameRedux());
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

  render() {
    return (
      <div className="score-container">
        <div className="score-text">
          <div className="phrase">
            {this.state.score_text}
          </div>
          <div className="info">
            <div className="key">Contract:</div>
            <div className="value">{this.state.contract_text}</div>
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
            {`Your score: ${this.state.score}`}
          </div>
          <div className="earnings">
            <div className="earning">
              {`Coins earned: ${this.state.coins}`}
            </div>
            <div className="earning">
              {`Exp earned: ${this.state.exp}`}
            </div>
          </div>
        </div>
        {
          !this.props.online &&
          <button className="game-action offline-button" onClick={this.props.offlinePlayAgain}>
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
    coins: state.coins,
    contract: state.game_results.contract,
    exp: state.exp,
    games_played: state.games_played,
    level_idx: state.level_idx,
    online: state.game_info.game_type === GAMETYPES.ONLINE,
    timer: state.online_game_over_timer,
    total_exp: state.total_exp,
    tricks_won: state.game_results.tricks_won,
    userStatsPath: state.firebasePaths.stats,
  }
}
export default connect(mapStateToProps)(ScoreSubScreen);
