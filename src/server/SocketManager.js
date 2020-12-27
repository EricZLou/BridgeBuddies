const io = require("./index.js").io;

const Deck = require('../engine/Deck').Deck;
const sortHand = require('../engine/Deck').sortHand;

const SEATS = require('../constants/GameEngine').SEATS;
const ALL_SEATS = require('../constants/GameEngine').ALL_SEATS;

let NUM_USERS_LOGGED_IN = 0;
let GAME_IDX = 1;

class DefaultDict {
  constructor(defaultInit) {
    return new Proxy({}, {
      get: (target, name) => name in target ?
        target[name] :
        (target[name] = typeof defaultInit === 'function' ?
          new defaultInit().valueOf() :
          defaultInit)
    })
  }
}
/*
  ONLINE_GAME_ROOMS = {
    room1: {
      qrjCPRDdQ6vY8b9fAAAE: "eric",
      pTDpdDyNCaa1l-U1AAAH: "tim",
      ExGqzw5Z99uxxzTZAAAJ: "elizabeth",
      1GsjcrvmvBIUmpImAAAE: "paul",
    },
    ...
  }
}
*/
let ONLINE_GAME_ROOMS = new DefaultDict(Map);

function prepareHands() {
  const deck = new Deck();
  return deck.generateHands();
}
function prepareGameInfoForRoom(room) {
  let game_info = {};
  let idx = 0;
  for (let [uid, name] of ONLINE_GAME_ROOMS[room]) {
    game_info[ALL_SEATS[idx++]] = name;
  }
  /* {NORTH: "foo", EAST: "eric", ...}*/
  return game_info;
}
function dispatchGame(room) {
  const hands = prepareHands();
  const game_info = prepareGameInfoForRoom(room);
  let idx = 0;
  for (let [uid, name] of ONLINE_GAME_ROOMS[room]) {
    io.to(uid).emit('game data', {
      ...game_info,
      me: ALL_SEATS[idx],
      cards: hands[ALL_SEATS[idx++]],
    });
  }
  io.to(room).emit('start game');
}

module.exports = function(socket) {
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

  // HANDLE ONLINE GAME REQUEST
  socket.on('online game request', (first_name) => {
    // join a room
    const room = `room${GAME_IDX}`;
    socket.join(room);
    socket.room = room;
    ONLINE_GAME_ROOMS[room].set(socket.id, first_name);
    console.log(`[JOIN] ${room} - ${socket.id}`);
    // if room is full, send notice to entire room to start game
    if (ONLINE_GAME_ROOMS[room].size === 4) {
      dispatchGame(room);
      console.log(`[START GAME] ${room}`);
    }
  });

  // HANDLE LEAVING THE ONLINE GAME SCREEN
  socket.on('leave online game', () => {
    console.log(`[LEAVE] ${socket.room} - ${socket.id}`);
    socket.leave(socket.room);
    ONLINE_GAME_ROOMS[socket.room].delete(socket.id);
  });


  /************************************************************
    IN-GAME HANDLERS
  ************************************************************/

}
