import {SEATS} from './constants/GameEngine'

// CONSTANTS from Firebase
export const TOTAL_EXP = 1000;

export const GAME_NUM = 0;
export const GAMES = [
  {
    [SEATS.NORTH]: "Eric",
    [SEATS.EAST]: "Tim",
    [SEATS.SOUTH]: "Elizabeth",
    [SEATS.WEST]: "Chris",
  },
];
export const GAME = GAMES[GAME_NUM];
