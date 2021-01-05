import {io} from "./index.js"
import {Deck} from "../engine/Deck.js"
import {ALL_SEATS, PARTNERS} from "../constants/GameEngine.js"


let NUM_USERS_LOGGED_IN = 0;
let MAX_GAME_IDX = 1;


/*
  ONLINE_GAME_ROOMS = {
    room1: {
      num_users: 3,
      cards_played: 0,
      users: {
        qrjCPRDdQ6vY8b9fAAAE: "eric",
        pTDpdDyNCaa1l-U1AAAH: "tim",
        ExGqzw5Z99uxxzTZAAAJ: "elizabeth",
      },
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
    num_users: 0,
    cards_played: 0,
    users: new Map(),
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
  for (let [uid, name] of ONLINE_GAME_ROOMS.get(room).users.entries()) {
    game_info[ALL_SEATS[idx++]] = name;
  }
  /* {NORTH: "foo", EAST: "eric", ...}*/
  return game_info;
}
function dispatchGame(room) {
  const hands = prepareHands();
  const game_info = prepareGameInfoForRoom(room);
  let idx = 0;
  for (let [uid, name] of ONLINE_GAME_ROOMS.get(room).users.entries()) {
    io.to(uid).emit('game data', {
      ...game_info,
      me: ALL_SEATS[idx],
      cards: hands[ALL_SEATS[idx++]],
    });
  }
  ONLINE_GAME_ROOMS.get(room).cards_played = 0;
  io.in(room).emit('start game');
}

function gameOverBehavior(room) {
  setTimeout(() => {io.in(room).emit('game over')}, 1000);
  setTimeout(() => {dispatchGame(room)}, 16000);
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
      info[room] = data.num_users;
    }
    io.to(socket.id).emit('tables info', info);
  });

  // HANDLE JOIN ROOM REQUEST
  socket.on('join room request', (room, first_name) => {
    // join a room
    socket.join(room);
    socket.room = room;
    ONLINE_GAME_ROOMS.get(room).users.set(socket.id, first_name);
    ONLINE_GAME_ROOMS.get(room).num_users++;
    io.in(room).emit('room stat', room, ONLINE_GAME_ROOMS.get(room).num_users);
    console.log(`[JOIN] ${room} - ${socket.id}`);
    // if room is full, send notice to entire room to start game
    if (ONLINE_GAME_ROOMS.get(room).num_users === 4) {
      dispatchGame(room);
      console.log(`[START GAME] ${room}`);
    }
  });

  // HANDLE LEAVING THE ONLINE GAME SCREEN
  socket.on('leave online game', () => {
    console.log(`[LEAVE] ${socket.room} - ${socket.id}`);
    socket.leave(socket.room);
    ONLINE_GAME_ROOMS.get(socket.room).users.delete(socket.id);
    ONLINE_GAME_ROOMS.get(socket.room).num_users--;
    io.in(socket.room).emit('room stat', socket.room, ONLINE_GAME_ROOMS.get(socket.room).num_users);
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
    if (ONLINE_GAME_ROOMS.get(socket.room).cards_played === 52) {
      gameOverBehavior(socket.room);
    }
  });
}
