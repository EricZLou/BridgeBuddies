export const SET_CONTRACT = 'SET_CONTRACT';
export const SET_CURR_PLAYER = 'SET_CURR_PLAYER';
export const SET_GAME_ENGINE = 'SET_GAME_ENGINE';
export const SET_GAME_STATE = 'SET_GAME_STATE';
export const SET_READY_TO_PLAY = 'SET_READY_TO_PLAY';

export const setContract = (contract) => ({
  type: SET_CONTRACT,
  contract,
});

export const setCurrPlayer = (player) => ({
  type: SET_CURR_PLAYER,
  player,
});

export const setGameEngine = (engine) => ({
  type: SET_GAME_ENGINE,
  engine,
});

export const setGameState = (game_state) => ({
  type: SET_GAME_STATE,
  game_state,
});

export const setReadyToPlay = (ready) => ({
  type: SET_READY_TO_PLAY,
  ready,
});
