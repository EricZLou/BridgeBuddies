import {
  SET_COINS, SET_EXP, SET_LEVEL
} from '../actions/Core'

export function coins(state="", action) {
  switch (action.type) {
    case SET_COINS:
      return action.qty;
    default:
      return state;
  }
}
export function exp(state="", action) {
  switch (action.type) {
    case SET_EXP:
      return action.qty;
    default:
      return state;
  }
}
export function level_idx(state="", action) {
  switch (action.type) {
    case SET_LEVEL:
      return action.level_idx;
    default:
      return state;
  }
}
