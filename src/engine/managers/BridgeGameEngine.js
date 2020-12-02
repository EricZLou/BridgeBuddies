import BridgePlayingEngine from './BridgePlayingEngine';
import BridgeBiddingEngine from './BridgeBiddingEngine';
import {SEATS} from '../../constants/Game';

export default class BridgeGameEngine {
  constructor() {
    this.bid_engine = new BridgeBiddingEngine();
    this.play_engine = new BridgePlayingEngine();
    this.tricks_won_NS = 0;
    this.tricks_won_EW = 0;
    this.dummy = null;
  }

  reset() {
    this.bid_engine.reset();
    this.play_engine.reset();
    this.tricks_won_NS = 0;
    this.tricks_won_EW = 0;
    this.dummy = null;
  }
  setTrumpSuit(suit) {
    this.play_engine.setTrumpSuit(suit);
  }
  setDummy(seat) {
    this.dummy = seat;
  }

  /* Bidding fns */
  isValidBid(bid, bidder) {
    return this.bid_engine.isValidBid(bid, bidder);
  }
  doBid(bid, bidder) {
    this.bid_engine.addBid(bid, bidder);
  }
  isBiddingComplete() {
    return this.bid_engine.isBiddingComplete();
  }
  getContract() {
    return this.bid_engine.getContract();
  }

  /* Playing card fns */
  isValidCard(card, cardsInHand) {
    return this.play_engine.isValidCard(card, cardsInHand);
  }
  playCard(card, player) {
    this.play_engine.playCard(card, player);
  }
  isTrickOver() {
    return this.play_engine.isTrickOver();
  }
  isGameOver() {
    return this.tricks_won_NS + this.tricks_won_EW === 13;
  }
  getRoundWinner() {
    const winner = this.play_engine.getRoundWinner();
    if (winner === SEATS.NORTH || winner === SEATS.SOUTH) this.tricks_won_NS++;
    else this.tricks_won_EW++;
    return winner;
  }
  clearTrick() {
    this.play_engine.clearTrick();
  }
  getScoreNS() {
    return this.tricks_won_NS;
  }
  getScoreEW() {
    return this.tricks_won_EW;
  }
}
