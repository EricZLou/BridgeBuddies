export const CLEAR_CARDS_ON_BOARD = 'CLEAR_CARDS_ON_BOARD';
export const FINISH_PLAYING = 'FINISH_PLAYING';
export const FINISH_TRICK = 'FINISH_TRICK';
export const PLAY_CARD = 'ACTION_PLAY_CARD';

export const clearCardsOnBoard = () => ({
  type: CLEAR_CARDS_ON_BOARD,
});

export const finishPlaying = () => ({
  type: FINISH_PLAYING,
});

export const finishTrick = () => ({
  type: FINISH_TRICK,
});

export const playCard = ({card, seat}) => ({
  type: PLAY_CARD,
  card,
  seat,
});