import {
  SET_USER_DETAILS,
} from '../actions/Core'

export function userDetails(state={
  first_name: "",
  last_name: "",
  username: "",
}, action) {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {
        first_name: action.dict.first_name,
        last_name: action.dict.last_name,
        username: action.dict.username,
      };
    default:
      return state;
  }
}
