import {ALL_SEATS, PARTNERS} from '../../constants/Game'

export function getNextPlayer(seat) {
  return ALL_SEATS[(ALL_SEATS.indexOf(seat)+1) % 4];
}
export function getPrevPlayer(seat) {
  return ALL_SEATS[(ALL_SEATS.indexOf(seat)-1) % 4];
}
export function getPartner(seat) {
  return PARTNERS[seat];
}
