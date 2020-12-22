export const SET_COINS = 'SET_COINS';
export const SET_EXP = 'SET_EXP';
export const SET_LEVEL = 'SET_LEVEL';

export const setCoins = (qty) => ({
  type: SET_COINS,
  qty,
});

export const setExp = (qty) => ({
  type: SET_EXP,
  qty,
});

export const setLevel = (level_idx) => ({
  type: SET_LEVEL,
  level_idx,
});
