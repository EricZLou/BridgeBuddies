import {
  LOG_IN, HOME_SCREEN_READY
} from '../actions/Core'

export function userID(state='', action) {
  switch (action.type) {
    case LOG_IN:
      return action.userID;
    default:
      return state;
  }
}

export function homeScreenReady(state=false, action) {
  switch (action.type) {
    case HOME_SCREEN_READY:
      return true;
    default:
      return state;
  }
}
