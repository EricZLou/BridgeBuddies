import BridgePlayingEngine from './BridgePlayingEngine';
// import BridgeBiddingEngine from './BridgeBiddingEngine';
import {SEATS} from '../constants/Game';

export default class BridgeGameEngine {
  constructor() {
    // this.bid_engine = new BridgeBiddingEngine();
    this.play_engine = new BridgePlayingEngine();
    this.players = [SEATS.NORTH, SEATS.EAST, SEATS.SOUTH, SEATS.WEST];
    this.tricks_won_NS = 0;
    this.tricks_won_EW = 0;
    this.curr_player_idx = 0;
    this.curr_player = this.players[this.curr_player_idx];
  }

  reset() {
    // this.bid_engine.reset();
    this.play_engine.reset();
  }
  setCurrPlayer(seat) {
    this.curr_player_idx = this.players.indexOf(seat);
    this.curr_player = seat;
  }
  goToNextPlayer() {
    this.curr_player_idx = (this.curr_player_idx + 1) % 4;
    this.curr_player = this.players[this.curr_player_idx];
  }
  setTrumpSuit(suit) {
    this.play_engine.setTrumpSuit(suit);
  }
  isMyTurn(seat) {
    return seat === this.curr_player;
  }

  // /* Bidding fns */
  // isValidBid(bid, bidder) {
  //   return this.bidEngine.isValidBid(bid, bidder);
  // }
  // doBid(bid, bidder) {
  //   this.bidEngine.addBid(bid, bidder);
  // }
  // isBiddingComplete() {
  //   return this.bidEngine.isBiddingComplete();
  // }
  // getContract() {
  //   return this.bidEngine.getContract();
  // }
  // getLastSuitBid() {
  //   return this.bidEngine.getPrevSuitBid().bid;
  // }

  /* Playing card fns */
  isValidCard(card, cardsInHand) {
    return this.play_engine.isValidCard(card, cardsInHand);
  }
  playCard(card, player) {
    this.play_engine.playCard(card, player);
    this.goToNextPlayer();
  }
  isTrickOver() {
    return this.play_engine.isTrickOver();
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
