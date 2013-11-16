var app = require('../setup').app;
var Game = require('../setup').Game;
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/newGame', function(req,res){
  Game.createGame('pl1', 'pl2', function(game){
    res.redirect('/' + game._id);
  });
});

app.get('/:id/:origem/:destino/:cor/:captura?', function(req, res) {
  Game.addMove(req.params.id, {"cor":req.params.cor,"origem":req.params.origem,"destino":req.params.destino}, function(err, result){
  	if(err)
  		throw err;
    res.redirect('/' + req.params.id);
  });
});

app.get('/:id', function(req, res) {
  Game.find(req.params.id, function(err, result){
  	if(err)
  		throw err;
	res.json(result);
  });
});