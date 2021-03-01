import {io} from "./index.js"
import {Deck} from "../engine/Deck.js"
import {ALL_SEATS, PARTNERS, SEATS} from "../constants/GameEngine.js"


const GAMESTATES = {
  OPEN: 'OPEN',
  PLAYING: 'PLAYING',
};

let NUM_USERS_LOGGED_IN = 0;

// FOR FRIENDS FETCHING
let USER_ID_TO_SOCKET = new Map();

/*
  ONLINE_GAME_ROOMS = {
    "Room 1": {
      cards_played: 0,
      game_state: GAMESTATES.WAITING,
      num_users: 3,
      users: {
        "qrjCPRDdQ6vY8b9fAAAE": {seat: [SEATS.NORTH], name: "eric"},
        "pTDpdDyNCaa1l-U1AAAH": {seat: [SEATS.EAST], name: "tim"},
        "ExGqzw5Z99uxxzTZAAAJ": {seat: [SEATS.SOUTH], name: "elizabeth"},
      },
      empty_seats: [
        SEATS.WEST,
      ],
      hands: {
        [SEATS.NORTH]: [],
        [SEATS.EAST]: [],
        [SEATS.SOUTH]: [],
        [SEATS.WEST]: [],
      }
    },
    ...
  }
}
*/
let ONLINE_GAME_ROOMS = new Map();
for (let i = 1; i <= 10; i++)
  createNewRoom(i);


function createNewRoom(i) {
  const room = `Room ${i}`;
  console.log(`[SERVER] Creating ${room}`);
  ONLINE_GAME_ROOMS.set(room, {
    cards_played: 0,
    game_state: GAMESTATES.OPEN,
    num_users: 0,
    users: new Map(),
    empty_seats: [...ALL_SEATS],
    hands: new Map(),
  });
  return room;
}


function prepareHands() {
  const deck = new Deck();
  return deck.generateHands();
}
function prepareGameInfoForRoom(room) {
  let game_info = {};
  let idx = 0;
  for (let seat_name of ONLINE_GAME_ROOMS.get(room).users.values()) {
    game_info[seat_name.seat] = seat_name.name;
  }
  /* {NORTH: "foo", EAST: "eric", ...}*/
  return game_info;
}
function dispatchGame(room) {
  const hands = prepareHands();
  const game_info = prepareGameInfoForRoom(room);
  ONLINE_GAME_ROOMS.get(room).hands = hands;
  for (let [uid, seat_name] of ONLINE_GAME_ROOMS.get(room).users.entries()) {
    io.to(uid).emit('game data', {
      ...game_info,
      me: seat_name.seat,
      cards: hands[seat_name.seat],
    });
  }
  io.in(room).emit('start game');
}

function gameOverBehavior(room) {
  setTimeout(() => {io.in(room).emit('game over')}, 1000);
  setTimeout(() => {dispatchGame(room)}, 16000);
  ONLINE_GAME_ROOMS.get(room).cards_played = 0;
  ONLINE_GAME_ROOMS.get(room).game_state = GAMESTATES.OPEN;
}


export default function SocketManager(socket) {
  /************************************************************
    NUM USERS LOGGED IN
  ************************************************************/

  // AUTOMATIC USER LOG IN BEHAVIOR
  socket.on('logged in', (userID, friendIDs) => {
    NUM_USERS_LOGGED_IN++;
    io.emit('num users logged in', NUM_USERS_LOGGED_IN);
    USER_ID_TO_SOCKET.set(userID, socket.id);
    // notify friends that I've logged in
    let friends_logged_in = [];
    for (let friendID of friendIDs) {
      if (USER_ID_TO_SOCKET.has(friendID)) {
        socket.to(USER_ID_TO_SOCKET.get(friendID)).emit(
          "friend logged in", userID
        );
        friends_logged_in.push(friendID);
      }
    }
    // get my friends that are also logged in
    io.to(socket.id).emit("friends that are logged in", friends_logged_in);
  });

  // AUTOMATIC USER LOG OUT BEHAVIOR
  socket.on('disconnect', () => {
    NUM_USERS_LOGGED_IN--;
    if (NUM_USERS_LOGGED_IN < 0) NUM_USERS_LOGGED_IN = 0;
    io.emit('num users logged in', NUM_USERS_LOGGED_IN);
  });
  socket.on('logged out', (userID, friendIDs) => {
    USER_ID_TO_SOCKET.delete(userID);
    for (let friendID of friendIDs) {
      if (USER_ID_TO_SOCKET.has(friendID)) {
        socket.to(USER_ID_TO_SOCKET.get(friendID)).emit(
          "friend logged out", userID
        );
      }
    }
  });


  /************************************************************
    ONLINE GAME ROOM DISPATCH
  ************************************************************/

  // HANDLE TABLES INFO REQUEST
  socket.on('request tables info', () => {
    let info = {};
    for (let [room, data] of ONLINE_GAME_ROOMS.entries()) {
      info[room] = {
        num_users: data.num_users,
        game_state: data.game_state,
      };
    }
    io.to(socket.id).emit('tables info', info);
  });

  // HANDLE JOIN ROOM REQUEST
  socket.on('join room request', (room, first_name) => {
    if (ONLINE_GAME_ROOMS.get(room).num_users === 4) return;

    // join a room
    socket.join(room);
    socket.room = room;
    const seat = ONLINE_GAME_ROOMS.get(room).empty_seats.shift();

    ONLINE_GAME_ROOMS.get(room).users.set(socket.id, {seat: seat, name: first_name});
    ONLINE_GAME_ROOMS.get(room).num_users++;

    if (ONLINE_GAME_ROOMS.get(room).game_state === GAMESTATES.OPEN) {
      // if room is full, send notice to entire room to start game
      if (ONLINE_GAME_ROOMS.get(room).num_users === 4) {
        ONLINE_GAME_ROOMS.get(room).game_state = GAMESTATES.PLAYING;
        dispatchGame(room);
        console.log(`[START GAME] ${room}`);
      }
    }
    io.in(room).emit('room stat', room, ONLINE_GAME_ROOMS.get(room).num_users);
    console.log(`[JOIN] ${room} - ${socket.id}`);
  });


  /************************************************************
    IN-GAME HANDLERS
  ************************************************************/

  // HANDLE BID CLICK
  socket.on('bid click', (bid, seat) => {
    if (bid.type !== "suit")
      console.log(`[BID] ${seat}: ${bid.type}`);
    else
      console.log(`[BID] ${seat}: ${bid.level}${bid.suit}`);
    io.in(socket.room).emit('bid click', bid, seat);
  });

  // BIDDING END -- DUMMY SENDS 'bidding over' SIGNAL
  socket.on('bidding over', (dummy) => {
    console.log(`[BIDDING OVER]`)
    const cards = ONLINE_GAME_ROOMS.get(socket.room).hands[dummy];
    const partner_cards = ONLINE_GAME_ROOMS.get(socket.room).hands[PARTNERS[dummy]];
    io.to(socket.room).emit('dummy hand', cards);
    io.to(socket.id).emit('partner hand', partner_cards);
  });

  // HANDLE CARD CLICK
  socket.on('card click', (card, seat) => {
    console.log(`[CARD] ${seat}: ${card.value} of ${card.suit}`);
    io.in(socket.room).emit('card click', card, seat);
    ONLINE_GAME_ROOMS.get(socket.room).cards_played++;

    // remove card from server hand
    let hand_copy = ONLINE_GAME_ROOMS.get(socket.room).hands[seat];
    for (let idx in hand_copy) {
      if (JSON.stringify(hand_copy[idx]) === JSON.stringify(card)) {
        hand_copy.splice(idx, 1);
        break;
      }
    }
    ONLINE_GAME_ROOMS.get(socket.room).hands[seat] = hand_copy;

    if (ONLINE_GAME_ROOMS.get(socket.room).cards_played === 52) {
      gameOverBehavior(socket.room);
    }
  });


  /************************************************************
    LEAVE GAME HANDLERS
  ************************************************************/

  // HANDLE LEAVING THE ONLINE GAME SCREEN
  socket.on('leave online game', () => {
    console.log(`[LEAVE] ${socket.room} - ${socket.id}`);

    // last person to leave the room
    if (ONLINE_GAME_ROOMS.get(socket.room).users.size === 1) {
      ONLINE_GAME_ROOMS.set(socket.room, {
        cards_played: 0,
        game_state: GAMESTATES.WAITING,
        num_users: 0,
        users: new Map(),
        empty_seats: [...ALL_SEATS],
        hands: new Map(),
      });
      return;
    }

    // old = person who left
    const old_uid = socket.id;
    const old_seat = ONLINE_GAME_ROOMS.get(socket.room).users.get(old_uid).seat;

    socket.leave(socket.room);
    ONLINE_GAME_ROOMS.get(socket.room).users.delete(socket.id);
    ONLINE_GAME_ROOMS.get(socket.room).empty_seats.push(old_seat);
    ONLINE_GAME_ROOMS.get(socket.room).num_users--;

    if (ONLINE_GAME_ROOMS.get(socket.room).game_state === GAMESTATES.OPEN) {
      io.in(socket.room).emit(
        'room stat',
        socket.room,
        ONLINE_GAME_ROOMS.get(socket.room).num_users
      );
    } else {
      // new = person who is hosting old players' robots
      const new_uid = ONLINE_GAME_ROOMS.get(socket.room).users.keys().next().value;
      let cards = {};
      for (let seat of ONLINE_GAME_ROOMS.get(socket.room).empty_seats)
        cards[seat] = ONLINE_GAME_ROOMS.get(socket.room).hands[seat];
      io.to(new_uid).emit('robot cards', cards);
    }
  });
}
