import BridgePlayingEngine from './BridgePlayingEngine'
import BridgeBiddingEngine from './BridgeBiddingEngine'

import {getPartner} from '../utils/GameScreenUtils'
import {SEATS} from '../../constants/GameEngine'


class BridgeGameEngine {
  constructor() {
    this.bid_engine = new BridgeBiddingEngine();
    this.play_engine = new BridgePlayingEngine();
    this.dummy = null;
  }

  reset() {
    this.bid_engine.reset();
    this.play_engine.reset();
    this.dummy = null;
  }

  /* Bidding fns */
  isValidBid(bid, bidder) {
    return this.bid_engine.isValidBid(bid, bidder);
  }
  doBid(bid, bidder) {
    this.bid_engine.addBid(bid, bidder);
  }
  isBiddingComplete() {
    const ret = this.bid_engine.isBiddingComplete();
    if (ret) {
      const contract = this.getContract();
      this.setTrumpSuit(contract.suit);
      this.setDummy(getPartner(contract.declarer));
    }
    return ret;
  }
  setTrumpSuit(suit) {
    this.play_engine.setTrumpSuit(suit);
  }
  setDummy(seat) {
    this.dummy = seat;
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
  firstCardOfTrickPlayed() {
    return this.play_engine.firstCardOfTrickPlayed();
  }
  isTrickOver() {
    return this.play_engine.isTrickOver();
  }
  isGameOver() {
    return this.tricks_won_NS + this.tricks_won_EW === 13;
  }
  getRoundSuit() {
    return this.play_engine.getRoundSuit();
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
}

export let game_engine = new BridgeGameEngine();
