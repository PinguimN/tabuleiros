var mongoose = require('mongoose');
var io = require('../setup').io;

var Game = mongoose.model('Game');

io.sockets.on('connection', function(socket) {

  var game;

  socket.on('init', function(gameId, callback) {
    Game.findOne({_id: gameId}, function(err, gameObj) {
      if (err) throw err;
      game = new Game(gameObj);
      callback(game.moves);
    });
  });

  socket.on('move', function(move) {
    game.addMove(move, function(allMoves) {
      socket.broadcast.emit('update', move);
    });
  });

});