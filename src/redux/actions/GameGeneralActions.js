import {NEW_GAME_AUDIO} from '../../constants/Audio'
import {ALL_SEATS, GAMETYPES, SEATS} from '../../constants/GameEngine'
import {Deck} from '../../engine/Deck'


export const NEW_GAME = 'NEW_GAME';
export const RESET_GAME_REDUX = 'RESET_GAME_REDUX';
export const SET_HAND = 'SET_HAND';
export const SET_ONLINE_ROBOTS = 'SET_ONLINE_ROBOTS';
export const START_ONLINE_GAME_OVER_TIMER = 'START_ONLINE_GAME_OVER_TIMER';

export const newGame = ({game_type, me, player_names, hands, date_str=""}) => {
  NEW_GAME_AUDIO.play().then(() => {}).catch((error) => {console.log(error)});
  return {
    type: NEW_GAME,
    game_type,
    me,
    player_names,
    hands,
    date_str,
  }
}

export const resetGameRedux = () => ({
  type: RESET_GAME_REDUX,
})

export const setHand = ({seat, cards}) => ({
  type: SET_HAND,
  seat,
  cards,
});

export const setOnlineRobots = (robot_data) => ({
  type: SET_ONLINE_ROBOTS,
  robot_data,
});

export const startOnlineGameOverTimer = () => ({
  type: START_ONLINE_GAME_OVER_TIMER,
})

export const newOfflineGame = () => {
  return function(dispatch, getState) {
    const me = ALL_SEATS[Math.floor(Math.random() * 4)];
    dispatch(newGame({
      game_type: GAMETYPES.OFFLINE,
      me: me,
      player_names: {
        [SEATS.NORTH]: "Robot",
        [SEATS.EAST]: "Robot",
        [SEATS.SOUTH]: "Robot",
        [SEATS.WEST]: "Robot",
        [me]: getState().userDetails.first_name,
      },
      hands: (new Deck()).generateHands(),
    }));
  }
}
