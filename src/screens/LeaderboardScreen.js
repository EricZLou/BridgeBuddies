import React from 'react'

import {Firebase} from '../Firebase'

import '../css/Style.css'
import '../css/LeaderboardScreen.css'


const LB = {
  GAMES_PLAYED: 'GAMES_PLAYED',
  TOTAL_EXP: 'TOTAL_EXP',
}

export default class LeaderboardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: LB.TOTAL_EXP,
      games_played_lb: [],
      total_exp_lb: [],
    };
  }

  createRow(username, score, rank, img, units) {
    return (
      <div className="leaderboard-row" key={rank}>
        <div className="leaderboard-rank">{rank}</div>
        <div className="leaderboard-image">{img}</div>
        <div className="leaderboard-units">{units}</div>
        <div className="leaderboard-score">{score}</div>
        <div className="leaderboard-username">{username}</div>
      </div>
    );
  }

  componentDidMount() {
    const leaderboards_path = '/leaderboards/';
    const games_played_path = leaderboards_path + 'games_played/';
    const total_exp_path = leaderboards_path + 'total_exp/';

    let ref = Firebase.database().ref(games_played_path).orderByChild('score');
    ref.once('value', (snapshot) => {
      let promises = [];
      snapshot.forEach((data) => {
        data = data.val();
        const promise = Firebase.database().ref(`/users/${data.user}/details/username`).once('value')
        .then((username_db) => {return {username: username_db.val(), score: data.score};});
        promises.push(promise);
      });
      Promise.all(promises).then((values) => {
        let rows = [];
        for (let i = 2; i >= 0; i--) {
          rows.push(this.createRow(values[i].username, values[i].score, 3-i, "img", "games"));
        }
        this.setState({games_played_lb: rows});
      });
    });

    ref = Firebase.database().ref(total_exp_path).orderByChild('score');
    ref.once('value', (snapshot) => {
      let promises = [];
      snapshot.forEach((data) => {
        data = data.val();
        const promise = Firebase.database().ref(`/users/${data.user}/details/username`).once('value')
        .then((username_db) => {return {username: username_db.val(), score: data.score};});
        promises.push(promise);
      });
      Promise.all(promises).then((values) => {
        let rows = [];
        for (let i = 2; i >= 0; i--) {
          rows.push(this.createRow(values[i].username, values[i].score, 3-i, "img", "exp"));
        }
        this.setState({total_exp_lb: rows});
      });
    });
  }

  render() {
    return (
      <div className="leaderboard-container">
        {this.state.games_played_lb && this.state.total_exp_lb &&
          <div>
            <div className="leaderboard-buttons">
              <label className="leaderboard-radio first">Total Exp
                <input type="radio"
                       checked={this.state.view === LB.TOTAL_EXP}
                       name="radio"
                       onChange={() => {this.setState({view: LB.TOTAL_EXP})}}
                />
                <div className="checkmark"/>
              </label>
              <label className="leaderboard-radio">Games Played
                <input type="radio"
                       checked={this.state.view === LB.GAMES_PLAYED}
                       name="radio"
                       onChange={() => {this.setState({view: LB.GAMES_PLAYED})}}
                />
                <div className="checkmark"/>
              </label>
            </div>
            {this.state.view === LB.TOTAL_EXP &&
              this.state.total_exp_lb
            }
            {this.state.view === LB.GAMES_PLAYED &&
              this.state.games_played_lb
            }
          </div>
        }
      </div>
    );
  }
};
