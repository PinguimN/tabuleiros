var socketio = require('socket.io');

module.exports = function(server) {
  var io = socketio.listen(server);
  io.set('transports',["websocket", "htmlfile", "xhr-polling", "jsonp-polling", "flashsocket"]);
  return io;
};