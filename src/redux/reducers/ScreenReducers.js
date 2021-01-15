import {
  RESIZE_SCREEN
} from '../actions/Core'

export function screenSize(state={
  height: "", width: ""
}, action) {
  switch (action.type) {
    case RESIZE_SCREEN:
      return action.size;
    default:
      return state;
  }
}
