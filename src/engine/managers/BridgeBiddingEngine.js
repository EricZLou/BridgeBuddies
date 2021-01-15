import {BID_TYPES, BID_SUIT_ORDER_MAP, SEATS} from '../../constants/GameEngine'


function getPrevSuitBidFromHistory(history) {
  for (let i = history.length-1; i >= 0; i--) {
    const bid_play = history[i];
    if (bid_play.bid.type === BID_TYPES.SUIT) {
      return {bid: bid_play.bid, seat: bid_play.seat};
    }
  }
  return null;
}

export function isValidBid({history, bid}) {
  if (history.length === 0) {
    if (bid.type === BID_TYPES.PASS || bid.type === BID_TYPES.SUIT) return true;
    else return false;
  }
  if (bid.type === BID_TYPES.PASS) { return true; }
  if (bid.type === BID_TYPES.DBL) {
    if (history[history.length-1].bid.type === BID_TYPES.SUIT)
      return true;
    else if (history.length >= 3) {
      if (history[history.length-1].bid.type === BID_TYPES.PASS &&
          history[history.length-2].bid.type === BID_TYPES.PASS &&
          history[history.length-3].bid.type === BID_TYPES.SUIT)
        return true;
    }
    return false;
  }
  if (bid.type === BID_TYPES.RDBL) {
    if (history[history.length-1].bid.type === BID_TYPES.DBL)
      return true;
    else if (history.length >= 3) {
      if (history[history.length-1].bid.type === BID_TYPES.PASS &&
          history[history.length-2].bid.type === BID_TYPES.PASS &&
          history[history.length-3].bid.type === BID_TYPES.DBL)
        return true;
    }
    return false;
  }
  const prevSuitBid = getPrevSuitBidFromHistory(history);
  if (bid.type === BID_TYPES.SUIT) {
    if (!prevSuitBid) return true;
    if (prevSuitBid.bid.level < bid.level) return true;
    if (prevSuitBid.bid.level === bid.level &&
      BID_SUIT_ORDER_MAP[prevSuitBid.bid.suit] < BID_SUIT_ORDER_MAP[bid.suit]) {
      return true;
    }
    return false;
  }
  throw new Error('InvalidBidTypeError');
}

export function isBiddingComplete(history) {
  const historylen = history.length;
  if (historylen >= 3) {
    if (history[historylen-1].bid.type === BID_TYPES.PASS &&
        history[historylen-2].bid.type === BID_TYPES.PASS &&
        history[historylen-3].bid.type === BID_TYPES.PASS) {
      const prevSuitBid = getPrevSuitBidFromHistory(history);
      if (prevSuitBid) return true;
      else if (historylen === 4) return true;
    }
  }
  return false;
}

export function getContract(history) {
  const prevSuitBid = getPrevSuitBidFromHistory(history);
  if (!prevSuitBid) return {suit: 'pass'};
  const finalBid = prevSuitBid;
  let seats;
  if (finalBid.seat === SEATS.NORTH || finalBid.seat === SEATS.SOUTH)
    seats = [SEATS.NORTH, SEATS.SOUTH];
  else
    seats = [SEATS.EAST, SEATS.WEST];
  for (let bid of history) {
    if (seats.includes(bid.seat) && bid.bid.suit === finalBid.bid.suit) {
      return {
        suit: finalBid.bid.suit,
        level: finalBid.bid.level,
        declarer: bid.seat,
        doubled: history[history.length-4].bid.type === BID_TYPES.DBL,
        redoubled: history[history.length-4].bid.type === BID_TYPES.RDBL,
      };
    }
  }
  throw new Error('should never get here');
}
