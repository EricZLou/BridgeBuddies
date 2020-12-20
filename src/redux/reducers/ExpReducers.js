import {
  ADD_EXP
} from '../actions/Core'

export function experience(state={level: "novice", exp: 0}, action) {
  switch (action.type) {
    case ADD_EXP:
      return {...state, exp: this.state.exp + action.qty};
    default:
      return state;
  }
}
