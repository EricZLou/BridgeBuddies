import {SUITS, VALUES} from '../constants/Game'

export default class Deck {
  constructor() {
    this.deck = [];
    for (let suit of SUITS) {
      for (let value of VALUES) {
        this.deck.push({
          suit: suit,
          value: value,
        });
      }
    }
  }
  shuffle() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      let temp = this.deck[i];
      this.deck[i] = this.deck[j];
      this.deck[j] = temp;
    }
  }
  generateHands() {
    let north_hand = sortHand(this.deck.slice(0,13));
    let east_hand = sortHand(this.deck.slice(13, 26));
    let south_hand = sortHand(this.deck.slice(26, 39));
    let west_hand = sortHand(this.deck.slice(39, 52));
    return [north_hand, east_hand, south_hand, west_hand];
  }
}

function _sortSuitByValue(card_a, card_b) {
  return -(card_a.value - card_b.value);
}

function sortHand(hand) {
  let clubs = [];
  let diamonds = [];
  let hearts = [];
  let spades = [];

  for (let card of hand) {
    switch(card.suit) {
      case 'C':
        clubs.push(card);
        break;
      case 'D':
        diamonds.push(card);
        break;
      case 'H':
        hearts.push(card);
        break;
      case 'S':
        spades.push(card);
        break;
      default:
        throw new Error("InvalidSuitError");
    }
  }

  clubs.sort(_sortSuitByValue);
  diamonds.sort(_sortSuitByValue);
  hearts.sort(_sortSuitByValue);
  spades.sort(_sortSuitByValue);
  return clubs.concat(diamonds,spades,hearts);
};
