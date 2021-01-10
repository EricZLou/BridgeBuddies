import React from 'react'
import {connect} from 'react-redux'

import GameScreen from './GameScreen'
import {Deck} from '../engine/Deck'
import {newGame, setGameTypeOrMe} from '../redux/actions/Core'

import '../css/Style.css'

import {ALL_SEATS, GAMETYPES, SEATS} from '../constants/GameEngine'


class GameScreenRobots extends React.Component {
  constructor(props) {
    super(props);
    this.me = ALL_SEATS[Math.floor(Math.random() * 4)];
  }

  componentDidMount() {
    this.props.dispatch(setGameTypeOrMe({
      game_type: GAMETYPES.OFFLINE,
      me: this.me,
    }));
    this.deck = new Deck();
    this.props.dispatch(newGame(this.deck.generateHands()));
  }

  render() {
    return (
      <GameScreen
        me={this.me}
        players={{
          [SEATS.NORTH]: "Robot",
          [SEATS.EAST]: "Robot",
          [SEATS.SOUTH]: "Robot",
          [SEATS.WEST]: "Robot",
          [this.me]: `${this.props.first_name}`,
        }}
        online={false}
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
