import {
  SET_USER_STATS,
} from '../actions/Core'

export function coins(state="", action) {
  switch (action.type) {
    case SET_USER_STATS:
      return action.dict.coins;
    default:
      return state;
  }
}
export function exp(state="", action) {
  switch (action.type) {
    case SET_USER_STATS:
      return action.dict.exp;
    default:
      return state;
  }
}
export function level_idx(state="", action) {
  switch (action.type) {
    case SET_USER_STATS:
      return action.dict.level_idx;
    default:
      return state;
  }
}
export function games_played(state="", action) {
  switch (action.type) {
    case SET_USER_STATS:
      return action.dict.games_played;
    default:
      return state;
  }
}
