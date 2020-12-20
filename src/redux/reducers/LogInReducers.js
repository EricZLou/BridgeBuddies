import {
  LOG_IN,
} from '../actions/Core'

export function userID(state='', action) {
  switch (action.type) {
    case LOG_IN:
      return action.userID;
    default:
      return state;
  }
}
