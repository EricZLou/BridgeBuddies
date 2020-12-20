export const ADD_COINS = 'ADD_COINS';
export const SUB_COINS = 'SUB_COINS';

export const addCoins = (qty) => ({
  type: ADD_COINS,
  qty,
});
export const subCoins = (qty) => ({
  type: SUB_COINS,
  qty,
});
