const io = require("./index.js").io;
let num_connections = 0;
let table = [];

let num_users_logged_in = 0;

module.exports = function(socket) {
  // AUTOMATIC USER LOG IN BEHAVIOR
  num_users_logged_in++;
  io.emit('num users logged in', num_users_logged_in);

  socket.on('disconnect', () => {
    num_users_logged_in--;
    io.emit('num users logged in', num_users_logged_in);
  });

  // // LOG IN
  // socket.on('login', () => {
  //   console.log(`${socket.id} signed in`);
  //   socket.join('room 1');
  //   table.push(socket.id);
  //   num_connections++;
  //   if (table.length === 4) {
  //     io.to(table[0]).emit('show', true);
  //   }
  // });
  //
  // // CARD CLICKED
  // socket.on('clicked', () => {
  //   console.log(`${socket.id} clicked`);
  //   io.to('room 1').emit('show', false);
  //   io.to(table[(table.indexOf(socket.id)+1) % 4]).emit('show', true);
  // });
}
