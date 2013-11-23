var mongoose = require('mongoose')
var ObjectId = require('mongoose').Types.ObjectId;

var gameSchema = new mongoose.Schema({
  p1: {type: String, required: true},
  p2: {type: String, required: true},
  moves: [{
    _id: false,
    color: {type: String, required: true, default: 'X'},
    from: {type: String, required: true},
    to: {type: String, required: true},
    capture: String
  }]
});

gameSchema.methods.addMove = function(move, callback) {
  var self = this;
  console.log('addMove' + this);
  this.moves.push(move);
  this.update({$push:{moves:move}}, function(err, ret){
    if (err) throw err;
    callback(self.moves);
  });
};

var Game = mongoose.model('Game', gameSchema);