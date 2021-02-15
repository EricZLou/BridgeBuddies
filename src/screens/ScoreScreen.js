import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Firebase from '../Firebase'

import {newOfflineGame, resetGameRedux} from '../redux/actions/Core'
import {getScore} from '../engine/managers/BridgeGameEngine'

import '../css/ScoreScreen.css'

import {
  getCoinsFromScore, getExpFromScore,
} from '../constants/CoinsAndExp'
import {DAILY_STATUSES} from '../constants/DailyChallenge'
import {GAMETYPES, SEATS} from '../constants/GameEngine'


class ScoreScreen extends React.Component {
  constructor(props) {
    super(props);
    const declarer_NS = (
      this.props.contract.declarer === SEATS.NORTH || this.props.contract.declarer === SEATS.SOUTH
    );
    const declarer_tricks = declarer_NS ? this.props.tricks_won.NS : this.props.tricks_won.EW;
    const score_and_score_type = getScore({
      contract: this.props.contract,
      tricks: declarer_tricks,
      seat: this.props.me,
    });
    const score = score_and_score_type.score;
    const score_type = score_and_score_type.score_type;
    const coins = getCoinsFromScore(score, score_type);
    const exp = getExpFromScore(score, score_type);

    // FOR ALL GAME TYPES
    Firebase.database().ref(this.props.userStatsPath).update({
      coins: this.props.coins + coins,
      exp: this.props.exp + exp,
      games_played: this.props.games_played + 1,
      total_exp: this.props.total_exp + exp,
    });

    const win_text = "Yay! Good play!";
    const lose_text = "Keep practicing, you can do it!";
    const pass_text = "Everyone passed.";
    const daily_win_text = "Yay! You beat the challenge!";
    const daily_lose_text = "Oh no! You almost beat the challenge!";
    let score_text;
    if (this.props.game_type === GAMETYPES.DAILY) {
      score_text = (score > 0 ? daily_win_text : daily_lose_text);
      const status = this.props.daily_challenge_statuses[this.props.date_str];
      let final_status;
      if (score > 0) {
        final_status = DAILY_STATUSES.GOLD;
      } else if (score >= -100) {
        final_status = DAILY_STATUSES.SILVER;
        if (status === DAILY_STATUSES.GOLD)
          final_status = status;
      } else {
        final_status = DAILY_STATUSES.BRONZE;
        if (status === DAILY_STATUSES.GOLD || status === DAILY_STATUSES.SILVER)
          final_status = status;
      }
      if (status !== final_status) {
        Firebase.database().ref(
          `/daily_challenges/history/${this.props.date_str}/${this.props.userID}`
        ).set(final_status);
      }
    }
    else {
      if (score > 0) score_text = win_text;
      else if (score < 0) score_text = lose_text;
      else score_text = pass_text;
    }

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
    // ONLINE COMPONENT
    if (this.props.timer) {
      this.setState({time_left: 15});
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  componentDidUpdate() {
    // ONLINE COMPONENT
    if (this.props.timer && this.state.time_left === "") {
      this.setState({time_left: 15});
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  componentWillUnmount() {
    // ONLINE COMPONENT
    clearInterval(this.timer);
  }

  // ONLINE COMPONENT
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
          {this.props.game_type !== GAMETYPES.DAILY &&
            <div className="info">
              <div className="key">Contract:</div>
              <div className="value">{this.state.contract_text}</div>
            </div>
          }
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
          this.props.game_type === GAMETYPES.OFFLINE &&
          <div className="game-action clickable-button"
                  onClick={() => {this.props.dispatch(newOfflineGame())}}>
            PLAY AGAIN
          </div>
        }
        {
          this.props.game_type === GAMETYPES.ONLINE && this.props.timer &&
          <div className="game-action online-timer">
            {`NEW GAME IN ${this.state.time_left}`}
          </div>
        }
        {
          this.props.game_type === GAMETYPES.DAILY &&
          <Link to="/" className="game-action clickable-button no-underline">
            <div className="home-text">
              HOME
            </div>
          </Link>
        }
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    coins: state.coins,
    contract: state.game_results.contract,
    daily_challenge_statuses: state.daily_challenge_statuses,
    date_str: state.daily_challenge_date_str,
    exp: state.exp,
    first_name: state.userDetails.first_name,
    games_played: state.games_played,
    level_idx: state.level_idx,
    me: state.game_info.me,
    game_type: state.game_info.game_type,
    timer: state.online_game_over_timer,
    total_exp: state.total_exp,
    tricks_won: state.game_results.tricks_won,
    userID: state.userID,
    userStatsPath: state.firebasePaths.stats,
  }
}
export default connect(mapStateToProps)(ScoreScreen);
