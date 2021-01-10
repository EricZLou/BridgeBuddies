import {io} from "./index.js"
import {Deck} from "../engine/Deck.js"
import {ALL_SEATS, PARTNERS, SEATS} from "../constants/GameEngine.js"


const GAMESTATES = {
  WAITING: 'WAITING',
  PLAYING: 'PLAYING',
};

let NUM_USERS_LOGGED_IN = 0;
let MAX_GAME_IDX = 1;


/*
  ONLINE_GAME_ROOMS = {
    room1: {
      cards_played: 0,
      game_state: GAMESTATES.WAITING,
      num_users: 3,
      users: {
        "qrjCPRDdQ6vY8b9fAAAE": {seat: [SEATS.NORTH], name: "eric"},
        "pTDpdDyNCaa1l-U1AAAH": {seat: [SEATS.EAST], name: "tim"},
        "ExGqzw5Z99uxxzTZAAAJ": {seat: [SEATS.SOUTH], name: "elizabeth"},
      },
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
for (let i = 0; i < 10; i++)
  createNewRoom();


function createNewRoom() {
  const room = `Room ${MAX_GAME_IDX++}`;
  console.log(`[SERVER] Creating ${room}`);
  ONLINE_GAME_ROOMS.set(room, {
    cards_played: 0,
    game_state: GAMESTATES.WAITING,
    num_users: 0,
    users: new Map(),
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
  ONLINE_GAME_ROOMS.get(socket.room).cards_played = 0;
  ONLINE_GAME_ROOMS.get(socket.room).game_state = GAMESTATES.WAITING;
}


export default function SocketManager(socket) {
  /************************************************************
    NUM USERS LOGGED IN
  ************************************************************/

  // AUTOMATIC USER LOG IN BEHAVIOR
  NUM_USERS_LOGGED_IN++;
  io.emit('num users logged in', NUM_USERS_LOGGED_IN);

  // AUTOMATIC USER LOG OUT BEHAVIOR
  socket.on('disconnect', () => {
    NUM_USERS_LOGGED_IN--;
    io.emit('num users logged in', NUM_USERS_LOGGED_IN);
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
    // join a room
    socket.join(room);
    socket.room = room;
    let occupied_seats = [];
    for (let seat_name of ONLINE_GAME_ROOMS.get(room).users.values()) {
      occupied_seats.push(seat_name.seat);
    }
    let seat;
    for (let seatx of ALL_SEATS) {
      if (!occupied_seats.includes(seatx)) {
        seat = seatx;
        break;
      }
    }
    ONLINE_GAME_ROOMS.get(room).users.set(socket.id, {seat: seat, name: first_name});
    ONLINE_GAME_ROOMS.get(room).num_users++;
    io.in(room).emit('room stat', room, ONLINE_GAME_ROOMS.get(room).num_users);
    console.log(`[JOIN] ${room} - ${socket.id}`);
    // if room is full, send notice to entire room to start game
    if (ONLINE_GAME_ROOMS.get(room).num_users === 4) {
      ONLINE_GAME_ROOMS.get(room).game_state = GAMESTATES.PLAYING;
      dispatchGame(room);
      console.log(`[START GAME] ${room}`);
    }
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

  // BIDDING END -- SEND DUMMY HAND
  socket.on('dummy hand', (cards) => {
    console.log(`[DUMMY HAND] received`)
    socket.to(socket.room).emit('dummy hand', cards);
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
        hands: new Map(),
      });
      return;
    }

    if (ONLINE_GAME_ROOMS.get(socket.room).game_state === GAMESTATES.WAITING) {
      io.in(socket.room).emit(
        'room stat',
        socket.room,
        ONLINE_GAME_ROOMS.get(socket.room).num_users
      );
    } else {
      // old = person who left
      // new = person who is hosting old's robot
      const old_uid = socket.id;
      const new_uid = ONLINE_GAME_ROOMS.get(socket.room).users.keys().next().value;
      const old_seat = ONLINE_GAME_ROOMS.get(socket.room).users.get(old_uid).seat;
      const cards = ONLINE_GAME_ROOMS.get(socket.room).hands[old_seat];
      io.to(new_uid).emit('robot cards', old_seat, cards);
    }

    socket.leave(socket.room);
    ONLINE_GAME_ROOMS.get(socket.room).users.delete(socket.id);
    ONLINE_GAME_ROOMS.get(socket.room).num_users--;
  });
}
