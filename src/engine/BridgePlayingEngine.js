export default class BridgePlayingEngine {
  constructor() {
    this.cards_on_board = [];
    this.trump_suit = null;
  }
  setTrumpSuit(trump_suit) {
    this.trump_suit = trump_suit;
  }
  reset() {
    this.cards_on_board = [];
    this.trump_suit = null;
  }
  clearTrick() {
    this.cards_on_board = [];
  }
  isValidCard(card, cardsInHand) {
    if (this.cards_on_board.length === 0) return true;
    const opening_suit = this.cards_on_board[0].card.suit;
    if (card.suit === opening_suit) return true;
    for (let card of cardsInHand) {
      if (card.suit === opening_suit) return false;
    }
    return true;
  }
  playCard(card, seat) {
    this.cards_on_board.push({card: card, seat: seat});
  }
  isTrickOver() {
    return (this.cards_on_board.length === 4);
  }
  getRoundWinner() {
    const opening_suit = this.cards_on_board[0].card.suit;
    let max_card_play = this.cards_on_board[0];
    let found_trump = (opening_suit === this.trump_suit);
    for (let card_play of this.cards_on_board) {
      if (found_trump) {
        if (card_play.card.suit === this.trump_suit && card_play.card.value > max_card_play.card.value) {
          max_card_play = card_play;
        }
      }
      else {
          if (card_play.card.suit === this.trump_suit) {
            found_trump = true;
            max_card_play = card_play;
          }
          else if (card_play.card.suit === opening_suit && card_play.card.value > max_card_play.card.value) {
            max_card_play = card_play;
          }
      }
    }
    console.log(`Round Winner: ${max_card_play.seat}`)
    return max_card_play.seat;
  }
}
