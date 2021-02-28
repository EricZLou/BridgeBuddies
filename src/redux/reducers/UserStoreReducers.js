import {
  SET_USER_STORE_ACTIVE, SET_USER_STORE_OWNED
} from '../actions/Core'

export function storeActive(state={}, action) {
  switch (action.type) {
    case SET_USER_STORE_ACTIVE:
      return action.dict;
    default:
      return state;
  }
}
export function storeOwned(state={}, action) {
  switch (action.type) {
    case SET_USER_STORE_OWNED:
      return action.dict;
    default:
      return state;
  }
}
