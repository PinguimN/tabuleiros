var mongoose = require('mongoose');
var io = require('../setup').io;

var Game = mongoose.model('Game');

var spectators = {}; // gameId: ['fulano', 'ciclano']

io.sockets.on('connection', function(socket) {

  var game;
  var player;

  socket.on('init', function(gameId, name) {
    if (!spectators[gameId]) {
      spectators[gameId] = [];
    }
    Game.findOne({_id: gameId}, function(err, gameObj) {
      if (err) throw err;
      socket.join(gameId);
      if (typeof gameObj.p1 === 'undefined') {
        gameObj.p1 = name;
        player = 'p1';
      } else if (typeof gameObj.p2 === 'undefined') {
        gameObj.p2 = name;
        player = 'p2';
      } else {
        player = name;
        spectators[gameId].push(name);
      }
      io.sockets.in(gameId).emit('spectators', spectators[gameId]);
      gameObj.save(function(err, gameUpdated) {
        game = gameUpdated;
        if (gameUpdated.p1 && gameUpdated.p2) {
          io.sockets.in(gameUpdated._id).emit('start', gameUpdated);
        }
      });
    });
  });

  socket.on('move', function(move) {
    if (move.color === 'W' && player !== 'p1') return false;
    if (move.color === 'B' && player !== 'p2') return false;

    game.addMove(move, function(allMoves) {
      io.sockets.in(game._id).emit('update', move);
    });
  });

  socket.on('disconnect', function() {
    if (!game) return;
    var playerIndex = spectators[game._id].indexOf(player);
    if (playerIndex !== -1) {
      spectators[game._id].splice(playerIndex, 1);
      io.sockets.in(game._id).emit('spectators', spectators[game._id]);
    }
  });

});