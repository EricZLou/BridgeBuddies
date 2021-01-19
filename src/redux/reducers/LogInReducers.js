import {
  LOG_IN, LOG_OUT
} from '../actions/Core'

export function userID(state='', action) {
  switch (action.type) {
    case LOG_IN:
      return action.userID;
    case LOG_OUT:
      return ''
    default:
      return state;
  }
}
