import {
  FINISH_BIDDING, MAKE_BID,
  NEW_GAME, SET_HAND,
  CLEAR_CARDS_ON_BOARD, FINISH_PLAYING, PLAY_CARD,
} from '../actions/Core'

import {getRoundWinner} from '../../engine/managers/BridgeGameEngine'
import {getNextPlayer, getPartner} from '../../engine/utils/GameScreenUtils'
import {sortHand} from '../../engine/Deck'
import {BID_SUITS, GAMESTATES, SEATS} from '../../constants/GameEngine'

export function bid_history(state=[], action) {
  switch (action.type) {
    case MAKE_BID:
      return [...state, {bid: action.bid, seat: action.seat}];
    case NEW_GAME:
      return [];
    default:
      return state;
  }
}

export function card_history(state=[], action) {
  switch (action.type) {
    case PLAY_CARD:
      return [...state, {card: action.card, seat: action.seat}];
    case NEW_GAME:
      return [];
    default:
      return state;
  }
}

export function cards_on_board(state=[], action) {
  switch (action.type) {
    case PLAY_CARD:
      if (state.length === 4)
        return [{card: action.card, seat: action.seat}];
      return [...state, {card: action.card, seat: action.seat}];
    case CLEAR_CARDS_ON_BOARD:
      return [];
    case NEW_GAME:
      return [];
    default:
      return state;
  }
}

export function contract(state="", action) {
  switch (action.type) {
    case FINISH_BIDDING:
      return action.contract;
    default:
      return state;
  }
}

export function curr_player(state="", action) {
  switch (action.type) {
    case NEW_GAME:
      return SEATS.SOUTH;
    case FINISH_BIDDING:
      return getNextPlayer(action.contract.declarer);
    case MAKE_BID:
      return getNextPlayer(state);
    default:
      return state;
  }
}

export function dummy(state="", action) {
  switch (action.type) {
    case FINISH_BIDDING:
      return getPartner(action.contract.declarer);
    default:
      return state;
  }
}

export function first_card_played(state=false, action) {
  switch (action.type) {
    case NEW_GAME:
      return false;
    case PLAY_CARD:
      return true;
    default:
      return state;
  }
}

export function game_state(state=GAMESTATES.BIDDING, action) {
  switch (action.type) {
    case NEW_GAME:
      return GAMESTATES.BIDDING;
    case FINISH_BIDDING:
      return GAMESTATES.PLAYING;
    case FINISH_PLAYING:
      return GAMESTATES.RESULTS;
    default:
      return state;
  }
}

export function hands(state={
  [SEATS.NORTH]: [],
  [SEATS.EAST]: [],
  [SEATS.SOUTH]: [],
  [SEATS.WEST]: [],
}, action) {
  switch (action.type) {
    case PLAY_CARD:
      let found = false;
      let hand_copy = [...state[action.seat]];
      for (let idx in hand_copy) {
        if (!found && JSON.stringify(hand_copy[idx]) === JSON.stringify(action.card)) {
          hand_copy.splice(idx, 1);
          found = true;
        }
      }
      if (!found) hand_copy.pop();
      return {...state, [action.seat]: hand_copy};
    case NEW_GAME:
      return action.hands;
    case FINISH_BIDDING:
      if (action.contract.suit === BID_SUITS.NOTRUMP) return state;
      return {
        [SEATS.NORTH]: sortHand(state[SEATS.NORTH], action.contract.suit),
        [SEATS.EAST]: sortHand(state[SEATS.EAST], action.contract.suit),
        [SEATS.SOUTH]: sortHand(state[SEATS.SOUTH], action.contract.suit),
        [SEATS.WEST]: sortHand(state[SEATS.WEST], action.contract.suit),
      };
    case SET_HAND:
      return {...state, [action.seat]: action.cards};
    default:
      return state;
  }
}

export function ready_to_play(state=true, action) {
  switch (action.type) {
    case CLEAR_CARDS_ON_BOARD:
      return true;
    case NEW_GAME:
      return true;
    default:
      return state;
  }
}

export function tricks_won(state={NS: 0, EW: 0}, action) {
  switch (action.type) {
    case NEW_GAME:
      return {NS: 0, EW: 0};
    default:
      return state;
  }
}

export function updates_with_play_card(state={curr_player, tricks_won, ready_to_play}, action, {cards_on_board, contract}) {
  switch (action.type) {
    case PLAY_CARD:
      if (cards_on_board.length === 4) {
        const winner = getRoundWinner({cards_on_board: cards_on_board, contract: contract});
        const NS = [SEATS.NORTH, SEATS.SOUTH];

        return {
          curr_player: winner,
          tricks_won: NS.includes(winner) ?
            {NS: state.tricks_won.NS + 1, EW: state.tricks_won.EW} :
            {NS: state.tricks_won.NS, EW: state.tricks_won.EW + 1},
          ready_to_play: false,
        };
      }
      else {
        return {
          curr_player: getNextPlayer(action.seat)
        };
      }
    default:
      return state;
  }
}
