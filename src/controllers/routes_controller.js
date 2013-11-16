var app = require('../setup').app;
var Game = require('../setup').Game;
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/:id', function(req, res) {
  Game.find(req.params.id, function(err, result){
  	if(err)
  		throw err;
	res.json(result);
  });
});