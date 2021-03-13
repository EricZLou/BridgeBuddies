import {
  SET_USER_DETAILS,
} from '../actions/Core'

export function userDetails(state={
  name: "",
  username: "",
}, action) {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {
        name: action.dict.name,
        username: action.dict.username,
      };
    default:
      return state;
  }
}
