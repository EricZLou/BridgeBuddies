export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const HOME_SCREEN_READY = 'HOME_SCREEN_READY';
export const HOME_SCREEN_NOT_READY = 'HOME_SCREEN_NOT_READY';

export const logIn = (userID) => ({
  type: LOG_IN,
  userID,
});
export const logOut = () => ({
  type: LOG_OUT,
});

export const homeScreenReady = () => ({
  type: HOME_SCREEN_READY,
})
export const homeScreenNotReady = () => ({
  type: HOME_SCREEN_NOT_READY,
})
