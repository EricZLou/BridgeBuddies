import {
  ADD_COINS, SUB_COINS
} from '../actions/Core'

export function coins(state=0, action) {
  switch (action.type) {
    case ADD_COINS:
      return state + action.qty;
    case SUB_COINS:
      return (state >= action.qty) ? (state - action.qty) : 0;
    default:
      return state;
  }
}
