import {
  FINISH_BIDDING, MAKE_BID,
  NEW_GAME, RESET_GAME_REDUX, SET_HAND,
  SET_ONLINE_ROBOTS, START_ONLINE_GAME_OVER_TIMER,
  CLEAR_CARDS_ON_BOARD, FINISH_PLAYING, PLAY_CARD,
} from '../actions/Core'

import {getRoundWinner} from '../../engine/managers/BridgeGameEngine'
import {getNextPlayer, getPartner} from '../../engine/utils/GameUtils'
import {sortHand} from '../../engine/Deck'
import {BID_SUITS, GAMESTATES, GAMETYPES, SEATS} from '../../constants/GameEngine'


export function bid_history(state=[], action) {
  switch (action.type) {
    case MAKE_BID:
      return [...state, {bid: action.bid, seat: action.seat}];
    case RESET_GAME_REDUX:
      return [];
    default:
      return state;
  }
}

export function card_history(state=[], action) {
  switch (action.type) {
    case PLAY_CARD:
      return [...state, {card: action.card, seat: action.seat}];
    case RESET_GAME_REDUX:
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
    case RESET_GAME_REDUX:
      return [];
    default:
      return state;
  }
}

export function contract(state="", action) {
  switch (action.type) {
    case FINISH_BIDDING:
      return action.contract;
    case FINISH_PLAYING:
      if (state === "") return {suit: 'pass'};
      return state;
    case RESET_GAME_REDUX:
      return "";
    default:
      return state;
  }
}

export function curr_player(state="", action) {
  switch (action.type) {
    case RESET_GAME_REDUX:
      return "";
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

export function daily_challenge_date_str(state="", action) {
  switch (action.type) {
    case NEW_GAME:
      if (action.game_type === GAMETYPES.DAILY)
        return action.date_str;
      return state;
    default:
      return state;
  }
}

export function dummy(state="", action) {
  switch (action.type) {
    case FINISH_BIDDING:
      return getPartner(action.contract.declarer);
    case RESET_GAME_REDUX:
      return "";
    default:
      return state;
  }
}

export function first_card_played(state=false, action) {
  switch (action.type) {
    case RESET_GAME_REDUX:
      return false;
    case PLAY_CARD:
      return true;
    default:
      return state;
  }
}

export function game_info(state={
  game_type: GAMETYPES.ONLINE, me: "", player_names: {},
}, action) {
  switch (action.type) {
    case NEW_GAME:
      return {
        game_type: action.game_type ? action.game_type : state.game_type,
        me: action.me ? action.me : state.me,
        player_names: action.player_names ? action.player_names : state.player_names,
      };
    case RESET_GAME_REDUX:
      return {
        game_type: state.game_type, me: "", player_names: {}
      }
    default:
      return state;
  }
}

export function game_results(state={
  contract: "", tricks_won: {}
}, action) {
  switch (action.type) {
    case FINISH_PLAYING:
      return {contract: action.contract, tricks_won: action.tricks_won};
    case NEW_GAME:
      return {contract: "", tricks_won: {}};
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
        let card = hand_copy[idx];
        if (!found && card.suit === action.card.suit && card.value === action.card.value) {
          hand_copy.splice(idx, 1);
          found = true;
        }
      }
      if (!found) hand_copy.pop();
      return {...state, [action.seat]: hand_copy};
    case NEW_GAME:
      return action.hands;
    case RESET_GAME_REDUX:
      return {
        [SEATS.NORTH]: [],
        [SEATS.EAST]: [],
        [SEATS.SOUTH]: [],
        [SEATS.WEST]: [],
      };
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
    case SET_ONLINE_ROBOTS:
      return {...state, ...action.robot_data};
    default:
      return state;
  }
}

export function online_game_over_timer(state=false, action) {
  switch (action.type) {
    case START_ONLINE_GAME_OVER_TIMER:
      return true;
    case NEW_GAME:
      return false;
    default:
      return state;
  }
}

export function player_types(state={
  [SEATS.NORTH]: GAMETYPES.ONLINE,
  [SEATS.EAST]: GAMETYPES.ONLINE,
  [SEATS.SOUTH]: GAMETYPES.ONLINE,
  [SEATS.WEST]: GAMETYPES.ONLINE,
}, action) {
  switch (action.type) {
    case SET_ONLINE_ROBOTS:
      let robot_types = {};
      for (let seat of Object.keys(action.robot_data))
        robot_types[seat] = GAMETYPES.OFFLINE;
      return {...state, ...robot_types};
    case NEW_GAME:
      if (!action.game_type) return state;
      if (action.game_type === GAMETYPES.ONLINE) {
        return {
          [SEATS.NORTH]: GAMETYPES.ONLINE,
          [SEATS.EAST]: GAMETYPES.ONLINE,
          [SEATS.SOUTH]: GAMETYPES.ONLINE,
          [SEATS.WEST]: GAMETYPES.ONLINE,
        };
      } else {
        return {
          [SEATS.NORTH]: GAMETYPES.OFFLINE,
          [SEATS.EAST]: GAMETYPES.OFFLINE,
          [SEATS.SOUTH]: GAMETYPES.OFFLINE,
          [SEATS.WEST]: GAMETYPES.OFFLINE,
        }
      }
    default:
      return state;
  }
}

export function ready_to_play(state=false, action) {
  switch (action.type) {
    case CLEAR_CARDS_ON_BOARD:
      return true;
    case RESET_GAME_REDUX:
      return false;
    case NEW_GAME:
      return true;
    default:
      return state;
  }
}

export function tricks_won(state={NS: 0, EW: 0}, action) {
  switch (action.type) {
    case RESET_GAME_REDUX:
      return {NS: 0, EW: 0};
    case NEW_GAME:
      return {NS: 0, EW: 0};
    default:
      return state;
  }
}

export function updates_with_play_card(
  state={curr_player, tricks_won, ready_to_play},
  action,
  {cards_on_board, contract, game_type, player_types}
) {
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
          ready_to_play: (
            game_type === GAMETYPES.ONLINE &&
            player_types[winner] === GAMETYPES.OFFLINE ?
            true : false
          ),
        };
      }
      else {
        return {
          curr_player: getNextPlayer(action.seat),
          ready_to_play: true,
        };
      }
    default:
      return state;
  }
}
