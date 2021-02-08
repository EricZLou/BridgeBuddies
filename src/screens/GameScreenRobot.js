import React from 'react'
import {connect} from 'react-redux'

import GameScreen from './GameScreen'
import {newOfflineGame} from '../redux/actions/Core'

import '../css/Style.css'


class GameScreenRobots extends React.Component {
  componentDidMount() {
    this.props.dispatch(newOfflineGame());
  }

  render() {
    return (
      <GameScreen/>
    );
  }
};

export default connect()(GameScreenRobots);
