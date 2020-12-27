const io = require("./index.js").io;

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
    room2: {

    },
    ...
  }
}
*/
let ONLINE_GAME_ROOMS = new DefaultDict(Map);

function prepareGameInfoForRoom(room) {
  console.log(room);
  return "HELLO";
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
    socket.first_name = first_name;
    ONLINE_GAME_ROOMS[room].set(socket.id, socket.first_name);
    console.log(`[JOIN] ${room} - ${socket.id}`);
    // if room is full, send notice to entire room to start game
    if (ONLINE_GAME_ROOMS[room].size === 4) {
      const game_info = prepareGameInfoForRoom(room);
      io.to(room).emit('start game', game_info);
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
