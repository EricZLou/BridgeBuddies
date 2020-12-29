export const SUITS = ['C', 'D', 'H', 'S'];
export const VALUES = [2,3,4,5,6,7,8,9,10,11,12,13,14];
export const SEATS = {
  NORTH: "north",
  EAST: "east",
  SOUTH: "south",
  WEST: "west",
};
export const ALL_SEATS = [SEATS.NORTH, SEATS.EAST, SEATS.SOUTH, SEATS.WEST];
export const PARTNERS = {
  [SEATS.NORTH]: SEATS.SOUTH,
  [SEATS.SOUTH]: SEATS.NORTH,
  [SEATS.EAST]: SEATS.WEST,
  [SEATS.WEST]: SEATS.EAST,
};

export const GAMESTATES = {
  BIDDING: 'BIDDING',
  PLAYING: 'PLAYING',
  RESULTS: 'RESULTS',
};

export const GAMETYPES = {
  OFFLINE: "offline",
  ONLINE: "online",
};

export const BID_LEVELS = [1, 2, 3, 4, 5, 6, 7];
export const BID_SUITS = {
  NOTRUMP: 'NT',
  SPADES: 'S',
  HEARTS: 'H',
  DIAMONDS: 'D',
  CLUBS: 'C',
};
export const BID_SUIT_ORDER_MAP = {
  [BID_SUITS.CLUBS]: 1,
  [BID_SUITS.DIAMONDS]: 2,
  [BID_SUITS.HEARTS]: 3,
  [BID_SUITS.SPADES]: 4,
  [BID_SUITS.NOTRUMP]: 5
};
export const BID_OTHERS = {
  PASS: 'pass',
  DBL: 'double',
  RDBL: 'redouble',
}
export const BID_TYPES = {
  SUIT: 'suit',
  PASS: 'pass',
  DBL: 'double',
  RDBL: 'redouble',
};
export const BID_UNICODE_MAP = {
  [BID_SUITS.NOTRUMP]: 'NT',
  [BID_SUITS.SPADES]: '\u2660',
  [BID_SUITS.HEARTS]: '\u2665',
  [BID_SUITS.DIAMONDS]: '\u2666',
  [BID_SUITS.CLUBS]: '\u2663',
  [BID_OTHERS.PASS]: 'PASS',
  [BID_OTHERS.DBL]: 'X',
  [BID_OTHERS.RDBL]: 'XX',
};
