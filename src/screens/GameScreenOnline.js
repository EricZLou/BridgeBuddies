import React from 'react';
import {connect} from 'react-redux'

import GameScreen from './GameScreen'
import LoadingScreen from './LoadingScreen'
import {
  isBiddingComplete
} from '../engine/managers/BridgeGameEngine'
import {
  finishPlaying, makeBid, newGame, playCard, setHand,
  setGameTypeOrMe, setOnlineRobots, startOnlineGameOverTimer,
} from '../redux/actions/Core'
import {sortHand} from '../engine/Deck'

import '../css/Style.css'

import {GAMESTATES, GAMETYPES, SEATS} from '../constants/GameEngine'


class GameScreenOnline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game_info: null,
      num_users: 0,
      ready: false,
      room: "",
    };
    this.cleanup = this.cleanup.bind(this);
  }

  cleanup() {
    // waiting for game to be dispatched
    this.props.mySocket.off("room stat");

    // initial game setup
    this.props.mySocket.off("game data");
    this.props.mySocket.off("start game");

    // in-game play
    this.props.mySocket.off("bid click");
    this.props.mySocket.off("dummy hand");
    this.props.mySocket.off("card click");

    // game over
    this.props.mySocket.off("game over");

    this.props.mySocket.emit("leave online game");
  }

  componentDidMount() {
    this.props.dispatch(setGameTypeOrMe({game_type: GAMETYPES.ONLINE}));

    // clean up in case user reloads page
    window.addEventListener("beforeunload", this.cleanup);

    // waiting for game to be dispatched
    this.props.mySocket.on("room stat", (room, num_users) => {
      this.setState({
        room: room,
        num_users: num_users,
      });
    });

    // initial game setup
    this.props.mySocket.on("game data", (game_info) => {
      this.props.dispatch(setGameTypeOrMe({me: game_info.me}));
      this.setState({
        game_info: game_info,
      });
      let other_hands = [];
      for (let i = 1; i <= 13; i++) {
        other_hands.push({});
      }
      const all_hands = {
        [SEATS.NORTH]: [...other_hands],
        [SEATS.EAST]: [...other_hands],
        [SEATS.SOUTH]: [...other_hands],
        [SEATS.WEST]: [...other_hands],
        [game_info.me]: game_info.cards,
      };
      this.props.dispatch(newGame(all_hands));
    });
    this.props.mySocket.on("start game", () => {
      this.setState({
        ready: true,
      });
    });

    // in-game play
    this.props.mySocket.on("bid click", (bid, seat) => {
      if (bid.level)
        console.log(`[GAME PLAY] ${seat} bids ${bid.level}${bid.suit}`);
      else
        console.log(`[GAME PLAY] ${seat} bids ${bid.type}`);
      this.props.dispatch(makeBid({bid: bid, seat: seat}));
      if (isBiddingComplete(this.props.bid_history) && this.state.game_info.me === this.props.dummy) {
        const sorted_hand = sortHand(this.state.game_info.cards, this.props.contract.suit);
        this.props.mySocket.emit("dummy hand", sorted_hand);
      }
    });
    this.props.mySocket.on("dummy hand", (cards) => {
      this.props.dispatch(setHand({seat: this.props.dummy, cards: cards}));
    });
    this.props.mySocket.on("card click", (card, seat) => {
      console.log(`[GAME PLAY] ${seat} plays ${card.value}${card.suit}`);
      this.props.dispatch(playCard({card: card, seat: seat}));
    });

    // game over
    this.props.mySocket.on("game over", () => {
      if (this.props.game_state !== GAMESTATES.RESULTS)
        this.props.dispatch(finishPlaying());
      this.props.dispatch(startOnlineGameOverTimer());
    });

    // in case someone else leaves and I get a robot hand to play
    this.props.mySocket.on("robot cards", (robot_data) => {
      this.props.dispatch(setOnlineRobots(robot_data));
    });
  }

  componentWillUnmount() {
    this.cleanup();
    window.removeEventListener("beforeunload", this.cleanup);
  }

  render() {
    if (!this.state.ready) return (
      <LoadingScreen
        text={
          `Waiting for 4 players... ` +
          `There are ${this.state.num_users} players in ${this.state.room}.`
        }
        return={"/tables"}
      />
    );
    return (
      <GameScreen
        me={this.state.game_info.me}
        players={{
          [SEATS.NORTH]: this.state.game_info[SEATS.NORTH],
          [SEATS.EAST]: this.state.game_info[SEATS.EAST],
          [SEATS.SOUTH]: this.state.game_info[SEATS.SOUTH],
          [SEATS.WEST]: this.state.game_info[SEATS.WEST],
        }}
      />
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    bid_history: state.bid_history,
    contract: state.contract,
    dummy: state.dummy,
    first_name: state.userDetails.first_name,
    game_state: state.game_state,
    mySocket: state.mySocket,
  }
}
export default connect(mapStateToProps)(GameScreenOnline);
