import React from 'react'
import {connect} from 'react-redux'

import Firebase from '../Firebase'
import GameScreen from './GameScreen'
import LoadingScreen from './LoadingScreen'
import {finishBidding, newGame} from '../redux/actions/Core'

import '../css/Style.css'

import {GAMETYPES, SEATS} from '../constants/GameEngine'


class GameScreenDaily extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
  }

  beginDailyChallenge(date_str, hands, contract) {
    return function(dispatch, getState) {
      return Promise.resolve(dispatch(newGame({
        game_type: GAMETYPES.DAILY,
        me: SEATS.SOUTH,
        player_names: {
          [SEATS.NORTH]: "Robot",
          [SEATS.EAST]: "Robot",
          [SEATS.SOUTH]: getState().userDetails.first_name,
          [SEATS.WEST]: "Robot",
        },
        hands: hands,
        date_str: date_str,
      })))
      .then(() => {
        Promise.resolve(dispatch(finishBidding(contract)));
      });
    }
  }

  componentDidMount() {
    Firebase.database().ref(`daily_challenges/${this.props.date_str}`).once('value')
    .then((snapshot) => {
      this.props.dispatch(this.beginDailyChallenge(
        this.props.date_str, snapshot.val().hands, snapshot.val().contract)
      ).then(() => this.setState({ready: true}));
    });
  }

  render() {
    if (!this.state.ready) return <LoadingScreen/>;
    return (
      <GameScreen/>
    );
  }
};

export default connect()(GameScreenDaily);
