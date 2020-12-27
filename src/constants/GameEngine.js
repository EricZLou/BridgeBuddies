// export const GAME_TYPES = {
//   ROBOT: "robot",
//   ONLINE: "online",
// }
//
// export const SUITS = ['C', 'D', 'H', 'S'];
// export const VALUES = [2,3,4,5,6,7,8,9,10,11,12,13,14];
// export const SEATS = {
//   NORTH: "north",
//   EAST: "east",
//   SOUTH: "south",
//   WEST: "west",
// };
// export const ALL_SEATS = [SEATS.NORTH, SEATS.EAST, SEATS.SOUTH, SEATS.WEST];
// export const PARTNERS = {
//   [SEATS.NORTH]: SEATS.SOUTH,
//   [SEATS.SOUTH]: SEATS.NORTH,
//   [SEATS.EAST]: SEATS.WEST,
//   [SEATS.WEST]: SEATS.EAST,
// };
//
// export const GAMESTATES = {
//   BIDDING: 'BIDDING',
//   PLAYING: 'PLAYING',
//   RESULTS: 'RESULTS',
// };
//
// export const BID_LEVELS = [1, 2, 3, 4, 5, 6, 7];
// export const BID_SUITS = {
//   NOTRUMP: 'NT',
//   SPADES: 'S',
//   HEARTS: 'H',
//   DIAMONDS: 'D',
//   CLUBS: 'C',
// };
// export const BID_SUIT_ORDER_MAP = {
//   [BID_SUITS.CLUBS]: 1,
//   [BID_SUITS.DIAMONDS]: 2,
//   [BID_SUITS.HEARTS]: 3,
//   [BID_SUITS.SPADES]: 4,
//   [BID_SUITS.NOTRUMP]: 5
// };
// export const BID_OTHERS = {
//   PASS: 'pass',
//   DBL: 'double',
//   RDBL: 'redouble',
// }
// export const BID_TYPES = {
//   SUIT: 'suit',
//   PASS: 'pass',
//   DBL: 'double',
//   RDBL: 'redouble',
// };
// export const BID_UNICODE_MAP = {
//   [BID_SUITS.NOTRUMP]: 'NT',
//   [BID_SUITS.SPADES]: '\u2660',
//   [BID_SUITS.HEARTS]: '\u2665',
//   [BID_SUITS.DIAMONDS]: '\u2666',
//   [BID_SUITS.CLUBS]: '\u2663',
//   [BID_OTHERS.PASS]: 'PASS',
//   [BID_OTHERS.DBL]: 'X',
//   [BID_OTHERS.RDBL]: 'XX',
// };



// module.exports.GAME_TYPES = {
//   ROBOT: "robot",
//   ONLINE: "online",
// }
//
// module.exports.SUITS = ['C', 'D', 'H', 'S'];
// module.exports.VALUES = [2,3,4,5,6,7,8,9,10,11,12,13,14];
// const SEATS = {
//   NORTH: "north",
//   EAST: "east",
//   SOUTH: "south",
//   WEST: "west",
// };
// module.exports.SEATS = SEATS;
// const ALL_SEATS = [SEATS.NORTH, SEATS.EAST, SEATS.SOUTH, SEATS.WEST];
// module.exports.ALL_SEATS = ALL_SEATS;
// module.exports.PARTNERS = {
//   [SEATS.NORTH]: SEATS.SOUTH,
//   [SEATS.SOUTH]: SEATS.NORTH,
//   [SEATS.EAST]: SEATS.WEST,
//   [SEATS.WEST]: SEATS.EAST,
// };
//
// module.exports.GAMESTATES = {
//   BIDDING: 'BIDDING',
//   PLAYING: 'PLAYING',
//   RESULTS: 'RESULTS',
// };
//
// module.exports.BID_LEVELS = [1, 2, 3, 4, 5, 6, 7];
// const BID_SUITS = {
//   NOTRUMP: 'NT',
//   SPADES: 'S',
//   HEARTS: 'H',
//   DIAMONDS: 'D',
//   CLUBS: 'C',
// };
// module.exports.BID_SUITS = BID_SUITS;
// module.exports.BID_SUIT_ORDER_MAP = {
//   [BID_SUITS.CLUBS]: 1,
//   [BID_SUITS.DIAMONDS]: 2,
//   [BID_SUITS.HEARTS]: 3,
//   [BID_SUITS.SPADES]: 4,
//   [BID_SUITS.NOTRUMP]: 5
// };
// const BID_OTHERS = {
//   PASS: 'pass',
//   DBL: 'double',
//   RDBL: 'redouble',
// }
// module.exports.BID_OTHERS = BID_OTHERS;
// module.exports.BID_TYPES = {
//   SUIT: 'suit',
//   PASS: 'pass',
//   DBL: 'double',
//   RDBL: 'redouble',
// };
// module.exports.BID_UNICODE_MAP = {
//   [BID_SUITS.NOTRUMP]: 'NT',
//   [BID_SUITS.SPADES]: '\u2660',
//   [BID_SUITS.HEARTS]: '\u2665',
//   [BID_SUITS.DIAMONDS]: '\u2666',
//   [BID_SUITS.CLUBS]: '\u2663',
//   [BID_OTHERS.PASS]: 'PASS',
//   [BID_OTHERS.DBL]: 'X',
//   [BID_OTHERS.RDBL]: 'XX',
// };







const GAME_TYPES = {
  ROBOT: "robot",
  ONLINE: "online",
}

const SUITS = ['C', 'D', 'H', 'S'];
const VALUES = [2,3,4,5,6,7,8,9,10,11,12,13,14];
const SEATS = {
  NORTH: "north",
  EAST: "east",
  SOUTH: "south",
  WEST: "west",
};
const ALL_SEATS = [SEATS.NORTH, SEATS.EAST, SEATS.SOUTH, SEATS.WEST];
const PARTNERS = {
  [SEATS.NORTH]: SEATS.SOUTH,
  [SEATS.SOUTH]: SEATS.NORTH,
  [SEATS.EAST]: SEATS.WEST,
  [SEATS.WEST]: SEATS.EAST,
};

const GAMESTATES = {
  BIDDING: 'BIDDING',
  PLAYING: 'PLAYING',
  RESULTS: 'RESULTS',
};

const BID_LEVELS = [1, 2, 3, 4, 5, 6, 7];
const BID_SUITS = {
  NOTRUMP: 'NT',
  SPADES: 'S',
  HEARTS: 'H',
  DIAMONDS: 'D',
  CLUBS: 'C',
};
const BID_SUIT_ORDER_MAP = {
  [BID_SUITS.CLUBS]: 1,
  [BID_SUITS.DIAMONDS]: 2,
  [BID_SUITS.HEARTS]: 3,
  [BID_SUITS.SPADES]: 4,
  [BID_SUITS.NOTRUMP]: 5
};
const BID_OTHERS = {
  PASS: 'pass',
  DBL: 'double',
  RDBL: 'redouble',
}
const BID_TYPES = {
  SUIT: 'suit',
  PASS: 'pass',
  DBL: 'double',
  RDBL: 'redouble',
};
const BID_UNICODE_MAP = {
  [BID_SUITS.NOTRUMP]: 'NT',
  [BID_SUITS.SPADES]: '\u2660',
  [BID_SUITS.HEARTS]: '\u2665',
  [BID_SUITS.DIAMONDS]: '\u2666',
  [BID_SUITS.CLUBS]: '\u2663',
  [BID_OTHERS.PASS]: 'PASS',
  [BID_OTHERS.DBL]: 'X',
  [BID_OTHERS.RDBL]: 'XX',
};

module.exports = {
  GAME_TYPES, SUITS, VALUES, SEATS, ALL_SEATS, PARTNERS,
  GAMESTATES,
  BID_LEVELS, BID_SUITS, BID_SUIT_ORDER_MAP, BID_OTHERS, BID_TYPES, BID_UNICODE_MAP,
}
