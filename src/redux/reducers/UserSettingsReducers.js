import {
  SET_USER_SETTINGS,
} from '../actions/Core'

export function userSettings(state={}, action) {
  switch (action.type) {
    case SET_USER_SETTINGS:
      return action.dict;
    default:
      return state;
  }
}
