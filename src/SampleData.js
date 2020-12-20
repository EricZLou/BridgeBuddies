import {SEATS} from './constants/Game'

// CONSTANTS from Firebase
export const LEVEL = "Novice";
export const CURR_EXP = 320;
export const TOTAL_EXP = 1000;
export const NUM_COINS = 10;

export const GAME_NUM = 0;
export const GAMES = [
  {
    [SEATS.NORTH]: "Eric",
    [SEATS.EAST]: "Ari + Nancy",
    [SEATS.SOUTH]: "Lizza",
    [SEATS.WEST]: "Elena",
  },
];
export const GAME = GAMES[GAME_NUM];

let STORE_CARDBACKS = {
  "red card": {
    name: "red card",
    cost: 0,
    owned: true,
    description: "A classic red card -- cool and simple.",
    category: "cardbacks",
    file: "Red.png",
  },
  "black card": {
    name: "black card",
    cost: 10,
    owned: false,
    description: "A black and white card for old-times sake.",
    category: "cardbacks",
    file: "Black.png",
  },
  "blue card": {
    name: "blue card",
    cost: 20,
    owned: false,
    description: "A blue card that harnesses the power of the sky.",
    category: "cardbacks",
    file: "Blue.png",
  },
  "light green card": {
    name: "light green card",
    cost: 30,
    owned: false,
    description: "An obnoxiously bright green card.",
    category: "cardbacks",
    file: "LightGreen.png",
  },
  "gold card": {
    name: "gold card",
    cost: 100,
    owned: false,
    description: "A pure gold card that glitters and shines.",
    category: "cardbacks",
    file: "Gold.png",
  },
  "blue-gold card": {
    name: "blue-gold card",
    cost: 500,
    owned: false,
    description: "A mixed card that has dual powers.",
    category: "cardbacks",
    file: "BlueGold.png",
  },
};
let STORE_CHARACTERS = {
  "Jespade": {
    name: "Jespade",
    cost: 0,
    owned: true,
    description: "Jespade is a really cool kid lol.",
    category: "characters",
    file: "sreya1.png",
  },
  "Hartley": {
    name: "Hartley",
    cost: 0,
    owned: true,
    description: "Hartley loves to dress up.",
    category: "characters",
    file: "sreya3.png",
  },
};
let STORE_TABLES = {
  "classic table": {
    name: "classic table",
    cost: 0,
    owned: true,
    description: "The classic table.",
    category: "tables",
    file: "green2.jpg",
  },
};

export const STORE = {
  cardbacks: STORE_CARDBACKS,
  characters: STORE_CHARACTERS,
  tables: STORE_TABLES,
}
