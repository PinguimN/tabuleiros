var mongoose = require('mongoose');

var app = require('../setup').app;

var Game = mongoose.model('Game');

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/newGame', function(req,res) {
  new Game({p1: 'p1', p2: 'p2'}).save(function(err, game) {
    if (err) throw err;
    res.redirect('/' + game._id);
  });
});

app.get('/:gameId', function(req, res) {
  res.render('game', {gameId: req.params.gameId});
});