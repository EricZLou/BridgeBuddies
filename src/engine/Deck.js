import {SEATS, SUITS, VALUES} from '../constants/GameEngine'

export default class Deck {
  constructor() {
    this.deck = [];
    for (let suit of SUITS) {
      for (let value of VALUES) {
        this.deck.push({
          value: value,
          suit: suit,
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
    this.shuffle();
    const north_hand = sortHand(this.deck.slice(0, 13));
    const east_hand = sortHand(this.deck.slice(13, 26));
    const south_hand = sortHand(this.deck.slice(26, 39));
    const west_hand = sortHand(this.deck.slice(39, 52));
    return {
      [SEATS.NORTH]: north_hand,
      [SEATS.EAST]: east_hand,
      [SEATS.SOUTH]: south_hand,
      [SEATS.WEST]: west_hand,
    };
  }
}

function _sortSuitByValue(card_a, card_b) {
  return -(card_a.value - card_b.value);
}

export function sortHand(hand, trump='C') {
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

  if (trump === 'C') return clubs.concat(diamonds,spades,hearts);
  if (trump === 'D') return diamonds.concat(clubs,hearts,spades);
  if (trump === 'H') return hearts.concat(spades,diamonds,clubs);
  return spades.concat(hearts,clubs,diamonds);
};
