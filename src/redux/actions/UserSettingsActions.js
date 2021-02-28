import {muteAllAudio, unmuteAllAudio} from '../../constants/Audio'

export const SET_USER_SETTINGS = 'SET_USER_SETTINGS';

export const setUserSettings = (dict) => {
  if (!dict.sounds) {
    muteAllAudio();
  } else {
    unmuteAllAudio();
  }
  return {
    type: SET_USER_SETTINGS,
    dict,
  }
};
