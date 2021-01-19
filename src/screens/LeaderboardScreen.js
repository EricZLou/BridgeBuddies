import React from 'react'

import Firebase from '../Firebase'

import '../css/Style.css'
import '../css/LeaderboardScreen.css'


export default class LeaderboardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      games_played_lb: [],
      total_exp_lb: [],
    };
  }

  componentDidMount() {
    const leaderboards_path = '/leaderboards/';
    const games_played_path = leaderboards_path + 'games_played/';
    const total_exp_path = leaderboards_path + 'total_exp/';

    let ref = Firebase.database().ref(games_played_path).orderByChild('score');
    ref.once('value', (snapshot) => {
      let promises = [];
      for (let key in snapshot.val()) {
        const data = snapshot.val()[key];
        const promise = Firebase.database().ref(`/users/${data.user}/details/username`).once('value')
        .then((username_db) => {return username_db.val()})
        .then((username) => {
           return <div key={key}>{`${username}: ${data.score}`}</div>;
        })
        promises.push(promise);
      }
      Promise.all(promises).then((values) => {
        this.setState({ready: true, games_played_lb: values});
      });
    });

    ref = Firebase.database().ref(total_exp_path).orderByChild('score');
    ref.once('value', (snapshot) => {
      let promises = [];
      for (let key in snapshot.val()) {
        const data = snapshot.val()[key];
        const promise = Firebase.database().ref(`/users/${data.user}/details/username`).once('value')
        .then((username_db) => {return username_db.val()})
        .then((username) => {
           return <div key={key}>{`${username}: ${data.score}`}</div>;
        })
        promises.push(promise);
      }
      Promise.all(promises).then((values) => {
        this.setState({total_exp_lb: values});
      });
    });
  }

  render() {
    return (
      <div className="leaderboards-container">
        {!this.state.ready && "LOADING..."}
        {this.state.ready &&
          <div>
            <button className="leaderboard-button">Total Exp</button>
            <button className="leaderboard-button">Games Played</button>
            <div>
              {this.state.total_exp_lb}
            </div>
            <div>
              {this.state.games_played_lb}
            </div>
          </div>
        }
      </div>
    );
  }
};
