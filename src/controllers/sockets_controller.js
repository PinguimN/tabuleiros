var io = require('../setup').io;

io.sockets.on('connection', function(socket) {
  socket.emit('welcome', 'Bem vindo');
});