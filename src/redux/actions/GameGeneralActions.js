export const NEW_GAME = 'NEW_GAME';
export const SET_GAME_TYPE_OR_ME = 'SET_GAME_TYPE_OR_ME';
export const SET_HAND = 'SET_HAND';
export const SET_ONLINE_ROBOTS = 'SET_ONLINE_ROBOTS';
export const START_ONLINE_GAME_OVER_TIMER = 'START_ONLINE_GAME_OVER_TIMER';

export const newGame = (hands) => ({
  type: NEW_GAME,
  hands,
})

export const setGameTypeOrMe = ({game_type, me}) => ({
  type: SET_GAME_TYPE_OR_ME,
  game_type,
  me,
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
