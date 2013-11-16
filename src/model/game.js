var mongoose = require('mongoose'),
  ObjectId = require('mongoose').Types.ObjectId,
  db = mongoose.createConnection('localhost', 'checkers');
  db.on('error', console.error.bind(console,'connection error: '));

mongoose.set('debug', true);

var gameSchema = new mongoose.Schema({
  p1: String,
  p2: String,
  moves: [{
    _id: false,
    cor: {type: String, required: true},
    origem: {type: String, required: true},
    destino: {type: String, required: true},
    captura: String
  }]
});

var Game = db.model('Game', gameSchema);

exports.find = function(id, callback){
  Game.find({_id: new ObjectId(id)}, callback);
};

exports.addMove = function(id, move, callback){
  Game.update({_id: new ObjectId(id)}, {$push: {moves: move}}, callback);
};

exports.createGame = function(p1, p2, callback){
  var game = new Game({p1: p1, p2: p2});
  game.save(function(err, result){
    console.log(result);
    console.log(game);
    callback(result);
  });  
};