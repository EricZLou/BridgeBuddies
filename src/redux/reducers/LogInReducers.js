import {
  LOG_IN, LOG_OUT, HOME_SCREEN_READY, HOME_SCREEN_NOT_READY
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

export function homeScreenReady(state=false, action) {
  switch (action.type) {
    case HOME_SCREEN_READY:
      return true;
    case HOME_SCREEN_NOT_READY:
      return false;
    default:
      return state;
  }
}
