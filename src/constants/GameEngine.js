exports.GAME_TYPES = {
  ROBOT: "robot",
  ONLINE: "online",
}

exports.SUITS = ['C', 'D', 'H', 'S'];
exports.VALUES = [2,3,4,5,6,7,8,9,10,11,12,13,14];
const SEATS = {
  NORTH: "north",
  EAST: "east",
  SOUTH: "south",
  WEST: "west",
};
exports.SEATS = SEATS;
exports.ALL_SEATS = [SEATS.NORTH, SEATS.EAST, SEATS.SOUTH, SEATS.WEST];
exports.PARTNERS = {
  [SEATS.NORTH]: SEATS.SOUTH,
  [SEATS.SOUTH]: SEATS.NORTH,
  [SEATS.EAST]: SEATS.WEST,
  [SEATS.WEST]: SEATS.EAST,
};

exports.GAMESTATES = {
  BIDDING: 'BIDDING',
  PLAYING: 'PLAYING',
  RESULTS: 'RESULTS',
};

exports.BID_LEVELS = [1, 2, 3, 4, 5, 6, 7];
const BID_SUITS = {
  NOTRUMP: 'NT',
  SPADES: 'S',
  HEARTS: 'H',
  DIAMONDS: 'D',
  CLUBS: 'C',
};
exports.BID_SUITS = BID_SUITS;
exports.BID_SUIT_ORDER_MAP = {
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
exports.BID_OTHERS = BID_OTHERS;
exports.BID_TYPES = {
  SUIT: 'suit',
  PASS: 'pass',
  DBL: 'double',
  RDBL: 'redouble',
};
exports.BID_UNICODE_MAP = {
  [BID_SUITS.NOTRUMP]: 'NT',
  [BID_SUITS.SPADES]: '\u2660',
  [BID_SUITS.HEARTS]: '\u2665',
  [BID_SUITS.DIAMONDS]: '\u2666',
  [BID_SUITS.CLUBS]: '\u2663',
  [BID_OTHERS.PASS]: 'PASS',
  [BID_OTHERS.DBL]: 'X',
  [BID_OTHERS.RDBL]: 'XX',
};
