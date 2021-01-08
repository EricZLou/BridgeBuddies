export const NEW_GAME = 'NEW_GAME';
export const SET_HAND = 'SET_HAND';
export const SET_PLAYER_TYPES = 'SET_PLAYER_TYPES';
export const START_ONLINE_GAME_OVER_TIMER = 'START_ONLINE_GAME_OVER_TIMER';

export const newGame = (hands) => ({
  type: NEW_GAME,
  hands,
})

export const setHand = ({seat, cards}) => ({
  type: SET_HAND,
  seat,
  cards,
});

export const setPlayerTypes = (dict) => ({
  type: SET_PLAYER_TYPES,
  dict,
});

export const startOnlineGameOverTimer = () => ({
  type: START_ONLINE_GAME_OVER_TIMER,
})
