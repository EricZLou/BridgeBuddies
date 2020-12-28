import {
  SET_CONTRACT, SET_CURR_PLAYER, SET_GAME_ENGINE, SET_GAME_STATE, SET_READY_TO_PLAY
} from '../actions/Core'

import {GAMESTATES, SEATS} from '../../constants/GameEngine'

export function contract(state="", action) {
  switch (action.type) {
    case SET_CONTRACT:
      return action.contract;
    default:
      return state;
  }
}

export function curr_player(state=SEATS.SOUTH, action) {
  switch (action.type) {
    case SET_CURR_PLAYER:
      return action.player;
    default:
      return state;
  }
}

export function game_engine(state="", action) {
  switch (action.type) {
    case SET_GAME_ENGINE:
      return action.engine;
    default:
      return state;
  }
}

export function game_state(state=GAMESTATES.BIDDING, action) {
  switch (action.type) {
    case SET_GAME_STATE:
      return action.game_state;
    default:
      return state;
  }
}

export function ready_to_play(state=false, action) {
  switch (action.type) {
    case SET_READY_TO_PLAY:
      return action.ready;
    default:
      return state;
  }
}
