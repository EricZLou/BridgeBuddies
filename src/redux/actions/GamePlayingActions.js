import {CARD_PLAY_AUDIO} from '../../constants/Audio'

export const CLEAR_CARDS_ON_BOARD = 'CLEAR_CARDS_ON_BOARD';
export const FINISH_PLAYING = 'FINISH_PLAYING';
export const PLAY_CARD = 'ACTION_PLAY_CARD';

export const clearCardsOnBoard = () => ({
  type: CLEAR_CARDS_ON_BOARD,
});

export const finishPlaying = ({contract, tricks_won}) => ({
  type: FINISH_PLAYING,
  contract,
  tricks_won,
});

export const playCard = ({card, seat}) => {
  return function(dispatch, getState) {
    CARD_PLAY_AUDIO.play().then(() => {}).catch((error) => {console.log(error)});
    dispatch({type: PLAY_CARD, card: card, seat: seat});
  }
};
