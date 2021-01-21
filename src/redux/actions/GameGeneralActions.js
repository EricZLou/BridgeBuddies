export const NEW_GAME = 'NEW_GAME';
export const RESET_GAME_REDUX = 'RESET_GAME_REDUX';
export const SET_GAME_INFO = 'SET_GAME_INFO';
export const SET_HAND = 'SET_HAND';
export const SET_ONLINE_ROBOTS = 'SET_ONLINE_ROBOTS';
export const START_ONLINE_GAME_OVER_TIMER = 'START_ONLINE_GAME_OVER_TIMER';

export const newGame = (hands) => ({
  type: NEW_GAME,
  hands,
})

export const resetGameRedux = () => ({
  type: RESET_GAME_REDUX,
})

export const setGameInfo = ({game_type, me, player_names}) => ({
  type: SET_GAME_INFO,
  game_type,
  me,
  player_names,
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
