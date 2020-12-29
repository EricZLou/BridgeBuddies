import React from 'react';
import {connect} from 'react-redux'

import GameScreen from './GameScreen'
import LoadingScreen from './LoadingScreen'
import OnlineOpponent from '../engine/players/OnlineOpponent'
import OnlinePlayer from '../engine/players/OnlinePlayer'
import {setPlayerCards} from '../redux/actions/Core'

import '../css/Style.css'

import {SEATS} from '../constants/GameEngine'


class GameScreenOnline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game_info: null,
      ready: false,
    };
    this.cleanup = this.cleanup.bind(this);
  }

  cleanup() {
    this.props.mySocket.emit("leave online game");
  }

  componentDidMount() {
    // clean up in case user reloads page
    window.addEventListener("beforeunload", this.cleanup);

    // initial game setup
    this.props.mySocket.on("game data", (game_info) => {
      this.setState({
        game_info: game_info,
      });
      let other_player_cards = [];
      for (let i = 1; i <= 13; i++) {
        other_player_cards.push({});
      }
      const all_player_cards = {
        [SEATS.NORTH]: [...other_player_cards],
        [SEATS.EAST]: [...other_player_cards],
        [SEATS.SOUTH]: [...other_player_cards],
        [SEATS.WEST]: [...other_player_cards],
        [game_info.me]: game_info.cards,
      };
      this.props.dispatch(setPlayerCards({cards: all_player_cards}));
    });
    this.props.mySocket.on("start game", () => {
      this.setState({
        ready: true,
      });
    });

    // request a game
    this.props.mySocket.emit("online game request", this.props.first_name);
  }

  componentWillUnmount() {
    this.props.mySocket.emit("leave online game");
    window.removeEventListener("beforeunload", this.cleanup);
  }

  render() {
    if (!this.state.ready) return (<LoadingScreen text={"Waiting for 4 players..."}/>);
    return (
      <GameScreen
        me={this.state.game_info.me}
        players={{
          [SEATS.NORTH]: this.state.game_info[SEATS.NORTH],
          [SEATS.EAST]: this.state.game_info[SEATS.EAST],
          [SEATS.SOUTH]: this.state.game_info[SEATS.SOUTH],
          [SEATS.WEST]: this.state.game_info[SEATS.WEST],
        }}
        PlayerType = {OnlinePlayer}
        OpponentType = {OnlineOpponent}
      />
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    first_name: state.userDetails.first_name,
    mySocket: state.mySocket,
  }
}
export default connect(mapStateToProps)(GameScreenOnline);
