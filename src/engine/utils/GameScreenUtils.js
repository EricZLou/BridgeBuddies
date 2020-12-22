import {SEATS, PARTNERS} from '../../constants/Game'

export function getNextPlayer(seat) {
  switch(seat) {
    case SEATS.NORTH: return SEATS.EAST;
    case SEATS.EAST: return SEATS.SOUTH;
    case SEATS.SOUTH: return SEATS.WEST;
    default: return SEATS.NORTH;
  }
}
export function getPrevPlayer(seat) {
  switch(seat) {
    case SEATS.NORTH: return SEATS.WEST;
    case SEATS.EAST: return SEATS.NORTH;
    case SEATS.SOUTH: return SEATS.EAST;
    default: return SEATS.SOUTH;
  }
}
export function getPartner(seat) {
  return PARTNERS[seat];
}
