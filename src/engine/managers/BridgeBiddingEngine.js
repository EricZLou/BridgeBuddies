const {BID_TYPES, BID_SUIT_ORDER_MAP, SEATS} = require('../../constants/GameEngine')


export default class BridgeBiddingEngine {
  constructor() {
    this.bidHistory = [];
    this.prevSuitBid = {bid: {type: '', suit: '', level: 0}, bidder: ''};
  }
  reset() {
    this.bidHistory = [];
    this.prevSuitBid = {bid: {type: '', suit: '', level: 0}, bidder: ''};
  }
  isValidBid(bid, bidder) { // bid = {type: 'suit', suit: 'c','d','h','s','nt','pass', level= 1...7}
    if (this.bidHistory.length === 0) {
      if (bid.type === BID_TYPES.PASS || bid.type === BID_TYPES.SUIT) return true;
      else if (bid.type === BID_TYPES.DBL || bid.type === BID_TYPES.RDBL) return false;
      else throw new Error('InvalidBidTypeError');
    }
    if (bid.type === BID_TYPES.PASS) { return true; }
    if (bid.type === BID_TYPES.DBL) {
      if (this.bidHistory[this.bidHistory.length-1].bid.type === BID_TYPES.SUIT)
        return true;
      else if (this.bidHistory.length >= 3) {
        if (this.bidHistory[this.bidHistory.length-1].bid.type === BID_TYPES.PASS &&
            this.bidHistory[this.bidHistory.length-2].bid.type === BID_TYPES.PASS &&
            this.bidHistory[this.bidHistory.length-3].bid.type === BID_TYPES.SUIT) {
          return true;
        }
      }
      return false;
    }
    if (bid.type === BID_TYPES.RDBL) {
      if (this.bidHistory[this.bidHistory.length-1].bid.type === BID_TYPES.DBL)
        return true;
      else if (this.bidHistory.length >= 3) {
        if (this.bidHistory[this.bidHistory.length-1].bid.type === BID_TYPES.PASS &&
            this.bidHistory[this.bidHistory.length-2].bid.type === BID_TYPES.PASS &&
            this.bidHistory[this.bidHistory.length-3].bid.type === BID_TYPES.DBL) {
          return true;
        }
      }
      return false;
    }
    if (bid.type === BID_TYPES.SUIT) {
      if (this.prevSuitBid.bidder === '') { // this bid would be first suit bid
        return true;
      }
      if (this.prevSuitBid.bid.level < bid.level) { return true; }
      if (this.prevSuitBid.bid.level === bid.level &&
        BID_SUIT_ORDER_MAP[this.prevSuitBid.bid.suit] < BID_SUIT_ORDER_MAP[bid.suit]) {
        return true;
      }
      return false;
    }
    throw new Error('InvalidBidTypeError');
  }

  isBiddingComplete() {
    const historylen = this.bidHistory.length;
    if (historylen >= 3) {
      if (this.bidHistory[historylen-1].bid.type === BID_TYPES.PASS &&
          this.bidHistory[historylen-2].bid.type === BID_TYPES.PASS &&
          this.bidHistory[historylen-3].bid.type === BID_TYPES.PASS) {
        if (this.prevSuitBid.bidder !== '') return true;
        else if (historylen === 4 && this.bidHistory[historylen-4].bid.type === BID_TYPES.PASS) // all pass
          return true;
      }
    }
    return false;
  }

  getContract() { // call this only after isBiddingComplete returns true
    if (this.prevSuitBid.bidder === '') // the round was all pass
      return {suit: 'pass'};
    const finalBid = this.prevSuitBid;
    let seatA, seatB;
    if (finalBid.bidder === SEATS.NORTH || finalBid.bidder === SEATS.SOUTH) {
      seatA = SEATS.NORTH;;
      seatB = SEATS.SOUTH;
    }
    else {
      seatA = SEATS.EAST;
      seatB = SEATS.WEST;
    }
    for (let i=0; i<this.bidHistory.length; i++) {
      if ((this.bidHistory[i].bidder === seatA ||
        this.bidHistory[i].bidder === seatB) &&
        this.bidHistory[i].bid.type === BID_TYPES.SUIT &&
        this.bidHistory[i].bid.suit === finalBid.bid.suit)
        return {
          suit: finalBid.bid.suit,
          level: finalBid.bid.level,
          declarer: this.bidHistory[i].bidder
        };
    }
    throw new Error('should never get here');
  }
  getBidHistory() {
    return this.bidHistory;
  }
  addBid(bid, bidder) { // bidder = 'N', 'E', 'S', 'W', call isValidBid before calling addBid
    this.bidHistory.push({
      bid: bid,
      bidder: bidder
    });
    if (bid.type === BID_TYPES.SUIT) {
      this.prevSuitBid = {
        bid: bid,
        bidder: bidder
      };
    }
  }
  undoBid() {
    if (this.bidHistory.length > 0) {
      this.bidHistory.pop();
    }
  }
}
