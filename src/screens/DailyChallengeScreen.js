import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {Firebase} from '../Firebase'
import {setDailyChallengeStatuses} from '../redux/actions/Core'

import '../css/Style.css'
import '../css/DailyChallengeScreen.css'

import {GAMETYPES} from '../constants/GameEngine'


class DailyChallengeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      divs: null,
    };
  }

  createRow(date_str, status) {
    let phrase = "";
    return (
      <div className="daily-challenge-item" key={date_str}>
        <div className={`daily-challenge-medal ${status}`}/>
        <div className="daily-challenge-date-str">{date_str}</div>
        <div className="daily-challenge-phrase">{phrase}</div>
        <Link
          to={{
            pathname: "/game",
            state: {type: GAMETYPES.DAILY, date_str: date_str},
          }}
          className="no-underline daily-challenge-button"
        >
          <div>PLAY</div>
        </Link>
      </div>
    );
  }

  componentDidMount() {
    let promises = [];
    let daily_map = {};
    let divs = [];
    const today = new Date();
    // Show last 7 days of daily challenges
    for (let i = 0; i < 7; i++) {
      let date = new Date(today);
      date.setDate(date.getDate() - i);
      let date_str = ('0' + (date.getMonth()+1)).slice(-2) + '-'
               + ('0' + date.getDate()).slice(-2);
      promises.push(
        Firebase.database().ref(
          `/daily_challenges/history/${date_str}/${this.props.userID}`
        ).once('value')
        .then((snapshot) => {
          daily_map[date_str] = snapshot.val();
          divs.push(
            this.createRow(date_str, snapshot.val())
          );
        })
      );
    }
    Promise.all(promises).then(() => {
      this.props.dispatch(setDailyChallengeStatuses(daily_map));
      this.setState({divs: divs});
    });
  }

  render() {
    return (
      <div className="daily-challenge-container">
        <div className="daily-challenge-motto">
          Try to complete the contract given to you!
        </div>
        {!this.state.divs && <div className="daily-challenge-loading">
          LOADING...
        </div>}
        {this.state.divs}
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    userID: state.userID,
  }
}
export default connect(mapStateToProps)(DailyChallengeScreen);
