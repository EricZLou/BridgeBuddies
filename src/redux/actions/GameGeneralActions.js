export const NEW_GAME = 'NEW_GAME';
export const SET_HAND = 'SET_HAND';

export const newGame = (hands) => ({
  type: NEW_GAME,
  hands,
})

export const setHand = ({seat, cards}) => ({
  type: SET_HAND,
  seat,
  cards,
});
