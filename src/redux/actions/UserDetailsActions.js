export const SET_USER_DETAILS = 'SET_USER_DETAILS';

export const setUserDetails = (first_name, last_name) => ({
  type: SET_USER_DETAILS,
  first_name,
  last_name,
});
