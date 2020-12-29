export const SET_CONTRACT = 'SET_CONTRACT';
export const SET_CURR_PLAYER = 'SET_CURR_PLAYER';
export const SET_GAME_STATE = 'SET_GAME_STATE';
export const SET_PLAYER_CARDS = 'SET_PLAYER_CARDS';
export const SET_READY_TO_PLAY = 'SET_READY_TO_PLAY';

export const setContract = (contract) => ({
  type: SET_CONTRACT,
  contract,
});

export const setCurrPlayer = (player) => ({
  type: SET_CURR_PLAYER,
  player,
});

export const setGameState = (game_state) => ({
  type: SET_GAME_STATE,
  game_state,
});

export const setPlayerCards = (cards) => ({
  type: SET_PLAYER_CARDS,
  cards,
});

export const setReadyToPlay = (ready) => ({
  type: SET_READY_TO_PLAY,
  ready,
});
