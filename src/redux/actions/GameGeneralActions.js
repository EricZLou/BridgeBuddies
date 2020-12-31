export const INCREMENT_CURR_PLAYER = 'INCREMENT_CURR_PLAYER';
export const NEW_GAME = 'NEW_GAME';
export const SET_HAND = 'SET_HAND';

export const incrementCurrPlayer = () => ({
  type: INCREMENT_CURR_PLAYER,
});

export const newGame = (hands) => ({
  type: NEW_GAME,
  hands,
})

export const setHand = ({seat, cards}) => ({
  type: SET_HAND,
  seat,
  cards,
});
