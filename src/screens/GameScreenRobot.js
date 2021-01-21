import React from 'react'
import {connect} from 'react-redux'

import GameScreen from './GameScreen'
import {Deck} from '../engine/Deck'
import {newGame, setGameInfo} from '../redux/actions/Core'

import '../css/Style.css'

import {ALL_SEATS, GAMETYPES, SEATS} from '../constants/GameEngine'


class GameScreenRobots extends React.Component {
  componentDidMount() {
    this.offlinePlayAgain();
  }

  offlinePlayAgain() {
    const me = ALL_SEATS[Math.floor(Math.random() * 4)];
    this.props.dispatch(setGameInfo({
      game_type: GAMETYPES.OFFLINE,
      me: me,
      player_names: {
        [SEATS.NORTH]: "Robot",
        [SEATS.EAST]: "Robot",
        [SEATS.SOUTH]: "Robot",
        [SEATS.WEST]: "Robot",
        [me]: `${this.props.first_name}`,
      },
    }));
    this.deck = new Deck();
    this.props.dispatch(newGame(this.deck.generateHands()));
  }

  render() {
    return (
      <GameScreen
        offlinePlayAgain={this.offlinePlayAgain.bind(this)}
      />
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    first_name: state.userDetails.first_name,
  }
}
export default connect(mapStateToProps)(GameScreenRobots);
